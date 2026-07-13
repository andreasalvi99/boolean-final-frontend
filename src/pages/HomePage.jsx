import { useEffect, useState } from "react";
import Header from "../components/Header";
import Slider from "../components/slider/Slider";
import axios from "axios";
import ComicCard from "../components/ComicCard";
import Loader from "../components/Loader";

export default function HomePage() {
  const [latestComics, setLatestComics] = useState([]);
  const [preorderComics, setPreorderComics] = useState([]);
  const [discountComics, setDiscountComics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  function fetchSpecialComics() {
    axios
      .get("http://127.0.0.1:8000/api/comics")
      .then((response) => {
        const results = response.data.data;
        console.log(results);

        const filteredLatest = results.filter((result) => result.is_new === 1);
        setLatestComics(filteredLatest);

        const filteredPreorder = results.filter(
          (result) => result.is_preorder === 1,
        );
        setPreorderComics(filteredPreorder);

        const filteredDiscount = results.filter(
          (result) => result.discount > 0,
        );
        setDiscountComics(filteredDiscount);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const comicIds = latestComics.map((comic) => comic.id);

  // console.log(latestComics);

  useEffect(fetchSpecialComics, []);

  return (
    <section id="main-content">
      {isLoading && <Loader />}

      {latestComics.length > 0 && (
        <>
          <Slider />

          <section id="latest-comics" className="p-4">
            <div className="container">
              <h1 className="bangers-regular">Ultimi arrivi:</h1>
              <div className="row row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-3">
                {latestComics.map((comic) => {
                  return (
                    <ComicCard
                      id={comic.id}
                      key={comic.id}
                      cover={comic.cover_img}
                      title={comic.title}
                      comicIds={comicIds}
                      isNew={comic.is_new}
                    />
                  );
                })}
              </div>
            </div>
          </section>

          <section id="preorder-comics" className="p-4">
            <div className="container">
              <h1 className="bangers-regular">Preorder:</h1>
              <div className="row row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-3">
                {preorderComics.map((comic) => {
                  return (
                    <ComicCard
                      id={comic.id}
                      key={comic.id}
                      cover={comic.cover_img}
                      title={comic.title}
                      comicIds={comicIds}
                      isPreorder={comic.is_preorder}
                    />
                  );
                })}
              </div>
            </div>
          </section>

          <section id="discount-comics" className="p-4">
            <div className="container">
              <h1 className="bangers-regular">Scontati:</h1>
              <div className="row row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-3">
                {discountComics.map((comic) => {
                  return (
                    <ComicCard
                      id={comic.id}
                      key={comic.id}
                      cover={comic.cover_img}
                      title={comic.title}
                      comicIds={comicIds}
                      isDiscount={comic.discount}
                    />
                  );
                })}
              </div>
            </div>
          </section>
        </>
      )}
    </section>
  );
}
