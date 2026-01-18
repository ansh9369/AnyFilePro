# FileConv - Modern File Conversion Platform

A fast, secure, and modern web application for converting, merging, splitting, and manipulating PDF files and images. Built with Next.js and FastAPI.

## Features

- **Image to PDF**: Convert JPG, PNG to PDF.
- **PDF to Image**: Extract pages as images.
- **Merge PDF**: Combine multiple PDFs.
- **Split PDF**: Extract pages from PDF.
- **Rotate PDF**: Rotate pages.
- **Compress PDF**: Optimize file size.
- **Lock/Unlock PDF**: Add or remove password protection.
- **Privacy Focused**: Files are automatically deleted after 1 hour.
- **Responsive Design**: Works on Desktop and Mobile.
- **Drag & Drop**: Easy file uploads.

## Tech Stack

- **Frontend**: Next.js 14+ (App Router), React, Tailwind CSS, Framer Motion, Lucide React.
- **Backend**: FastAPI (Python), PyPDF, Pillow, PyPDFium2.
- **Storage**: Local filesystem with auto-cleanup.

## Getting Started

### Prerequisites

- Node.js 18+
- Python 3.9+

### Installation

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd fileconv
   ```

2. **Backend Setup**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   uvicorn main:app --reload
   ```
   Backend runs on `http://localhost:8000`.

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   Frontend runs on `http://localhost:3000`.

## Deployment

### Backend
Deploy the `backend` folder to any Python hosting (Render, Railway, AWS EC2, DigitalOcean).
- Command: `uvicorn main:app --host 0.0.0.0 --port 8000`

### Frontend
Deploy the `frontend` folder to Vercel or Netlify.
- Build Command: `npm run build`
- Output Directory: `.next` (for Vercel) or `out` (if static export used, but here we use Node server).

**Important**:
- Set `NEXT_PUBLIC_API_URL` if you want to point to a specific backend URL, though the current setup uses Next.js rewrites to `/api` which points to `localhost:8000` in dev.
- In production, you might want to configure Nginx to reverse proxy `/api` to the backend, or update `next.config.ts` rewrite destination to the production backend URL.

## License

MIT
