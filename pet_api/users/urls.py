# users/urls.py
from django.urls import path
from .views import create_user, login_user, logout_user, get_user, list_users

urlpatterns = [
    path('user', create_user, name='create_user'),
    path('user/login', login_user, name='login_user'),
    path('user/logout', logout_user, name='logout_user'),
    path('user/<str:username>', get_user, name='get_user'), 
    path('users', list_users, name='list_users'),
]
