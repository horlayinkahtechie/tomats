import ourImages1 from "../Images/ourImage1.jpg";
import ourImages2 from "../Images/ourImage2.jpg";
import { useState } from "react";
import snackImage3 from "../Images/snackImg3.jpg";

function OurImages() {
  const [nextSlide, setNextSlide] = useState(1);

  const nextSlideFunctionality = () => {
    const toNextSlide = nextSlide + 1;
    if (toNextSlide <= 5) {
      setNextSlide(toNextSlide);
    }
  };

  const prevSlideFunctionality = () => {
    const toNextSlide = nextSlide - 1;
    if (toNextSlide >= 1) {
      setNextSlide(toNextSlide);
    }
  };
  return (
    <>
      <h3 className="gallery-heading">Our Gallery</h3>
      <p className="gallery-p">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi totam
        distinctio ullam!
      </p>

      <div className="slide-controls">
        <button
          type="button"
          className="left-slide-btn"
          onClick={prevSlideFunctionality}
        >
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
        <button
          type="button"
          className="right-slide-btn"
          onClick={nextSlideFunctionality}
        >
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

      {nextSlide === 1 && (
        <div className="col-md-12">
          <div className="gallery-slide">
            <img src={ourImages1} alt="Kitchen Image" className="img-fluid" />
          </div>
        </div>
      )}
      {nextSlide === 2 && (
        <div className="col-md-12">
          <div className="gallery-slide">
            <img src={ourImages2} alt="Kitchen Image" className="img-fluid" />
          </div>
        </div>
      )}
      {nextSlide === 3 && (
        <div className="col-md-12">
          <div className="gallery-slide">
            <img src={snackImage3} alt="Kitchen Image" className="img-fluid" />
          </div>
        </div>
      )}
    </>
  );
}

export default OurImages;
