import { baseUrl } from "./utils.js";
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

  checkToken() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
    }).then(this._checkResponse);
  }
}

const mainApi = new MainApi(baseUrl);
export default mainApi;
