
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import serializers

from . models import Venue,Event,Ticket

from django.shortcuts import get_object_or_404

## Venue Seatmap in General




class VenueSer(serializers.ModelSerializer):
    class Meta:
        model = Venue 
        fields = "__all__"

@api_view(["GET"])
def venue(request,venue_id):

    venue = get_object_or_404(Venue,id=venue_id)
    ser = VenueSer(venue)

    return Response({"message":ser.data})



## GET all available seats for a event


# class TicketSer(serializers.ModelSerializer):
#     class  Meta:
#         model =Ticket
#         fields = ["event","seat","status","price"]

# @api_view(["GET"])
# def venue_available(request,venue_id,event_id,):



#     available = Ticket.objects.filter(
#         event=event_id,venue=venue_id,status='available'
#         )
#     ser = TicketSer(available,many=True)
#     return Response({"message":ser.data})

    




