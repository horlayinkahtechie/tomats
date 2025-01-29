import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // Calculate total price whenever cartItems change
    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotalPrice(total);
  }, [cartItems]);

  useEffect(() => {
    const fetchCartItems = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase.from("cart").select("*");
        if (error) {
          console.error("Error fetching cart items:", error.message);
        } else {
          // Initialize quantity for each item
          const itemsWithQuantity = data.map((item) => ({
            ...item,
            quantity: 1, // Default quantity
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

  const removeItem = async (id) => {
    try {
      setLoading(true);
      const { error } = await supabase.from("cart").delete().eq("id", id);

      if (error) {
        console.error("Error deleting item:", error.message);
      } else {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
        console.log(`Item with id ${id} removed from cart table`);
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
    <div
      className="container-fluid"
      style={{ width: "100vw", height: "100vh", backgroundColor: "#f0f0f0" }}
    >
      <h1
        style={{
          color: "red",
          paddingLeft: "130px",
          paddingRight: "130px",
          paddingTop: "50px",
        }}
      >
        Your Cart ({cartItems.length})
      </h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div
          className="container-fluid mt-5"
          style={{ paddingLeft: "130px", paddingRight: "130px" }}
        >
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
                      <p className="no-of-item" style={{ fontWeight: "bold" }}>
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
                      to="/checkout"
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
    </div>
  );
};

export default Cart;
