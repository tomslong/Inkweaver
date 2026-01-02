from typing import List
from sqlalchemy.orm import Session
from app.crud.base import CRUDBase
from app.models import Volume
from app.schemas.volumes import VolumeCreate, VolumeUpdate


class CRUDVolume(CRUDBase[Volume, VolumeCreate, VolumeUpdate]):
    """CRUD operations for Volume model"""
    
    def get_volumes_by_book(self, db: Session, *, book_id: int, skip: int = 0, limit: int = 100) -> List[Volume]:
        """Get volumes by book ID"""
        return db.query(Volume).filter(Volume.book_id == book_id).offset(skip).limit(limit).all()
    
    def get_volumes_by_status(self, db: Session, *, status: str, skip: int = 0, limit: int = 100) -> List[Volume]:
        """Get volumes by status"""
        return db.query(Volume).filter(Volume.status == status).offset(skip).limit(limit).all()


crud_volume = CRUDVolume(Volume)
