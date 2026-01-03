from typing import Any, Dict, Optional
from pydantic_settings import BaseSettings
from pydantic import PostgresDsn, validator


class Settings(BaseSettings):
    PROJECT_NAME: str = "Inkweaver Backend"
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = "your-secret-key"
    
    # Database settings
    POSTGRES_SERVER: str = "db"
    POSTGRES_USER: str = "inkweaver_user"
    POSTGRES_PASSWORD: str = "inkweaver_password"
    POSTGRES_DB: str = "inkweaver"
    DATABASE_URL: Optional[PostgresDsn] = None
    
    @validator("DATABASE_URL", pre=True)
    def assemble_db_connection(cls, v: Optional[str], values: Dict[str, Any]) -> Any:
        if isinstance(v, str):
            return v
        return PostgresDsn.build(
            scheme="postgresql+psycopg2",
            username=values.get("POSTGRES_USER"),
            password=values.get("POSTGRES_PASSWORD"),
            host=values.get("POSTGRES_SERVER"),
            path=f"/{values.get('POSTGRES_DB') or ''}",
        )
    
    # AI Model settings
    CLAUDE_API_KEY: str = "your-claude-api-key"
    DEEPSEEK_API_KEY: str = "your-deepseek-api-key"
    
    # Vector database settings
    VECTOR_DIMENSIONS: int = 1536
    
    class Config:
        case_sensitive = True
        env_file = ".env"


settings = Settings()
