import Footer from "../components/footer";
import steakImg from "../Images/steakImg.jpg";
export default function SteakMenuPage() {
  return (
    <>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <div className="gallery-overlay"></div>
          <img
            src={steakImg}
            className="d-block w-100 img-fluid"
            alt="Wine img"
            style={{ maxHeight: "87vh", minHeight: "50vh" }}
            loading="lazy"
          />
          <div className="gallery-caption section">
            <div className="gallery-brand">Steak menu</div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
