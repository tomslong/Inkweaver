from typing import List
from sqlalchemy.orm import Session
from app.crud.base import CRUDBase
from app.models import Beat
from app.schemas.beats import BeatCreate, BeatUpdate


class CRUDBeat(CRUDBase[Beat, BeatCreate, BeatUpdate]):
    """CRUD operations for Beat model"""
    
    def get_beats_by_chapter(self, db: Session, *, chapter_id: int, skip: int = 0, limit: int = 100) -> List[Beat]:
        """Get beats by chapter ID"""
        return db.query(Beat).filter(Beat.chapter_id == chapter_id).offset(skip).limit(limit).all()


crud_beat = CRUDBeat(Beat)
