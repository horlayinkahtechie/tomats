import { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import Footer from "../../../components/Footer";
import supabase from "../../../supabaseClient";
import Spinner from "../../../components/Spinner";
import { Button, Card, Badge } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";

export default function Reservations() {
  const [userReservations, setUserReservation] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserOrders = async () => {
      setLoading(true);
      const { data: user, error: userError } = await supabase.auth.getUser();
      if (userError || !user?.user) {
        console.error("User not logged in:", userError);
        setLoading(false);
        return;
      }

      const userId = user.user.id;

      try {
        const { data, error } = await supabase
          .from("reservation")
          .select("*")
          .eq("user_id", userId);

        if (error) {
          console.error("Error fetching your reservations:", error.message);
        } else {
          setUserReservation(data || []);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserOrders();
  }, []);

  // Cancel reservation function
  const cancelUserReservation = async (reservationId) => {
    setLoading(true);

    const { data: user, error: userError } = await supabase.auth.getUser();
    if (userError || !user?.user) {
      console.error("User not logged in:", userError);
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase
        .from("reservation")
        .delete("*")
        .eq("reservation_id", reservationId);

      if (error) {
        console.error("Error canceling your reservation:", error.message);
      } else {
        setUserReservation((prev) =>
          prev.filter((res) => res.reservation_id !== reservationId)
        );
        toast.success("Reservation canceled successfully!");
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    } finally {
      setLoading(false);
    }
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
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3" style={{ padding: "0px", margin: "0px" }}>
            <Sidebar />
          </div>
          <div className="col-md-9 mt-5">
            <p style={{ color: "black", fontSize: "26px" }}>
              Your reservations
            </p>

            {userReservations.length === 0 ? (
              <p
                style={{
                  fontSize: "22px",
                  color: "orangered",
                  textAlign: "center",
                  marginTop: "50px",
                }}
              >
                You do not have any reservations
              </p>
            ) : (
              <div className="row">
                {userReservations.map((reservation) => (
                  <div className="col-md-6 mb-4" key={reservation.id}>
                    <Card className="shadow-sm">
                      <Card.Body>
                        <h5 className="card-title text-primary">
                          {reservation.firstName} {reservation.lastName}
                        </h5>
                        <p className="text-muted">
                          <strong>Reservation Date:</strong>{" "}
                          {reservation.reservationDate} <br />
                          <strong>Reservation Time:</strong>{" "}
                          {reservation.reservationTime} <br />
                          <strong>Guests:</strong> {reservation.noOfGuests}
                          <br />
                          <strong>Email:</strong> {reservation.email}
                        </p>

                        <Badge
                          bg={
                            reservation.status === "Confirmed"
                              ? "success"
                              : reservation.status === "Pending"
                              ? "warning"
                              : "success"
                          }
                          className="mb-3"
                        >
                          {reservation.status}
                        </Badge>
                        <br />

                        {reservation.status === "confirmed" ? (
                          ""
                        ) : (
                          <Button
                            variant="danger"
                            onClick={() =>
                              cancelUserReservation(reservation.reservation_id)
                            }
                            size="sm"
                          >
                            Cancel Reservation
                          </Button>
                        )}
                      </Card.Body>
                    </Card>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
