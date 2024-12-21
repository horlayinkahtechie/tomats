import groupTable from "../Images/groupTable.jpg";
export default function GroupMenuPage() {
  return (
    <div className="carousel-inner">
      <div className="carousel-item active">
        <div className="gallery-overlay"></div>
        <img
          src={groupTable}
          className="d-block w-100 img-fluid"
          alt="Group menu img"
          style={{ maxHeight: "87vh", minHeight: "50vh" }}
          loading="lazy"
        />
        <div className="gallery-caption section">
          <div className="gallery-brand">Group menu</div>
        </div>
      </div>
    </div>
  );
}
