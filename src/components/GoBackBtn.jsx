import { useNavigate } from "react-router-dom";

export default function GoBackBtn({ destination }) {
  const navigate = useNavigate();
  return (
    <div className="container p-4">
      <div>
        <button className="text-dark" onClick={() => navigate(destination)}>
          <i className="bi bi-arrow-left me-2"></i>Torna indietro
        </button>
      </div>
    </div>
  );
}
