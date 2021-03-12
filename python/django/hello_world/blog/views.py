from django.shortcuts import render
from django.http import HttpResponse
from .models import Article
# Create your views here.

def HelloWorld(request):
  return HttpResponse("Hello, world")

def Articles(request):
  return HttpResponse(",".join([a.title for a in Article.objects.all()]))

def detail(request,id):
  print(id)
  return render(request,'detail.html',{
    "name":"晓明",
    "id":id
  })