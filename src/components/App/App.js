import React from "react";
import { Route, Switch, useHistory, Redirect } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import NotFound from "../NotFound/NotFound";
import ErrorPopup from "../ErrorPopup/ErrorPopup";
import SuccessPopup from "../SuccessPopup/SuccessPopup";
import { images } from "../../utils/utils";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute";
import mainApi from "../../utils/mainApi";
let numberOfPackages = 0;

function App() {
  const history = useHistory();
  const [isLoggedIn, setIsLoggedIn] = React.useState(null);
  const [isMoviesListShown, setMoviesListShown] = React.useState([]);
  const [isAllMoviesAreShown, setAllMoviesAreShown] = React.useState(false);
  const [isCurrentUser, setCurrentUser] = React.useState({});
  const [isError, setError] = React.useState({ errorText: "", isActive: false });
  const [isSuccess, setSuccess] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);


  React.useEffect(() => {
    setMoviesListShown(images.filter((movie, index) => index < 12));
  }, []);

  React.useEffect(()=>{
    checkCountOfShownMovies();
  },[isMoviesListShown]);

  function handleShowMovies() {
    numberOfPackages++;
    setMoviesListShown([
      ...isMoviesListShown,
      ...images.filter(
        (movie, index) =>
          index >= (12 * numberOfPackages) && index < (12 * (numberOfPackages + 1))
      ),
    ]);
  }

  function checkCountOfShownMovies() {
    if (isMoviesListShown.length === images.length) setAllMoviesAreShown(true);
  }


  function handleCheckToken() {
    setIsLoading(true);
    mainApi
      .checkToken()
      .then((res) => {
        setCurrentUser(res);
        setIsLoggedIn(true);
        setIsLoading(false);
        history.push("/movies");
      })
      .catch(async (err) => {
        setIsLoading(false);
        await handleShowError(err);
      });
  }

  function handleSignIn(data) {
    mainApi
      .signIn(data)
      .then(() => {
        handleCheckToken();
      })
      .catch(async (err) => {
        await handleShowError(err);
      });
  }

  function handleSignUp(data) {
    mainApi
      .signUp(data)
      .then((res) => {
        setCurrentUser(res);
        handleSignIn(data);
      })
      .catch(async (err) => {
        await handleShowError(err);
      });
  }

  function handleSignOut() {
    mainApi
    .signOut(isCurrentUser.email)
    .then(() => {
      setIsLoggedIn(null);
      history.push("/");
      setCurrentUser({ email: "", password: "", name: "" });
      setIsLoading(false);
    })
    .catch(async (err) => {
      await handleShowError(err);
    });
  }

  function handleEditProfile(data) {
    mainApi
    .editProfile(data)
    .then((res) => {
      setCurrentUser(res);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    })
    .catch(async (err) => {
      await handleShowError(err);
    });
  }

  async function handleShowError(err) {
    const newErr = await err;
    setErrorPopupFields(newErr.message, true);
    setTimeout(() => setErrorPopupFields(newErr.message, false), 3000);
  }

  function setErrorPopupFields(message, active) {
    setError({ errorText: message, isActive: active });
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={isCurrentUser}>
      <Header isLoggedIn={isLoggedIn} />
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route exact path="/sign-up">
          <Register onSignUp={handleSignUp} />
        </Route>
        <Route exact path="/sign-in">
          <Login onSignIn={handleSignIn} />
        </Route>
        <ProtectedRoute
          exact path="/profile"
          isLoggedIn={isLoggedIn}
          component={Profile}
          onUpdateUser={handleEditProfile}
          onSignOut={handleSignOut}
          isSuccess={isSuccess}
        />
        <ProtectedRoute
          exact path="/movies"
          isLoggedIn={isLoggedIn}
          component={Movies}
          isMoviesListShown={isMoviesListShown}
          onShowMoreMovies={handleShowMovies}
          isAllMoviesAreShown={isAllMoviesAreShown}
        />
        <ProtectedRoute
          exact path="/saved-movies"
          isLoggedIn={isLoggedIn}
          component={SavedMovies}
          isMoviesListShown={isMoviesListShown}
        />
        <Route path="/404">
          <NotFound />
        </Route>
        <Redirect to="/404" />
      </Switch>

      <Footer />

      <ErrorPopup errorText={isError.errorText} isActive={isError.isActive} />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
