import React from "react";

export default function Arrows({ prevSlide, nextSlide }) {
  return (
    <div className="arrows">
      <span className="prev" onClick={prevSlide}>
        <i className="bi bi-arrow-left-short"></i>
      </span>
      <span className="next" onClick={nextSlide}>
        <i className="bi bi-arrow-right-short"></i>
      </span>
    </div>
  );
}
