from django.contrib.auth import authenticate, login, logout, get_user_model
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from .models import Bookmark, Credit
from django.core.validators import URLValidator
from django.core.exceptions import ValidationError
import requests
from bs4 import BeautifulSoup
from concurrent.futures import ThreadPoolExecutor
import logging

User = get_user_model()
logger = logging.getLogger(__name__)

# -----------------------------
# PayPal Configuration
# -----------------------------
PAYPAL_CLIENT_ID = "AQ2xrVh_Yg5wrf_GIm-iHRZ51aE5WT75sfpP1fTY6EZP1z122DX6o7qoX5ft2Fhq_2kE2oThif-ZLmSQ"
PAYPAL_CLIENT_SECRET = "EKEMx4AL8dQTSUkfJgw4n9FHOgo0TnS2mHDAh2QkctDHpZ7P3q9fFg6YNRepfTyK9hLaZZXwYJNkbHG8"
PAYPAL_API_BASE_URL = "https://api-m.paypal.com"


# -----------------------------
# Utility Functions
# -----------------------------
def fetch_title(url):
    try:
        response = requests.get(url, timeout=5)
        soup = BeautifulSoup(response.text, "html.parser")
        return soup.title.string.strip() if soup.title else ""
    except Exception:
        return ""


def get_access_token():
    auth = (PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET)
    response = requests.post(
        f"{PAYPAL_API_BASE_URL}/v1/oauth2/token",
        auth=auth,
        data={"grant_type": "client_credentials"},
    )
    response.raise_for_status()
    return response.json()["access_token"]


# -----------------------------
# AUTH VIEWS
# -----------------------------
@api_view(["POST"])
@permission_classes([AllowAny])
def signup_view(request):
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
        # Create initial credits
        Credit.objects.get_or_create(user=user, defaults={"credits": 50})

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
        logger.error(f"Signup failed: {str(e)}")
        return Response(
            {"error": f"Something went wrong: {str(e)}"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["POST"])
@permission_classes([AllowAny])
def login_view(request):
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
    url = request.data.get("url")
    title = request.data.get("title", "")

    if not url:
        return Response({"error": "URL is required."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        credit, _ = Credit.objects.get_or_create(user=request.user)
        if credit.credits < 5:
            return Response(
                {"error": "Insufficient credits. Please upgrade."},
                status=status.HTTP_402_PAYMENT_REQUIRED,
            )

        validator = URLValidator()
        validator(url)

        bookmark = Bookmark.objects.create(
            user=request.user, url=url, title=title)
        credit.credits -= 5
        credit.save()

        return Response(
            {
                "id": bookmark.id,
                "url": bookmark.url,
                "title": bookmark.title,
                "created_at": bookmark.created_at,
                "credits_remaining": credit.credits,
            },
            status=status.HTTP_201_CREATED,
        )
    except ValidationError:
        return Response({"error": "Invalid URL format."}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        logger.error(f"Bookmark creation failed: {str(e)}")
        return Response(
            {"error": f"Failed to create bookmark: {str(e)}"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def bookmark_update(request, pk):
    try:
        bookmark = Bookmark.objects.get(user=request.user, id=pk)
        url = request.data.get("url")
        title = request.data.get("title", "")

        if not url:
            return Response({"error": "URL is required."}, status=status.HTTP_400_BAD_REQUEST)

        validator = URLValidator()
        validator(url)

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
        return Response({"error": "Bookmark not found."}, status=status.HTTP_404_NOT_FOUND)
    except ValidationError:
        return Response({"error": "Invalid URL format."}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        logger.error(f"Bookmark update failed: {str(e)}")
        return Response(
            {"error": f"Failed to update bookmark: {str(e)}"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def bookmark_delete(request, pk):
    try:
        bookmark = Bookmark.objects.get(user=request.user, id=pk)
        bookmark.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    except Bookmark.DoesNotExist:
        return Response({"error": "Bookmark not found."}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        logger.error(f"Bookmark delete failed: {str(e)}")
        return Response(
            {"error": f"Failed to delete bookmark: {str(e)}"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def bookmark_bulk_create(request):
    urls = request.data.get("urls", [])
    if not urls:
        return Response(
            {"error": "At least one URL is required."}, status=status.HTTP_400_BAD_REQUEST
        )

    try:
        credit, _ = Credit.objects.get_or_create(user=request.user)
        total_cost = 5 * len(urls)
        if credit.credits < total_cost:
            return Response(
                {"error": "Insufficient credits. Please upgrade."},
                status=status.HTTP_402_PAYMENT_REQUIRED,
            )

        validator = URLValidator()
        for url in urls:
            validator(url)

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

        credit.credits -= total_cost
        credit.save()

        return Response(
            {
                "message": "Bookmarks created successfully.",
                "bookmarks": created_bookmarks,
                "credits_remaining": credit.credits,
            },
            status=status.HTTP_201_CREATED,
        )
    except ValidationError as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        logger.error(f"Bulk bookmark creation failed: {str(e)}")
        return Response(
            {"error": f"Failed to create bookmarks: {str(e)}"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


# -----------------------------
# PAYPAL CALLBACK
# -----------------------------
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def paypal_payment_callback(request):
    payment_id = request.data.get("paymentId")
    if not payment_id:
        return Response(
            {"error": "Payment ID is required."}, status=status.HTTP_400_BAD_REQUEST
        )

    try:
        access_token = get_access_token()
        headers = {"Authorization": f"Bearer {access_token}"}
        response = requests.get(
            f"{PAYPAL_API_BASE_URL}/v2/checkout/orders/{payment_id}",
            headers=headers,
        )
        response.raise_for_status()
        payment = response.json()

        if payment["status"] == "COMPLETED":
            credit, _ = Credit.objects.get_or_create(user=request.user)
            credit.credits += 1000
            credit.save()
            return Response(
                {
                    "message": "Payment successful. 1000 credits added.",
                    "credits_remaining": credit.credits,
                },
                status=status.HTTP_200_OK,
            )

        return Response({"error": "Payment not completed."}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        logger.error(f"Payment callback failed: {str(e)}")
        return Response(
            {"error": f"Payment verification failed: {str(e)}"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_credits(request):
    credit, _ = Credit.objects.get_or_create(user=request.user)
    return Response({"credits": credit.credits}, status=status.HTTP_200_OK)
