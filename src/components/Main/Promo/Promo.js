import React from "react";
import "./Promo.css";
import Web from "../../../images/web.png";

function Promo() {
  const ref = React.useRef(null);

  function handleScrollTo() {
    ref.current.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="theme-dark">
      <section className="promo page__container">
        <div className="promo__container">
          <h1 className="title promo__title">
            Учебный проект студента факультета Веб-разработки.
          </h1>
          <p className="caption promo__caption">
            Листайте ниже, чтобы узнать больше про этот проект и его создателя.
          </p>
          <button
            ref={ref}
            onClick={handleScrollTo}
            type="button"
            aria-label="Узнать больше"
            className="promo__button"
          >
            Узнать больше
          </button>
        </div>
        <img
          className="promo__image"
          src={Web}
          alt="Изображение Web на шаре земли"
        />
      </section>
    </div>
  );
}

export default Promo;
