import Button from "@/app/(landing)/components/ui/button";
import Modal from "../ui/modal";
import { Bank } from "@/app/types";
import { ReactEventHandler, useEffect, useState } from "react";
import { createBank, updateBank } from "@/app/services/bank.service";
import { toast } from "react-toastify";
type TBankInfoModalProps = {
  isOpen: boolean;
  onClose: () => void;
  bank?: Bank | null;
  onSuccess?: () => void;
};

type BankFormData = {
  bankName: string;
  accountName: string;
  accountNumber: string;
};

const BankInfoModal = ({
  isOpen,
  onClose,
  bank,
  onSuccess,
}: TBankInfoModalProps) => {
  const isBankEdit = !!bank;
  const [formData, setFormData] = useState<BankFormData>({
    bankName: "",
    accountName: "",
    accountNumber: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const cekEditBank = () => {
      if (isBankEdit && isOpen) {
        setFormData({
          bankName: bank.bankName,
          accountName: bank.accountName,
          accountNumber: bank.accountNumber,
        });
      } else {
        setFormData({
          bankName: "",
          accountName: "",
          accountNumber: "",
        });
      }
    };
    cekEditBank();
  }, [isOpen, bank]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("bankName", formData.bankName);
      data.append("accountName", formData.accountName);
      data.append("accountNumber", formData.accountNumber);

      console.log(data)

      if (isBankEdit) {
        await updateBank(bank._id, data);
      } else {
        await createBank(data);
      }

      setFormData({
        bankName: "",
        accountName: "",
        accountNumber: "",
      });

      toast.success(
        isBankEdit ? "Bank updated successfully" : "Bank created successfully",
      );
      onSuccess?.();
      onClose?.();
    } catch (error) {
      toast.error(isBankEdit ? "Bank updated failed" : "Bank created failed");
      console.error(
        isBankEdit
          ? "Error while updating Bank (bank-info-modal.tsx ~ handleSubmit)"
          : "Error while Creating Bank (bank-info-modal.tsx ~ handleSubmit) : ",
        error,
      );
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isBankEdit ? "Edit Bank Account" : "Add New Bank"}
    >
      <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 w-full">
          <div className="input-group-admin">
            <label htmlFor="bankName">Bank Name</label>
            <input
              type="text"
              id="bankName"
              name="bankName"
              placeholder="e. g. BCA, Mandiri, BNI"
              onChange={(e) => {
                handleChange(e);
              }}
              value={formData.bankName}
            />
          </div>
          <div className="input-group-admin">
            <label htmlFor="accountNumber">Account Number</label>
            <input
              type="text"
              id="accountNumber"
              name="accountNumber"
              placeholder="123123123123"
              onChange={(e) => {
                handleChange(e);
              }}
              value={formData.accountNumber}
            />
          </div>
          <div className="input-group-admin">
            <label htmlFor="accountName">Account Holder</label>
            <input
              type="text"
              id="accountName"
              name="accountName"
              placeholder="Holder Name as registered on the account"
              onChange={(e) => {
                handleChange(e);
              }}
              value={formData.accountName}
            />
          </div>
        </div>
        <Button
          className="ml-auto mt-3 rounded-lg"
          type="submit"
          disabled={isSubmitting}
        >
          {isBankEdit ? "Update Bank Account" : "Add Bank Account"}
        </Button>
      </form>
    </Modal>
  );
};

export default BankInfoModal;
