import { useState } from "react";
import "./App.css";
import "./ResponsiveStyle.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import Index from "./components/Index";
import { Routes, Route } from "react-router-dom";
import KitchenPage from "./components/KitchenPage";
import GalleryPage from "./components/GalleryPage";
import EventPage from "./components/EventPage";
import OrderPage from "./components/OrderPage";
import LoginPage from "./components/LoginPage";
import MenuPage from "./components/MenuPage";
import CocktailMenuPage from "./components/CocktailMenuPage";
import WineMenuPage from "./components/WineMenuPage";
import GroupMenuPage from "./components/GroupMenuPage";
import ChildrenMenuPage from "./components/ChildrenMenuPage";
import SteakMenuPage from "./components/SteakMenuPage";
import ReservationPage from "./ReservationPage";
import Admin from "./Admin";

function App() {
  const [foodData, setFoodData] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [clearSearch, setClearSearch] = useState("");
  const [error, setError] = useState(false);

  const clearSearchedItem = () => {
    setClearSearch("");
    setIsSearching(false);
    setFoodData(null);
    setError(null);
    console.log("Search cleared!");
  };

  const foodFetch = async (foodInput) => {
    setIsLoading(true);
    setFoodData(null);
    setError(false);
    try {
      const foodDataFetch = await fetch(
        `https://themealdb.com/api/json/v1/1/search.php?s=${foodInput}`
      );
      const fetchedData = await foodDataFetch.json();
      if (fetchedData.meals === null) {
        setError(true);
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
            <Route path="/Login" element={<LoginPage />} />
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
            {isLoading && <p className="loading">Loading...</p>}
            {error && <p className="error">Error searching for your food</p>}
            {foodData && (
              <>
                <h2 className="food-heading">List of Foods:</h2>
                <p className="food-paragraph">
                  These are the list of foods available:
                </p>
                <div className="row mt-5">
                  {foodData.map((food, index) => (
                    <div className="col-md-4 mb-4" key={index}>
                      <div className="card">
                        <img
                          src={food.strMealThumb}
                          alt={food.strMeal}
                          className="card-img-top foodImg"
                        />
                        <div className="card-body">
                          <h5 className="card-title foodName">
                            {food.strMeal}
                          </h5>
                          <p className="card-text foodArea">{food.strArea}</p>
                          <h3 className="ingredient-heading">INGREDIENTS</h3>
                          <div className="row ingredients">
                            {Array.from({ length: 8 }, (_, i) => i + 1).map(
                              (i) => {
                                const ingredient = food[`strIngredient${i}`];
                                if (ingredient) {
                                  return (
                                    <div className="col-md-6" key={i}>
                                      <li
                                        className="food-ingredient list-style-type-none text-start"
                                        style={{
                                          padding: "0px",
                                          marginBottom: "5px",
                                          marginTop: "2px",
                                        }}
                                      >
                                        {ingredient}
                                      </li>
                                    </div>
                                  );
                                }
                                return null;
                              }
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
