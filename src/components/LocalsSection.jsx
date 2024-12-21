import fruitImg3 from "../Images/localfoodImg.jpg";
function LocalsSection() {
  return (
    <div className="row explore-locals">
      <div className="col-md-6 locals-padding">
        <h3 className="locals-heading">Explore the Locals</h3>
        <p className="locals-p">
          Local Food Savor the rich flavors of our local dishes, made with
          authentic ingredients and traditional recipes. Experience the taste of
          home with every bite.
        </p>
        <button type="button" className="order-btn">
          Order now
        </button>
      </div>
      <div className="col-md-6 mt-4">
        <img src={fruitImg3} className="img-fluid" alt="Local food" />
      </div>
    </div>
  );
}

export default LocalsSection;
