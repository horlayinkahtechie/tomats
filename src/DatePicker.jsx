import { useState } from "react";
import DatePicker from "react-datepicker";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";

function DateAndTimePicker() {
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [guests, setGuests] = useState(null);

  const guestOptions = Array.from({ length: 10 }, (_, i) => ({
    value: i + 1,
    label: `${i + 1} Guest${i > 0 ? "s" : ""}`,
  }));

  const timeOptions = [
    { value: "13:00", label: "13:00" },
    { value: "13:30", label: "13:30" },
    { value: "14:00", label: "14:00" },
    { value: "14:30", label: "14:30" },
    // Add more times as needed
  ];

  return (
    <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
      <div>
        <label>Guests</label>
        <Select
          options={guestOptions}
          value={guests}
          onChange={setGuests}
          placeholder="Select guests"
        />
      </div>

      <div>
        <label>Time</label>
        <Select
          options={timeOptions}
          value={time}
          onChange={setTime}
          placeholder="Select time"
        />
      </div>

      <div>
        <label>Date</label>
        <Select
          options={
            <DatePicker
              selected={date}
              onChange={(date) => setDate(date)}
              placeholderText="Select date"
              dateFormat="EEE, dd MMM" // Formats as "Tue, 25 Oct"
              minDate={new Date()} // Optional: prevents selecting past dates
              inline
            />
          }
          placeholder="Select Date"
        />
      </div>

      {/* Display selected values */}
      <div>
        <p>
          <strong>Selected:</strong> <br />
          {guests ? guests.label : "No guests selected"},{" "}
          {time ? time.label : "No time selected"},{" "}
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
  );
}

export default DateAndTimePicker;
