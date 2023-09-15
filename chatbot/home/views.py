from django.shortcuts import render, HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.
class ChatBot(APIView):
     
    def get(self, request):
        print("G ET REQUEST")

        return Response("GET REQUEST")
    
    def post(self, request):
        print("POST REQUEST")
        return Response("POST REQUEST")