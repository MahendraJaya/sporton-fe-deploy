import Image from "next/image";
import ProductActions from "../../components/product-detail/product-action";
import priceFormatter from "@/app/utils/price-converter";

const ProductDetail = () => {
  return (
    <main className="container mx-auto py-40 flex gap-12">
      <div className="bg-primary-light aspect-square min-w-140 flex justify-center items-center">
        <Image
          src="/images/product/product-4.png"
          alt="product-4.png"
          width={550}
          height={550}
          className="aspect-square w-full object-contain"
        />
      </div>
      <div className="w-full py-7">
        <h1 className="font-bold text-5xl mb-6">SportsOn HyperSoccer v2</h1>
        <div className="bg-primary-light rounded-full py-2 px-6 text-primary w-fit">Football</div>
        <p className="mb-8">The SportsOn HyperSoccer v2 is engineered for the player who demands precision, power, and unrivaled speed on the pitch. Featuring a striking, two-toned black and white design with deep crimson accents, these cleats don't just perform—they make a statement. Experience the future of football footwear with v2's enhanced fit and cutting-edge traction.</p>
        <div className="text-primary text-[32px] font-semibold mb-12">
            {
                priceFormatter(458000)
            }
        </div>
        <ProductActions />
      </div>
    </main>
  );
};

export default ProductDetail;
