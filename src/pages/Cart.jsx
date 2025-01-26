import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [itemPrice, setItemPrice] = useState(
    Math.floor(Math.random() * (80 - 10 + 1)) + 10
  );
  const [quantity, setQuantity] = useState(null);
  const [totalPriceofItem, setTotalPriceOfItem] = useState(0);

  // Calculate the total price whenever itemPrice or quantity changes
  useEffect(() => {
    setTotalPriceOfItem(itemPrice * quantity);
  }, [itemPrice, quantity]);

  useEffect(() => {
    const fetchCartItems = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase.from("cart").select("*");
        if (error) {
          console.error("Error fetching cart items:", error.message);
        } else {
          setQuantity(data.length);
          console.log("Cart items fetched successfully:", data);
          setCartItems(data || []);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const removeItem = async (id) => {
    try {
      setLoading(true);
      const { error, data } = await supabase.from("cart").delete().eq("id", id);

      if (error) {
        console.error("Error deleting item:", error.message);
      } else {
        setQuantity(data.length);
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
        console.log(`Item with id ${id} removed from cart table`);
      }
    } catch (err) {
      setLoading(false);
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
        <>
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
                          <p className="price">${itemPrice}</p>
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
                            width="26"
                            height="26"
                            fill="currentColor"
                            className="bi bi-trash3-fill"
                            viewBox="0 0 16 16"
                            color="orangered"
                          >
                            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                          </svg>{" "}
                          Remove
                        </button>
                        <button
                          className="button-remove"
                          //   onClick={() =>
                          //     setQuantity((prev) => Math.max(prev - 1, 1))
                          //   }
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="17.5"
                            height="17.5"
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
                          1
                        </p>
                        <button
                          className="button-add"
                          //   onClick={() => setQuantity((prev) => prev + 1)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="17.5"
                            height="17.5"
                            fill="currentColor"
                            className="bi bi-plus-lg"
                            viewBox="0 0 16 16"
                            color="white"
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
                        ${totalPriceofItem.toFixed(2)}
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
        </>
      )}
    </div>
  );
};

export default Cart;
