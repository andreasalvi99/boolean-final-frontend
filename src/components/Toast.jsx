export default function Toast({ isVisible }) {
  return (
    <div className="toast-container position-fixed bottom-0 end-0 p-3">
      <div
        className={`toast ${isVisible ? "show" : ""} align-items-center bg-success text-white`}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="d-flex">
          <div className="toast-body">Aggiunto al carrello</div>
          <button
            type="button"
            className="btn-close btn-close-white me-2 m-auto"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
      </div>
    </div>
  );
}
