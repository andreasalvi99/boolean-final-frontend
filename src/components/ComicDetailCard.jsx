import dateFormat from "dateformat";
import ReactMarkdown from "react-markdown";

export default function ComicDetailCard({
  cover,
  title,
  description,
  release_date,
  characters,
  brand,
  price,
}) {
  return (
    <div className="card mb-3 comic-card">
      <div className="row g-0">
        <div className="col-md-4">
          <img
            src={`http://127.0.0.1:8000/storage/${cover}`}
            className="img-fluid rounded-start w-100 h-100"
            alt={title}
          />
        </div>
        <div className="col-md-8">
          <div className="card-body ps-5 d-flex flex-column justify-content-between h-100 p-0">
            <h3 className="card-title bangers-regular">{title}</h3>
            <ReactMarkdown>
              {/* <p
                className="card-text overflow-auto"
                style={{ minHeight: "100px" }}
              > */}
              {description}
              {/* </p> */}
            </ReactMarkdown>
            <p className="card-text">
              Pubblicazione:
              <span className="text-light">
                {dateFormat(release_date, " dddd, mmmm dS, yyyy")}
              </span>
            </p>
            <div>
              Featuring:
              <span>
                {characters?.map((character, index) => {
                  return (
                    " " +
                    character.name +
                    (index < characters.length - 1 ? ", " : "")
                  );
                })}
              </span>
            </div>
            <div className="d-flex justify-content-between align-items-end">
              <img
                src={`http://127.0.0.1:8000/storage/${brand?.logo}`}
                alt=""
                style={{
                  height: brand?.name === "DC Comics" ? "80px" : "100px",
                  width: brand?.name === "Marvel Comics" ? "200px" : "100px",
                }}
              />
              <p className="align-self-end m-0 fs-1 fw-semibold">
                <i>&euro; {price}</i>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
