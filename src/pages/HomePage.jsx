import { useEffect, useState } from "react";
import Header from "../components/Header";
import Slider from "../components/slider/Slider";
import axios from "axios";
import ComicCard from "../components/ComicCard";
import Loader from "../components/Loader";

export default function HomePage() {
  const [latestComics, setLatestComics] = useState([]);
  const [preorderComics, setPreorderComics] = useState([]);
  const [discountComics, setDiscountComics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  function fetchSpecialComics() {
    axios
      .get("https://laravel-final-backend.onrender.com//api/comics")
      .then((response) => {
        const results = response.data.data;
        console.log(results);

        const filteredLatest = results.filter((result) => result.is_new === 1);
        setLatestComics(filteredLatest);

        const filteredPreorder = results.filter(
          (result) => result.is_preorder === 1,
        );
        setPreorderComics(filteredPreorder);

        const filteredDiscount = results.filter(
          (result) => result.discount > 0,
        );
        setDiscountComics(filteredDiscount);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const latestComicIds = latestComics.map((comic) => comic.id);
  const preorderComicIds = preorderComics.map((comic) => comic.id);
  const discountComicIds = discountComics.map((comic) => comic.id);

  // console.log(latestComics);

  useEffect(fetchSpecialComics, []);

  return (
    <section id="main-content">
      {isLoading && <Loader />}

      {latestComics.length > 0 && (
        <>
          <Slider />

          <section id="latest-comics" className="p-4">
            <div className="container">
              {/* <div className="d-flex justify-content-center align-items-center gap-4"> */}
              {/* <button className="go-prev">
                <i class="bi bi-caret-left-fill"></i>
              </button> */}
              {/* <div> */}
              <h1 className="bangers-regular">Ultimi arrivi</h1>
              <p className="bebas-neue-regular fs-5">
                Scopri le ultime novità dal mondo dei fumetti Marvel e DC: nuove
                storie, grandi eroi e avventure imperdibili sono appena arrivati
                nella nostra collezione. Dalle battaglie epiche dei più potenti
                supereroi alle storie più intime e sorprendenti dei personaggi
                più amati, ogni albo è pronto per entrare nella tua libreria. Le
                nuove uscite includono saghe ricche di azione, capitoli
                fondamentali e racconti capaci di conquistare sia i lettori
                storici che chi si avvicina per la prima volta al mondo dei
                comics. Esplora i nuovi arrivi, scegli il tuo prossimo fumetto e
                porta a casa un pezzo dell'universo Marvel e DC.
              </p>
              <div className="row row-cols-1 row-cols-md-3 row-cols-lg-5 g-1 g-md-3">
                {latestComics.map((comic) => {
                  return (
                    <ComicCard
                      id={comic.id}
                      key={comic.id}
                      cover={comic.cover_img}
                      title={comic.title}
                      comicIds={latestComicIds}
                      isNew={comic.is_new}
                    />
                  );
                })}
              </div>
              {/* </div> */}
              {/* <button className="go-next">
                <i class="bi bi-caret-right-fill"></i>
              </button> */}
              {/* </div> */}
              <div className="d-flex justify-content-center">
                <button className="button-49" role="button">
                  LET'S GO
                </button>
              </div>
            </div>
          </section>

          <section id="preoder-comics" className="p-4">
            <div className="container">
              {/* <div className="d-flex justify-content-center align-items-center gap-4"> */}
              {/* <button className="go-prev">
                <i class="bi bi-caret-left-fill"></i>
              </button> */}
              {/* <div> */}
              <h1 className="bangers-regular">Preordini</h1>
              <p className="bebas-neue-regular fs-5">
                Anticipa tutti e prenota i fumetti Marvel e DC in uscita. I
                nostri preordini ti permettono di riservare le nuove
                pubblicazioni prima della disponibilità ufficiale, senza
                rischiare di perdere i titoli più attesi. Nuove saghe, ritorni
                sorprendenti e avventure inedite dei più grandi eroi dei comics
                stanno per entrare nella tua collezione. Preparati al prossimo
                capitolo della storia e assicurati la tua copia in anticipo.
              </p>
              <div className="row row-cols-1 row-cols-md-3 row-cols-lg-5 g-1 g-md-3">
                {preorderComics.map((comic) => {
                  return (
                    <ComicCard
                      id={comic.id}
                      key={comic.id}
                      cover={comic.cover_img}
                      title={comic.title}
                      comicIds={preorderComicIds}
                      isPreorder={comic.is_preorder}
                    />
                  );
                })}
              </div>
              {/* </div> */}
              {/* <button className="go-next">
                <i class="bi bi-caret-right-fill"></i>
              </button> */}
              {/* </div> */}
              <div className="d-flex justify-content-center">
                <button className="button-49" role="button">
                  LET'S GO
                </button>
              </div>
            </div>
          </section>

          <section id="discount-comics" className="p-4">
            <div className="container">
              {/* <div className="d-flex justify-content-center align-items-center gap-4"> */}
              {/* <button className="go-prev">
                <i class="bi bi-caret-left-fill"></i>
              </button> */}
              {/* <div> */}
              <h1 className="bangers-regular">Scontati</h1>
              <p className="bebas-neue-regular fs-5">
                La tua collezione merita sempre nuove avventure. Abbiamo
                selezionato una serie di fumetti Marvel e DC disponibili in
                offerta, con titoli dedicati agli eroi più iconici e alle saghe
                che hanno segnato il mondo dei comics. Scopri le promozioni
                attive, risparmia sui tuoi prossimi acquisti e aggiungi alla tua
                libreria nuovi capitoli dell'universo Marvel e DC.
              </p>
              <div className="row row-cols-1 row-cols-md-3 row-cols-lg-5 g-1 g-md-3">
                {discountComics.map((comic) => {
                  return (
                    <ComicCard
                      id={comic.id}
                      key={comic.id}
                      cover={comic.cover_img}
                      title={comic.title}
                      comicIds={discountComicIds}
                      isDiscount={comic.discount}
                    />
                  );
                })}
              </div>
              {/* </div> */}
              {/* <button className="go-next">
                <i class="bi bi-caret-right-fill"></i>
              </button> */}
              {/* </div> */}
              <div className="d-flex justify-content-center">
                <button className="button-49" role="button">
                  LET'S GO
                </button>
              </div>
            </div>
          </section>
        </>
      )}
    </section>
  );
}
