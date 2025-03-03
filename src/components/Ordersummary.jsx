import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import supabase from "../supabaseClient";
import PaystackPayment from "./paystackpaymentmethod/PaystackPayment";

const Ordersummary = ({ deliveryFees }) => {
  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPriceofItem, setTotalPriceOfItem] = useState(0);

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

  // Calculate total price when cartItems change
  useEffect(() => {
    const total = cartItems.reduce(
      (sum, item) => sum + parseFloat(item.price),
      0
    );
    setTotalPriceOfItem(total);
  }, [cartItems]);

  // Calculate total quantity
  const quantity = cartItems.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0
  );

  if (loading) {
    return (
      <div className="container text-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="cart-summary">
      <h2>Order Summary</h2>
      <p>
        Item&apos;s total ({quantity}): ${totalPriceofItem.toFixed(2)}
      </p>
      <p>Delivery fees: ${parseFloat(deliveryFees).toFixed(2)}</p>
      <h3>Total: ${parseFloat(totalPriceofItem + deliveryFees).toFixed(2)}</h3>

      <button
        type="button"
        className="confirm-btn"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Proceed to pay
      </button>

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
              <PaystackPayment />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ordersummary;
