import cocktailImg from "../Images/cocktailimg.jpg";
import margaritaImg from "../Images/margaritaImg.webp";
import mojitoImg from "../Images/mojitoImg.webp";
import martiniImg from "../Images/martiniImg.jpg";
import Footer from "../components/footer";

export default function CocktailMenuPage() {
  return (
    <>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <div className="gallery-overlay"></div>
          <img
            src={cocktailImg}
            className="d-block w-100 img-fluid"
            alt="..."
            style={{ maxHeight: "87vh", minHeight: "50vh" }}
            loading="lazy"
          />
          <div className="gallery-caption section">
            <div className="gallery-brand">Cocktail</div>
          </div>
        </div>
      </div>

      <div className="container-fluid menu-padding mt-5">
        <div className="row">
          <div className="col-md-6">
            <img
              src={margaritaImg}
              className="img-fluid"
              alt="Margarita Cocktail"
            />
          </div>
          <div className="col-md-6 mt-5">
            <h3 className="cocktail-heading">MARGARITA</h3>
            <p className="cocktail-p">
              The Margarita is one of the most iconic tequila cocktails, known
              for its perfect balance of sweetness, tartness, and the slight
              bitterness of tequila. Traditionally made with tequila, triple sec
              (an orange-flavored liqueur), and freshly squeezed lime juice,
              it’s a bright, refreshing drink that’s perfect for warm weather or
              any celebration.
            </p>
            <p className="cocktail-p">
              Margaritas are typically served in a glass with a salted rim,
              which enhances the flavors and adds a contrasting savory touch.
            </p>
            <p className="cocktail-p">
              The Margarita has many popular variations, including fruit-based
              versions like strawberry, mango, or watermelon, which add a sweet
              twist. The Frozen Margarita is also popular, where the ingredients
              are blended with ice for a slushy texture.
            </p>
            <div className="mt-4">
              <button type="button" className="menuBtn">
                ADD TO CART
              </button>
            </div>
          </div>
          <div className="col-md-6 menu-section">
            <h3 className="cocktail-heading">MOJITO</h3>
            <p className="cocktail-p">
              This light and invigorating cocktail originates from Cuba and
              combines white rum, fresh lime juice, mint leaves, sugar, and soda
              water. The Mojito’s charm lies in its fresh, herby taste and the
              slight sweetness that balances the rum’s kick.
            </p>
            <p className="cocktail-p">
              Traditionally, the mint leaves are gently muddled (pressed to
              release flavor without tearing) to release their oils, and the
              drink is stirred to create a refreshing blend that’s not overly
              sweet.
            </p>
            <p className="cocktail-p">
              Mojitos can be customized with additional flavors like strawberry,
              mango, or even spicy pepper for a unique twist. Coconut Mojitos
              add cream of coconut for a tropical flavor, while the Virgin
              Mojito omits the rum for a non-alcoholic option.
            </p>
            <div className="mt-4">
              <button type="button" className="menuBtn">
                ADD TO CART
              </button>
            </div>
          </div>

          <div className="col-md-6 menu-section">
            <img src={mojitoImg} className="img-fluid" alt="Mojito Cocktail" />
          </div>

          <div className="col-md-6 mt-5">
            <img
              src={martiniImg}
              className="img-fluid"
              alt="Martini Cocktail"
            />
          </div>
          <div className="col-md-6 mt-5">
            <h3 className="cocktail-heading">MARTINI</h3>
            <p className="cocktail-p">
              Known for its sophistication, the Martini is a timeless cocktail
              that is simple yet versatile. It is typically made with gin and
              dry vermouth and can be garnished with an olive or a lemon twist.
            </p>
            <p className="cocktail-p">
              The drink is known for its dry, crisp profile and can be made to
              suit individual preferences—whether stirred or shaken, and “dry”
              (with very little vermouth) or “wet” (with more vermouth).
            </p>
            <p className="cocktail-p">
              While the traditional gin Martini is classic, Vodka Martinis have
              also become popular, as have various flavored martinis like
              Espresso, Lemon Drop, and Chocolate. James Bond famously
              popularized the Vodka Martini with his request for it to be
              “shaken, not stirred.”
            </p>
            <div className="mt-4">
              <button type="button" className="menuBtn">
                ADD TO CART
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
