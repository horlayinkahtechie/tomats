import Footer from "../../../components/Footer";
import Sidebar from "../components/Sidebar";

export default function Reservations() {
  return (
    <>
      <div className="container-fluid mb-5">
        <div className="row">
          <div className="col-md-3" style={{ padding: "0px", margin: "0px" }}>
            <Sidebar />
          </div>
          <div className="col-md-9 mt-5">
            <p className="orders-title">Reservations</p>

            <table className="orders-table">
              <thead>
                <tr>
                  <th>Seat No</th>
                  <th>Reservation date</th>
                  <th>E-mail</th>
                  <th>Payment Method</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>10</td>
                  <td>Aug 10, 2025</td>
                  <td>abdulsalamalao57@gmail.com</td>
                  <td>Payment on delivery</td>
                </tr>

                <tr>
                  <td>10</td>
                  <td>Aug 10, 2025</td>
                  <td>abdulsalamalao57@gmail.com</td>
                  <td>Payment on delivery</td>
                </tr>

                <tr>
                  <td>10</td>
                  <td>Aug 10, 2025</td>
                  <td>abdulsalamalao57@gmail.com</td>
                  <td>Payment on delivery</td>
                </tr>

                <tr>
                  <td>10</td>
                  <td>Aug 10, 2025</td>
                  <td>abdulsalamalao57@gmail.com</td>
                  <td>Payment on delivery</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
