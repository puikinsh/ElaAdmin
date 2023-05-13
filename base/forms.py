from dataclasses import fields
from enum import unique

from django.forms import ImageField, ModelForm, TextInput, EmailInput, IntegerField

from django import forms
from .models import *
from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User


class MinistryForm(ModelForm):
    class Meta:
        model = Ministry
        fields = "__all__"

class YearGroupForm(ModelForm):
    class Meta:
        model = YearGroup
        fields = "__all__"

class EventForm(ModelForm):
    class Meta:
        model = Event
        fields = "__all__"