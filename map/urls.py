from django.conf.urls import include, url
from django.views.generic import TemplateView
from rest_framework import routers

from map import views as map_views


router = routers.DefaultRouter()
router.register(r'businesses', map_views.BusinessViewSet, base_name='businesses')


urlpatterns = [
    url(r'^$', TemplateView.as_view(template_name="map/map.html")),
    url(r'^api/v1/', include(router.urls)),
]
