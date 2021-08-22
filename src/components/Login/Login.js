import React from 'react';
import "./Login.css";
import Form from "../Form/Form";
import Email from "../Form/Email/Email";
import Password from "../Form/Password/Password";
import { useFormAndValidation } from "../../utils/useFormAndValidation.js";

function Login({ onSignIn, isLoading }) {
  const {values, handleChange, errors, isValid, resetForm} = useFormAndValidation();

  React.useEffect(() => {
    resetForm();
  }, []);

  function handleSignIn(evt) {
    evt.preventDefault();
    onSignIn(values);
  }

  return (
    <>
    {!isLoading &&
    <section className="login appear page__container">
      <Form
        onSubmit={handleSignIn}
        authPage={true}
        title={"Рады видеть!"}
        buttonSubmitText="Войти"
        authBottomText="Ещё не зарегистрированы?"
        bottomLinkText="Регистрация"
        onBottomLinkRedirect="/sign-up"
        buttonSubmitState={isValid}
      >
        <Email values={values} handleChange={handleChange} errors={errors} authPage={true} />
        <Password values={values} handleChange={handleChange} errors={errors} authPage={true} />
      </Form>
    </section>
    }
    </>
  );
}

export default Login;
