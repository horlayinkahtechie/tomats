import { useEffect, useState } from "react";
import "./styles/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import Index from "./pages/Index";
import { Routes, Route } from "react-router-dom";
import KitchenPage from "./pages/KitchenPage";
import GalleryPage from "./pages/GalleryPage";
import EventPage from "./pages/EventPage";
import OrderPage from "./pages/OrderPage";
import Signin from "./Authentication/Signin";
import Signup from "./Authentication/Signup";
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
import supabase from "./supabaseClient";
import VerifyMail from "./Authentication/VerifyMail";
import Cart from "./pages/cart";
import Checkout from "./pages/Checkout";
import ProtectedRoute from "./protectedRoute/ProtectedRoute";

function App() {
  const [foodData, setFoodData] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [clearSearch, setClearSearch] = useState("");
  const [error, setError] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSession() {
      const { data: session } = await supabase.auth.getSession();
      setUser(session?.user || null);
      setLoading(false);
    }

    fetchSession();

    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center"
        style={{ marginTop: "200px" }}
      >
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  const clearSearchedItem = () => {
    setClearSearch("");
    setIsSearching(false);
    setFoodData(null);
    setError(false);
    console.log("Search cleared!");
  };

  const foodFetch = async (foodInput) => {
    setIsLoading(true);
    setError(false);
    try {
      const foodDataFetch = await fetch(
        `https://themealdb.com/api/json/v1/1/search.php?s=${foodInput}`
      );
      const fetchedData = await foodDataFetch.json();

      if (fetchedData.meals === null) {
        setError("Food cannot be found. Try searching another item");
        setFoodData(null);
        setIsSearching(false);
        return;
      }

      // Add random prices between $10 and $50
      const enhancedData = fetchedData.meals.map((meal) => ({
        ...meal,
        price: Math.floor(Math.random() * (50 - 10 + 1)) + 10,
      }));

      setFoodData(enhancedData);
      setIsSearching(true);
      setError(false);
      console.log(enhancedData);
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
            <Route path="/Auth/login" element={<Signin />} />
            <Route path="/Auth/Signup" element={<Signup />} />
            <Route path="/Auth/ResetPassword" element={<ResetPassword />} />
            <Route path="/Auth/VerifyMail" element={<VerifyMail />} />
            <Route path="/Menu" element={<MenuPage />} />
            <Route path="/Cocktail-menu" element={<CocktailMenuPage />} />
            <Route path="/Wine-menu" element={<WineMenuPage />} />
            <Route path="/Group-menu" element={<GroupMenuPage />} />
            <Route path="/Children-menu" element={<ChildrenMenuPage />} />
            <Route path="/Steak-menu" element={<SteakMenuPage />} />

            <Route
              path="/cart"
              element={
                <ProtectedRoute user={user}>
                  <Cart />
                </ProtectedRoute>
              }
            />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute user={user}>
                  <Checkout />
                </ProtectedRoute>
              }
            />
            <Route
              path="/Reservation"
              element={
                <ProtectedRoute user={user}>
                  <ReservationPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/Admin"
              element={
                <ProtectedRoute user={user}>
                  <Admin />
                </ProtectedRoute>
              }
            />
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
