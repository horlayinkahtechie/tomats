import Sidebar from "../components/Sidebar";

export default function Orders() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <Sidebar />
        </div>
        <div className="col-md-8 mt-5">
          <p className="orders-title">Orders</p>

          <table className="orders-table">
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Total Amount</th>
                <th>Delivery Address</th>
                <th>Payment Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Rice</td>
                <td>$20</td>
                <td>4, Hill Valley Estate</td>
                <td>Paid</td>
              </tr>
              <tr>
                <td>Spaghetti</td>
                <td>$15</td>
                <td>25, Ocean Drive</td>
                <td>Pending</td>
              </tr>
              <tr>
                <td>Chicken</td>
                <td>$10</td>
                <td>12, Greenfield Close</td>
                <td>Paid</td>
              </tr>

              <tr>
                <td>Chicken</td>
                <td>$10</td>
                <td>12, Greenfield Close</td>
                <td>Pending</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
