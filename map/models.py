import django.contrib.gis.db.models as gis_models
from django.db import models


# TODO maybe implement a record of search queries and only go to yelp for new queries
# This will involve making yelp queries from django rather than having the front end
# call the angular app on heroku

class Business(models.Model):
    title = models.CharField(max_length=255)
    url = models.URLField()
    position = gis_models.PointField(null=True, blank=True)

    class Meta:
        unique_together = (('title', 'url', 'position'),)

    def __str__(self):
        return "{}".format(self.title)
