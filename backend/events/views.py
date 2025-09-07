# backend/events/views.py
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login, logout, get_user_model
from django.contrib.auth.models import Group
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication
from .models import StudentProfile, UserProfile
from rest_framework import viewsets
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.authentication import SessionAuthentication
from django.db.models import Q
from .serializers import EventSerializer
from .models import Event


def health(request):
    return JsonResponse({"status": "ok", "service": "auth+profile"})

# --- CSRF-exempt session authentication for dev convenience ---
class CsrfExemptSessionAuthentication(SessionAuthentication):
    def enforce_csrf(self, request):  # skip CSRF check
        return

User = get_user_model()

def role_of(user):
    if not user or not user.is_authenticated:
        return None
    if user.is_superuser or user.is_staff:
        return "admin"
    if user.groups.filter(name="manager").exists():
        return "manager"
    if hasattr(user, "student_profile"):
        return "student"
    return "student"  # default

# ---------- Auth (already working in your app) ----------
@csrf_exempt
@api_view(["POST"])
@authentication_classes([CsrfExemptSessionAuthentication])
@permission_classes([AllowAny])
def register_view(request):
    # unchanged logic you already have
    role = request.data.get("role", "student")
    if role != "student": return Response({"detail": "Only students can self-register."}, status=400)
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
    UserProfile.objects.get_or_create(user=user)
    login(request, user)
    return Response({"username": user.username, "role": "student", "student_id": student_id})

@csrf_exempt
@api_view(["POST"])
@authentication_classes([CsrfExemptSessionAuthentication])
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
        u = User.objects.filter(email=email).first() if email else None
        if u and u.groups.filter(name="manager").exists():
            user = u
    elif role == "admin":
        u = User.objects.filter(email=email).first() if email else None
        if u and (u.is_superuser or u.is_staff):
            user = u

    if not user:
        return Response({"detail": "User not found for role/identifier"}, status=404)

    user = authenticate(request, username=user.username, password=password)
    if user is None:
        return Response({"detail": "Invalid credentials"}, status=400)

    login(request, user)
    return Response({
        "username": user.username,
        "role": role_of(user),
        "student_id": getattr(getattr(user, "student_profile", None), "student_id", None)
    })

@csrf_exempt
@api_view(["POST"])
@authentication_classes([CsrfExemptSessionAuthentication])
def logout_view(request):
    logout(request)
    return Response({"ok": True})

@api_view(["GET"])
def me_view(request):
    u = request.user
    r = role_of(u)
    return Response({
        "is_authenticated": bool(u and u.is_authenticated),
        "username": getattr(u, "username", None),
        "role": r,
        "student_id": getattr(getattr(u, "student_profile", None), "student_id", None),
    })

# ---------- Profile ----------
@api_view(["GET", "PATCH"])
@authentication_classes([CsrfExemptSessionAuthentication])
def profile_view(request):
    u = request.user
    if not (u and u.is_authenticated):
        return Response({"detail": "not authenticated"}, status=401)

    # ensure the profile row exists
    prof, _ = UserProfile.objects.get_or_create(user=u)

    if request.method == "PATCH":
        data = request.data or {}
        # allow updating these fields
        for k in ["full_name", "department", "phone"]:
            if k in data:
                setattr(prof, k, data.get(k, "") or "")
        # allow email update (optional)
        if "email" in data:
            u.email = data["email"]
            u.save(update_fields=["email"])
        prof.save()
    return Response({
        "username": u.username,
        "email": u.email,
        "role": role_of(u),
        "student_id": getattr(getattr(u, "student_profile", None), "student_id", None),
        "full_name": prof.full_name,
        "department": prof.department,
        "phone": prof.phone,
    })

# ---------- Admin-only ----------
def require_admin(user):
    return bool(user and user.is_authenticated and (user.is_superuser or user.is_staff))

