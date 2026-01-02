from typing import List
from sqlalchemy.orm import Session
from app.crud.base import CRUDBase
from app.models import Book
from app.schemas.books import BookCreate, BookUpdate


class CRUDBook(CRUDBase[Book, BookCreate, BookUpdate]):
    """CRUD operations for Book model"""
    
    def get_books_by_title(self, db: Session, *, title: str, skip: int = 0, limit: int = 100) -> List[Book]:
        """Get books by title (case-insensitive partial match)"""
        return db.query(Book).filter(Book.title.ilike(f"%{title}%")).offset(skip).limit(limit).all()


crud_book = CRUDBook(Book)
