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
  comic,
  price,
}) {
  const location = useLocation();

  function calcDiscountedPrice(price, discountValue) {
    const discount = (price * discountValue) / 100;

    const finalPrice = Math.round(price - discount).toFixed(2);

    return finalPrice;
  }

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
          <div style={{ height: "360px" }}>
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
          <div className="card-body d-flex flex-column justify-content-around align-items-center bebas-neue-regular p-3">
            <p className="card-text text-center fw-semibold m-0">
              {title.length < 28 ? title : `${title.substring(0, 29)}...`}
            </p>
            <div>
              <span
                className={`fs-6 d-inline me-1 ${isDiscount ? "text-decoration-line-through" : ""}`}
              >
                {price} &euro;
              </span>
              {isDiscount && (
                <span className="fs-6 d-inline text-danger ">
                  {calcDiscountedPrice(price, isDiscount)} &euro;
                </span>
              )}
            </div>
          </div>
          <button
            type="button"
            className="btn btn-outline-dark mx-auto mb-2 p-1"
            style={{ width: "93%" }}
            onClick={() => addToCart(comic)}
          >
            <div className="d-flex justify-content-center align-items-center gap-2">
              <i className="bi bi-bag-plus"></i>
              <span className="bebas-neue-regular fs-5">
                Aggiungi al carrello
              </span>
            </div>
          </button>
        </div>
      </div>
    </>
  );
}
