import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function ComicsPage() {
  const [comics, setComics] = useState([]);

  function fetchComics() {
    axios.get("http://127.0.0.1:8000/api/comics").then((response) => {
      console.log(response.data.data);
      setComics(response.data.data);
    });
  }

  useEffect(fetchComics, []);

  return (
    <>
      <div className="row row-cols-5 g-3">
        {comics.map((comic) => {
          return (
            <div key={comic.id} className="col">
              <div className="card h-100">
                <img
                  src={`http://127.0.0.1:8000/storage/${comic.cover_img}`}
                  className="card-img-top h-100"
                  alt={comic.title}
                />
                <div className="card-body">
                  <p className="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card’s content.
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
