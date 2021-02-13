function getUnits() {
  tempType.forEach((el) => {
    if (el.classList.contains('top-bar__type-btn--active')) {
      units = el.dataset.type;
    }
  });
}

function changeUnits(units) {
  units === 'metric' ? (unit = 'C') : (unit = 'F');
}

function error(err) {
  errorBox.classList.add('error--active');

  modal.style.opacity = 0;
  main.classList.add('fade');
  errorMessage.textContent = `${err}, please, try again`;

  setTimeout(function () {
    modalInput.value = '';
    modal.style.opacity = 1;
    modal.style.display = 'block';
    errorBox.classList.remove('error--active');
  }, 4000);
}

async function getData(city, type) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${type}`,
    );

    if (!response.ok) throw new Error('Problem with getting City');
    const data = await response.json();
    renderMainInfo(data);
  } catch (err) {
    error(err);
  }
}

async function getForecast(city, type) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${type}`,
    );

    if (!response.ok) throw new Error('Problem getting City');
    const data = await response.json();
    renderForecast(data);
    main.classList.remove('fade');
    modal.style.display = 'none';
  } catch (err) {
    error(err);
  }
}

function renderMainInfo(data) {
  const { temp: currentTemp, humidity, pressure } = data.main;
  const { speed, deg } = data.wind;
  const { main: currentWeather, icon: imgId } = data.weather[0];

  asideImg.src = `/img/weather-icons/${imgId}.png`;
  asideData.textContent = `${currentTemp.toFixed(1)}`;
  asideDescription.textContent = currentWeather;

  footerDate.textContent = `${currDay}, ${currDate} ${currMonth}`;
  headerLocarion.textContent = `${inputValue[0].toUpperCase()}${inputValue.slice(
    1,
  )}`;

  humidityBox.textContent = `${humidity}`;
  windRange.style.width = `${humidity}%`;
  windSpeed.textContent = Math.round(speed);
  windIcon.style.transform = `rotate(${deg - 45}deg)`;
  visability.textContent = `${(data.visibility / 1000).toFixed(1)}`;
  pressureBox.textContent = pressure;
  mainUnit.textContent = unit;
}

function renderForecast(data) {
  const { list } = data;
  list
    .filter((el) => {
      const newtime = el.dt_txt.split(' ')[1];
      if (newtime === '12:00:00') return el;
    })
    .map((el) => {
      const dateFull = `${new Date(el.dt_txt)}`.split(' ');
      const day = dateFull[0];
      const month = dateFull[1];
      const date = +dateFull[2];
      const { icon } = el.weather[0];
      const { temp_max: maxTemp, temp_min: minTemp } = el.main;

      let insertDate = `${day}, ${date} ${month}`;
      if (currDate === date) {
        insertDate = 'Today';
      }
      if (date === currDate + 1) {
        insertDate = 'Tomorrow';
      }
      html = `
            <li class="top-bar__forecast-card">
                <h5 class="top-bar__date">${insertDate}</h5>
                <img width=60 height=60 src="/img/weather-icons/${icon}.png" alt="" class="top-bar__img" />
                <div class="top-bar__temp">
                  <p class="top-bar__day">${Math.round(
                    maxTemp,
                  )}<span class="temp">${unit}</span></p>
                  <p class="top-bar__day--min">${Math.round(
                    minTemp,
                  )}<span class="temp">${unit}</span></p>
                </div>
              </li>
      `;

      forecastBox.insertAdjacentHTML('beforeend', html);
    });
}

modalSubmit.addEventListener('click', function (e) {
  e.preventDefault();
  if (!modalInput.value) return;
  inputValue = modalInput.value;
  updateUI(inputValue);
  modal.style.display = '0';
});

submitInput.addEventListener('click', function (e) {
  e.preventDefault();
  if (!searchInput.value) return;

  inputValue = searchInput.value;
  updateUI(inputValue);
});

tempTypeContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.top-bar__type-btn');
  if (!clicked) return;
  tempType.forEach((t) => {
    t.classList.remove('top-bar__type-btn--active');
  });
  clicked.classList.add('top-bar__type-btn--active');
  updateUI(inputValue);
});

function updateUI(data) {
  getUnits();
  forecastBox.textContent = '';
  getData(data, units);
  getForecast(data, units);
  searchInput.value = '';
  changeUnits(units);
}
