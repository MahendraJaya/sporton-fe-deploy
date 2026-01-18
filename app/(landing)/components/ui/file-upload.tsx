"use client";
import React, { useRef, useState } from "react";
import { FiImage, FiTrash, FiUploadCloud } from "react-icons/fi";

type TTypeFileUploadProps = {
  onFileSelect?: (file: File | null) => void;
};

const FileUpload = ({ onFileSelect }: TTypeFileUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const handleFileChange = (selectedFile?: File) => {
    if (!selectedFile) {
      return;
    }

    setFile(selectedFile);
    onFileSelect?.(selectedFile);
  };

  const removeFile = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setFile(null);
    onFileSelect?.(null);
  };

  return (
    <div
      onClick={() => fileInputRef.current?.click()}
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDrop={(e) => {
        e.preventDefault();
        handleFileChange(e.dataTransfer.files[0]);
      }}
      className="flex flex-col justify-center items-center w-full py-6 border border-dashed border-primary bg-primary-light cursor-pointer"
    >
      <input
        type="file"
        name=""
        className="hidden"
        ref={fileInputRef}
        accept="image/*"
        id=""
        onChange={(e) => handleFileChange(e.target.files?.[0])}
      />
      {!file ? (
        <div className="text-center my-5">
          <FiUploadCloud className="text-primary mx-auto" size={28}/>
          <p className="text-xs ">Upload Your Receipt Here</p>
        </div>
      ) : (
        <div className="text-center">
          <FiImage className="text-primary mx-auto mb-4 " size={28} />
          <p className="text-xs text-primary">{file.name}</p>
          <p className="text-xs text-gray-400">
            {(file.size / 1024).toFixed(1)} KB
          </p>
          <button className="flex gap-2 bg-primary/70 text-white rounded mx-auto mt-4 p-2" onClick={(e) => removeFile(e)}>
            <FiTrash className="self-center" /> Remove File
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
