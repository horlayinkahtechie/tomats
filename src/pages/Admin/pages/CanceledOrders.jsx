import { useEffect, useState } from "react";
import supabase from "../../../supabaseClient";
import Sidebar from "../components/Sidebar";
import Spinner from "../../../components/Spinner";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../../../components/Footer";
import { toast, ToastContainer } from "react-toastify";
import "./style.css";

function CanceledOrders() {
  const [loading, setLoading] = useState(true);
  const [canceledOrders, setCanceledOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const canceledOrdersPerPage = 4;

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

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => toast.success("Order ID copied!"))
      .catch(() => toast.error("Failed to copy Order ID"));
  };

  const indexOfLastCanceledOrder = currentPage * canceledOrdersPerPage;
  const indexOfFirstCanceledOrder =
    indexOfLastCanceledOrder - canceledOrdersPerPage;
  const currentCanceledOrders = canceledOrders.slice(
    indexOfFirstCanceledOrder,
    indexOfLastCanceledOrder
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="text-center">
        <Spinner />
      </div>
    );
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
            <div className="pagination d-flex justify-content-center mt-4 mb-4">
              {Array.from(
                {
                  length: Math.ceil(
                    canceledOrders.length / canceledOrdersPerPage
                  ),
                },
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

            <div className="row mt-5" style={{ paddingRight: "40px" }}>
              {currentCanceledOrders.map((item) => (
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
                        <p className="email">{item.email}</p>
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
