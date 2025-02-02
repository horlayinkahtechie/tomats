import { useState } from "react";
import kitchenImg from "../Images/kitchenImg1.jpg";
import restaurantImg from "../Images/restaurantImg2.jpg";
import customerSatisfactionImg from "../Images/customerSatisfactionImg.jpg";

function Ourkitchensection() {
  const [nextKitchenSection, setNextKitchenSection] = useState(1);

  const nextKitchen = () => {
    const sectionIndex = nextKitchenSection + 1;
    if (sectionIndex <= 3) {
      setNextKitchenSection(sectionIndex);
    }
  };

  const prevKitchen = () => {
    const sectionIndex = nextKitchenSection - 1;
    if (sectionIndex >= 1) {
      setNextKitchenSection(sectionIndex);
    }
  };

  return (
    <>
      <div className="row mt-4 navigation-padding">
        <div className="col-md-6">
          <p className="our-kitchen-nav-h">A REASON TO IMAGINE.</p>
        </div>
        <div className="col-md-4 slide-arr-btn-parent">
          <button type="button" className="slide-arr" onClick={prevKitchen}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              fill="currentColor"
              className="bi bi-arrow-left-circle-fill"
              viewBox="0 0 16 16"
            >
              <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
            </svg>
          </button>
          <button type="button" className="slide-arr" onClick={nextKitchen}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              fill="currentColor"
              className="bi bi-arrow-right-circle-fill"
              viewBox="0 0 16 16"
            >
              <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
            </svg>
          </button>
        </div>
      </div>
      {nextKitchenSection === 1 && (
        <div className="row kitchen-padding">
          <div className="col-md-4">
            <h3 className="ourkitchenheading">OUR KITCHEN</h3>
            <p className="ourkitchen-p">
              Our kitchen is maintained to the highest standards of cleanliness
              and hygiene. We take pride in ensuring a spotless environment
              where every meal is prepared with care.
            </p>
          </div>
          <div className="col-md-8 img-padding">
            <img src={kitchenImg} alt="Kitchen Image" className="img-fluid" />
          </div>
        </div>
      )}
      {nextKitchenSection === 2 && (
        <div className="row p-5">
          <div className="col-md-4">
            <h3 className="ourkitchenheading">OUR DINING</h3>
            <p className="ourkitchen-p">
              Our spacious seating, tasteful décor, and attentive service create
              the perfect setting for you to relax and savor our delicious
              dishes.
            </p>
          </div>
          <div className="col-md-8 img-padding">
            <img
              src={restaurantImg}
              alt="Kitchen Image"
              className="img-fluid"
            />
          </div>
        </div>
      )}

      {nextKitchenSection === 3 && (
        <div className="row p-5">
          <div className="col-md-4">
            <h3 className="ourkitchenheading">CUSTOMER SATISFACTION</h3>
            <p className="ourkitchen-p">
              At our restaurant, customer satisfaction is our top priority. We
              are committed to providing you with an exceptional dining
              experience, from the moment you walk in until the last bite.
            </p>
          </div>
          <div className="col-md-8 img-padding">
            <img
              src={customerSatisfactionImg}
              alt="Kitchen Image"
              className="img-fluid"
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Ourkitchensection;
