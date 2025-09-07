from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    health, register_view, login_view, logout_view, me_view,
    profile_view, admin_stats, admin_users, admin_assign_manager, admin_delete_user,
    EventViewSet
)

router = DefaultRouter()
router.register(r"events", EventViewSet, basename="events")

urlpatterns = [
    path("health/", health),

    # auth
    path("auth/register/", register_view),
    path("auth/login/", login_view),
    path("auth/logout/", logout_view),
    path("auth/me/", me_view),

    # profile
    path("profile/", profile_view),

    # admin
    path("admin/stats/", admin_stats),
    path("admin/users/", admin_users),
    path("admin/users/<int:user_id>/assign_manager/", admin_assign_manager),
    path("admin/users/<int:user_id>/", admin_delete_user),

    # events
    path("", include(router.urls)),
]
