import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function CharacterDetailPage() {
  const { id } = useParams;
  const [character, setCharacter] = useState({});

  function fetchCharacterInfo() {
    axios.get(`http://127.0.0.1:8000/api/characters/${id}`).then((response) => {
      console.log(response);
    });
  }

  useEffect(fetchCharacterInfo, [id]);

  return (
    <>
      <section id="main-content">.container.mt-5</section>
    </>
  );
}
