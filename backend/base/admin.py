from django.contrib import admin
from . models import User,Event,Performer,Venue,Ticket
# Register your models here.


admin.site.register(Event)
admin.site.register(Performer)
admin.site.register(Venue)
admin.site.register(Ticket)