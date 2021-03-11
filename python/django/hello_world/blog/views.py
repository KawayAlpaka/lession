from django.shortcuts import render
from django.http import HttpResponse
# Create your views here.

def HelloWorld(request):
  return HttpResponse("Hello, world")
