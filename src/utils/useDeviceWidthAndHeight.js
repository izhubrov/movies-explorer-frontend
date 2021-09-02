import React from "react";

export default function useDeviceWidthAndHeight(handleNoScroll) {
  const [width, setWidth] = React.useState("");

  function handleCheckDeviceWidth() {
    return window.innerWidth >= 1280
      ? setWidth("1280")
      : window.innerWidth > 480
      ? setWidth("1043")
      : setWidth("480");
  }

  function handleChangeDeviceWidth() {
    function getDeviceWidth() {
      setTimeout(handleCheckDeviceWidth, 2000);
    }
    window.addEventListener("resize", getDeviceWidth);
    return () => {
      window.removeEventListener("resize", getDeviceWidth);
    };
  }

  function handleChangeDeviceHeight() {
    function getDeviceHeight() {
      return window.innerHeight <= 460
        ? handleNoScroll(false)
        : handleNoScroll(true);
    }
    // getDeviceHeight();

    window.addEventListener("resize", getDeviceHeight);
    return () => {
      window.removeEventListener("resize", getDeviceHeight);
    };
  }

  return {
    width,
    handleCheckDeviceWidth,
    handleChangeDeviceWidth,
    handleChangeDeviceHeight
  };
}
