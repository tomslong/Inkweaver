from typing import List, Optional
from pydantic import BaseModel, ConfigDict
from datetime import datetime


class ChapterBase(BaseModel):
    chapter_summary: str
    order_index: int


class ChapterCreate(ChapterBase):
    volume_id: int


class ChapterUpdate(BaseModel):
    chapter_summary: Optional[str] = None
    order_index: Optional[int] = None


class ChapterRead(ChapterBase):
    model_config = ConfigDict(from_attributes=True)
    
    id: int
    volume_id: int
    created_at: datetime
    updated_at: datetime


class ChapterReadWithRelations(ChapterRead):
    beats: List["BeatRead"] = []


from app.schemas.beats import BeatRead
ChapterReadWithRelations.model_rebuild()
