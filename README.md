# django-google-maps

This is an example of a heroku-deployable app using postgis and google maps.
https://django-google-maps.herokuapp.com/


Like my work? Tip me! https://www.paypal.me/jessamynsmith


### Development

Fork the project on github and git clone your fork, e.g.:

    git clone https://github.com/<username>/django-google-maps.git

Create a virtualenv using Python 3 and install dependencies. I recommend getting python3 using a package manager (homebrew on OSX), then installing [virtualenv](https://virtualenv.pypa.io/en/latest/installation.html) and [virtualenvwrapper](https://virtualenvwrapper.readthedocs.org/en/latest/install.html#basic-installation) to that python. NOTE! You must change 'path/to/python3'
to be the actual path to python3 on your system.

    mkvirtualenv django-google-maps --python=/path/to/python3
    pip install -r requirements/development.txt
    
Sign up for the Yelp Fusion API and create an app as directed: https://www.yelp.com/developers/documentation/v3/authentication
Set environment variables for your Yelp app:

    export YELP_CLIENT_ID=<VALUE_FROM_YELP>
    export YELP_CLIENT_SECRET=<VALUE_FROM_YELP>
    
Sign up for a Google maps and get an API key: https://developers.google.com/maps/documentation/javascript/get-api-key
Set environment variable for Google maps:

    export GOOGLE_MAPS_API_KEY=<VALUE_FROM_GOOGLE>

Set environment variables as desired. Recommended dev settings:

    export DJANGO_DEBUG=1
    export DJANGO_ENABLE_SSL=0

Optional environment variables, generally only required in production:

    DJANGO_SECRET_KEY
    
You can add the exporting of environment variables to the virtualenv activate script so they are always available.

##### Database

This app requires PostgreSQL. I recommend installing using a package manager (homebrew on OSX).

Create a database:

    createdb django-google-maps
    
Enable the postgis extension:

    psql django-google-maps
    create extension postgis;

Set up db:

    python manage.py migrate


##### Testing

Run tests:

    python manage.py test

Check code style:

    flake8

Run server:

    python manage.py runserver
    
Or run using gunicorn:

    gunicorn django-google-maps.wsgi

Lint JavaScript:

    ./node_modules/jshint/bin/jshint */static/*/js


### Continuous Integration and Deployment


This project is already set up for deployment to Heroku.

Create application (note the geo buildpack will only work on cedar-14):

    heroku create --stack cedar-14 <app_name>
    
Be sure to add your heroku app to ALLOWED_HOSTS in settings.py
    
Add postgresql addon:
    
    heroku addons:add heroku-postgresql
    
Enable extension in database:

    heroku pg:psql
    create extension postgis;
    
Add Heroku buildpacks:

    heroku buildpacks:set -i 1 https://github.com/cyberdelia/heroku-geo-buildpack.git
    heroku buildpacks:set -i 2 heroku/python
    
Set environment variables:

    heroku config:set YELP_CLIENT_ID=<VALUE_FROM_YELP>
    heroku config:set YELP_CLIENT_SECRET=<VALUE_FROM_YELP>
    heroku config:set GOOGLE_MAPS_API_KEY=<VALUE_FROM_GOOGLE>

You can deploy manually using:

    git push heroku master
    
Or configure Heroku for automatic deployment from GitHub.
