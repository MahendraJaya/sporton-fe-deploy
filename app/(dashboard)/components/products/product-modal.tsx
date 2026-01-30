import Button from "@/app/(landing)/components/ui/button";
import Modal from "../ui/modal";
import ImageUploadPreview from "../ui/image-upload-preview";
import { useEffect, useState } from "react";
import { Category, Product } from "@/app/types";
import { getAllCategories } from "@/app/services/category.service";
import { createProduct, updateProduct } from "@/app/services/product.service";
import { toast } from "react-toastify";
import { getImageUrl } from "@/app/lib/api";

type TProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  product?: Product | null;
};

type ProductFormData = {
  name: string;
  price: number;
  stock: number;
  categoryId: string;
  description: string;
};
// menit 38:56
const ProductModal = ({
  isOpen,
  onClose,
  onSuccess,
  product,
}: TProductModalProps) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    price: 0,
    stock: 0,
    categoryId: "",
    description: "",
  });

  const isEditMode = !!product;

  const fetchCategories = async () => {
    try {
      const data = await getAllCategories();

      setCategories(data);
    } catch (error) {
      console.error(
        "Failed to fetch categories data (product-modal.tsx) : ",
        error,
      );
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const data = new FormData();
      data.append("name", formData.name);
      data.append("price", formData.price.toString());
      data.append("stock", formData.stock.toString());
      data.append("description", formData.description);
      data.append("categoryId", formData.categoryId);

      if (imageFile) {
        data.append("image", imageFile);
      }

      if (isEditMode) {
        await updateProduct(product._id, data);
      } else {
        await createProduct(data);
      }

      setFormData({
        name: "",
        price: 0,
        stock: 0,
        categoryId: "",
        description: "",
      });
      setImageFile(null);
      setImagePreview(null);

      toast.success(
        isEditMode
          ? "Product updated successfully"
          : "Product added successfully",
      );

      onSuccess?.();
      onClose();
    } catch (error) {
      toast.error(
        isEditMode ? "Failed to edit product" : "Failed to add product",
      );
      console.error(
        isEditMode
          ? `Failed to edit product (product-modal.tsx) : ${error}`
          : `Failed to add product (product-modal.tsx) : ${error}`,
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (isEditMode && isOpen) {
      setFormData({
        name: product.name,
        price: product.price,
        stock: product.stock,
        categoryId: product.category._id,
        description: product.description,
      });
      setImagePreview(product.imageUrl ? getImageUrl(product.imageUrl) : null);
    } else {
      setFormData({
        name: "",
        price: 0,
        stock: 0,
        categoryId: "",
        description: "",
      });
      setImageFile(null);
      setImagePreview(null);
    }
  }, [isOpen, product]);

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditMode ? "Edit Product" : "Add New Product"}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex gap-7">
          <div className="min-w-50">
            <ImageUploadPreview
              label="Product Image"
              value={imagePreview ?? ""}
              onChange={(file) => {
                setImageFile(file);
                setImagePreview(URL.createObjectURL(file));
              }}
            />
          </div>
          <div className="flex flex-col gap-4 w-full">
            <div className="input-group-admin">
              <label htmlFor="name">Product Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="e. g. Running Shoes"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="input-group-admin">
                <label htmlFor="price">Price (IDR)</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  placeholder="e. g. Running Shoes"
                  onChange={handleChange}
                  value={formData.price}
                />
              </div>
              <div className="input-group-admin">
                <label htmlFor="stock">Stock</label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  placeholder="e. g. Running Shoes"
                  onChange={handleChange}
                  value={formData.stock}
                />
              </div>
            </div>
            <div className="input-group-admin">
              <label htmlFor="categoryId">Category</label>
              <select name="categoryId" className="pr-2" id="categoryId"
              onChange={handleChange}
              value={formData.categoryId}>
                <option value="" disabled>
                  Select Category
                </option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="input-group-admin">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            placeholder="Product Description ...."
            rows={6}
            onChange={handleChange}
            value={formData.description}
          ></textarea>
        </div>
        <Button
          className="ml-auto mt-3 rounded-lg"
          onClick={handleSubmit}
          disabled={isSubmitting}
          type="submit"
        >
          {isEditMode ? "Edit Product" : "Add Product"}
        </Button>
      </form>
    </Modal>
  );
};

export default ProductModal;
