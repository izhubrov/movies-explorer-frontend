import React from "react";
import "./Portfolio.css";
import arrow from "../../images/arrow.svg";

function Portfolio() {
  return (
    <section className="portfolio page__container">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__container">
            <li className="portfolio__item">
              <p className="portfolio__link-text">Статичный сайт</p>
              <a
                className="portfolio__link"
                href="https://izhubrov.github.io/how-to-learn-with-form/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img className="portfolio__arrow-icon" alt="Иконка стрелки" src={arrow}></img>
              </a>
            </li>
            <li className="portfolio__item">
              <p className="portfolio__link-text">Адаптивный сайт</p>
              <a
                className="portfolio__link"
                href="https://izhubrov.github.io/russian-travel/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img className="portfolio__arrow-icon" alt="Иконка стрелки" src={arrow}></img>
              </a>
            </li>
            <li className="portfolio__item">
              <p className="portfolio__link-text">Одностраничное приложение</p>
              <a
                className="portfolio__link"
                href="https://izhubrov-mesto.nomoredomains.club/sign-in"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img className="portfolio__arrow-icon" alt="Иконка стрелки" src={arrow}></img>
              </a>
            </li>
          </ul>
    </section>
  );
}

export default Portfolio;
