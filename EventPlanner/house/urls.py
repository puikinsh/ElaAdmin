# ----- 3rd Party Libraries -----
from django.urls import path

# ----- In-Built Libraries -----
from house import views

# ----- URL endpoints -----
house_list = views.HouseViews.as_view({
    'post': 'create',
    'get': 'list',
})
house_detail = views.HouseViews.as_view({
    'get': 'retrieve',
    'put': 'update',
})

urlpatterns = [
    path("property", house_list, name='house_list'),
    path('property/<int:pk>', house_detail, name="house_detail"),
]