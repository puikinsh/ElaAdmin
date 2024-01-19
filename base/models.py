from django.db import models
import qrcode
from io import BytesIO
from django.core.files import File
from PIL import Image, ImageDraw
import uuid

# Create your models here.

class Event(models.Model):
    CHOICES = (
        ('Upcoming Event','Upcoming Event'),
        ('Past Event', 'Past Event')
    )
    uuid = models.UUIDField(primary_key=True, unique=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=10000)
    speaker = models.CharField(max_length=10000)
    venue = models.CharField(max_length=10000)
    date = models.DateTimeField()
    status = models.CharField(max_length=50, choices=CHOICES, blank=True, null=True, default='Upcoming Event')
    qr_code = models.ImageField(upload_to='qrcodes', blank=True, null=True )

    def save(self, *args, **kwargs):
        url = "http://127.0.0.1:8000/"+str({self.uuid})
        qr_image = qrcode.make(url)
        qr_offset = Image.new('RGB', (310, 310), 'white')
        qr_offset.paste(qr_image)
        files_name = f'{self.name}-{self.uuid}qr.png'
        stream = BytesIO()
        qr_offset.save(stream, 'PNG')
        self.qr_code.save(files_name, File(stream), save=False)
        qr_offset.close()
        super().save(*args, **kwargs)

class Ministry(models.Model):
    name =  models.CharField(max_length=10000)
    
    def __str__(self):
        return self.name

class YearGroup(models.Model):
    name = models.CharField(max_length=10000)