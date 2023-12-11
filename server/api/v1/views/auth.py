#!/usr/bin/python3
""" Auth API endpoints """
from datetime import datetime
from api.v1.views import app_views
from flask import jsonify, request
from services.auth.auth_provider import authenticate
from services.auth.jwt_handler import generate_jwt
from services.auth.auth_guard import auth_guard
from werkzeug.security import generate_password_hash, check_password_hash
from models.user import User
from models import storage


@app_views.route("/auth", methods=["POST"])
def auth():
    email = request.json.get("email")
    password = request.json.get("password")
    if not email or not password:
        return jsonify({"message": "Email or password missing", "status": 400}), 400

    user_data = authenticate(email, password)
    if not user_data:
        return jsonify({"message": "Invalid credentials", "status": 400}), 400

    token = generate_jwt(
        payload=user_data, lifetime=60
    )  # <--- generates a JWT with valid within 1 hour by now
    return jsonify({"data": token, "status": 200}), 200


def validate_signup_data(data):
    required_fields = ["email", "password", "username", "role", "age", "phone", "gender"]
    output = {}

    for field in required_fields:
        if field not in data:
            output[field] = f"Missing required field: {field}"
    
    if len(output) != 0:
        return False, output

    # Additional validation logic can be added here based on your requirements
    return True, None


@app_views.route("/signup", methods=["POST"])
def signup():
    request_data = request.json

    # Validate incoming data
    is_valid, error_message = validate_signup_data(request_data)
    if not is_valid:
        return jsonify({"error": error_message}), 400

    email = request_data["email"]
    password = request_data["password"]
    username = request_data["username"]
    role = request_data["role"]
    age = request_data["age"]
    phone = request_data["phone"]
    gender = request_data["gender"]

    new_user = User(
        email=email,
        password=generate_password_hash(password, method="pbkdf2:sha256"),
        username=username,
        role=role,
        phone=phone,
        gender=gender,
        age=age,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow(),
    )
    storage.new(new_user)
    storage.save()
    return jsonify(new_user.as_dict()), 201
