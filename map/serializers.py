from rest_framework_gis import serializers

from map import models as map_models


class BusinessSerializer(serializers.GeoModelSerializer):

    class Meta:
        model = map_models.Business
        exclude = []
