import { Link } from "react-router-dom";
import carouselImg2 from "../../Images/carousel-img1.jpg";
import carouselImg1 from "../../Images/carousel-img2.jpg";
import carouselImg3 from "../../Images/carousel-img-3.jpg";

const RestaurantCarousel = () => {
  return (
    <div
      id="restaurantCarousel"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      {/* Indicators */}
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#restaurantCarousel"
          data-bs-slide-to="0"
          className="active"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#restaurantCarousel"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#restaurantCarousel"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>

      {/* Slides */}
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img
            src={carouselImg1}
            className="d-block w-100 carousel-img"
            loading="lazy"
            alt="Grilled Dish"
          />
          <div className="carousel-caption bg-dark bg-opacity-50 rounded">
            <h2 className="text-white carousel-caption-heading">
              Freshly Baked Pizza
            </h2>
            <p className="carousel-caption-p">
              Enjoy dish crafted with care and finest ingredients. Every bite is
              a moment to savour.
            </p>
            <Link
              to="/menu"
              className="btn btn-warning text-white carousel-caption-link"
            >
              Order Now
            </Link>
          </div>
        </div>

        <div className="carousel-item">
          <img
            src={carouselImg2}
            className="d-block w-100 carousel-img"
            alt="Pizza"
            loading="lazy"
          />
          <div className="carousel-caption bg-dark bg-opacity-50 rounded">
            <h2 className="text-white carousel-caption-heading">
              Grilled Perfection
            </h2>
            <p className="carousel-caption-p">
              Savor our juicy grilled chicken served hot with signature sauce.
            </p>
            <Link to="/menu" className="btn btn-success carousel-caption-link">
              Order Now
            </Link>
          </div>
        </div>

        <div className="carousel-item">
          <img
            src={carouselImg3}
            className="d-block w-100 carousel-img"
            alt="Dessert"
            loading="lazy"
          />
          <div className="carousel-caption bg-dark bg-opacity-50 rounded">
            <h2 className="text-white carousel-caption-heading">
              Taste the Difference
            </h2>
            <p className="carousel-caption-p">
              Enjoy dish crafted with care and finest ingredients. Every bite is
              a moment to savour.
            </p>
            <Link
              to="/reservation"
              className="btn btn-danger carousel-caption-link"
            >
              Reserve a seat
            </Link>
          </div>
        </div>
      </div>

      {/* Controls */}
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#restaurantCarousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#restaurantCarousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default RestaurantCarousel;
