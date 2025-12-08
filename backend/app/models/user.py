"""
User model for Encore Habit Tracker.
Synced with Keycloak for authentication.
"""
from sqlalchemy import Column, String, Boolean, DateTime, Enum as SQLEnum
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from app.database import Base
import uuid
from datetime import datetime
import enum


class WeekStart(enum.Enum):
    """Week start day preference."""
    SUNDAY = 0
    MONDAY = 1


class Theme(enum.Enum):
    """App theme preference."""
    LIGHT = "light"
    DARK = "dark"
    SYSTEM = "system"


class User(Base):
    """
    User model representing a Encore user.

    Users are authenticated via Keycloak, and this model stores
    user preferences and premium status.
    """
    __tablename__ = "users"

    # Primary key
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)

    # Keycloak integration
    keycloak_id = Column(String, unique=True, nullable=False, index=True, comment="Keycloak user UUID")

    # User information
    email = Column(String, unique=True, nullable=False, index=True)
    display_name = Column(String(100), nullable=True)
    avatar_url = Column(String(500), nullable=True)

    # Premium status
    is_premium = Column(Boolean, default=False, nullable=False, comment="Premium subscription status")
    premium_expires_at = Column(DateTime, nullable=True, comment="Premium subscription expiration date")

    # Preferences
    timezone = Column(String(50), default="UTC", nullable=False)
    week_starts_on = Column(SQLEnum(WeekStart), default=WeekStart.SUNDAY, nullable=False)
    theme = Column(SQLEnum(Theme), default=Theme.SYSTEM, nullable=False)

    # Notification preferences
    notifications_enabled = Column(Boolean, default=True, nullable=False)
    reminder_time = Column(String(5), default="09:00", nullable=True, comment="HH:MM format")

    # Timestamps
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)
    last_login_at = Column(DateTime, nullable=True)

    # Relationships
    habits = relationship("Habit", back_populates="user", cascade="all, delete-orphan")
    achievements = relationship("Achievement", back_populates="user", cascade="all, delete-orphan")

    def __repr__(self):
        return f"<User {self.email} (Premium: {self.is_premium})>"

    @property
    def is_active_premium(self) -> bool:
        """Check if user has active premium subscription."""
        if not self.is_premium:
            return False
        if self.premium_expires_at is None:
            return True  # Lifetime premium
        return datetime.utcnow() < self.premium_expires_at

    def to_dict(self):
        """Convert user to dictionary representation."""
        return {
            "id": str(self.id),
            "keycloak_id": self.keycloak_id,
            "email": self.email,
            "display_name": self.display_name,
            "avatar_url": self.avatar_url,
            "is_premium": self.is_active_premium,
            "premium_expires_at": self.premium_expires_at.isoformat() if self.premium_expires_at else None,
            "timezone": self.timezone,
            "week_starts_on": self.week_starts_on.value,
            "theme": self.theme.value,
            "notifications_enabled": self.notifications_enabled,
            "reminder_time": self.reminder_time,
            "created_at": self.created_at.isoformat(),
            "updated_at": self.updated_at.isoformat(),
            "last_login_at": self.last_login_at.isoformat() if self.last_login_at else None,
        }
