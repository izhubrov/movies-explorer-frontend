import React from "react";
import "./Main.css";
import Promo from "./Promo/Promo";
import AboutProject from "./AboutProject/AboutProject";
import ArrowTop from "../ArrowTop/ArrowTop";
import Techs from "./Techs/Techs";
import AboutMe from "./AboutMe/AboutMe";
import Portfolio from "./Portfolio/Portfolio";
import Preloader from "../Preloader/Preloader";
import useArrowTop from "../../utils/useArrowTop";

function Main({
  isLoading,
}) {
  const [isActivePortfolio, setIsActivePortfolio] = React.useState(false);
  const [isActiveAboutProject, setIsActiveAboutProject] = React.useState(false);
  const [isActiveTechs, setIsActiveTechs] = React.useState(false);
  const [isActiveAboutMe, setIsActiveAboutMe] = React.useState(false);
  const {isActiveArrowTop, checkArrowTop } = useArrowTop();


  React.useEffect(() => {
    localStorage.setItem("route", JSON.stringify("/"));
    function checkScroll() {
      window.pageYOffset > 300
        ? setIsActiveAboutProject(true)
        : setIsActiveAboutProject(false)
      window.pageYOffset > 870
        ? setIsActiveTechs(true)
        : setIsActiveTechs(false);
      window.pageYOffset > 1650
        ? setIsActiveAboutMe(true)
        : setIsActiveAboutMe(false);
      checkArrowTop();
    }

    window.addEventListener("scroll", checkScroll);
    return () => {
      window.removeEventListener("scroll", checkScroll);
    };
  }, []);

  function handleActivatePortfolio(status) {
    if (status) {
      setIsActivePortfolio(true);
    } else {
      setIsActivePortfolio(false);
    }
  }

  return (
    <>
      {isLoading && <Preloader isLoading={isLoading} />}
      {!isLoading && (
        <main className="main">
          <Promo />
          <AboutProject isActiveAboutProject={isActiveAboutProject} />
          <Techs isActiveTechs={isActiveTechs} />
          <AboutMe
            isActiveAboutMe={isActiveAboutMe}
            onActivatePortfolio={handleActivatePortfolio}
          />
          <Portfolio isActivePortfolio={isActivePortfolio} />
          <ArrowTop isActiveArrowTop={isActiveArrowTop}></ArrowTop>
        </main>
      )}
    </>
  );
}

export default Main;
