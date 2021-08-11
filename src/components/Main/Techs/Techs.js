import React from "react";
import "./Techs.css";

function Techs() {
  return (
    <div className="theme-gray">
      <section className="techs page__container">
        <h2 className="subtitle">Технологии</h2>
        <h3 className="title techs__title">7 Технологий</h3>
        <p className="techs__text">
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
        <ul className="techs__container">
          <li className="techs__item">HTML</li>
          <li className="techs__item">CSS</li>
          <li className="techs__item">JS</li>
          <li className="techs__item">React</li>
          <li className="techs__item">Git</li>
          <li className="techs__item">Express.js</li>
          <li className="techs__item">MongoDB</li>
        </ul>
      </section>
    </div>
  );
}

export default Techs;
