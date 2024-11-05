from django.urls import path
from .views import create_user, login_user, logout_user, get_user, list_users

urlpatterns = [
    path('', create_user, name='create_user'),  
    path('login/', login_user, name='login_user'),  
    path('logout/', logout_user, name='logout_user'), 
    path('<str:username>/', get_user, name='get_user'),  
    path('list/', list_users, name='list_users'),  
]
