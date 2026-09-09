from django.urls import path 


from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView


from . import views
urlpatterns = [
    path("register/",views.register),
    # path('login/',TokenObtainPairView.as_view()),
    path('login/',views.login),
    path('me/',views.me),
    
]