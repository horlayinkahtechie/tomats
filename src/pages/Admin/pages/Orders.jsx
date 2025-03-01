import { useEffect, useState } from "react";
import supabase from "../../../supabaseClient";
import Sidebar from "../components/Sidebar";
import Spinner from "../../../components/Spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../../../components/Footer";

function Orders() {
  const [loading, setLoading] = useState(true);
  const [userOrders, setUserOrders] = useState([]);
  const [deliveredOrders, setDeliveredOrders] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [viewOrderDetails, setViewOrderDetails] = useState(false);

  const ordersPerPage = 4;

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const { data: orders, error: ordersError } = await supabase
          .from("orders")
          .select("*");
        if (ordersError) {
          console.error("Error fetching orders:", ordersError.message);
        } else {
          setUserOrders(orders || []);
        }

        const { data: deliveredData, error: deliveredError } = await supabase
          .from("collected_orders")
          .select("order_id");

        if (deliveredError) {
          console.error(
            "Error fetching delivered orders:",
            deliveredError.message
          );
        } else {
          const deliveredSet = new Set(
            deliveredData.map((order) => order.order_id)
          );
          setDeliveredOrders(deliveredSet);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const markItemAsDelivered = async (order) => {
    if (deliveredOrders.has(order.order_id)) {
      toast.info("Order is already marked as delivered!");
      return;
    }

    setLoading(true);

    try {
      const { error: insertError } = await supabase
        .from("collected_orders")
        .insert([
          {
            user_id: order.user_id,
            meal_name: order.meal_name,
            meal_img: order.meal_img,
            price: order.price,
            order_id: order.order_id,
            collected_at: new Date(),
            email: order.email,
          },
        ]);

      if (insertError) {
        console.error("Error adding to collected_orders:", insertError.message);
        toast.error("Failed to mark as delivered!");
        return;
      }

      setDeliveredOrders(
        (prevDelivered) => new Set([...prevDelivered, order.order_id])
      );
      toast.success("Order marked as delivered!");
    } catch (err) {
      console.error("Unexpected error:", err);
      toast.error("An error occurred!");
    } finally {
      setLoading(false);
    }
  };

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

  const orderDetails = () => {
    setViewOrderDetails(true);
    console.log("Order details");
  };

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = userOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
          <div className="col-md-9 mt-5 mb-5">
            <div className="row mt-2" style={{ paddingRight: "40px" }}>
              {currentOrders.map((item) => (
                <div key={item.order_id} className="item-container">
                  <ul
                    className="item-background-color p-0 m-0"
                    onClick={() => orderDetails()}
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    style={{ listStyle: "none" }}
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
                      </div>

                      <p
                        className="order-id"
                        style={{ cursor: "pointer", color: "orangered" }}
                        onClick={() => copyToClipboard(item.order_id)}
                      >
                        Copy order ID
                      </p>
                      {deliveredOrders.has(item.order_id) ? (
                        <span
                          style={{
                            fontSize: "22px",
                            color: "green",
                            fontWeight: "bold",
                          }}
                        >
                          ✅ Delivered
                        </span>
                      ) : (
                        <button
                          style={{
                            backgroundColor: "orangered",
                            padding: "10px",
                            color: "white",
                          }}
                          onClick={() => markItemAsDelivered(item)}
                        >
                          Mark as delivered
                        </button>
                      )}
                    </li>
                  </ul>
                </div>
              ))}
            </div>

            <div className="pagination d-flex justify-content-center mt-4">
              {Array.from(
                { length: Math.ceil(userOrders.length / ordersPerPage) },
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

            {viewOrderDetails && (
              <div
                className="modal fade"
                id="exampleModal"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                  <div className="modal-content">
                    <div className="modal-header">
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <p>This is the Order details</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Orders;
