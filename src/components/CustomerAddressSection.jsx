import { useState } from "react";

const CustomerAddressSection = ({ title, buttonText }) => {
  const [customersAddress, setCustomersAddress] = useState("");
  const [customersPhoneNo, setCustomersPhoneNo] = useState("");

  const handleCustomerDetails = (e) => {
    e.preventDefault();
    console.log("Form submitted");
    setCustomersAddress("Delivery address updated");
    setCustomersPhoneNo("Phone no address updated");
  };

  return (
    <div className="section">
      <h2 style={{ fontWeight: "500" }}>{title}</h2>

      <div className="container-fluid">
        <div className="row mt-4">
          <form action="">
            <div className="col-md-12">
              <input
                className="form-control form-control-md"
                type="text"
                value={customersAddress}
                onChange={(e) => setCustomersAddress(e.target.value)}
                placeholder="Input your address"
              />
            </div>

            <div className="col-md-12 mt-4">
              <input
                className="form-control form-control-md"
                type="text"
                value={customersPhoneNo}
                onChange={(e) => setCustomersPhoneNo(e.target.value)}
                placeholder="Input your phone no"
              />
            </div>
          </form>
        </div>
        <button className="change-btn" onClick={handleCustomerDetails}>
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default CustomerAddressSection;
