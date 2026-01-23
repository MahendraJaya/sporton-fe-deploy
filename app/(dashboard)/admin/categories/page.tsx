 "use client"
 import Button from "@/app/(landing)/components/ui/button";
 import { FiPlus } from "react-icons/fi";

 import { useState } from "react";
import CategoryTable from "../../components/category/category-table";
import CategoryModal from "../../components/category/category-modal";
 
 const CategoryManagement = () => {
     const [isOpen, setIsOpen] = useState(false);
     //terakhirjam 1:15
     const handleCloseModal = ()=>{
         setIsOpen(false);
     }
   return (
     <div>
       <div className="flex justify-between items-center mb-10">
         <div>
           <h1 className="font-bolx text-2xl">Category Management</h1>
           <p className="opacity-50">Organize your product into categories.</p>
         </div>
         <Button className="rounded-lg" onClick={() => setIsOpen(true)}>
           <FiPlus size={24} />
           Add Category{" "}
         </Button>
       </div>
       <CategoryTable />
       <CategoryModal isOpen={isOpen} onClose={handleCloseModal} />
     </div>
   );
 };
 
 export default CategoryManagement;
 