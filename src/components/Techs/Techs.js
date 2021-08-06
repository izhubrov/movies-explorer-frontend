import React from 'react';
import './Techs.css';

function Techs() {
  return (
    <div className="theme-gray">
      <section className="techs page__container">
        <h2 className="subtitle">Технологии</h2>
        <h3 className="title techs__title">7 Технологий</h3>
        <p className="techs__text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
        <div className="techs__container">
          <div className="techs__item">HTML</div>
          <div className="techs__item">CSS</div>
          <div className="techs__item">JS</div>
          <div className="techs__item">React</div>
          <div className="techs__item">Git</div>
          <div className="techs__item">Express.js</div>
          <div className="techs__item">MongoDB</div>
        </div>
      </section>
    </div>
  );
}

export default Techs;