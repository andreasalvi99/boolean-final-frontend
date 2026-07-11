import { useEffect, useState } from "react";
import Header from "../components/Header";
import Slider from "../components/slider/Slider";
import axios from "axios";
import ComicCard from "../components/ComicCard";
import Loader from "../components/Loader";

export default function HomePage() {
  const [latestComics, setLatestComics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  function fetchLatestComics() {
    axios.get("http://127.0.0.1:8000/api/comics").then((response) => {
      // console.log(response);

      const results = response.data.data;

      const filteredLatest = results.filter((result) => result.is_new === 1);
      // console.log("filteredLatest", filteredLatest);

      setLatestComics(filteredLatest);
    });
  }

  const comicIds = latestComics.map((comic) => comic.id);

  console.log(latestComics);

  useEffect(fetchLatestComics, []);

  return (
    <section id="main-content">
      {isLoading && <Loader />}

      {latestComics && (
        <>
          <Slider />

          <section id="latest-comics" className="p-4">
            <div className="container">
              <h1 className="bangers-regular">Ultimi arrivi:</h1>
              <div className="row row-cols-5">
                {latestComics.map((comic) => {
                  return (
                    <ComicCard
                      id={comic.id}
                      key={comic.id}
                      cover={comic.cover_img}
                      title={comic.title}
                      comicIds={comicIds}
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
