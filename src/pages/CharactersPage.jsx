import axios from "axios";
import { useEffect, useState } from "react";

export default function CharactersPage() {
  const [characters, setCharacters] = useState([]);

  function fetchCharacters() {
    axios.get("http://127.0.0.1:8000/api/characters").then((response) => {
      //   console.log(response.data.results);
      setCharacters(response.data.results);
    });
  }

  useEffect(fetchCharacters, []);
  return (
    <>
      <section>
        <div className="container">
          <div className="gallery">
            {characters.map((character) => {
              return (
                <div
                  className="panel"
                  style={{
                    backgroundImage: `url(http://127.0.0.1:8000/storage/${character.character_img})`,
                  }}
                  key={character.id}
                ></div>

                // <div className="col" key={character.id}>
                //   <div className="card h-100">
                //     <img
                //       src={`http://127.0.0.1:8000/storage/${character.character_img}`}
                //       className="card-img-top h-100"
                //       alt="..."
                //     />
                //   </div>
                // </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
