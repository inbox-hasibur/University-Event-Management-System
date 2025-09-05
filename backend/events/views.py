from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login, logout, get_user_model

from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from .models import StudentProfile

def health(request):
    return JsonResponse({"status": "ok", "service": "auth"})

User = get_user_model()

@csrf_exempt
@api_view(["POST"])
@authentication_classes([])              # <- no SessionAuthentication => no CSRF check here
@permission_classes([AllowAny])
def register_view(request):
    role = request.data.get("role", "student")
    if role != "student":
        return Response({"detail": "Only students can self-register."}, status=400)

    username   = request.data.get("username")
    student_id = request.data.get("student_id")
    email      = request.data.get("email", "")
    password   = request.data.get("password")

    if not username or not student_id or not password:
        return Response({"detail": "username, student_id and password are required"}, status=400)
    if User.objects.filter(username=username).exists():
        return Response({"detail": "username already taken"}, status=400)
    if StudentProfile.objects.filter(student_id=student_id).exists():
        return Response({"detail": "student_id already exists"}, status=400)

    user = User.objects.create_user(username=username, password=password, email=email)
    StudentProfile.objects.create(user=user, student_id=student_id)
    login(request, user)
    return Response({"username": user.username, "role": "student", "student_id": student_id})

@csrf_exempt
@api_view(["POST"])
@authentication_classes([])              # <- no CSRF check
@permission_classes([AllowAny])
def login_view(request):
    role = request.data.get("role", "student")
    email = request.data.get("email")
    student_id = request.data.get("student_id")
    password = request.data.get("password")

    user = None
    if role == "student":
        if student_id:
            prof = StudentProfile.objects.filter(student_id=student_id).select_related("user").first()
            user = getattr(prof, "user", None)
        if user is None and email:
            user = User.objects.filter(email=email).first()
    elif role == "manager":
        if email:
            u = User.objects.filter(email=email).first()
            if u and u.groups.filter(name="manager").exists():
                user = u
    elif role == "admin":
        if email:
            u = User.objects.filter(email=email).first()
            if u and (u.is_superuser or u.is_staff):
                user = u

    if not user:
        return Response({"detail": "User not found for role/identifier"}, status=404)

    user = authenticate(request, username=user.username, password=password)
    if user is None:
        return Response({"detail": "Invalid credentials"}, status=400)

    login(request, user)

    returned_role = "student"
    if user.is_superuser or user.is_staff:
        returned_role = "admin"
    elif user.groups.filter(name="manager").exists():
        returned_role = "manager"

    return Response({
        "username": user.username,
        "role": returned_role,
        "student_id": getattr(getattr(user, "student_profile", None), "student_id", None)
    })

@csrf_exempt
@api_view(["POST"])
@authentication_classes([])              # <- no CSRF check
def logout_view(request):
    logout(request)
    return Response({"ok": True})

@api_view(["GET"])
def me_view(request):
    u = request.user
    role = None
    if u and u.is_authenticated:
        if u.is_superuser or u.is_staff:
            role = "admin"
        elif u.groups.filter(name="manager").exists():
            role = "manager"
        elif hasattr(u, "student_profile"):
            role = "student"
    return Response({
        "is_authenticated": bool(u and u.is_authenticated),
        "username": getattr(u, "username", None),
        "role": role,
        "student_id": getattr(getattr(u, "student_profile", None), "student_id", None),
    })
