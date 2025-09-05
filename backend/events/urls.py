# backend/events/urls.py
from django.urls import path
from .views import health, register_view, login_view, logout_view, me_view

urlpatterns = [
    path("health/", health),
    path("auth/register/", register_view),
    path("auth/login/", login_view),
    path("auth/logout/", logout_view),
    path("auth/me/", me_view),
]
