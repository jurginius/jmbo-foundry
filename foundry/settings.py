"""
This is a sample settings.py adapted from the one generated by jmbo-paste. It
is intended for use in a development environment. You need to change some
private settings before using it in a production environment.
"""

import os
import sys
from os import path

# Paths
SCRIPT_PATH =  path.abspath(path.dirname(__file__))
BUILDOUT_PATH =  path.split(path.abspath(path.join(path.dirname(sys.argv[0]))))[0]

PROJECT_MODULE = 'foundry'

DEBUG = True
TEMPLATE_DEBUG = DEBUG

# For MySQL remember to first do from a MySQL shell:
# CREATE database foundry;
# GRANT ALL ON foundry.* TO 'foundry'@'localhost' IDENTIFIED BY 'foundry';
# GRANT ALL ON test_foundry.* TO 'foundry'@'localhost' IDENTIFIED BY 'foundry';
# FLUSH PRIVILEGES;

DATABASES = {
    'default': {
        'ENGINE': 'mysql', # Add 'postgresql_psycopg2', 'postgresql', 'mysql', 'sqlite3' or 'oracle'.
        'NAME': 'foundry', # Or path to database file if using sqlite3.
        'USER': 'foundry', # Not used with sqlite3.
        'PASSWORD': 'foundry', # Not used with sqlite3.
        'HOST': '', # Set to empty string for localhost. Not used with sqlite3.
        'PORT': '', # Set to empty string for default. Not used with sqlite3.
    }
}

# Local time zone for this installation. Choices can be found here:
# http://en.wikipedia.org/wiki/List_of_tz_zones_by_name
# although not all choices may be available on all operating systems.
# If running in a Windows environment this must be set to the same as your
# system time zone.
TIME_ZONE = 'America/Chicago'

# Language code for this installation. All choices can be found here:
# http://www.i18nguy.com/unicode/language-identifiers.html
LANGUAGE_CODE = 'en-us'

SITE_ID = 1

# If you set this to False, Django will make some optimizations so as not
# to load the internationalization machinery.
USE_I18N = True

# Absolute path to the directory that holds media.
# Example: "/home/media/media.lawrence.com/"
MEDIA_ROOT = '%s/media/' % BUILDOUT_PATH



# URL that handles the media served from MEDIA_ROOT. Make sure to use a
# trailing slash if there is a path component (optional in other cases).
# Examples: "http://media.lawrence.com", "http://example.com/media/"
MEDIA_URL = '/media/'

STATIC_ROOT = '%s/static/' % BUILDOUT_PATH

STATIC_URL = '/static/'

# URL prefix for admin media -- CSS, JavaScript and images. Make sure to use a
# trailing slash.
# Examples: "http://foo.com/media/", "/media/".
#ADMIN_MEDIA_PREFIX = '%s/media/admin/' % HOST
ADMIN_MEDIA_PREFIX = '/static/admin/'

# Make this unique, and don't share it with anybody.
SECRET_KEY = 't7lf+w70_4w7u4q(ijo&vx19t=%$_03ymp2afr*s8sm0@_3asm'

MIDDLEWARE_CLASSES = (
    'django.middleware.common.CommonMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'foundry.middleware.AgeGateway',                            
    'django.contrib.messages.middleware.MessageMiddleware',
    'likes.middleware.SecretBallotUserIpUseragentMiddleware',
    'foundry.middleware.PaginationMiddleware',
    'foundry.middleware.VerboseRequestMeta',                    
    'django.middleware.transaction.TransactionMiddleware',
)

# A tuple of callables that are used to populate the context in RequestContext. 
# These callables take a request object as their argument and return a 
# dictionary of items to be merged into the context.
TEMPLATE_CONTEXT_PROCESSORS = (
    "django.contrib.auth.context_processors.auth",
    "django.contrib.messages.context_processors.messages",
    "django.core.context_processors.debug",
    "django.core.context_processors.i18n",
    "django.core.context_processors.media",
    "django.core.context_processors.static",
    "django.core.context_processors.request",
    'preferences.context_processors.preferences_cp',
    'foundry.context_processors.foundry',
)

TEMPLATE_LOADERS = (
    'django.template.loaders.filesystem.load_template_source',
    'django.template.loaders.app_directories.load_template_source',
    'foundry.loaders.TypeLoader',
)

TEMPLATE_DIRS = (
    # Put strings here, like "/home/html/django_templates" or "C:/www/django/templates".
    # Always use forward slashes, even on Windows.
    # Don't forget to use absolute paths, not relative paths.
    os.path.join(os.path.dirname(__file__), "templates"),
)

ROOT_URLCONF = 'foundry.urls'

INSTALLED_APPS = (
    'foundry',
    'section',
    'gallery',
    'googlesearch',
    'music',
    'export',
    'foundry',
    'snippetscream',
    'generate',
    'cal',
    'jmbo',
    'photologue',
    'chart',
    'captcha',
    'secretballot',
#    'richcomments', # re-evaluate this product. It needs to degrade to non-ajax as well.
    'publisher',
#    'social',	# xxx: removed since can't download socialregistration-tokenstore tarball currently
    'category',
    'post',
    'likes',
    'gizmo',
    'object_tools',
    'registration',
    'show',
    'event',
    'preferences',
    'banner',
    'competition',
    'ckeditor',
    'contact',
    'simple_autocomplete', # custom
    'pagination', # custom
    'south', # custom - add to paster
    'django.contrib.auth',
    'django.contrib.comments',
    'django.contrib.contenttypes',
    'django.contrib.humanize',
    'django.contrib.sessions',
    'django.contrib.sites',
    'django.contrib.staticfiles',
    'django.contrib.admin',
)


TEMPLATE_TYPE = "basic"

# Your ReCaptcha provided public key.
RECAPTCHA_PUBLIC_KEY = '6LccPr4SAAAAAJRDO8gKDYw2QodyRiRLdqBhrs0n'

# Your ReCaptcha provided private key.
RECAPTCHA_PRIVATE_KEY = '6LccPr4SAAAAAH5q006QCoql-RRrRs1TFCpoaOcw'

# Module containing gizmo configuration
ROOT_GIZMOCONF = '%s.gizmos' % PROJECT_MODULE

# URL prefix for ckeditor JS and CSS media (not uploaded media). Make sure to use a trailing slash.
CKEDITOR_MEDIA_PREFIX = '/media/ckeditor/'

# Specify absolute path to your ckeditor media upload directory.
# Make sure you have write permissions for the path, i.e/home/media/media.lawrence.com/uploads/
CKEDITOR_UPLOAD_PATH = '%s/media/uploads/' % BUILDOUT_PATH

# LASTFM_API_KEY = '' # custom - fix in paster

LOGIN_URL = '/login'        # check if in paster

LOGIN_REDIRECT_URL = '/'    # check if inpaster

# todo: add setting to foundry paster
AUTHENTICATION_BACKENDS = (
    'foundry.backends.MultiBackend',
    'django.contrib.auth.backends.ModelBackend',
)

COMMENTS_APP = 'foundry'

SIMPLE_AUTOCOMPLETE = {
    'auth.user': {'threshold': 20},
    'category.category': {'threshold':20}
}

FOUNDRY = {
    'has_javascript': True,
    'has_ajax': True
}
