import axios from "axios";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import Loader from "../components/Loader";
import ComicCard from "../components/ComicCard";

export default function ComicsPage() {
  const { cart, setCart } = useOutletContext();
  const [comics, setComics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  function addToCart(comic) {
    const cartItem = {
      comic: comic,
      quantity: 1
    }

    const existingCartItem = cart.find((item) => {
      return item.comic.id === cartItem.comic.id
    }
    )

    if (existingCartItem) {
  const updatedCart = cart.map((item) => {
    if (item.comic.id === comic.id) {
      return {
        ...item,
        quantity: item.quantity + 1
      };
    } else {
      return item;
    }
  });

  setCart(updatedCart);
} else {
  setCart([...cart, cartItem]);
}}

  function fetchComics() {
    axios
      .get("https://laravel-final-backend.onrender.com/api/comics")
      .then((response) => {
        setComics(response.data.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  //# Filtro per dividere i brand DC e Marvel
  const marvelComics = comics.filter((comic) => {
    return comic.brand_id === 2;
  });

  const dcComics = comics.filter((comic) => {
    return comic.brand_id === 1;
  });

  const dcComicIds = dcComics.map((comic) => comic.id);
  const marvelComicIds = marvelComics.map((comic) => comic.id);

  useEffect(fetchComics, []);

  return (
    <>
      <section id="main-content">
        <div className="container mt-5">
          {/* Loader */}

          {isLoading && <Loader />}

          {comics.length > 0 && (
            <>
              {/* DC Comics */}
              <section id="DC" className="">
                <h2 className="my-3 bangers-regular h1">DC Universe</h2>
                <p className="bebas-neue-regular fs-5">
                  Entra nell'universo DC e scopri le avventure dei suoi eroi e
                  villain più iconici. Da Gotham City a Metropolis, esplora una
                  selezione di fumetti che raccontano le imprese di Batman,
                  Superman, Wonder Woman, Flash e molti altri protagonisti che
                  hanno fatto la storia dei comics. Che tu sia un collezionista
                  o un nuovo lettore, qui troverai storie capaci di emozionare,
                  sorprendere e lasciare il segno.
                </p>
                <div className="row row-cols-1 row-cols-md-3 row-cols-lg-5 g-1 g-md-3">
                  {dcComics.map((dcComic) => {
                    return (
                      <ComicCard
                        key={dcComic.id}
                        id={dcComic.id}
                        cover={dcComic.cover_img}
                        title={dcComic.title}
                        comicIds={dcComicIds}
                        isNew={dcComic.is_new}
                        isPreorder={dcComic.is_preorder}
                        isDiscount={dcComic.discount}
                        addToCart={addToCart}
                        comic={dcComic}
                      />
                    );
                  })}
                </div>
              </section>

              {/* Marvel Comics */}

              <section id="Marvel" className="">
                <h2 className="my-3 bangers-regular h1">MARVEL Universe</h2>
                <p className="bebas-neue-regular fs-5">
                  Scopri il mondo Marvel attraverso una selezione di fumetti
                  dedicati ai suoi eroi più leggendari. Dalle strade di New York
                  alle profondità dello spazio, segui le avventure di
                  Spider-Man, Iron Man, Captain America, gli Avengers, gli X-Men
                  e molti altri protagonisti. Azione, colpi di scena e storie
                  indimenticabili ti aspettano per arricchire la tua collezione
                  con il meglio dell'universo Marvel.
                </p>
                <div className="row row-cols-1 row-cols-md-3 row-cols-lg-5 g-1 g-md-3">
                  {marvelComics.map((marvelComic) => {
                    return (
                      <ComicCard
                        key={marvelComic.id}
                        id={marvelComic.id}
                        cover={marvelComic.cover_img}
                        title={marvelComic.title}
                        comicIds={marvelComicIds}
                        isNew={marvelComic.is_new}
                        isPreorder={marvelComic.is_preorder}
                        isDiscount={marvelComic.discount}
                        addToCart={addToCart}
                        comic={marvelComic}
                      />
                    );
                  })}
                </div>
              </section>
            </>
          )}
        </div>
      </section>
    </>
  );
}
