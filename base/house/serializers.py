# ----- 3rd Party Libraries -----
from rest_framework import serializers

# ----- In-Built Libraries -----
from .models import House

# ----- Model Serializers ------
class HouseSerializer(serializers.ModelSerializer):
    class Meta:
        model = House 
        fields = "__all__"