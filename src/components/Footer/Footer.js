import "./Footer.css";
import { useLocation } from "react-router-dom";

function Footer() {
  const location = useLocation();
  const isLocationMainOrMovies =
    location.pathname === "/" ||
    location.pathname === "/movies" ||
    location.pathname === "/saved-movies";

  return (
    isLocationMainOrMovies &&
      <div className="theme-footer">
      <footer className="footer page__container">
        <p className="footer__text">
          Учебный проект Яндекс.Практикум х BeatFilm.
        </p>
        <div className="footer__container">
          <p className="footer__copyrights">&copy; 2021</p>
          <ul className="footer__socials">
            <li className="footer__social">
              <a
                className="footer__social-link"
                href="https://practicum.yandex.ru/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Яндекс.Практикум
              </a>
            </li>
            <li className="footer__social">
              <a
                className="footer__social-link"
                href="https://github.com/izhubrov"
                target="_blank"
                rel="noopener noreferrer"
              >
                Github
              </a>
            </li>
            <li className="footer__social">
              <a
                className="footer__social-link"
                href="https://www.facebook.com/profile.php?id=100022130163020"
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
