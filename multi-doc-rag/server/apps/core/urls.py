from django.urls import path
from .views import (
    health_check,
    upload_document,
    upload_resume,
)

urlpatterns = [
    path("health/", health_check),
    path("documents/upload/", upload_document),
    path("resume/upload/", upload_resume)
]