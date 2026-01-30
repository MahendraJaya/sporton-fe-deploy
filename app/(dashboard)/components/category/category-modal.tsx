import Button from "@/app/(landing)/components/ui/button";
import Modal from "../ui/modal";
import ImageUploadPreview from "../ui/image-upload-preview";
import { useEffect, useState } from "react";
import { Category } from "@/app/types";
import { getImageUrl } from "@/app/lib/api";
import {
  createCategory,
  updateCategory,
} from "@/app/services/category.service";
import { toast } from "react-toastify";

type TCategoryModalProps = {
  isOpen: boolean;
  onClose: () => void;
  category?: Category | null;
  onSuccess?: () => void;
};

type FormDataCategory = {
  name: string;
  description: string;
};

const CategoryModal = ({
  isOpen,
  onClose,
  category,
  onSuccess,
}: TCategoryModalProps) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormDataCategory>({
    name: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const isEditMode = async () => {
      if (category != null && isOpen) {
        setFormData({
          name: category.name,
          description: category.description,
        });
        setImagePreview(getImageUrl(category.imageUrl));
      } else {
        setFormData({
          name: "",
          description: "",
        });
        setImagePreview(null);
      }
    };

    isEditMode();
  }, [category, isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      setIsSubmitting(true);
      const data = new FormData();

      data.append("name", formData.name);
      data.append("description", formData.description);

      if (imageFile) {
        data.append("image", imageFile);
      }

      if (category) {
        await updateCategory(category._id, data);
      } else {
        await createCategory(data);
      }

      onSuccess?.();
      onClose?.();

      if (category) {
        toast.success("Category updated Successfully");
      } else {
        toast.success("Category created Successfully");
      }
    } catch (error) {
      alert(error)
      toast.error("Failed to create category");
      console.error(
        category
          ? "Error while updating category (category-modal.tsx) : "
          : "Error while creating category (category-modal.tsx) : ",
        error,
      );
    }finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={category ? "Update category" : "Add New Category"}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex gap-7">
          <div className="min-w-50">
            <ImageUploadPreview
              label="Category Image"
              value={imagePreview ?? ""}
              onChange={(file) => {
                setImageFile(file);
                setImagePreview(URL.createObjectURL(file));
              }}
            />
          </div>
          <div className="flex flex-col gap-4 w-full">
            <div className="input-group-admin">
              <label htmlFor="name">Category Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="e. g. Running Shoes"
                value={formData.name}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="input-group-admin">
              <label htmlFor="description">Description</label>
              <textarea
                name="description"
                id="description"
                placeholder="Category Description ...."
                rows={6}
                value={formData.description}
                onChange={(e) => handleChange(e)}
              ></textarea>
            </div>
          </div>
        </div>

        <Button className="ml-auto mt-3 rounded-lg" type="submit" disabled={isSubmitting}>
          {category ? "Update Category" : "Add Category"}
        </Button>
      </form>
    </Modal>
  );
};

export default CategoryModal;
