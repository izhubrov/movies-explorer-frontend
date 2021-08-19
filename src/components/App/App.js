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
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute";
import mainApi from "../../utils/mainApi";
import moviesApi from "../../utils/moviesApi";
import { initialCountOfShownMovies, additionalCountOfShownMovies} from "../../utils/utils";
import Preloader from "../Preloader/Preloader";

function App() {
  const history = useHistory();
  const [isLoggedIn, setIsLoggedIn] = React.useState(null);
  const [shownMovies, setShownMovies] = React.useState([]);
  const [isAllMoviesAreShown, setAllMoviesAreShown] = React.useState(false);
  const [isCurrentUser, setCurrentUser] = React.useState({});
  const [isError, setError] = React.useState({ errorText: "", isActive: false });
  const [isSuccess, setSuccess] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [moviesItems, setMoviesItems] = React.useState([]);
  const [filteredMoviesItems, setFilteredMoviesItems] = React.useState();
  const [isFinishSearching, setIsFinishSearching] = React.useState(false);
  const [isErrorMoviesServer, setErrorMoviesServer] = React.useState(false);
  const [width, setWidth] = React.useState('');
  const [savedMovies, setSavedMovies] = React.useState([]);

  React.useEffect(() => {
    setIsLoading(false);
    handleCheckToken();
    getSavedMovies();
    setMoviesItems(JSON.parse(localStorage.getItem("movies")));
    handleCheckDeviceWidth();
    handleChangeDeviceWidth();
  }, []);

  React.useEffect(()=>{
    filteredMoviesItems && handleShowInitialMovies();
  },[filteredMoviesItems]);

  React.useEffect(()=>{
    shownMovies.length !== 0 && checkCountOfShownMovies();
  },[shownMovies]);

  React.useEffect(()=>{
    filteredMoviesItems && handleShowMoviesInResize();
  },[width])

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
        if (isLoggedIn !== null) {
          await handleShowError(err);
        }
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

  function handleSearchMovies(searchedMovie) {
    if (localStorage.getItem("movies") === null) {
      handleGetMovies();
    } else {
      setShownMovies([]);
      setFilteredMoviesItems([]);
      setFilteredMoviesItems(moviesItems.filter((item) => {
        return Object.values(item).find((features) => {
          return (
            typeof features === 'string' &&
            features.toLowerCase().includes(searchedMovie.toLowerCase()));
        });
      }));
      setIsFinishSearching(true);
    }
  }

  function handleGetMovies() {
    moviesApi
    .getMovies()
    .then((res) => {
      setMoviesItems(res);
      localStorage.setItem("movies", JSON.stringify(res));
    })
    .catch(async (err) => {
      await handleShowError(err);
    });
  }

  function handleCheckDeviceWidth() {
    return window.innerWidth >= 1280 ? setWidth('1280') : window.innerWidth > 480 ? setWidth('1043') : setWidth('480');
  }

  function handleChangeDeviceWidth() {
    function getDeviceWidth() {
      setTimeout(handleCheckDeviceWidth,2000);
    }
    window.addEventListener('resize', getDeviceWidth);
    return ()=>{
      window.removeEventListener('resize', getDeviceWidth)
    }
  }

  function handleShowInitialMovies() {
    setShownMovies([...filteredMoviesItems.filter((movie,index) => index < initialCountOfShownMovies[width])]);
  }

  function handleShowMoviesInResize() {
    let alreadyShownMovies = shownMovies.length;
    setShownMovies([]);
    if (alreadyShownMovies < initialCountOfShownMovies[width]) {
      alreadyShownMovies = initialCountOfShownMovies[width];
    } else {
      alreadyShownMovies = Math.ceil(alreadyShownMovies / additionalCountOfShownMovies[width]) * additionalCountOfShownMovies[width];
    }
    setShownMovies([...filteredMoviesItems.filter((movie,index) => index < alreadyShownMovies)]);
  }

  function handleShowAdditionalMovies() {
    setShownMovies([
      ...shownMovies,
      ...filteredMoviesItems.filter(
        (movie, index) =>
          index >= shownMovies.length &&
          index < shownMovies.length + additionalCountOfShownMovies[width]
      ),
    ]);
  }

  function checkCountOfShownMovies() {
    if (shownMovies.length === filteredMoviesItems.length) {
      setAllMoviesAreShown(true);
    } else {
      setAllMoviesAreShown(false);
    }
  }

  function getSavedMovies() {
    mainApi
    .getSavedMovies()
    .then((res) => {
      setSavedMovies(res);
      setTimeout(() => setSuccess(false), 3000);
    })
    .catch(async (err) => {
      await handleShowError(err);
    });
  }

  function handleSaveMovie(movie) {
    mainApi
    .saveMovie(movie)
    .then((savedMovie) => {
      setSavedMovies([...savedMovies, savedMovie]);
      setTimeout(() => setSuccess(false), 3000);
    })
    .catch(async (err) => {
      await handleShowError(err);
    });
  }

  function handleRemoveFromSavedMovie(movieId) {
    mainApi
    .removeFromSavedMovie(movieId)
    .then(() => {
      setSavedMovies(savedMovies.filter((item) => item.id !== movieId));
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
          onSearchMovies={handleSearchMovies}
          shownMovies={shownMovies}
          onShowMoreMovies={handleShowAdditionalMovies}
          isAllMoviesAreShown={isAllMoviesAreShown}
          isErrorMoviesServer={isErrorMoviesServer}
          isFinishSearching={isFinishSearching}
          savedMovies={savedMovies}
          onAddToSaved={handleSaveMovie}
          onRemoveFromSaved={handleRemoveFromSavedMovie}
        />
        <ProtectedRoute
          exact path="/saved-movies"
          isLoggedIn={isLoggedIn}
          component={SavedMovies}
          shownMovies={shownMovies}
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
