import { useEffect, useState } from "react";
import supabase from "../../../supabaseClient";
import Sidebar from "../components/Sidebar";
import Spinner from "../../../components/Spinner";
import Footer from "../../../components/Footer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CanceledOrders() {
  const [loading, setLoading] = useState(true);
  const [canceledOrders, setCanceledOrders] = useState([]);

  useEffect(() => {
    const fetchCanceledOrders = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("canceled_orders")
          .select("*");
        if (error) {
          console.error("Error fetching canceled orders:", error.message);
          toast.error("Failed to fetch canceled orders");
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

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Order ID copied!");
    } catch {
      toast.error("Failed to copy Order ID");
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <ToastContainer />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 p-0 m-0">
            <Sidebar />
          </div>
          <div className="col-md-9 mt-5">
            <div className="d-flex justify-content-center">
              <p className="fs-4 fw-bold text-dark">Canceled Orders</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                className="bi bi-funnel ms-auto"
                viewBox="0 0 16 16"
              >
                <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2z" />
              </svg>
            </div>

            <div className="row mt-4 pe-4">
              {canceledOrders.length > 0 ? (
                canceledOrders.map((item) => (
                  <div key={item.order_id} className="item-container">
                    <ul className="item-background-color list-unstyled p-0 m-0">
                      <li className="item-details d-flex align-items-center gap-3">
                        <img
                          className="img-fluid item-img"
                          src={item.meal_img}
                          alt={item.meal_name}
                          width="100"
                        />
                        <div className="flex-grow-1">
                          <p className="item-name mb-1">{item.meal_name}</p>
                          <p className="price text-success fw-bold">
                            ${item.price.toFixed(2)}
                          </p>
                        </div>

                        <p
                          className="order-id text-danger fw-bold"
                          style={{ cursor: "pointer" }}
                          onClick={() => copyToClipboard(item.order_id)}
                        >
                          Copy Order ID
                        </p>

                        <span className="fs-5 fw-bold text-danger">
                          ❌ Order Canceled
                        </span>
                      </li>
                    </ul>
                  </div>
                ))
              ) : (
                <p className="text-center text-muted">
                  No canceled orders found.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
