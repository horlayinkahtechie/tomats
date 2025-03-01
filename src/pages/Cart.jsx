import { useEffect, useState } from "react";
import supabase from "../supabaseClient";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import Footer from "../components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotalPrice(total);
  }, [cartItems]);

  useEffect(() => {
    const fetchCartItems = async () => {
      const { data: userData, error: userError } =
        await supabase.auth.getUser();
      if (userError || !userData?.user) {
        setCartItems([]);
        return;
      }

      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("cart")
          .select("*")
          .eq("user_id", userData.user.id);

        if (error) {
          console.error("Error fetching cart items:", error.message);
        } else {
          const itemsWithQuantity = data.map((item) => ({
            ...item,
            quantity: 1,
          }));
          setCartItems(itemsWithQuantity || []);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const updateQuantity = (id, change) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(1, item.quantity + change), // Ensure quantity doesn't go below 1
            }
          : item
      )
    );
  };

  const addItemQuantityToItemDetails = async () => {
    const { data: user, error: userError } = await supabase.auth.getUser();
    if (userError || !user?.user) {
      console.error("No user logged in:", userError);
      return;
    }

    try {
      const itemsToInsert = cartItems.map((item) => ({
        item_quantity: item.quantity, // Individual quantity per item
        user_id: user.user.id,
        email: user.user.email,
        username: user.user.user_metadata?.username || "Unknown",
        price: item.price * item.quantity, // Total price per item
        meal_img: item.meal_img,
        meal_name: item.meal_name,
      }));

      const { error } = await supabase
        .from("item_details")
        .insert(itemsToInsert);

      if (error) {
        console.error("Error adding to item details:", error.message);
      } else {
        console.log("Items added successfully");
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  const removeItem = async (id) => {
    try {
      setLoading(true);

      // Fetch the meal_name of the item to delete
      const { data: cartItem, error: fetchError } = await supabase
        .from("cart")
        .select("meal_name")
        .eq("id", id)
        .single();

      if (fetchError || !cartItem) {
        console.error("Error fetching cart item:", fetchError?.message);
        toast.error("Error fetching item details");
        return;
      }

      // Delete related records in item_details
      const { error: itemDetailsError } = await supabase
        .from("item_details")
        .delete()
        .eq("meal_name", cartItem.meal_name);

      if (itemDetailsError) {
        console.error("Error deleting item details:", itemDetailsError.message);
        toast.error("Error deleting item details");
        return;
      }

      // Now, delete from cart
      const { error: cartError } = await supabase
        .from("cart")
        .delete()
        .eq("id", id);

      if (cartError) {
        console.error("Error deleting item from cart:", cartError.message);
        toast.error("Error deleting item", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));

        toast.success("Item removed successfully", {
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
    return (
      <div className="container text-center">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <ToastContainer />
      <div
        className="container-fluid"
        style={{ width: "100vw", height: "100vh" }}
      >
        {cartItems.length === 0 ? (
          <div
            style={{
              marginTop: "80px",
              marginBottom: "80px",
              textAlign: "center",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-file-earmark-excel"
              viewBox="0 0 16 16"
              style={{
                width: "200px",
                height: "200px",
                color: "red",
                marginBottom: "30px",
              }}
            >
              <path d="M5.884 6.68a.5.5 0 1 0-.768.64L7.349 10l-2.233 2.68a.5.5 0 0 0 .768.64L8 10.781l2.116 2.54a.5.5 0 0 0 .768-.641L8.651 10l2.233-2.68a.5.5 0 0 0-.768-.64L8 9.219l-2.116-2.54z" />
              <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2M9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z" />
            </svg>
            <p
              style={{
                color: "red",
                fontSize: "25px",
              }}
            >
              Your cart is empty.
            </p>
          </div>
        ) : (
          <div
            className=""
            style={{
              paddingLeft: "130px",
              paddingRight: "130px",
              paddingBottom: "90px",
            }}
          >
            <h1
              style={{
                color: "red",
                // paddingLeft: "130px",
                paddingRight: "130px",
                paddingTop: "50px",
                paddingBottom: "50px",
              }}
            >
              Your Cart ({cartItems.length})
            </h1>
            <div className="row">
              <div className="col-md-8">
                {cartItems.map((item) => (
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
                          <p className="price">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                          <p className="item-availability">In stock</p>
                        </div>
                      </li>

                      <div
                        style={{
                          display: "flex",
                          gap: "40px",
                          marginTop: "20px",
                          alignItems: "center",
                        }}
                      >
                        <button
                          type="button"
                          className="item-remove"
                          onClick={() => removeItem(item.id)}
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
                          </svg>{" "}
                          Remove
                        </button>
                        <button
                          className="button-remove"
                          onClick={() => updateQuantity(item.id, -1)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            fill="currentColor"
                            className="bi bi-dash-lg"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fillRule="evenodd"
                              d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8"
                            />
                          </svg>
                        </button>
                        <p
                          className="no-of-item"
                          style={{ fontWeight: "bold" }}
                        >
                          {item.quantity}
                        </p>
                        <button
                          className="button-add"
                          onClick={() => updateQuantity(item.id, 1)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            fill="currentColor"
                            className="bi bi-plus-lg"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fillRule="evenodd"
                              d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"
                            />
                          </svg>
                        </button>
                      </div>
                    </ul>
                  </div>
                ))}
              </div>
              <div className="col-md-4">
                <div
                  className="item-container"
                  style={{
                    backgroundColor: "white",
                    borderRadius: "10px",
                    padding: "20px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <h1
                    style={{
                      color: "red",
                      fontSize: "19px",
                    }}
                    className="text-start"
                  >
                    CART SUMMARY
                  </h1>
                  <hr style={{ color: "black" }} />
                  <ul className="item-background-color">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <li
                        className="cart-details text-dark"
                        style={{ fontSize: "18px", fontWeight: 400 }}
                      >
                        Subtotal
                      </li>
                      <li
                        className="cart-details text-dark"
                        style={{ fontSize: "19px", fontWeight: 500 }}
                      >
                        ${totalPrice.toFixed(2)}
                      </li>
                    </div>

                    <div className="mt-5">
                      <Link
                        onClick={addItemQuantityToItemDetails}
                        to="/checkout/payment"
                        className="button-checkout text-center"
                      >
                        Checkout
                      </Link>
                    </div>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
        <Footer />
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Cart;
