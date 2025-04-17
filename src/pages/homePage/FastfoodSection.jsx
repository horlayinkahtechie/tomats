import { useState } from "react";
import fruitImg3 from "../../Images/foodImg4.webp";
import vegetableImg1 from "../../Images/vegetableImg1.jpg";
import vegetableImg2 from "../../Images/vegetableImg2.jpg";

import snackImg1 from "../../Images/snackImg1.jpg";
import snackImg2 from "../../Images/snackImg2.jpg";
import snackImg3 from "../../Images/snackImg3.jpg";

import pastriesImg1 from "../../Images/pastriesImg1.jpg";
import pastriesImg2 from "../../Images/pastriesImg2.jpg";
import pastriesImg3 from "../../Images/pastriesImg3.jpg";

function FastfoodSection() {
  const [serviceNav, setServiceNav] = useState(1);

  const serviceNavClick = (navId) => {
    setServiceNav(navId);
  };

  return (
    <>
      <ul className="">
        <li className="list-item">
          <button
            onClick={() => serviceNavClick(1)}
            style={{
              borderBottom: serviceNav === 1 ? "3px solid orangered" : "black",
            }}
          >
            Vegetables
          </button>
        </li>
        <li className="list-item">
          <button
            onClick={() => serviceNavClick(2)}
            style={{
              borderBottom: serviceNav === 2 ? "3px solid orangered" : "black",
            }}
          >
            Snacks
          </button>
        </li>
        <li className="list-item">
          <button
            onClick={() => serviceNavClick(3)}
            style={{
              borderBottom: serviceNav === 3 ? "3px solid orangered" : "black",
            }}
          >
            Pastries
          </button>
        </li>
      </ul>
      {serviceNav === 1 && (
        <div className="row p-2">
          <div className="col-md-4 mt-3">
            <div className="fast-foods">
              <img
                src={vegetableImg1}
                alt="Fruit Image"
                loading="lazy"
                className="offer-img img-fluid"
              />
              <div className="food-details">
                <h3 className="foodtype-heading">KALAE CEASER</h3>
                <p className="foodtype-p">
                  Roasted chicken, tomatoes, shaved parsmen, shredded kale,
                  chopped lime, caeser
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mt-3">
            <div className="fast-foods">
              <img
                src={vegetableImg2}
                alt="Fruit Image"
                loading="lazy"
                className="offer-img img-fluid"
              />
              <div className="food-details">
                <h3 className="foodtype-heading">VEGETABLE SALAD</h3>
                <p className="foodtype-p">
                  Fried chopped cuccumber, chopped carrot, chopped watermelon,
                  chopped lime
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mt-3">
            <div className="fast-foods">
              <img
                src={fruitImg3}
                alt="Fruit Image"
                loading="lazy"
                className="offer-img img-fluid"
              />
              <div className="food-details">
                <h3 className="foodtype-heading">VEGETABLE SALAD</h3>
                <p className="foodtype-p">
                  Fried chopped cuccumber, chopped carrot, chopped watermelon,
                  chopped lime
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      {serviceNav === 2 && (
        <div className="row p-2">
          <div className="col-md-4 mt-3">
            <div className="fast-foods">
              <img
                src={snackImg1}
                alt="Fruit Image"
                loading="lazy"
                className="offer-img img-fluid"
              />
              <div className="food-details">
                <h3 className="foodtype-heading">HAMBURGER</h3>
                <p className="foodtype-p">
                  A popular type of sandwich that consists of a cooked patty of
                  ground meat, placed inside a sliced bun.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mt-3">
            <div className="fast-foods">
              <img
                loading="lazy"
                src={snackImg2}
                alt="Fruit Image"
                className="offer-img img-fluid"
              />
              <div className="food-details">
                <h3 className="foodtype-heading">VANILA FLAVOURED PIZZA</h3>
                <p className="foodtype-p">
                  Fried chopped cuccumber, chopped carrot, chopped watermelon,
                  chopped lime
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mt-3">
            <div className="fast-foods">
              <img
                loading="lazy"
                src={snackImg3}
                alt="Fruit Image"
                className="offer-img img-fluid"
              />

              <div className="food-details">
                <h3 className="foodtype-heading">PRETZELS</h3>
                <p className="foodtype-p">
                  A type of baked bread product, often twisted into a knot
                  shape, that can be soft or crunchy.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      {serviceNav === 3 && (
        <div className="row p-2">
          <div className="col-md-4 mt-3">
            <div className="fast-foods">
              <img
                loading="lazy"
                src={pastriesImg1}
                alt="Fruit Image"
                className="offer-img img-fluid"
              />
              <div className="food-details">
                <h3 className="foodtype-heading">CROSSIANT</h3>
                <p className="foodtype-p">
                  A flaky, buttery, crescent-shaped pastry that is a staple in
                  French cuisine.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mt-3">
            <div className="fast-foods">
              <img
                loading="lazy"
                src={pastriesImg2}
                alt="Fruit Image"
                className="offer-img img-fluid"
              />
              <div className="food-details">
                <h3 className="foodtype-heading">ÉCLAIR</h3>
                <p className="foodtype-p">
                  A French pastry made from choux dough filled with cream and
                  topped with chocolate icing.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mt-3">
            <div className="fast-foods">
              <img
                loading="lazy"
                src={pastriesImg3}
                alt="Fruit Image"
                className="offer-img img-fluid"
              />
              <div className="food-details">
                <h3 className="foodtype-heading">DANISH PASTRY</h3>
                <p className="foodtype-p">
                  A sweet, multilayered pastry filled with ingredients like
                  fruit, cream cheese, or custard, often with a glazed finish.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default FastfoodSection;
