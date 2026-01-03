# Makefile for Inkweaver project

# Default target
.DEFAULT_GOAL := help

# Project variables
PROJECT_NAME := inkweaver
PYTHON_VERSION := 3.10

# Helper function to show help
help:
	@echo "Available commands:"
	@echo "  make dev      Start FastAPI development server with reload"
	@echo "  make migrate  Run Alembic database migrations"
	@echo "  make test     Run pytest"
	@echo "  make build    Lock dependencies with uv"
	@echo "  make install  Install dependencies with uv"

# Install dependencies using uv
install:
	uv pip install -e .

# Start FastAPI development server
.PHONY: dev
dev:
	uv run uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Run Alembic database migrations
.PHONY: migrate
migrate:
	uv run alembic upgrade head

# Run pytest tests
.PHONY: test
test:
	uv run pytest

# Lock dependencies with uv
.PHONY: build
build:
	uv lock
