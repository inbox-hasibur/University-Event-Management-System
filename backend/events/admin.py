from django.contrib import admin
from .models import StudentProfile

@admin.register(StudentProfile)
class StudentProfileAdmin(admin.ModelAdmin):
    list_display = ("id", "student_id", "user")
    search_fields = ("student_id", "user__username", "user__email")
