"""
Achievement model for gamification and user milestones.
"""
from sqlalchemy import Column, String, Boolean, DateTime, ForeignKey, Enum as SQLEnum
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from app.database import Base
import uuid
from datetime import datetime
import enum


class AchievementType(enum.Enum):
    """Types of achievements users can unlock."""
    # First-time achievements
    FIRST_HABIT = "first_habit"
    FIRST_COMPLETION = "first_completion"

    # Streak milestones
    STREAK_7 = "streak_7"           # Week Warrior
    STREAK_14 = "streak_14"         # Fortnight Force
    STREAK_30 = "streak_30"         # Monthly Master
    STREAK_50 = "streak_50"         # Habit Hero
    STREAK_100 = "streak_100"       # Centurion

    # Consistency achievements
    PERFECT_WEEK = "perfect_week"   # All habits completed 7/7 days
    PERFECT_MONTH = "perfect_month" # All habits completed 30/30 days

    # Volume achievements
    COMPLETIONS_100 = "completions_100"   # 100 total completions
    COMPLETIONS_500 = "completions_500"   # 500 total completions
    COMPLETIONS_1000 = "completions_1000" # 1000 total completions

    # Freeze system
    EARNED_FIRST_FREEZE = "earned_first_freeze"
    FREEZE_SAVER = "freeze_saver"   # Saved a streak with freeze

    # Premium
    PREMIUM_MEMBER = "premium_member"


class Achievement(Base):
    """
    Achievement model representing unlocked user achievements.

    Tracks when and how users earned various badges and milestones.
    """
    __tablename__ = "achievements"

    # Primary key
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)

    # Foreign key to user
    user_id = Column(
        UUID(as_uuid=True),
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        index=True
    )

    # Achievement details
    type = Column(SQLEnum(AchievementType), nullable=False, index=True)

    # Optional habit reference (for habit-specific achievements)
    habit_id = Column(
        UUID(as_uuid=True),
        ForeignKey("habits.id", ondelete="SET NULL"),
        nullable=True
    )

    # Metadata
    unlocked_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    seen_by_user = Column(Boolean, default=False, nullable=False, comment="User viewed the achievement")

    # Relationships
    user = relationship("User", back_populates="achievements")

    def __repr__(self):
        return f"<Achievement {self.type.value} for user {self.user_id}>"

    @property
    def display_name(self) -> str:
        """Get user-friendly achievement name."""
        names = {
            AchievementType.FIRST_HABIT: "First Step",
            AchievementType.FIRST_COMPLETION: "Getting Started",
            AchievementType.STREAK_7: "Week Warrior 🔥",
            AchievementType.STREAK_14: "Fortnight Force 💪",
            AchievementType.STREAK_30: "Monthly Master 🏆",
            AchievementType.STREAK_50: "Habit Hero 👑",
            AchievementType.STREAK_100: "Centurion 💯",
            AchievementType.PERFECT_WEEK: "Perfect Week ⭐",
            AchievementType.PERFECT_MONTH: "Perfect Month 🌟",
            AchievementType.COMPLETIONS_100: "Century Club",
            AchievementType.COMPLETIONS_500: "Consistency Champion",
            AchievementType.COMPLETIONS_1000: "Master of Habits",
            AchievementType.EARNED_FIRST_FREEZE: "Freeze Unlocked",
            AchievementType.FREEZE_SAVER: "Streak Saver ❄️",
            AchievementType.PREMIUM_MEMBER: "Premium Member 💎",
        }
        return names.get(self.type, self.type.value)

    @property
    def icon(self) -> str:
        """Get emoji icon for achievement."""
        icons = {
            AchievementType.FIRST_HABIT: "🌱",
            AchievementType.FIRST_COMPLETION: "✅",
            AchievementType.STREAK_7: "🔥",
            AchievementType.STREAK_14: "💪",
            AchievementType.STREAK_30: "🏆",
            AchievementType.STREAK_50: "👑",
            AchievementType.STREAK_100: "💯",
            AchievementType.PERFECT_WEEK: "⭐",
            AchievementType.PERFECT_MONTH: "🌟",
            AchievementType.COMPLETIONS_100: "📈",
            AchievementType.COMPLETIONS_500: "🎯",
            AchievementType.COMPLETIONS_1000: "🏅",
            AchievementType.EARNED_FIRST_FREEZE: "❄️",
            AchievementType.FREEZE_SAVER: "🛡️",
            AchievementType.PREMIUM_MEMBER: "💎",
        }
        return icons.get(self.type, "🏅")

    def to_dict(self):
        """Convert achievement to dictionary representation."""
        return {
            "id": str(self.id),
            "user_id": str(self.user_id),
            "type": self.type.value,
            "display_name": self.display_name,
            "icon": self.icon,
            "habit_id": str(self.habit_id) if self.habit_id else None,
            "unlocked_at": self.unlocked_at.isoformat(),
            "seen_by_user": self.seen_by_user,
        }
