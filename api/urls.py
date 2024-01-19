# ----- 3rd Party Libraries -----
from django.urls import path

# ----- In-Built Libraries -----
from api import views


urlpatterns = [
    path('ministry', views.MinistryViews.as_view()),
    path('ministry/<int:pk>', views.MinistryDetail.as_view()),
    path('yeargroup', views.YearGroupViews.as_view()),
    path('yeargroup/<int:pk>', views.YearGroupDetail.as_view()),
    path('event', views.EventViews.as_view()),
]