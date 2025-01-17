import { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Navbar({ foodFetch, clearSearchedItem }) {
  const [FoodSearch, setFoodSearch] = useState("");

  const foodSearchFunction = (e) => {
    const inputValue = e.target.value;
    setFoodSearch(inputValue);

    if (inputValue === "") {
      clearSearchedItem(); // Trigger clearing of search results
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    foodFetch(FoodSearch);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-dark">
      <div className="container-fluid">
        <div className="navbar-brand">Savour</div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="navbar-nav">
            <li className="nav-item">
              <Link
                className="nav-link active text-white"
                onClick={clearSearchedItem}
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link text-white"
                onClick={clearSearchedItem}
                to="/About"
              >
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link text-white"
                onClick={clearSearchedItem}
                to="/Gallery"
              >
                Gallery
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link text-white"
                onClick={clearSearchedItem}
                to="/Order"
              >
                Order
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link text-white"
                onClick={clearSearchedItem}
                to="/Auth/Login"
              >
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="currentColor"
                  className="bi bi-cart3"
                  viewBox="0 0 16 16"
                  style={{ fontWeight: "700" }}
                >
                  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                </svg>
              </Link>
            </li>
            <li className="nav-item">
              <form onSubmit={handleSearchSubmit} className="searchBar">
                <div className="input-container">
                  <input
                    type="text"
                    className="searchBarInput"
                    placeholder="Search for a menu"
                    value={FoodSearch} // Bind search input to state
                    onChange={foodSearchFunction}
                  />
                  <button
                    type="button"
                    className="clear-btn"
                    onClick={() => {
                      setFoodSearch(""); // Reset the input field
                      clearSearchedItem(); // Clear the search results
                    }}
                    disabled={!FoodSearch}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-x-lg"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                    </svg>
                  </button>
                </div>

                <button type="submit" className="searchBarBtn bg-dark">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="26"
                    height="26"
                    fill="currentColor"
                    className="bi bi-search"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                  </svg>
                </button>
              </form>
            </li>
          </div>
        </div>
      </div>
    </nav>
  );
}

// Add prop validation for foodFetch and clearSearchedItem
Navbar.propTypes = {
  foodFetch: PropTypes.func.isRequired,
  clearSearchedItem: PropTypes.func.isRequired,
};

export default Navbar;
