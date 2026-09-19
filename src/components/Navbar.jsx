import { NavLink } from "react-router-dom";
import logo from "../assets/img/logo.png";
import SearchForm from "./SearchForm";

export default function Navbar({ cart, setCart }) {

  function removeFromCart(cartItem) {
    const updatedCart = cart.filter((item) => {
      return cartItem.comic.id !== item.comic.id
    })
    setCart(updatedCart);
  }

  function reduceQuantity(cartItem) {
    cartItem.quantity -= 1;

    if(cartItem.quantity === 0) {
      removeFromCart(cartItem);
    }else{
      setCart([...cart]);
    }
  }

  function increaseQuantity(cartItem) {
    cartItem.quantity += 1;

    setCart([...cart]);
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top bebas-neue-regular">
        <div className="container">
          <NavLink to="/">
            <img src={logo} alt="" className="navbar-logo" />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          {/* <button
            className="navbar-toggler"
            type="button"
            onClick={() => {
              document
                .querySelector("#navbarSupportedContent")
                .classList.toggle("show");
            }}
          >
            <span className="navbar-toggler-icon"></span>
          </button> */}
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/comics" className="nav-link">
                  Fumetti
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/characters" className="nav-link">
                  Personaggi
                </NavLink>
              </li>
            </ul>
            <div className="d-flex gap-4 align-items-center">
              <SearchForm></SearchForm>
              <button className="btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                <i className="bi bi-handbag position-relative">
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-circle bg-success fs-6">
                  {cart.length > 0 ? cart.reduce((total, item) => total + item.quantity, 0) : ""}
                </span>
                </i>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
    <div className="offcanvas-header pb-1">
      <h5 className="offcanvas-title bangers-regular" id="offcanvasRightLabel">Il tuo carrello</h5>
      <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div className="offcanvas-body bebas-neue-regular pt-1 fs-4">
      <div className="d-flex justify-content-end align-items-center mb-2">
        {cart.length > 0 ? <button className="btn btn-danger" type="button" onClick={() => setCart([])}>Svuota carrello</button> : ""}
      </div>
      <div className="row row-cols-1 g-3">
      {cart.length === 0 ? "il tuo carrello è vuoto" : cart.map((item) => {
        return(
          <div className="col" key={item.comic.id}>
          <div className="card mb-3">
            <div className="row g-0">
              <div className="col-md-4">
                <img src={`https://laravel-final-backend.onrender.com/img/${item.comic.cover_img}`} className="img-fluid rounded-start" alt="..." />
              </div>
              <div className="col-md-8">
                <div className="card-body d-flex flex-column justify-content-between h-100 pb-2">
                  <div className="d-flex justify-content-between align-items-center gap-2">
                    <h4 className="card-title m-0">{item.comic.title}</h4>
                    <button className="btn btn-danger btn-sm" type="button" onClick={() => removeFromCart(item)}>
                      <i className="bi bi-trash3-fill"></i>
                    </button>
                  </div>
                  <div className="d-flex justify-content-between align-items-end">
                    <div className="mb-0 d-flex justify-content-center align-items-center gap-2">
                      <span>
                      Quantità: 
                      </span>
                      <div>
                        <button className="btn btn-light btn-sm" type="button" onClick={() => reduceQuantity(item)}>-</button>
                        <span className="mx-1">{item.quantity}</span>
                        <button className="btn btn-light btn-sm" type="button" onClick={() => increaseQuantity(item)}>+</button>
                      </div>
                    </div>
                    <p className="mb-0">&euro; {Math.round(item.comic.price * item.quantity * 100) / 100}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
        )
      })}
      </div>
    </div>
    <div className="offcanvas-header d-flex justify-content-between py-3 border border-dark-subtle border-end-0 border-start-0 border-bottom-0">
      <h4 className="offcanvas-title bangers-regular align-self-end" id="offcanvasRightLabel">Totale : &euro; {cart.reduce((total, item) => total + (item.comic.price * item.quantity), 0).toFixed(2)}</h4>
      <button type="button" className="btn btn-outline-success">
        CHECKOUT
      </button>
    </div>
  </div>
</>
  );
}
