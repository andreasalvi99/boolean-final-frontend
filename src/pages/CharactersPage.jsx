import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";

export default function CharactersPage() {
  const [characters, setCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const charactersPerPage = 7;

  const startIndex = currentPage * charactersPerPage;
  const endIndex = startIndex + charactersPerPage;

  const visibleCharacters = characters.slice(
    startIndex,
    startIndex + charactersPerPage,
  );

  const nextPage = () => {
    if (endIndex < characters.length) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  function fetchCharacters() {
    axios
      .get("http://127.0.0.1:8000/api/characters")
      .then((response) => {
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

          {isLoading && <Loader />}

          {/* Characters cards */}

          {characters && (
            <>
              <h1 className="ms-5 bangers-regular">ROSTER DEI PERSONAGGI</h1>
              <div className="d-flex justify-content-between gap-2 align-items-center">
                <button onClick={prevPage} className="go-prev">
                  <i className="bi bi-caret-left-fill"></i>
                </button>
                <div className="gallery">
                  {visibleCharacters.map((character) => {
                    return (
                      <Link
                        className="panel related-character-card"
                        key={character.id}
                        to={`/characters/${character.id}`}
                        style={{
                          backgroundImage: `url(http://127.0.0.1:8000/storage/${character.character_img})`,
                        }}
                        state={"/characters"}
                      >
                        <div className="card-body related-character-info">
                          <p className="card-text text-center bebas-neue-regular fw-bold">
                            {character.name}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
                <button onClick={nextPage} className="go-next">
                  <i className="bi bi-caret-right-fill"></i>
                </button>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
