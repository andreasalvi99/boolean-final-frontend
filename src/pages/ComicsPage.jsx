import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import ComicCard from "../components/ComicCard";

export default function ComicsPage() {
  const [comics, setComics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [isVisible, setIsVisible] = useState(false);

  // function handleSwitch() {
  //   if (isVisible) {
  //     return setIsVisible(false);
  //   }

  //   if (!isVisible) {
  //     return setIsVisible(true);
  //   }
  // }

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

  // //# Faccio slice per mostrare solo alcuni dei fumetti per ogni brand
  // const marvelComicsSliced = marvelComics.slice(2, 7);
  // //   console.log(marvelComicsSliced);

  // const dcComicsSliced = dcComics.slice(2, 7);
  // //   console.log(dcComicsSliced);

  // //   console.log(marvelComics);
  // //   console.log(dcComics);

  useEffect(fetchComics, []);

  return (
    <>
      <section id="main-content">
        <div className="container mt-5">
          {/* Loader */}

          {isLoading && <Loader />}

          {comics && (
            <>
              {/* DC Comics */}
              {/* <div className="form-check form-switch my-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  value=""
                  id="switchCheckChecked"
                  switch
                  onClick={handleSwitch}
                />
                <label className="form-check-label" for="switchCheckChecked">
                  Mostra fumetti: {!isVisible ? "DC" : "Marvel"}
                </label>
              </div> */}

              {/* <section id="DC" className={isVisible ? "" : "d-none"}> */}
              <section id="DC" className="">
                <h2 className="my-3 text-center">Marvel</h2>
                <div className="row row-cols-md-3 row-cols-lg-5 g-3">
                  {dcComics.map((dcComic) => {
                    return (
                      <ComicCard
                        key={dcComic.id}
                        id={dcComic.id}
                        cover={dcComic.cover_img}
                        title={dcComic.title}
                      />
                    );
                  })}
                </div>
              </section>

              {/* Marvel Comics */}

              {/* <section id="Marvel" className={isVisible ? "d-none" : ""}> */}
              <section id="Marvel" className="">
                <h2 className="my-3 text-center">DC</h2>
                <div className="row row-cols-md-3 row-cols-lg-5 g-3">
                  {marvelComics.map((marvelComic) => {
                    return (
                      <ComicCard
                        key={marvelComic.id}
                        id={marvelComic.id}
                        cover={marvelComic.cover_img}
                        title={marvelComic.title}
                      />
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
