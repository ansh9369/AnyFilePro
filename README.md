# FileConv - Advanced File Conversion Platform

A modern, full-stack file conversion platform featuring user authentication, dashboard, MongoDB integration, and a wide range of conversion tools.

## Features

- **Authentication**: Email/Password Sign Up & Login (JWT).
- **User Dashboard**: View conversion history and profile.
- **Tools**:
  - Image to PDF
  - Office to PDF (Word, Excel, PPT)
  - PDF to Word/Image
  - PDF Merge, Split, Rotate, Compress, Lock/Unlock
- **Interactive UI**: Animated Hero section, Tool tooltips, Share functionality.
- **Backend**: FastAPI + MongoDB (Motor/Beanie) for robust data management.
- **Privacy**: Auto-cleanup of files, secure password hashing.

## Setup Instructions

### Prerequisites
- Node.js 18+
- Python 3.9+
- MongoDB Connection String

### Environment Variables

**Backend (`backend/.env` or export)**
```bash
MONGODB_URL=mongodb+srv://mransh901_db_user:WIarusXIMGf6aXrM@cluster0.3iaiwpa.mongodb.net/?appName=Cluster0
SECRET_KEY=your-secret-key-change-this-in-production
```

### Running Locally

1. **Backend**
   ```bash
   cd backend
   pip install -r requirements.txt
   uvicorn main:app --reload
   ```

2. **Frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## Deployment

### Vercel
The project is configured for Vercel.
1. Import the repository to Vercel.
2. Add Environment Variables (`MONGODB_URL`, `SECRET_KEY`).
3. Deploy.

### Structure
- `frontend/`: Next.js App
- `backend/`: FastAPI App
- `backend/models/`: MongoDB Beanie Models
- `backend/routers/`: API Endpoints

## Future Roadmap
- Google/Phone Auth (requires API Keys).
- Cloud Storage (S3) integration for permanent file history.
