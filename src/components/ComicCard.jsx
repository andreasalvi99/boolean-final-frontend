import { Link, useLocation } from "react-router-dom";

export default function ComicCard({
  id,
  cover,
  title,
  comicIds,
  isNew,
  isPreorder,
  isDiscount,
  addToCart,
  comic
}) {
  const location = useLocation();
  
  return (
    <>
      <div className="col">
          <div
            className="card h-100 border-0 to-animate position-relative mx-auto"
            style={{ maxWidth: "253px" }}
          >
            
            {isNew === 1 && (
              <span className="status-badge text-bg-primary bebas-neue-regular">
                <span className="mx-2"> New!</span>
              </span>
            )}
            {isPreorder === 1 && (
              <span className="status-badge text-bg-info bebas-neue-regular">
                <span className="mx-2"> Soon!</span>
              </span>
            )}
            {isDiscount > 0 && (
              <span className="status-badge text-bg-danger bebas-neue-regular">
                <span className="mx-2">-{isDiscount}%</span>
              </span>
            )}
            <div style={{ height: "370px" }}>
              <Link
              to={`/comics/${id}`}
              className="text-decoration-none text-dark"
              key={id}
              state={{ comicIds, from: location.pathname + location.search }}
            >
              <img
                src={`https://laravel-final-backend.onrender.com/img/${cover}`}
                className="card-img-top h-100 overflow-hidden"
                alt="..."
              />
              </Link>
            </div>
            <div className="card-body h-25">
              <p className="card-text text-center fw-semibold bebas-neue-regular">
                {title}
              </p>
            </div>
            <button className="btn btn-primary mx-auto mb-2" style={{ width: "93%" }}
                    onClick={() => addToCart(comic)}><i className="bi bi-bag-plus"></i> Aggiungi al carrello</button>
          </div>
      </div>
    </>
  );
}
