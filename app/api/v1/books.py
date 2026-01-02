from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.api import dependencies as deps
from app.crud.books import crud_book
from app.schemas.books import BookCreate, BookRead, BookUpdate, BookReadWithRelations

router = APIRouter()


@router.post("/", response_model=BookRead, status_code=201)
def create_book(
    *, db: Session = Depends(deps.get_db), book_in: BookCreate
):
    """Create a new book"""
    return crud_book.create(db=db, obj_in=book_in)


@router.get("/", response_model=List[BookRead])
def read_books(
    *, db: Session = Depends(deps.get_db), skip: int = 0, limit: int = 100
):
    """Get all books"""
    return crud_book.get_multi(db=db, skip=skip, limit=limit)


@router.get("/{book_id}", response_model=BookReadWithRelations)
def read_book(
    *, db: Session = Depends(deps.get_db), book_id: int
):
    """Get a book by ID with all relations"""
    book = crud_book.get(db=db, id=book_id)
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")
    return book


@router.put("/{book_id}", response_model=BookRead)
def update_book(
    *, db: Session = Depends(deps.get_db), book_id: int, book_in: BookUpdate
):
    """Update a book"""
    book = crud_book.get(db=db, id=book_id)
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")
    return crud_book.update(db=db, db_obj=book, obj_in=book_in)


@router.delete("/{book_id}", response_model=BookRead)
def delete_book(
    *, db: Session = Depends(deps.get_db), book_id: int
):
    """Delete a book"""
    book = crud_book.get(db=db, id=book_id)
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")
    return crud_book.delete(db=db, id=book_id)
