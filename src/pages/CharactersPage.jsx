import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";

export default function CharactersPage() {
  const [characters, setCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const charactersPerPage = 10;

  const startIndex = currentPage * charactersPerPage;
  const endIndex = startIndex + charactersPerPage;

  const visibleCharacters = characters.slice(startIndex, endIndex);

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

          {isLoading && <Loader />}

          {/* Characters cards */}

          {characters && (
            <div className="d-flex justify-content-between gap-2 align-items-center">
              <button onClick={prevPage}>
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
              <button onClick={nextPage}>
                <i className="bi bi-caret-right-fill"></i>
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
