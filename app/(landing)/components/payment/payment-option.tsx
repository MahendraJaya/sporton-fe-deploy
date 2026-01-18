import { FiCreditCard } from "react-icons/fi";
import CardWithHeader from "../ui/card-with-header";

const paymentList = [
  {
    bank_name: "bca",
    acc_num: 126536489,
    acc_holder: "PT SportOn Digital",
  },
  {
    bank_name: "mandiri",
    acc_num: 126536489,
    acc_holder: "PT SportOn Digital",
  },
  {
    bank_name: "bni",
    acc_num: 126536489,
    acc_holder: "PT SportOn Digital",
  },
];

const PaymentOption = () => {
  return (
    <CardWithHeader title="Payment Option">
      {paymentList.map((item, index) => {
        return (
          <div key={index}>
            <div className="flex gap-5 p-5 border-b border-gray-100">
              <div className="bg-blue-100 p-4 text-blue-500 self-center">
                <FiCreditCard size={24} />
              </div>
              <div className="self-center">
                <div className="font-bold">{item.bank_name}</div>
                <div className="text-sm">{item.acc_num}</div>
                <div className="text-sm opacity-70">{item.acc_holder}</div>
              </div>
              <div className="ml-auto bg-blue-50 text-gray-800 tex-xs h-fit self-center px-2 py-1">
                Bank Transfer
              </div>    
            </div>
          </div>
        );
      })}
    </CardWithHeader>
  );
};

export default PaymentOption;
