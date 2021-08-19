const nameRegExp = /^[a-zA-Zа-яА-ЯёЁ\- ]+$/;
const passwordRegExp = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,}$/;
const emailRegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const customMessages = {
  'name': 'Введен недопустимый символ. Разрешены к использованию буквы, дефис и пробел.',
  'email': 'Введен некорректный адрес электронной почты.',
  'password': 'Слишком слабый пароль. Необходимо использовать латинские буквы, как минимум 1 цифру, спецсимвол, прописную и заглавные буквы.'
}

// const baseUrl = "https://api.izhubrov-mov-explorer.nomoredomains.monster";
const baseUrl = "http://localhost:3001";
const serverUrl = "https://api.nomoreparties.co"
const moviesUrl = "https://api.nomoreparties.co/beatfilm-movies";

const initialCountOfShownMovies= {
  '1280': 12,
  '1043': 8,
  '480': 5,
}

const additionalCountOfShownMovies= {
  '1280': 3,
  '1043': 2,
  '480': 2,
}

export {
  nameRegExp,
  passwordRegExp,
  emailRegExp,
  customMessages,
  baseUrl,
  moviesUrl,
  serverUrl,
  initialCountOfShownMovies,
  additionalCountOfShownMovies
};