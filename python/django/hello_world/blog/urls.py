from django.urls import path

from . import views

urlpatterns = [
    path('hehe', views.HelloWorld, name='haha'),
    path('articles', views.Articles, name='haha'),
]