export default function SliderContent({ activeIndex, sliderImage }) {
  return (
    <section>
      {sliderImage.map((slide, index) => {
        return (
          <div
            key={index}
            className={`${index === activeIndex ? "slides active" : "inactive"}`}
          >
            <div className="layover"></div>
            <img src={slide.imgUrl} alt="" className="slide-image" />
            <div className="info-container d-flex flex-column justify-content-between text-center gap-4 align-items-center">
              <h1 className="slide-title">{slide.title}</h1>
              <p className="slide-text">{slide.paragraph}</p>
              <button className="btn btn-outline-light rounded-pill align-self-stretch mx-5 fw-bold">
                {slide.btnText}
              </button>
            </div>
          </div>
        );
      })}
    </section>
  );
}
