import { baseUrl,moviesUrl } from "./utils.js";
class MainApi {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res.json());
    }
  }

  signUp({name, email, password}) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "name": name,
        "password": password,
        "email": email
      }),
    }).then(this._checkResponse);
  }

  signIn({email, password}) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "password": password,
        "email": email
      }),
    }).then(this._checkResponse);
  }

  signOut(email) {
    return fetch(`${this._baseUrl}/signout`, {
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "email": email
      }),
    }).then(this._checkResponse);
  }

  editProfile({name, email}) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "name": name,
        "email": email
      }),
    }).then(this._checkResponse);
  }

  checkToken() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
    }).then(this._checkResponse);
  }

  getSavedMovies() {
    return fetch(`${this._baseUrl}/movies`, {
      credentials: 'include',
    }).then(this._checkResponse);
  }

  saveMovie(movie) {
    const {country, director, duration, year, description, trailerLink, nameRU, nameEN,  } = movie;
    return fetch(`${this._baseUrl}/movies`, {
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "country": country,
        "director": director,
        "duration": duration,
        "year": year,
        "description": description,
        "image": `${moviesUrl}+${movie.image.url}`,
        "trailer": trailerLink,
        "nameRU": nameRU,
        "nameEN": nameEN,
        "thumbnail": `${moviesUrl}+${movie.image.formats.thumbnail.url}`,
        "movieId": movie.id,
        }),
    }).then(this._checkResponse);
  }

  removeFromSavedMovie(movieId) {
    return fetch(`${this._baseUrl}/movies/${movieId}`, {
      method: "DELETE",
      credentials: 'include',
    }).then(this._checkResponse);
  }

}

const mainApi = new MainApi(baseUrl);
export default mainApi;
