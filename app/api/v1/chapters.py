from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.api import dependencies as deps
from app.crud.chapters import crud_chapter
from app.schemas.chapters import ChapterCreate, ChapterRead, ChapterUpdate, ChapterReadWithRelations

router = APIRouter()


@router.post("/", response_model=ChapterRead, status_code=201)
def create_chapter(
    *, db: Session = Depends(deps.get_db), chapter_in: ChapterCreate
):
    """Create a new chapter"""
    return crud_chapter.create(db=db, obj_in=chapter_in)


@router.get("/", response_model=List[ChapterRead])
def read_chapters(
    *, db: Session = Depends(deps.get_db), skip: int = 0, limit: int = 100
):
    """Get all chapters"""
    return crud_chapter.get_multi(db=db, skip=skip, limit=limit)


@router.get("/{chapter_id}", response_model=ChapterReadWithRelations)
def read_chapter(
    *, db: Session = Depends(deps.get_db), chapter_id: int
):
    """Get a chapter by ID with all relations"""
    chapter = crud_chapter.get(db=db, id=chapter_id)
    if not chapter:
        raise HTTPException(status_code=404, detail="Chapter not found")
    return chapter


@router.put("/{chapter_id}", response_model=ChapterRead)
def update_chapter(
    *, db: Session = Depends(deps.get_db), chapter_id: int, chapter_in: ChapterUpdate
):
    """Update a chapter"""
    chapter = crud_chapter.get(db=db, id=chapter_id)
    if not chapter:
        raise HTTPException(status_code=404, detail="Chapter not found")
    return crud_chapter.update(db=db, db_obj=chapter, obj_in=chapter_in)


@router.delete("/{chapter_id}", response_model=ChapterRead)
def delete_chapter(
    *, db: Session = Depends(deps.get_db), chapter_id: int
):
    """Delete a chapter"""
    chapter = crud_chapter.get(db=db, id=chapter_id)
    if not chapter:
        raise HTTPException(status_code=404, detail="Chapter not found")
    return crud_chapter.delete(db=db, id=chapter_id)


@router.get("/volume/{volume_id}", response_model=List[ChapterRead])
def read_chapters_by_volume(
    *, db: Session = Depends(deps.get_db), volume_id: int, skip: int = 0, limit: int = 100
):
    """Get all chapters for a volume"""
    return crud_chapter.get_chapters_by_volume(db=db, volume_id=volume_id, skip=skip, limit=limit)
