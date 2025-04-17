import fruitImg3 from "../../Images/drinksImg.jpg";
import { Link } from "react-router-dom";

function Drinks() {
  return (
    <div className="row">
      <div className="col-md-6">
        <img
          src={fruitImg3}
          className="img-fluid"
          loading="lazy"
          alt="Local food"
        />
      </div>
      <div className="col-md-6 locals-padding">
        <h3 className="locals-heading">Explore our Drinks</h3>
        <p className="locals-p">
          Enjoy a variety of refreshing beverages, from soft drinks and juices
          to specialty cocktails and wines, perfectly paired with your meal.
        </p>

        <Link className="drinks-order-btn" to="/Menu">
          Order now
        </Link>
      </div>
    </div>
  );
}

export default Drinks;
