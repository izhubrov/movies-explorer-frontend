import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
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
import useDeviceWidth from "../../utils/useDeviceWidth";
import useAuthAndProfile from "../../utils/useAuthAndProfile";
import useSearchAndFilter from "../../utils/useSearchAndFilter";
import useShowMovies from "../../utils/useShowMovies";
import useGetSaveAndRemoveMovies from "../../utils/useGetSaveAndRemoveMovies";
import useErrorPopup from "../../utils/useErrorPopup";

function App() {
  const [isCurrentUser, setCurrentUser] = React.useState({});
  const [isFinishSearching, setIsFinishSearching] = React.useState(null);
  const [isFinishSavedSearching, setIsFinishSavedSearching] =
    React.useState(false);
  const [moviesItems, setMoviesItems] = React.useState([]);
  const [isErrorMoviesServer, setErrorMoviesServer] = React.useState(null);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isFormDisabled, setIsFormDisabled] = React.useState(false);
  const { width, handleCheckDeviceWidth, handleChangeDeviceWidth } =
    useDeviceWidth();


  const { isError, handleShowError } = useErrorPopup();

  const {
    handleSetMoviesToLocalStorage,
    getSavedMovies,
    handleSaveMovie,
    handleRemoveFromSavedMovie,
  } = useGetSaveAndRemoveMovies({
    savedMovies,
    setMoviesItems,
    setErrorMoviesServer,
    setSavedMovies,
    handleShowError,
    setIsFinishSearching
  });

  const {
    searchedMoviesItems,
    searchedSavedMoviesItems,
    searchInputValue,
    savedSearchInputValue,
    isShortMoviesFilterOn,
    isShortSavedMoviesFilterOn,
    handleSearchMovies,
    handleSearchSavedMovies,
    handleFilterMovies,
    handleFilterSavedMovies,
    handleSetSearchInputValue,
    handleSetSavedSearchInputValue,
    handleClearSavedMoviesInput,
    setSearchInputValue,
    setSearchedMoviesItems,
    setShortMoviesFilterOn,
    setShortSavedMoviesFilterOn,
  } = useSearchAndFilter({
    moviesItems,
    savedMovies,
    setIsFinishSearching,
    setIsFinishSavedSearching,
    setErrorMoviesServer,
  });

  const {
    shownMovies,
    isAllMoviesAreShown,
    setShownMovies,
    handleShowInitialMovies,
    handleShowMoviesInResize,
    handleShowAdditionalMovies,
    checkCountOfShownMovies,
  } = useShowMovies({ width, searchedMoviesItems });

  const {
    isLoggedIn,
    isSuccess,
    handleCheckToken,
    handleSignIn,
    handleSignUp,
    handleSignOut,
    handleEditProfile,
  } = useAuthAndProfile(
    setIsLoading,
    setCurrentUser,
    handleShowError,
    setIsFormDisabled,
    isCurrentUser,
    setMoviesItems,
    setSavedMovies,
    setSearchedMoviesItems,
    setShownMovies,
    setSearchInputValue,
    setShortMoviesFilterOn,
    setIsFinishSearching,
    setIsFinishSavedSearching
  );

  React.useEffect(() => {
    handleCheckToken();
    setMoviesItems(JSON.parse(localStorage.getItem("movies")));
    handleCheckDeviceWidth();
    handleChangeDeviceWidth();
    setShortMoviesFilterOn(
      JSON.parse(localStorage.getItem("isShortMoviesFilterOn")) || false
    );
    setShortSavedMoviesFilterOn(
      JSON.parse(localStorage.getItem("isShortSavedMoviesFilterOn")) || false
    );
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

  React.useEffect(() => {
    searchInputValue && handleSetMoviesToLocalStorage();
    handleSearchMovies();
  }, [moviesItems, searchInputValue, isShortMoviesFilterOn]);

  React.useEffect(() => {
    if (Array.isArray(savedMovies)) {
      handleSearchSavedMovies(savedSearchInputValue);
    }
  }, [isShortSavedMoviesFilterOn, savedSearchInputValue, savedMovies]);

  return (
    <div className="page">
      <CurrentUserContext.Provider value={isCurrentUser}>
        <Header isLoggedIn={isLoggedIn} />
        <Switch>
          <Route exact path="/">
            <Main isLoading={isLoading} isLoggedIn={isLoggedIn} />
          </Route>
          <Route exact path="/sign-up">
            <Register onSignUp={handleSignUp} isFormDisabled={isFormDisabled} />
          </Route>
          <Route exact path="/sign-in">
            <Login
              onSignIn={handleSignIn}
              isFormDisabled={isFormDisabled}
              isLoading={isLoading}
            />
          </Route>
          <ProtectedRoute
            exact
            path="/profile"
            isLoggedIn={isLoggedIn}
            component={Profile}
            onUpdateUser={handleEditProfile}
            onSignOut={handleSignOut}
            isSuccess={isSuccess}
            isFormDisabled={isFormDisabled}
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
          />
          <ProtectedRoute
            exact
            path="/saved-movies"
            isLoggedIn={isLoggedIn}
            component={SavedMovies}
            onSearchMovies={handleSetSavedSearchInputValue}
            onClearInput={handleClearSavedMoviesInput}
            onFilterMovies={handleFilterSavedMovies}
            isErrorMoviesServer={isErrorMoviesServer}
            isShortSavedMoviesFilterOn={isShortSavedMoviesFilterOn}
            shownMovies={searchedSavedMoviesItems}
            isFinishSearching={isFinishSavedSearching}
            savedMovies={savedMovies}
            onAddToSaved={handleSaveMovie}
            onRemoveFromSaved={handleRemoveFromSavedMovie}
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
