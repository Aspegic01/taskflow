from pydantic import EmailStr
from sqlmodel import Field, SQLModel


# Shared fields for User models
class UserBase(SQLModel):
    first_name: str = Field(min_length=1, max_length=50)
    last_name: str = Field(min_length=1, max_length=50)
    email: EmailStr = Field(unique=True, index=True, max_length=255)
    nickname: str | None = Field(default=None, max_length=50)


# Database table model
class User(UserBase, table=True):
    __tablename__ = "users"

    id: int | None = Field(default=None, primary_key=True)
    password_hash: str | None = Field(default=None, max_length=255)


# Schema for registration input (includes password)
class UserCreate(UserBase):
    password: str = Field(min_length=8, max_length=128)


# Schema for login credentials
class UserLogin(SQLModel):
    email: EmailStr
    password: str


# Schema for returning user data (omits password)
class UserRead(UserBase):
    id: int
