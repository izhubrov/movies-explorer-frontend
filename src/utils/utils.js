const images = [{
    _id: '1',
    name: '33 слова о дизайне',
    link: '/images/1.jpg',
    duration: 107,
  },
  {
    _id: '2',
    name: 'Киноальманах «100 лет дизайна»',
    link: '/images/2.jpg',
    duration: 63,
  },
  {
    _id: '3',
    name: 'В погоне за Бенкси',
    link: '/images/3.jpg',
    duration: 102,
  },
  {
    _id: '4',
    name: 'Баския: Взрыв реальности',
    link: '/images/4.jpg',
    duration: 81,
  },
  {
    _id: '5',
    name: 'Бег это свобода',
    link: '/images/5.jpg',
    duration: 104,
  },
  {
    _id: '6',
    name: 'Книготорговцы',
    link: '/images/6.jpg',
    duration: 97,
  },
  {
    _id: '7',
    name: 'Когда я думаю о Германии ночью',
    link: '/images/7.jpg',
    duration: 116,
  },
  {
    _id: '8',
    name: 'Gimme Danger: История Игги и The Stoogeeeee',
    link: '/images/8.jpg',
    duration: 119,
  },
  {
    _id: '9',
    name: 'Дженис: Маленькая девочка грустит',
    link: '/images/9.jpg',
    duration: 102,
  },
  {
    _id: '10',
    name: 'Соберись перед прыжком',
    link: '/images/10.jpg',
    duration: 70,
  },
  {
    _id: '11',
    name: 'Пи Джей Харви: A dog called money',
    link: '/images/11.jpg',
    duration: 64,
  },
  {
    _id: '12',
    name: 'По волнам: Искусство звука в кино',
    link: '/images/12.jpg',
    duration: 67,
  },
  {
    _id: '13',
    name: '33 слова о дизайне',
    link: '/images/1.jpg',
    duration: 107,
  },
  {
    _id: '14',
    name: 'Киноальманах «100 лет дизайна»',
    link: '/images/2.jpg',
    duration: 63,
  },
  {
    _id: '15',
    name: 'В погоне за Бенкси',
    link: '/images/3.jpg',
    duration: 102,
  },
  {
    _id: '16',
    name: 'Баския: Взрыв реальности',
    link: '/images/4.jpg',
    duration: 81,
  },
  {
    _id: '17',
    name: 'Бег это свобода',
    link: '/images/5.jpg',
    duration: 104,
  },
  {
    _id: '18',
    name: 'Книготорговцы',
    link: '/images/6.jpg',
    duration: 97,
  },
  {
    _id: '19',
    name: 'Когда я думаю о Германии ночью',
    link: '/images/7.jpg',
    duration: 116,
  },
  {
    _id: '20',
    name: 'Gimme Danger: История Игги и The Stoogeeeee',
    link: '/images/8.jpg',
    duration: 119,
  },
  {
    _id: '21',
    name: 'Дженис: Маленькая девочка грустит',
    link: '/images/9.jpg',
    duration: 102,
  },
  {
    _id: '22',
    name: 'Соберись перед прыжком',
    link: '/images/10.jpg',
    duration: 70,
  },
  {
    _id: '23',
    name: 'Пи Джей Харви: A dog called money',
    link: '/images/11.jpg',
    duration: 64,
  },
  {
    _id: '24',
    name: 'По волнам: Искусство звука в кино',
    link: '/images/12.jpg',
    duration: 67,
  },
  {
    _id: '25',
    name: 'Пи Джей Харви: A dog called money',
    link: '/images/11.jpg',
    duration: 64,
  },
  {
    _id: '26',
    name: 'По волнам: Искусство звука в кино',
    link: '/images/12.jpg',
    duration: 67,
  },

];

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

export {
  images,
  nameRegExp,
  passwordRegExp,
  emailRegExp,
  customMessages,
  baseUrl
};