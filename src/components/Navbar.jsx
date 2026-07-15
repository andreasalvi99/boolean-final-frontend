import { NavLink } from "react-router-dom";
import logo from "../assets/img/logo.png";
import SearchForm from "./SearchForm";
import { useEffect } from "react";
import { Collapse } from "bootstrap";

export default function Navbar() {
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
          <SearchForm></SearchForm>
        </div>
      </div>
    </nav>
  );
}
