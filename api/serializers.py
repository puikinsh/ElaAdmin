# ----- 3rd Party Libraries -----
from rest_framework import serializers

# -----In-Built Libraries -----
from base.models import Ministry
from base.models import YearGroup
from base.models import Event

class MinistrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Ministry
        fields = "__all__"

class YearGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = YearGroup
        fields = "__all__"

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = "__all__"