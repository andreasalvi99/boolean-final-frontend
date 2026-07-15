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
            src={`http://192.168.1.252:8000/storage/${cover}`}
            className="img-fluid rounded-start w-100 h-100"
            alt={title}
          />
        </div>
        <div className="col-md-8">
          <div className="card-body ps-md-5 d-flex flex-column justify-content-between h-100 p-0 oswald-special">
            <div className="d-flex justify-content-between">
              <h3 className="card-title bangers-regular mt-3 mt-md-0">
                {title}
              </h3>
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
            <div className="fs-6">
              <ReactMarkdown>{description}</ReactMarkdown>
            </div>

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
            <div className="d-flex justify-content-between align-items-end mt-3 mt-md-0">
              <img
                src={`http://192.168.1.252:8000/storage/${brand?.logo}`}
                alt=""
                style={{
                  height: brand?.name === "DC Comics" ? "80px" : "80px",
                  // width: brand?.name === "Marvel Comics" ? "80px" : "80px",
                }}
                className={`${brand?.name === "Marvel Comics" ? "marvel-logo" : ""}`}
              />
              {!isDiscount && (
                <p className="align-self-end m-0 fs-3 fw-semibold oswald-special">
                  &euro; {price}
                </p>
              )}

              {isDiscount > 0 && (
                <>
                  <div>
                    <p className="align-self-end m-0 fs-3 fw-semibold position-relative">
                      <span className="text-decoration-line-through oswald-special">
                        &euro; {price}
                      </span>
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger fs-6">
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
