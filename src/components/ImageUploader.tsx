import React, { useState, useEffect } from 'react';
import { Label } from './ui/label';
import { Input } from './ui/input';

interface ImageUploaderProps {
  currentImageUrl: string;
  onImageUpload: (file: File) => void;
  label: string;
  worksheetId?: string;
}

function ImageUploader({ currentImageUrl, onImageUpload, label, worksheetId }: ImageUploaderProps) {
  const [preview, setPreview] = useState(currentImageUrl);

  // Update preview when currentImageUrl changes
  useEffect(() => {
    setPreview(currentImageUrl);
  }, [currentImageUrl]);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      // Show local preview
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
      // Pass file to parent handler for upload
      onImageUpload(file);
    }
  }

  return (
    <div className="space-y-3">
      <Label className="text-sm font-semibold">{label}</Label>
      
      {/* Image Preview */}
      <div className="aspect-video relative rounded-lg overflow-hidden bg-muted border-2 border-border max-w-xs">
        <img 
          src={preview} 
          alt="Current Preview" 
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback to placeholder if image fails to load
            e.currentTarget.src = 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&h=300&fit=crop';
          }}
        />
      </div>

      {/* File Input */}
      <Input
        type="file"
        accept="image/png,image/jpeg,image/webp,image/jpg"
        onChange={handleFileChange}
        className="cursor-pointer"
        id={worksheetId ? `upload-${worksheetId}` : 'image-upload'}
      />
    </div>
  );
}

export default ImageUploader;
