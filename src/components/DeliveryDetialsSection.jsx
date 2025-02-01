import { useState } from "react";
import supabase from "../supabaseClient";

const DeliveryDetailsSection = ({ title, buttonText }) => {
  const [selectDeliveryDetails, setSelectDeliveryDetails] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const insertDeliveryDetails = async (e) => {
    e.preventDefault();
    if (!selectDeliveryDetails) {
      setMessage("Please select a delivery option.");
      return;
    }
    setLoading(true);
    const { data: user, error: userError } = await supabase.auth.getUser();
    if (userError || !user?.user) {
      console.error("No user logged in:", userError);
      return;
    }

    try {
      const { error } = await supabase.from("delivery_options").insert([
        {
          delivery_options: selectDeliveryDetails,
          email: user.user.email,
          user_id: user.user.id,
        },
      ]);

      if (error) throw error;

      setMessage("Delivery options updated successfully!");
    } catch (err) {
      setMessage(`Error updating address: ${err?.message || "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section">
      <h2 style={{ fontWeight: "500" }}>{title}</h2>

      <div className="container-fluid">
        <div className="row mt-4">
          <div className="col-md-12">
            <label style={{ cursor: "pointer" }}>
              <input
                type="radio"
                name="delivery"
                value="Home Delivery"
                onChange={(e) => setSelectDeliveryDetails(e.target.value)}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                fill="currentColor"
                className="bi bi-house-door"
                viewBox="0 0 16 16"
                style={{ color: "orangered", marginLeft: "8px" }}
              >
                <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4z" />
              </svg>{" "}
              Home Delivery
            </label>
          </div>

          <div className="col-md-12 mt-4">
            <label style={{ cursor: "pointer" }}>
              <input
                type="radio"
                name="delivery"
                value="Pickup Station"
                onChange={(e) => setSelectDeliveryDetails(e.target.value)}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                fill="currentColor"
                className="bi bi-buildings"
                viewBox="0 0 16 16"
                style={{ color: "orangered", marginLeft: "8px" }}
              >
                <path d="M14.763.075A.5.5 0 0 1 15 .5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V14h-1v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V10a.5.5 0 0 1 .342-.474L6 7.64V4.5a.5.5 0 0 1 .276-.447l8-4a.5.5 0 0 1 .487.022M6 8.694 1 10.36V15h5zM7 15h2v-1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V15h2V1.309l-7 3.5z" />
                <path d="M2 11h1v1H2zm2 0h1v1H4zm-2 2h1v1H2zm2 0h1v1H4zm4-4h1v1H8zm2 0h1v1h-1zm-2 2h1v1H8zm2 0h1v1h-1zm2-2h1v1h-1zm0 2h1v1h-1zM8 7h1v1H8zm2 0h1v1h-1zm2 0h1v1h-1zM8 5h1v1H8zm2 0h1v1h-1zm2 0h1v1h-1zm0-2h1v1h-1z" />
              </svg>{" "}
              Pickup Station
            </label>
          </div>
        </div>

        {message && (
          <p style={{ color: message.includes("Error") ? "red" : "green" }}>
            {message}
          </p>
        )}

        <button
          className="change-btn"
          onClick={insertDeliveryDetails}
          disabled={loading}
        >
          {loading ? "Saving..." : buttonText}
        </button>
      </div>
    </div>
  );
};

export default DeliveryDetailsSection;
