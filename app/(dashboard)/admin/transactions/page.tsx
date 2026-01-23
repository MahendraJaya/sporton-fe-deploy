"use client";
import Button from "@/app/(landing)/components/ui/button";
import { FiPlus } from "react-icons/fi";
import { useState } from "react";
import TransactionTable from "../../components/transactions/transaction-table";
import TransactionModal from "../../components/transactions/transaction-modal";

const TransactionManagement = () => {
  const [isOpen, setIsOpen] = useState(false);
  //terakhirjam 1:31
  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleOpenModal = () => {
    setIsOpen(true);
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="font-bolx text-2xl">Transaction</h1>
          <p className="opacity-50">
            Verify incoming payments and manage orders.
          </p>
        </div>
      </div>
      <TransactionTable onOpen={handleOpenModal} />
      <TransactionModal isOpen={isOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default TransactionManagement;
