'use client';

import { useState } from 'react';
import { Share2, Copy, Check } from 'lucide-react';

export default function ShareButton({ filename }: { filename: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // In a real app, this would be a specific shareable ID, not just filename
  // which might be temporary.
  const shareUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/api/download/${filename}`
    : '';

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative inline-block text-left mt-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
      >
        <Share2 className="w-4 h-4 mr-2" />
        Share Link
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-xl z-50 p-4 border">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Share this file</h4>
          <p className="text-xs text-gray-500 mb-3">Anyone with this link can download the file for the next hour.</p>

          <div className="flex items-center space-x-2">
            <input
              readOnly
              value={shareUrl}
              className="flex-1 text-xs p-2 bg-gray-50 rounded border truncate outline-none"
            />
            <button
              onClick={handleCopy}
              className="p-2 bg-blue-100 rounded hover:bg-blue-200 transition-colors"
              title="Copy link"
            >
              {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4 text-blue-600" />}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
