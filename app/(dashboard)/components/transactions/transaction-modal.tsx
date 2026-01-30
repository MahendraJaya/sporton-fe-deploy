import Button from "@/app/(landing)/components/ui/button";
import Modal from "../ui/modal";
import ImageUploadPreview from "../ui/image-upload-preview";
import { useEffect, useState } from "react";
import Image from "next/image";
import priceFormatter from "@/app/utils/price-converter";
import { FiCheck, FiX } from "react-icons/fi";
import { Transaction } from "@/app/types";
import { IoIosMailOpen } from "react-icons/io";
import { getImageUrl } from "@/app/lib/api";

type TTransactionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  transaction?: Transaction | null;
  onStatusChange: (id: string, status: "paid" | "rejected") => Promise<void>;
};

const TransactionModal = ({
  isOpen,
  onClose,
  transaction,
  onStatusChange,
}: TTransactionModalProps) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusUpdate = async (status: "paid" | "rejected") => {
    setIsUpdating(true);
    try {
      await onStatusChange(transaction?._id, status);
    } catch (error) {
      console.error(error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Category">
      <div className="flex gap-6 ">
        <div>
          <h4 className="font-semibold text-sm ">Payment Proof</h4>
          <Image
            src="/images/transaction/proof.png"
            alt="payment-proof"
            width={200}
            height={401}
          />
        </div>
        <div className="w-full ">
          <h4 className="font-semibold text-sm mb-1">Order Details</h4>
          <div className="bg-gray-100 rounded-md p-2 space-y-2 text-sm mb-6">
            <div className="flex justify-between font-medium">
              <div className="opacity-50">Date</div>
              <div className="text-right">{transaction?.createdAt}</div>
            </div>
            <div className="flex justify-between font-medium">
              <div className="opacity-50">Customer</div>
              <div className="text-right">{transaction?.customerName}</div>
            </div>
            <div className="flex justify-between font-medium">
              <div className="opacity-50">Contact</div>
              <div className="text-right">{transaction?.customerContact}</div>
            </div>
            <div className="flex justify-between font-medium">
              <div className="opacity-50  whitespace-nowrap">
                Shipping Address
              </div>
              <div className="text-right max-w-3/4">
                {transaction?.customerAddress}
              </div>
            </div>
          </div>
          <h4 className="font-semibold text-sm mb-1">Items Purchased</h4>
          <div className="space-y-3">
            {transaction?.purchasedItems.map((item, index) => (
              <div
                className="border border-gray-200 rounded-lg p-2 flex items-center gap-2"
                key={index}
              >
                <div className="bg-gray-100 rounded aspect-square w-8 h-8">
                  <Image
                    src={getImageUrl(item.productId.imageUrl)}
                    width={30}
                    height={30}
                    alt="product image"
                  />
                </div>
                <div className="font-medium text-sm">{item.productId.name}</div>
                <div className="font-medium ml-auto text-sm">
                  {item.qty} units
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between">
            <h4 className="font-semibold text-sm ">Total</h4>
            <div className="text-primary font-semibold text-sm">
              {priceFormatter(Number(transaction?.totalPayment))}
            </div>
          </div>
          <div className="mt-12 gap-5 flex justify-end">
            <Button
              className="text-primary! bg-primary-light! rounded-md!"
              size="small"
              onClick={() => handleStatusUpdate("rejected")}
              disabled={isUpdating}
            >
              {" "}
              <FiX size={20} />
              Reject
            </Button>
            <Button
              onClick={() => handleStatusUpdate("paid")}
              disabled={isUpdating}
              className="text-white! bg-[#50C252]! rounded-md!"
              size="small"
            >
              {" "}
              <FiCheck size={20} />
              Approve
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default TransactionModal;
