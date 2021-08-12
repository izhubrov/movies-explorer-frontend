import React from 'react';
import "./SubmitButton.css";


function SubmitButton({buttonSubmitText}) {
  const [buttonSubmitState, setButtonSubmitState] = React.useState(true);

  return (
    <button
      type="submit"
      className={`submit-button ${!buttonSubmitState ? "submit-button_inactive" : ""}`}
      disabled={!buttonSubmitState ? true : ""}
    >
      {buttonSubmitText}
    </button>
  );
}

export default SubmitButton;