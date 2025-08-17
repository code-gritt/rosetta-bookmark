from django.contrib.auth import authenticate, login, logout, get_user_model
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from .models import Bookmark

User = get_user_model()


# -----------------------------
# AUTH VIEWS
# -----------------------------
@api_view(["POST"])
@permission_classes([AllowAny])
def signup_view(request):
    """
    Register a new user with email + password.
    Returns an auth token.
    """
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
            username=email, email=email, password=password
        )
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
    """
    Authenticate user and return a token.
    """
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
    """
    Logout user and delete auth token.
    """
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
    """
    List bookmarks of the authenticated user.
    """
    bookmarks = Bookmark.objects.filter(
        user=request.user).order_by("-created_at")
    data = [
        {
            "id": b.id,
            "url": b.url,
            "title": b.title,
            "created_at": b.created_at,
        }
        for b in bookmarks
    ]
    return Response(data, status=status.HTTP_200_OK)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def bookmark_create(request):
    """
    Create a new bookmark for the authenticated user.
    """
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
