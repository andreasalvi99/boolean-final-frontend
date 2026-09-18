import { NavLink } from "react-router-dom";
import logo from "../assets/img/logo.png";
import SearchForm from "./SearchForm";
import { useEffect } from "react";
import { Collapse } from "bootstrap";

export default function Navbar({ cart, setCart }) {
  function report() {
    return console.log("Hai premuto");

    useEffect(() => {
      const element = document.querySelector("#navbarSupportedContent");

      new Collapse(element, {
        toggle: false,
      });
    }, []);
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
            onClick={report}
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
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-circle bg-danger fs-6">
                  {cart.length > 0 ?cart.reduce((total, item) => total + item.quantity, 0) : ""}
                </span>
                </i>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
    <div className="offcanvas-header">
      <h5 className="offcanvas-title bangers-regular" id="offcanvasRightLabel">Il tuo carrello</h5>
      <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div className="offcanvas-body bebas-neue-regular">
      {cart.length === 0 ? "il tuo carrello è vuoto" : cart.map((item) => {
        return(
          <div className="card mb-3" style={{ maxHeight: "540px" }} key={item.comic.id}>
            <div className="row g-0">
              <div className="col-md-4">
                <img src={`https://laravel-final-backend.onrender.com/img/${item.comic.cover_img}`} className="img-fluid rounded-start" alt="..." />
              </div>
              <div className="col-md-8">
                <div className="card-body d-flex flex-column justify-content-between h-100 pb-2">
                  <h5 className="card-title fs-6">{item.comic.title}</h5>
                  <div className="d-flex justify-content-between align-items-end">
                    <p className="mb-0">Quantità: {item.quantity}</p>
                    <p className="mb-0">&euro; {item.comic.price * item.quantity.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
    <div className="offcanvas-header d-flex justify-content-between">
      <h4 className="offcanvas-title bangers-regular" id="offcanvasRightLabel">Totale</h4>
      <span className="offcanvas-title bangers-regular fs-4">&euro; {cart.reduce((total, item) => total + (item.comic.price * item.quantity), 0).toFixed(2)}</span>
    </div>
  </div>
</>
  );
}
