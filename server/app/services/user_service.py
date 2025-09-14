from app import db
from app.models import User
from sqlalchemy import select


def check_if_user_exists(email: str) -> bool:
    user = db.session.execute(
        db.select(User).filter_by(email=email)
    ).scalars().first()

    return user is not None


def get_user(email: str):
    if not email:
        print("Invalid email in get_user")
        return None

    stmt = select(User).where(User.email == email)
    result = db.session.execute(stmt).scalars().first()
    return result;
