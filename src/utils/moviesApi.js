import { moviesUrl } from "./utils.js";
class MoviesApi {
  constructor(moviesUrl) {
    this._moviesUrl = moviesUrl;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res.json());
    }
  }

  getMovies() {
    return fetch(`${this._moviesUrl}`, {}).then(this._checkResponse);
  }
}

const moviesApi = new MoviesApi(moviesUrl);
export default moviesApi;
