import React, { useState } from "react";
import "../../assets/css/connexion.css";

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(1);

  // Handle bullet click to change active index
  const moveSlider = (index) => {
    setActiveIndex(index);
  };

  return (
    <aside className="carousel">
      <ul className="images-slider">
        <li className={`image img-1 ${activeIndex === 1 ? "show" : ""}`}>
          <img src="images/connexionPage/image1.png" alt="Montee T-shirt 1" />
        </li>
        <li className={`image img-2 ${activeIndex === 2 ? "show" : ""}`}>
          <img src="images/connexionPage/image.png" alt="Montee T-shirt 2" />
        </li>
      </ul>

      <section className="text-slider">
        <div className="text-wrap">
          <ul className="text-group">
            <li style={{ transform: `translateY(${-(activeIndex - 1) * 2.2}rem)` }}>
              {activeIndex === 1 ? (
                <h2 className="visually-hidden">Exprimez, portez, brillez.</h2>
              ) : (
                <h2 className="visually-hidden">Imaginez-le, créez-le, portez-le.</h2>
              )}
            </li>
          </ul>
        </div>
        <div className="bullets">
          <ul>
            {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
            <li
              className={activeIndex === 1 ? "active" : ""}
              onClick={() => moveSlider(1)}
            />
            {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
            <li
              className={activeIndex === 2 ? "active" : ""}
              onClick={() => moveSlider(2)}
            />
          </ul>
        </div>
      </section>
    </aside>
  );
};

export default Carousel;
