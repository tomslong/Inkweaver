#!/bin/bash

# Don't exit on error
set +e

# Run database migrations
echo "Running database migrations..."
alembic upgrade head

# Check if migrations failed
if [ $? -ne 0 ]; then
    echo "Warning: Database migrations failed. This may be because no migration scripts exist yet."
    echo "Starting application anyway..."
fi

# Start the FastAPI application
echo "Starting FastAPI application..."
uvicorn app.main:app --host 0.0.0.0 --port 8000
