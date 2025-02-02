import { supabase } from "../supabaseClient";
import { useState } from "react";
import Footer from "./footer";

const SearchResults = ({ foodData }) => {
  const [loadingItems, setLoadingItems] = useState({});
  const [notification, setNotification] = useState({ message: "", type: "" });

  const addToCart = async (food, index) => {
    setLoadingItems((prev) => ({ ...prev, [index]: true }));

    const { data: user, error: userError } = await supabase.auth.getUser();
    if (userError || !user?.user) {
      console.error("No user logged in:", userError);
      showNotification("You need to log in first!", "error");
      setLoadingItems((prev) => ({ ...prev, [index]: false }));
      return;
    }

    try {
      const { error } = await supabase.from("cart").insert([
        {
          user_id: user.user.id,
          meal_name: food.strMeal,
          meal_img: food.strMealThumb,
          price: food.price || 50,
        },
      ]);

      if (error) {
        console.error("Error adding to cart");
        showNotification("Failed to add item to cart!", "error");
      } else {
        showNotification("Item added successfully!", "success");
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      showNotification("An unexpected error occurred!", "error");
    } finally {
      setLoadingItems((prev) => ({ ...prev, [index]: false }));
    }
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({ message: "", type: "" });
    }, 3000); // Hide notification after 3 seconds
  };

  // if (error) {
  //   return <p className="error">Error searching for your food.</p>;
  // }
  // if (!Array.isArray(foodData) || foodData.length === 0) {
  //   return <p className="error">Search food or Item cannot be found.</p>;
  // }

  return (
    <>
      {notification.message && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}

      <h2 className="food-heading">List of Foods:</h2>
      <p className="food-paragraph">These are the list of foods available:</p>
      <div className="row mt-5">
        {foodData.map((food, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div
              className="card border-0 shadow-sm p-3"
              style={{ background: "#fff", borderRadius: "12px" }}
            >
              <img
                src={food.strMealThumb}
                alt={food.strMeal}
                className="card-img-top rounded"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body text-center">
                <h5 className="card-title fw-bold text-dark p-3">
                  {food.strMeal}
                </h5>
                <p className="card-text text-muted p-2">{food.strArea}</p>

                <div className="d-flex justify-content-between mt-3">
                  <button
                    className="btn btn-outline-primary w-50 me-2"
                    style={{
                      borderRadius: "8px",
                      padding: "8px 12px",
                    }}
                    onClick={() => addToCart(food, index)}
                    disabled={loadingItems[index]}
                  >
                    <i className="bi bi-cart-plus me-1"></i>{" "}
                    {loadingItems[index] ? "Adding..." : "Add to Cart"}
                  </button>
                  <button
                    className="btn btn-outline-danger w-50"
                    style={{
                      borderRadius: "8px",
                      padding: "8px 12px",
                    }}
                  >
                    <i className="bi bi-heart me-1"></i> Favorite
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer />

      {/* Notification CSS */}
      <style>
        {`
          .notification {
            position: fixed;
            top: 10px;
            right: 10px;
            padding: 15px;
            background: #28a745;
            color: white;
            border-radius: 5px;
            font-weight: bold;
            box-shadow: 0px 4px 6px rgba(0,0,0,0.1);
            transform: translateX(100%);
            animation: slideIn 0.5s forwards, slideOut 0.5s 2.5s forwards;
          }

          .notification.error {
            background: #dc3545;
          }

          @keyframes slideIn {
            from {
              transform: translateX(100%);
            }
            to {
              transform: translateX(0);
            }
          }

          @keyframes slideOut {
            from {
              transform: translateX(0);
            }
            to {
              transform: translateX(100%);
            }
          }
        `}
      </style>
    </>
  );
};

export default SearchResults;
