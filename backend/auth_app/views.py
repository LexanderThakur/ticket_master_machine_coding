from django.shortcuts import render

# Create your views here.
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from rest_framework import status
from django.contrib.auth import get_user_model,authenticate
from django.contrib.auth.hashers import check_password,make_password
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken,AccessToken

from rest_framework.permissions import IsAuthenticated,AllowAny


from drf_spectacular.utils import extend_schema
User = get_user_model()



# class UserCreate(serializers.ModelSerializer):
#     class Meta:
#         model=User
#         fields =["username","password"]

class UserCreate(serializers.Serializer):
    username= serializers.EmailField()
    password = serializers.CharField()

@extend_schema(request=UserCreate)
@api_view(["POST"])
def register(request):
    username = request.data.get("username")
    password=request.data.get("password")

    serializer = UserCreate(data=request.data)
    serializer.is_valid(raise_exception=True)

    if User.objects.filter(username=username).exists():
        return Response({"message":"user already exists"},status=401)

    user = User.objects.create_user(username=username,password=password)
    refresh = RefreshToken.for_user(user)


    
    print(username,password)

    return Response({
        "refresh": str(refresh),
        "access": str(refresh.access_token),
    }, status=status.HTTP_201_CREATED)

@extend_schema(request=UserCreate)
@api_view(["POST"])
def login(request):
    ser = UserCreate(data=request.data)

    username = request.data.get("username")
    password = request.data.get("password")

    user = authenticate(username=username,password=password)
    if not user :
        return Response({"message":"wrong credentials"},status=401)

    token = AccessToken.for_user(user)
    return Response({
        "access": str(token)
    })


# @extend_schema(UserCreate)
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def me(request):

    return Response({"message":request.user.username})
