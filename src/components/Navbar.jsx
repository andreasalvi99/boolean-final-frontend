import { NavLink } from "react-router-dom";
import logo from "../assets/img/logo.png";
import SearchForm from "./SearchForm";
import Cart from "./Cart.jsx"


export default function Navbar({ cart, setCart }) {

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
                  <span className="cart-item-push">
                  {cart.length > 0 ? cart.reduce((total, item) => total + item.quantity, 0) : ""}
                </span>
                </i>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <Cart 
        cart={cart}
        setCart={setCart}
      />
</>
  );
}
