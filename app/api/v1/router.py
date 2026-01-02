from fastapi import APIRouter
from app.api.v1 import books, volumes, chapters, beats, codex

api_router = APIRouter()

api_router.include_router(books.router, prefix="/books", tags=["books"])
api_router.include_router(volumes.router, prefix="/volumes", tags=["volumes"])
api_router.include_router(chapters.router, prefix="/chapters", tags=["chapters"])
api_router.include_router(beats.router, prefix="/beats", tags=["beats"])
api_router.include_router(codex.router, prefix="/codex", tags=["codex"])
