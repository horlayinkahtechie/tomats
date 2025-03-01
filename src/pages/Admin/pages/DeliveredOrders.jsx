import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import supabase from "../../../supabaseClient";
import Spinner from "../../../components/Spinner";
import Footer from "../../../components/Footer";
import { toast, ToastContainer } from "react-toastify";

export default function DeliveredOrders() {
  const [deliveredOrders, setDeliveredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 4;

  useEffect(() => {
    const fetchDeliveredOrders = async () => {
      setLoading(true);

      try {
        // Fetch all collected orders
        const { data: orders, error: ordersError } = await supabase
          .from("collected_orders")
          .select("*");

        if (ordersError) {
          console.error(
            "Error fetching delivered orders:",
            ordersError.message
          );
        } else {
          setDeliveredOrders(orders || []);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDeliveredOrders();
  }, []);

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success("Order ID copied!");
      })
      .catch(() => {
        toast.error("Failed to copy Order ID");
      });
  };

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentDeliveredOrders = deliveredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
          <div className="col-md-9 mt-5 mb-5">
            {currentDeliveredOrders.map((item) => (
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
                      Copy delivered order ID
                    </p>

                    {deliveredOrders.some(
                      (order) => order.order_id === item.order_id
                    ) && (
                      <span
                        style={{
                          fontSize: "22px",
                          color: "green",
                          fontWeight: "bold",
                          outline: "none",
                          border: "none",
                        }}
                      >
                        ✅ Delivered
                      </span>
                    )}
                  </li>
                </ul>
              </div>
            ))}
          </div>
          <div className="pagination d-flex justify-content-center mt-4">
            {Array.from(
              { length: Math.ceil(deliveredOrders.length / ordersPerPage) },
              (_, index) => (
                <button
                  key={index}
                  className={`mx-1 btn ${
                    currentPage === index + 1
                      ? "btn-light text-primary"
                      : "btn-primary"
                  }`}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </button>
              )
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
