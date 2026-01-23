import { FiCreditCard, FiEdit2, FiTrash2 } from "react-icons/fi";

const bankData = [
  {
    bankName: "BCA",
    accountNumber: "123123",
    accountName: "PT SportOn Digital",
  },
  {
    bankName: "Mandiri",
    accountNumber: "123123",
    accountName: "PT SportOn Digital",
  },
  {
    bankName: "BNI",
    accountNumber: "123123",
    accountName: "PT SportOn Digital",
  },
];

const BankInfoList = () => {
  return (
    <div className="grid grid-cols-3 gap-8 ">
      {bankData.map((bank, index) => {
        return (
          <div
            key={index}
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
                <button className="cursor-pointer">
                  <FiEdit2 size={20} />
                </button>
                <button className="ml-3 cursor-pointer">
                  <FiTrash2 size={20} />
                </button>
              </div>
            </div>
            <div className="p-5 font-medium">
              <div className="text-xs opacity-50">ACCOUNT NUMBER </div>
              <div>{bank.accountNumber}</div>
            </div>
            <div className="border-t border-gray-200 px-5 py-3 text-xs">
              <span className="opacity-50">Holder :</span> PT SportsOn Digital
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BankInfoList;
