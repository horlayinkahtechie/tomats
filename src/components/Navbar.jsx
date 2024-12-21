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
                to="/Login"
              >
                Login
              </Link>
            </li>
            <li className="nav-item">
              <form onSubmit={handleSearchSubmit} className="searchBar">
                <input
                  type="text"
                  className="searchBarInput"
                  placeholder="Search for a menu"
                  value={FoodSearch} // Bind search input to state
                  onChange={foodSearchFunction}
                />
                <button type="submit" className="searchBarBtn">
                  Search
                </button>
                <button
                  type="button"
                  className="searchBarBtn" // Add your clear button
                  onClick={clearSearchedItem}
                  disabled={!FoodSearch}
                >
                  Clear
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
