import { Bank } from "@/app/types";
import { FiCreditCard, FiEdit2, FiTrash2 } from "react-icons/fi";
import { Id } from "react-toastify";

// const bankData = [
//   {
//     bankName: "BCA",
//     accountNumber: "123123",
//     accountName: "PT SportOn Digital",
//   },
//   {
//     bankName: "Mandiri",
//     accountNumber: "123123",
//     accountName: "PT SportOn Digital",
//   },
//   {
//     bankName: "BNI",
//     accountNumber: "123123",
//     accountName: "PT SportOn Digital",
//   },
// ];
type TBankInfoListProps = {
  banks: Bank[];
  isOpenModalEdit: (bank: Bank) => void;
  isOpenModalDelete: (id:string) => void;
};
const BankInfoList = ({ banks, isOpenModalEdit, isOpenModalDelete }: TBankInfoListProps) => {
  return (
    <div className="grid grid-cols-3 gap-8 ">
      {banks.map((bank) => {
        return (
          <div
            key={bank._id}
            className="bg-white rounded-lg shadow-md border border-gray-200"
          >
            <div className="flex justify-between p-5">
              <div className="flex gap-2">
                <div className="bg-blue-50 text-blue-600 rounded-md w-12 h-12 flex justify-center items-center">
                  <FiCreditCard size={24} />
                </div>
                <div>
                  <div className="font-semibold">{bank.bankName}</div>
                  <div className="opacity-50 text-xs">Bank Transfer</div>
                </div>
              </div>
              <div className="flex gap-2 -mt-5 text-gray-600 ">
                <button
                  className="cursor-pointer"
                  onClick={() => {
                    isOpenModalEdit(bank);
                  }}
                >
                  <FiEdit2 size={20} />
                </button>
                <button className="ml-3 cursor-pointer"
                onClick={() => isOpenModalDelete(bank._id)}>
                  <FiTrash2 size={20} />
                </button>
              </div>
            </div>
            <div className="p-5 font-medium">
              <div className="text-xs opacity-50">ACCOUNT NUMBER </div>
              <div>{bank.accountNumber}</div>
            </div>
            <div className="border-t border-gray-200 px-5 py-3 text-xs">
              <span className="opacity-50">Holder :</span> {bank.accountName}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BankInfoList;
