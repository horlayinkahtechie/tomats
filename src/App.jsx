import { useEffect, useState } from "react";
import "./styles/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";

import supabase from "./supabaseClient";
import Spinner from "./components/Spinner";
import SearchResults from "./components/SearchResults";
import ProtectedRoute from "./protectedRoute/ProtectedRoute";

// User Components
import Navbar from "./components/Navbar";
import Index from "./pages/Index";
import KitchenPage from "./pages/KitchenPage";
import GalleryPage from "./pages/GalleryPage";
import EventPage from "./pages/EventPage";
import OrderPage from "./pages/OrderPage";
import Signin from "./components/Authentication/Signin";
import Signup from "./components/Authentication/Signup";
import MenuPage from "./pages/MenuPage";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import ReservationPage from "./pages/ReservationPage";
import PresentOrders from "./pages/userProfile/user_orders/PresentOrders";
import PastOrders from "./pages/userProfile/user_orders/PastOrders";

// Admin Components
import AdminNavbar from "./pages/Admin/components/Navbar";
import Overview from "./pages/Admin/pages/Overview";
import Reservations from "./pages/Admin/pages/Reservations";
import Orders from "./pages/Admin/pages/Orders";
import AdminSignin from "./pages/Admin/Auth/Signin";
import DeliveredOrders from "./pages/Admin/pages/DeliveredOrders";
import CanceledUserOrders from "./pages/Admin/pages/CanceledOrders";

function App() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loadingUserSession, setLoadingUserSession] = useState(true);
  const [foodData, setFoodData] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchSession() {
      setLoadingUserSession(true);

      // Get session from Supabase
      const { data: session, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Error fetching session:", error);
        setUser(null);
        setRole(null);
        setLoadingUserSession(false);
        return;
      }

      if (session?.user) {
        setUser(session.user);
        localStorage.setItem("user", JSON.stringify(session.user)); // Store user in localStorage
        fetchUserRole(session.user.id);
      } else {
        setUser(null);
        setRole(null);
        setLoadingUserSession(false);
      }
    }

    async function fetchUserRole(userId) {
      try {
        const { data: userData, error } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", userId)
          .single();

        if (error || !userData) {
          setRole(null);
        } else {
          setRole(userData.role);
          localStorage.setItem("role", userData.role); // Store role in localStorage
        }
      } catch (err) {
        console.error("Error fetching role:", err);
      } finally {
        setLoadingUserSession(false);
      }
    }

    // Restore session from localStorage on reload
    const storedUser = localStorage.getItem("user");
    const storedRole = localStorage.getItem("role");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setRole(storedRole);
      setLoadingUserSession(false);
    } else {
      fetchSession();
    }

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          setUser(session.user);
          localStorage.setItem("user", JSON.stringify(session.user));
          fetchUserRole(session.user.id);
        } else {
          setUser(null);
          setRole(null);
          localStorage.removeItem("user");
          localStorage.removeItem("role");
        }
      }
    );

    return () => {
      listener.subscription?.unsubscribe();
    };
  }, []);

  if (loadingUserSession) {
    return <Spinner />;
  }

  const clearSearchedItem = () => {
    setIsSearching(false);
    setFoodData(null);
    setError(false);
  };

  const foodFetch = async (foodInput) => {
    setIsLoading(true);
    setIsSearching(true);
    setError(false);

    try {
      const foodDataFetch = await fetch(
        `https://themealdb.com/api/json/v1/1/search.php?s=${foodInput}`
      );
      const fetchedData = await foodDataFetch.json();

      if (!fetchedData.meals) {
        setError("Food cannot be found. Try searching another item.");
        setFoodData(null);
        setIsSearching(false);
      } else {
        const enhancedData = fetchedData.meals.map((meal) => ({
          ...meal,
          price: Math.floor(Math.random() * (50 - 10 + 1)) + 10,
        }));

        setFoodData(enhancedData);
        setError(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("An error occurred while fetching data.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {/* Conditionally render the Navbar */}
      {role === "admin" ? (
        <AdminNavbar />
      ) : (
        <Navbar foodFetch={foodFetch} clearSearchedItem={clearSearchedItem} />
      )}

      <div>
        {isSearching ? (
          isLoading ? (
            <p className="loading">
              <Spinner />
            </p>
          ) : (
            <SearchResults foodData={foodData} error={error} />
          )
        ) : (
          <Routes>
            {/* Public Routes */}
            {role === "admin" ? (
              <Route
                path="/"
                element={
                  <ProtectedRoute user={user}>
                    <Overview />
                  </ProtectedRoute>
                }
              />
            ) : (
              <Route path="/" element={<Index />} />
            )}

            {role === "admin" ? (
              <Route path="/admin/login" element={<AdminSignin />} />
            ) : (
              <Route path="/Auth/login" element={<Signin />} />
            )}

            <Route path="/About" element={<KitchenPage />} />
            <Route path="/Gallery" element={<GalleryPage />} />
            <Route path="/Event" element={<EventPage />} />
            <Route path="/Order" element={<OrderPage />} />
            <Route path="/Auth/Signup" element={<Signup />} />
            <Route path="/Menu" element={<MenuPage />} />

            {/* User Protected Routes */}
            <Route
              path="/cart"
              element={
                <ProtectedRoute user={user}>
                  <Cart />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user/present-orders"
              element={
                <ProtectedRoute user={user}>
                  <PresentOrders />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user/past-orders"
              element={
                <ProtectedRoute user={user}>
                  <PastOrders />
                </ProtectedRoute>
              }
            />
            <Route
              path="/checkout/payment"
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

            {/* Admin Routes */}

            <Route
              path="/admin/reservations"
              element={
                <ProtectedRoute user={user}>
                  <Reservations />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/orders"
              element={
                <ProtectedRoute user={user}>
                  <Orders />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/overview"
              element={
                <ProtectedRoute user={user}>
                  <Overview />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/delivered-orders"
              element={
                <ProtectedRoute user={user}>
                  <DeliveredOrders />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/canceled-orders"
              element={
                <ProtectedRoute user={user}>
                  <CanceledUserOrders />
                </ProtectedRoute>
              }
            />
          </Routes>
        )}
      </div>
    </div>
  );
}

export default App;
