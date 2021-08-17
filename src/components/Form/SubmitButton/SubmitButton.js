import React from 'react';
import "./SubmitButton.css";


function SubmitButton({buttonSubmitText, authPage, buttonSubmitState}) {
  return (
    <button
      type="submit"
      className={`submit-button ${authPage ? "submit-button_place_auth" : ""} ${!buttonSubmitState ? "submit-button_inactive" : ""}`}
      disabled={!buttonSubmitState ? true : ""}
    >
      {buttonSubmitText}
    </button>
  );
}

export default SubmitButton;