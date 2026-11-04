from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column

from database import Base


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(
        primary_key=True
    )

    first_name: Mapped[str] = mapped_column(
        String(50)
    )

    last_name: Mapped[str] = mapped_column(
        String(50)
    )

    email: Mapped[str] = mapped_column(
        String(255),
        unique=True,
        index=True
    )

    password_hash: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True
    )

    nickname: Mapped[str] = mapped_column(
        String(50)
    )