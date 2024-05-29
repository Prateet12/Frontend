import "./Carousel.css";
import { useState, useEffect } from "react";

function Carousel({ imageUrls }) {
  const [index, setIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState("");

  const handleSelect = (selectedIndex, direction) => {
    setSlideDirection(direction);
    setIndex(selectedIndex);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      handleSelect((index + 1) % imageUrls.length, "next");
    }, 3000);
    return () => clearInterval(timer);
  }, [index, imageUrls.length]);

  return (
    <div className="carousel">
      <div className={`carousel-inner ${slideDirection}`}>
        {imageUrls.map((url, i) => (
          <div
            className={`carousel-item ${i === index ? "active" : ""}`}
            key={i}
          >
            <img src={url} className="d-block w-100" alt={`Slide ${i}`} />
          </div>
        ))}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        onClick={() =>
          handleSelect((index - 1 + imageUrls.length) % imageUrls.length, "prev")
        }
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        onClick={() => handleSelect((index + 1) % imageUrls.length, "next")}
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

export default Carousel;
