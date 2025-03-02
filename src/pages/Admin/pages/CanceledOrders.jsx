import { useEffect, useState } from "react";
import supabase from "../../../supabaseClient";
import Sidebar from "../components/Sidebar";
import Spinner from "../../../components/Spinner";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../../../components/Footer";
import { toast, ToastContainer } from "react-toastify";

function CanceledOrders() {
  const [loading, setLoading] = useState(true);
  const [canceledOrders, setCanceledOrders] = useState([]);
  const [sortFilter, setSortFilter] = useState("newest"); // Default filter

  useEffect(() => {
    const fetchCanceledOrders = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("canceled_orders")
          .select("*")
          .order("canceled_at", { ascending: false }); // Newest first

        if (error) {
          console.error("Error fetching canceled orders:", error.message);
        } else {
          setCanceledOrders(data || []);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCanceledOrders();
  }, []);

  // 🔹 Get current date
  const currentDate = new Date();

  // 🔹 Filtering orders based on `created_at`
  const filteredOrders = canceledOrders.filter((order) => {
    const orderDate = new Date(order.canceled_at);

    if (sortFilter === "7days") {
      const last7Days = new Date();
      last7Days.setDate(currentDate.getDate() - 7);
      return orderDate >= last7Days;
    }

    if (sortFilter === "1month") {
      const last1Month = new Date();
      last1Month.setMonth(currentDate.getMonth() - 1);
      return orderDate >= last1Month;
    }

    if (sortFilter === "1year") {
      const last1Year = new Date();
      last1Year.setFullYear(currentDate.getFullYear() - 1);
      return orderDate >= last1Year;
    }

    return true; // Default: Show all orders
  });

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => toast.success("Order ID copied!"))
      .catch(() => toast.error("Failed to copy Order ID"));
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <ToastContainer />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3" style={{ padding: "0px", margin: "0px" }}>
            <Sidebar />
          </div>
          <div className="col-md-9 mt-5">
            <div className="d-flex justify-content-between align-items-center">
              <p style={{ color: "black", fontSize: "26px" }}>
                Canceled Orders
              </p>
            </div>

            {/* Sorting Buttons */}
            <div className="sorts mb-5">
              <button
                type="button"
                className={`sort-btn ${
                  sortFilter === "newest" ? "active" : ""
                }`}
                onClick={() => setSortFilter("newest")}
              >
                Newest
              </button>
              <button
                type="button"
                className={`sort-btn ${sortFilter === "7days" ? "active" : ""}`}
                onClick={() => setSortFilter("7days")}
              >
                7 days
              </button>
              <button
                type="button"
                className={`sort-btn ${
                  sortFilter === "1month" ? "active" : ""
                }`}
                onClick={() => setSortFilter("1month")}
              >
                1 month
              </button>
              <button
                type="button"
                className={`sort-btn ${sortFilter === "1year" ? "active" : ""}`}
                onClick={() => setSortFilter("1year")}
              >
                1 year
              </button>
            </div>

            <div className="row mt-5" style={{ paddingRight: "40px" }}>
              {filteredOrders.map((item) => (
                <div key={item.order_id} className="item-container">
                  <ul
                    className="item-background-color"
                    style={{ listStyle: "none", margin: 0, padding: 0 }}
                  >
                    <li className="item-details">
                      <img
                        className="img-fluid item-img"
                        src={item.meal_img}
                        alt={item.meal_name}
                        width="100"
                      />
                      <div style={{ flex: 1 }}>
                        <p className="item-name">{item.meal_name}</p>
                        <p className="price">${item.price.toFixed(2)}</p>
                        <p className="created-at">
                          Canceled on:{" "}
                          {new Date(item.canceled_at).toLocaleString()}
                        </p>
                      </div>

                      <p
                        className="order-id"
                        style={{
                          cursor: "pointer",
                          color: "orangered",
                          textDecoration: "none",
                        }}
                        onClick={() => copyToClipboard(item.order_id)}
                      >
                        Copy canceled order ID
                      </p>

                      <span
                        style={{
                          fontSize: "22px",
                          color: "red",
                          fontWeight: "bold",
                        }}
                      >
                        ❌ Order Canceled
                      </span>
                    </li>
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default CanceledOrders;
