import Image from "next/image";
import { useRef } from "react";
import { FiUploadCloud } from "react-icons/fi";

type TImageUploadPreviewProps = {
  className?: string;
  label?: string;
  value?: string;
  onChange: (file: File) => void;
};

const ImageUploadPreview = ({
  className,
  label,
  value,
  onChange,
}: TImageUploadPreviewProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const handleImageClick = () => fileInputRef?.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const files = e.target.files[0];
      onChange(files);
    }
  };

  return (
    <div className={className}>
      <div
        onClick={handleImageClick}
        className="border-2 border-dashed cursor-pointer bg-primary-light border-primary/50 rounded-lg h-50 flex flex-col justify-center items-center"
      >
       
        {value ? (
          <Image
            src={value}
            alt="preview product"
            className="w-full h-full object-contain"
            width={200}
            height={200}
          />
        ) : (
          <>
            <FiUploadCloud size={24} className="text-primary" />
            <span className="text-sm font-medium">Click To Upload</span>
          </>
        )}
        <input
          type="file"
          name="product-image"
          ref={fileInputRef}
          className="hidden"
          id="product-image"
          accept="image/*"
          onChange={(e) => handleFileChange(e)}
        />
      </div>
    </div>
  );
};

export default ImageUploadPreview;
