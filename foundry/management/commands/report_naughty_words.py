from django.core.management.base import BaseCommand, CommandError
from django.core.mail import EmailMultiAlternatives
from django.db import transaction
from django.template.loader import get_template_from_string
from django.template import Context
from django.contrib.sites.models import Site
from django.utils.html import strip_tags
from django.conf import settings

from preferences import preferences

from foundry.models import FoundryComment


TEMPLATE = '''
<html>
<body>

{% for comment in comments %}
    <div>
        {{ comment.comment }}
        <br />
        <a href="http://{{ site_domain}}{% url admin-remove-comment comment.id %}" target="_">Remove this comment</a>
        |
        <a href="http://{{ site_domain}}{% url admin-allow-comment comment.id %}" target="_">Allow this comment</a>
    </div>
    <br />
{% endfor %}

</body>
<html>
'''

class Command(BaseCommand):
    help = "Scan comments for naughty words and report by email."
    words = {}
    threshold = 0

    def flag(self, text):
        """Very simple check for naughty words"""
        # todo: Levenstein matching or a Bayesian filter
        total_weight = 0
        number_of_words = 0
        words = text.lower().split()        
        for word in words:
            if word in self.words:
                total_weight += self.words[word]
                number_of_words += 1

        if number_of_words:
            return total_weight > self.threshold

        return False

    @transaction.commit_on_success
    def handle(self, *args, **options):
        # As long as reporting is done often this method won't turn into a 
        # memory hog.

        self.threshold = preferences.NaughtyWordPreferences.threshold

        # Load words and weights                
        entries = preferences.NaughtyWordPreferences.entries
        for entry in entries.split('\n'):
            try:
                k, v = entry.split(',')
                k = k.strip()
                v = int(v.strip())
            except:
                continue
            self.words[k] = v

        flagged = []
        comments = FoundryComment.objects.filter(moderated=False).order_by('id')
        for comment in comments:
            # Do permitted check since we report per site. No way to do it 
            # as part of the query.
            if comment.content_object and comment.content_object.is_permitted:
                if self.flag(comment.comment):
                    flagged.append(comment)
                else:
                    # If a comment passes the test it is marked as moderated
                    comment.moderated = True
                    comment.save()

        # Compose a mail
        if flagged:
            site = Site.objects.get(id=settings.SITE_ID)
            template = get_template_from_string(TEMPLATE)
            c = dict(comments=flagged, site_domain=site.domain)
            content = template.render(Context(c))
            msg = EmailMultiAlternatives(
                "Naughty words report on %s" % site.name, 
                strip_tags(content), 
                settings.DEFAULT_FROM_EMAIL, 
                preferences.NaughtyWordPreferences.email_recipients.split('\n')
            )
            msg.attach_alternative(content, 'text/html')
            msg.send()
