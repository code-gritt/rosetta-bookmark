#!/usr/bin/env bash
set -o errexit

# Move into backend folder
cd backend

# Export Poetry dependencies into requirements.txt
poetry export -f requirements.txt --without-hashes -o requirements.txt

# Install dependencies
pip install -r requirements.txt

# Collect static files (optional but recommended for production)
python manage.py collectstatic --noinput
