import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { Carousel } from "bootstrap";
import { useEffect } from "react";
// import first from "../assets/img/93OX40.jpg";
// import second from "../assets/img/a3e9cd5019d76ece5897945489780afc.jpg";

export default function DefaultLayout() {
  // const carouselContent = [
  //   {
  //     title: "Vieni a scoprire la nostra collezione Marvel",
  //     paragraph:
  //       "Immergiti alla scoperta di centinaia di fumetti di uno dei brand più famosi di sempre",
  //     btnText: "Scopri di più",
  //     imgUrl: first,
  //   },
  //   {
  //     title: "Vieni a scoprire la nostra collezione DC",
  //     paragraph: "pagarafo di test",
  //     btnText: "more",
  //     imgUrl: second,
  //   },
  // ];

  return (
    <>
      <Header />
      {/* <section id="slideshow">
        <div className="slideshow-container">
          <div>
            <div className="layover"></div>
            <div className="left-arrow">
              <span className="prev" onClick={prevSlide}>
                <i className="bi bi-arrow-left"></i>
              </span>
            </div>
            <img src={first} alt="" className="first-slide" />
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
            <div className="">
              <i class="bi bi-arrow-right"></i>
            </div>
          </div>
        </div>
      </section> */}
      <section>
        <div className="container mt-5">
          <Outlet />
        </div>
      </section>
    </>
  );
}
