import { useNavigate, useLocation } from "react-router-dom";

export default function GoBackBtn() {
  const location = useLocation();
  const navigate = useNavigate();

  const destination = location.state?.from;
  return (
    <div className="container p-4">
      <div>
        <button
          className="text-dark"
          onClick={() => {
            if (destination) {
              navigate(destination);
            } else {
              navigate(-1);
            }
          }}
        >
          <i className="bi bi-arrow-left me-2"></i>Torna indietro
        </button>
      </div>
    </div>
  );
}
