import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SearchForm() {
  const [search, setSearch] = useState(""); // stato che controlla l'input di ricerca
  const [comicsSearchResults, setComicsSearchResults] = useState([]); //stato dei comics come risultato della ricerca
  const [charactersSearchResults, setCharactersSearchResults] = useState([]); //
  const navigate = useNavigate(); // hook per effettuare un redirect

  function handleSearch(e) {
    setSearch(e.target.value); // funzione che setta il valore di search sul valore inserito dall'utente
    console.log(e.target.value);
    if (e.target.value.trim() === "") {
      setCharactersSearchResults([]);
      setComicsSearchResults([]);
      return;
    }
    const comics = axios.get(
      `http://127.0.0.1:8000/api/comics?search=${e.target.value}`, //effettuo chiamata al db dei comics col valore cercato
    );

    const characters = axios.get(
      `http://127.0.0.1:8000/api/characters?search=${e.target.value}`, //effettuo chiamata al db dei personaggi col valore cercato
    );

    Promise.all([comics, characters]).then(
      ([comicsResponse, charactersResponse]) => {
        //promise per sincronizzare le due chiamate
        console.log(comicsResponse);
        console.log(charactersResponse);

        setComicsSearchResults(comicsResponse.data.data);
        setCharactersSearchResults(charactersResponse.data.results);
      },
    );
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (search.trim() === "") {
      return;
    }

    navigate(`/search?query=${encodeURIComponent(search)}`); //al submit del form effettua redirect con navigate e setta valore del search su vuota

    setSearch("");
  }

  return (
    <form className="d-flex" role="search">
      <div className="search-container">
        <input
          onChange={handleSearch}
          value={search}
          className="form-control me-2"
          type="search"
          placeholder="Cerca"
          aria-label="Cerca"
        />
        {search !== "" &&
          (charactersSearchResults.length > 0 ||
            comicsSearchResults.length > 0) && (
            <div className="search-dropdown">
              {charactersSearchResults.length > 0 && (
                <>
                  <ul className="m-0 p-0">
                    {charactersSearchResults.map((character) => (
                      <li key={character.id}>
                        <Link
                          to={`/characters/${character.id}`}
                          className="text-decoration-none text-dark"
                        >
                          {character.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {charactersSearchResults.length > 0 &&
                comicsSearchResults.length > 0 && <hr className="m-0" />}

              {comicsSearchResults.length > 0 && (
                <ul className="m-0 p-0">
                  {comicsSearchResults.map((comic) => (
                    <li key={comic.id}>
                      <Link
                        to={`/comics/${comic.id}`}
                        className="text-decoration-none text-dark"
                      >
                        {comic.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
      </div>

      <button
        className="btn btn-outline-success"
        type="submit"
        onClick={handleSubmit}
      >
        Cerca
      </button>
    </form>
  );
}
