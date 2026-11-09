"""Pydantic / SQLModel schemas.

All user schemas are defined in models.py using SQLModel to prevent code duplication.
They are re-exported here for convenience and backwards compatibility.
"""

from models import (
    UserBase,
    UserCreate,
    UserLogin,
    UserRead,
    # Aliases matching previous schema names
    UserCreate as RegisterRequest,
    UserLogin as LoginRequest,
    UserRead as UserResponse,
)

__all__ = [
    "UserBase",
    "UserCreate",
    "UserLogin",
    "UserRead",
    "RegisterRequest",
    "LoginRequest",
    "UserResponse",
]
