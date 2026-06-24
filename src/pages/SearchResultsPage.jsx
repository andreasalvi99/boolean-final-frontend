import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function SearchResultsPage() {
  const [searchParams] = useSearchParams(); // hook per recuperare il valore cercato nel search
  const [comicsSearchResults, setComicsSearchResults] = useState([]); //stato dei comics come risultato della ricerca
  const [charactersSearchResults, setCharactersSearchResults] = useState([]); //stato personaggi come risultato della ricerca

  const query = searchParams.get("query"); // recupero il valore cercato

  useEffect(() => {
    const comics = axios.get(
      `http://127.0.0.1:8000/api/comics?search=${query}`, //effettuo chiamata al db dei comics col valore cercato
    );

    const characters = axios.get(
      `http://127.0.0.1:8000/api/characters?search=${query}`, //effettuo chiamata al db dei personaggi col valore cercato
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
  }, [query]); //l'array delle dipendenze è quello del valore cercato, quando cambia cambiano i risultati->si aggiorna la pagina

  return <>Ciaooo</>;
}
