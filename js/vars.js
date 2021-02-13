const apiKey = '56b7d91218774cf2f9808498488f31f9';
const asideMainBox = document.querySelector('.aside__info');
const footerDate = document.querySelector('.aside__footer-day');
const headerLocarion = document.querySelector('.aside__location');
const humidityBox = document.querySelector('.main-bar__data--humidity');
const windSpeed = document.querySelector('.main-bar__data--speed');
const range = document.querySelector('.main-bar__range');
const windIcon = document.querySelector('.main-bar__wind-icon');
const visability = document.querySelector('.main-bar__data--visability');
const pressureBox = document.querySelector('.main-bar__data--pressure');
const forecastBox = document.querySelector('.top-bar__forecast');
const searchInput = document.querySelector('.top-bar__search');
const submitInput = document.querySelector('.top-bar__search-btn');
const asideImg = document.querySelector('.aside__info-img');
const asideDescription = document.querySelector('.aside__info-decription');
const asideData = document.querySelector('.aside__data');
const main = document.querySelector('.main');
const modal = document.querySelector('.modal');
const modalInput = document.querySelector('.modal__input');
const modalSubmit = document.querySelector('.modal__input-btn');
const tempType = document.querySelectorAll('.top-bar__type-btn');
const tempTypeContainer = document.querySelector('.top-bar__type');
const unitValue = document.querySelectorAll('.unit');
const mainUnit = document.querySelector('.temper-type--big');
let unit;
const errorBox = document.querySelector('.error');
const errorMessage = document.querySelector('.error__message');
const windSpeedUnits = document.querySelector('.speed-wind');

let inputValue;

const date = `${new Date()}`;
const currDay = date.split(' ')[0];
const currDate = +date.split(' ')[2];
const currMonth = date.split(' ')[1];

let units;
let windUnit;

const windRange = document.querySelector('.range__tracker');
