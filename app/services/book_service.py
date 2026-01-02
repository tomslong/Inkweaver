from typing import List, Optional
from sqlalchemy.orm import Session
from app.crud.books import crud_book
from app.schemas.books import BookCreate, BookUpdate, BookRead


class BookService:
    """Book service handling business logic for books"""
    
    @staticmethod
    def create_book(db: Session, book_in: BookCreate) -> BookRead:
        """Create a new book"""
        return crud_book.create(db=db, obj_in=book_in)
    
    @staticmethod
    def get_book(db: Session, book_id: int) -> Optional[BookRead]:
        """Get a book by ID"""
        return crud_book.get(db=db, id=book_id)
    
    @staticmethod
    def get_all_books(db: Session, skip: int = 0, limit: int = 100) -> List[BookRead]:
        """Get all books with pagination"""
        return crud_book.get_multi(db=db, skip=skip, limit=limit)
    
    @staticmethod
    def update_book(db: Session, book_id: int, book_in: BookUpdate) -> Optional[BookRead]:
        """Update a book"""
        book = crud_book.get(db=db, id=book_id)
        if not book:
            return None
        return crud_book.update(db=db, db_obj=book, obj_in=book_in)
    
    @staticmethod
    def delete_book(db: Session, book_id: int) -> Optional[BookRead]:
        """Delete a book"""
        book = crud_book.get(db=db, id=book_id)
        if not book:
            return None
        return crud_book.delete(db=db, id=book_id)
    
    @staticmethod
    def search_books_by_title(db: Session, title: str, skip: int = 0, limit: int = 100) -> List[BookRead]:
        """Search books by title"""
        return crud_book.get_books_by_title(db=db, title=title, skip=skip, limit=limit)


book_service = BookService()
