import CardWithHeader from "../ui/card-with-header";

const OrderInformation = () => {
  return (
    <CardWithHeader title="Order Information">
      <div className="p-5">
        <div className="mb-5 input-group">
          <label htmlFor="full-name">Full Name</label>
          <input type="text" placeholder="Type Your Full Name" id="full-name" />
        </div>
        <div className="mb-5 input-group">
          <label htmlFor="whatsapp-number">Whatsapp Number</label>
          <input
            type="text"
            placeholder="+62 123 5434 2354"
            id="whatsapp-number"
          />
        </div>
        <div className="mb-5 input-group">
          <label htmlFor="ship_address">Shipping Address</label>
          <textarea
            placeholder="Type Your Address"
            id="ship_address"
            rows={7}
          />
        </div>
      </div>
    </CardWithHeader>
  );
};

export default OrderInformation;
