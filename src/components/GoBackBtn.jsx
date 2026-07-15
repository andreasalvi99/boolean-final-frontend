import { useNavigate, useLocation } from "react-router-dom";

export default function GoBackBtn() {
  const location = useLocation();
  const navigate = useNavigate();

  const destination = location.state?.from;
  return (
    <div className="container p-4 oswald-special">
      <div>
        <button
          className="text-dark border-0 bg-transparent"
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
