from django.shortcuts import render, HttpResponse
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from bs4 import BeautifulSoup
import pandas as pd
from .src.rus_dict import create_dict
from .src.language_model import LanguageModel
from .src.preprocess import *
import os

rus_dict = None
rus_by2letters = None
# Create your views here.
class ChatBot(APIView):
     
    def get(self, request):
        print("GET REQUEST")

        return Response("GET REQUEST")
    
    def post(self, request):
        global rus_dict
        global rus_by2letters

        print("POST REQUEST")
        word = request.data.get("message")
        file = request.data.get('file')
        print(file)
        if rus_dict is None and rus_by2letters is None:
            print("Creating dictionary...")
            rus_by2letters, rus_dict = create_dict()
            print("Finished creating dictionary...")
        else:
            print("Dictionary exist")
        
        lm = LanguageModel(rus_dict)

        if word:
            word = preproccessing(word, rus_by2letters, lm)

            word = add_html_markup(word)

            return JsonResponse({'success': True, 'response_message': word})
        elif file:
            data = pd.read_csv(file)
            data["model_res"] = ""
            ans = list(data["Неправильный вариант"])
            for i in range(len(ans)):
                ans[i] = preproccessing(ans[i], rus_by2letters, lm)

            # ans = test(ans)

            for idx, row in data.iterrows():
                ans[idx] = add_html_markup(ans[idx])
            data["model_res"] = pd.Series(ans)
            data.to_csv("modified_ans.csv", index=False)

            return JsonResponse({'success': True, 'response_message': "HELLO"})
        
        return JsonResponse({'success': True, 'response_message': "BADD"})