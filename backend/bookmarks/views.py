from django.contrib.auth import authenticate, login, logout, get_user_model
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from .models import Bookmark
from django.core.validators import URLValidator
from django.core.exceptions import ValidationError
import requests
from bs4 import BeautifulSoup
from concurrent.futures import ThreadPoolExecutor

User = get_user_model()


# -----------------------------
# AUTH VIEWS
# -----------------------------
@api_view(["POST"])
@permission_classes([AllowAny])
def signup_view(request):
    """Register a new user with email + password. Returns an auth token."""
    email = request.data.get("email")
    password = request.data.get("password")

    if not email or not password:
        return Response(
            {"error": "Email and password are required."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    if User.objects.filter(email=email).exists():
        return Response(
            {"error": "Email already registered."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    try:
        user = User.objects.create_user(
            username=email, email=email, password=password)
        login(request, user)
        token, _ = Token.objects.get_or_create(user=user)

        return Response(
            {
                "message": "User created successfully.",
                "token": token.key,
                "user_id": user.id,
                "email": user.email,
            },
            status=status.HTTP_201_CREATED,
        )
    except Exception as e:
        return Response(
            {"error": f"Something went wrong: {str(e)}"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["POST"])
@permission_classes([AllowAny])
def login_view(request):
    """Authenticate user and return a token."""
    email = request.data.get("email")
    password = request.data.get("password")

    if not email or not password:
        return Response(
            {"error": "Email and password are required."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    user = authenticate(request, username=email, password=password)

    if not user:
        return Response(
            {"error": "Invalid credentials."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    login(request, user)
    token, _ = Token.objects.get_or_create(user=user)

    return Response(
        {
            "message": "Login successful.",
            "token": token.key,
            "user_id": user.id,
            "email": user.email,
        },
        status=status.HTTP_200_OK,
    )


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def logout_view(request):
    """Logout user and delete auth token."""
    try:
        request.user.auth_token.delete()
        logout(request)
        return Response(
            {"message": "Logged out successfully."},
            status=status.HTTP_200_OK,
        )
    except Exception:
        return Response(
            {"error": "Logout failed."},
            status=status.HTTP_400_BAD_REQUEST,
        )


# -----------------------------
# BOOKMARK VIEWS
# -----------------------------
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def bookmark_list(request):
    """List bookmarks of the authenticated user."""
    bookmarks = Bookmark.objects.filter(
        user=request.user).order_by("-created_at")
    data = [
        {"id": b.id, "url": b.url, "title": b.title, "created_at": b.created_at}
        for b in bookmarks
    ]
    return Response(data, status=status.HTTP_200_OK)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def bookmark_create(request):
    """Create a new bookmark for the authenticated user."""
    url = request.data.get("url")
    title = request.data.get("title", "")

    if not url:
        return Response(
            {"error": "URL is required."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    bookmark = Bookmark.objects.create(user=request.user, url=url, title=title)
    return Response(
        {
            "id": bookmark.id,
            "url": bookmark.url,
            "title": bookmark.title,
            "created_at": bookmark.created_at,
        },
        status=status.HTTP_201_CREATED,
    )


@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def bookmark_update(request, pk):
    """Update an existing bookmark for the authenticated user."""
    try:
        bookmark = Bookmark.objects.get(user=request.user, id=pk)
        url = request.data.get("url")
        title = request.data.get("title", "")

        if not url:
            return Response(
                {"error": "URL is required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Validate URL format
        validator = URLValidator()
        validator(url)

        # Prevent duplicate bookmarks
        if Bookmark.objects.filter(user=request.user, url=url).exclude(id=pk).exists():
            return Response(
                {"error": "This URL is already bookmarked."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        bookmark.url = url
        bookmark.title = title
        bookmark.save()
        return Response(
            {
                "id": bookmark.id,
                "url": bookmark.url,
                "title": bookmark.title,
                "created_at": bookmark.created_at.isoformat(),
            },
            status=status.HTTP_200_OK,
        )
    except Bookmark.DoesNotExist:
        return Response(
            {"error": "Bookmark not found."},
            status=status.HTTP_404_NOT_FOUND,
        )
    except ValidationError:
        return Response(
            {"error": "Invalid URL format."},
            status=status.HTTP_400_BAD_REQUEST,
        )
    except Exception as e:
        return Response(
            {"error": f"Failed to update bookmark: {str(e)}"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def bookmark_delete(request, pk):
    """Delete an existing bookmark for the authenticated user."""
    try:
        bookmark = Bookmark.objects.get(user=request.user, id=pk)
        bookmark.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    except Bookmark.DoesNotExist:
        return Response(
            {"error": "Bookmark not found."},
            status=status.HTTP_404_NOT_FOUND,
        )
    except Exception as e:
        return Response(
            {"error": f"Failed to delete bookmark: {str(e)}"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


def fetch_title(url):
    try:
        response = requests.get(url, timeout=5)
        soup = BeautifulSoup(response.text, "html.parser")
        return soup.title.string.strip() if soup.title else ""
    except Exception:
        return ""


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def bookmark_bulk_create(request):
    """Create multiple bookmarks at once, fetching titles in parallel."""
    urls = request.data.get("urls", [])
    if not urls:
        return Response(
            {"error": "At least one URL is required."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    # Validate URLs
    validator = URLValidator()
    for url in urls:
        try:
            validator(url)
        except ValidationError:
            return Response(
                {"error": f"Invalid URL format: {url}"},
                status=status.HTTP_400_BAD_REQUEST,
            )

    # Parallel title fetching with threads (safe in Django)
    with ThreadPoolExecutor(max_workers=8) as executor:
        titles = list(executor.map(fetch_title, urls))

    created_bookmarks = []
    for url, title in zip(urls, titles):
        bookmark = Bookmark.objects.create(
            user=request.user, url=url, title=title)
        created_bookmarks.append(
            {
                "id": bookmark.id,
                "url": bookmark.url,
                "title": bookmark.title,
                "created_at": bookmark.created_at.isoformat(),
            }
        )

    return Response(
        {"message": "Bookmarks created successfully.",
            "bookmarks": created_bookmarks},
        status=status.HTTP_201_CREATED,
    )
