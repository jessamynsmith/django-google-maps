web: gunicorn django_google_maps.wsgi:application -b 0.0.0.0:$PORT -w 5

release: python manage.py migrate --noinput
