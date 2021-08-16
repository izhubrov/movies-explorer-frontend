import React from 'react';
import "./Register.css";
import Form from "../Form/Form";
import Name from "../Form/Name/Name";
import Email from "../Form/Email/Email";
import Password from "../Form/Password/Password";
import { useFormAndValidation } from "../../utils/useFormAndValidation.js";

function Register({ onSubmit }) {

  const {values, handleChange, errors, isValid, resetForm} = useFormAndValidation();

  React.useEffect(() => {
    resetForm();
  }, []);

  return (
    <section className="register page__container">
      <Form
        onSubmit={onSubmit}
        authPage={true}
        title={"Добро пожаловать!"}
        buttonSubmitText="Зарегистрироваться"
        authBottomText="Уже зарегистрированы?"
        bottomLinkText="Войти"
        onBottomLinkRedirect="/sign-in"
        buttonSubmitState={isValid}
      >
        <Name values={values} handleChange={handleChange} errors={errors} authPage={true} />
        <Email values={values} handleChange={handleChange} errors={errors} authPage={true} />
        <Password values={values} handleChange={handleChange} errors={errors} authPage={true} />
      </Form>
    </section>
  );
}

export default Register;
