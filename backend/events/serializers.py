from rest_framework import serializers
from .models import Event

class EventSerializer(serializers.ModelSerializer):
    created_by_username = serializers.ReadOnlyField(source="created_by.username")
    cover_url = serializers.SerializerMethodField()
    remove_cover = serializers.BooleanField(write_only=True, required=False, default=False)

    class Meta:
        model = Event
        fields = [
            "id", "title", "description_html", "category", "venue",
            "start_time", "end_time",
            "registration_open",
            "featured", "online_link",
            "cover", "cover_url", "remove_cover",
            "status",
            "created_by", "created_by_username",
            "created_at", "updated_at",
        ]
        read_only_fields = ["created_by", "created_by_username", "created_at", "updated_at", "cover_url"]

    def get_cover_url(self, obj):
        req = self.context.get("request")
        if obj.cover and hasattr(obj.cover, "url"):
            return req.build_absolute_uri(obj.cover.url) if req else obj.cover.url
        return None

    def validate(self, data):
        st = data.get("start_time") or getattr(self.instance, "start_time", None)
        et = data.get("end_time") or getattr(self.instance, "end_time", None)
        if st and et and et <= st:
            raise serializers.ValidationError("end_time must be after start_time")
        return data

    def create(self, validated):
        user = self.context["request"].user
        validated["created_by"] = user
        # handle remove_cover on create (ignore)
        validated.pop("remove_cover", None)
        return super().create(validated)

    def update(self, instance, validated):
        # remove/replace cover
        if validated.pop("remove_cover", False):
            if instance.cover:
                instance.cover.delete(save=False)
            instance.cover = None
        return super().update(instance, validated)
