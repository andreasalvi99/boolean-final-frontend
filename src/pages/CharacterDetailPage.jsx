import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";

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
      <section id="main-content">
        <div
          style={{
            backgroundImage: `url(http://127.0.0.1:8000/storage/${character.banner})`,
            backgroundPosition: "top",
            backgroundSize: "cover",
            height: "600px",
          }}
        ></div>
        <div className="container mt-5 character-info">
          {/* Loader */}
          {isLoading && (
            <div className="d-flex justify-content-center align-items-center vh-100">
              <div
                className="spinner-grow mx-2"
                style={{ width: "3rem", height: "3rem" }}
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
              <div
                className="spinner-grow mx-2"
                style={{ width: "3rem", height: "3rem" }}
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
              <div
                className="spinner-grow mx-2"
                style={{ width: "3rem", height: "3rem" }}
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}

          {/* Character info */}

          {character && (
            <>
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
                    <div className="card-body ms-5">
                      <h2 className="card-title">{character.name}</h2>

                      <p className="card-text">
                        <ReactMarkdown>{character.description}</ReactMarkdown>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
