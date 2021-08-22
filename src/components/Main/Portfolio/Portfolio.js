import React from "react";
import "./Portfolio.css";
import arrow from "../../../images/arrow.svg";

function Portfolio({isActivePortfolio}) {
  return (
    <section className="portfolio page__container">
      <h2 className={`portfolio__title inactive ${isActivePortfolio ? "active" : ""}`}>Портфолио</h2>
      <ul className={`portfolio__container inactive ${isActivePortfolio ? "active" : ""}`}>
            <li className="portfolio__item appear">
              <p className="portfolio__link-text">Научиться учиться</p>
              <a
                className="portfolio__link"
                href="https://izhubrov.github.io/how-to-learn-with-form/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img className="portfolio__arrow-icon" alt="Иконка стрелки" src={arrow}></img>
              </a>
            </li>
            <li className="portfolio__item appear">
              <p className="portfolio__link-text">Путешествия по России</p>
              <a
                className="portfolio__link"
                href="https://izhubrov.github.io/russian-travel/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img className="portfolio__arrow-icon" alt="Иконка стрелки" src={arrow}></img>
              </a>
            </li>
            <li className="portfolio__item appear">
              <p className="portfolio__link-text">Проект Место</p>
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
