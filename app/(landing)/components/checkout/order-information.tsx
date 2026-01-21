"use client"
import { useState } from "react";
import CardWithHeader from "../ui/card-with-header";
import { CustomerInfo } from "@/app/hooks/use-cart-store";

type TOrderInformationProps = {
  formData: CustomerInfo,
  setFormData: React.Dispatch<React.SetStateAction<CustomerInfo>>
}

const OrderInformation = ({formData, setFormData} : TOrderInformationProps) => {
  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(
      {...formData, [e.target.name] : e.target.value}
    )
  }

  return (
    <CardWithHeader title="Order Information">
      <div className="p-5">
        <div className="mb-5 input-group">
          <label htmlFor="customerName">Full Name</label>
          <input type="text" placeholder="Type Your Full Name" id="customerName" name="customerName" onChange={handleInputChange} value={formData.customerName}/>
        </div>
        <div className="mb-5 input-group">
          <label htmlFor="customerContact">Whatsapp Number</label>
          <input
            type="number"
            placeholder="+62 123 5434 2354"
            id="customerContact"
            name="customerContact"
            onChange={handleInputChange} value={formData.customerContact ?? ""}
          />
        </div>
        <div className="mb-5 input-group">
          <label htmlFor="customerAddress">Shipping Address</label>
          <textarea
            placeholder="Type Your Address"
            id="customerAddress"
            rows={7}
            name="customerAddress"
            onChange={handleInputChange} value={formData.customerAddress}
          />
        </div>
      </div>
    </CardWithHeader>
  );
};

export default OrderInformation;