@api_view(["GET"])
@authentication_classes([CsrfExemptSessionAuthentication])
def admin_stats(request):
    if not require_admin(request.user):
        return Response({"detail": "forbidden"}, status=403)
    qs = User.objects.all()
    total = qs.count()
    admins = qs.filter(is_staff=True).count()
    managers = qs.filter(groups__name="manager").distinct().count()
    students = StudentProfile.objects.count()
    return Response({
        "users_total": total,
        "admins": admins,
        "managers": managers,
        "students": students,
        "events": 0  # placeholder until Events module lands
    })

@api_view(["GET"])
@authentication_classes([CsrfExemptSessionAuthentication])
def admin_users(request):
    if not require_admin(request.user):
        return Response({"detail": "forbidden"}, status=403)
    rows = []
    for u in User.objects.all().select_related():
        rows.append({
            "id": u.id,
            "username": u.username,
            "email": u.email,
            "role": role_of(u),
            "student_id": getattr(getattr(u, "student_profile", None), "student_id", None),
        })
    return Response(rows)

@api_view(["POST"])
@authentication_classes([CsrfExemptSessionAuthentication])
def admin_assign_manager(request, user_id: int):
    if not require_admin(request.user):
        return Response({"detail": "forbidden"}, status=403)
    try:
        u = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return Response({"detail": "user not found"}, status=404)
    g, _ = Group.objects.get_or_create(name="manager")
    g.user_set.add(u)
    return Response({"ok": True, "user_id": u.id, "role": role_of(u)})

@api_view(["DELETE"])
@authentication_classes([CsrfExemptSessionAuthentication])
def admin_delete_user(request, user_id: int):
    if not require_admin(request.user):
        return Response({"detail": "forbidden"}, status=403)
    try:
        u = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return Response({"detail": "user not found"}, status=404)
    if u.is_superuser or u.is_staff:
        return Response({"detail": "cannot delete admin user"}, status=400)
    u.delete()
    return Response({"ok": True})


# CSRF-exempt session auth (we used this already)
class CsrfExemptSessionAuthentication(SessionAuthentication):
    def enforce_csrf(self, request): return

def is_admin(user):
    return bool(user and user.is_authenticated and (user.is_superuser or user.is_staff))

def is_manager(user):
    return bool(user and user.is_authenticated and user.groups.filter(name="manager").exists())

# Custom permission
from rest_framework.permissions import BasePermission, SAFE_METHODS

class EventPermission(BasePermission):
    """
    - Read: everyone
    - Create: admin or manager
    - Update/Delete: admin or owner (manager who created it)
    """
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        u = request.user
        return is_admin(u) or is_manager(u)

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        u = request.user
        if is_admin(u):
            return True
        return obj.created_by_id == getattr(u, "id", None)

class EventViewSet(viewsets.ModelViewSet):
    serializer_class = EventSerializer
    authentication_classes = [CsrfExemptSessionAuthentication]
    permission_classes = [EventPermission]
    parser_classes = [MultiPartParser, FormParser, JSONParser]
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ["title", "description_html", "venue"]
    ordering_fields = ["start_time", "created_at"]
    ordering = ["start_time"]

    def get_queryset(self):
        qs = Event.objects.select_related("created_by").all()

        p = self.request.query_params
        # filters
        if p.get("status"):
            qs = qs.filter(status=p["status"])
        if p.get("category"):
            qs = qs.filter(category=p["category"])
        if p.get("featured") == "1":
            qs = qs.filter(featured=True)
        if p.get("mine") == "1" and self.request.user.is_authenticated:
            qs = qs.filter(created_by=self.request.user)
        if p.get("outside") == "1":
            qs = qs.filter(category=Event.CATEGORY_OUTSIDE)
        # ordering
        ordg = p.get("ordering")
        if ordg in ["start_time", "-start_time", "created_at", "-created_at"]:
            qs = qs.order_by(ordg)
        return qs
