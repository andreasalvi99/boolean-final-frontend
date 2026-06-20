import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { Carousel } from "bootstrap";
import { useEffect } from "react";
import marvelCarousel from "../assets/img/93OX40.jpg";

export default function DefaultLayout() {
  return (
    <>
      <Header />
      <section id="slideshow">
        <div className="slideshow-container">
          <div>
            <div className="layover"></div>
            <img src={marvelCarousel} alt="" className="first-slide" />
            <div className="info-over">
              <h1>Vieni a scoprire la nostra collezione Marvel</h1>
              <p>
                Immergiti alla scoperta di centinaia di fumetti di uno dei brand
                più famosi di sempre
              </p>
              <button className="btn btn-outline-light btn-sm rounded-pill">
                <span className="mx-5 fw-semibold fs-5">Scopri di più</span>
              </button>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container mt-5">
          <Outlet />
        </div>
      </section>
    </>
  );
}
