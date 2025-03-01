import { useEffect, useState } from "react";
import { PaystackButton } from "react-paystack";
import supabase from "../../supabaseClient";
import Spinner from "../Spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PaystackPayment = () => {
  const publicKey = "pk_test_ea076b8a6718d0a55dcafb87a66d582016abe96c";
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPriceofItem, setTotalPriceOfItem] = useState(0);

  const deliveryFees = 500;

  const handlePaystackSuccess = async (reference) => {
    console.log("Payment Successful:", reference);

    const { data: user, error: userError } = await supabase.auth.getUser();
    if (userError || !user?.user) {
      console.error("User not logged in:", userError);
      return;
    }

    const userId = user.user.id;
    const userEmail = user.user.email;
    const userName = user.user_metadata.username;

    // Ensure user_id is in UUID format
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(userId)) {
      console.error("Invalid UUID format:", userId);
      return;
    }

    // Insert payment record
    const paymentData = {
      user_id: userId,
      payment_method: "Paystack",
      amount: totalPriceofItem + deliveryFees,
      status: "successful",
      payment_id: reference.reference,
      created_at: new Date().toISOString(),
      email: userEmail,
    };

    const { data: payment, error: paymentError } = await supabase
      .from("payments")
      .insert([paymentData])
      .select("payment_id")
      .single();

    if (paymentError) {
      console.error("Error saving payment:", paymentError.message);
      toast.error("Error saving payment", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    toast.success("Payment recorded successfully!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    console.log("Payment recorded successfully!");

    // ✅ Step 1: Fetch item details table
    const { data: cartItems, error: cartFetchError } = await supabase
      .from("item_details")
      .select("meal_name, price, meal_img, item_quantity")
      .eq("user_id", userId);

    if (cartFetchError) {
      console.error("Error fetching item details:", cartFetchError.message);
      return;
    }

    // if (cartItems.length === 0) {
    //   console.log("No items in cart.");
    //   return;
    // }

    // ✅ Step 2: Move items to `orders` table before deleting
    const ordersData = cartItems.map((item) => ({
      user_id: userId,
      meal_name: item.meal_name,
      item_quantity: item.item_quantity,
      price: item.price,
      meal_img: item.meal_img,
      payment_id: String(payment.payment_id),
      payment_status: "success",
      email: userEmail,
      username: userName,
    }));

    const { error: orderError } = await supabase
      .from("orders")
      .insert(ordersData);

    if (orderError) {
      console.error("Error saving orders:", orderError.message);
      return;
    }

    console.log("Orders saved successfully!");

    // ✅ Step 3: Delete from `item_details`
    const mealNames = cartItems.map((item) => item.meal_name);

    const { error: itemDetailsError } = await supabase
      .from("item_details")
      .delete()
      .in("meal_name", mealNames);

    if (itemDetailsError) {
      console.error(
        "Error deleting from item_details:",
        itemDetailsError.message
      );
      return;
    }

    console.log("Deleted item details successfully!");

    // ✅ Step 4: Clear cart
    const { error: cartError } = await supabase
      .from("cart")
      .delete()
      .eq("user_id", userId);

    if (cartError) {
      console.error("Error clearing cart:", cartError.message);
    } else {
      console.log("Cart cleared successfully!");
      setCartItems([]); // Update UI
    }
  };

  //   Fetch cart items to get the total price of items in the cart
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

  const componentProps = {
    email: email.trim(),
    currency: "NGN",
    publicKey,
    amount: Number(totalPriceofItem + deliveryFees) * 100 || 0,
    text: "Pay Now",
    onSuccess: handlePaystackSuccess,
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
        style={{
          maxWidth: "400px",
          margin: "auto",
          padding: "20px",
          borderRadius: "8px",
          // boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <h2 style={{ textAlign: "center", color: "#333", fontWeight: "500" }}>
          Pay with Paystack
        </h2>

        <label
          style={{
            display: "block",
            fontWeight: "bold",
            marginTop: "20px",
            textAlign: "start",
          }}
        >
          Full Name:
        </label>
        <input
          className="form-control"
          type="text"
          placeholder="Enter your name"
          value={name}
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "5px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
          onChange={(e) => setName(e.target.value)}
        />

        <label
          style={{
            display: "block",
            fontWeight: "bold",
            marginTop: "20px",
            textAlign: "start",
          }}
        >
          Email Address:
        </label>
        <input
          className="form-control"
          type="email"
          placeholder="Enter your email"
          value={email}
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "5px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div style={{ display: "flex", marginTop: "30px", fontWeight: "500" }}>
          <label>Amount (NGN): </label>{" "}
          <p> ${parseFloat(totalPriceofItem + deliveryFees).toFixed(2)}</p>
        </div>

        <PaystackButton {...componentProps} className="pay-button" />
      </div>
    </>
  );
};

export default PaystackPayment;
