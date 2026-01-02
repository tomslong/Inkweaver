from typing import List, Dict, Any
from sqlalchemy import Column, Integer, String, ForeignKey, Text, JSON, ARRAY, Float, Index
from sqlalchemy.orm import relationship
from app.db.base import Base, TimestampMixin


class Book(Base, TimestampMixin):
    """Book model representing a novel"""
    __tablename__ = "books"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False, index=True)
    style_profile = Column(JSON, nullable=True, default=dict)
    
    # Relationships
    volumes = relationship("Volume", back_populates="book", cascade="all, delete-orphan")
    codex_entities = relationship("CodexEntity", back_populates="book", cascade="all, delete-orphan")


class Volume(Base, TimestampMixin):
    """Volume model representing a book volume"""
    __tablename__ = "volumes"
    
    id = Column(Integer, primary_key=True, index=True)
    book_id = Column(Integer, ForeignKey("books.id"), nullable=False, index=True)
    volume_outline = Column(JSON, nullable=False, default=dict)
    status = Column(String(50), nullable=False, default="draft")
    
    # Relationships
    book = relationship("Book", back_populates="volumes")
    chapters = relationship("Chapter", back_populates="volume", cascade="all, delete-orphan")


class Chapter(Base, TimestampMixin):
    """Chapter model representing a book chapter"""
    __tablename__ = "chapters"
    
    id = Column(Integer, primary_key=True, index=True)
    volume_id = Column(Integer, ForeignKey("volumes.id"), nullable=False, index=True)
    chapter_summary = Column(Text, nullable=False)
    order_index = Column(Integer, nullable=False, index=True)
    
    # Relationships
    volume = relationship("Volume", back_populates="chapters")
    beats = relationship("Beat", back_populates="chapter", cascade="all, delete-orphan")
    
    # Index for ordering chapters within a volume
    __table_args__ = (Index('idx_chapter_order', 'volume_id', 'order_index'),)


class Beat(Base, TimestampMixin):
    """Beat model representing a story beat within a chapter"""
    __tablename__ = "beats"
    
    id = Column(Integer, primary_key=True, index=True)
    chapter_id = Column(Integer, ForeignKey("chapters.id"), nullable=False, index=True)
    beats_json = Column(JSON, nullable=False, default=list)
    content_raw = Column(Text, nullable=True)
    
    # Relationships
    chapter = relationship("Chapter", back_populates="beats")


class CodexEntity(Base, TimestampMixin):
    """CodexEntity model representing a story entity (character, world, etc.)"""
    __tablename__ = "codex_entities"
    
    id = Column(Integer, primary_key=True, index=True)
    book_id = Column(Integer, ForeignKey("books.id"), nullable=False, index=True)
    entity_type = Column(String(50), nullable=False, index=True)  # character, location, item, etc.
    properties = Column(JSON, nullable=False, default=dict)
    description_vector = Column(ARRAY(Float), nullable=True)  # pgvector column for similarity search
    
    # Relationships
    book = relationship("Book", back_populates="codex_entities")
    
    # Index for entity type and book_id
    __table_args__ = (
        Index('idx_codex_entity_type_book', 'entity_type', 'book_id'),
    )


# Import all models to make them available
__all__ = ["Book", "Volume", "Chapter", "Beat", "CodexEntity"]
