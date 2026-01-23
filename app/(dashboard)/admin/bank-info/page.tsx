 "use client"
 import Button from "@/app/(landing)/components/ui/button";
 import { FiPlus } from "react-icons/fi";

 import { useState } from "react";
import BankInfoList from "../../components/bank-info/bank-info-list";
import BankInfoModal from "../../components/bank-info/bank-info-modal";
 
 const BankManagement = () => {
     const [isOpen, setIsOpen] = useState(false);
     //terakhirjam 1:15
     const handleCloseModal = ()=>{
         setIsOpen(false);
     }
   return (
     <div>
       <div className="flex justify-between items-center mb-10">
         <div>
           <h1 className="font-bolx text-2xl">Bank Information</h1>
           <p className="opacity-50">Manage destination accounts for customer transfers.</p>
         </div>
         <Button className="rounded-lg" onClick={() => setIsOpen(true)}>
           <FiPlus size={24} />
           Add Bank Account
         </Button>
       </div>
       <BankInfoList />
       <BankInfoModal isOpen={isOpen} onClose={handleCloseModal} />
       {/* <CategoryTable />
       <CategoryModal isOpen={isOpen} onClose={handleCloseModal} /> */}
     </div>
   );
 };
 
 export default BankManagement;
 