"use client"
import priceFormatter from "@/app/utils/price-converter";
import Button from "../ui/button";
import CardWithHeader from "../ui/card-with-header";
import FileUpload from "../ui/file-upload";
import { FiCheckCircle} from "react-icons/fi";
import { cartList } from "../ui/cart-popup";
import { useRouter } from "next/navigation";

const PaymentStep = () => {
    const {push} = useRouter()
    const UploadAndConfirm = () => {
        push("/order-status/1")
    }
  const totalPrice = cartList.reduce(
    (total, item) => total + item.price * item.qty,
    0,
  );
  return (
    <CardWithHeader title="Payment Step">
      <div className="p-5">
        <ol className="list-decimal text-xs pl-2 flex flex-col gap-4 mb-6">
          <li>
            Transfer the total amount of <b>Rp. 1.035.000</b> to your preferred
            bank account listed under 'Payment Options' (BCA, Mandiri, or BTPN).
          </li>
          <li>
            After completing the transfer, <b>keep the payment receipt</b> or a
            screenshot of the transfer confirmation. This will be needed for the
            next step.
          </li>
          <li>
            Upload the payment receipt/screenshot using the{" "}
            <b>'Upload Receipt & Confirm'</b> button below to validate your
            transaction.
          </li>
        </ol>
        <FileUpload />
      </div>
      <div className=" border-t border-gray-200 p-4 ">
        <div className="flex font-bold  justify-between">
          <div className="text-sm ">Total</div>
          <div className="text-primary text-xs">
            {priceFormatter(totalPrice)}
          </div>
        </div>
        <div className="mt-4">
          <Button variant="dark" size="small" className="w-full" onClick={() => UploadAndConfirm()}>
            <FiCheckCircle /> Proceed To Payment
          </Button>
        </div>
      </div>
    </CardWithHeader>
  );
};

export default PaymentStep;
