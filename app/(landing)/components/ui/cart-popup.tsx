import priceFormatter from "@/app/utils/price-converter";
import Image from "next/image";
import Button from "./button";
import { FiArrowRight, FiTrash2 } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/app/hooks/use-cart-store";
import { getImageUrl } from "@/app/lib/api";
import React from "react";

export const cartList = [
  {
    name: "SportOn Product 1",
    category: "Running",
    price: 450000,
    qty: 2,
    imageUrl: "product-1.png",
    index: 1,
  },
  {
    name: "SportOn Product 2",
    category: "Football",
    price: 450000,
    imageUrl: "product-2.png",
    qty: 3,
    index: 2,
  },
];

const CartPopup = () => {
  const { push } = useRouter();
  const { items, removeItem } = useCartStore();
  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.qty,
    0,
  );

  const handleRemoveItem = (e: React.MouseEvent, productId: string) => {
    e.stopPropagation();
    e.preventDefault();
    removeItem(productId);
  };

  return (
    <div className="absolute bg-white right-0 top-12 shadow-xl shadow-black/10 border border-gray-200 w-90">
      <div className="p-4 border-b border-gray-200 font-bold text-center">
        Shopping Cart
      </div>
      <div className="flex flex-col ">
        {items.length ? (
          items.map((item) => {
            return (
              <div
                className="border-b border-gray-200 p-4 flex gap-3"
                key={item._id}
              >
                <div className="bg-primary-light aspect-square w-16 flex justify-center items-center">
                  <Image
                    src={getImageUrl(item.imageUrl)}
                    alt={item.name}
                    width={63}
                    height={63}
                    className="aspect-square w-full object-contain"
                  />
                </div>
                <div className="self-center-safe">
                  <div className="text-sm font-medium">{item.name}</div>
                  <div className="flex gap-3 font-medium text-xs">
                    <div>{item.qty}x</div>
                    <div className="text-primary">
                      {priceFormatter(item.price)}
                    </div>
                  </div>
                </div>
                <Button
                  size="small"
                  className="w-7 h-7 !p-0 self-center ml-auto"
                  variant="ghost"
                  onClick={(e) => handleRemoveItem(e, item._id)}
                >
                  <FiTrash2 />
                </Button>
              </div>
            );
          })
        ) : (
          <div className="text-center py-4 font-semibold opacity-50">Cart is empty</div>
        )}
        <div className="border border-t border-gray-200 p-4">
          <div className="flex font-bold  justify-between">
            <div className="text-sm ">Total</div>
            <div className="text-primary text-xs">
              {priceFormatter(totalPrice)}
            </div>
          </div>
          <div className="mt-4">
            <Button
              variant="dark"
              size="small"
              className="w-full"
              onClick={() => push("/checkout")}
            >
              Checkout Now <FiArrowRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPopup;
