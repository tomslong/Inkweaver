from typing import List
from sqlalchemy.orm import Session
from app.crud.base import CRUDBase
from app.models import Chapter
from app.schemas.chapters import ChapterCreate, ChapterUpdate


class CRUDChapter(CRUDBase[Chapter, ChapterCreate, ChapterUpdate]):
    """CRUD operations for Chapter model"""
    
    def get_chapters_by_volume(self, db: Session, *, volume_id: int, skip: int = 0, limit: int = 100) -> List[Chapter]:
        """Get chapters by volume ID, ordered by order_index"""
        return db.query(Chapter).filter(Chapter.volume_id == volume_id).order_by(Chapter.order_index).offset(skip).limit(limit).all()
    
    def get_chapter_by_order(self, db: Session, *, volume_id: int, order_index: int) -> Chapter:
        """Get a chapter by its order index within a volume"""
        return db.query(Chapter).filter(Chapter.volume_id == volume_id, Chapter.order_index == order_index).first()


crud_chapter = CRUDChapter(Chapter)
