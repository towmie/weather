const apiKey = '56b7d91218774cf2f9808498488f31f9';
const asideMainBox = document.querySelector('.aside__info');
const footerDate = document.querySelector('.aside__footer-day');
const footerLocarion = document.querySelector('.aside__footer-location');
const humidityBox = document.querySelector('.main-bar__data--humidity');
const windSpeed = document.querySelector('.main-bar__data--speed');
const range = document.querySelector('.main-bar__range');
const windIcon = document.querySelector('.main-bar__wind-icon');
const visability = document.querySelector('.main-bar__data--visability');
const pressureBox = document.querySelector('.main-bar__data--pressure');
const date = `${new Date()}`;
const currDay = date.split(' ')[0];
const currDate = date.split(' ')[2];
const currMonth = date.split(' ')[1];

const cityInput = 'rome';

async function getData(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`,
    );

    if (!response.ok) throw new Error('Problem getting City');

    const data = await response.json();
    renderMainInfo(data);
  } catch (err) {
    console.log(`Yo, your error: ${err.message}`);
  }
}

async function getForecast(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`,
    );

    if (!response.ok) throw new Error('Problem getting City');
    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.log(err.message);
  }
}

function renderMainInfo(data) {
  const { temp: currentTemp, humidity, pressure } = data.main;
  const { speed, deg } = data.wind;
  const { main: currentWeather, icon: imgId } = data.weather[0];

  const mainHtml = `
          <li class="aside__info-item">
            <img class="aside__info-img" src="https://openweathermap.org/img/wn/${imgId}@2x.png" alt="" />
          </li>
          <li class="aside__info-item"
            ><p class="aside__info-data"
              >${Math.round(
                currentTemp,
              )}<span class="temper-type temper-type--big">C</span></p
            ></li
          >
          <li class="aside__info-item"
            ><p class="aside__info-decription">${currentWeather}</p>
          </li>
  `;

  asideMainBox.insertAdjacentHTML('beforeend', mainHtml);
  footerDate.textContent = `${currDay}, ${currDate} ${currMonth}`;
  footerLocarion.textContent = `${cityInput[0].toUpperCase()}${cityInput.slice(
    1,
  )}`;

  humidityBox.textContent = `${humidity}`;
  range.value = humidity;
  windSpeed.textContent = Math.round(speed);
  windIcon.style.transform = `rotate(${deg - 45}deg)`;
  visability.textContent = `${(data.visibility / 1000).toFixed(1)}`;
  pressureBox.textContent = pressure;
}

function renderForecast(data) {}

function updateUI() {
  getData(cityInput);
  getForecast(cityInput);
}
updateUI();
