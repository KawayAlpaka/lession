from django.urls import path

from . import views

urlpatterns = [
    path('hehe', views.HelloWorld, name='haha'),
]