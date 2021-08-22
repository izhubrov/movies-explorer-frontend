import React from "react";
import "./Main.css";
import Promo from "./Promo/Promo";
import AboutProject from "./AboutProject/AboutProject";
import ArrowTop from "../ArrowTop/ArrowTop";
import Techs from "./Techs/Techs";
import AboutMe from "./AboutMe/AboutMe";
import Portfolio from "./Portfolio/Portfolio";
import Preloader from "../Preloader/Preloader";

function Main({
  onScroll,
  isActiveArrowTop,
  isActiveAboutProject,
  isActiveTechs,
  isActiveAboutMe,
  isLoading,
}) {
  const [isActivePortfolio, setIsActivePortfolio] = React.useState(false);

  React.useEffect(() => {
    onScroll();
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
