from app.utils import hash_password, check_password
from flask import Blueprint, request, jsonify
from app.models import User
from app import db

users_bp = Blueprint("users", __name__)


@users_bp.route('/register', methods=["POST"])
def register():
    data = request.get_json()

    email = data.get('email')
    username = data.get('firstName')
    last_name = data.get('lastName')

    if not email or not username or not last_name:
        return jsonify({"Invalid email or username"}), 400

    new_user = User(username=username, email=email, last_name=last_name)

    db.session.add(new_user)
    db.session.commit()

    import os
    print("DB path:", os.path.abspath("mydatabase.db"))
    print("All users:", User.query.all())

    return jsonify({"message": "User registered successfully", "data": data}), 201
