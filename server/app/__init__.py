from flask import Flask, session
from flask_session import Session
from datetime import timedelta

from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_bcrypt import Bcrypt

db = SQLAlchemy()
bcrypt = Bcrypt()


def create_app():
    app = Flask(__name__)

    app.config['SECRET_KEY'] = 'your-secret-key'
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///mydatabase.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    # session config    
    app.config['SESSION_TYPE'] = "filesystem"
    app.config['SESSION_COOKIE_SAMESITE'] = "None"
    app.config['SESSION_COOKIE_SECURE'] = True
    app.config['SESSION_PERMANENT'] = True
    app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(hours=24)

    Session(app)
    bcrypt.init_app(app)
    db.init_app(app)
    CORS(app, supports_credentials=True)

    from .routes import register_blueprints
    register_blueprints(app)

    return app
