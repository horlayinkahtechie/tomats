import Footer from "../components/footer";
import childrenMenuImg from "../Images/children menu.jpg";
export default function ChildrenMenuPage() {
  return (
    <>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <div className="gallery-overlay"></div>
          <img
            src={childrenMenuImg}
            className="d-block w-100 img-fluid"
            alt="..."
            style={{ maxHeight: "87vh", minHeight: "50vh" }}
            loading="lazy"
          />
          <div className="gallery-caption section">
            <div className="gallery-brand">Children Menu</div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
