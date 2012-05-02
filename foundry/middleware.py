import re

from django.http import HttpResponseRedirect
from django.core.urlresolvers import reverse
from django.conf import settings

from preferences import preferences


PROTECTED_URLS_PATTERN = r'|'.join((
    reverse('age-gateway'), 
    reverse('join'), 
    reverse('login'), 
    '/password_reset', 
    '/static', 
    '/admin'
))


class VerboseRequestMeta:
    """Add metadata to request so repr(request) prints more information. Runs
    as one of the last middleware."""

    def process_request(self, request):
        user = getattr(request, 'user', None)
        if user is not None:
            request.META['AUTHENTICATED_USER'] = str(user)


class AgeGateway:
    """Combined private site and age gateway. Due to legacy this name is used.
    Must run after AuthenticationMiddleware."""

    def process_response(self, request, response):
        
        # Ignore ajax
        if request.is_ajax():
            return response
        
        # Protected URLs
        if re.match(PROTECTED_URLS_PATTERN, request.META['PATH_INFO']) is not None:
            return response

        # Now only do we hit the database
        # xxx: investigate preference caching. May want to hit the db less.
        private_site = preferences.GeneralPreferences.private_site
        show_age_gateway = preferences.GeneralPreferences.show_age_gateway

        # Check trivial case
        if not (private_site or show_age_gateway):
            return response

        # Private site not enabled and gateway passed
        if not private_site and request.COOKIES.get('age_gateway_passed'):
            return response

        # Exempted URLs
        exempted_urls = preferences.GeneralPreferences.exempted_urls        
        if exempted_urls \
            and (
                re.match(
                    r'|'.join(exempted_urls.split()), 
                    request.META['PATH_INFO']
               ) is not None
            ):
            return response

        user = getattr(request, 'user', None)
        if (user is not None) and user.is_anonymous():
            if private_site:
                return HttpResponseRedirect(reverse('login'))
            else:
                return HttpResponseRedirect(reverse('age-gateway'))

        return response            


class PaginationMiddleware:
    """Our replacement for django-pagination PaginationMiddleware. It defaults
    to the last page if no page is set on the request. A monkey patch in
    monkey.py handles the negative page number."""

    def process_request(self, request):       
        page = -1
        try:
            page = int(request.REQUEST['page'])
        except (KeyError, ValueError, TypeError):
            pass
        request.__class__.page = page
