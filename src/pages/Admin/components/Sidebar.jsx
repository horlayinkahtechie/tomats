import { Link, useLocation } from "react-router-dom";
import Logout from "../../../components/Authentication/Logout";

function Sidebar() {
  const location = useLocation(); // Get the current URL

  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark"
      style={{ width: "350px", height: "85vh" }}
    >
      <hr />

      <ul className="nav nav-pills mb-auto ">
        <li className="nav-item">
          <Link
            style={{ width: "250px" }}
            to="/admin/overview"
            className={`nav-link ${
              location.pathname === "/admin/overview"
                ? "active bg-primary"
                : "text-white"
            }`}
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/admin/orders"
            style={{ width: "250px" }}
            className={`nav-link ${
              location.pathname === "/admin/orders"
                ? "active bg-primary"
                : "text-white"
            }`}
          >
            Orders
          </Link>
        </li>
        <li>
          <Link
            to="/admin/delivered-orders"
            style={{ width: "250px" }}
            className={`nav-link ${
              location.pathname === "/admin/delivered-orders"
                ? "active bg-primary"
                : "text-white"
            }`}
          >
            Delivered Orders
          </Link>
        </li>
        <li>
          <Link
            to="/admin/canceled-orders"
            style={{ width: "250px" }}
            className={`nav-link ${
              location.pathname === "/admin/canceled-orders"
                ? "active bg-primary"
                : "text-white"
            }`}
          >
            Canceled Orders
          </Link>
        </li>
        <li>
          <Link
            to="/admin/reservations"
            style={{ width: "250px" }}
            className={`nav-link ${
              location.pathname === "/admin/reservations"
                ? "active bg-primary"
                : "text-white"
            }`}
          >
            Reservations
          </Link>
        </li>
        <li>
          <Link
            to="/#"
            style={{ width: "250px" }}
            className={`nav-link ${
              location.pathname === "/#" ? "active bg-primary" : "text-white"
            }`}
          >
            Insert product
          </Link>
        </li>
        <li>
          <Link
            style={{ width: "250px" }}
            to="#"
            className={`nav-link ${
              location.pathname === "/settings"
                ? "active bg-primary"
                : "text-white"
            }`}
          >
            Settings
          </Link>
        </li>
      </ul>
      <hr />
      <button
        type="button"
        style={{
          outline: "none",
          border: "none",
          padding: "20px",
          fontSize: "19px",
        }}
        onClick={Logout}
      >
        Log out
      </button>
    </div>
  );
}

export default Sidebar;
