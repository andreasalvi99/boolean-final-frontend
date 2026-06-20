import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import dateFormat from "dateformat";

export default function ComicDetailPage() {
  const { id } = useParams();
  const [comic, setComic] = useState();
  const [isLoading, setIsLoading] = useState(true);

  function fetchComic() {
    axios
      .get(`http://127.0.0.1:8000/api/comics/${id}`)
      .then((response) => {
        //   console.log(response.data.data);
        setComic(response.data.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  console.log("comic", comic);
  //   console.log(`http://127.0.0.1:8000/storage/${comic.cover_img}`);
  useEffect(fetchComic, [id]);

  return (
    <>
      {/* Loader */}

      {isLoading && !comic && (
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
      {!isLoading && comic && (
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
                  <p
                    className="card-text overflow-auto"
                    style={{ minHeight: "100px" }}
                  >
                    {comic.description}
                  </p>
                  <p className="card-text">
                    Pubblicazione:
                    <span className="text-body-secondary">
                      {dateFormat(comic.release_date, " dddd, mmmm dS, yyyy")}
                    </span>
                  </p>
                  <div>
                    Featuring:
                    <span>
                      {comic.characters.map((character, index) => {
                        return (
                          " " +
                          character.name +
                          (index < comic.characters.length - 1 ? ", " : "")
                        );
                      })}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between align-items-end">
                    <img
                      src={`http://127.0.0.1:8000/storage/${comic.brand.logo}`}
                      alt=""
                      style={{
                        height:
                          comic.brand.name === "DC Comics" ? "80px" : "100px",
                        width:
                          comic.brand.name === "Marvel Comics"
                            ? "200px"
                            : "100px",
                      }}
                    />
                    <p className="align-self-end m-0 fs-1 fw-semibold">
                      <i>&euro;{comic.price}</i>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <section id="related-characters" className="my-5">
            <div className="container my-5">
              <div className="row row-cols-6 g-3">
                {comic.characters.map((character) => {
                  return (
                    <div className="col" key={character.id}>
                      <div className="card border-0 related-character-card h-100">
                        <img
                          src={`http://127.0.0.1:8000/storage/${character.character_img}`}
                          className="card-img-top h-100"
                          alt="..."
                        />
                        <div className="card-body related-character-info">
                          <p className="card-text text-center">
                            {character.name}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}
