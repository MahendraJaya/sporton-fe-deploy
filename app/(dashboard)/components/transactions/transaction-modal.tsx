import Button from "@/app/(landing)/components/ui/button";
import Modal from "../ui/modal";
import ImageUploadPreview from "../ui/image-upload-preview";
import { useState } from "react";
import Image from "next/image";
import priceFormatter from "@/app/utils/price-converter";
import { FiCheck, FiX } from "react-icons/fi";

type TTransactionModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const TransactionModal = ({ isOpen, onClose }: TTransactionModalProps) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

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
              <div className="text-right">23/02/2026 19:32</div>
            </div>
            <div className="flex justify-between font-medium">
              <div className="opacity-50">Customer</div>
              <div className="text-right">John Doe</div>
            </div>
            <div className="flex justify-between font-medium">
              <div className="opacity-50">Contact</div>
              <div className="text-right">756923461</div>
            </div>
            <div className="flex justify-between font-medium">
              <div className="opacity-50  whitespace-nowrap">
                Shipping Address
              </div>
              <div className="text-right max-w-3/4">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Dolores tempora incidunt neque tempore error odio{" "}
              </div>
            </div>
          </div>
          <h4 className="font-semibold text-sm mb-1">Items Purchased</h4>
          <div className="border border-gray-200 rounded-lg p-3 flex gap-2 items-center mb-6">
            <div className="bg-gray-100 rounded aspect-square w-8 h-8 ">
              <Image src="/images/product/product-2.png" className="object-contain" alt="product" width={30} height={30} />
            </div>
            <div className="font-medium text-sm ">
              SportOn Hyperfast Shoes
            </div>
            <div className="font-medium ml-auto text-sm  ">
              3 Units
            </div>
          </div>
          <div className="flex justify-between">
            <h4 className="font-semibold text-sm ">
              Total
            </h4>
            <div className="text-primary font-semibold text-sm">
              {priceFormatter(450000)}
            </div>
          </div>
          <div className="mt-12 gap-5 flex justify-end">
            <Button className="text-primary! bg-primary-light! rounded-md!" size="small"> <FiX size={20} />Reject</Button>
            <Button className="text-white! bg-[#50C252]! rounded-md!" size="small"> <FiCheck size={20} />Approve</Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default TransactionModal;
