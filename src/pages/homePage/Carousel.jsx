import foodImage from "../../Images/food.webp";
import "./style.css";

import { Link } from "react-router-dom";
function Carousel() {
  return (
    <div>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <div className="carousel-overlay"></div>
          <img
            src={foodImage}
            className="d-block w-100 img-fluid"
            alt="..."
            style={{ maxHeight: "87vh", minHeight: "62vh" }}
            loading="lazy"
          />
          <div className="carousel-caption section">
            <h5 className="carousel-heading">
              Taste the <span className="highlight-carousel">Difference</span>
            </h5>
            <h5 className="carousel-description">
              Enjoy dishes crafted with care and the finest ingredients. Every
              bite is a moment to savor.
            </h5>
            <button type="button" className="reservation-btn">
              <Link
                style={{ color: "white", textDecoration: "none" }}
                to="/Reservation"
              >
                Make a reservation
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Carousel;
