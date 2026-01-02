from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.api import dependencies as deps
from app.crud.beats import crud_beat
from app.schemas.beats import BeatCreate, BeatRead, BeatUpdate

router = APIRouter()


@router.post("/", response_model=BeatRead, status_code=201)
def create_beat(
    *, db: Session = Depends(deps.get_db), beat_in: BeatCreate
):
    """Create a new beat"""
    return crud_beat.create(db=db, obj_in=beat_in)


@router.get("/", response_model=List[BeatRead])
def read_beats(
    *, db: Session = Depends(deps.get_db), skip: int = 0, limit: int = 100
):
    """Get all beats"""
    return crud_beat.get_multi(db=db, skip=skip, limit=limit)


@router.get("/{beat_id}", response_model=BeatRead)
def read_beat(
    *, db: Session = Depends(deps.get_db), beat_id: int
):
    """Get a beat by ID"""
    beat = crud_beat.get(db=db, id=beat_id)
    if not beat:
        raise HTTPException(status_code=404, detail="Beat not found")
    return beat


@router.put("/{beat_id}", response_model=BeatRead)
def update_beat(
    *, db: Session = Depends(deps.get_db), beat_id: int, beat_in: BeatUpdate
):
    """Update a beat"""
    beat = crud_beat.get(db=db, id=beat_id)
    if not beat:
        raise HTTPException(status_code=404, detail="Beat not found")
    return crud_beat.update(db=db, db_obj=beat, obj_in=beat_in)


@router.delete("/{beat_id}", response_model=BeatRead)
def delete_beat(
    *, db: Session = Depends(deps.get_db), beat_id: int
):
    """Delete a beat"""
    beat = crud_beat.get(db=db, id=beat_id)
    if not beat:
        raise HTTPException(status_code=404, detail="Beat not found")
    return crud_beat.delete(db=db, id=beat_id)


@router.get("/chapter/{chapter_id}", response_model=List[BeatRead])
def read_beats_by_chapter(
    *, db: Session = Depends(deps.get_db), chapter_id: int, skip: int = 0, limit: int = 100
):
    """Get all beats for a chapter"""
    return crud_beat.get_beats_by_chapter(db=db, chapter_id=chapter_id, skip=skip, limit=limit)
