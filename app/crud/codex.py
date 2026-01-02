from typing import List, Optional
from sqlalchemy.orm import Session
from app.crud.base import CRUDBase
from app.models import CodexEntity
from app.schemas.codex import CodexEntityCreate, CodexEntityUpdate


class CRUDCodexEntity(CRUDBase[CodexEntity, CodexEntityCreate, CodexEntityUpdate]):
    """CRUD operations for CodexEntity model"""
    
    def get_entities_by_book(self, db: Session, *, book_id: int, skip: int = 0, limit: int = 100) -> List[CodexEntity]:
        """Get codex entities by book ID"""
        return db.query(CodexEntity).filter(CodexEntity.book_id == book_id).offset(skip).limit(limit).all()
    
    def get_entities_by_type(self, db: Session, *, book_id: int, entity_type: str, skip: int = 0, limit: int = 100) -> List[CodexEntity]:
        """Get codex entities by type and book ID"""
        return db.query(CodexEntity).filter(
            CodexEntity.book_id == book_id,
            CodexEntity.entity_type == entity_type
        ).offset(skip).limit(limit).all()
    
    def get_entity_by_name(self, db: Session, *, book_id: int, name: str, entity_type: str) -> Optional[CodexEntity]:
        """Get a codex entity by name and type"""
        return db.query(CodexEntity).filter(
            CodexEntity.book_id == book_id,
            CodexEntity.entity_type == entity_type,
            CodexEntity.properties['name'].astext == name
        ).first()


crud_codex_entity = CRUDCodexEntity(CodexEntity)
