import { getImageUrl } from "@/app/lib/api";
import { Product } from "@/app/types";
// import { getAllProducts } from "@/app/services/product.service";
import priceFormatter from "@/app/utils/price-converter";
import Image from "next/image";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

type TProductTableProps = {
  products: Product[];
  onDelete?: (id:string) => void;
  onEdit?: (product: Product) => void;
  onSuccess?: () => void;
}
//jam 01:05
const ProductTable =  ({products, onDelete, onEdit, onSuccess} : TProductTableProps) => {

  return (
    <div className="bg-white rounded-xl border border-gray-200">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="px-6 py-4 font-semibold">Product</th>
            <th className="px-6 py-4 font-semibold">Category</th>
            <th className="px-6 py-4 font-semibold">Price</th>
            <th className="px-6 py-4 font-semibold">Stock</th>
            <th className="px-6 py-4 font-semibold">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr
              key={product._id}
              className="border-b border-gray-200 font-semibold last:border-b-0"
            >
              <td className="px-6 py-4 flex items-center gap-3 font-medium ">
                <Image
                  src={getImageUrl(product.imageUrl)}
                  width={54}
                  height={50}
                  alt={product.name}
                  className="bg-gray-100 aspect-square object-contain"
                />{" "}
                {product.name}
              </td>
              <td className="px-6 py-4 ">
                <span className="bg-gray-200 px-2 py-1 rounded-lg">
                  {product.category.name}
                </span>
              </td>
              <td className="px-6 py-4">{priceFormatter(product.price)}</td>
              <td className="px-6 py-4">{product.stock} Units</td>
              <td className="px-6 py-4 text-gray-600">
                <button className="cursor-pointer">
                  <FiEdit2 size={20} onClick={() => {onEdit?.(product)}}/>
                </button>
                <button className="ml-3 cursor-pointer">
                  <FiTrash2 size={20} onClick={() => {onDelete?.(product._id)}}/>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
