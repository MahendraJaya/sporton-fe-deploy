import Image from "next/image";
import Link from "next/link";
import Button from "../ui/button";
import { FiPlus } from "react-icons/fi";
import priceFormatter from "@/app/utils/price-converter";

const productList = [
  {
    name: "SportOn Product 1",
    category: "Running",
    price: 450000,
    imageUrl: "product-1.png",
    index: 1,
  },
  {
    name: "SportOn Product 2",
    category: "Football",
    price: 450000,
    imageUrl: "product-2.png",
    index: 2,
  },
  {
    name: "SportOn Product 3",
    category: "Basketball",
    price: 450000,
    imageUrl: "product-3.png",
    index: 3,
  },
  {
    name: "SportOn Product 4",
    category: "Badminton",
    price: 450000,
    imageUrl: "product-4.png",
    index: 4,
  },
  {
    name: "SportOn Product 5",
    category: "Swimming",
    price: 450000,
    imageUrl: "product-5.png",
    index: 5,
  },
  {
    name: "SportOn Product 6",
    category: "Tennis",
    price: 450000,
    imageUrl: "product-6.png",
    index: 6,
  },
  {
    name: "SportOn Product 7",
    category: "Cycling",
    price: 450000,
    imageUrl: "product-7.png",
    index: 7,
  },
  {
    name: "SportOn Product 8",
    category: "Volleyball",
    price: 450000,
    imageUrl: "product-8.png",
    index: 8,
  },
];

const ProductSection = () => {
  return (
    <section id="product-section" className="container mx-auto mt-32 mb-52">
      <h2 className="font-bold italic text-4xl text-center mb-11">
        <span className="text-primary">OUT </span>PRODUCT
      </h2>

      <div className="grid grid-cols-4 gap-5">
        {productList.map((product) => {
          return (
            <Link
              href={`/product/${product.name}`}
              key={product.index}
              className="p-1.5 bg-white hover:drop-shadow-xl duration-300"
            >
              <div className="bg-primary-light aspect-square w-full flex justify-center items-center relative">
                <Image
                  src={`/images/product/${product.imageUrl}`}
                  alt="product"
                  width={300}
                  height={300}
                  className="aspect-square object-contain"
                />
                <Button className="w-10 h-10 p-2! absolute right-3 top-3">
                  <FiPlus size={24} />
                </Button>
              </div>
              <h3 className="font-medium text-lg mb-1.5">{product.name}</h3>
              <div className="flex justify-between mb-8">
                <div className="text-gray-500">{product.category}</div>
                <div className="text-primary font-medium">
                  {priceFormatter(product.price)}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default ProductSection;
