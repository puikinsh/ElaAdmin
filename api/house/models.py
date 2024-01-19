# ----- 3rd Party Libraries -----
from django.db import models

# ----- In-Built Libraries -----
from property.models import Property

# ----- Models -----
class House(models.Model):
    STATUS = (
        ('occupied', 'occupied'),
        ('vacant', 'vacant'),
    )
    house_number = models.CharField(max_length=1000, blank=False)
    type = models.CharField(max_length=1000, blank=False)
    rent = models.FloatField(blank=False)
    status = models.CharField(choices=STATUS, blank=False, default="vacant", max_length=1000)
    property_id = models.ForeignKey(Property, on_delete=models.CASCADE)

    def __str__(self):
        return self.house_number
