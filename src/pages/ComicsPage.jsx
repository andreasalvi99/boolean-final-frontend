import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

export default function ComicsPage() {
  const [comics, setComics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const search = searchParams.get("search");

  function fetchComics() {
    axios
      .get("http://127.0.0.1:8000/api/comics")
      .then((response) => {
        //   console.log(response.data.data);
        setComics(response.data.data);
      })
      .finally(() => {
        setIsLoading(false);
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

  useEffect(fetchComics, [search]);

  return (
    <>
      {/* Loader */}
      <section id="main-content">
        <div className="container mt-5">
          {isLoading && (
            <div className="d-flex justify-content-center align-items-center vh-100">
              <div
                className="spinner-grow mx-2"
                style={{ width: "3rem", height: "3rem" }}
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
              <div
                className="spinner-grow mx-2"
                style={{ width: "3rem", height: "3rem" }}
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
              <div
                className="spinner-grow mx-2"
                style={{ width: "3rem", height: "3rem" }}
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}

          {!isLoading && comics && (
            <>
              {/* DC Comics */}

              <section id="DC" className="">
                <div className="row row-cols-md-3 row-cols-lg-5 g-3">
                  {dcComicsSliced.map((dcComic) => {
                    return (
                      <Link
                        to={`/comics/${dcComic.id}`}
                        className="text-decoration-none"
                        key={dcComic.id}
                      >
                        <div className="col">
                          <div className="card h-100 border-0">
                            <div style={{ height: "379px" }}>
                              <img
                                src={`http://127.0.0.1:8000/storage/${dcComic.cover_img}`}
                                className="card-img-top h-100 overflow-hidden"
                                alt="..."
                              />
                            </div>
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
                <div className="row row-cols-md-3 row-cols-lg-5 g-3">
                  {marvelComicsSliced.map((marvelComic) => {
                    return (
                      <Link
                        to={`/comics/${marvelComic.id}`}
                        className="text-decoration-none"
                        key={marvelComic.id}
                      >
                        <div className="col">
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
                      </Link>
                    );
                  })}
                </div>
              </section>
            </>
          )}
        </div>
      </section>
    </>
  );
}
