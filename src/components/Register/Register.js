import React from 'react';
import "./Register.css";
import Form from "../Form/Form";
import Name from "../Form/Name/Name";
import Email from "../Form/Email/Email";
import Password from "../Form/Password/Password";
import { useFormAndValidation } from "../../utils/useFormAndValidation.js";

function Register({ onSignUp, isFormDisabled, onNoScroll }) {

  const {values, handleChange, errors, isValid, resetForm} = useFormAndValidation();

  React.useEffect(() => {
    localStorage.setItem("route", JSON.stringify("/sign-up"));
    resetForm();
    function getDeviceHeight() {
      return window.innerHeight <= 460
        ? onNoScroll(false)
        : onNoScroll(true);
    }
    getDeviceHeight();
    window.addEventListener("resize", getDeviceHeight);
    return () => {
      window.removeEventListener("resize", getDeviceHeight);
    };
  }, []);

  function handleSignUp(evt) {
    evt.preventDefault();
    onSignUp(values);
  }

  return (
    <section className="register appear page__container">
      <Form
        onSubmit={handleSignUp}
        authPage={true}
        title={"Добро пожаловать!"}
        buttonSubmitText="Зарегистрироваться"
        authBottomText="Уже зарегистрированы?"
        bottomLinkText="Войти"
        onBottomLinkRedirect="/sign-in"
        buttonSubmitState={!isFormDisabled&&isValid}
        isFormDisabled={isFormDisabled}
      >
        <Name values={values} handleChange={handleChange} errors={errors} authPage={true} />
        <Email values={values} handleChange={handleChange} errors={errors} authPage={true} />
        <Password values={values} handleChange={handleChange} errors={errors} authPage={true} />
      </Form>
    </section>
  );
}

export default Register;
