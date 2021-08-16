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
  buttonSubmitState
}) {

  return (
    <form
      className={`form ${authPage ? "form__auth-page" : ""} `}
      onSubmit={onSubmit}
      noValidate
    >
      <Title authPage={authPage} title={title} />
      {children}
      <>
        <SubmitButton buttonSubmitText={buttonSubmitText} authPage={authPage} buttonSubmitState={buttonSubmitState} />
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
