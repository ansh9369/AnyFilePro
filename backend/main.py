from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie
from backend.routers import api, auth
from backend.core.config import settings
from backend.services.storage import StorageService
from backend.models.user import User, ConversionLog

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Ensure temp dir exists and DB connects
    print(f"Starting up... Temp dir: {settings.TEMP_DIR}")

    # MongoDB Init
    client = AsyncIOMotorClient(settings.MONGODB_URL)
    await init_beanie(database=client.get_default_database(), document_models=[User, ConversionLog])

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
app.include_router(auth.router, prefix=f"{settings.API_V1_STR}/auth", tags=["auth"])

@app.get("/")
def read_root():
    return {"message": "FileConv API is running"}
