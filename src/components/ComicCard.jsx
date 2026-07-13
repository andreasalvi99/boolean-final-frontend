import { Link } from "react-router-dom";

export default function ComicCard({
  id,
  cover,
  title,
  comicIds,
  isNew,
  isPreorder,
}) {
  return (
    <>
      <Link
        to={`/comics/${id}`}
        className="text-decoration-none"
        key={id}
        state={{ comicIds, from: "/comics" }}
      >
        <div className="col">
          <div className="card h-100 border-0 to-animate position-relative">
            {isNew === 1 && (
              <span className="status-badge text-bg-danger bebas-neue-regular">
                <span className="mx-2"> New!</span>
              </span>
            )}
            {isPreorder === 1 && (
              <span className="status-badge text-bg-danger bebas-neue-regular">
                <span className="mx-2"> Soon!</span>
              </span>
            )}
            <div style={{ height: "379px" }}>
              <img
                src={`http://127.0.0.1:8000/storage/${cover}`}
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
        </div>
      </Link>
    </>
  );
}
