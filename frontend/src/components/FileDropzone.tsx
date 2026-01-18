'use client';

import { useState, useRef } from 'react';
import { Upload, X, File as FileIcon } from 'lucide-react';
import clsx from 'clsx';

interface FileDropzoneProps {
  accept: string;
  multiple: boolean;
  onFilesSelected: (files: File[]) => void;
}

export default function FileDropzone({ accept, multiple, onFilesSelected }: FileDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFiles = (files: File[]) => {
    // Basic validation could go here
    onFilesSelected(files);
  };

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={clsx(
        "cursor-pointer border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-200",
        isDragging ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-blue-400 hover:bg-gray-50"
      )}
    >
      <input
        type="file"
        ref={inputRef}
        className="hidden"
        accept={accept}
        multiple={multiple}
        onChange={(e) => e.target.files && handleFiles(Array.from(e.target.files))}
      />

      <div className="flex flex-col items-center space-y-4">
        <div className="p-4 bg-blue-100 rounded-full text-blue-600">
          <Upload className="w-8 h-8" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-1">
            Select {multiple ? 'files' : 'file'} to upload
          </h3>
          <p className="text-gray-500">
            or drag and drop them here
          </p>
        </div>
      </div>
    </div>
  );
}
