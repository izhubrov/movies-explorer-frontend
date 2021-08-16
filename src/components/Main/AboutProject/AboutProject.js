import React from "react";
import "./AboutProject.css";

function AboutProject() {
  return (
    <section className="about-project page__container">
      <h2 className="subtitle">О проекте</h2>
      <div className="about-project__container">
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
        <div className="about-project__period">1 неделя</div>
        <p className="about-project__tag">Back-end</p>
        <div className="about-project__period about-project__period_type_frontend">
          4 недели
        </div>
        <p className="about-project__tag">Front-end</p>
      </div>
    </section>
  );
}

export default AboutProject;
