from django.db import models

# Create your models here.
from django.contrib.auth import get_user_model

User = get_user_model()



class Performer(models.Model):
    name = models.TextField()
    description=models.TextField(blank=True)

class Venue(models.Model):
    name = models.TextField()
    
    location = models.TextField()
    

    seat_map = models.JSONField(default=dict)

class Event(models.Model):
    name = models.TextField()
    description = models.TextField(blank=True)
    venue = models.ForeignKey(Venue,on_delete=models.CASCADE)
    performer = models.ForeignKey(Performer,on_delete=models.CASCADE)

class Ticket(models.Model):


    class Status(models.TextChoices):
        Available = "available"
        Booked ="booked"
        Reserved = "reserved"


    event = models.ForeignKey(
        Event,on_delete=models.CASCADE,related_name="tickets"
        )
    
    seat = models.CharField(max_length=20)
    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.Available
    )
    user = models.ForeignKey(
        User,null=True,blank=True,on_delete=models.SET_NULL,
        related_name="tickets"
        )
    price = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )
    reserved_at = models.DateTimeField(null=True,blank=True)



    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["event","seat"],
                name="unique seat per event"
            )
        ]

