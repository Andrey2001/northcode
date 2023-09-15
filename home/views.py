from django.shortcuts import render, HttpResponse
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.
class ChatBot(APIView):
     
    def get(self, request):
        print("G ET REQUEST")

        return Response("GET REQUEST")
    
    def post(self, request):
        print("POST REQUEST")
        print(request.data.get("message"))

        return JsonResponse({'success': True, 'response_message': 'Опа, а вот и ответ'})