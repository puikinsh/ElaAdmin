# ----- 3rd party Libraries -----
from django.shortcuts import render
from rest_framework import viewsets, status, generics
from rest_framework.response import Response
from rest_framework.views import APIView

# ----- In-Built Libraries -----
from base.models import Ministry
from base.models import YearGroup
from base.models import Event
from .serializers import EventSerializer
from .serializers import MinistrySerializer
from .serializers import YearGroupSerializer

# Create your views here.

class MinistryViews(APIView):
    queryset = Ministry.objects.all()
    serializer_class = MinistrySerializer

    def post(self, request):
        serializer = MinistrySerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get(self, request):
        try:
            ministry = Ministry.objects.all()
            serializer = MinistrySerializer(ministry, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        except Exception as e:
            raise e

class MinistryDetail(APIView):

    def put(self, request,  pk:int):
        ministry = self.get_object(pk)

        serializer = MinistrySerializer(ministry, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        return Response(serializer.errors,  status=status.HTTP_400_BAD_REQUEST)    
    
    def get_object(self, pk):
        try:
            return Ministry.objects.get(pk=pk)
        except Exception as e:
            raise e
        
    def get(self, request, pk):
        try:
            ministry = self.get_object(pk)
            serializer = MinistrySerializer(ministry)

            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            raise e
        
class YearGroupViews(generics.ListCreateAPIView):
    queryset = YearGroup.objects.all()
    serializer_class = YearGroupSerializer

class YearGroupDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = YearGroup.objects.all()
    serializer_class = YearGroupSerializer

class EventViews(generics.ListCreateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer