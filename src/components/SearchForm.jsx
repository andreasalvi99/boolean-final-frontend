import axios from "axios";
import { useState } from "react";

export default function SearchForm() {
  const [search, setSearch] = useState("");

  function handleSearch(e) {
    setSearch(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .get(`http://127.0.0.1:8000/api/comics?search=${search}`)
      .then((response) => {
        console.log(response);
      });
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
