import os

class Settings:
    PROJECT_NAME: str = "FileConv"
    API_V1_STR: str = "/api"
    BASE_DIR: str = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    TEMP_DIR: str = os.path.join(BASE_DIR, "temp")
    MAX_FILE_SIZE: int = 50 * 1024 * 1024  # 50 MB
    FILE_RETENTION_SECONDS: int = 3600  # 1 hour

    def __init__(self):
        os.makedirs(self.TEMP_DIR, exist_ok=True)

settings = Settings()
