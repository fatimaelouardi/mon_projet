import React, { useRef, useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const ProduitSection = ({ produit = [] }) => {
  const carouselRef = useRef(null); // Référence au carousel
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);


  // Fonctionnalités du drag
  const dragStart = (e) => {
    setIsDragging(true);
    setStartX(e.pageX || e.touches[0].pageX);
    setScrollLeft(carouselRef.current.scrollLeft);
    carouselRef.current.classList.add("dragging");
  };

  const dragging = (e) => {
    if (!isDragging) return;
    const x = e.pageX || e.touches[0].pageX;
    const walk = x - startX;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const dragStop = () => {
    setIsDragging(false);
    carouselRef.current.classList.remove("dragging");
  };

  // Scroll infini
  const infiniteScroll = () => {
    const carousel = carouselRef.current;
    if (carousel.scrollLeft === 0) {
      carousel.classList.add("no-transition");
      carousel.scrollLeft = carousel.scrollWidth - 2 * carousel.offsetWidth;
      carousel.classList.remove("no-transition");
    } else if (
      Math.ceil(carousel.scrollLeft) ===
      carousel.scrollWidth - carousel.offsetWidth
    ) {
      carousel.classList.add("no-transition");
      carousel.scrollLeft = carousel.offsetWidth;
      carousel.classList.remove("no-transition");
    }
  };

  // Initialisation des événements
  useEffect(() => {
    const carousel = carouselRef.current;

    carousel.addEventListener("mousedown", dragStart);
    carousel.addEventListener("mousemove", dragging);
    window.addEventListener("mouseup", dragStop);
    carousel.addEventListener("scroll", infiniteScroll);

    // Cleanup des événements
    return () => {
      carousel.removeEventListener("mousedown", dragStart);
      carousel.removeEventListener("mousemove", dragging);
      window.removeEventListener("mouseup", dragStop);
      carousel.removeEventListener("scroll", infiniteScroll);
    };
  }, [isDragging, startX, scrollLeft]);

  return (
    <section className="wrapper">
      <h2>Découvrez Nos T-shirts Prisés</h2>
      <p>
        Explorez notre sélection de t-shirts les plus populaires, alliant confort
        et style. Trouvez le design qui vous correspond !
      </p>
      <i id="left" className="ri-arrow-left-s-line" onClick={() => {
        carouselRef.current.scrollLeft -= carouselRef.current.firstChild.offsetWidth;
      }} />
      <ul className="carousel" ref={carouselRef}>
        {produit.map((item) => (
          <ProductCard key={item.id} data={item} />
        ))}
      </ul>
      <i id="right" className="ri-arrow-right-s-line" onClick={() => {
        carouselRef.current.scrollLeft += carouselRef.current.firstChild.offsetWidth;
      }} />
    </section>
  );
};

export default ProduitSection;
