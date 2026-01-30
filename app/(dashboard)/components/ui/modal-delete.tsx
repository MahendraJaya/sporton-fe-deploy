import Button from "@/app/(landing)/components/ui/button";
import Modal from "./modal";

type TDeleteModal = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
};

const DeleteModal = ({ isOpen, onClose, onConfirm, title }: TDeleteModal) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Delete ${title}`}>
      <p>
        Are you sure you want to delete this {title}? This action cannot be
        undone!!
      </p>
      <div className="flex gap-5 mt-5">
        <Button
          variant="ghost"
          onClick={onClose}
          className="w-full rounded-md "
        >
          Cancel
        </Button>
        <Button className="w-full rounded-md" onClick={onConfirm}>
          Yes, Delete it.
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteModal;
