import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Loader from "../components/Loader";
import NoResults from "../components/NoResults";
import ComicCard from "../components/ComicCard";

export default function SearchResultsPage() {
  const [searchParams] = useSearchParams(); // hook per recuperare il valore cercato nel search
  const [comicsSearchResults, setComicsSearchResults] = useState([]); //stato dei comics come risultato della ricerca
  const [charactersSearchResults, setCharactersSearchResults] = useState([]); //stato personaggi come risultato della ricerca
  const [isLoading, setIsLoading] = useState(true);

  const query = searchParams.get("query"); // recupero il valore cercato

  useEffect(() => {
    const comics = axios.get(
      `https://laravel-final-backend.onrender.com/api/comics?search=${query}`, //effettuo chiamata al db dei comics col valore cercato
    );

    const characters = axios.get(
      `https://laravel-final-backend.onrender.com/api/characters?search=${query}`, //effettuo chiamata al db dei personaggi col valore cercato
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

  const comicIds = comicsSearchResults.map((comic) => comic.id);

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
                              src={`https://laravel-final-backend.onrender.com/${character.character_img}`}
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
                <div className="row row-cols-1 row-cols-lg-5 g-3">
                  {comicsSearchResults.map((comic) => {
                    return (
                      <ComicCard
                        key={comic.id}
                        id={comic.id}
                        cover={comic.cover_img}
                        title={comic.title}
                        comicIds={comicIds}
                        isNew={comic.is_new}
                        isPreorder={comic.is_preorder}
                        isDiscount={comic.discount}
                      />
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
