from django.urls import path
from . import event_views,venue_views
urlpatterns = [
    path("events/",event_views.events),
    path("events/<int:event_id>/",event_views.event_detail),
   
    

    path("venues/<int:venue_id>/",venue_views.venue),

]