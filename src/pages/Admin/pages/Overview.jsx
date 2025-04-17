import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../../supabaseClient";
import Sidebar from "../components/Sidebar";
import Spinner from "../../../components/Spinner";

function Overview() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userOrders, setUserOrders] = useState([]);
  const [totalPrice, setTotalPrice] = useState();
  const [deliveredOrders, setDeliveredOrders] = useState([]);
  const [canceledOrders, setCanceledOrders] = useState([]);
  const [userReservations, setUserReservations] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const navigate = useNavigate;
    const abortController = new AbortController();

    async function fetchAdmin() {
      try {
        // Get the current session
        const { data, error } = await supabase.auth.getSession();

        if (error || !data.session) {
          console.error("Session error:", error);
          navigate("/admin/login");
          return;
        }
        // Fetch user role from profiles table
        const { data: userData, error: profileError } = await supabase
          .from("admins")
          .select("role")
          .eq("email", user.email)
          .single();

        if (profileError || !userData || userData.role !== "admin") {
          console.warn("Unauthorized access:", profileError);
          navigate("/admin/login");
          return;
        }

        setUser(data.session.user);
      } catch (error) {
        console.error("Unexpected error:", error);
        navigate("/admin/login");
      } finally {
        setLoading(false);
      }
    }

    fetchAdmin();

    return () => {
      abortController.abort();
    };
  }, [navigate]);

  useEffect(() => {
    const fetchUserOrders = async () => {
      const { data: user, error: userError } = await supabase.auth.getUser();
      if (userError || !user?.user) {
        console.error("User not logged in:", userError);
        return;
      }

      setLoading(true);

      try {
        const { data, error } = await supabase.from("orders").select("*");
        const totalPrice = data.reduce((sum, order) => sum + order.price, 0);
        setTotalPrice(totalPrice);

        if (error) {
          console.error("Error fetching total orders:", error.message);
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

  useEffect(() => {
    const fetchCollectedOrders = async () => {
      const { data: user, error: userError } = await supabase.auth.getUser();
      if (userError || !user?.user) {
        console.error("User not logged in:", userError);
        return;
      }

      setLoading(true);

      try {
        const { data, error } = await supabase
          .from("collected_orders")
          .select("*");

        if (error) {
          console.error("Error fetching collected orders:", error.message);
        } else {
          const itemsWithQuantity = data.map((item) => ({
            ...item,
            quantity: 1,
          }));
          setDeliveredOrders(itemsWithQuantity || []);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCollectedOrders();
  }, []);

  // Canceled Orders
  useEffect(() => {
    const fetchCanceledOrders = async () => {
      const { data: user, error: userError } = await supabase.auth.getUser();
      if (userError || !user?.user) {
        console.error("User not logged in:", userError);
        return;
      }

      setLoading(true);

      try {
        const { data, error } = await supabase
          .from("canceled_orders")
          .select("*");

        if (error) {
          console.error("Error fetching canceled orders:", error.message);
        } else {
          const itemsWithQuantity = data.map((item) => ({
            ...item,
            quantity: 1,
          }));
          setCanceledOrders(itemsWithQuantity || []);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCanceledOrders();
  }, []);

  // User Reservations
  const fetchUsersReservations = async () => {
    setLoading(true);

    const { data: user, error: userError } = await supabase.auth.getUser();
    if (userError || !user?.user) {
      console.error("User not logged in:", userError);
      setLoading(false);
      return;
    }

    try {
      // Fetch all user reservations
      const { data: orders, error: ordersError } = await supabase
        .from("reservation")
        .select("*");

      if (ordersError) {
        console.error("Error fetching user reservations:", ordersError.message);
      } else {
        setUserReservations(orders || []);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsersReservations();
  }, []);

  if (loading) {
    return (
      <div className="text-center">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      {/* <div className="container-fluid"> */}
      <div className=" container-fluid">
        <div className="row">
          <div className="col-md-3" style={{ padding: "0px", margin: "0px" }}>
            <Sidebar />
          </div>
          <div className="col-md-9 mt-5">
            <p style={{ color: "black", fontSize: "26px" }}>Welcome, Admin</p>
            <div className="row mt-5 gap-5">
              <div
                className="col-md-3 p-3"
                style={{
                  backgroundColor: "white",
                  padding: "50px 20px",
                  paddingTop: "18px",
                  borderRadius: "8px",
                  width: "260px",
                  height: "160px",
                  display: "flex",
                  gap: "50px",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="70"
                  height="70"
                  fill="currentColor"
                  className="bi bi-box-arrow-in-down-right"
                  viewBox="0 0 16 16"
                  style={{
                    color: " green",
                    backgroundColor: "rgb(105, 245, 105)",
                    padding: "15px",
                    borderRadius: "50%",
                  }}
                >
                  <path
                    fillRule="evenodd"
                    d="M6.364 2.5a.5.5 0 0 1 .5-.5H13.5A1.5 1.5 0 0 1 15 3.5v10a1.5 1.5 0 0 1-1.5 1.5h-10A1.5 1.5 0 0 1 2 13.5V6.864a.5.5 0 1 1 1 0V13.5a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5v-10a.5.5 0 0 0-.5-.5H6.864a.5.5 0 0 1-.5-.5"
                  />
                  <path
                    fillRule="evenodd"
                    d="M11 10.5a.5.5 0 0 1-.5.5h-5a.5.5 0 0 1 0-1h3.793L1.146 1.854a.5.5 0 1 1 .708-.708L10 9.293V5.5a.5.5 0 0 1 1 0z"
                  />
                </svg>
                <div style={{ display: "block" }}>
                  {" "}
                  <p
                    style={{
                      fontSize: "18px",
                      fontWeight: "500",
                      color: "rgb(120, 120, 120)",
                    }}
                  >
                    Total Orders
                  </p>
                  <p style={{ fontSize: "30px", fontWeight: "700" }}>
                    {userOrders.length}
                  </p>
                </div>
              </div>
              <div
                className="col-md-3 "
                style={{
                  backgroundColor: "white",
                  padding: "50px 20px",
                  paddingTop: "18px",
                  borderRadius: "8px",
                  width: "260px",
                  height: "160px",
                  display: "flex",
                  gap: "50px",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="70"
                  height="70"
                  fill="currentColor"
                  className="bi bi-box-arrow-up-right"
                  viewBox="0 0 16 16"
                  style={{
                    color: "rgb(54, 38, 2)",
                    backgroundColor: "rgb(165, 126, 42)",
                    padding: "15px",
                    borderRadius: "50%",
                  }}
                >
                  <path
                    fillRule="evenodd"
                    d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5"
                  />
                  <path
                    fillRule="evenodd"
                    d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z"
                  />
                </svg>

                <div style={{ display: "block" }}>
                  {" "}
                  <p
                    style={{
                      fontSize: "18px",
                      fontWeight: "500",
                      color: "rgb(120, 120, 120)",
                    }}
                  >
                    Total Delivered
                  </p>
                  <p style={{ fontSize: "30px", fontWeight: "700" }}>
                    {deliveredOrders.length}
                  </p>
                </div>
              </div>
              <div
                className="col-md-3"
                style={{
                  backgroundColor: "white",
                  padding: "50px 20px",
                  paddingTop: "18px",
                  display: "flex",
                  width: "260px",
                  height: "160px",
                  gap: "50px",
                  borderRadius: "8px",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="70"
                  height="70"
                  fill="currentColor"
                  className="bi bi-person-workspace"
                  viewBox="0 0 16 16"
                  style={{
                    color: " green",
                    backgroundColor: "rgb(105, 245, 105)",
                    padding: "15px",
                    borderRadius: "50%",
                  }}
                >
                  <path d="M4 16s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-5.95a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
                  <path d="M2 1a2 2 0 0 0-2 2v9.5A1.5 1.5 0 0 0 1.5 14h.653a5.4 5.4 0 0 1 1.066-2H1V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v9h-2.219c.554.654.89 1.373 1.066 2h.653a1.5 1.5 0 0 0 1.5-1.5V3a2 2 0 0 0-2-2z" />
                </svg>

                <div style={{ display: "block" }}>
                  <p
                    style={{
                      fontSize: "18px",
                      fontWeight: "500",
                      color: "rgb(120, 120, 120)",
                    }}
                  >
                    Reservations
                  </p>
                  <p style={{ fontSize: "30px", fontWeight: "700" }}>
                    {userReservations.length}
                  </p>
                </div>
              </div>
              <div
                className="col-md-3"
                style={{
                  backgroundColor: "white",
                  padding: "50px 20px",
                  paddingTop: "18px",
                  display: "flex",
                  width: "260px",
                  height: "160px",
                  gap: "50px",
                  borderRadius: "8px",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="70"
                  height="70"
                  fill="currentColor"
                  className="bi bi-currency-dollar"
                  viewBox="0 0 16 16"
                  style={{
                    color: "rgb(54, 38, 2)",
                    backgroundColor: "rgb(165, 126, 42)",
                    padding: "15px",
                    borderRadius: "50%",
                  }}
                >
                  <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73z" />
                </svg>

                <div style={{ display: "block" }}>
                  <p
                    style={{
                      fontSize: "18px",
                      fontWeight: "500",
                      color: "rgb(120, 120, 120)",
                    }}
                  >
                    Total Revenue
                  </p>
                  <p style={{ fontSize: "30px", fontWeight: "700" }}>
                    {totalPrice}
                  </p>
                </div>
              </div>
            </div>

            <div className="row mt-5">
              <div className="col-md-6">
                <p
                  style={{
                    fontSize: "26px",
                    fontWeight: "500",
                    color: "black",
                  }}
                >
                  Canceled Orders
                </p>
                <div
                  style={{
                    backgroundColor: "white",
                    width: "100%",
                    borderRadius: "10px",
                    height: "600px",
                  }}
                >
                  {canceledOrders.map((item) => (
                    <div key={item.order_id} className="item-container">
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
                          {canceledOrders.some(
                            (order) => order.order_id === item.order_id
                          ) && (
                            <span
                              style={{
                                fontSize: "22px",
                                color: "red",
                                fontWeight: "bold",
                              }}
                            >
                              ❌ Order Canceled
                            </span>
                          )}
                        </li>
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-md-6">
                <p
                  style={{
                    fontSize: "26px",
                    fontWeight: "500",
                    color: "black",
                  }}
                >
                  Sales chart
                </p>
                <div
                  style={{
                    backgroundColor: "white",
                    width: "100%",
                    borderRadius: "10px",
                    height: "600px",
                  }}
                >
                  <p style={{ padding: "20px" }}>Sales breakdown</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
}

export default Overview;
