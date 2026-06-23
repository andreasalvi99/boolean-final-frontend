import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function CharactersPage() {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  function fetchCharacters() {
    axios
      .get("http://127.0.0.1:8000/api/characters")
      .then((response) => {
        console.log(response.data.results);
        setCharacters(response.data.results);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(fetchCharacters, []);
  return (
    <>
      <section id="main-content">
        <div className="container mt-5">
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

          {/* Cards */}

          {characters && (
            <>
              <div className="gallery">
                {characters.map((character) => {
                  return (
                    <Link
                      className="panel related-character-card"
                      key={character.id}
                      to={`/characters/${character.id}`}
                      style={{
                        backgroundImage: `url(http://127.0.0.1:8000/storage/${character.character_img})`,
                      }}
                    >
                      <div className="card-body related-character-info">
                        <p className="card-text text-center">
                          {character.name}
                        </p>
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
