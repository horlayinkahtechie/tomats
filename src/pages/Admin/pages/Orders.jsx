import { useEffect, useState } from "react";
import supabase from "../../../supabaseClient";
import Sidebar from "../components/Sidebar";
import Spinner from "../../../components/Spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../../../components/Footer";
import "./style.css";

function Orders() {
  const [loading, setLoading] = useState(true);
  const [userOrders, setUserOrders] = useState([]);

  const [filterAllOrders, setFilterAllOrders] = useState([]);
  const [currentPageAllOrders, setCurrentPageAllOrders] = useState(1);

  const [deliveredOrders, setDeliveredOrders] = useState(new Set());
  const [currentPageDeliveredOrders, setCurrentPageDeliveredOrders] =
    useState(1);

  const [currentPage, setCurrentPage] = useState(1);
  const [filterDeliveredOrders, setFilteredDeliveredOrders] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [allOrders, setAllOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);

  // const [viewOrderDetails, setViewOrderDetails] = useState(false);
  // const [viewSelectedOrderDetails, setViewSelectedOrderDetails] =
  //   useState(null);

  const ordersPerPage = 4;
  const deliveredOrderPerPage = 4;
  const allOrdersPerPage = 4;

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value === "") {
      setFilteredOrders([]);
      setUserOrders(userOrders);
    } else {
      const filtered = allOrders.filter((order) =>
        order.order_id.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredOrders(filtered);
      setUserOrders([]);
    }
  };

  useEffect(() => {
    const fetchSearchedOrders = async () => {
      setLoading(true);
      try {
        const { data: orders, error: ordersError } = await supabase
          .from("orders")
          .select("*");

        if (ordersError) {
          console.error("Error fetching orders:", ordersError.message);
        } else {
          setAllOrders(orders);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchedOrders();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const { data: orders, error: ordersError } = await supabase
          .from("orders")
          .select("*")
          .order("created_at", { ascending: false });
        if (ordersError) {
          console.error("Error fetching orders:", ordersError.message);
        } else {
          setUserOrders(orders || []);
          setFilterAllOrders([]);
          setFilteredDeliveredOrders([]);
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

      setDeliveredOrders((prevDelivered) => {
        const updatedSet = new Set(prevDelivered);
        updatedSet.add(order.order_id);
        return updatedSet;
      });
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

  // const orderDetails = async (orderId) => {
  //   if (!orderId) {
  //     console.error("Invalid orderId:", orderId);
  //     return;
  //   }

  //   setLoading(true);
  //   try {
  //     const { data: order, error } = await supabase
  //       .from("orders")
  //       .select("price, payment_status")
  //       .eq("order_id", orderId)
  //       .single();

  //     if (error) {
  //       throw new Error(error.message);
  //     }

  //     if (!order) {
  //       console.warn("Order not found");
  //       return;
  //     }

  //     setViewSelectedOrderDetails(order);
  //     setViewOrderDetails(true);
  //   } catch (err) {
  //     console.error("Error fetching order details:", err.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const fetchDeliveredOrders = async () => {
    setLoading(true);

    try {
      // Fetch all collected orders
      const { data: collectedOrders, error: collectedOrdersError } =
        await supabase.from("collected_orders").select("*");

      if (collectedOrdersError) {
        console.error(
          "Error fetching delivered orders:",
          collectedOrdersError.message
        );
      } else {
        setUserOrders([]);
        setFilterAllOrders([]);
        setFilteredDeliveredOrders(collectedOrders || []);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllOrders = async () => {
    setLoading(true);
    try {
      const { data: orders, error: ordersError } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });
      if (ordersError) {
        console.error("Error fetching orders:", ordersError.message);
      } else {
        setFilterAllOrders(orders || []);
        setFilteredDeliveredOrders([]);
        setUserOrders([]);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    } finally {
      setLoading(false);
    }
  };

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = userOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  const indexOfLastDeliveredOrder =
    currentPageDeliveredOrders * deliveredOrderPerPage;
  const indexOfFirstDeliveredOrder =
    indexOfLastDeliveredOrder - deliveredOrderPerPage;
  const deliverOrder = filterDeliveredOrders.slice(
    indexOfFirstDeliveredOrder,
    indexOfLastDeliveredOrder
  );

  const indexOfLastAllOrder = currentPageAllOrders * allOrdersPerPage;
  const indexOfFirstAllOrder = indexOfLastAllOrder - allOrdersPerPage;
  const allItemOrdered = filterAllOrders.slice(
    indexOfFirstAllOrder,
    indexOfLastAllOrder
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const paginateDeliveredOrders = (pageNumber) =>
    setCurrentPageDeliveredOrders(pageNumber);
  const paginateAllOrder = (pageNumber) => setCurrentPageAllOrders(pageNumber);

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
          <div className="col-md-3 p-0 m-0">
            <Sidebar />
          </div>
          <div className="col-md-9 mt-5 mb-5">
            <div className="search-bar mb-5 mt-4">
              <form action="">
                <div style={{ display: "flex", gap: "40px" }}>
                  {" "}
                  <input
                    type="text"
                    placeholder="Search with order ID"
                    className="form-control"
                    style={{ height: "52px" }}
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                </div>
              </form>
            </div>
            <div className="sorts mb-5">
              <button
                type="button"
                className="sort-btn"
                onClick={() => fetchAllOrders()}
              >
                All orders
              </button>
              <button type="button" className="sort-btn">
                Newest
              </button>
              <button type="button" className="sort-btn">
                7 days
              </button>
              <button type="button" className="sort-btn">
                1 month
              </button>
              <button type="button" className="sort-btn">
                1 year
              </button>
              <button
                type="button"
                className="sort-btn"
                onClick={() => fetchDeliveredOrders()}
              >
                Delivered
              </button>
              <button
                type="button"
                className="sort-btn"
                // onClick={() => filterOrders(365)}
              >
                Not Delivered
              </button>
            </div>
            <div className="row mt-2" style={{ paddingRight: "40px" }}>
              {currentOrders.map((item) => (
                <div key={item.order_id} className="item-container">
                  <ul
                    className="item-background-color p-0 m-0"
                    // onClick={() => orderDetails(order.id)}
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

            <div className="pagination d-flex justify-content-center mt-2 mb-4">
              {Array.from(
                {
                  length: Math.ceil(
                    filterDeliveredOrders.length / deliveredOrderPerPage
                  ),
                },
                (_, index) => (
                  <button
                    key={index}
                    className={`mx-1 btn ${
                      currentPageDeliveredOrders === index + 1
                        ? "btn-light text-primary"
                        : "btn-primary"
                    }`}
                    onClick={() => paginateDeliveredOrders(index + 1)}
                  >
                    {index + 1}
                  </button>
                )
              )}
            </div>

            <div className="pagination d-flex justify-content-center mt-2 mb-4">
              {Array.from(
                {
                  length: Math.ceil(filterAllOrders.length / allOrdersPerPage),
                },
                (_, index) => (
                  <button
                    key={index}
                    className={`mx-1 btn ${
                      currentPageAllOrders === index + 1
                        ? "btn-light text-primary"
                        : "btn-primary"
                    }`}
                    onClick={() => paginateAllOrder(index + 1)}
                  >
                    {index + 1}
                  </button>
                )
              )}
            </div>

            {/* 
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
                      <p>{viewSelectedOrderDetails.payment_status}</p>
                      <p>{viewSelectedOrderDetails.price}</p>
                      <p></p>
                    </div>
                  </div>
                </div>
              </div>
            )} */}

            {deliverOrder.map((item) => (
              <div key={item.order_id} className="item-container">
                <ul
                  className="item-background-color p-0 m-0"
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
                  </li>
                </ul>
              </div>
            ))}

            {allItemOrdered.map((item) => (
              <div key={item.order_id} className="item-container">
                <ul
                  className="item-background-color p-0 m-0"
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
                  </li>
                </ul>
              </div>
            ))}

            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <div key={order.order_id} className="order-card">
                  <p>
                    <strong>Order ID:</strong> {order.order_id}
                  </p>
                  <p>
                    <strong>User Email:</strong> {order.email}
                  </p>
                  <p>
                    <strong>Meal Name:</strong> {order.meal_name}
                  </p>
                  <p>
                    <strong>Price:</strong> ${order.price.toFixed(2)}
                  </p>
                  <p>
                    <strong>Payment Status:</strong> {order.payment_status}
                  </p>
                </div>
              ))
            ) : (
              <p style={{ textAlign: "center", fontSize: "23px" }}>
                No order found
              </p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Orders;
