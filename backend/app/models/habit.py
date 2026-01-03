"""
Habit model for tracking user habits with streaks.
"""
from sqlalchemy import Column, String, Boolean, Integer, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from app.database import Base
import uuid
from datetime import datetime


class Habit(Base):
    """
    Habit model representing a user's habit to track.

    Includes streak tracking, freeze system, and goal management.
    """
    __tablename__ = "habits"

    # Primary key
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)

    # Foreign key to user
    user_id = Column(
        UUID(as_uuid=True),
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        index=True
    )

    # Habit details
    name = Column(String(50), nullable=False, comment="Habit name (max 50 chars)")
    icon = Column(String(10), default="🎯", nullable=False, comment="Emoji icon")
    color = Column(String(7), default="#f97316", nullable=False, comment="Hex color code")

    # Freeze system
    freeze_mode = Column(Boolean, default=True, nullable=False, comment="Enable/disable freeze protection")
    freezes_available = Column(Integer, default=0, nullable=False, comment="Available freezes (0-2)")

    # Streak and goals
    streak_goal = Column(Integer, default=7, nullable=False, comment="Target streak length")
    current_streak = Column(Integer, default=0, nullable=False, comment="Current consecutive days")
    best_streak = Column(Integer, default=0, nullable=False, comment="Highest streak achieved")

    # Statistics
    total_completions = Column(Integer, default=0, nullable=False, comment="Total times completed")
    total_freezes_used = Column(Integer, default=0, nullable=False, comment="Lifetime freezes used")

    # Status
    is_archived = Column(Boolean, default=False, nullable=False, comment="Soft delete flag")

    # Timestamps
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)
    last_completed_at = Column(DateTime, nullable=True, comment="Last completion timestamp")

    # Relationships
    user = relationship("User", back_populates="habits")
    completions = relationship("Completion", back_populates="habit", cascade="all, delete-orphan")

    def __repr__(self):
        return f"<Habit '{self.name}' (streak: {self.current_streak}, user: {self.user_id})>"

    @property
    def completion_rate(self) -> float:
        """
        Calculate completion rate as percentage.
        Based on days since creation.
        """
        if not self.created_at:
            return 0.0

        days_since_creation = (datetime.utcnow() - self.created_at).days + 1
        if days_since_creation == 0:
            return 0.0

        return min(100.0, (self.total_completions / days_since_creation) * 100)

    @property
    def progress_to_goal(self) -> float:
        """Calculate progress to current streak goal as percentage."""
        if self.streak_goal == 0:
            return 100.0
        return min(100.0, (self.current_streak / self.streak_goal) * 100)

    @property
    def can_earn_freeze(self) -> bool:
        """Check if eligible to earn a new freeze."""
        return (
            self.freeze_mode and
            self.freezes_available < 2 and
            self.current_streak >= 7 and
            self.current_streak % 7 == 0
        )

    def to_dict(self, include_stats: bool = False):
        """Convert habit to dictionary representation."""
        data = {
            "id": str(self.id),
            "user_id": str(self.user_id),
            "name": self.name,
            "icon": self.icon,
            "color": self.color,
            "freeze_mode": self.freeze_mode,
            "freezes_available": self.freezes_available,
            "streak_goal": self.streak_goal,
            "current_streak": self.current_streak,
            "best_streak": self.best_streak,
            "total_completions": self.total_completions,
            "is_archived": self.is_archived,
            "created_at": self.created_at.isoformat(),
            "updated_at": self.updated_at.isoformat(),
            "last_completed_at": self.last_completed_at.isoformat() if self.last_completed_at else None,
        }

        if include_stats:
            data.update({
                "completion_rate": round(self.completion_rate, 2),
                "progress_to_goal": round(self.progress_to_goal, 2),
                "total_freezes_used": self.total_freezes_used,
                "can_earn_freeze": self.can_earn_freeze,
            })

        return data
