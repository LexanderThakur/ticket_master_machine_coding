from rest_framework.decorators import permission_classes,api_view
from drf_spectacular.utils import extend_schema
from rest_framework.response import Response
from rest_framework import status,serializers
from rest_framework.permissions import IsAuthenticated,AllowAny

from django.contrib.auth import get_user_model
from . models import Event,Performer,Venue,Ticket

from django.shortcuts import get_object_or_404
User = get_user_model()





class EventSer(serializers.ModelSerializer):
    venue = serializers.CharField(source = "venue.name")
    performer = serializers.CharField(source = "performer.name")
    class Meta:
        model = Event
        fields = "__all__"


class TicketSer(serializers.ModelSerializer):
    class  Meta:
        model =Ticket
        fields = ["id","event","seat","status","price"]

@api_view(["GET"])
def event_detail(request,event_id):

    event = Event.objects.get(id=event_id)
    ser = EventSer(event)
    tickets = event.tickets.all()

    return Response({"event":ser.data,"tickets":TicketSer(tickets,many=True).data})



@api_view(["GET"])
def events(request):
    events = Event.objects.all()
    ser= EventSer(events,many = True)
    return Response({"message":ser.data})












