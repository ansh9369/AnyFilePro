# AGENTS.md

## Project: FileConv (File Conversion Platform)

### Tech Stack
- **Frontend**: Next.js 14+ (App Router), Tailwind CSS, Framer Motion, Lucide React.
- **Backend**: FastAPI, Python 3.12.
- **Database**: None (Filesystem + In-memory/Stateless).
- **Storage**: Local filesystem (`backend/temp`) with auto-cleanup.

### Architecture
- **Backend** runs on port 8000.
- **Frontend** runs on port 3000.
- **API Proxy**: Frontend proxies `/api` to `http://localhost:8000`.

### Development Rules
1. **Zero Configuration**: The app should run with minimal setup.
2. **Robustness**: Handle file errors, large files, and missing dependencies gracefully.
3. **Privacy**: Ensure files are deleted after processing.
4. **Clean Code**: Use type hints in Python and TypeScript in Frontend.

### Key Directories
- `backend/`: API and Core Logic.
- `frontend/`: UI and Client Logic.
- `backend/temp/`: Temporary storage for uploads and results.

### Running the App
- **Backend**: `cd backend && uvicorn main:app --reload`
- **Frontend**: `cd frontend && npm run dev`
