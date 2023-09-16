from django.shortcuts import render, HttpResponse
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from bs4 import BeautifulSoup

# Create your views here.
class ChatBot(APIView):
     
    def get(self, request):
        print("G ET REQUEST")

        return Response("GET REQUEST")
    
    def post(self, request):
        print("POST REQUEST")
        
        word = request.data.get("message")

        # Parse the HTML string
        soup = BeautifulSoup(word, 'html.parser')

        # Find all tags and modify their content
        for tag in soup.find_all():
            # Check if the tag has text content
            if tag.string:
                # Modify the content as needed, for example, remove leading/trailing spaces
                tag.string = tag.string + "hi"

        # Get the modified HTML string
        modified_html = str(soup)

        print(modified_html)


        return JsonResponse({'success': True, 'response_message': modified_html})