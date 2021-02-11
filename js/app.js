const asideMainBox = document.querySelector('.aside__info');
const footerDate = document.querySelector('.aside__footer-day');
const footerLocarion = document.querySelector('.aside__footer-location');

const date = `${new Date()}`;
const currDay = date.split(' ')[0];
const currDate = date.split(' ')[2];
const currMonth = date.split(' ')[1];

const cityCinput = 'barcelona';

async function getData(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=56b7d91218774cf2f9808498488f31f9&units=metric`,
    );
    const data = await response.json();
    console.log(data);
    renderMainInfo(data);
  } catch (err) {
    console.log(err.message);
  }
}

function renderMainInfo(data) {
  const { temp: currentTemp } = data.main;
  const { main: currentWeather, icon: imgId } = data.weather[0];

  mainHtml = `
          <li class="aside__info-item">
            <img class="aside__info-img" src="https://openweathermap.org/img/wn/${imgId}@2x.png" alt="" />
          </li>
          <li class="aside__info-item"
            ><p class="aside__info-data"
              >${Math.trunc(
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

  footerLocarion.textContent = `${cityCinput[0].toUpperCase()}${cityCinput.slice(
    1,
  )}`;
}

function updateUI() {
  getData(cityCinput);
}
updateUI();

// const {
//   temp: currentTemp,
//   temp_min: minTemp,
//   temp_max: maxTemp,
//   pressure,
// } = data.main;
