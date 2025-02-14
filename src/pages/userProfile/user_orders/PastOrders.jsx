import Sidebar from "../Sidebar";
import Footer from "../../../components/Footer";

function PastOrders() {
  return (
    <>
      <div className=" container-fluid">
        <div className="row">
          <div className="col-md-3" style={{ padding: "0px", margin: "0px" }}>
            <Sidebar />
          </div>
          <div className="col-md-9 mt-5">
            <p style={{ color: "black", fontSize: "26px" }}>Your Past Orders</p>
          </div>
        </div>
      </div>
      <Footer />
      {/* </div> */}
    </>
  );
}

export default PastOrders;
