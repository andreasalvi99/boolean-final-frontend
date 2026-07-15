import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Loader from "../components/Loader";
import NoResults from "../components/NoResults";

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
        {isLoading && <Loader />}

        {comicsSearchResults.length === 0 &&
          charactersSearchResults.length === 0 &&
          !isLoading && <NoResults />}

        {(comicsSearchResults.length > 0 ||
          charactersSearchResults.length > 0) && (
          <div className="container mt-5">
            {/* Loader */}

            {isLoading && <Loader />}

            <h3 className="h1 bangers-regular mb-5">
              risultati di ricerca per "{query}":
            </h3>

            {/* Characters results */}

            {charactersSearchResults.length > 0 && (
              <>
                <h1 className="mb-4 bangers-regular">
                  Personaggi ({charactersSearchResults.length})
                </h1>
                <div className="row row-cols-lg-6 row-cols-2 g-3 mb-4">
                  {charactersSearchResults.map((character) => {
                    return (
                      <Link
                        key={character.id}
                        to={`/characters/${character.id}`}
                      >
                        <div className="col">
                          <div className="card border-0 related-character-card h-100">
                            <img
                              src={`http://127.0.0.1:8000/storage/${character.character_img}`}
                              className="card-img-top h-100"
                              alt="..."
                            />
                            <div className="card-body related-character-info">
                              <p className="card-text text-center oswald-special fw-bold">
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

            {comicsSearchResults.length > 0 && (
              <>
                <h2 className="h1 mb-4 bangers-regular">
                  Fumetti ({comicsSearchResults.length})
                </h2>
                <div className="row row-cols-2 row-cols-lg-5 g-3">
                  {comicsSearchResults.map((comic) => {
                    return (
                      <Link
                        to={`/comics/${comic.id}`}
                        className="text-decoration-none"
                        key={comic.id}
                        // Uso lo state per passare i dati alla pagina di destinazione (l'id dei comics che escono dalla ricerca)
                        state={{
                          comicIds: comicsSearchResults.map((c) => c.id),
                          from: `/search?query=${query}`,
                        }}
                      >
                        <div className="col">
                          <div className="card h-100 border-0 to-animate position-relative">
                            {comic.is_new === 1 && (
                              <span className="status-badge text-bg-primary bebas-neue-regular">
                                <span className="mx-2"> New!</span>
                              </span>
                            )}
                            {comic.is_preorder === 1 && (
                              <span className="status-badge text-bg-info bebas-neue-regular">
                                <span className="mx-2"> Soon!</span>
                              </span>
                            )}
                            {comic.discount > 0 && (
                              <span className="status-badge text-bg-danger bebas-neue-regular">
                                <span className="mx-2">-{comic.discount}%</span>
                              </span>
                            )}
                            <div style={{ height: "379px" }}>
                              <img
                                src={`http://127.0.0.1:8000/storage/${comic.cover_img}`}
                                className="card-img-top h-100 overflow-hidden"
                                alt="..."
                              />
                            </div>
                            <div className="card-body h-25">
                              <p className="card-text text-center fw-semibold bebas-neue-regular">
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
        )}
      </section>
    </>
  );
}
