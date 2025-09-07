from django.db import models
from django.conf import settings

class StudentProfile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="student_profile")
    student_id = models.CharField(max_length=50, unique=True)
    def __str__(self): return f"{self.student_id} - {self.user.username}"

class UserProfile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="user_profile")
    full_name  = models.CharField(max_length=120, blank=True)
    department = models.CharField(max_length=120, blank=True)
    phone      = models.CharField(max_length=30, blank=True)
    def __str__(self): return f"Profile({self.user.username})"

# ---------- Events ----------
class Event(models.Model):
    CATEGORY_DEPARTMENTAL = "departmental"
    CATEGORY_NON_DEPARTMENTAL = "non_departmental"
    CATEGORY_OUTSIDE = "outside"
    CATEGORY_CHOICES = [
        (CATEGORY_DEPARTMENTAL, "Departmental"),
        (CATEGORY_NON_DEPARTMENTAL, "Non-Departmental"),
        (CATEGORY_OUTSIDE, "Outside the university"),
    ]

    STATUS_DRAFT = "draft"
    STATUS_PUBLISHED = "published"
    STATUS_CHOICES = [(STATUS_DRAFT, "Draft"), (STATUS_PUBLISHED, "Published")]

    title = models.CharField(max_length=200)
    description_html = models.TextField(blank=True)  # store rich text as HTML
    category = models.CharField(max_length=32, choices=CATEGORY_CHOICES)
    venue = models.CharField(max_length=255)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()

    # registration: show "registration is going on" vs "closed"
    registration_open = models.BooleanField(default=False)

    featured = models.BooleanField(default=False)
    online_link = models.URLField(blank=True)

    cover = models.ImageField(upload_to="events/covers/", null=True, blank=True)

    status = models.CharField(max_length=16, choices=STATUS_CHOICES, default=STATUS_DRAFT)

    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="events")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["start_time"]
        indexes = [
            models.Index(fields=["start_time", "status"]),
            models.Index(fields=["featured"]),
            models.Index(fields=["category"]),
        ]

    @property
    def is_outside(self):
        return self.category == self.CATEGORY_OUTSIDE

    def __str__(self): return self.title
