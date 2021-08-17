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
import { images } from "../../utils/utils";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute";
import mainApi from "../../utils/mainApi";
let numberOfPackages = 0;

function App() {
  const history = useHistory();
  const [isLoggedIn, setIsLoggedIn] = React.useState(null);
  const [moviesListShown, setMoviesListShown] = React.useState([]);
  const [allMoviesAreShown, setAllMoviesAreShown] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});

  React.useEffect(() => {
    setMoviesListShown(images.filter((movie, index) => index < 12));
  }, []);

  React.useEffect(()=>{
    checkCountOfShownMovies();
  },[moviesListShown]);

  function handleShowMovies() {
    numberOfPackages++;
    setMoviesListShown([
      ...moviesListShown,
      ...images.filter(
        (movie, index) =>
          index >= (12 * numberOfPackages) && index < (12 * (numberOfPackages + 1))
      ),
    ]);
  }

  function checkCountOfShownMovies() {
    if (moviesListShown.length === images.length) setAllMoviesAreShown(true);
  }


  function handleCheckToken() {
    // setIsLoading(true);
    mainApi
      .checkToken()
      .then((res) => {
        setCurrentUser(res);
        setIsLoggedIn(true);
        // setIsLoading(false);
        history.push("/movies");
      })
      .catch(() => {
        // setIsLoading(false);
        // if (isLoggedIn !== null) {
        //   setIsSuccessInfoToolTip(false);
        //   setInfoToolTipPopupOpen(true);
        // }
      });
  }

  function handleSignIn(data) {
    mainApi
      .signIn(data)
      .then(() => {
        handleCheckToken();
      })
      .catch(async (err) => {
        // const newErr = await err;
        // setErrorPopup(newErr.message, true);
        // setTimeout(() => setErrorPopup(newErr.message, false), 5000);
        console.log(err);
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
        // const newErr = await err;
        // setErrorPopup(newErr.message, true);
        // setTimeout(() => setErrorPopup(newErr.message, false), 5000);
        console.log(err);
      });
  }

  function handleSignOut() {
    mainApi
    .signOut(currentUser.email)
    .then(() => {
      setIsLoggedIn(null);
      history.push("/");
      setCurrentUser({ email: "", password: "", name: "" });
      // setIsLoading(false);
    })
    .catch(() => {
      // setIsSuccessInfoToolTip(false);
      // setInfoToolTipPopupOpen(true);
    });
  }

  function handleEditProfile() {}

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
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
        />
        <ProtectedRoute
          exact path="/movies"
          isLoggedIn={isLoggedIn}
          component={Movies}
          moviesListShown={moviesListShown}
          onShowMoreMovies={handleShowMovies}
          allMoviesAreShown={allMoviesAreShown}
        />
        <ProtectedRoute
          exact path="/saved-movies"
          isLoggedIn={isLoggedIn}
          component={SavedMovies}
          moviesListShown={moviesListShown}
        />
        <Route path="/404">
          <NotFound />
        </Route>
        <Redirect to="/404" />
      </Switch>

      <Footer />

      <ErrorPopup errorText={"Некорректно введен адрес электронной почты"} isActive={false} />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
