import { useState, useEffect, useMemo } from "react";
import "./reservationStyle.css";
import supabase from "../../supabaseClient";
import { ToastContainer, toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import emailjs from "emailjs-com";

const ReservationSteps = () => {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [reservationDate, setReservationDate] = useState(null);
  const [reservationTime, setReservationTime] = useState("");
  const [noOfGuests, setNoOfGuests] = useState("");
  const [noOfReservedSeat, setNoOfReservedSeat] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");

  const [reservedSlots, setReservedSlots] = useState([]);

  const timeSlots = ["12:00", "14:00", "16:00", "18:00", "20:00"];

  const formatDate = (date) => {
    const d = new Date(date);
    return d.toISOString().split("T")[0]; // yyyy-mm-dd
  };

  const cleanTime = (time) => {
    return time?.slice(0, 5);
  };

  const isSlotTaken = (date, time) => {
    const selectedDate = formatDate(date);
    const cleanedTime = cleanTime(time);
    const taken = reservedSlots.some(
      (slot) =>
        slot.reservationDate === selectedDate &&
        cleanTime(slot.reservationTime) === cleanedTime
    );
    return taken;
  };

  const availableTimes = useMemo(() => {
    if (!reservationDate) return timeSlots;
    return timeSlots.filter((time) => !isSlotTaken(reservationDate, time));
  }, [reservationDate, reservedSlots]);

  const fetchReservedSlots = async () => {
    const { data, error } = await supabase
      .from("reservation")
      .select("reservationDate, reservationTime")
      .eq("status", "confirmed");

    if (error) {
      console.error("Error fetching reserved slots:", error.message);
    } else {
      const cleaned = data.map((slot) => ({
        reservationDate: formatDate(slot.reservationDate),
        reservationTime: cleanTime(slot.reservationTime),
      }));
      setReservedSlots(cleaned);
    }
  };

  useEffect(() => {
    fetchReservedSlots();
  }, []);

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

    const { data: user, error: userError } = await supabase.auth.getUser();
    if (userError || !user?.user) {
      toast.error("You must be logged in to reserve a seat!");
      setLoading(false);
      return;
    }

    if (isSlotTaken(reservationDate, reservationTime)) {
      toast.error("Time slot no longer available.");
      setLoading(false);
      return;
    }

    const reservationData = {
      firstName,
      lastName,
      email,
      phoneNo,
      reservationDate: formatDate(reservationDate),
      reservationTime,
      noOfGuests,
      noOfReservedSeat,
      specialRequests,
      status: "confirmed", // You can change this if you want to allow pending status
    };

    const { error } = await supabase
      .from("reservation")
      .insert(reservationData);

    if (error) {
      toast.error("Error reserving your seat!");
    } else {
      toast.success(
        "Reservation successful! Check your email for confirmation!"
      );

      // Send confirmation email
      emailjs
        .send(
          "service_dt4lfep", //Service ID
          "template_08k3kgt", //Template ID
          {
            firstName,
            lastName,
            email,
            reservationDate: formatDate(reservationDate),
            reservationTime,
            noOfGuests,
            noOfReservedSeat,
            specialRequests,
          },
          "zLcqtoGgeFglmGnFb" // (user ID)
        )
        .then(
          (result) => {
            console.log("Email sent successfully!", result.text);
          },
          (error) => {
            console.error("Failed to send email", error);
          }
        );

      // Clear fields
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhoneNo("");
      setReservationDate(null);
      setReservationTime("");
      setNoOfGuests("");
      setNoOfReservedSeat("");
      setSpecialRequests("");
      fetchReservedSlots(); // Refresh taken slots
    }
    setLoading(false);
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
      case "reservationTime":
        setReservationTime(value);
        break;
      case "specialRequests":
        setSpecialRequests(value);
        break;
      case "noOfGuests":
        const guests = parseInt(value) || 0;
        setNoOfGuests(guests);
        setNoOfReservedSeat(guests < 3 ? 2 : guests);
        break;
      case "noOfReservedSeat":
        setNoOfReservedSeat(parseInt(value) || 0);
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

      <div>
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="row">
              <div className="col-md-6">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  required
                  className="form-control reservation-input"
                  onChange={formInputs}
                  value={firstName}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  required
                  className="form-control reservation-input"
                  onChange={formInputs}
                  value={lastName}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">E-mail</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="form-control reservation-input"
                  onChange={formInputs}
                  value={email}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Phone number</label>
                <input
                  type="tel"
                  name="phoneNo"
                  required
                  className="form-control reservation-input"
                  onChange={formInputs}
                  value={phoneNo}
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <>
              <label className="form-label">Reservation Date</label>
              <DatePicker
                selected={reservationDate}
                onChange={(date) => setReservationDate(date)}
                minDate={new Date()}
                dateFormat="yyyy-MM-dd"
                className="form-control"
              />

              <label className="form-label mt-3">Time</label>
              <select
                name="reservationTime"
                className="form-control"
                value={reservationTime}
                onChange={formInputs}
              >
                <option value="">Select Time</option>
                {timeSlots.map((time) => (
                  <option
                    key={time}
                    value={time}
                    disabled={!availableTimes.includes(time)}
                  >
                    {time}{" "}
                    {!availableTimes.includes(time) ? "(Unavailable)" : ""}
                  </option>
                ))}
              </select>
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
                onChange={formInputs}
                value={noOfGuests}
              />

              <label className="form-label">
                Number of seats to be reserved
              </label>
              <input
                type="number"
                name="noOfReservedSeat"
                required
                className="form-control reservation-input"
                onChange={formInputs}
                value={noOfReservedSeat}
              />

              <label className="form-label">Special Requests</label>
              <textarea
                className="form-control"
                name="specialRequests"
                placeholder="e.g. Birthday setup..."
                rows="3"
                onChange={formInputs}
                value={specialRequests}
              ></textarea>
            </>
          )}

          {/* Navigation Buttons */}
          <div className="d-flex justify-content-between mt-5">
            <button
              type="button"
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
        </form>
      </div>
    </div>
  );
};

export default ReservationSteps;
