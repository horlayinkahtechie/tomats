import { supabase } from "../supabaseClient";
import { useState } from "react";

const SearchResults = ({ foodData, error }) => {
  const [loadingItems, setLoadingItems] = useState({});

  const addToCart = async (food, index) => {
    setLoadingItems((prev) => ({ ...prev, [index]: true }));

    try {
      const { error } = await supabase.from("cart").insert([
        {
          meal_name: food.strMeal,
          meal_img: food.strMealThumb,
          price: food.price || 50,
        },
      ]);

      if (error) {
        console.error("Error adding to cart:");
      } else {
        console.log("Item added successfully");
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    } finally {
      setLoadingItems((prev) => ({ ...prev, [index]: false }));
    }
  };

  if (error) {
    return <p className="error">Error searching for your food.</p>;
  }
  if (!Array.isArray(foodData) || foodData.length === 0) {
    return <p className="error">Search food or Item cannot be found.</p>;
  }

  return (
    <>
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
    </>
  );
};

export default SearchResults;
