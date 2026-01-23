import Button from "@/app/(landing)/components/ui/button";
import Modal from "../ui/modal";
type TBankInfoModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const BankInfoModal = ({ isOpen, onClose }: TBankInfoModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Bank">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 w-full">
          <div className="input-group-admin">
            <label htmlFor="bank-name">Bank Name</label>
            <input type="text" id="bank-name" name="bank-name" placeholder="e. g. BCA, Mandiri, BNI" />
          </div>
          <div className="input-group-admin">
            <label htmlFor="bank-number">Account Number</label>
            <input type="text" id="bank-number" name="bank-number" placeholder="123123123123" />
          </div>
          <div className="input-group-admin">
            <label htmlFor="bank-holder">Account Holder</label>
            <input type="text" id="bank-holder" name="bank-holder" placeholder="Holder Name as registered on the account" />
          </div>
        </div>
        <Button className="ml-auto mt-3 rounded-lg">Add Bank Account</Button>
      </div>
    </Modal>
  );
};

export default BankInfoModal;
