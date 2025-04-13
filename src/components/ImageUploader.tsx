
import React, { useState, useRef } from 'react';
import { Image, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ImageUploaderProps {
  onImagesSelected: (images: string[]) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImagesSelected }) => {
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newImages: string[] = [];
      const imagePromises: Promise<string>[] = [];
      
      Array.from(files).forEach(file => {
        if (file.type.startsWith('image/')) {
          const promise = convertToBase64(file);
          imagePromises.push(promise);
        }
      });
      
      Promise.all(imagePromises).then(results => {
        const combinedImages = [...previewImages, ...results];
        setPreviewImages(combinedImages);
        onImagesSelected(combinedImages);
      });
    }
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const removeImage = (index: number) => {
    const updatedImages = previewImages.filter((_, i) => i !== index);
    setPreviewImages(updatedImages);
    onImagesSelected(updatedImages);
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="w-full">
      <input 
        type="file" 
        accept="image/*" 
        multiple 
        onChange={handleFileChange} 
        className="hidden" 
        ref={fileInputRef}
      />
      
      <Button 
        type="button" 
        variant="outline" 
        size="sm" 
        onClick={triggerFileInput}
        className={cn(
          "flex items-center gap-2 text-gray-600",
          previewImages.length > 0 ? "mb-3" : ""
        )}
      >
        <Image size={16} />
        <span>Upload Images</span>
      </Button>
      
      {previewImages.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {previewImages.map((img, index) => (
            <div key={index} className="relative group">
              <img 
                src={img} 
                alt={`Preview ${index}`} 
                className="w-16 h-16 object-cover rounded border border-gray-200" 
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute -top-2 -right-2 bg-white rounded-full p-0.5 shadow-md opacity-80 group-hover:opacity-100"
              >
                <X size={14} className="text-gray-600" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
