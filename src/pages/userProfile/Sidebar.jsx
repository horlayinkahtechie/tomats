import { Link, useLocation } from "react-router-dom";
import Logout from "../../components/Authentication/Logout";

function Sidebar() {
  const location = useLocation(); // Get the current URL

  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark"
      style={{ width: "350px", height: "85vh" }}
    >
      <hr />

      <ul className="nav nav-pills mb-auto">
        <li className="nav-item">
          <Link
            style={{ width: "250px" }}
            to="/user/present-orders"
            className={`nav-link ${
              location.pathname === "/user/present-orders"
                ? "active bg-primary"
                : "text-white"
            }`}
          >
            Present Orders
          </Link>
        </li>
        <li>
          <Link
            to="/user/past-orders"
            style={{ width: "250px" }}
            className={`nav-link ${
              location.pathname === "/user/past-orders"
                ? "active bg-primary"
                : "text-white"
            }`}
          >
            Past Orders
          </Link>
        </li>
        <li>
          <Link
            to="/reservations"
            style={{ width: "250px" }}
            className={`nav-link ${
              location.pathname === "/reservations"
                ? "active bg-primary"
                : "text-white"
            }`}
          >
            Reservations
          </Link>
        </li>
        <li>
          <Link
            style={{ width: "250px" }}
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
