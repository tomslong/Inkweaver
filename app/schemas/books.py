from typing import List, Optional, Dict, Any
from pydantic import BaseModel, ConfigDict
from datetime import datetime


class BookBase(BaseModel):
    title: str
    style_profile: Optional[Dict[str, Any]] = None


class BookCreate(BookBase):
    pass


class BookUpdate(BaseModel):
    title: Optional[str] = None
    style_profile: Optional[Dict[str, Any]] = None


class BookRead(BookBase):
    model_config = ConfigDict(from_attributes=True)
    
    id: int
    created_at: datetime
    updated_at: datetime


class BookReadWithRelations(BookRead):
    volumes: List["VolumeRead"] = []
    codex_entities: List["CodexEntityRead"] = []


from app.schemas.volumes import VolumeRead
from app.schemas.codex import CodexEntityRead
BookReadWithRelations.model_rebuild()
