import { useEffect, useState } from "react";
import supabase from "../supabaseClient";

const CustomerAddressSection = ({ title }) => {
  const [customersAddress, setCustomersAddress] = useState("");
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [customersPhoneNo, setCustomersPhoneNo] = useState("");
  const [fetchedData, setFetchedData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Fetch customer addresses on component mount
  useEffect(() => {
    const fetchCustomerAddresses = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("address_details")
          .select("*");

        if (error) {
          console.error("Error fetching your addresses:", error.message);
        } else {
          setFetchedData(data);
          console.log("Successfully fetched user addresses");
        }
      } catch (err) {
        console.error("Unexpected error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerAddresses();
  }, []);

  const insertCustomersAddress = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { error } = await supabase.from("address_details").insert([
        {
          address: customersAddress,
          phone_no: customersPhoneNo,
        },
      ]);

      if (error) {
        console.error("Error updating address:", error.message);
      } else {
        setMessage("Address updated");
        console.log("Address and phone no updated successfully!");
        // Refresh data
        setFetchedData((prevData) => [
          ...prevData,
          { address: customersAddress, phone_no: customersPhoneNo },
        ]);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteAddress = async (id) => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from("address_details")
        .delete()
        .eq("id", id);

      if (error) {
        console.error("Error deleting item:", error.message);
      } else {
        console.log(`Address with id ${id} removed from address_details table`);
        setFetchedData((prevData) => prevData.filter((item) => item.id !== id));
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section">
      <div style={{ display: "flex", gap: "50px" }}>
        <div style={{ display: "block" }}>
          <h2 style={{ fontWeight: "500" }}>{title}</h2>
          <div className="mt-5">
            {loading ? (
              <p>Loading...</p>
            ) : (
              fetchedData.map((item, index) => (
                <div
                  key={item.id}
                  style={{
                    marginBottom: "10px",
                    padding: "10px",
                    borderRadius: "5px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  {/* Radio Button */}
                  <input
                    type="radio"
                    name="selectedAddress"
                    value={item.id}
                    onChange={() => setSelectedAddress(item)}
                    checked={selectedAddress?.id === item.id}
                  />

                  <div
                    style={{
                      border: "1px solid black",
                      borderRadius: "5px",
                      padding: "15px",
                      paddingLeft: "35px",
                      paddingRight: "35px",
                    }}
                  >
                    <h4 style={{ fontSize: "19px" }}>
                      <strong>Address {index + 1}:</strong> {item.address}
                    </h4>

                    <h4 style={{ fontSize: "19px" }}>
                      <strong>Phone No {index + 1}:</strong> {item.phone_no}
                    </h4>
                  </div>
                  <button
                    onClick={() => deleteAddress(item.id)}
                    className="item-remove"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-trash3"
                      viewBox="0 0 16 16"
                    >
                      <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                    </svg>
                  </button>
                </div>
              ))
            )}

            {/* Display Selected Address */}
            {selectedAddress && (
              <div
                style={{
                  marginTop: "20px",
                  padding: "10px",
                  border: "1px solid green",
                  borderRadius: "5px",
                  backgroundColor: "#f0fff0",
                }}
              >
                <h4 style={{ fontSize: "19px", color: "green" }}>
                  <strong>Selected Address:</strong> {selectedAddress.address}
                </h4>
                <h4 style={{ fontSize: "19px", color: "green" }}>
                  <strong>Phone No:</strong> {selectedAddress.phone_no}
                </h4>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={toggleModal}
          type="button"
          style={{
            border: "none",
            outline: "none",
            padding: "20px",
            backgroundColor: "white",
            marginTop: "-20px",
            textDecoration: "underline",
            color: "red",
          }}
        >
          Change address
        </button>
      </div>

      <div className="container-fluid">
        {message && <p style={{ color: "green" }}>{message}</p>}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              maxWidth: "500px",
              width: "90%",
              boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
            }}
          >
            <h3>Change Address</h3>
            <form>
              <div className="form-group">
                <label htmlFor="newAddress">New Address</label>
                <input
                  type="text"
                  id="newAddress"
                  className="form-control"
                  value={customersAddress}
                  onChange={(e) => setCustomersAddress(e.target.value)}
                />
              </div>
              <div className="form-group mt-3">
                <label htmlFor="newPhoneNo">Phone Number</label>
                <input
                  type="text"
                  id="newPhoneNo"
                  className="form-control"
                  value={customersPhoneNo}
                  onChange={(e) => setCustomersPhoneNo(e.target.value)}
                />
              </div>
              <div className="d-flex justify-content-end mt-3">
                <button
                  type="button"
                  onClick={toggleModal}
                  style={{
                    marginRight: "10px",
                    backgroundColor: "gray",
                    border: "none",
                    color: "white",
                    padding: "10px 20px",
                    borderRadius: "5px",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={insertCustomersAddress}
                  style={{
                    backgroundColor: "green",
                    border: "none",
                    color: "white",
                    padding: "10px 20px",
                    borderRadius: "5px",
                  }}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerAddressSection;
