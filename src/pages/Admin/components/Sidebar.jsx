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

      <ul className="nav nav-pills mb-auto p-3">
        <li className="nav-item">
          <Link
            to="/admin/overview"
            className={`nav-link ${
              location.pathname === "/admin/overview"
                ? "active bg-primary"
                : "text-white"
            }`}
          >
            Overview
          </Link>
          <Link
            to="/admin/orders"
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
            to="/admin/reservations"
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
            to="/settings"
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
