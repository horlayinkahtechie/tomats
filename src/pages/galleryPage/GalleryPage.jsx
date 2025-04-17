import galleryImage from "../../Images/galleryImg.jpg";
import monumentImage from "../../Images/monument.jpg";
import monumentImage2 from "../../Images/monument2.jpg";
import cocktailImg from "../../Images/cocktailimg.jpg";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import "./gallery.css";

export default function GalleryPage() {
  return (
    <>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <div className="gallery-overlay"></div>
          <img
            src={galleryImage}
            className="d-block w-100 img-fluid"
            alt="Our gallery"
            style={{ maxHeight: "87vh", minHeight: "50vh" }}
            loading="lazy"
          />
          <div className="gallery-caption section">
            <div className="gallery-brand">Gallery</div>
          </div>
        </div>
      </div>

      <div className="container-fluid mb-5 section-margin">
        <div className="row gallery-padding">
          <div className="col-md-6 monument-margin">
            <h3 className="monument-heading">A MONUMENT</h3>
            <p className="monument-p">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima
              nemo quibusdam id dolore, maiores dolorum. Rerum, voluptatibus.
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti
              magnam illo sequi necessitatibus incidunt blanditiis.
            </p>
          </div>
          <div className="col-md-6">
            <img src={monumentImage} alt="A monument" className="img-fluid" />
          </div>
          <div className="col-md-6 monument-margin">
            <img src={monumentImage2} alt="A monument" className="img-fluid" />
          </div>
          <div className="col-md-6 monument-p-margin">
            <h3 className="monument-heading">STILL DELIVERING</h3>
            <p className="monument-p">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum
              minus culpa repudiandae quam, reprehenderit atque inventore
              expedita quisquam dolorem sapiente odio similique quia? Aliquam,
              nostrum?
            </p>
            <div className="display-block mt-5">
              <Link className="menuBtn" to="/Menu">
                VIEW MENU
              </Link>
              <Link className="reservationBtn mt-4" to="/Reservation">
                MAKE A RESERVATION
              </Link>
            </div>
          </div>
          <div className="col-md-6 monument-margin">
            <h3 className="monument-heading">COCKTAIL MENU</h3>
            <p className="monument-p">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam
              minima a aspernatur animi laudantium, enim consequuntur sint
              debitis fugiat assumenda dolorum.
            </p>
            <div className="display-block mt-5">
              <Link to="/Menu" className="menuBtn">
                VIEW MENU
              </Link>
            </div>
          </div>
          <div className="col-md-6 mt-5">
            <img src={cocktailImg} alt="A monument" className="img-fluid" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
