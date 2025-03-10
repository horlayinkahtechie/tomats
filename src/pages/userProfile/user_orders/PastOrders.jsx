import Sidebar from "../Sidebar";
import Footer from "../../../components/Footer";
import supabase from "../../../supabaseClient";
import { useEffect, useState } from "react";
import Spinner from "../../../components/Spinner";
import { toast, ToastContainer } from "react-toastify";

function PastOrders() {
  const [loading, setLoading] = useState(true);
  const [userPastOrders, setUserPastOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const pastOrderPerPage = 4;

  useEffect(() => {
    const fetchUserPastOrders = async () => {
      const { data: user, error: userError } = await supabase.auth.getUser();
      if (userError || !user?.user) {
        console.error("User not logged in:", userError);
        return;
      }

      const userId = user.user.id;

      setLoading(true);

      try {
        const { data, error } = await supabase
          .from("collected_orders")
          .select("*")
          .eq("user_id", userId);

        if (error) {
          console.error("Error fetching your past orders:", error.message);
        } else {
          const itemsWithQuantity = data.map((item) => ({
            ...item,
            quantity: 1,
          }));
          setUserPastOrders(itemsWithQuantity || []);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserPastOrders();
  }, []);

  const indexOfLastPastOrder = currentPage * pastOrderPerPage;
  const indexOfFirstPresentOrder = indexOfLastPastOrder - pastOrderPerPage;
  const currentPastOrders = userPastOrders.slice(
    indexOfFirstPresentOrder,
    indexOfLastPastOrder
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
      <div className=" container-fluid">
        <div className="row">
          <div className="col-md-3" style={{ padding: "0px", margin: "0px" }}>
            <Sidebar />
          </div>
          <div className="col-md-9 mt-5">
            <p style={{ color: "black", fontSize: "26px" }}>Your Past Orders</p>

            {userPastOrders.length === 0 ? (
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
                        userPastOrders.length / pastOrderPerPage
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
                  {currentPastOrders.map((item) => (
                    <div key={item.id} className="item-container">
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
                          </div>

                          <p
                            className="order-id"
                            style={{ cursor: "pointer", color: "orangered" }}
                            onClick={() => copyToClipboard(item.order_id)}
                          >
                            Copy order ID
                          </p>
                        </li>
                      </ul>
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

export default PastOrders;
