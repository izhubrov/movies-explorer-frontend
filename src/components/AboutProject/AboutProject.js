import React from 'react';
import './AboutProject.css';

function AboutProject() {
  return (
    <section className="about-project page__container">
      <h2 className="subtitle about-project__subtitle">О проекте</h2>
      <div className="about-project__container">
          <h3 className="about-project__subsubtitle">Дипломный проект включал 5 этапов</h3>
          <p className="text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
          <h3 className="about-project__subsubtitle">На выполнение диплома ушло 5 недель</h3>
          <p className="text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
      </div>
    </section>
  );
}

export default AboutProject;