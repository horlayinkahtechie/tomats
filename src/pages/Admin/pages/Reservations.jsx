import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import supabase from "../../../supabaseClient";
import Spinner from "../../../components/Spinner";
import Footer from "../../../components/Footer";
// import { toast, ToastContainer } from "react-toastify";
import "./style.css";
import { Card, Badge } from "react-bootstrap";

export default function Reservations() {
  const [userReservations, setUserReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 4;

  useEffect(() => {
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
          console.error(
            "Error fetching user reservations:",
            ordersError.message
          );
        } else {
          setUserReservations(orders || []);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsersReservations();
  }, []);

  const markReservationAsConfirmed = async (reservationId) => {
    const { data: user, error: userError } = await supabase.auth.getUser();
    if (userError || !user?.user) {
      console.error("User not logged in:", userError);
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      const { error: ordersError } = await supabase
        .from("reservation")
        .update({ status: "confirmed" })
        .eq("reservation_id", reservationId);

      if (ordersError) {
        console.error(
          "Error updating reservation status:",
          ordersError.message
        );
      } else {
        setUserReservations((prevReservations) =>
          prevReservations.map((reservation) =>
            reservation.reservation_id === reservationId
              ? { ...reservation, status: "confirmed" }
              : reservation
          )
        );
        console.log("Reservation confirmed");
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    } finally {
      setLoading(false);
    }
  };

  // const copyToClipboard = (text) => {
  //   navigator.clipboard
  //     .writeText(text)
  //     .then(() => {
  //       toast.success("Reservation ID copied!");
  //     })
  //     .catch(() => {
  //       toast.error("Failed to copy Reservation ID");
  //     });
  // };

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentReservedSeats = userReservations.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="text-center">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      {/* <ToastContainer /> */}
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3" style={{ padding: "0px", margin: "0px" }}>
            <Sidebar />
          </div>
          <div className="col-md-9 mt-5 mb-5">
            <div className="pagination d-flex justify-content-center mt-4 mb-4">
              {Array.from(
                { length: Math.ceil(userReservations.length / ordersPerPage) },
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

            {currentReservedSeats.map((user_reservations) => (
              <Card
                key={user_reservations.reservation_id}
                className="shadow-sm mt-4"
              >
                <Card.Body>
                  <h5 className="card-title text-primary">
                    {user_reservations.firstName} {user_reservations.lastName}
                  </h5>
                  <p className="text-muted">
                    <strong>Reservation Date:</strong>{" "}
                    {user_reservations.reservationDate} <br />
                    <strong>Reservation Time:</strong>{" "}
                    {user_reservations.reservationTime} <br />
                    <strong>Guests:</strong> {user_reservations.noOfGuests}
                    <br />
                    <strong>Email:</strong> {user_reservations.email}
                  </p>

                  <Badge
                    bg={
                      user_reservations.status.toLowerCase() === "confirmed"
                        ? "success"
                        : user_reservations.status.toLowerCase() === "pending"
                        ? "warning"
                        : "danger"
                    }
                    className="mb-3"
                  >
                    {user_reservations.status}
                  </Badge>
                  <br />

                  {user_reservations.status.toLowerCase() !== "confirmed" && (
                    <button
                      className="btn btn-success"
                      onClick={() =>
                        markReservationAsConfirmed(
                          user_reservations.reservation_id
                        )
                      }
                    >
                      Confirm Reservation
                    </button>
                  )}
                </Card.Body>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
