from django.urls import path
from . import event_views,venue_views
urlpatterns = [
    path("event/",event_views.events),
    path("event/<int:event_id>/",event_views.event_detail),
   
    

    path("venue/<int:venue_id>/",venue_views.venue),

]