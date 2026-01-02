from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.api import dependencies as deps
from app.crud.codex import crud_codex_entity
from app.schemas.codex import CodexEntityCreate, CodexEntityRead, CodexEntityUpdate

router = APIRouter()


@router.post("/", response_model=CodexEntityRead, status_code=201)
def create_codex_entity(
    *, db: Session = Depends(deps.get_db), entity_in: CodexEntityCreate
):
    """Create a new codex entity"""
    return crud_codex_entity.create(db=db, obj_in=entity_in)


@router.get("/", response_model=List[CodexEntityRead])
def read_codex_entities(
    *, db: Session = Depends(deps.get_db), skip: int = 0, limit: int = 100
):
    """Get all codex entities"""
    return crud_codex_entity.get_multi(db=db, skip=skip, limit=limit)


@router.get("/{entity_id}", response_model=CodexEntityRead)
def read_codex_entity(
    *, db: Session = Depends(deps.get_db), entity_id: int
):
    """Get a codex entity by ID"""
    entity = crud_codex_entity.get(db=db, id=entity_id)
    if not entity:
        raise HTTPException(status_code=404, detail="Codex entity not found")
    return entity


@router.put("/{entity_id}", response_model=CodexEntityRead)
def update_codex_entity(
    *, db: Session = Depends(deps.get_db), entity_id: int, entity_in: CodexEntityUpdate
):
    """Update a codex entity"""
    entity = crud_codex_entity.get(db=db, id=entity_id)
    if not entity:
        raise HTTPException(status_code=404, detail="Codex entity not found")
    return crud_codex_entity.update(db=db, db_obj=entity, obj_in=entity_in)


@router.delete("/{entity_id}", response_model=CodexEntityRead)
def delete_codex_entity(
    *, db: Session = Depends(deps.get_db), entity_id: int
):
    """Delete a codex entity"""
    entity = crud_codex_entity.get(db=db, id=entity_id)
    if not entity:
        raise HTTPException(status_code=404, detail="Codex entity not found")
    return crud_codex_entity.delete(db=db, id=entity_id)


@router.get("/book/{book_id}", response_model=List[CodexEntityRead])
def read_entities_by_book(
    *, db: Session = Depends(deps.get_db), book_id: int, skip: int = 0, limit: int = 100
):
    """Get all codex entities for a book"""
    return crud_codex_entity.get_entities_by_book(db=db, book_id=book_id, skip=skip, limit=limit)


@router.get("/book/{book_id}/type/{entity_type}", response_model=List[CodexEntityRead])
def read_entities_by_type(
    *, db: Session = Depends(deps.get_db), book_id: int, entity_type: str, skip: int = 0, limit: int = 100
):
    """Get codex entities by type and book ID"""
    return crud_codex_entity.get_entities_by_type(
        db=db, book_id=book_id, entity_type=entity_type, skip=skip, limit=limit
    )
