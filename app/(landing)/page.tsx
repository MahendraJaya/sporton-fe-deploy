import Image from "next/image";
import HeroSection from "./components/home/hero";
import CategoriesSection from "./components/home/categories";
import ProductSection from "./components/home/products";
import { getAllCategories } from "../services/category.service";
import { getAllProducts } from "../services/product.service";

export default async function Home() {
  const categories = await getAllCategories();
  const products = await getAllProducts();

  return (
    <main>
      <HeroSection />
      <CategoriesSection categories={categories}/>
      <ProductSection products={products}/>
    </main>
  );
}
