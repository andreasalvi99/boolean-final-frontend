import { Link, useLocation } from "react-router-dom";

export default function ComicCard({
  id,
  cover,
  title,
  comicIds,
  isNew,
  isPreorder,
  isDiscount,
}) {
  const location = useLocation();
  return (
    <>
      <div className="col">
        <Link
          to={`/comics/${id}`}
          className="text-decoration-none"
          key={id}
          state={{ comicIds, from: location.pathname + location.search }}
        >
          <div
            className="card h-100 border-0 to-animate position-relative"
            // style={{ maxWidth: "253px" }}
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
              <img
                src={`http://192.168.1.252:8000/storage/${cover}`}
                className="card-img-top h-100 overflow-hidden"
                alt="..."
              />
            </div>
            <div className="card-body h-25">
              <p className="card-text text-center fw-semibold bebas-neue-regular">
                {title}
              </p>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}
