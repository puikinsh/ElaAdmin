# ----- 3rd Party Libraries -----
from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet

# ----- In-Built Libraries -----
from .models import House
from .serializers import HouseSerializer

# ----- CPU endpoints -----
class HouseViews(ModelViewSet):
    queryset = House.object.all()
    serializer_class = HouseSerializer