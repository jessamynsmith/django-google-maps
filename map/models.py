import django.contrib.gis.db.models as gis_models
from django.db import models


class Search(models.Model):
    term = models.CharField(max_length=255, null=True, blank=True)
    position = gis_models.PointField(srid=4326, dim=2)
    results_count = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return "{} ({})".format(self.term, self.position)
