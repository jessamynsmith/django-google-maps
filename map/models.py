import django.contrib.gis.db.models as gis_models
from django.db import models


class Business(models.Model):
    title = models.CharField(max_length=255)
    url = models.URLField()
    position = gis_models.PointField(null=True, blank=True)

    class Meta:
        unique_together = (('title', 'url', 'position'),)

    def __str__(self):
        return "{}".format(self.title)
