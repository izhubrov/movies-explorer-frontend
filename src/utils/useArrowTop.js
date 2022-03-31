import React from "react";

export default function useArrowTop() {
  const [isActiveArrowTop, setIsActiveArrowTop] = React.useState(false);

  function checkArrowTop() {
    if (window.innerWidth > 900) {
      if (window.pageYOffset > 300) {
        setIsActiveArrowTop(true);
      } else {
        setIsActiveArrowTop(false);
      }
    }
  }

  return {
    isActiveArrowTop,
    checkArrowTop,
  };
}
