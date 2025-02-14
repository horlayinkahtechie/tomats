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

    try {
      setLoading(true);

      // ✅ Delete order from the database
      const { error } = await supabase
        .from("orders")
        .delete()
        .match({ user_id: userId, order_id: id });

      if (error) {
        console.error("Error canceling order:", error.message);
        toast.error("Error canceling order", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        // ✅ Remove the canceled order from UI state
        setUserOrders((prevItems) =>
          prevItems.filter((item) => item.order_id !== id)
        );

        toast.success("Order has been canceled successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    } finally {
      setLoading(false);
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
          <div className="col-md-3" style={{ padding: "0px", margin: "0px" }}>
            <Sidebar />
          </div>
          <div className="col-md-9 mt-5">
            <p style={{ color: "black", fontSize: "26px" }}>
              Your Present Orders
            </p>
            <div className="row mt-5" style={{ paddingRight: "40px" }}>
              {" "}
              {userOrders.map((item) => (
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
                        <p className="item-name">{item.meal_name}</p>
                        <p className="price">${item.price.toFixed(2)}</p>
                      </div>
                      <button
                        style={{
                          backgroundColor: "orangered",
                          border: "none",
                          outline: "none",
                          padding: "18px",
                          color: "white",
                          fontSize: "18px",
                        }}
                        type="button"
                        onClick={() => cancelOrder(item.order_id)}
                      >
                        Cancel order
                      </button>
                    </li>
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
      {/* </div> */}
    </>
  );
}

export default PresentOrders;
