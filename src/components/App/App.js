import React from "react";
import {
  Route,
  Switch,
  useHistory,
  Redirect,
  useLocation,
} from "react-router-dom";
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
  const [savedSearchInputValue, setSavedSearchInputValue] = React.useState("");
  const [searchedSavedMoviesItems, setSearchedSavedMoviesItems] =
    React.useState();
  const [isFinishSearching, setIsFinishSearching] = React.useState(null);
  const [isFinishSavedSearching, setIsFinishSavedSearching] =
    React.useState(false);
  const [isErrorMoviesServer, setErrorMoviesServer] = React.useState(false);
  const [isShortMoviesFilterOn, setShortMoviesFilterOn] = React.useState(null);
  const [isShortSavedMoviesFilterOn, setShortSavedMoviesFilterOn] = React.useState(null);
  const [width, setWidth] = React.useState("");
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [isActiveArrowTop, setIsActiveArrowTop] = React.useState(false);
  const [isActiveAboutProject, setIsActiveAboutProject] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isActiveTechs, setIsActiveTechs] = React.useState(false);
  const [isActiveAboutMe, setIsActiveAboutMe] = React.useState(false);
  const location = useLocation();
  const isLocationMain = location.pathname === "/";

  React.useEffect(() => {
    handleCheckToken();
    setMoviesItems(JSON.parse(localStorage.getItem("movies")));
    handleCheckDeviceWidth();
    handleChangeDeviceWidth();
    setShortMoviesFilterOn(JSON.parse(localStorage.getItem("isShortMoviesFilterOn")) || false);
    setShortSavedMoviesFilterOn(JSON.parse(localStorage.getItem("isShortSavedMoviesFilterOn")) || false);
    setSearchInputValue("");
  }, []);

  React.useEffect(() => {
    isLoggedIn && getSavedMovies();
  }, [isLoggedIn]);

  React.useEffect(() => {
    searchedMoviesItems && handleShowInitialMovies();
  }, [searchedMoviesItems]);

  React.useEffect(() => {
    if (shownMovies.length !== 0) {
      checkCountOfShownMovies();
      setIsFinishSearching(true);
    }
  }, [shownMovies]);

  React.useEffect(() => {
    searchedMoviesItems && handleShowMoviesInResize();
  }, [width]);

  React.useEffect(()=>{
    if (Array.isArray(moviesItems) && moviesItems.length !== 0) {
      setSearchedMoviesItems(
        isShortMoviesFilterOn
          ? JSON.parse(localStorage.getItem("searchedMovies")).filter(
              (movie) => movie.duration <= 40
            )
          : JSON.parse(localStorage.getItem("searchedMovies")) || []
      );
      searchInputValue && handleSearchMovies(searchInputValue);
    }
  },[moviesItems, searchInputValue, isShortMoviesFilterOn])

  React.useEffect(() => {
    if (searchInputValue) {
      handleSetMoviesToLocalStorage(searchInputValue)
    }
  }, [searchInputValue, isShortMoviesFilterOn]);

  React.useEffect(() => {
    if (Array.isArray(savedMovies)) {
      handleSearchSavedMovies(savedSearchInputValue);
    }
  }, [isShortSavedMoviesFilterOn, savedSearchInputValue, savedMovies]);

  function handleCheckToken() {
    setIsLoading(true);
    mainApi
      .checkToken()
      .then((res) => {
        setCurrentUser(res);
        setIsLoading(false);
        setIsLoggedIn(true);
        if (
          location.pathname === "/sign-up" ||
          location.pathname === "/sign-in"
        ) {
          history.push("/movies");
        } else {
          history.push(location.pathname);
        }
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
        setMoviesItems([]);
        setSavedMovies([]);
        setSearchedMoviesItems([]);
        setShownMovies([]);
        setSearchInputValue("");
        setShortMoviesFilterOn(false);
        setIsFinishSearching(false);
        setIsFinishSavedSearching(false);
        localStorage.removeItem("isShortMoviesFilterOn");
        localStorage.removeItem("isShortSavedMoviesFilterOn");
        localStorage.removeItem("searchedMovies");
        localStorage.removeItem("movies");
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

  function handleSetSearchInputValue(searchedMovie) {
    setSearchInputValue(searchedMovie);
  }

  function handleSetSavedSearchInputValue(searchedMovie) {
    setSavedSearchInputValue(searchedMovie);
  }

  function handleClearSavedMoviesInput() {
    setSavedSearchInputValue("");
  }

  function handleSetMoviesToLocalStorage() {
    if (localStorage.getItem("movies") === null) {
      handleGetMovies();
    }
  }

  function handleInnerSearching(movie, isMoviesPageSearching) {
    const input = isMoviesPageSearching ? searchInputValue : savedSearchInputValue;
    return Object.values(movie).find((features) => {
      return (
        typeof features === "string" &&
        features.toLowerCase().includes(input.toLowerCase())
      );
    });
  }

  function handleSearchMovies() {
    let searchedMovies = moviesItems.filter((movie) =>
      handleInnerSearching(movie, true)
    );
    if (isShortMoviesFilterOn) {
      const filteredSearchedMovies = searchedMovies.filter(
        (movie) => movie.duration <= 40
      );
      setSearchedMoviesItems(filteredSearchedMovies);
    } else {
      localStorage.setItem("searchedMovies", JSON.stringify(searchedMovies));
      setSearchedMoviesItems(searchedMovies);
    }
    setIsFinishSearching(true);
  }

  function handleSearchSavedMovies() {
    let searchedSavedMovies = savedMovies.filter((movie) =>
      handleInnerSearching(movie, false)
    );
    console.log(searchedSavedMovies);
    if (isShortSavedMoviesFilterOn) {
      const filteredSearchedSavedMovies = searchedSavedMovies.filter(
        (movie) => movie.duration <= 40
      );
      setSearchedSavedMoviesItems(filteredSearchedSavedMovies);
    } else {
      setSearchedSavedMoviesItems(searchedSavedMovies);
    }

    setIsFinishSavedSearching(true);
  }

  function handleFilterMovies() {
    setShortMoviesFilterOn(!isShortMoviesFilterOn);
    localStorage.setItem("isShortMoviesFilterOn", !isShortMoviesFilterOn);
  }

  function handleFilterSavedMovies() {
    setShortSavedMoviesFilterOn(!isShortSavedMoviesFilterOn);
    localStorage.setItem("isShortSavedMoviesFilterOn", !isShortSavedMoviesFilterOn);
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

  function handleGetMovies() {
    console.log('затем сюда')
    moviesApi
      .getMovies()
      .then((res) => {
        console.log(res);
        setMoviesItems(res);
        localStorage.setItem("movies", JSON.stringify(res));
      })
      .catch(async (err) => {
        await handleShowError(err);
      });
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
      if (isLocationMain) {
        window.pageYOffset > 300
          ? setIsActiveAboutProject(true)
          : setIsActiveAboutProject(false);
        window.pageYOffset > 870
          ? setIsActiveTechs(true)
          : setIsActiveTechs(false);
        window.pageYOffset > 1650
          ? setIsActiveAboutMe(true)
          : setIsActiveAboutMe(false);
      }
      window.innerWidth > 900 &&
        setTimeout(
          () =>
            window.pageYOffset > 300
              ? setIsActiveArrowTop(true)
              : setIsActiveArrowTop(false),
          500
        );
    }
    window.addEventListener("scroll", checkScroll);
    return () => {
      window.removeEventListener("scroll", checkScroll);
    };
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={isCurrentUser}>
        <Header isLoggedIn={isLoggedIn} />
        <Switch>
          <Route exact path="/">
            <Main
              onScroll={handleCheckScroll}
              isActiveArrowTop={isActiveArrowTop}
              isActiveAboutProject={isActiveAboutProject}
              isActiveTechs={isActiveTechs}
              isActiveAboutMe={isActiveAboutMe}
              isLoading={isLoading}
              isLoggedIn={isLoggedIn}
            />
          </Route>
          <Route exact path="/sign-up">
            <Register onSignUp={handleSignUp} />
          </Route>
          <Route exact path="/sign-in">
            <Login onSignIn={handleSignIn} isLoading={isLoading} />
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
            onFilterMovies={handleFilterMovies}
            isShortMoviesFilterOn={isShortMoviesFilterOn}
            shownMovies={shownMovies}
            onShowMoreMovies={handleShowAdditionalMovies}
            isAllMoviesAreShown={isAllMoviesAreShown}
            isErrorMoviesServer={isErrorMoviesServer}
            isFinishSearching={isFinishSearching}
            savedMovies={savedMovies}
            onAddToSaved={handleSaveMovie}
            onRemoveFromSaved={handleRemoveFromSavedMovie}
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
            isShortSavedMoviesFilterOn={isShortSavedMoviesFilterOn}
            shownMovies={searchedSavedMoviesItems}
            isFinishSearching={isFinishSavedSearching}
            savedMovies={savedMovies}
            onAddToSaved={handleSaveMovie}
            onRemoveFromSaved={handleRemoveFromSavedMovie}
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
