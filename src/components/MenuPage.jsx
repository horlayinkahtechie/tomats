import cocktailImg from "../Images/cocktailimg.jpg";
import groupTableImg from "../Images/groupTable.jpg";
import wineImg from "../Images/wine.jpg";
import childrenMenu from "../Images/children menu.jpg";
import steakMenu from "../Images/steakImg.jpg";
import Footer from "./footer";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function MenuPage() {
  const [selectedMenu, setSelectedMenu] = useState("");
  const [fetchMenu, setFetchMenu] = useState("");
  const [loading, setLoading] = useState(false);

  const handleMenuChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedMenu(selectedValue);
  };

  useEffect(() => {
    if (!selectedMenu) return;

    const selectedMenuFetch = async () => {
      setLoading(true);
      setTimeout(async () => {
        try {
          const fetchMenuData = await fetch(
            `https://themealdb.com/api/json/v1/1/search.php?s=${selectedMenu}`
          );
          const fetchedMenuData = await fetchMenuData.json();
          setFetchMenu(fetchedMenuData.meals || []);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      }, 3000);
    };

    selectedMenuFetch();
  }, [selectedMenu]);
  return (
    <>
      <div className="container">
        <div className="col-md-12">
          <select id="food-select" onChange={handleMenuChange}>
            <option value="">Select a menu</option>
            <option value="Pizza">Pizza</option>
            <option value="Burger">Burger</option>
            <option value="Pasta">Pasta</option>
            <option value="Salad">Salad</option>
            <option value="Cheese">Cheese</option>
            <option value="Drinks">Drinks</option>
            <option value="Steak">Steak</option>
          </select>
        </div>
      </div>

      {/* Show loading paragraph while fetching */}
      {loading ? (
        <>
          <div className="d-flex justify-content-center">
            <div className="spinner-grow" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </>
      ) : (
        selectedMenu &&
        fetchMenu.length === 0 && (
          <p style={{ color: "orangered", textAlign: "center" }}>
            No menu found for {selectedMenu}
          </p>
        )
      )}

      {!loading && selectedMenu && fetchMenu.length > 0 && (
        <div className="container-fluid menu-padding">
          <div className="row mt-5">
            {fetchMenu.map((food, index) => (
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
                      {Array.from({ length: 8 }, (_, i) => i + 1).map((i) => {
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
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!selectedMenu && (
        <div className="container-fluid menu-padding">
          <div className="row">
            <div className="col-md-6">
              <img src={cocktailImg} className="img-fluid" alt="Cocktail" />
            </div>
            <div className="col-md-6">
              <h3 className="cocktail-heading">COCKTAIL MENU</h3>
              <p className="cocktail-p">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Voluptate impedit natus odit explicabo ut quia aliquam tempora
                provident nam.
              </p>
              <p className="cocktail-p">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum
                praesentium cumque sed accusamus eaque distinctio officia,
                explicabo fuga!
              </p>
              <p className="cocktail-p">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Mollitia itaque, neque quisquam facilis est aut repellat!
              </p>
              <div className="mt-5">
                <Link className="menuBtn" to="/Cocktail-menu">
                  COCKTAIL MENU
                </Link>
              </div>
            </div>
            <div className="col-md-6 menu-section">
              <h3 className="cocktail-heading">WINE MENU</h3>
              <p className="cocktail-p">
                Lorem ipsum dolorq sit amet consectetur adipisicing elit. Quas
                odit optio, veritatis unde illum consequatur architecto dicta
                voluptatibus.
              </p>
              <p className="cocktail-p">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Repellat quis aspernatur, totam ipsam quo iusto soluta!
              </p>
              <p className="cocktail-p">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Mollitia itaque, neque quisquam facilis est aut repellat!
              </p>

              <div className="mt-5">
                <Link to="/Wine-menu" className="menuBtn">
                  WINE MENU
                </Link>
              </div>
            </div>
            <div className="col-md-6 menu-section">
              <img src={wineImg} className="img-fluid" alt="Wine" />
            </div>

            <div className="col-md-6 menu-section">
              <img src={groupTableImg} className="img-fluid" alt="group menu" />
            </div>
            <div className="col-md-6 menu-section">
              <h3 className="cocktail-heading">GROUP MENU</h3>
              <p className="cocktail-p">
                Lorem ipsum dolorq sit amet consectetur adipisicing elit. Quas
                odit optio, veritatis unde illum consequatur architecto dicta
                voluptatibus.
              </p>
              <p className="cocktail-p">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Repellat quis aspernatur, totam ipsam quo iusto soluta!
              </p>
              <p className="cocktail-p">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Mollitia itaque, neque quisquam facilis est aut repellat!
              </p>

              <div className="mt-5">
                <Link to="/Group-menu" className="menuBtn">
                  GROUP MENU
                </Link>
              </div>
            </div>

            <div className="col-md-6 menu-section">
              <h3 className="cocktail-heading">CHILDREN MENU</h3>
              <p className="cocktail-p">
                Lorem ipsum dolorq sit amet consectetur adipisicing elit. Quas
                odit optio, veritatis unde illum consequatur architecto dicta
                voluptatibus.
              </p>
              <p className="cocktail-p">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Repellat quis aspernatur, totam ipsam quo iusto soluta!
              </p>
              <p className="cocktail-p">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Mollitia itaque, neque quisquam facilis est aut repellat!
              </p>

              <div className="mt-5">
                <Link to="/Children-menu" className="menuBtn">
                  CHILDREN MENU
                </Link>
              </div>
            </div>
            <div className="col-md-6 menu-section">
              <img
                src={childrenMenu}
                className="img-fluid"
                alt="Children menu"
              />
            </div>
            <div className="col-md-6 menu-section">
              <img src={steakMenu} className="img-fluid" alt="Children menu" />
            </div>
            <div className="col-md-6 menu-section">
              <h3 className="cocktail-heading">STEAK MENU</h3>
              <p className="cocktail-p">
                Lorem ipsum dolorq sit amet consectetur adipisicing elit. Quas
                odit optio, veritatis unde illum consequatur architecto dicta
                voluptatibus.
              </p>
              <p className="cocktail-p">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Repellat quis aspernatur, totam ipsam quo iusto soluta!
              </p>
              <p className="cocktail-p">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Mollitia itaque, neque quisquam facilis est aut repellat!
              </p>

              <div className="mt-5">
                <Link className="menuBtn" to="/Steak-menu">
                  STEAK MENU
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
