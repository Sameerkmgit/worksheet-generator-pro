import React, { useState, useRef, useCallback } from "react";
import { Upload, FileText, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface PdfUploadZoneProps {
  file: File | null;
  onFileChange: (file: File | null) => void;
  existingPdfUrl?: string;
  isUploading?: boolean;
  uploadProgress?: number;
}

/** Extract a human-readable filename from a Supabase storage URL or any URL */
function extractFilename(url: string): string {
  try {
    const decoded = decodeURIComponent(url);
    const parts = decoded.split("/");
    const last = parts[parts.length - 1];
    // Remove leading timestamp prefix like "1234567890-"
    return last.replace(/^\d{10,}-/, "");
  } catch {
    return "current-file.pdf";
  }
}

export default function PdfUploadZone({
  file,
  onFileChange,
  existingPdfUrl,
  isUploading = false,
  uploadProgress = 0,
}: PdfUploadZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = useCallback(
    (f: File | null) => {
      if (f && f.type !== "application/pdf") return;
      onFileChange(f);
    },
    [onFileChange]
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const droppedFile = e.dataTransfer.files?.[0];
      if (droppedFile) handleFile(droppedFile);
    },
    [handleFile]
  );

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback(() => setIsDragging(false), []);

  // Uploading state
  if (isUploading) {
    return (
      <div className="border-2 border-dashed rounded-lg border-primary/40 bg-primary/5 p-6 text-center space-y-3">
        <Loader2 className="w-8 h-8 mx-auto animate-spin text-primary" />
        <p className="text-sm font-medium text-foreground">Uploading PDF…</p>
        <Progress value={uploadProgress} className="h-2 max-w-xs mx-auto" />
        <p className="text-xs text-muted-foreground">{uploadProgress}%</p>
      </div>
    );
  }

  // File selected (new file picked by user)
  if (file) {
    return (
      <div className="border-2 rounded-lg border-primary/40 bg-primary/5 p-4 flex items-center gap-3">
        <FileText className="w-8 h-8 text-primary shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="font-medium text-sm text-foreground truncate">{file.name}</p>
          <p className="text-xs text-muted-foreground">
            {(file.size / 1024 / 1024).toFixed(2)} MB — ready to upload on save
          </p>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => {
            onFileChange(null);
            if (inputRef.current) inputRef.current.value = "";
          }}
          className="shrink-0"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  // Edit mode: existing PDF already stored
  if (existingPdfUrl) {
    return (
      <div className="space-y-2">
        <div className="border-2 rounded-lg border-border p-4 flex items-center gap-3">
          <FileText className="w-8 h-8 text-primary shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm text-foreground truncate">
              {extractFilename(existingPdfUrl)}
            </p>
            <p className="text-xs text-muted-foreground">Current PDF</p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => inputRef.current?.click()}
          >
            Replace
          </Button>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept=".pdf"
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0] || null)}
        />
      </div>
    );
  }

  // Default: empty drop zone
  return (
    <div
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onClick={() => inputRef.current?.click()}
      className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
        isDragging
          ? "border-primary bg-primary/5"
          : "border-border hover:border-primary/60"
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".pdf"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0] || null)}
      />
      <Upload className="w-10 h-10 mx-auto mb-2 text-muted-foreground" />
      <p className="font-medium text-sm text-foreground">
        Drag &amp; drop PDF here or click to browse
      </p>
      <p className="text-xs text-muted-foreground mt-1">Only .pdf files accepted</p>
    </div>
  );
}
