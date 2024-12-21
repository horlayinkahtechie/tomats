import foodSafety from "../Images/foodsafetypackaging.jpg";
import testimonialsImg1 from "../Images/manImage2.jpg";
import dinngImage1 from "../Images/diningImage.jpg";
import diningImage2 from "../Images/diningImg2.jpg";
import diningImage3 from "../Images/diningImage3.jpg";
import diningImage4 from "../Images/diningImg4.jpg";
import kitchenImage1 from "../Images/kitchenImage1.jpg";
import kitchenImage2 from "../Images/kitchenImage2.jpg";
import kitchenImage3 from "../Images/KitchenImage3.jpg";
import kitchenImage4 from "../Images/kitchenImage4.jpg";
import ChefDetails from "./ChefDetails";
import Footer from "./footer";

export default function KitchenPage() {
  return (
    <>
      <div className="container-fluid bg-color">
        <div className="row p-5">
          <div className="col-md-6">
            <img
              className="img-fluid"
              src={foodSafety}
              alt="Food safety Image"
            />
          </div>
          <div className="col-md-6 kitchen-intro">
            <p className="kitchenIntroHeading">Your foods are safe</p>
            <p className="kitchenintroparagraph">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam
              id ullam optio consequatur non esse.
            </p>
          </div>

          <div className="col-md-12 section-margin">
            <h3 className="ourEnvironmentHeading">OUR ENVIRONMENT</h3>
            <p className="ourEnvironmentP">
              We do not only provide one of the best dishes you could imagine
              of. We also have a quality, neat and human friendly environment.
              From a nice background to take amazing picture to look back on, to
              our well arranged and comfortable settings.
            </p>
          </div>

          <div className="col-md-12 section-margin">
            <h3 className="chef-heading">MEET OUR CHEFS</h3>
            <p className="chef-p">
              Behind every food you taste in our restaurant is a chef that makes
              sure it tastes nice before reaching you
            </p>
          </div>

          <ChefDetails />

          <div className="row section-margin">
            <h3 className="ourEnvironmentHeading mb-5">OUR BEAUTIFUL INDOOR</h3>
            <div className="col-md-3 mt-3">
              <img
                src={dinngImage1}
                className="img-fluid"
                alt="Kitchen Image"
              />
            </div>
            <div className="col-md-3 mt-3">
              <img
                src={diningImage2}
                className="img-fluid"
                alt="Kitchen Image"
              />
            </div>
            <div className="col-md-3 mt-3">
              <img
                src={diningImage3}
                className="img-fluid"
                alt="Kitchen Image"
              />
            </div>
            <div className="col-md-3 mt-3">
              <img
                src={diningImage4}
                className="img-fluid"
                alt="Kitchen Image"
              />
            </div>
          </div>
          <div className="row section-margin">
            <h3 className="ourEnvironmentHeading mb-5">WHERE WE COOK</h3>
            <div className="col-md-3 mt-3">
              <img
                src={kitchenImage1}
                className="img-fluid"
                alt="Kitchen Image"
              />
            </div>
            <div className="col-md-3 mt-3">
              <img
                src={kitchenImage2}
                className="img-fluid"
                alt="Kitchen Image"
              />
            </div>
            <div className="col-md-3 mt-3">
              <img
                src={kitchenImage3}
                className="img-fluid"
                alt="Kitchen Image"
              />
            </div>
            <div className="col-md-3 mt-3">
              <img
                src={kitchenImage4}
                className="img-fluid"
                alt="Kitchen Image"
              />
            </div>
          </div>

          <div className="row section-margin">
            <div className="col-md-6 border-right">
              <h3 className="custom-meal-heading">Want a custom meal?</h3>
              <p className="custom-meal-p">
                We can always help you with a custom meal, you can also browse
                our available meal in the search bar or go to order page.
              </p>
              <button type="button" className="custom-meal-btn">
                Order a custom meal
              </button>
            </div>
            <div className="col-md-6 border-left">
              <h3 className="custom-meal-heading">Want to host a party</h3>
              <p className="custom-meal-p">
                You can also call us to help you cook at your party for a
                discounted price. Let us help you cook a delicous food. Order us
                now!
              </p>
              <button type="button" className="custom-meal-btn">
                Book us now
              </button>
            </div>
          </div>

          <div className="row section-padding section-margin">
            <div className="col-md-8">
              <h3 className="customerName">Customer Name1</h3>
              <p className="customer-review">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit,
                eum.
              </p>
            </div>
            <div className="col-md-4">
              <img
                src={testimonialsImg1}
                alt="Testimonials"
                className="img-fluid"
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
