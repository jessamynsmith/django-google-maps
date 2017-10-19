from rest_framework import viewsets

from map import models as map_models
from map import serializers as map_serializers


class BusinessViewSet(viewsets.ModelViewSet):
    serializer_class = map_serializers.BusinessSerializer
    queryset = map_models.Business.objects.all()
