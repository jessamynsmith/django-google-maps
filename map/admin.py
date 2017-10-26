from django.contrib.gis import admin as gis_admin
from django.contrib import admin
from map import models as map_models


admin.site.register(map_models.Search, gis_admin.GeoModelAdmin)
