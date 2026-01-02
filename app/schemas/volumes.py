from typing import List, Optional, Dict, Any
from pydantic import BaseModel, ConfigDict
from datetime import datetime


class VolumeBase(BaseModel):
    volume_outline: Dict[str, Any]
    status: str = "draft"


class VolumeCreate(VolumeBase):
    book_id: int


class VolumeUpdate(BaseModel):
    volume_outline: Optional[Dict[str, Any]] = None
    status: Optional[str] = None


class VolumeRead(VolumeBase):
    model_config = ConfigDict(from_attributes=True)
    
    id: int
    book_id: int
    created_at: datetime
    updated_at: datetime


class VolumeReadWithRelations(VolumeRead):
    chapters: List["ChapterRead"] = []


from app.schemas.chapters import ChapterRead
VolumeReadWithRelations.model_rebuild()
