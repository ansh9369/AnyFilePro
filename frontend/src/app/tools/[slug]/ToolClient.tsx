'use client';

import { useState, use } from 'react';
import Navbar from '@/components/Navbar';
import FileDropzone from '@/components/FileDropzone';
import { tools } from '@/lib/tools';
import { uploadFiles, processFiles } from '@/lib/api';
import { Loader2, Download, FileText, CheckCircle, ArrowLeft, X } from 'lucide-react';
import Link from 'next/link';
import { IconMap } from '@/lib/icons';

export default function ToolClient({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const tool = tools.find(t => t.id === slug);
  const ToolIcon = tool ? (IconMap[tool.iconName] || FileText) : FileText;

  const [files, setFiles] = useState<File[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<{filename: string, original_name: string}[]>([]);
  const [status, setStatus] = useState<'IDLE' | 'UPLOADING' | 'CONFIGURING' | 'PROCESSING' | 'COMPLETED' | 'ERROR'>('IDLE');
  const [resultFilename, setResultFilename] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [toolParams, setToolParams] = useState<Record<string, any>>({});

  if (!tool) {
    return <div className="p-10 text-center">Tool not found</div>;
  }

  const handleFilesSelected = async (selectedFiles: File[]) => {
    setFiles(selectedFiles);
    setStatus('UPLOADING');
    try {
      const res = await uploadFiles(selectedFiles);
      setUploadedFiles(res.files);

      if (tool.requiresParams) {
        setStatus('CONFIGURING');
      } else {
        setStatus('PROCESSING');
        // Auto start processing if no params needed
        await startProcessing(res.files.map((f: any) => f.filename));
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Upload failed. Please try again.");
      setStatus('ERROR');
    }
  };

  const startProcessing = async (filenames: string[], currentParams: Record<string, any> = {}) => {
    setStatus('PROCESSING');
    try {
      const res = await processFiles(tool.actionEndpoint, filenames, currentParams);
      setResultFilename(res.result_filename);
      setStatus('COMPLETED');
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.response?.data?.detail || "Processing failed.");
      setStatus('ERROR');
    }
  };

  const handleParamSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startProcessing(uploadedFiles.map(f => f.filename), toolParams);
  };

  const downloadUrl = resultFilename ? `/api/download/${resultFilename}` : '#';

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <div className="flex-grow container mx-auto px-4 py-12 flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center text-sm text-gray-500 hover:text-blue-600 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Tools
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
            <ToolIcon className="w-10 h-10 text-blue-600" />
            {tool.name}
          </h1>
          <p className="text-lg text-gray-600">{tool.description}</p>
        </div>

        {/* Content Area */}
        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8 min-h-[400px] flex flex-col justify-center">

          {status === 'IDLE' && (
            <FileDropzone
              accept={tool.accepts}
              multiple={tool.multiple}
              onFilesSelected={handleFilesSelected}
            />
          )}

          {status === 'UPLOADING' && (
            <div className="text-center">
              <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900">Uploading files...</h3>
            </div>
          )}

          {status === 'CONFIGURING' && (
            <div className="max-w-md mx-auto w-full">
              <h3 className="text-xl font-semibold mb-6 text-center">Configure Options</h3>
              <form onSubmit={handleParamSubmit} className="space-y-4">
                {tool.requiresParams?.map((param) => (
                  <div key={param.name}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {param.label}
                    </label>
                    <input
                      type={param.type}
                      required
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      onChange={(e) => setToolParams({...toolParams, [param.name]: e.target.value})}
                    />
                  </div>
                ))}
                <button
                  type="submit"
                  className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Start Conversion
                </button>
              </form>
            </div>
          )}

          {status === 'PROCESSING' && (
            <div className="text-center">
              <Loader2 className="w-16 h-16 text-blue-600 animate-spin mx-auto mb-6" />
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">Converting...</h3>
              <p className="text-gray-500">This usually takes just a few seconds</p>
            </div>
          )}

          {status === 'COMPLETED' && (
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">Ready!</h3>
                <p className="text-gray-500">Your file has been converted successfully.</p>
              </div>
              <a
                href={downloadUrl}
                download
                className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <Download className="w-6 h-6 mr-2" />
                Download File
              </a>
              <div>
                <button
                  onClick={() => {
                    setStatus('IDLE');
                    setFiles([]);
                    setUploadedFiles([]);
                    setResultFilename(null);
                    setToolParams({});
                  }}
                  className="text-gray-500 hover:text-blue-600 underline"
                >
                  Convert another file
                </button>
              </div>
            </div>
          )}

          {status === 'ERROR' && (
            <div className="text-center">
               <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <X className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Something went wrong</h3>
              <p className="text-red-500 mb-6">{errorMsg}</p>
              <button
                onClick={() => setStatus('IDLE')}
                className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Try Again
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
