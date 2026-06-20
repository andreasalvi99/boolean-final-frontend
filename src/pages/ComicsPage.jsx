import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

export default function ComicsPage() {
  const [comics, setComics] = useState([]);

  function fetchComics() {
    axios.get("http://127.0.0.1:8000/api/comics").then((response) => {
      //   console.log(response.data.data);
      setComics(response.data.data);
    });
  }
  //# Filtro per dividere i brand DC e Marvel
  const marvelComics = comics.filter((comic) => {
    return comic.brand_id === 2;
  });

  const dcComics = comics.filter((comic) => {
    return comic.brand_id === 1;
  });

  //# Faccio slice per mostrare solo alcuni dei fumetti per ogni brand
  const marvelComicsSliced = marvelComics.slice(2, 7);
  //   console.log(marvelComicsSliced);

  const dcComicsSliced = dcComics.slice(2, 7);
  //   console.log(dcComicsSliced);

  //   console.log(marvelComics);
  //   console.log(dcComics);

  useEffect(fetchComics, []);

  return (
    <>
      {/* Carousel */}

      <section id="carousel">
        <div id="carouselExampleCaptions" className="carousel slide">
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src="..." className="d-block w-100" alt="..." />
              <div className="carousel-caption d-none d-md-block">
                <h5>First slide label</h5>
                <p>
                  Some representative placeholder content for the first slide.
                </p>
              </div>
            </div>
            <div className="carousel-item">
              <img src="..." className="d-block w-100" alt="..." />
              <div className="carousel-caption d-none d-md-block">
                <h5>Second slide label</h5>
                <p>
                  Some representative placeholder content for the second slide.
                </p>
              </div>
            </div>
            <div className="carousel-item">
              <img src="..." className="d-block w-100" alt="..." />
              <div className="carousel-caption d-none d-md-block">
                <h5>Third slide label</h5>
                <p>
                  Some representative placeholder content for the third slide.
                </p>
              </div>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </section>

      {/* DC Comics */}

      <section id="DC" className="">
        <div className="row row-cols-5 g-3">
          {dcComicsSliced.map((dcComic) => {
            return (
              <Link
                to={`/comics/${dcComic.id}`}
                className="text-decoration-none"
              >
                <div className="col" key={dcComic.id}>
                  <div className="card h-100 border-0">
                    <img
                      src={`http://127.0.0.1:8000/storage/${dcComic.cover_img}`}
                      className="card-img-top h-100"
                      alt="..."
                    />
                    <div className="card-body h-25">
                      <p className="card-text text-center fw-semibold">
                        {dcComic.title}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Marvel Comics */}

      <section id="Marvel" className="mt-5">
        <div className="row row-cols-5 g-3">
          {marvelComicsSliced.map((marvelComic) => {
            return (
              <div className="col" key={marvelComic.id}>
                <div className="card h-100 border-0">
                  <img
                    src={`http://127.0.0.1:8000/storage/${marvelComic.cover_img}`}
                    className="card-img-top h-100"
                    alt="..."
                  />
                  <div className="card-body h-25">
                    <p className="card-text text-center fw-semibold">
                      {marvelComic.title}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
