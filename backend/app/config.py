"""
Application configuration using Pydantic Settings.
"""
from typing import List, Union
from pydantic_settings import BaseSettings
from pydantic import PostgresDsn, RedisDsn, field_validator


class Settings(BaseSettings):
    """Application settings with environment variable support."""

    # Application
    APP_NAME: str = "Encore Habit Tracker"
    APP_VERSION: str = "1.0.0"
    ENVIRONMENT: str = "development"
    DEBUG: bool = False
    API_V1_PREFIX: str = "/api/v1"

    # Security
    SECRET_KEY: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 15
    REFRESH_TOKEN_EXPIRE_DAYS: int = 30

    # Database
    DATABASE_URL: PostgresDsn

    # Redis
    REDIS_URL: RedisDsn

    # Celery
    CELERY_BROKER_URL: str = "redis://redis:6379/1"
    CELERY_RESULT_BACKEND: str = "redis://redis:6379/2"

    # Keycloak
    KEYCLOAK_URL: str
    KEYCLOAK_REALM: str
    KEYCLOAK_CLIENT_ID: str
    KEYCLOAK_CLIENT_SECRET: str

    # Casbin
    CASBIN_MODEL_PATH: str = "/app/casbin/model.conf"
    CASBIN_POLICY_ADAPTER: str = "postgresql"

    # CORS
    CORS_ORIGINS: Union[List[str], str] = [
        "http://localhost:3000",
        "http://localhost:5173",
        "http://localhost",
    ]

    @field_validator('CORS_ORIGINS', mode='before')
    @classmethod
    def parse_cors_origins(cls, v):
        """Parse CORS_ORIGINS from comma-separated string or list."""
        if isinstance(v, str):
            return [origin.strip() for origin in v.split(',')]
        return v

    # Rate Limiting
    RATE_LIMIT_PER_MINUTE: int = 60

    # Free Tier Limits
    FREE_TIER_MAX_HABITS: int = 3
    FREE_TIER_MAX_EXPORT_PER_MONTH: int = 1

    class Config:
        env_file = ".env"
        case_sensitive = True


# Global settings instance
settings = Settings()
