// export default function UserReservations() {
//   return (
//     <div
//       className="container"
//       style={{ padding: "60px", backgroundColor: "rgb(210, 210, 210)" }}
//     >
//       <div className="row">
//         <div className="col-md-2">
//           <p>Progress</p>
//         </div>
//         <div className="col-md-10">
//           <form action="">
//             <label htmlFor="" className="form-label">
//               First Name
//             </label>
//             <input
//               type="text"
//               placeholder="Your firstname"
//               className="form-control"
//             />
//             <label htmlFor="" className="form-label mt-4">
//               Last Name
//             </label>
//             <input
//               type="text"
//               placeholder="Your firstname"
//               className="form-control"
//             />
//             <label htmlFor="" className="form-label mt-4">
//               Username
//             </label>
//             <input
//               type="text"
//               placeholder="Your firstname"
//               className="form-control"
//             />

//             <div className="d-flex gap-5 mt-4">
//               <button
//                 type="button"
//                 className="btn btn-dark"
//                 style={{ width: "200px", fontSize: "19px", height: "45px" }}
//               >
//                 Previous
//               </button>
//               <button
//                 type="button"
//                 className="btn btn-outline-dark"
//                 style={{ width: "200px", fontSize: "19px", height: "45px" }}
//               >
//                 Next
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./reservationStyle.css";

const ReservationSteps = () => {
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  const nextStep = () => setStep((prev) => Math.min(prev + 1, totalSteps));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <div
      className="container"
      style={{
        paddingLeft: "90px",
        paddingRight: "90px",
        paddingBottom: "60px",
      }}
    >
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
            <>
              <label
                htmlFor=""
                className="form-label"
                style={{
                  fontSize: "18.3px",
                  fontWeight: "400",
                  marginBottom: "15px",
                  marginTop: "15px",
                }}
              >
                First Name
              </label>
              <input
                type="text"
                placeholder="Your firstname"
                className="form-control"
              />
              <label
                htmlFor=""
                className="form-label"
                style={{
                  fontSize: "18.3px",
                  fontWeight: "400",
                  marginBottom: "15px",
                  marginTop: "15px",
                }}
              >
                Last Name
              </label>
              <input
                type="text"
                placeholder="Your firstname"
                className="form-control reservation-input"
              />
              <label
                htmlFor=""
                className="form-label"
                style={{
                  fontSize: "18.3px",
                  fontWeight: "400",
                  marginBottom: "15px",
                  marginTop: "15px",
                }}
              >
                Username
              </label>
              <input
                type="text"
                placeholder="Your firstname"
                className="form-control"
              />
            </>
          )}
          {step === 2 && (
            <>
              <label className="form-label">Email</label>
              <input
                type="email"
                placeholder="Your email"
                className="form-control"
              />
              <label className="form-label mt-3">Phone Number</label>
              <input
                type="text"
                placeholder="Your phone number"
                className="form-control"
              />
            </>
          )}
          {step === 3 && (
            <>
              <label className="form-label">Reservation Date</label>
              <input type="date" className="form-control" />
              <label className="form-label mt-3">Time</label>
              <input type="time" className="form-control" />
            </>
          )}
          {step === 4 && (
            <>
              <label className="form-label">Number of Guests</label>
              <input type="number" className="form-control" />
              <label className="form-label mt-3">Special Requests</label>
              <textarea
                className="form-control"
                placeholder="Any special requests..."
                rows="3"
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
          className="btn btn-outline-primary"
          onClick={nextStep}
          disabled={step === totalSteps}
          style={{ width: "180px", fontSize: "19px", height: "45px" }}
        >
          {step === totalSteps ? "Submit" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default ReservationSteps;
