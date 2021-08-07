import React from "react";
import "./Portfolio.css";

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
                <p className="portfolio__arrow-icon">&rarr;</p>
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
                <p className="portfolio__arrow-icon">&rarr;</p>
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
                <p className="portfolio__arrow-icon">&rarr;</p>
              </a>
            </li>
          </ul>
    </section>
  );
}

export default Portfolio;
