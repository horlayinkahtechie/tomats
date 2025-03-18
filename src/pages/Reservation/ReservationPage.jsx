import { useState } from "react";
import DatePicker from "react-datepicker";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import Footer from "../../components/Footer";

export default function ReservationPage() {
  const [guests, setGuests] = useState(null);
  const [time, setTime] = useState(null);
  const [date, setDate] = useState(null);
  const [tableNo, setTableNo] = useState(null);
  const [submit, setSubmit] = useState(false);
  const [guestDetails, guestSetDetails] = useState(false);
  const [tableDetails, setTableDetails] = useState(false);
  const [dateDetails, setDateDetails] = useState(false);
  const [timeDetails, settimeDetails] = useState(false);

  const handleMouseEnter = () => guestSetDetails(true);
  const handleMouseLeave = () => guestSetDetails(false);

  const handleTableEnter = () => setTableDetails(true);
  const handleTableLeave = () => setTableDetails(false);

  const handleDateEnter = () => setDateDetails(true);
  const handleDateLeave = () => setDateDetails(false);

  const handleTimeEnter = () => settimeDetails(true);
  const handleTimeLeave = () => settimeDetails(false);

  const guestOptions = Array.from({ length: 10 }, (_, i) => ({
    value: i + 1,
    label: `${i + 1} Guest${i > 0 ? "s" : ""}`,
  }));

  const tableOptions = Array.from({ length: 5 }, (_, i) => ({
    value: i + 1,
    label: `${i + 1} Table${i > 0 ? "s" : ""}`,
  }));

  const timeOptions = [
    { value: "13:00", label: "12:00" },
    { value: "13:00", label: "12:30" },
    { value: "13:00", label: "13:00" },
    { value: "13:30", label: "13:30" },
    { value: "14:00", label: "14:00" },
    { value: "14:30", label: "14:30" },
    { value: "15:00", label: "15:00" },
    { value: "13:00", label: "15:30" },
    { value: "13:00", label: "16:00" },
    { value: "13:00", label: "16:30" },
    { value: "13:00", label: "17:00" },
  ];

  const submitFunction = () => {
    if (tableNo === null || guests === null || time === null || date === null) {
      console.log("Please Select reserve a seat before submitting");
    } else {
      setSubmit(true);

      setTimeout(() => {
        setSubmit(false);
      }, 4000);

      setTableNo(null);
      setGuests(null);
      setTime(null);
      setDate(null);
      console.log("Form submitted");
    }
  };

  return (
    <>
      <div className="container-fluid p-5">
        <div className="row">
          <div className="col-md-3 mt-5">
            <label className="selectLabel">
              Guests{" "}
              <svg
                onMouseEnter={() => handleMouseEnter()}
                onMouseLeave={() => handleMouseLeave()}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-exclamation-circle"
                viewBox="0 0 16 16"
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" />
              </svg>
            </label>
            {guestDetails && (
              <p style={{ color: "orangered" }}>
                This is a guest details. Lorem ipsum dolor sit amet. Lorem,
                ipsum.
              </p>
            )}
            <Select
              options={guestOptions}
              value={guests}
              onChange={setGuests}
              placeholder="Select guests"
              id="food-select"
              style={{ marginTop: "10px" }}
              styles={{
                control: (base) => ({
                  ...base,
                  backgroundColor: "#f0f0f0",
                  borderRadius: "8px",
                  height: "48px",
                  border: "1px solid #ccc",
                  boxShadow: "none",
                  "&:hover": {
                    borderColor: "#888",
                  },
                }),
                option: (base, state) => ({
                  ...base,
                  backgroundColor: state.isSelected
                    ? "#333"
                    : state.isFocused
                    ? "#ddd"
                    : "#fff",
                  color: state.isSelected ? "#fff" : "#333",
                  cursor: "pointer",
                  "&:active": {
                    backgroundColor: "#aaa",
                  },
                }),
                placeholder: (base) => ({
                  ...base,
                  color: "#666",
                  fontSize: "17.5px",
                }),
                singleValue: (base) => ({
                  ...base,
                  color: "#333",
                }),
                dropdownIndicator: (base) => ({
                  ...base,
                  color: "#666",
                  "&:hover": {
                    color: "#333",
                  },
                }),
              }}
            />
          </div>
          <div className="col-md-3 mt-5">
            <label className="selectLabel">
              Table{" "}
              <svg
                onMouseEnter={() => handleTableEnter()}
                onMouseLeave={() => handleTableLeave()}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-exclamation-circle"
                viewBox="0 0 16 16"
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" />
              </svg>
            </label>
            {tableDetails && (
              <p style={{ color: "orangered" }}>
                This is a Table details. Lorem ipsum dolor sit amet. Lorem,
                ipsum.
              </p>
            )}
            <Select
              options={tableOptions}
              value={tableNo}
              onChange={setTableNo}
              placeholder="Select table"
              id="food-select"
              style={{ marginTop: "10px" }}
              styles={{
                control: (base) => ({
                  ...base,
                  backgroundColor: "#f0f0f0",
                  borderRadius: "8px",
                  height: "48px",
                  border: "1px solid #ccc",
                  boxShadow: "none",
                  "&:hover": {
                    borderColor: "#888",
                  },
                }),
                option: (base, state) => ({
                  ...base,
                  backgroundColor: state.isSelected
                    ? "#333"
                    : state.isFocused
                    ? "#ddd"
                    : "#fff",
                  color: state.isSelected ? "#fff" : "#333",
                  cursor: "pointer",
                  "&:active": {
                    backgroundColor: "#aaa",
                  },
                }),
                placeholder: (base) => ({
                  ...base,
                  color: "#666",
                  fontSize: "17.5px",
                }),
                singleValue: (base) => ({
                  ...base,
                  color: "#333",
                }),
                dropdownIndicator: (base) => ({
                  ...base,
                  color: "#666",
                  "&:hover": {
                    color: "#333",
                  },
                }),
              }}
            />
          </div>
          <div className="col-md-3 mt-5">
            <label className="selectLabel">
              Time{" "}
              <svg
                onMouseEnter={() => handleTimeEnter()}
                onMouseLeave={() => handleTimeLeave()}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-exclamation-circle"
                viewBox="0 0 16 16"
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" />
              </svg>
            </label>
            {timeDetails && (
              <p style={{ color: "orangered" }}>
                This is a Time details. Lorem ipsum dolor sit amet. Lorem,
                ipsum.
              </p>
            )}
            <Select
              options={timeOptions}
              value={time}
              onChange={setTime}
              placeholder="Select time"
              id="food-select"
              styles={{
                control: (base) => ({
                  ...base,
                  backgroundColor: "#f0f0f0",
                  borderRadius: "8px",
                  height: "48px",
                  border: "1px solid #ccc",
                  boxShadow: "none",
                  "&:hover": {
                    borderColor: "#888",
                  },
                }),
                option: (base, state) => ({
                  ...base,
                  backgroundColor: state.isSelected
                    ? "#333"
                    : state.isFocused
                    ? "#ddd"
                    : "#fff",
                  color: state.isSelected ? "#fff" : "#333",
                  cursor: "pointer",
                  "&:active": {
                    backgroundColor: "#aaa",
                  },
                }),
                placeholder: (base) => ({
                  ...base,
                  color: "#666",
                  fontSize: "17.5px",
                }),
                singleValue: (base) => ({
                  ...base,
                  color: "#333",
                }),
                dropdownIndicator: (base) => ({
                  ...base,
                  color: "#666",
                  "&:hover": {
                    color: "#333",
                  },
                }),
              }}
            />
          </div>
          <div className="col-md-3 mt-5">
            <div className="col-md-12">
              <label className="selectLabel">
                Date{" "}
                <svg
                  onMouseEnter={() => handleDateEnter()}
                  onMouseLeave={() => handleDateLeave()}
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-exclamation-circle"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                  <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" />
                </svg>
              </label>
              {dateDetails && (
                <p style={{ color: "orangered" }}>
                  This is a date details. Lorem ipsum dolor sit amet. Lorem,
                  ipsum.
                </p>
              )}
            </div>
            <DatePicker
              selected={date}
              onChange={(date) => setDate(date)}
              placeholderText="Select date"
              dateFormat="EEE, dd MMM"
              minDate={new Date()}
              inline
            />
          </div>
        </div>
        <div className="container-fluid p-5 result-display">
          <div className="row">
            <div className="col-md-3">
              <p className="selected-result">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="60"
                  height="60"
                  fill="currentColor"
                  className="bi bi-people-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
                </svg>{" "}
                {guests ? guests.label : "0 guest selected"}
              </p>
            </div>
            <div className="col-md-3">
              <p className="selected-result">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="60"
                  height="60"
                  fill="currentColor"
                  className="bi bi-table"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm15 2h-4v3h4zm0 4h-4v3h4zm0 4h-4v3h3a1 1 0 0 0 1-1zm-5 3v-3H6v3zm-5 0v-3H1v2a1 1 0 0 0 1 1zm-4-4h4V8H1zm0-4h4V4H1zm5-3v3h4V4zm4 4H6v3h4z" />
                </svg>{" "}
                {tableNo ? tableNo.label : "Select table"}
              </p>
            </div>
            <div className="col-md-3">
              <p className="selected-result">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="60"
                  height="60"
                  fill="currentColor"
                  className="bi bi-clock-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z" />
                </svg>{" "}
                {time ? time.label : "No time selected"}
              </p>
            </div>
            <div className="col-md-3">
              <p className="selected-result">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="60"
                  height="60"
                  fill="currentColor"
                  className="bi bi-calendar-day-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4zM16 14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V5h16zm-4.785-6.145a.428.428 0 1 0 0-.855.426.426 0 0 0-.43.43c0 .238.192.425.43.425m.336.563h-.672v4.105h.672zm-6.867 4.105v-2.3h2.261v-.61H4.684V7.801h2.464v-.61H4v5.332zm3.296 0h.676V9.98c0-.554.227-1.007.953-1.007.125 0 .258.004.329.015v-.613a2 2 0 0 0-.254-.02c-.582 0-.891.32-1.012.567h-.02v-.504H7.98z" />
                </svg>{" "}
                {date
                  ? date.toLocaleDateString("en-GB", {
                      weekday: "short",
                      day: "numeric",
                      month: "short",
                    })
                  : "No date selected"}
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-12">
          <button
            onClick={() => submitFunction()}
            className="submit-reservation-btn"
            type="button"
          >
            Reserve a seat
          </button>{" "}
          {submit && (
            <p style={{ color: "green", fontSize: "23px", display: "inline" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                fill="currentColor"
                className="bi bi-check-circle-fill"
                viewBox="0 0 16 16"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
              </svg>
            </p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
