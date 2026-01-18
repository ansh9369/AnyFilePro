from fastapi import APIRouter, UploadFile, File, HTTPException, BackgroundTasks, Form
from fastapi.responses import FileResponse
from typing import List, Optional
import os
import shutil

from backend.services.storage import StorageService
from backend.services.converter import ConverterService
from backend.core.config import settings
from backend.models.user import User, ConversionLog
from backend.routers.auth import get_current_user
from fastapi import Depends

router = APIRouter()

@router.post("/upload")
async def upload_files(files: List[UploadFile] = File(...)):
    saved_files = []
    for file in files:
        try:
            path = await StorageService.save_upload_file(file)
            saved_files.append({"filename": os.path.basename(path), "original_name": file.filename})
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
    return {"files": saved_files}

@router.post("/process/image-to-pdf")
async def process_image_to_pdf(filenames: List[str], current_user: User = Depends(get_current_user)):
    try:
        paths = [os.path.join(settings.TEMP_DIR, f) for f in filenames]
        # Validate existence
        for p in paths:
            if not os.path.exists(p):
                 raise HTTPException(status_code=404, detail=f"File not found: {os.path.basename(p)}")

        output_name = f"converted_{os.path.splitext(filenames[0])[0]}.pdf"
        result_path = ConverterService.images_to_pdf(paths, output_name)

        # Log to MongoDB
        await ConversionLog(
            user_id=current_user.id,
            tool_id="image-to-pdf",
            original_filename=filenames[0], # Just log first file for now
            result_filename=os.path.basename(result_path)
        ).insert()

        return {"result_filename": os.path.basename(result_path)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/process/word-to-pdf")
def process_word_to_pdf(filename: str = Form(...)):
    try:
        path = os.path.join(settings.TEMP_DIR, filename)
        if not os.path.exists(path):
             raise HTTPException(status_code=404, detail="File not found")

        output_name = f"converted_{os.path.splitext(filename)[0]}.pdf"
        result_path = ConverterService.docx_to_pdf(path, output_name)
        return {"result_filename": os.path.basename(result_path)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/process/excel-to-pdf")
def process_excel_to_pdf(filename: str = Form(...)):
    try:
        path = os.path.join(settings.TEMP_DIR, filename)
        if not os.path.exists(path):
             raise HTTPException(status_code=404, detail="File not found")

        output_name = f"converted_{os.path.splitext(filename)[0]}.pdf"
        result_path = ConverterService.xlsx_to_pdf(path, output_name)
        return {"result_filename": os.path.basename(result_path)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/process/ppt-to-pdf")
def process_ppt_to_pdf(filename: str = Form(...)):
    try:
        path = os.path.join(settings.TEMP_DIR, filename)
        if not os.path.exists(path):
             raise HTTPException(status_code=404, detail="File not found")

        output_name = f"converted_{os.path.splitext(filename)[0]}.pdf"
        result_path = ConverterService.pptx_to_pdf(path, output_name)
        return {"result_filename": os.path.basename(result_path)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/process/pdf-to-word")
def process_pdf_to_word(filename: str = Form(...)):
    try:
        path = os.path.join(settings.TEMP_DIR, filename)
        if not os.path.exists(path):
             raise HTTPException(status_code=404, detail="File not found")

        output_name = f"converted_{os.path.splitext(filename)[0]}.docx"
        result_path = ConverterService.pdf_to_docx(path, output_name)
        return {"result_filename": os.path.basename(result_path)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/process/pdf-to-image")
def process_pdf_to_image(filename: str = Form(...)):
    try:
        path = os.path.join(settings.TEMP_DIR, filename)
        if not os.path.exists(path):
             raise HTTPException(status_code=404, detail="File not found")

        output_base = f"converted_{os.path.splitext(filename)[0]}"
        result_path = ConverterService.pdf_to_images(path, output_base)
        return {"result_filename": os.path.basename(result_path)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/process/merge-pdf")
def process_merge_pdf(filenames: List[str]):
    try:
        paths = [os.path.join(settings.TEMP_DIR, f) for f in filenames]
        for p in paths:
            if not os.path.exists(p):
                 raise HTTPException(status_code=404, detail=f"File not found: {os.path.basename(p)}")

        output_name = f"merged_{len(filenames)}_files.pdf"
        result_path = ConverterService.merge_pdfs(paths, output_name)
        return {"result_filename": os.path.basename(result_path)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/process/split-pdf")
def process_split_pdf(filename: str = Form(...)):
    try:
        path = os.path.join(settings.TEMP_DIR, filename)
        if not os.path.exists(path):
             raise HTTPException(status_code=404, detail="File not found")

        output_base = f"split_{os.path.splitext(filename)[0]}"
        result_path = ConverterService.split_pdf(path, output_base)
        return {"result_filename": os.path.basename(result_path)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/process/rotate-pdf")
def process_rotate_pdf(filename: str = Form(...), degrees: int = Form(...)):
    try:
        path = os.path.join(settings.TEMP_DIR, filename)
        if not os.path.exists(path):
             raise HTTPException(status_code=404, detail="File not found")

        output_name = f"rotated_{os.path.splitext(filename)[0]}.pdf"
        result_path = ConverterService.rotate_pdf(path, degrees, output_name)
        return {"result_filename": os.path.basename(result_path)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/process/compress-pdf")
def process_compress_pdf(filename: str = Form(...)):
    try:
        path = os.path.join(settings.TEMP_DIR, filename)
        if not os.path.exists(path):
             raise HTTPException(status_code=404, detail="File not found")

        output_name = f"compressed_{os.path.splitext(filename)[0]}.pdf"
        result_path = ConverterService.compress_pdf(path, output_name)
        return {"result_filename": os.path.basename(result_path)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/process/lock-pdf")
def process_lock_pdf(filename: str = Form(...), password: str = Form(...)):
    try:
        path = os.path.join(settings.TEMP_DIR, filename)
        if not os.path.exists(path):
             raise HTTPException(status_code=404, detail="File not found")

        output_name = f"locked_{os.path.splitext(filename)[0]}.pdf"
        result_path = ConverterService.lock_pdf(path, password, output_name)
        return {"result_filename": os.path.basename(result_path)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/process/unlock-pdf")
def process_unlock_pdf(filename: str = Form(...), password: str = Form(...)):
    try:
        path = os.path.join(settings.TEMP_DIR, filename)
        if not os.path.exists(path):
             raise HTTPException(status_code=404, detail="File not found")

        output_name = f"unlocked_{os.path.splitext(filename)[0]}.pdf"
        result_path = ConverterService.unlock_pdf(path, password, output_name)
        return {"result_filename": os.path.basename(result_path)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/download/{filename}")
async def download_file(filename: str, background_tasks: BackgroundTasks):
    path = StorageService.get_file_path(filename)
    if not path or not os.path.exists(path):
        raise HTTPException(status_code=404, detail="File not found")

    # Optional: Schedule deletion after download? No, use time-based retention.
    return FileResponse(path, filename=filename)
