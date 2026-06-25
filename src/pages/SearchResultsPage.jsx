import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Loader from "../components/Loader";

export default function SearchResultsPage() {
  const [searchParams] = useSearchParams(); // hook per recuperare il valore cercato nel search
  const [comicsSearchResults, setComicsSearchResults] = useState([]); //stato dei comics come risultato della ricerca
  const [charactersSearchResults, setCharactersSearchResults] = useState([]); //stato personaggi come risultato della ricerca
  const [isLoading, setIsLoading] = useState(true);

  const query = searchParams.get("query"); // recupero il valore cercato

  useEffect(() => {
    const comics = axios.get(
      `http://127.0.0.1:8000/api/comics?search=${query}`, //effettuo chiamata al db dei comics col valore cercato
    );

    const characters = axios.get(
      `http://127.0.0.1:8000/api/characters?search=${query}`, //effettuo chiamata al db dei personaggi col valore cercato
    );

    Promise.all([comics, characters])
      .then(([comicsResponse, charactersResponse]) => {
        //promise per sincronizzare le due chiamate
        console.log(comicsResponse);
        console.log(charactersResponse);

        setComicsSearchResults(comicsResponse.data.data);
        setCharactersSearchResults(charactersResponse.data.results);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [query]); //l'array delle dipendenze è quello del valore cercato, quando cambia cambiano i risultati->si aggiorna la pagina

  return (
    <>
      <section id="main-content">
        <div className="container mt-5">
          {/* Loader */}

          {isLoading && <Loader />}

          {/* Characters results */}

          {charactersSearchResults && (
            <>
              <h1 className="mb-4">
                Personaggi ({charactersSearchResults.length})
              </h1>
              <div className="row row-cols-6 g-3 mb-4">
                {charactersSearchResults.map((character) => {
                  return (
                    <Link key={character.id} to={`/characters/${character.id}`}>
                      <div className="col">
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
                    </Link>
                  );
                })}
              </div>
            </>
          )}

          <hr />

          {/* Comics results */}

          {comicsSearchResults && (
            <>
              <h2 className="h1 mb-4">
                Fumetti ({comicsSearchResults.length})
              </h2>
              <div className="row row-cols-md-3 row-cols-lg-5 g-3">
                {comicsSearchResults.map((comic) => {
                  return (
                    <Link
                      to={`/comics/${comic.id}`}
                      className="text-decoration-none"
                      key={comic.id}
                    >
                      <div className="col">
                        <div className="card h-100 border-0">
                          <div style={{ height: "379px" }}>
                            <img
                              src={`http://127.0.0.1:8000/storage/${comic.cover_img}`}
                              className="card-img-top h-100 overflow-hidden"
                              alt="..."
                            />
                          </div>
                          <div className="card-body h-25">
                            <p className="card-text text-center fw-semibold">
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
