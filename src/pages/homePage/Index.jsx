import Carousel from "./Carousel";
import FastfoodSection from "./FastfoodSection";
import LocalsSection from "./LocalsSection";
import Drinks from "./Drinks";
import Ourkitchensection from "./Ourkitchensection";
import Footer from "../../components/Footer";
import "./style.css";

export default function Index() {
  return (
    <>
      <Carousel />

      {/* Lunch list section */}
      <div className="service-margin">
        <h3 className="text-center service-heading">Fast food</h3>
        <FastfoodSection />
      </div>

      <div className="locals-section-bg-color">
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
