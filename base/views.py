from multiprocessing import context
from django.shortcuts import redirect, render
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import get_user_model
from django.contrib.auth.decorators import login_required
from .forms import *
# Create your views here.

@login_required(login_url='login')
def addForms(request):
    form1 = MinistryForm
    form2 = YearGroupForm
    form3 = EventForm  # noqa: F405

    if request.method == "POST" and 'ministrybtn' in request.POST:
        form1 = MinistryForm(request.POST)  # noqa: F405
        if form1.is_valid:
            form1.save()
            messages.success(request, 'Ministry created successfully')
            return redirect('/ministries')

    if request.method == "POST" and 'yeargroupbtn' in request.POST:
        form2 = YearGroupForm(request.POST)  # noqa: F405
        if form2.is_valid:
            form2.save()
            messages.success(request, 'YearGroup created successfully')
            return redirect('/yeargroups')

    if request.method == "POST" and 'eventbtn' in request.POST:
        form3 = EventForm(request.POST)  # noqa: F405
        if form3.is_valid():
            form3.save()
            messages.success(request, 'Event created successfully')
            return redirect('/events')
        else:
            print (form3.errors)

    context = {'form1':form1, 'form2':form2, 'form3':form3}
    return render(request, 'forms-basic.html', context)

@login_required(login_url='login')
def home(request):

    context = {}
    return render(request, "index.html", context)

@login_required(login_url='login')
def ministry(request):
    ministry = Ministry.objects.all()

    context = {'ministry':ministry}
    return render(request, "tables-basic.html", context)

@login_required(login_url='login')
def update1(request, ministryid):

    ministry = Ministry.objects.get(pk=ministryid)

    form1 = MinistryForm(request.POST or None, instance=ministry)

    if request.method=="POST":
        if form1.is_valid:
            form1.save()
            messages.success(request, 'Ministry updated successfully')
            return redirect('/')

    context = {'form1':form1, 'ministry':ministry}
    return render(request, 'forms-basic.html', context)

@login_required(login_url='login')
def delete1(request, ministryid):

    ministry = Ministry.objects.get(pk=ministryid)

    ministry.delete()

    return redirect('/ministries')

@login_required(login_url='login')
def events(request):
    events = Event.objects.all()

    context = {'events':events}
    return render(request, "table-events.html", context)

@login_required(login_url='login')
def delete3(request, eventsid):

    events = Event.objects.get(pk=eventsid)

    events.delete()

    return redirect('/events')

@login_required(login_url='login')
def yearGroup(request):
    yeargroup = YearGroup.objects.all()

    context = {'yeargroup':yeargroup}
    return render(request, "table-year.html", context)

@login_required(login_url='login')
def delete2(request, yearGroupid):

    yeargroup = YearGroup.objects.get(pk=yearGroupid)

    yeargroup.delete()

    return redirect('/yeargroups')

@login_required(login_url='login')
def regUsers(request):

    context = {}
    return render(request, "tables-data.html", context)

def login_user(request):

    if request.method=="POST":
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return redirect('/')
        else:
            # Return an 'invalid login' error message.
            messages.success(request, ("Invalid username or password"))
            return redirect('/')

    else:

        return render(request, 'page-login.html')

@login_required(login_url='login')
def logout_user(request):

    logout(request)
    return redirect('login')