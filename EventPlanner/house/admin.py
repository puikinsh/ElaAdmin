from django.contrib import admin

# ----- In-Built Libraries -----
from .models import House

# ----- Model Registration -----
admin.site.register(House)
