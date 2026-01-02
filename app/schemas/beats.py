from typing import List, Optional, Dict, Any
from pydantic import BaseModel, ConfigDict
from datetime import datetime


class BeatBase(BaseModel):
    beats_json: List[Dict[str, Any]]
    content_raw: Optional[str] = None


class BeatCreate(BeatBase):
    chapter_id: int


class BeatUpdate(BaseModel):
    beats_json: Optional[List[Dict[str, Any]]] = None
    content_raw: Optional[str] = None


class BeatRead(BeatBase):
    model_config = ConfigDict(from_attributes=True)
    
    id: int
    chapter_id: int
    created_at: datetime
    updated_at: datetime
