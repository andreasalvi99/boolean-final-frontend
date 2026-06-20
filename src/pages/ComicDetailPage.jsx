import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import dateFormat from "dateformat";

export default function ComicDetailPage() {
  const { id } = useParams();
  const [comic, setComic] = useState();

  function fetchComic() {
    axios.get(`http://127.0.0.1:8000/api/comics/${id}`).then((response) => {
      //   console.log(response.data.data);
      setComic(response.data.data);
    });
  }

  console.log("comic", comic);

  useEffect(fetchComic, [id]);

  return (
    <>
      {comic && (
        <>
          <div className="mb-3">
            <Link to="/comics" className="text-dark">
              <i className="bi bi-arrow-left me-2"></i>Torna ai fumetti
            </Link>
          </div>
          <div className="card mb-3">
            <div className="row g-0">
              <div className="col-md-4">
                <img
                  src={`http://127.0.0.1:8000/storage/${comic.cover_img}`}
                  className="img-fluid rounded-start w-100 h-100"
                  alt={comic.title}
                />
              </div>
              <div className="col-md-8">
                <div className="card-body p-5 d-flex flex-column justify-content-between h-100">
                  <h5 className="card-title">{comic.title}</h5>
                  <p className="card-text overflow-auto">{comic.description}</p>
                  <p className="card-text">
                    Pubblicazione:
                    <span className="text-body-secondary">
                      {dateFormat(comic.relese_date, " dddd, mmmm dS, yyyy")}
                    </span>
                  </p>
                  <div>
                    Featuring:
                    <span>
                      {comic.characters.map((character, index) => {
                        return (
                          character.name +
                          (index < comic.characters.length - 1 ? ", " : "")
                        );
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
