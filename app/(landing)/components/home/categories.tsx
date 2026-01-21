import { getImageUrl } from "@/app/lib/api";
import { Category } from "@/app/types";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

const categoryList = [
  {
    index: 1,
    name: "Running",
    imgUrl: "category-running.svg",
  },
  {
    index: 2,
    name: "Football",
    imgUrl: "category-football.svg",
  },
  {
    index: 3,
    name: "Basketball",
    imgUrl: "category-basketball.svg",
  },
  {
    index: 4,
    name: "Badminton",
    imgUrl: "category-badminton.svg",
  },
  {
    index: 5,
    name: "Swimming",
    imgUrl: "category-swimming.svg",
  },
  { index: 6, name: "Tennis", imgUrl: "category-tennis.svg" },
];

type TCategoriesProps = {
  categories: Category[]
}

const CategoriesSection = ({categories} : TCategoriesProps) => {
  return (
    <section id="category-section" className="container mx-auto">
      <div className="flex justify-between">
        <h2 className="font-bold text-2xl">Browse By Categories</h2>
        <div className="flex gap-2 text-primary font-medium">
          <Link href="#">
            View All Categories{" "}
            <FiArrowRight className="self-center" size={14} />
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-6 gap-12">
        {categories.map((category) => {
          return (
            <div
              key={category._id}
              className="rounded-lg bg-gradient-to-r from-[#F1F1F1] to-[#F7F7F7] w-full aspect-square flex justify-center"
            >
              <div className="self-center">
                <Image
                  src={getImageUrl(category.imageUrl)}
                  alt="category"
                  width={86}
                  height={86}
                  className="mb-2.5"
                />
                <div className="text-primary font-medium text-xl text-center">
                  {category.name}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CategoriesSection;
