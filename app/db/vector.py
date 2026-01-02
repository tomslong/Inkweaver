from sqlalchemy import text
from sqlalchemy.ext.declarative import DeclarativeMeta
from sqlalchemy.orm import Session
from app.core.config import settings


def init_vector_extension(db: Session) -> None:
    """Initialize pgvector extension in the database"""
    db.execute(text("CREATE EXTENSION IF NOT EXISTS vector"))
    db.commit()


def get_vector_distance_sql(column_name: str, query_vector: list[float]) -> str:
    """Generate SQL for vector distance calculation"""
    return f"{column_name} <=> ARRAY[{', '.join(map(str, query_vector))}]::vector"
