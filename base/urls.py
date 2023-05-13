from django.urls import path
from . import views

urlpatterns = [
    path('forms', views.addForms, name="addForms"),
    path('', views.home, name="home"),
    path('ministries', views.ministry, name="ministries"),
    path('update/<ministryid>', views.update1, name="updateministry"),
    path('delete/<ministryid>', views.delete1, name="deleteministry"),
    path('deleteyear/<yearGroupid>', views.delete2, name="deleteyeargroup"),
    path('deleteEvent/<eventsid>', views.delete3, name="deleteEvent"),
    path('yeargroups', views.yearGroup, name="yeargroups"),
    path('events', views.events, name="events"),
    path('registrations', views.regUsers, name="registrations"),
    path('login', views.login_user, name='login'),
    path('logout', views.logout_user, name='logout'),
]