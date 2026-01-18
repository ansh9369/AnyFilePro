import os

class Settings:
    PROJECT_NAME: str = "FileConv"
    API_V1_STR: str = "/api"
    BASE_DIR: str = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    # Use /tmp in production (Vercel) or local temp dir
    TEMP_DIR: str = "/tmp/fileconv_temp" if os.environ.get("VERCEL") else os.path.join(BASE_DIR, "temp")
    MAX_FILE_SIZE: int = 50 * 1024 * 1024  # 50 MB
    FILE_RETENTION_SECONDS: int = 3600  # 1 hour

    # MongoDB settings
    MONGODB_URL: str = os.environ.get("MONGODB_URL", "mongodb+srv://mransh901_db_user:WIarusXIMGf6aXrM@cluster0.3iaiwpa.mongodb.net/?appName=Cluster0")
    SECRET_KEY: str = "your-secret-key-change-this-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7 # 7 days

    def __init__(self):
        os.makedirs(self.TEMP_DIR, exist_ok=True)

settings = Settings()
