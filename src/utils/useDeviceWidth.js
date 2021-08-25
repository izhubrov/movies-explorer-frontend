import React from "react";

export default function useDeviceWidth() {
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

  return {
    width,
    handleCheckDeviceWidth,
    handleChangeDeviceWidth,
  };
}
