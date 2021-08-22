import React from "react";
import "./AboutProject.css";

function AboutProject({
  isActiveAboutProject,
  isActiveFirstPeriodAboutProject,
  isActiveSecondPeriodAboutProject,
}) {
  return (
    <section className="about-project page__container">
      <h2 className="subtitle">О проекте</h2>
      <div
        className={`about-project__container inactive ${
          isActiveAboutProject ? "active" : ""
        }`}
      >
        <h3 className="about-project__subsubtitle">
          Дипломный проект включал 5 этапов
        </h3>
        <p className="text">
          Составление плана, работу над бэкендом, вёрстку, добавление
          функциональности и финальные доработки.
        </p>
        <h3 className="about-project__subsubtitle">
          На выполнение диплома ушло 5 недель
        </h3>
        <p className="text">
          У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
          соблюдать, чтобы успешно защититься.
        </p>
      </div>
      <div className="about-project__period-container">
        <div
          className={`about-project__period inactive ${
            isActiveFirstPeriodAboutProject ? "active about-project__period_filled" : ""
          }`}
        >
        </div>
        <p
          className={`about-project__tag inactive ${
            isActiveFirstPeriodAboutProject ? "active" : ""
          }`}
        >
          Back-end
        </p>
        <div
          className={`about-project__period inactive ${
            isActiveSecondPeriodAboutProject ? "active about-project__period_filled-frontend" : ""
          }`}
        >
        </div>
        <p
          className={`about-project__tag inactive ${
            isActiveSecondPeriodAboutProject ? "active" : ""
          }`}
        >
          Front-end
        </p>
      </div>
    </section>
  );
}

export default AboutProject;
