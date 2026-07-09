import { Link } from "react-router-dom";

export default function ComicCard({ id, cover, title, comicIds }) {
  return (
    <>
      <Link
        to={`/comics/${id}`}
        className="text-decoration-none"
        key={id}
        state={{ comicIds }}
      >
        <div className="col">
          <div className="card h-100 border-0 to-animate">
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
