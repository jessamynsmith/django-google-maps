from django.conf import settings
from django.contrib.gis.geos import Point
from django.http import JsonResponse
from rest_framework import permissions, viewsets
from rest_framework.views import APIView
from yelpapi import YelpAPI

from map import models as map_models
from map import serializers as map_serializers


class SearchViewSet(viewsets.ModelViewSet):
    serializer_class = map_serializers.SearchSerializer
    queryset = map_models.Search.objects.all()


class YelpView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, *args, **kwargs):
        yelp_api = YelpAPI(settings.YELP_API_KEY)

        search_results = yelp_api.search_query(**self.request.GET)

        term = request.GET.get('term')
        longitude = float(request.GET.get('longitude'))
        latitude = float(request.GET.get('latitude'))
        results_count = search_results['total']
        map_models.Search.objects.create(term=term,
                                         position=Point(longitude, latitude),
                                         results_count=results_count)

        return JsonResponse(search_results)
