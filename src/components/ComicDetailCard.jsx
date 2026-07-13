import dateFormat from "dateformat";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";

export default function ComicDetailCard({
  cover,
  title,
  description,
  release_date,
  characters,
  brand,
  price,
  isNew,
  isPreorder,
  isDiscount,
}) {
  function calcDiscountedPrice(price, discountValue) {
    const discount = (price * discountValue) / 100;

    const finalPrice = Math.round(price - discount).toFixed(2);

    return finalPrice;
  }

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
          <div className="card-body ps-5 d-flex flex-column justify-content-between h-100 p-0 oswald-special">
            <div className="d-flex justify-content-between">
              <h3 className="card-title bangers-regular">{title}</h3>
              {isNew === 1 && (
                <span className="status-badge text-bg-primary bebas-neue-regular fs-5">
                  <span className="mx-2"> New!</span>
                </span>
              )}
              {isPreorder === 1 && (
                <span className="status-badge text-bg-info bebas-neue-regular fs-5">
                  <span className="mx-2"> Soon!</span>
                </span>
              )}
            </div>
            <ReactMarkdown>{description}</ReactMarkdown>
            <p className="card-text">
              Pubblicazione:
              <span className="text-light">
                {dateFormat(release_date, " dddd, mmmm dS, yyyy")}
              </span>
            </p>
            <div>
              Featuring:{" "}
              <span>
                {characters?.map((character, index) => (
                  <Link
                    key={character.id}
                    to={`/characters/${character.id}`}
                    className="text-light fw-semibold"
                  >
                    {character.name}
                    {index < characters.length - 1 && ", "}
                  </Link>
                ))}
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
              {!isDiscount && (
                <p className="align-self-end m-0 fs-2 fw-semibold oswald-special">
                  &euro; {price}
                </p>
              )}

              {isDiscount > 0 && (
                <>
                  <div>
                    <p className="align-self-end m-0 fs-2 fw-semibold position-relative">
                      <span className="text-decoration-line-through oswald-special">
                        &euro; {price}
                      </span>
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger fs-5">
                        -{isDiscount}%
                      </span>
                      <span className="d-block oswald-special text-danger">
                        &euro; {calcDiscountedPrice(price, isDiscount)}
                      </span>
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
