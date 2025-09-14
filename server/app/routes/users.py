from app.utils import hash_password, check_password
from flask import Blueprint, request, jsonify, session
from app.models import User
from app import db
from ..services .user_service import check_if_user_exists, get_user

users_bp = Blueprint("users", __name__)


@users_bp.route('/register', methods=["POST"])
def register():
    data = request.get_json()

    email = data.get('email')
    first_name = data.get('firstName')
    last_name = data.get('lastName')
    password = data.get('password')
    repeat_password = data.get('repeatPassword')

    is_user_existing = check_if_user_exists(email)

    if is_user_existing:
        return jsonify({"error": "User already exists!"}), 405

    if password != repeat_password:
        return jsonify({"error": "Passwords do not match!"}), 400

    if len(password) < 12:
        return jsonify({"error": "Password is too short!"}), 405

    if not email or not first_name or not last_name:
        return jsonify({"error": "Invalid email or username"}), 400

    hash = hash_password(password)

    new_user = User(first_name=first_name, email=email,
                    last_name=last_name, password=hash)

    db.session.add(new_user)
    db.session.commit()

    session['email'] = email

    return jsonify({"message": "User registered successfully", "data": data}), 201


@users_bp.route('/login', methods=["POST"])
def login():
    data = request.get_json()

    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify('Invalid email or password!'), 405

    foundUser = get_user(email)

    if not foundUser:
        return jsonify('User not found!'), 400

    hash = foundUser.password
    unhashed_password = check_password(hash, password)

    if not unhashed_password:
        return jsonify("Invalid password while attempting to log in!"), 405

    return jsonify({"message": "User logged in successfully!", "data": data}), 201
