"""
Completion model for tracking habit completion records.
"""
from sqlalchemy import Column, String, Boolean, DateTime, ForeignKey, Date, UniqueConstraint
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from app.database import Base
import uuid
from datetime import datetime, date


class Completion(Base):
    """
    Completion model representing a single habit completion or freeze.

    Each completion is unique per habit per date.
    """
    __tablename__ = "completions"
    __table_args__ = (
        UniqueConstraint('habit_id', 'date', name='unique_habit_date_completion'),
    )

    # Primary key
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)

    # Foreign key to habit
    habit_id = Column(
        UUID(as_uuid=True),
        ForeignKey("habits.id", ondelete="CASCADE"),
        nullable=False,
        index=True
    )

    # Completion details
    date = Column(Date, nullable=False, index=True, comment="Completion date (YYYY-MM-DD)")
    completed_at = Column(DateTime, default=datetime.utcnow, nullable=False, comment="When marked complete")

    # Freeze tracking
    used_freeze = Column(Boolean, default=False, nullable=False, comment="Was a freeze used for this day")
    is_manual = Column(Boolean, default=False, nullable=False, comment="Manually logged (vs auto-freeze)")

    # Optional note
    note = Column(String(500), nullable=True, comment="User's optional note")

    # Metadata
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    # Relationships
    habit = relationship("Habit", back_populates="completions")

    def __repr__(self):
        freeze_marker = " [FREEZE]" if self.used_freeze else ""
        return f"<Completion {self.habit_id} on {self.date}{freeze_marker}>"

    @property
    def is_today(self) -> bool:
        """Check if completion is for today."""
        return self.date == date.today()

    @property
    def days_ago(self) -> int:
        """Calculate how many days ago this completion was."""
        return (date.today() - self.date).days

    def to_dict(self):
        """Convert completion to dictionary representation."""
        return {
            "id": str(self.id),
            "habit_id": str(self.habit_id),
            "date": self.date.isoformat(),
            "completed_at": self.completed_at.isoformat(),
            "used_freeze": self.used_freeze,
            "is_manual": self.is_manual,
            "note": self.note,
            "created_at": self.created_at.isoformat(),
            "updated_at": self.updated_at.isoformat(),
            "days_ago": self.days_ago,
            "is_today": self.is_today,
        }
