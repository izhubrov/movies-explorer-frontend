import "./Profile.css";
import Form from "../Form/Form";
import Name from "../Form/Name/Name";
import Email from "../Form/Email/Email";
import SubmitButton from "../Form/SubmitButton/SubmitButton";
import { NavLink } from 'react-router-dom';

function Profile() {
  function handleLogout() {

  }

  return (
    <section className="profile page__container">
      <Form>
        <h2 className="profile__title">Привет, Виталий!</h2>
        <>
          <Name/>
          <Email/>
        </>
        <>
          <SubmitButton buttonSubmitText="Редактировать"/>
          <NavLink onClick={handleLogout} className="profile__signout" to={"/"}>Выйти из аккаунта</NavLink>
        </>
      </Form>
    </section>
  );
}

export default Profile;