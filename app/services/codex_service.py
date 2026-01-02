from typing import List, Optional, Dict, Any
from sqlalchemy.orm import Session
from app.crud.codex import crud_codex_entity
from app.schemas.codex import CodexEntityCreate, CodexEntityUpdate, CodexEntityRead


class CodexService:
    """Codex service handling business logic for codex entities"""
    
    @staticmethod
    def create_entity(db: Session, entity_in: CodexEntityCreate) -> CodexEntityRead:
        """Create a new codex entity"""
        return crud_codex_entity.create(db=db, obj_in=entity_in)
    
    @staticmethod
    def get_entity(db: Session, entity_id: int) -> Optional[CodexEntityRead]:
        """Get a codex entity by ID"""
        return crud_codex_entity.get(db=db, id=entity_id)
    
    @staticmethod
    def get_entities_by_book(db: Session, book_id: int, skip: int = 0, limit: int = 100) -> List[CodexEntityRead]:
        """Get all codex entities for a book"""
        return crud_codex_entity.get_entities_by_book(db=db, book_id=book_id, skip=skip, limit=limit)
    
    @staticmethod
    def get_entities_by_type(db: Session, book_id: int, entity_type: str, skip: int = 0, limit: int = 100) -> List[CodexEntityRead]:
        """Get codex entities by type and book ID"""
        return crud_codex_entity.get_entities_by_type(
            db=db, book_id=book_id, entity_type=entity_type, skip=skip, limit=limit
        )
    
    @staticmethod
    def update_entity(db: Session, entity_id: int, entity_in: CodexEntityUpdate) -> Optional[CodexEntityRead]:
        """Update a codex entity"""
        entity = crud_codex_entity.get(db=db, id=entity_id)
        if not entity:
            return None
        return crud_codex_entity.update(db=db, db_obj=entity, obj_in=entity_in)
    
    @staticmethod
    def delete_entity(db: Session, entity_id: int) -> Optional[CodexEntityRead]:
        """Delete a codex entity"""
        entity = crud_codex_entity.get(db=db, id=entity_id)
        if not entity:
            return None
        return crud_codex_entity.delete(db=db, id=entity_id)
    
    @staticmethod
    def get_entity_by_name(db: Session, book_id: int, name: str, entity_type: str) -> Optional[CodexEntityRead]:
        """Get a codex entity by name and type"""
        return crud_codex_entity.get_entity_by_name(
            db=db, book_id=book_id, name=name, entity_type=entity_type
        )
    
    @staticmethod
    def validate_consistency(db: Session, book_id: int, content: str) -> Dict[str, Any]:
        """Validate consistency of content against codex entities"""
        # In real implementation, this would use vector similarity search
        # For now, we'll just return a mock response
        return {
            "is_consistent": True,
            "issues": [],
            "matched_entities": []
        }


codex_service = CodexService()
