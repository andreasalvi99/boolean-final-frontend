import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import GoBackBtn from "../components/GoBackBtn";
import ComicDetailCard from "../components/ComicDetailCard";

export default function ComicDetailPage() {
  const { id } = useParams();
  const [comic, setComic] = useState({});
  const [previous, setPrevious] = useState(null);
  const [next, setNext] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Hook che restituisce info sulla pagina corrente
  const location = useLocation();
  // Prendi comicIds da location.state e se non esiste (?) prendi un array vuoto
  const comicIds = location.state?.comicIds ?? [];
  // Estrapolo l'indice a cui corrisponde l'id(parsato) presente nell'url
  const currentIndex = comicIds.indexOf(Number(id));
  // Se l'indice attuale è > 0 allora vado indietro di un elemento nell'array
  const previousId = currentIndex > 0 ? comicIds[currentIndex - 1] : null;
  // Se l'indice attuale è < della lunghezza dell'array della ricerca -1 allora vado avanti di un elemento nell'array
  const nextId =
    currentIndex < comicIds.length - 1 ? comicIds[currentIndex + 1] : null;
  // Variabile che mi dice se sono arrivato al dettaglio da una ricerca o dalla pagina dei fumetti
  const hasSearchResults = comicIds.length > 0;
  // Se arrivo dalla ricerca allora previousId, altrimenti previous?.id;
  const prevComicId = hasSearchResults ? previousId : previous?.id;
  // Se arrivo dalla ricerca allora nextId, altrimenti next?.id;
  const nextComicId = hasSearchResults ? nextId : next?.id;

  function fetchComic() {
    axios
      .get(`http://127.0.0.1:8000/api/comics/${id}`)
      .then((response) => {
        console.log("response", response.data);
        setComic(response.data.data);
        setPrevious(response.data.previous);
        setNext(response.data.next);
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
      <section id="main-content">
        <div className="container p-4">
          {/* Loader */}

          {isLoading && <Loader />}

          {/* Comic */}

          {comic && (
            <>
              <GoBackBtn />
              <div className="d-flex align-items-center justify-content-between gap-3">
                {!prevComicId && (
                  <button className="text-dark opacity-25" disabled>
                    <i className="bi bi-arrow-left-circle-fill fs-3"></i>
                  </button>
                )}

                {prevComicId && (
                  <Link
                    to={`/comics/${prevComicId}`}
                    className="text-dark"
                    // Vado alla pagina successiva e mi porto dietro i dati con cui sono arrivato su questa pagina
                    state={hasSearchResults ? location.state : undefined}
                  >
                    <i className="bi bi-arrow-left-circle-fill fs-3"></i>
                  </Link>
                )}

                <section
                  style={{
                    backgroundImage: `url(http://127.0.0.1:8000/storage/${comic.cover_img})`,
                  }}
                  className="p-5 flex-grow-1 rounded-2"
                  id="comic-detail"
                >
                  <div className="container">
                    <ComicDetailCard
                      cover={comic.cover_img}
                      title={comic.title}
                      description={comic.description}
                      release_date={comic.release_date}
                      characters={comic.characters}
                      brand={comic.brand}
                      price={comic.price}
                      isNew={comic.is_new}
                      isPreorder={comic.is_preorder}
                      isDiscount={comic.discount}
                    />
                  </div>
                </section>

                {!nextComicId && (
                  <button className="text-dark opacity-25" disabled>
                    <i className="bi bi-arrow-right-circle-fill fs-3"></i>
                  </button>
                )}

                {nextComicId && (
                  <Link
                    to={`/comics/${nextComicId}`}
                    className="text-dark"
                    state={hasSearchResults ? location.state : undefined}
                  >
                    <i className="bi bi-arrow-right-circle-fill fs-3"></i>
                  </Link>
                )}
              </div>

              {/* Related characters */}

              <section id="related-characters" className="">
                <div className="container mt-5">
                  <hr />
                  <h2 className="my-5 bangers-regular">
                    Personaggi correlati:
                  </h2>
                  <div className="row row-cols-6 g-3">
                    {comic.characters?.map((character) => {
                      return (
                        <div className="col" key={character.id}>
                          <Link to={`/characters/${character.id}`}>
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
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>
            </>
          )}
        </div>
      </section>
    </>
  );
}
