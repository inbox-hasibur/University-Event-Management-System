# backend/events/admin.py
from django.contrib import admin
from .models import StudentProfile, UserProfile

@admin.register(StudentProfile)
class StudentProfileAdmin(admin.ModelAdmin):
    list_display = ("id", "student_id", "user")
    search_fields = ("student_id", "user__username", "user__email")

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "full_name", "department", "phone")
    search_fields = ("user__username", "user__email", "full_name", "department", "phone")
