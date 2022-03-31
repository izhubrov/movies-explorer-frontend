import React from "react";
import "./Techs.css";

function Techs({ isActiveTechs }) {
  return (
    <div className="theme-gray">
      <section className="techs page__container">
        <h2 className="subtitle">Технологии</h2>
        <h3
          className={`title techs__title inactive ${
            isActiveTechs ? "active" : ""
          }`}
        >
          7 технологий
        </h3>
        <p className={`techs__text inactive ${isActiveTechs ? "active" : ""}`}>
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
        <ul className="techs__container">
          <li
            className={`techs__item ${
              isActiveTechs ? "techs__item_active" : ""
            }`}
          >
            <a
              className="techs__link"
              href="https://developer.mozilla.org/ru/docs/Learn/Getting_started_with_the_web/HTML_basics"
              target="_blank"
              rel="noopener noreferrer"
            >
              HTML
            </a>
          </li>
          <li
            className={`techs__item  ${
              isActiveTechs ? "techs__item_active" : ""
            }`}
          >
            <a
              className="techs__link"
              href="https://developer.mozilla.org/ru/docs/Learn/Getting_started_with_the_web/CSS_basics"
              target="_blank"
              rel="noopener noreferrer"
            >
              CSS
            </a>
          </li>
          <li
            className={`techs__item ${
              isActiveTechs ? "techs__item_active" : ""
            }`}
          >
            <a
              className="techs__link"
              href="https://developer.mozilla.org/ru/docs/Web/JavaScript"
              target="_blank"
              rel="noopener noreferrer"
            >
              JS
            </a>
          </li>
          <li
            className={`techs__item ${
              isActiveTechs ? "techs__item_active" : ""
            }`}
          >
            <a
              className="techs__link"
              href="https://reactjs.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              React
            </a>
          </li>
          <li
            className={`techs__item ${
              isActiveTechs ? "techs__item_active" : ""
            }`}
          >
            <a
              className="techs__link"
              href="https://git-scm.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Git
            </a>
          </li>
          <li
            className={`techs__item ${
              isActiveTechs ? "techs__item_active" : ""
            }`}
          >
            <a
              className="techs__link"
              href="https://expressjs.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Express.js
            </a>
          </li>
          <li
            className={`techs__item ${
              isActiveTechs ? "techs__item_active" : ""
            }`}
          >
            <a
              className="techs__link"
              href="https://www.mongodb.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              MongoDB
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
}

export default Techs;
