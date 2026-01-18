from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import asyncio
from backend.routers import api
from backend.core.config import settings
from backend.services.storage import StorageService

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Ensure temp dir exists
    print(f"Starting up... Temp dir: {settings.TEMP_DIR}")

    # Background task for cleanup
    async def cleanup_loop():
        while True:
            try:
                StorageService.cleanup_old_files()
            except Exception as e:
                print(f"Cleanup error: {e}")
            await asyncio.sleep(600) # Check every 10 minutes

    task = asyncio.create_task(cleanup_loop())
    yield
    # Shutdown
    task.cancel()
    print("Shutting down...")

app = FastAPI(
    title=settings.PROJECT_NAME,
    lifespan=lifespan
)

# CORS - Allow all for simplicity in this MVP, but in prod restrict to frontend domain
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api.router, prefix=settings.API_V1_STR)

@app.get("/")
def read_root():
    return {"message": "FileConv API is running"}
