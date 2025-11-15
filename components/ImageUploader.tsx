
import React, { useState, useCallback } from 'react';
import { UploadCloudIcon, CheckCircleIcon } from './icons/Icons';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
  imagePreview: string | null;
  onAnalyze: () => void;
  isAnalyzing: boolean;
  isConfigured: boolean;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, imagePreview, onAnalyze, isAnalyzing, isConfigured }) => {
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      onImageUpload(file);
    }
  };

  const onDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
  };

  const onDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      setFileName(file.name);
      onImageUpload(file);
    }
  };
  
  const isDisabled = !imagePreview || isAnalyzing || !isConfigured;
  const buttonTitle = !isConfigured ? "Please configure Roboflow API details first" : !imagePreview ? "Please upload an image first" : "";

  return (
    <div className="flex flex-col space-y-4">
      <label
        onDragOver={onDragOver}
        onDrop={onDrop}
        htmlFor="file-upload"
        className="relative flex flex-col items-center justify-center w-full h-64 border-2 border-primary-300 dark:border-primary-700 border-dashed rounded-lg cursor-pointer bg-primary-50 dark:bg-secondary-800 hover:bg-primary-100 dark:hover:bg-secondary-700 transition-colors"
      >
        {imagePreview ? (
          <img src={imagePreview} alt="Uploaded preview" className="object-contain h-full w-full rounded-lg" />
        ) : (
          <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
            <UploadCloudIcon className="w-10 h-10 mb-3 text-primary-500 dark:text-primary-400"/>
            <p className="mb-2 text-sm text-secondary-500 dark:text-secondary-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
            <p className="text-xs text-secondary-500 dark:text-secondary-400">PNG, JPG, or WEBP</p>
          </div>
        )}
        <input id="file-upload" type="file" className="hidden" accept="image/png, image/jpeg, image/webp" onChange={handleFileChange} />
      </label>

      {fileName && !imagePreview && (
          <div className="text-sm text-secondary-600 dark:text-secondary-300 flex items-center space-x-2">
            <CheckCircleIcon className="w-4 h-4 text-green-500" />
            <span>{fileName}</span>
          </div>
      )}

      <button
        onClick={onAnalyze}
        disabled={isDisabled}
        title={buttonTitle}
        className="w-full inline-flex justify-center items-center px-4 py-3 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:bg-secondary-300 dark:disabled:bg-secondary-600 disabled:cursor-not-allowed transition-all"
      >
        {isAnalyzing ? (
            <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Analyzing...
            </>
        ) : 'Analyze Image'}
      </button>
    </div>
  );
};
