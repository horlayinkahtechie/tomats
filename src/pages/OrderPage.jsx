import efoRiroImg from "../Images/efo riro img.jfif";
import afangSoupImg from "../Images/afang soup img.jfif";
import bitterLeafImg from "../Images/bitter leaf soup img.jfif";
import okroSoupImg from "../Images/okro soup img.jfif";
import Footer from "../components/footer";

export default function OrgerPage() {
  return (
    <>
      <div className="container">
        <div className="row mt-5">
          <h3 className="mt-4 item-heading">VEGETABLE</h3>
          <div className="col-md-3 item">
            <img src={efoRiroImg} className="img-fluid" alt="Efo riro" />
          </div>
          <div className="col-md-3 item">
            <img src={afangSoupImg} className="img-fluid" alt="Afang soup" />
          </div>
          <div className="col-md-3 item">
            <img
              src={bitterLeafImg}
              className="img-fluid"
              alt="Bitter leaf soup"
            />
          </div>
          <div className="col-md-3 item">
            <img src={okroSoupImg} className="img-fluid" alt="Okro Soup" />
          </div>
          <h3 className="mt-4 item-heading">DRINKS</h3>
          <div className="col-md-3 item">
            {/* An Image of the item will be here and item name will be displayed over it */}
            <h3>Chapman</h3>
          </div>
          <div className="col-md-3 item">
            {/* An Image of the item will be here and item name will be displayed over it */}
            <h3>ZOBO</h3>
          </div>
          <div className="col-md-3 item">
            {/* An Image of the item will be here and item name will be displayed over it */}
            <h3>Palmwine</h3>
          </div>
          <div className="col-md-3 item">
            {/* An Image of the item will be here and item name will be displayed over it */}
            <h3>Smoothie</h3>
          </div>
          <h3 className="mt-4 item-heading">SNACKS</h3>
          <div className="col-md-3 item">
            {/* An Image of the item will be here and item name will be displayed over it */}
            <h3>Sharwama</h3>
          </div>
          <div className="col-md-3 item">
            {/* An Image of the item will be here and item name will be displayed over it */}
            <h3>Chicken & chips</h3>
          </div>
          <div className="col-md-3 item">
            {/* An Image of the item will be here and item name will be displayed over it */}
            <h3>Meat pie</h3>
          </div>
          <div className="col-md-3 item">
            {/* An Image of the item will be here and item name will be displayed over it */}
            <h3>Egg roll</h3>
          </div>
          <h3 className="mt-4 item-heading">FOOD</h3>
          <div className="col-md-3 item">
            {/* An Image of the item will be here and item name will be displayed over it */}
            <h3>Jollof rice</h3>
          </div>
          <div className="col-md-3 item">
            {/* An Image of the item will be here and item name will be displayed over it */}
            <h3>Fried rice</h3>
          </div>
          <div className="col-md-3 item">
            {/* An Image of the item will be here and item name will be displayed over it */}
            <h3>Amala and Ewedu</h3>
          </div>
          <div className="col-md-3 item">
            {/* An Image of the item will be here and item name will be displayed over it */}
            <h3>Pounded yam</h3>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
