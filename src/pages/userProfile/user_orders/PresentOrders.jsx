import { useEffect, useState } from "react";
import supabase from "../../../supabaseClient";
import Sidebar from "../Sidebar";
import Spinner from "../../../components/Spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../../../components/Footer";

function PresentOrders() {
  const [loading, setLoading] = useState(true);
  const [userOrders, setUserOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [collectedOrders, setCollectedOrders] = useState([]);
  const [openCancelOrderModal, setOpenCancelOrderModal] = useState(false);

  const presentOrderPerPage = 4;

  const openCancelOrder = () => {
    setOpenCancelOrderModal(true);
    console.log("Cancel Order modal opened");
  };

  useEffect(() => {
    const fetchUserOrders = async () => {
      const { data: user, error: userError } = await supabase.auth.getUser();
      if (userError || !user?.user) {
        console.error("User not logged in:", userError);
        return;
      }

      const userId = user.user.id;

      setLoading(true);

      try {
        const { data, error } = await supabase
          .from("orders")
          .select("*")
          .eq("user_id", userId);

        if (error) {
          console.error("Error fetching your present orders:", error.message);
        } else {
          const itemsWithQuantity = data.map((item) => ({
            ...item,
            quantity: 1,
          }));
          setUserOrders(itemsWithQuantity || []);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserOrders();
  }, []);

  const cancelOrder = async (id) => {
    const { data: user, error: userError } = await supabase.auth.getUser();
    if (userError || !user?.user) {
      console.error("User not logged in:", userError);
      return;
    }

    const userId = user.user.id;
    const userEmail = user.user.email;

    try {
      setLoading(true);

      // ✅ Fetch orders before deleting
      const { data: orderData, error: fetchError } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", userId)
        .eq("order_id", id)
        .single();

      if (fetchError || !orderData) {
        console.error("Error fetching order details:", fetchError?.message);
        toast.error("Error fetching order details!");
        return;
      }

      // ✅ Insert orders into canceled_orders table
      const { error: insertError } = await supabase
        .from("canceled_orders")
        .insert([
          {
            user_id: orderData.user_id,
            meal_name: orderData.meal_name,
            meal_img: orderData.meal_img,
            price: orderData.price,
            order_id: orderData.order_id,
            canceled_at: new Date(),
            email: userEmail,
          },
        ]);

      if (insertError) {
        console.error(
          "Error moving order to canceled_orders:",
          insertError.message
        );
        toast.error("Error canceling order!");
        return;
      }

      // ✅ Delete canceled order from orders table
      const { error: deleteError } = await supabase
        .from("orders")
        .delete()
        .eq("user_id", userId)
        .eq("order_id", id);

      if (deleteError) {
        console.error("Error deleting order:", deleteError.message);
        toast.error("Error canceling order!");
        return;
      }

      // ✅ Remove the canceled order from UI state
      setUserOrders((prevItems) =>
        prevItems.filter((item) => item.order_id !== id)
      );

      toast.success("Order has been canceled successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (err) {
      console.error("Unexpected error:", err);
      toast.error("An unexpected error occurred!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchCollectedOrders = async () => {
      const { data, error } = await supabase
        .from("collected_orders")
        .select("order_id");

      if (error) {
        console.error("Error fetching collected orders:", error.message);
        return;
      }

      setCollectedOrders(data.map((order) => order.order_id));
    };

    fetchCollectedOrders();
  }, []);

  const indexOfLastPresentOrder = currentPage * presentOrderPerPage;
  const indexOfFirstPresentOrder =
    indexOfLastPresentOrder - presentOrderPerPage;
  const currentPresentOrders = userOrders.slice(
    indexOfFirstPresentOrder,
    indexOfLastPresentOrder
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
            <p style={{ color: "black", fontSize: "26px" }}>
              Your Present Orders
            </p>

            {userOrders.length === 0 ? (
              <p
                style={{
                  fontSize: "22px",
                  color: "orangered",
                  textAlign: "center",
                  marginTop: "50px",
                }}
              >
                You do not have any past orders
              </p>
            ) : (
              <>
                <div className="pagination d-flex justify-content-center mt-2 mb-4">
                  {Array.from(
                    {
                      length: Math.ceil(
                        userOrders.length / presentOrderPerPage
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
                  {" "}
                  {currentPresentOrders.map((item) => (
                    <div key={item.id} className="item-container">
                      <ul
                        className="item-background-color"
                        style={{ listStyle: "none", margin: 0, padding: 0 }}
                      >
                        <li key={item.id} className="item-details">
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
                          <button
                            style={{
                              backgroundColor: collectedOrders.includes(
                                item.order_id
                              )
                                ? "green"
                                : "orangered",
                              border: "none",
                              outline: "none",
                              padding: "18px",
                              color: "white",
                              fontSize: "18px",
                            }}
                            type="button"
                            onClick={openCancelOrder}
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                            disabled={collectedOrders.includes(item.order_id)}
                          >
                            {collectedOrders.includes(item.order_id)
                              ? "Delivered"
                              : "Cancel Order"}
                          </button>
                        </li>
                      </ul>

                      {openCancelOrderModal && (
                        <div
                          className="modal fade"
                          id="exampleModal"
                          tabIndex="-1"
                          aria-labelledby="exampleModalLabel"
                          aria-hidden="true"
                        >
                          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                            <div className="modal-content">
                              <div className="modal-body">
                                <p
                                  style={{
                                    padding: "20px",
                                    fontSize: "19.3px",
                                  }}
                                >
                                  Do you want to delete your order?
                                </p>
                                <button
                                  type="button"
                                  style={{
                                    padding: "13px",
                                    width: "180px",
                                    height: "48px",
                                    border: "none",
                                    outline: "none",
                                  }}
                                  onClick={() => {
                                    if (
                                      !collectedOrders.includes(item.order_id)
                                    ) {
                                      cancelOrder(item.order_id);
                                    }
                                  }}
                                >
                                  Cancel Order
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
      {/* </div> */}
    </>
  );
}

export default PresentOrders;
