import { Link } from "react-router-dom";
export default function Welcome() {
  return (
    <div className="container-fluid welcome">
      <div className="col-md-12 welcome-heading">
        Welcome to Tomats - Your Culinary Haven
      </div>
      <div className="col-md-12 welcome-p">
        At Tomats Restaurant, we combine a warm, inviting ambiance with
        exceptional culinary craftsmanship to create unforgettable dining
        experiences. Specializing in a fusion of traditional and contemporary
        flavors, our menu features handpicked dishes crafted from the freshest
        ingredients. Whether you&apos;re savoring our signature cocktails,
        indulging in a perfectly grilled steak, or exploring our vegetarian
        delights, every meal is a celebration of taste. Our mission is simple:
        to bring people together over great food, impeccable service, and a
        vibrant atmosphere that feels like home.
      </div>
      <div className="col-md-12 mt-4">
        <button type="button" className="welcome-btn">
          <Link
            style={{ color: "orangered", textDecoration: "none" }}
            to="/About"
          >
            More about us
          </Link>
        </button>
      </div>
    </div>
  );
}
