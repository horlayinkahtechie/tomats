const SearchResults = ({ foodData, error }) => {
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
                <p className="card-text foodArea">{food.strArea}</p>
                <h3 className="ingredient-heading">INGREDIENTS</h3>
                <div className="row ingredients">
                  {Object.keys(food)
                    .filter((key) => key.startsWith("strIngredient"))
                    .map((key, i) => {
                      const ingredient = food[key];
                      return (
                        ingredient && (
                          <div className="col-md-6" key={i}>
                            <li className="food-ingredient">{ingredient}</li>
                          </div>
                        )
                      );
                    })}
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
