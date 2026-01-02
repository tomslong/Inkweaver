from typing import List, Optional, Dict, Any
from pydantic import BaseModel, ConfigDict
from datetime import datetime


class CodexEntityBase(BaseModel):
    entity_type: str
    properties: Dict[str, Any]
    description_vector: Optional[List[float]] = None


class CodexEntityCreate(CodexEntityBase):
    book_id: int


class CodexEntityUpdate(BaseModel):
    entity_type: Optional[str] = None
    properties: Optional[Dict[str, Any]] = None
    description_vector: Optional[List[float]] = None


class CodexEntityRead(CodexEntityBase):
    model_config = ConfigDict(from_attributes=True)
    
    id: int
    book_id: int
    created_at: datetime
    updated_at: datetime
