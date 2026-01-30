"use client";
import Button from "@/app/(landing)/components/ui/button";
import { FiPlus } from "react-icons/fi";
import { useEffect, useState } from "react";
import TransactionTable from "../../components/transactions/transaction-table";
import TransactionModal from "../../components/transactions/transaction-modal";
import { Transaction } from "@/app/types";
import { getTransactions, updateTransaction } from "@/app/services/transaction.service";
import { toast } from "react-toastify";

const TransactionManagement = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [editTransaction, setEditTransaction] = useState<Transaction | null>(
    null,
  );
  //terakhirjam 1:31
  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const fetchTransactionAgain = async () => {
    try {
      const res = await getTransactions();
      setTransactions(res);
    } catch (error) {
      console.error(
        "Error while fetching transaction (page.tsx ~ fetchTransaction) : ",
        error,
      );
    }
  };

  const handleStatusChange = async (
    id: string,
    status: "paid" | "rejected",
  ) => {
    try {
      const formData = new FormData();
      formData.append("status", status);
      await updateTransaction(id, formData);

      toast.success("Transaction status updated");

      await fetchTransactionAgain();
    } catch (error) {
      console.error("Failed to update transaction status", error);
      toast.error("Failed to update transaction status");
    } finally {
      setIsOpen(false);
    }
  };

  const handleOpenModalEdit = (transaction: Transaction) => {
    setEditTransaction(transaction);
    setIsOpen(true);
  };

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const res = await getTransactions();
        setTransactions(res);
      } catch (error) {
        console.error(
          "Error while fetching transaction (page.tsx ~ fetchTransaction) : ",
          error,
        );
      }
    };
    fetchTransaction();
  }, []);

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
      <TransactionTable
        transactions={transactions}
        isOpenModalEdit={handleOpenModalEdit}
      />
      <TransactionModal
        isOpen={isOpen}
        onClose={handleCloseModal}
        transaction={editTransaction}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
};

export default TransactionManagement;
