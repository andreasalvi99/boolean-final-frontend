import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";

export default function CharacterDetailPage() {
  const { id } = useParams();
  const [character, setCharacter] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  function fetchCharacterInfo() {
    axios
      .get(`http://127.0.0.1:8000/api/characters/${id}`)
      .then((response) => {
        console.log(response.data.results);
        setCharacter(response.data.results);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(fetchCharacterInfo, [id]);

  return (
    <>
      <section id="main-content">
        <div className="container p-4">
          <Link to="/characters" className="text-dark">
            <i className="bi bi-arrow-left me-2"></i>Torna ai personaggi
          </Link>
        </div>
        <div
          style={{
            backgroundImage: `url(http://127.0.0.1:8000/storage/${character.banner})`,
            backgroundPosition: "top",
            backgroundSize: "cover",
            height: "600px",
          }}
        ></div>
        <div className="container mt-5 character-info">
          {/* Loader */}

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

          {/* Character info */}

          {character && (
            <>
              <div className="card mb-3 border-0">
                <div className="row g-0">
                  <div className="col-md-2 character-info">
                    <figure className="character-img p-2 bg-light">
                      <img
                        src={`http://127.0.0.1:8000/storage/${character.character_img}`}
                        className="img-fluid rounded-start "
                        alt="..."
                      />
                    </figure>
                  </div>
                  <div className="col-md-10">
                    <div className="card-body ms-5">
                      <h2 className="card-title">{character.name}</h2>
                      <ReactMarkdown>{character.description}</ReactMarkdown>
                    </div>
                  </div>
                </div>
              </div>

              {/* Related Comics */}
              <h1 className="mb-5">Related Comics:</h1>
              <div className="row row-cols-5 g-3">
                {character.comics?.map((comic) => {
                  return (
                    <Link
                      key={comic.id}
                      to={`http://localhost:5174/comics/${comic.id}`}
                    >
                      <div className="col">
                        <div className="card related-character-card h-100">
                          <img
                            src={`http://127.0.0.1:8000/storage/${comic.cover_img}`}
                            className="card-img-top h-100"
                            alt="..."
                          />
                          <div className="card-body related-character-info">
                            <p className="card-text text-center">
                              {comic.title}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
