import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import GoBackBtn from "../components/GoBackBtn";
import ComicDetailCard from "../components/ComicDetailCard";

export default function ComicDetailPage() {
  const { id } = useParams();
  const [comic, setComic] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  function fetchComic() {
    axios
      .get(`http://127.0.0.1:8000/api/comics/${id}`)
      .then((response) => {
        //   console.log(response.data.data);
        setComic(response.data.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  // console.log("comic", comic);
  //   console.log(`http://127.0.0.1:8000/storage/${comic.cover_img}`);
  useEffect(fetchComic, [id]);

  return (
    <>
      <section id="main-content">
        <div className="container">
          {/* Loader */}

          {isLoading && <Loader />}

          {/* Comic */}

          {comic && (
            <>
              <GoBackBtn />
              <section
                style={{
                  backgroundImage: `url(http://127.0.0.1:8000/storage/${comic.cover_img})`,
                }}
                className="p-5 mb-5"
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
                  />
                </div>
              </section>

              {/* Related characters */}

              <section id="related-characters" className="">
                <div className="container mt-5">
                  <hr />
                  <h2 className="my-5">Related Characters:</h2>
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
                                <p className="card-text text-center">
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
