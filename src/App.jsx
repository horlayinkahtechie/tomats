import { useState } from "react";
import "./styles/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import Index from "./pages/Index";
import { Routes, Route } from "react-router-dom";
import KitchenPage from "./pages/KitchenPage";
import GalleryPage from "./pages/GalleryPage";
import EventPage from "./pages/EventPage";
import OrderPage from "./pages/OrderPage";
import SignIn from "./Authentication/Signin";
import SignUp from "./Authentication/Signup";
import MenuPage from "./pages/MenuPage";
import CocktailMenuPage from "./pages/CocktailMenuPage";
import WineMenuPage from "./pages/WineMenuPage";
import GroupMenuPage from "./pages/GroupMenuPage";
import ChildrenMenuPage from "./pages/ChildrenMenuPage";
import SteakMenuPage from "./pages/SteakMenuPage";
import ReservationPage from "./pages/ReservationPage";
import Admin from "./pages/Admin";
import Spinner from "./components/Spinner";
import SearchResults from "./components/SearchResults";
import ResetPassword from "./Authentication/ResetPassword";

import VerifyMail from "./Authentication/VerifyMail";

function App() {
  const [foodData, setFoodData] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [clearSearch, setClearSearch] = useState("");
  const [error, setError] = useState(false);

  const clearSearchedItem = () => {
    setClearSearch("");
    setIsSearching(false);
    setFoodData(null);
    setError(false);
    console.log("Search cleared!");
  };

  const foodFetch = async (foodInput) => {
    setIsLoading(true);
    // setFoodData(null);
    setError(false);
    try {
      const foodDataFetch = await fetch(
        `https://themealdb.com/api/json/v1/1/search.php?s=${foodInput}`
      );
      const fetchedData = await foodDataFetch.json();
      if (fetchedData.meals === null) {
        setError("Food cannot be found. Try search another item");
        setFoodData(null);
        setIsSearching(false);
      }
      setFoodData(fetchedData.meals);
      setIsSearching(true);
      setError(false);
      console.log(fetchedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Navbar foodFetch={foodFetch} clearSearchedItem={clearSearchedItem} />

      <div>
        {!isSearching ? (
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/About" element={<KitchenPage />} />
            <Route path="/Gallery" element={<GalleryPage />} />
            <Route path="/Event" element={<EventPage />} />
            <Route path="/Order" element={<OrderPage />} />
            <Route path="/Auth/Login" element={<SignIn />} />
            <Route path="/Auth/Signup" element={<SignUp />} />
            <Route path="/Auth/ResetPassword" element={<ResetPassword />} />
            <Route path="/Auth/VerifyMail" element={<VerifyMail />} />
            <Route path="/Menu" element={<MenuPage />} />
            <Route path="/Cocktail-menu" element={<CocktailMenuPage />} />
            <Route path="/Wine-menu" element={<WineMenuPage />} />
            <Route path="/Group-menu" element={<GroupMenuPage />} />
            <Route path="/Children-menu" element={<ChildrenMenuPage />} />
            <Route path="/Steak-menu" element={<SteakMenuPage />} />
            <Route path="/Reservation" element={<ReservationPage />} />
            <Route path="/Admin" element={<Admin />} />
          </Routes>
        ) : (
          // Render search results when searching
          <>
            {isLoading && (
              <p className="loading">
                <Spinner />
              </p>
            )}
            <SearchResults foodData={foodData} error={error} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
