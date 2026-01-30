import { getImageUrl } from "@/app/lib/api";
import { Transaction } from "@/app/types";
// import { getAllProducts } from "@/app/services/product.service";
import priceFormatter from "@/app/utils/price-converter";
import Image from "next/image";
import {FiEye} from "react-icons/fi";

type TTransactionTableProps = {
  transactions: Transaction[];
  isOpenModalEdit: (transaction:Transaction) => void;
}

const TransactionTable = ({ transactions, isOpenModalEdit} : TTransactionTableProps) => {
  //   const products = await getAllProducts();
  // const transactions = [
  //   {
  //     _id: "1",
  //     date: "23/02/2026 19:32",
  //     customer: "John Doe",
  //     contact: "081274659260",
  //     total: 450000,
  //     status: "pending",
  //   },
  //   {
  //     _id: "2",
  //     date: "23/02/2026 19:32",
  //     customer: "John Doe",
  //     contact: "081274659260",
  //     total: 450000,
  //     status: "paid",
  //   },
  //   {
  //     _id: "3",
  //     date: "23/02/2026 19:32",
  //     customer: "John Doe",
  //     contact: "081274659260",
  //     total: 450000,
  //     status: "rejected",
  //   },
  // ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-600 border-yellow-200";
        break;
      case "paid":
        return "bg-green-100 text-green-600 border-green-200";
        break;
      case "rejected":
        return "bg-red-100 text-red-600 border-red-200";
        break;
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="px-6 py-4 font-semibold">Date</th>
            <th className="px-6 py-4 font-semibold">Customer</th>
            <th className="px-6 py-4 font-semibold">Contact</th>
            <th className="px-6 py-4 font-semibold">Total</th>
            <th className="px-6 py-4 font-semibold">Status</th>
            <th className="px-6 py-4 font-semibold">Action</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr
              key={transaction._id}
              className="border-b border-gray-200 font-semibold last:border-b-0"
            >
              <td className="px-6 py-4">{transaction.createdAt}</td>
              <td className="px-6 py-4">{transaction.customerName}</td>
              <td className="px-6 py-4">{transaction.customerContact}</td>
              <td className="px-6 py-4">{priceFormatter(Number(transaction.totalPayment))}</td>
              <td className="px-6 py-4">
                <div
                  className={`px-3 text-center text-sm py-1 rounded-full border w-fit ${getStatusColor(transaction.status)}`}
                >
                  {transaction.status.toUpperCase()}
                </div>
              </td>
              <td className="px-6 py-4 text-gray-600">
                <button onClick={() => {isOpenModalEdit(transaction)}} className="flex gap-2 hover:bg-gray-100 w-fit py-1 px-2 rounded-md items-center cursor-pointer">
                  <FiEye size={20}  />
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
