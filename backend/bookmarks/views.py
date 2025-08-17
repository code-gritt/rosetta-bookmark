from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth import authenticate, login, logout, get_user_model
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authtoken.models import Token
from .models import Bookmark, Tag

User = get_user_model()


@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def signup_view(request):
    email = request.data.get('email')
    password = request.data.get('password')

    if not email or not password:
        return Response({'error': 'Email and password are required'}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(email=email).exists():
        return Response({'error': 'Email already registered'}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(
        username=email, email=email, password=password)
    login(request, user)

    token, _ = Token.objects.get_or_create(user=user)
    return Response(
        {'message': 'User created successfully',
            'token': token.key, 'user_id': user.id},
        status=status.HTTP_201_CREATED
    )


@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    email = request.data.get('email')
    password = request.data.get('password')

    if not email or not password:
        return Response({'error': 'Email and password are required'}, status=status.HTTP_400_BAD_REQUEST)

    user = authenticate(request, username=email, password=password)

    if user is not None:
        login(request, user)
        token, _ = Token.objects.get_or_create(user=user)
        return Response(
            {'message': 'Login successful', 'token': token.key, 'user_id': user.id},
            status=status.HTTP_200_OK
        )

    return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_view(request):
    request.user.auth_token.delete()
    logout(request)
    return Response({'message': 'Logged out successfully'}, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def bookmark_list(request):
    bookmarks = Bookmark.objects.filter(user=request.user)
    return Response([
        {
            'id': b.id,
            'url': b.url,
            'title': b.title,
            'created_at': b.created_at
        } for b in bookmarks
    ], status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def bookmark_create(request):
    url = request.data.get('url')
    title = request.data.get('title', '')

    if not url:
        return Response({'error': 'URL is required'}, status=status.HTTP_400_BAD_REQUEST)

    bookmark = Bookmark.objects.create(user=request.user, url=url, title=title)
    return Response(
        {
            'id': bookmark.id,
            'url': bookmark.url,
            'title': bookmark.title,
            'created_at': bookmark.created_at
        },
        status=status.HTTP_201_CREATED
    )
