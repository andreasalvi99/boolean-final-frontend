import { useNavigate } from "react-router-dom";

export default function GoBackBtn() {
  const navigate = useNavigate();
  return (
    <div className="container p-4">
      <div>
        <button className="text-dark" onClick={() => navigate(-1)}>
          <i className="bi bi-arrow-left me-2"></i>Torna indietro
        </button>
      </div>
    </div>
  );
}
