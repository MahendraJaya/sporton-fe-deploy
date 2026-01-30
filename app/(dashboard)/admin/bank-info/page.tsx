"use client";
import Button from "@/app/(landing)/components/ui/button";
import { FiPlus } from "react-icons/fi";

import { useEffect, useState } from "react";
import BankInfoList from "../../components/bank-info/bank-info-list";
import BankInfoModal from "../../components/bank-info/bank-info-modal";
import { Bank } from "@/app/types";
import { deleteBank, getBanks } from "@/app/services/bank.service";
import { toast } from "react-toastify";
import DeleteModal from "../../components/ui/modal-delete";

const BankManagement = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const [banks, setBanks] = useState<Bank[]>([]);
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
  const [deleteBankId, setDeleteBankId] = useState("");
  //terakhirjam 1:15
  const handleCloseModal = () => {
    setIsOpen(false);
    setSelectedBank(null);
  };

  const handleOpenEditModal = (bank: Bank) => {
    setIsOpen(true);
    setSelectedBank(bank);
  };

  const fetchingBankAgain = async () => {
    const data = await getBanks();
    setBanks(data);
  };

  const handleOpenModalDelete = (id:string) => {
    setDeleteBankId(id);
    setIsOpenModalDelete(true);
  }

  const handleCloseModalDelete = () => {
    setIsOpenModalDelete(false);
    setDeleteBankId("");
  }

  const handleConfirmModalDelete = async() => {
    try{
      await deleteBank(deleteBankId);
      handleCloseModalDelete();
      toast.success("Bank deleted successfully");
    }catch(error){
      console.error("Error while deleting bank (page.tsx ~ handleConfirmModalDelete) : ", error);
      toast.error("Error while deleting bank");
    }finally{
      fetchingBankAgain();
    }
  }

  useEffect(() => {
    try {
      const fetchingBank = async () => {
        const data = await getBanks();
        setBanks(data);
      };

      fetchingBank();
    } catch (error) {
      console.error(
        "Error while fetching bank data (page.tsx ~ useEffect): ",
        error,
      );
    }
  }, []);
  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="font-bolx text-2xl">Bank Information</h1>
          <p className="opacity-50">
            Manage destination accounts for customer transfers.
          </p>
        </div>
        <Button className="rounded-lg" onClick={() => setIsOpen(true)}>
          <FiPlus size={24} />
          Add Bank Account
        </Button>
      </div>
      <BankInfoList banks={banks} isOpenModalEdit={handleOpenEditModal} isOpenModalDelete={handleOpenModalDelete} />
      <BankInfoModal
        isOpen={isOpen}
        onClose={handleCloseModal}
        bank={selectedBank}
        onSuccess={fetchingBankAgain}
      />
      <DeleteModal isOpen={isOpenModalDelete} onClose={handleCloseModalDelete} onConfirm={handleConfirmModalDelete} title="Bank" />
    </div>
  );
};

export default BankManagement;
