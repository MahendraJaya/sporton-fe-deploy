import { getImageUrl } from "@/app/lib/api";
import { Category } from "@/app/types";
// import { getAllProducts } from "@/app/services/product.service";
import priceFormatter from "@/app/utils/price-converter";
import Image from "next/image";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

type TCategoryTableProps = {
  categories: Category[];
  isOpen: () => void;
  isOpenEditCategory: (category: Category) => void;
  isDeleteModalOpen: (id: string) => void;
};

const CategoryTable = ({
  categories,
  isOpen,
  isOpenEditCategory,
  isDeleteModalOpen,
}: TCategoryTableProps) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="px-6 py-4 font-semibold">Category</th>
            <th className="px-6 py-4 font-semibold">Description</th>
            <th className="px-6 py-4 font-semibold">Action</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr
              key={category._id}
              className="border-b border-gray-200 font-semibold last:border-b-0"
            >
              <td className="px-6 py-4 flex items-center gap-3 font-medium ">
                <Image
                  src={getImageUrl(category.imageUrl)}
                  width={54}
                  height={50}
                  alt={category.name}
                  className="bg-gray-100 aspect-square object-contain"
                />{" "}
                {category.name}
              </td>
              <td className="px-6 py-4">{category.description}</td>
              <td className="px-6 py-4 text-gray-600">
                <button
                  className="cursor-pointer"
                  onClick={() => {
                    isOpenEditCategory(category);
                  }}
                >
                  <FiEdit2 size={20} />
                </button>
                <button
                  className="ml-3 cursor-pointer"
                  onClick={() => {
                    isDeleteModalOpen(category._id);
                  }}
                >
                  <FiTrash2 size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryTable;
