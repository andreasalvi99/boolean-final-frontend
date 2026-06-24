import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchForm() {
  const [search, setSearch] = useState(""); // stato che controlla l'input di ricerca
  const navigate = useNavigate(); // hook per effettuare un redirect

  function handleSearch(e) {
    setSearch(e.target.value); // funzione che setta il valore di search sul valore inserito dall'utente
  }

  function handleSubmit(e) {
    e.preventDefault();

    navigate(`/search?query=${encodeURIComponent(search)}`); //al submit del form effettua redirect con navigate e setta valore del search su vuota

    setSearch("");
  }

  return (
    <form className="d-flex" role="search">
      <input
        onChange={handleSearch}
        value={search}
        className="form-control me-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
      />

      <button
        className="btn btn-outline-success"
        type="submit"
        onClick={handleSubmit}
      >
        Search
      </button>
    </form>
  );
}
