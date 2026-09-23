from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import serializers
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from datetime import datetime,timezone
from .models import Ticket




@api_view(["POST"])
@permission_classes([IsAuthenticated])
def reserve_tickets(request):
    tickets = request.data.get("tickets")
    print(tickets)

    for ticket in tickets:
        obj = get_object_or_404(Ticket,id=ticket)
        if obj.status!="available":
            return Response({"Reserving not possible"},status=403)
        obj.status="reserved"
        obj.user=request.user
        obj.reserved_at=datetime.now(timezone.utc)
        obj.save()

    return Response({"message":"reserve success"},status=204)
        

    