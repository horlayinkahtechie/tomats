import cocktailImg from "../Images/cocktailimg.jpg";
import groupTableImg from "../Images/groupTable.jpg";
import wineImg from "../Images/wine.jpg";
import childrenMenu from "../Images/children menu.jpg";
import steakMenu from "../Images/steakImg.jpg";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import supabase from "../supabaseClient";

export default function MenuPage() {
  const [selectedMenu, setSelectedMenu] = useState("");
  const [fetchMenu, setFetchMenu] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingItems, setLoadingItems] = useState(false);
  const [notification, setNotification] = useState({ message: "", type: "" });

  const handleMenuChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedMenu(selectedValue);
  };

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
      {notification.message && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}

      <div className="container-fluid menu-select">
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
}
