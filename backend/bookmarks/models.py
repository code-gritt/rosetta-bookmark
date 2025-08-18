from django.contrib.auth.models import AbstractUser
from django.db import models


class CustomUser(AbstractUser):
    is_premium = models.BooleanField(default=False)

    def __str__(self):
        return self.email or self.username


class Tag(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name


class Bookmark(models.Model):
    user = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, related_name="bookmarks"
    )
    url = models.URLField(max_length=2048)  # updated from 200 to 2048
    title = models.CharField(max_length=255, blank=True)  # updated max_length
    created_at = models.DateTimeField(auto_now_add=True)
    tags = models.ManyToManyField(Tag, blank=True)

    def __str__(self):
        return self.url


class Credit(models.Model):
    user = models.OneToOneField(
        CustomUser, on_delete=models.CASCADE, related_name="credit")
    credits = models.IntegerField(default=50)  # start with 50 free credits

    def __str__(self):
        return f"{self.user.email} - {self.credits} credits"
