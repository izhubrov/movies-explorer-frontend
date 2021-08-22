import React from 'react';
import "./Profile.css";
import Form from "../Form/Form";
import Name from "../Form/Name/Name";
import Email from "../Form/Email/Email";
import { useFormAndValidation } from "../../utils/useFormAndValidation.js";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import SuccessPopup from "../SuccessPopup/SuccessPopup";

function Profile({ onUpdateUser, onSignOut, isSuccess }) {
  const {values, handleChange, errors, isValid, resetForm} = useFormAndValidation();
  const currentUser = React.useContext(CurrentUserContext);
  const [isInputsEqualCurrent,setisInputsEqualCurrent] = React.useState(false);

  React.useEffect(() => {
    resetForm(currentUser);
  }, []);

  React.useEffect(()=>{
    checkInputsToEqualCurrent();
  },[values]);

  function checkInputsToEqualCurrent() {
    const {name, email} = currentUser;
    if (!values.name && !values.email) return;
    if ((name === values.name.trim()) && (email === values.email.trim())) {
      setisInputsEqualCurrent(true);
    } else {
      setisInputsEqualCurrent(false);
    }
  }

  function handleUpdateUser(evt) {
    evt.preventDefault();
    onUpdateUser(values);
  }

  function handleSignOut(evt) {
    evt.preventDefault();
    onSignOut();
  }

  return (
    <section className="profile appear page__container">
      <Form
        onSubmit={handleUpdateUser}
        authPage={false}
        title={`Привет, ${currentUser.name}!`}
        buttonSubmitText="Редактировать"
        onbottomLinkClick={handleSignOut}
        bottomLinkText="Выйти из аккаунта"
        onBottomLinkRedirect="/"
        buttonSubmitState={isInputsEqualCurrent ? false : isValid}
      >
        <Name values={values} handleChange={handleChange} errors={errors} authPage={false} />
        <Email values={values} handleChange={handleChange} errors={errors} authPage={false} />
        {isSuccess && <SuccessPopup isSuccess={isSuccess}/>}
      </Form>
    </section>
  );
}

export default Profile;
