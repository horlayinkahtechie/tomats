import Carousel from "../components/Carousel";
import FastfoodSection from "../components/FastfoodSection";
import LocalsSection from "../components/LocalsSection";
import Drinks from "../components/Drinks";
import Ourkitchensection from "../components/Ourkitchensection";
import Footer from "../components/Footer";

export default function Index() {
  return (
    <>
      <div className="container-fluid carousel-section">
        <Carousel />
      </div>
      {/* Lunch list section */}
      <div className="container-fluid service-margin">
        <h3 className="text-center service-heading">Fast food</h3>
        <FastfoodSection />
      </div>

      <div className="container-fluid locals-section-bg-color">
        <LocalsSection />
      </div>
      <div className="container-fluid drinks-section-bg-color">
        <Drinks />
      </div>
      <div className="container-fluid kitchen-section">
        <Ourkitchensection />
      </div>

      <Footer />
    </>
  );
}
