import React from "react";
import "./Main.css";
import Promo from "./Promo/Promo";
import AboutProject from "./AboutProject/AboutProject";
import ArrowTop from "../ArrowTop/ArrowTop";
import Techs from "./Techs/Techs";
import AboutMe from "./AboutMe/AboutMe";
import Portfolio from "./Portfolio/Portfolio";
import Preloader from "../Preloader/Preloader";


function Main({ onScroll, isActiveArrowTop, isActiveAboutProject, isLoading }) {
  const [isActiveFirstPeriod, setIsActiveFirstPeriod] = React.useState(false);
  const [isActiveSecondPeriod, setIsActiveSecondPeriod] = React.useState(false);
  console.log(isLoading)

  React.useEffect(()=>{
    onScroll();
  },[])

  React.useEffect(()=>{
    const timer1 = setTimeout(()=>setIsActiveFirstPeriod(true),800);
    const timer2 = setTimeout(()=>setIsActiveSecondPeriod(true),900);
    return ()=> {
      clearTimeout(timer1);
      clearTimeout(timer2);
    }
  },[isActiveAboutProject])

  return (
    <>
    { isLoading && <Preloader isLoading={isLoading}/>}
    {!isLoading &&
    <main className="main">
      <Promo/>
      <AboutProject isActiveAboutProject={isActiveAboutProject} isActiveFirstPeriod={isActiveFirstPeriod} isActiveSecondPeriod={isActiveSecondPeriod}/>
      <Techs/>
      <AboutMe/>
      <Portfolio/>
      <ArrowTop isActiveArrowTop={isActiveArrowTop}></ArrowTop>
    </main>
    }
    </>
 );
}

export default Main;