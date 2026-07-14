import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import Loader from "../components/Loader";
import GoBackBtn from "../components/GoBackBtn";

export default function CharacterDetailPage() {
  const { id } = useParams();
  const [character, setCharacter] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  function fetchCharacterInfo() {
    axios
      .get(`http://127.0.0.1:8000/api/characters/${id}`)
      .then((response) => {
        console.log(response.data.results);
        setCharacter(response.data.results);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(fetchCharacterInfo, [id]);

  return (
    <>
      {/* Loader */}

      {isLoading && (
        <section id="main-content">
          <div className="container">
            <Loader />\
          </div>
        </section>
      )}

      {/* Character info */}

      {character && (
        <>
          <GoBackBtn />
          <div
            style={{
              backgroundImage: `url(http://127.0.0.1:8000/storage/${character.banner})`,
              backgroundPosition: "top",
              backgroundSize: "cover",
              height: "600px",
            }}
          ></div>
          <section id="main-content">
            <div className="container mt-5 character-info p-5">
              <div className="card mb-3 border-0">
                <div className="row g-0">
                  <div className="col-md-2 character-info">
                    <figure className="character-img p-2 bg-light">
                      <img
                        src={`http://127.0.0.1:8000/storage/${character.character_img}`}
                        className="img-fluid rounded-start "
                        alt="..."
                      />
                    </figure>
                  </div>
                  <div className="col-md-10">
                    <div className="card-body ms-5 oswald-special">
                      <h2 className="card-title bangers-regular h1">
                        {character.name}
                      </h2>
                      <ReactMarkdown>{character.description}</ReactMarkdown>
                    </div>
                  </div>
                </div>
              </div>

              <hr />

              {/* Related Comics */}

              <h1 className="mb-5 bangers-regular">Fumetti Correlati:</h1>
              <div className="row row-cols-lg-5 row-cols-md-3 row-cols-2 g-3">
                {character.comics?.map((comic) => {
                  return (
                    <div className="col" key={comic.id}>
                      <Link to={`/comics/${comic.id}`}>
                        <div className="card related-character-card h-100 position-relative">
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
                              <span className="mx-2">- {comic.discount}%</span>
                            </span>
                          )}
                          <img
                            src={`http://127.0.0.1:8000/storage/${comic.cover_img}`}
                            className="card-img-top h-100"
                            alt="..."
                          />
                          <div className="card-body related-character-info">
                            <p className="card-text text-center oswald-special fw-bold">
                              {comic.title}
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
    </>
  );
}
