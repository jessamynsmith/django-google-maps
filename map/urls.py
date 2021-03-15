from django.urls import include, path
from django.views.generic import TemplateView
from rest_framework import routers

from map import views as map_views


router = routers.DefaultRouter()
router.register(r'searches', map_views.SearchViewSet, basename='searches')


urlpatterns = [
    path('', TemplateView.as_view(template_name="map/map.html")),
    path('api/v1/', include(router.urls)),
    path('api/v1/yelp/search/', map_views.YelpView.as_view()),
]
