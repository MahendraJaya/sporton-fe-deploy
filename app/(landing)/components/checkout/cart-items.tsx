"use client";
import Image from "next/image";
import { cartList } from "../ui/cart-popup";
import priceFormatter from "@/app/utils/price-converter";
import Button from "../ui/button";
import { FiCreditCard, FiTrash2 } from "react-icons/fi";
import CardWithHeader from "../ui/card-with-header";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/app/hooks/use-cart-store";
import { getImageUrl } from "@/app/lib/api";

type TCartItemsProps = {
  handlePayment: () => void 
}

const CartItems = ({handlePayment} : TCartItemsProps) => {
  const { push } = useRouter();
  const { items, removeItem } = useCartStore();
  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.qty,
    0,
  );
  const handleRemoveItem = (e: React.MouseEvent, productId:string) => {
    e.stopPropagation();
    e.preventDefault();
    removeItem(productId);
  }

  return (
    <CardWithHeader title="Cart Items">
      <div className="h-[calc(100%-70px)] flex flex-col justify-between">

      
      <div className="overflow-auto max-h-75 ">
        {items.map((item) => {
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
                className="w-7 h-7 p-0! self-center ml-auto"
                variant="ghost"
                onClick={(e) => handleRemoveItem(e, item._id)}
              >
                <FiTrash2 />
              </Button>
            </div>
          );
        })}
      </div>
      <div className=" border-t border-gray-200 p-4 ">
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
            onClick={() => handlePayment()}
          >
            <FiCreditCard /> Proceed To Payment
          </Button>
        </div>
      </div>
      </div>
    </CardWithHeader>
  );
};

export default CartItems;
