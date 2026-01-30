"use client";
import Button from "@/app/(landing)/components/ui/button";
import { FiPlus } from "react-icons/fi";

import { useEffect, useState } from "react";
import CategoryTable from "../../components/category/category-table";
import CategoryModal from "../../components/category/category-modal";
import {
  deleteCategory,
  getAllCategories,
} from "@/app/services/category.service";
import { Category } from "@/app/types";
import DeleteModal from "../../components/ui/modal-delete";
import { toast } from "react-toastify";

const CategoryManagement = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [deleteCategoryId, setDeleteCategoryId] = useState("");
  //terakhirjam 1:15
  const handleCloseModal = () => {
    setIsOpen(false);
    setSelectedCategory(null);
  };

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeleteCategoryId("");
  };

  const handleConfirmDeleteModal = async () => {
    if (!deleteCategoryId) return;
    try {
      await deleteCategory(deleteCategoryId);
      fetchCategoriesAgain();
      setIsDeleteModalOpen(false);
      setDeleteCategoryId("");
      toast.success("Successfully delete category");
    } catch (error) {
      toast.error("Error while deleting category");
      console.error(
        "Error while deleting category (page.tsx ~ handleConfirmDeleteModal) : ",
        error,
      );
    }
  };

  const handleOpenEditCategory = (category: Category) => {
    setSelectedCategory(category);
    // console.log(selectedCategory);
    setIsOpen(true);
  };

  const handleDeleteCategory = (id: string) => {
    setDeleteCategoryId(id);
    setIsDeleteModalOpen(true);
  };

  const fetchCategoriesAgain = async () => {
    try {
      const getCategoriesData = await getAllCategories();
      setCategories(getCategoriesData);
    } catch (error) {
      console.error(
        "Error while fetching categories data (page.tsx ~ fetchCategories) : ",
        error,
      );
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const getCategoriesData = await getAllCategories();
        setCategories(getCategoriesData);
      } catch (error) {
        console.error(
          "Error while fetching categories data (page.tsx ~ fetchCategories) : ",
          error,
        );
      }
    };

    fetchCategories();
  }, [isOpen]);
  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="font-bolx text-2xl">Category Management</h1>
          <p className="opacity-50">Organize your product into categories.</p>
        </div>
        <Button className="rounded-lg" onClick={() => setIsOpen(true)}>
          <FiPlus size={24} />
          Add Category{" "}
        </Button>
      </div>
      <CategoryTable
        categories={categories}
        isDeleteModalOpen={handleDeleteCategory}
        isOpen={handleOpenModal}
        isOpenEditCategory={handleOpenEditCategory}
      />
      <CategoryModal
        isOpen={isOpen}
        onClose={handleCloseModal}
        onSuccess={fetchCategoriesAgain}
        category={selectedCategory}
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDeleteModal}
        title="Category"
      />
    </div>
  );
};

export default CategoryManagement;
