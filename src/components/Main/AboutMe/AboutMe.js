import React from "react";
import "./AboutMe.css";
import photo from "../../../images/photo.jpg";

function AboutMe({ isActiveAboutMe, onActivatePortfolio }) {
  const [aboutMeText, setAboutMeText] = React.useState("");

  const text = `Я родился и живу в Нижнем Новгороде, закончил факультет информационных технологий ННГУ.
  Увлекаюсь футболом и приобретаю навыки игры в большой теннис.
  Осенью 2020 года начал изучать веб-программирование.
  С 2014 года работаю в интересной сфере - электроэнергетике,
  занимаемся поставкой электроэнергии промышленным предприятиям в РФ.
  Параллельно освоил курс по веб-разработке от Яндекс.Практикума,
  в дальнейшем планирую заниматься фриланс-заказами.`;

  React.useEffect(() => {
    let currentPos = 0;
    if (isActiveAboutMe) {
      const id = setInterval(() => {
        setAboutMeText((aboutMeText) => aboutMeText + text[currentPos]);
        currentPos += 1;
        if (currentPos === Math.round(text.length / 6)) {
          onActivatePortfolio(true);
        }
        if (currentPos === text.length) {
          clearInterval(id);
        }
      }, 30);
      return () => clearInterval(id);
    } else {
      setAboutMeText("");
      onActivatePortfolio(false);
    }
  }, [isActiveAboutMe]);

  return (
    <section className="about-me page__container">
      <h2 className="subtitle">Студент</h2>
      <div className="about-me__outer-container">
        <div className="about-me__container">
          <h3
            className={`title about-me__title inactive ${
              isActiveAboutMe ? "active" : ""
            } `}
          >
            Иван
          </h3>
          <p
            className={`about-me__profession-age inactive ${
              isActiveAboutMe ? "active" : ""
            } `}
          >
            Фронтенд разработчик, 29 лет
          </p>
          <article className="about-me__text">{aboutMeText}</article>
          <ul className="about-me__socials">
            <li className="about-me__social">
              <a
                className="about-me__social-link"
                href="https://www.facebook.com/profile.php?id=100022130163020"
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook
              </a>
            </li>
            <li className="about-me__social">
              <a
                className="about-me__social-link"
                href="https://github.com/izhubrov"
                target="_blank"
                rel="noopener noreferrer"
              >
                Github
              </a>
            </li>
          </ul>
        </div>
        <img
          className={`about-me__photo inactive ${
            isActiveAboutMe ? "active" : ""
          } `}
          src={photo}
          alt="Фотография студента"
        />
      </div>
    </section>
  );
}

export default AboutMe;
