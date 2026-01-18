export interface Tool {
  id: string;
  name: string;
  description: string;
  iconName: string;
  accepts: string; // File extension or MIME type
  multiple: boolean;
  actionEndpoint: string;
  requiresParams?: {
    name: string;
    type: 'text' | 'number' | 'password';
    label: string;
  }[];
}

export const tools: Tool[] = [
  {
    id: "image-to-pdf",
    name: "Image to PDF",
    description: "Convert JPG, PNG images to PDF documents.",
    iconName: "Image",
    accepts: "image/*",
    multiple: true,
    actionEndpoint: "/process/image-to-pdf",
  },
  {
    id: "pdf-to-image",
    name: "PDF to Image",
    description: "Convert PDF pages to high-quality images.",
    iconName: "FileText",
    accepts: ".pdf",
    multiple: false,
    actionEndpoint: "/process/pdf-to-image",
  },
  {
    id: "pdf-to-word",
    name: "PDF to Word",
    description: "Convert PDF documents to editable Word files.",
    iconName: "FileType2",
    accepts: ".pdf",
    multiple: false,
    actionEndpoint: "/process/pdf-to-word",
  },
  {
    id: "word-to-pdf",
    name: "Word to PDF",
    description: "Convert Word documents to PDF.",
    iconName: "FileType2",
    accepts: ".docx",
    multiple: false,
    actionEndpoint: "/process/word-to-pdf",
  },
  {
    id: "excel-to-pdf",
    name: "Excel to PDF",
    description: "Convert Excel spreadsheets to PDF.",
    iconName: "FileSpreadsheet",
    accepts: ".xlsx",
    multiple: false,
    actionEndpoint: "/process/excel-to-pdf",
  },
  {
    id: "ppt-to-pdf",
    name: "PowerPoint to PDF",
    description: "Convert PowerPoint presentations to PDF.",
    iconName: "Monitor",
    accepts: ".pptx",
    multiple: false,
    actionEndpoint: "/process/ppt-to-pdf",
  },
  {
    id: "merge-pdf",
    name: "Merge PDF",
    description: "Combine multiple PDFs into one unified document.",
    iconName: "Layers",
    accepts: ".pdf",
    multiple: true,
    actionEndpoint: "/process/merge-pdf",
  },
  {
    id: "split-pdf",
    name: "Split PDF",
    description: "Extract pages from your PDF files.",
    iconName: "Scissors",
    accepts: ".pdf",
    multiple: false,
    actionEndpoint: "/process/split-pdf",
  },
  {
    id: "rotate-pdf",
    name: "Rotate PDF",
    description: "Rotate your PDF pages.",
    iconName: "RotateCw",
    accepts: ".pdf",
    multiple: false,
    actionEndpoint: "/process/rotate-pdf",
    requiresParams: [
      { name: "degrees", type: "number", label: "Rotation Degrees (90, 180, 270)" }
    ]
  },
  {
    id: "compress-pdf",
    name: "Compress PDF",
    description: "Reduce file size while optimizing for maximal quality.",
    iconName: "Minimize2",
    accepts: ".pdf",
    multiple: false,
    actionEndpoint: "/process/compress-pdf",
  },
  {
    id: "lock-pdf",
    name: "Protect PDF",
    description: "Encrypt your PDF with a password.",
    iconName: "Lock",
    accepts: ".pdf",
    multiple: false,
    actionEndpoint: "/process/lock-pdf",
    requiresParams: [
      { name: "password", type: "password", label: "Set Password" }
    ]
  },
  {
    id: "unlock-pdf",
    name: "Unlock PDF",
    description: "Remove password security from PDF.",
    iconName: "Unlock",
    accepts: ".pdf",
    multiple: false,
    actionEndpoint: "/process/unlock-pdf",
    requiresParams: [
      { name: "password", type: "password", label: "Enter Password" }
    ]
  },
];
