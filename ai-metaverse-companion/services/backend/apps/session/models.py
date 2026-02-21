from django.db import models


# Create your models here.
class Session(models.Model):

    session_id = models.CharField(max_length=255, unique=True)

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.session_id
