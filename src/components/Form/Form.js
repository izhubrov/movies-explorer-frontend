import React from 'react';
import "./Form.css";
import Title from "./Title/Title";
import SubmitButton from "./SubmitButton/SubmitButton";
import RedirectBottom from "./RedirectBottom/RedirectBottom";

function Form({
  children,
  onSubmit,
  authPage,
  title,
  buttonSubmitText,
  authBottomText,
  onbottomLinkClick,
  bottomLinkText,
  onBottomLinkRedirect,
  buttonSubmitState,
  isFormDisabled
}) {

  return (
    <form
      className={`form ${authPage ? "form__auth-page" : ""} `}
      onSubmit={onSubmit}
      noValidate
    >
      <Title authPage={authPage} title={title} />
      <fieldset className="form__set" disabled={isFormDisabled}>
        {children}
      </fieldset>
      <>
        <SubmitButton
          buttonSubmitText={buttonSubmitText}
          authPage={authPage}
          buttonSubmitState={buttonSubmitState}
        />
        <RedirectBottom
          authPage={authPage}
          authBottomText={authBottomText}
          onbottomLinkClick={onbottomLinkClick}
          bottomLinkText={bottomLinkText}
          onBottomLinkRedirect={onBottomLinkRedirect}
        />
      </>
      <></>
    </form>
  );
}

export default Form;
