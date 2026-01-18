import os
import shutil
import uuid
import time
import asyncio
from fastapi import UploadFile
from backend.core.config import settings

class StorageService:
    @staticmethod
    def get_unique_filename(filename: str) -> str:
        ext = os.path.splitext(filename)[1]
        return f"{uuid.uuid4()}{ext}"

    @staticmethod
    async def save_upload_file(upload_file: UploadFile) -> str:
        filename = StorageService.get_unique_filename(upload_file.filename)
        file_path = os.path.join(settings.TEMP_DIR, filename)

        async with asyncio.Lock(): # Simple lock if needed, though mostly IO bound
            with open(file_path, "wb") as buffer:
                shutil.copyfileobj(upload_file.file, buffer)

        return file_path

    @staticmethod
    def cleanup_old_files():
        """Deletes files older than retention period."""
        now = time.time()
        for filename in os.listdir(settings.TEMP_DIR):
            file_path = os.path.join(settings.TEMP_DIR, filename)
            try:
                if os.path.isfile(file_path):
                    file_age = now - os.path.getmtime(file_path)
                    if file_age > settings.FILE_RETENTION_SECONDS:
                        os.remove(file_path)
            except Exception as e:
                print(f"Error deleting {file_path}: {e}")

    @staticmethod
    def get_file_path(filename: str) -> str | None:
        # Security check to prevent path traversal
        safe_name = os.path.basename(filename)
        path = os.path.join(settings.TEMP_DIR, safe_name)
        if os.path.exists(path):
            return path
        return None
