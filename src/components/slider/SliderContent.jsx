import { Link } from "react-router-dom";

export default function SliderContent({ activeIndex, sliderImage }) {
  return (
    <section className="slider-wrapper">
      <div
        className="slider-content"
        style={{
          transform: `translateX(-${activeIndex * 100}%)`,
        }}
      >
        {sliderImage.map((slide, index) => (
          <div className="slides" key={index}>
            <div className="layover"></div>

            <img src={slide.imgUrl} alt="" className="slide-image" />

            <div className="info-container d-flex flex-column justify-content-between text-center gap-4 align-items-center">
              <h1 className="slide-title bangers-regular">{slide.title}</h1>

              <p className="slide-text d-none d-lg-block oswald-special">
                {slide.paragraph}
              </p>

              <button
                className={`btn btn-outline-${slide.title.includes("Marvel") ? "danger" : "primary"} rounded-pill align-self-stretch mx-5 fw-bold`}
              >
                <Link
                  to={"/comics"}
                  className="text-decoration-none text-light d-md-none"
                >
                  Vai
                </Link>
                <Link
                  to={"/comics"}
                  className="text-decoration-none text-light d-none d-md-block oswald-special"
                >
                  {slide.btnText}
                </Link>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
