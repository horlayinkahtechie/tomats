import Footer from "../components/footer";
import wineImg from "../Images/wine.jpg";
export default function WineMenuPage() {
  return (
    <>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <div className="gallery-overlay"></div>
          <img
            src={wineImg}
            className="d-block w-100 img-fluid"
            alt="Wine img"
            style={{ maxHeight: "87vh", minHeight: "50vh" }}
            loading="lazy"
          />
          <div className="gallery-caption section">
            <div className="gallery-brand">Wine menu</div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
