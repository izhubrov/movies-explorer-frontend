import React from "react";
import { Route, Switch, useHistory, Redirect, useLocation } from "react-router-dom";
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
import Preloader from "../Preloader/Preloader";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute";
import mainApi from "../../utils/mainApi";
import moviesApi from "../../utils/moviesApi";
import {
  initialCountOfShownMovies,
  additionalCountOfShownMovies,
} from "../../utils/utils";

function App() {
  const history = useHistory();
  const [isLoggedIn, setIsLoggedIn] = React.useState(null);
  const [shownMovies, setShownMovies] = React.useState([]);
  const [isAllMoviesAreShown, setAllMoviesAreShown] = React.useState(false);
  const [isCurrentUser, setCurrentUser] = React.useState({});
  const [isError, setError] = React.useState({
    errorText: "",
    isActive: false,
  });
  const [isSuccess, setSuccess] = React.useState(false);
  const [moviesItems, setMoviesItems] = React.useState([]);
  const [searchedMoviesItems, setSearchedMoviesItems] = React.useState();
  const [searchInputValue, setSearchInputValue] = React.useState("");
  const [isSavedSearchOrFilter, setIsSavedSearchOrFilter] = React.useState(false);
  const [savedSearchedMoviesItems, setSavedSearchedMoviesItems] = React.useState();
  const [isFinishSearching, setIsFinishSearching] = React.useState(null);
  const [isFinishSavedSearching, setIsFinishSavedSearching] = React.useState(false);
  const [isErrorMoviesServer, setErrorMoviesServer] = React.useState(false);
  const [isShortMoviesFilterOn, setShortMoviesFilterOn] = React.useState(null);
  const [width, setWidth] = React.useState("");
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [isActiveArrowTop, setIsActiveArrowTop] = React.useState(false);
  const [isActiveAboutProject, setIsActiveAboutProject] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const location = useLocation();
  const isLocationMain = location.pathname === '/';

  React.useEffect(() => {
    handleCheckToken();
    getSavedMovies();
    setMoviesItems(JSON.parse(localStorage.getItem("movies")));
    handleCheckDeviceWidth();
    handleChangeDeviceWidth();
    setSearchInputValue("");
  }, []);

  React.useEffect(() => {
    searchedMoviesItems && handleShowInitialMovies();
  }, [searchedMoviesItems]);

  React.useEffect(() => {
    shownMovies.length !== 0 && checkCountOfShownMovies();
  }, [shownMovies]);

  React.useEffect(() => {
    searchedMoviesItems && handleShowMoviesInResize();
  }, [width]);

  React.useEffect(()=>{
    setSavedSearchedMoviesItems(savedMovies);
    setIsFinishSavedSearching(true);
  },[savedMovies]);

  React.useEffect(()=>{
    if (localStorage.getItem("movies") === null) {
      handleGetMovies();
    }
    searchInputValue && handleSearchMovies(searchInputValue);
  },[searchInputValue, isShortMoviesFilterOn])

  React.useEffect(()=>{
    if (isSavedSearchOrFilter) handleSearchSavedMovies(searchInputValue);
    if (isSavedSearchOrFilter && !isShortMoviesFilterOn && !searchInputValue) handleClearSavedMoviesInput();
  },[isSavedSearchOrFilter, isShortMoviesFilterOn, searchInputValue])

  function handleCheckToken() {
    setIsLoading(true);
    mainApi
      .checkToken()
      .then((res) => {
        setCurrentUser(res);
        setIsLoading(false);
        setIsLoggedIn(true);
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
        setIsLoading(false);
        setCurrentUser({ email: "", password: "", name: "" });
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

  function handleInnerSearching(movie) {
    function handleSearchingWithoutFilter() {
      return Object.values(movie).find((features) => {
        return (
          typeof features === "string" &&
          features.toLowerCase().includes(searchInputValue.toLowerCase())
        );
      });
    }
    return (isShortMoviesFilterOn ? (movie.duration <=40 && handleSearchingWithoutFilter()) : handleSearchingWithoutFilter());
  }

  function handleSetSearchInputValue(searchedMovie) {
    setSearchInputValue(searchedMovie);
    setShownMovies([]);
    setSearchedMoviesItems([]);
    setSavedSearchedMoviesItems([]);
  }

  function handleSetSavedSearchInputValue(searchedMovie) {
    setIsFinishSavedSearching(false);
    setSavedSearchedMoviesItems([]);
    setIsSavedSearchOrFilter(true);
    handleSetSearchInputValue(searchedMovie);
  }

  function handleSearchMovies() {
    setSearchedMoviesItems(
      moviesItems.filter((movie) => handleInnerSearching(movie))
    );
    setIsFinishSearching(true);
  }

  function handleSearchSavedMovies() {
    setSavedSearchedMoviesItems(
      savedMovies.filter((movie) => handleInnerSearching(movie))
    );
    setIsFinishSavedSearching(true);
  }

  function handleClearMoviesInput() {
    setSearchedMoviesItems([]);
    setSearchInputValue("");
    setIsFinishSearching(false);
  }

  function handleClearSavedMoviesInput() {
    setSearchInputValue("");
    setIsSavedSearchOrFilter(true);
  }

  function handleFilterMovies() {
    setShortMoviesFilterOn(!isShortMoviesFilterOn);
  }

  function handleFilterSavedMovies() {
    setIsSavedSearchOrFilter(true);
    handleFilterMovies();
  }

  function handleSetFilterToInitial() {
    setShortMoviesFilterOn(null);
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
    return window.innerWidth >= 1280
      ? setWidth("1280")
      : window.innerWidth > 480
      ? setWidth("1043")
      : setWidth("480");
  }

  function handleChangeDeviceWidth() {
    function getDeviceWidth() {
      setTimeout(handleCheckDeviceWidth, 2000);
    }
    window.addEventListener("resize", getDeviceWidth);
    return () => {
      window.removeEventListener("resize", getDeviceWidth);
    };
  }

  function handleCheckScroll() {
    function checkScroll() {
     isLocationMain && window.pageYOffset > 250 ? setIsActiveAboutProject(true) : setIsActiveAboutProject(false);
     setTimeout(()=> window.pageYOffset > 300 ? setIsActiveArrowTop(true) : setIsActiveArrowTop(false),500);
    }
    window.addEventListener("scroll", checkScroll)
    return () => {
      window.removeEventListener("scroll", checkScroll);
    };
  }

  function handleShowInitialMovies() {
    setShownMovies([
      ...searchedMoviesItems.filter(
        (movie, index) => index < initialCountOfShownMovies[width]
      ),
    ]);
  }

  function handleShowMoviesInResize() {
    let alreadyShownMovies = shownMovies.length;
    setShownMovies([]);
    if (alreadyShownMovies < initialCountOfShownMovies[width]) {
      alreadyShownMovies = initialCountOfShownMovies[width];
    } else {
      alreadyShownMovies =
        Math.ceil(alreadyShownMovies / additionalCountOfShownMovies[width]) *
        additionalCountOfShownMovies[width];
    }
    setShownMovies([
      ...searchedMoviesItems.filter(
        (movie, index) => index < alreadyShownMovies
      ),
    ]);
  }

  function handleShowAdditionalMovies() {
    setShownMovies([
      ...shownMovies,
      ...searchedMoviesItems.filter(
        (movie, index) =>
          index >= shownMovies.length &&
          index < shownMovies.length + additionalCountOfShownMovies[width]
      ),
    ]);
  }

  function checkCountOfShownMovies() {
    if (shownMovies.length === searchedMoviesItems.length) {
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
        if (isLoggedIn !== null) {
          await handleShowError(err);
        }
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
        setSavedMovies(savedMovies.filter((item) => item.movieId !== movieId));
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
            <Main onScroll={handleCheckScroll} isActiveArrowTop={isActiveArrowTop} isActiveAboutProject={isActiveAboutProject} isLoading={isLoading}/>
          </Route>
          <Route exact path="/sign-up">
            <Register onSignUp={handleSignUp} />
          </Route>
          <Route exact path="/sign-in">
            <Login onSignIn={handleSignIn} isLoading={isLoading}/>
          </Route>
          <ProtectedRoute
            exact
            path="/profile"
            isLoggedIn={isLoggedIn}
            component={Profile}
            onUpdateUser={handleEditProfile}
            onSignOut={handleSignOut}
            isSuccess={isSuccess}
          />
          <ProtectedRoute
            exact
            path="/movies"
            isLoggedIn={isLoggedIn}
            component={Movies}
            onSearchMovies={handleSetSearchInputValue}
            onClearInput={handleClearMoviesInput}
            onFilterMovies={handleFilterMovies}
            onSetFilterToInitial={handleSetFilterToInitial}
            shownMovies={shownMovies}
            onShowMoreMovies={handleShowAdditionalMovies}
            isAllMoviesAreShown={isAllMoviesAreShown}
            isErrorMoviesServer={isErrorMoviesServer}
            isFinishSearching={isFinishSearching}
            savedMovies={savedMovies}
            onAddToSaved={handleSaveMovie}
            onRemoveFromSaved={handleRemoveFromSavedMovie}
            onScroll={handleCheckScroll}
            isActiveArrowTop={isActiveArrowTop}
          />
          <ProtectedRoute
            exact
            path="/saved-movies"
            isLoggedIn={isLoggedIn}
            component={SavedMovies}
            onSearchMovies={handleSetSavedSearchInputValue}
            onClearInput={handleClearSavedMoviesInput}
            onFilterMovies={handleFilterSavedMovies}
            onSetFilterToInitial={handleSetFilterToInitial}
            shownMovies={savedSearchedMoviesItems}
            isFinishSearching={isFinishSavedSearching}
            savedMovies={savedMovies}
            onAddToSaved={handleSaveMovie}
            onRemoveFromSaved={handleRemoveFromSavedMovie}
            onScroll={handleCheckScroll}
            isActiveArrowTop={isActiveArrowTop}
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
