
import OrderConfirmed from "../../components/order-status/order-confirmed";
import OrderRejected from "../../components/order-status/order-rejected";
import OrderSubmitted from "../../components/order-status/order-submitted";
import { getTransactionById } from "@/app/services/transaction.service";

type TOrderStatusProps = {
  params: Promise<{ id: string }>
}

const OrderStatus = async({params} : TOrderStatusProps) => {
  const {id} = await params;
  const transaction = await getTransactionById(id);

  return (
    <main className="bg-gray-100 min-h-[80vh]">
        <div className="max-w-5xl mx-auto pt-40 pb-20">
          <h1 className="text-5xl font-bold text-center mb-11">Order Status</h1>
        </div>
        {transaction.status === "paid" && <OrderConfirmed /> }
        {transaction.status === "pending" && <OrderSubmitted /> }
        {transaction.status === "rejected" && <OrderRejected /> }
    </main>
  );
};

export default OrderStatus;
