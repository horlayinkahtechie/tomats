import { useState } from "react";
import "./reservationStyle.css";
import supabase from "../../supabaseClient";
import { ToastContainer, toast } from "react-toastify";

const ReservationSteps = () => {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [phoneNo, setPhoneNo] = useState(null);
  const [reservationDate, setReservationDate] = useState(null);
  const [reservationTime, setReservationTime] = useState(null);
  const [noOfGuests, setNoOfGuests] = useState(null);
  const [noOfReservedSeat, setNoOfReservedSeat] = useState(null);
  const [specialRequests, setSpecialRequests] = useState(null);

  const totalSteps = 3;

  const nextStep = () => setStep((prev) => Math.min(prev + 1, totalSteps));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phoneNo ||
      !reservationDate ||
      !reservationTime ||
      !noOfGuests ||
      !noOfReservedSeat
    ) {
      toast.error("Please fill out all required fields");
      setLoading(false);
      return;
    }

    // Get the logged-in user
    const { data: user, error: userError } = await supabase.auth.getUser();
    if (userError || !user?.user) {
      console.error("No user logged in:", userError);
      toast.error("You must be logged in to reserve a seat!");
      setLoading(false);
      return;
    }

    const reservationData = {
      firstName,
      lastName,
      email,
      phoneNo,
      reservationDate,
      reservationTime,
      noOfGuests,
      noOfReservedSeat,
      specialRequests,
    };

    try {
      const { error } = await supabase
        .from("reservation")
        .insert(reservationData);

      if (error) {
        console.error("Error reserving your seat:", error.message);
        toast.error("There was an error reserving your seat!");
      } else {
        setFirstName(null);
        setLastName(null);
        setEmail(null);
        setReservationDate(null);
        setPhoneNo(null);
        setReservationTime(null);
        setNoOfGuests(null);
        setNoOfReservedSeat(null);
        setSpecialRequests(null);
        toast.success(
          "Your seat has been reserved! Check your email for confirmation."
        );
      }
    } catch (err) {
      console.error("Unexpected error occurred:", err);
      toast.error("Something went wrong, please try again.");
    } finally {
      setLoading(false);
    }
  };

  const formInputs = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "phoneNo":
        setPhoneNo(value);
        break;
      case "reservationDate":
        setReservationDate(value);
        break;
      case "reservationTime":
        setReservationTime(value);
        break;
      case "noOfGuests":
        setNoOfGuests(value);
        break;
      case "specialRequests":
        setSpecialRequests(value);
        break;
      case "noOfReservedSeat":
        setNoOfReservedSeat(value);
        break;
      default:
        break;
    }
  };

  return (
    <div
      className="container"
      style={{
        paddingLeft: "90px",
        paddingRight: "90px",
        paddingBottom: "60px",
      }}
    >
      <ToastContainer />
      {/* Step Indicator */}
      <div
        className="d-flex justify-content-center mb-4"
        style={{ marginTop: "40px" }}
      >
        {[...Array(totalSteps)].map((_, index) => {
          const stepNum = index + 1;
          return (
            <div key={stepNum} className="d-flex align-items-center">
              <div
                className={`rounded-circle text-white d-flex align-items-center justify-content-center ${
                  step >= stepNum ? "bg-primary" : "bg-light text-dark"
                }`}
                style={{
                  width: "40px",
                  height: "40px",
                  fontWeight: "bold",
                  border: "1px solid #ccc",
                }}
              >
                {stepNum}
              </div>
              {stepNum < totalSteps && (
                <div
                  className={`mx-2 ${
                    step > stepNum ? "bg-primary" : "bg-light"
                  }`}
                  style={{ height: "5px", width: "40px" }}
                ></div>
              )}
            </div>
          );
        })}
      </div>

      {/* Step Content */}
      <div className="">
        <form action="">
          {step === 1 && (
            <div className="row">
              <div className="col-md-6">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Your firstname"
                  required
                  className="form-control reservation-input"
                  onChange={formInputs}
                  value={firstName || ""}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  required
                  placeholder="Your Lastname"
                  className="form-control reservation-input"
                  onChange={formInputs}
                  value={lastName || ""}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">E-mail</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="example@gmail.com"
                  className="form-control reservation-input"
                  onChange={formInputs}
                  value={email || ""}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Phone number</label>
                <input
                  type="number"
                  name="phoneNo"
                  required
                  placeholder="Your Phone number"
                  className="form-control reservation-input"
                  onChange={formInputs}
                  value={phoneNo || ""}
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <>
              <label className="form-label">Reservation Date</label>
              <input
                type="date"
                name="reservationDate"
                required
                className="form-control reservation-input"
                style={{ width: "100%" }}
                onChange={formInputs}
                value={reservationDate || ""}
              />
              <label className="form-label mt-3">Time</label>
              <input
                type="time"
                required
                name="reservationTime"
                className="form-control reservation-input"
                style={{ width: "100%" }}
                onChange={formInputs}
                value={reservationTime || ""}
              />
            </>
          )}
          {step === 3 && (
            <>
              <label className="form-label">Number of Guests</label>
              <input
                type="number"
                name="noOfGuests"
                required
                className="form-control reservation-input"
                style={{ width: "100%" }}
                onChange={formInputs}
                value={noOfGuests || ""}
              />

              <label className="form-label">Number seats to be reserved</label>
              <input
                type="number"
                name="noOfReservedSeat"
                required
                className="form-control reservation-input"
                style={{ width: "100%" }}
                onChange={formInputs}
                value={noOfReservedSeat || ""}
              />

              <label className="form-label">Special Requests</label>
              <textarea
                className="form-control"
                name="specialRequests"
                placeholder="I want a reservation for a birthday party and birthday shoot..."
                rows="3"
                onChange={formInputs}
                value={specialRequests || ""}
              ></textarea>
            </>
          )}
        </form>
      </div>

      {/* Navigation Buttons */}
      <div className="d-flex justify-content-between mt-5">
        <button
          className="btn btn-primary"
          onClick={prevStep}
          disabled={step === 1}
          style={{ width: "180px", fontSize: "19px", height: "45px" }}
        >
          Previous
        </button>
        <button
          type={step === totalSteps ? "submit" : "button"}
          className="btn btn-outline-primary"
          disabled={loading}
          onClick={step === totalSteps ? handleSubmit : nextStep}
          style={{ width: "180px", fontSize: "19px", height: "45px" }}
        >
          {loading
            ? "Reserving..."
            : step === totalSteps
            ? "Reserve a seat"
            : "Next"}
        </button>
      </div>
    </div>
  );
};

export default ReservationSteps;
