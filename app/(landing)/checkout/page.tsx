import CartItems from "../components/checkout/cart-items";
import OrderInformation from "../components/checkout/order-information";

const Checkout = () => {
  return (
    <main className="bg-gray-100 min-h-[80vh]">
      <div className="max-w-5xl mx-auto py-20">
        <h1 className="font-bold text-5xl text-center ">Checkout Now</h1>
        <div className="grid grid-cols-2 gap-14 mt-10 items-stretch">
          <div className="bg-white p-1 w-full">
            <OrderInformation />
          </div>
          <div className="bg-white p-1 w-full">
            <CartItems />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Checkout;
