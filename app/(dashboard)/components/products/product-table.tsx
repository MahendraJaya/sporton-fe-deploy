import { getImageUrl } from "@/app/lib/api";
// import { getAllProducts } from "@/app/services/product.service";
import priceFormatter from "@/app/utils/price-converter";
import Image from "next/image";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

const ProductTable =  () => {
//   const products = await getAllProducts();
const products = [
    {
        _id: "1",
        name: "SportOn Product 1",
        category: "Category 1",
        price: 100,
        stock: 10,
        imageUrl: "/images/product/product-1.png"
    },
    {
        _id: "2",
        name: "SportOn Product 2",
        category: "Category 2",
        price: 100,
        stock: 10,
        imageUrl: "/images/product/product-2.png"
    },
    {
        _id: "3",
        name: "SportOn Product 3",
        category: "Category 3",
        price: 100,
        stock: 10,
        imageUrl: "/images/product/product-3.png"
    },
    {
        _id: "4",
        name: "SportOn Product 4",
        category: "Category 4",
        price: 100,
        stock: 10,
        imageUrl: "/images/product/product-4.png"
    },
    {
        _id: "5",
        name: "SportOn Product 5",
        category: "Category 5",
        price: 100,
        stock: 10,
        imageUrl: "/images/product/product-5.png"
    },
    {
        _id: "6",
        name: "SportOn Product 6",
        category: "Category 6",
        price: 100,
        stock: 10,
        imageUrl: "/images/product/product-6.png"
    },
    {
        _id: "7",
        name: "SportOn Product 7",
        category: "Category 7",
        price: 100,
        stock: 10,
        imageUrl: "/images/product/product-7.png"
    },
    {
        _id: "8",
        name: "SportOn Product 8",
        category: "Category 8",
        price: 100,
        stock: 10,
        imageUrl: "/images/product/product-8.png"
    },
]

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
                  src={product.imageUrl}
                  width={54}
                  height={50}
                  alt={product.name}
                  className="bg-gray-100 aspect-square object-contain"
                />{" "}
                {product.name}
              </td>
              <td className="px-6 py-4 ">
                <span className="bg-gray-200 px-2 py-1 rounded-lg">
                  {product.category}
                </span>
              </td>
              <td className="px-6 py-4">{priceFormatter(product.price)}</td>
              <td className="px-6 py-4">{product.stock} Units</td>
              <td className="px-6 py-4 text-gray-600">
                <button>
                  <FiEdit2 size={20} />
                </button>
                <button className="ml-3">
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

export default ProductTable;
