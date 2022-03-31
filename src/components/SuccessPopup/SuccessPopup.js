import React from "react";
import "./SuccessPopup.css";

function SuccessPopup({ isSuccess }) {
  return (
    <div className={`success-popup appear ${isSuccess ? "success-popup_opened" : ""} `}>
      <h2 className="success-popup__title">Данные успешно применены!</h2>
    </div>
  );
}

export default SuccessPopup;