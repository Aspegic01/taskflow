from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select

from database import get_db
from models import User, UserCreate, UserLogin, UserRead
from security import hash_password, verify_password

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/register", response_model=UserRead, status_code=status.HTTP_201_CREATED)
def register(user_data: UserCreate, db: Session = Depends(get_db)):
    stmt = select(User).where(User.email == user_data.email)
    existing_user = db.exec(stmt).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered",
        )

    # Use provided nickname or fallback to first_name
    nickname = user_data.nickname if user_data.nickname else user_data.first_name

    new_user = User(
        first_name=user_data.first_name,
        last_name=user_data.last_name,
        email=user_data.email,
        password_hash=hash_password(user_data.password),
        nickname=nickname,
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


@router.post("/login", response_model=UserRead)
def login(credentials: UserLogin, db: Session = Depends(get_db)):
    stmt = select(User).where(User.email == credentials.email)
    user = db.exec(stmt).first()
    if not user or not user.password_hash or not verify_password(credentials.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    return user
