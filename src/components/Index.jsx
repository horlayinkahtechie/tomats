import Carousel from "./Carousel";
import FastfoodSection from "./FastfoodSection";
import LocalsSection from "./LocalsSection";
import Drinks from "./Drinks";
import Ourkitchensection from "./Ourkitchensection";
import TrustWorthinessSection from "./TrustworthinessSection";
// import OurImages from "./OurImages";
import Footer from "./footer";

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
      <div className="container-fluid our-images">{/* <OurImages /> */}</div>
      <div className="container-fluid trustworthiness-section">
        <TrustWorthinessSection />
      </div>

      <Footer />
    </>
  );
}
