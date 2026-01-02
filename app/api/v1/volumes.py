from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.api import dependencies as deps
from app.crud.volumes import crud_volume
from app.schemas.volumes import VolumeCreate, VolumeRead, VolumeUpdate, VolumeReadWithRelations

router = APIRouter()


@router.post("/", response_model=VolumeRead, status_code=201)
def create_volume(
    *, db: Session = Depends(deps.get_db), volume_in: VolumeCreate
):
    """Create a new volume"""
    return crud_volume.create(db=db, obj_in=volume_in)


@router.get("/", response_model=List[VolumeRead])
def read_volumes(
    *, db: Session = Depends(deps.get_db), skip: int = 0, limit: int = 100
):
    """Get all volumes"""
    return crud_volume.get_multi(db=db, skip=skip, limit=limit)


@router.get("/{volume_id}", response_model=VolumeReadWithRelations)
def read_volume(
    *, db: Session = Depends(deps.get_db), volume_id: int
):
    """Get a volume by ID with all relations"""
    volume = crud_volume.get(db=db, id=volume_id)
    if not volume:
        raise HTTPException(status_code=404, detail="Volume not found")
    return volume


@router.put("/{volume_id}", response_model=VolumeRead)
def update_volume(
    *, db: Session = Depends(deps.get_db), volume_id: int, volume_in: VolumeUpdate
):
    """Update a volume"""
    volume = crud_volume.get(db=db, id=volume_id)
    if not volume:
        raise HTTPException(status_code=404, detail="Volume not found")
    return crud_volume.update(db=db, db_obj=volume, obj_in=volume_in)


@router.delete("/{volume_id}", response_model=VolumeRead)
def delete_volume(
    *, db: Session = Depends(deps.get_db), volume_id: int
):
    """Delete a volume"""
    volume = crud_volume.get(db=db, id=volume_id)
    if not volume:
        raise HTTPException(status_code=404, detail="Volume not found")
    return crud_volume.delete(db=db, id=volume_id)


@router.get("/book/{book_id}", response_model=List[VolumeRead])
def read_volumes_by_book(
    *, db: Session = Depends(deps.get_db), book_id: int, skip: int = 0, limit: int = 100
):
    """Get all volumes for a book"""
    return crud_volume.get_volumes_by_book(db=db, book_id=book_id, skip=skip, limit=limit)
