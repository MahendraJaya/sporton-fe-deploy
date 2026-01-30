"use client";
import Button from "@/app/(landing)/components/ui/button";
import { FiPlus } from "react-icons/fi";
import ProductTable from "../../components/products/product-table";
import ProductModal from "../../components/products/product-modal";
import { useEffect, useState } from "react";
import { Product } from "@/app/types";
import { deleteProduct, getAllProducts } from "@/app/services/product.service";
import { toast } from "react-toastify";
import DeleteModal from "../../components/ui/modal-delete";

const ProductManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [product, setProducts] = useState<Product[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productToDeleteId, setProductsToDeleteId] = useState("");
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const fetchProductAgain = async () => {
    try {
      const data = await getAllProducts();
      if (data) setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setProductsToDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!productToDeleteId) return;
    try {
      const res = await deleteProduct(productToDeleteId);
      fetchProductAgain();

      toast.success("Product deleted successfully");
      setIsDeleteModalOpen(false);
      setProductsToDeleteId("");
    } catch (error) {
      toast.error("Failed to delete product");
      console.log("Failed to delete product (page.tsx (products)) ~ handleDeleteConfirm : ", error);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getAllProducts();
        if (data) setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="font-bolx text-2xl">Product Management</h1>
          <p className="opacity-50">Manage your inventory, prices and stock.</p>
        </div>
        <Button className="rounded-lg" onClick={() => setIsModalOpen(true)}>
          <FiPlus size={24} />
          Add Product{" "}
        </Button>
      </div>
      <ProductTable
        products={product}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
      <ProductModal
        product={selectedProduct}
        onSuccess={fetchProductAgain}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Product"
        />
    </div>
  );
};

export default ProductManagement;
