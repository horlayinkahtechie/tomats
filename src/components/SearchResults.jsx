import { supabase } from "../supabaseClient";

const SearchResults = ({ foodData, error }) => {
  const addToCart = async (food) => {
    try {
      const { data, error } = await supabase.from("cart").insert([
        {
          meal_name: food.strMeal,
          meal_img: food.strMealThumb,
        },
      ]);

      if (error) {
        console.error("Error adding to cart:", error.message);
        alert("Failed to add to cart. Please try again.");
      } else {
        alert("Food added to cart successfully!");
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("Something went wrong!");
    }
  };

  if (error) {
    return <p className="error">Error searching for your food.</p>;
  }
  if (!foodData) {
    return <p className="error">Search food or Item cannot be found.</p>;
  }
  return (
    <>
      <h2 className="food-heading">List of Foods:</h2>
      <p className="food-paragraph">These are the list of foods available:</p>
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
                <h5 className="card-title foodName">{food.strMeal}</h5>

                <div className="row ingredients">
                  <button type="button" onClick={() => addToCart(food)}>
                    Add to cart
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
