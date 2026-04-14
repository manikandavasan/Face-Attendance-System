from django.urls import path
from .views import *

urlpatterns = [
    path('register/', RegisterUser.as_view()),
    path('signin/', SignInUser.as_view()),
    path('attendance_data/', AttendanceData.as_view())
]