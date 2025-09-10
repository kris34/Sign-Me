from . import bcrypt


def hash_password(password: str) -> str:
    if not password:
        print('Invalid passwod in has_password')
        return ''

    hash = bcrypt.generate_password_hash(password)
    return hash


def check_password(hash: str, password: str) -> bool:
    if not password:
        print('Invalid password in check_password!')
        return ''

    checked = bcrypt.check_password_hash(password)
    return checked
