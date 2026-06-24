import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const [comicsSearchResults, setComicsSearchResults] = useState([]);
  const [charactersSearchResults, setCharactersSearchResults] = useState([]);

  const query = searchParams.get("query");

  useEffect(() => {
    const comics = axios.get(
      `http://127.0.0.1:8000/api/comics?search=${query}`,
    );

    const characters = axios.get(
      `http://127.0.0.1:8000/api/characters?search=${query}`,
    );

    Promise.all([comics, characters]).then(
      ([comicsResponse, charactersResponse]) => {
        console.log(comicsResponse);
        console.log(charactersResponse);

        setComicsSearchResults(comicsResponse.data.data);
        setCharactersSearchResults(charactersResponse.data.results);
      },
    );
  }, [query]);

  return <>Ciaooo</>;
}
