"use strict";

////заменить все innerHTML!!!!!!!!!!!!!!

let cityInput = document.getElementById("city_input"),
  searchBtn = document.getElementById("searchBtn"),
  locationBtn = document.getElementById("locationBtn"),
  api_key = "d57e7dd67678ae3df53bfb464eebf81a",
  currentWeatherCard = document.querySelectorAll(".weather-left .card")[0],
  fiveDaysForecastCard = document.querySelector(".day-forecast"),
  aqiCard = document.querySelectorAll(".highlights .card")[0],
  sunriseCard = document.querySelectorAll(".highlights .card")[1],
  humidityVal = document.getElementById("humidityVal"),
  pressureVal = document.getElementById("pressureVal"),
  visibilityVal = document.getElementById("visibilityVal"),
  windSpeedVal = document.getElementById("windSpeedVal"),
  feelsVal = document.getElementById("feelsVal"),
  hourlyForecastCard = document.querySelector(".hourly-forecast"),
  aqiList = ["Good", "Fair", "Moderate", "Poor", "Very Poor"];

function getWeatherDetails(name, lat, lon, country, state) {
  let FORECAST_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${api_key}`,
    WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`,
    AIR_POLLUTION_API_URL = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${api_key}`,
    days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

  fetch(AIR_POLLUTION_API_URL)
    .then((res) => res.json())
    .then((data) => {
      /*       console.log(data); */
      let { co, no, no2, o3, so2, pm2_5, pm10, nh3 } = data.list[0].components;
      ////заменить все innerHTML!!!!!!!!!!!!!!
      aqiCard.innerHTML = `
        <div class="card-head">
          <p>Air Quality Index</p>
          <p class="air-index aqi-${data.list[0].main.aqi}">${
        aqiList[data.list[0].main.aqi - 1]
      }</p>
        </div>
        <div class="air-indices">
          <i class="fa-regular fa-wind fa-3x"></i>
          <div class="item">
            <p>PM2.5</p>
            <h2>${pm2_5}</h2>
          </div>

          <div class="item">
            <p>PM10</p>
            <h2>${pm10}</h2>
          </div>

          <div class="item">
            <p>SO2</p>
            <h2>${so2}</h2>
          </div>

          <div class="item">
            <p>CO</p>
            <h2>${co}</h2>
          </div>

          <div class="item">
            <p>NO</p>
            <h2>${no}</h2>
          </div>

          <div class="item">
            <p>NO2</p>
            <h2>${no2}</h2>
          </div>

          <div class="item">
            <p>NH3</p>
            <h2>${nh3}</h2>
          </div>

          <div class="item">
            <p>O3</p>
            <h2>${o3}</h2>
          </div>
        </div>
      `;
    })
    .catch(() => {
      alert(`Failed to fetch Air Quality Index`);
    });

  fetch(WEATHER_API_URL)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      let date = new Date();
      let weatherImg = "img/WeatherioLogo.svg";
      let body = document.getElementById("body");
      switch (data.weather[0].icon) {
        case "01n":
        case "01d":
          weatherImg = "img/ClearSkySunny/ClearSkySunny.svg";
          body.style.backgroundImage = "url('img/ClearSkySunny/clearSky2.jpg')";
          break;
        case "02n":
        case "02d":
          weatherImg = "img/FewClouds/FewClouds.svg";
          body.style.backgroundImage = "url('img/FewClouds/FewClouds.jpg')";
          break;
        case "03n":
        case "03d":
          weatherImg = "img/ScatteredClouds/ScatteredClouds.svg";
          body.style.backgroundImage =
            "url('img/ScatteredClouds/ScatteredClouds.jpg')";
          break;
        case "04n":
        case "04d":
          weatherImg = "img/BrokenClouds/BrokenClouds.svg";
          body.style.backgroundImage =
            "url('img/BrokenClouds/BrokenClouds.jpg')";
          break;
        case "09n":
        case "09d":
        case "10n":
        case "10d":
          weatherImg = "img/Rain/Rain.svg";
          body.style.backgroundImage = "url('img/Rain/Rain.jpg')";
          break;
        case "11n":
        case "11d":
          weatherImg = "img/Thunderstorm/Thunderstorm.svg";
          body.style.backgroundImage =
            "url('img/Thunderstorm/Thunderstorm.jpg')";
          break;
        case "13n":
        case "13d":
          weatherImg = "img/Snow/Snow.svg";
          body.style.backgroundImage = "url('img/Snow/Snow.jpg')";
          break;
        case "50n":
        case "50d":
          weatherImg = "img/Mist/Mist.svg";
          body.style.backgroundImage = "url('img/Mist/Mist.jpg')";
          break;
        default:
          weatherImg = "img/WeatherioLogo.svg";
          body.style.backgroundImage = "url('img/ClearSkySunny/clearSky2.jpg')";
      }

      ////заменить все innerHTML!!!!!!!!!!!!!!
      currentWeatherCard.innerHTML = `
        <div class="current-weather">
            <div class="details">
                <p>Now</p>
                <h2>${(data.main.temp - 273.15).toFixed(2)}&deg;C</h2>
                <p>${data.weather[0].description}</p>
            </div>
            <div class="weather-icon">
                <img
                    src="https://openweathermap.org/img/wn/${
                      data.weather[0].icon
                    }@2x.png"
                    alt="weather-icon"
                />                
            </div>
        </div>

        <hr />
        <div class="card-footer">
            <p><i class="fa-light fa-calendar"></i>${
              days[date.getDay()]
            }, ${date.getDate()}, ${
        months[date.getMonth()]
      } ${date.getFullYear()}</p>
            <p><i class="fa-light fa-location-dot"></i> ${name}, ${country}</p>
        <hr />
            <div class="feelsLike__card">              
                <div class="feelsLike__card-item">
                  <div class="feelsLike__card-head">                            
                    Feels like
                  </div>
                  <i class="fa-light fa-temperature-list fa-2x"></i>
                  <h2>${(data.main.feels_like - 273.15).toFixed(2)}&deg;C</h2>
                </div>
                <img src=${weatherImg} alt="weatherImg" class="weatherImg" />              
            </div>            

        </div>
        `;

      let { sunrise, sunset } = data.sys,
        { timezone, visibility } = data,
        { humidity, pressure, feels_like } = data.main,
        { speed } = data.wind,
        sRiseTime = moment
          .utc(sunrise, "X")
          .add(timezone, "seconds")
          .format("hh:mm A"),
        sSetTime = moment
          .utc(sunset, "X")
          .add(timezone, "seconds")
          .format("hh:mm A");

      sunriseCard.innerHTML = `
        <div class="card-head">
          <p>Sunrise & Sunset</p>
        </div>
        <div class="sunrise-sunset">
          <div class="item">
            <div class="icon">
              <i class="fa-light fa-sunrise fa-4x"></i>
            </div>
            <div>
              <p>Sunrise</p>
              <h2>${sRiseTime}</h2>
            </div>
          </div>

          <div class="item">
            <div class="icon">
              <i class="fa-light fa-sunset fa-4x"></i>
            </div>
            <div>
              <p>Sunset</p>
              <h2>${sSetTime}</h2>
            </div>
          </div>
        </div>
      `;
      ////заменить все innerHTML!!!!!!!!!!!!!!
      humidityVal.innerHTML = `${humidity}%`;
      pressureVal.innerHTML = `${pressure}hPa`;
      visibilityVal.innerHTML = `${visibility / 1000}km`;
      windSpeedVal.innerHTML = `${speed}m/s`;
      feelsVal.innerHTML = `${(feels_like - 273.15).toFixed(2)}&deg;C`;
    })
    .catch(() => {
      alert(`Failed to fetch current weather`);
    });

  fetch(FORECAST_API_URL)
    .then((res) => res.json())
    .then((data) => {
      let hourlyForecast = data.list;

      ////заменить все innerHTML!!!!!!!!!!!!!!
      hourlyForecastCard.innerHTML = ``;
      for (let i = 0; i <= 7; i++) {
        let hrForecastDate = new Date(hourlyForecast[i].dt_txt);
        let hr = hrForecastDate.getHours();
        let a = "PM";
        if (hr < 12) a = "AM";
        if (hr === 0) hr = 12;
        if (hr > 12) hr = hr - 12;
        ////заменить все innerHTML!!!!!!!!!!!!!!
        hourlyForecastCard.innerHTML += `
          <div class="card">
            <p>${hr} ${a}</p>
            <img
              src="https://openweathermap.org/img/wn/${
                hourlyForecast[i].weather[0].icon
              }.png"
              alt="hourly-forecast"
            />
            <p>${(hourlyForecast[i].main.temp - 273.15).toFixed(2)}&deg;C</p>
          </div>
        `;
      }

      let uniqueForecastDays = [];
      let fiveDaysForecast = data.list.filter((forecast) => {
        let forecastDate = new Date(forecast.dt_txt).getDate();
        if (!uniqueForecastDays.includes(forecastDate)) {
          return uniqueForecastDays.push(forecastDate);
        }
      });
      ////заменить все innerHTML!!!!!!!!!!!!!!
      fiveDaysForecastCard.innerHTML = "";
      for (let i = 1; i < fiveDaysForecast.length; i++) {
        let date = new Date(fiveDaysForecast[i].dt_txt);
        fiveDaysForecastCard.innerHTML += `
            <div class="forecast-item">
                <div class="icon-wrapper">
                    <img src="https://openweathermap.org/img/wn/${
                      fiveDaysForecast[i].weather[0].icon
                    }.png" alt="forecast_img"/>
                    <span>${(fiveDaysForecast[i].main.temp - 273.15).toFixed(
                      2
                    )}&deg;C</span>
                </div>
                <p>${date.getDate()} ${months[date.getMonth()]}</p>
                <p>${days[date.getDay()]}</p>
            </div>
        `;
      }
    })
    .catch(() => {
      alert(`Failed to fetch weather forecast`);
    });
}

function getCityCoordinates() {
  let cityName = cityInput.value.trim();
  cityInput.value = "";
  if (!cityInput) return;
  let GEOCODING_API_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${api_key}`;
  fetch(GEOCODING_API_URL)
    .then((res) => res.json())
    .then((data) => {
      let { name, lat, lon, country, state } = data[0];
      getWeatherDetails(name, lat, lon, country, state);
    })
    .catch(() => {
      alert(`Failed to fetch coordinates of ${cityName}`);
    });
}

function getUserCoordinates() {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      let { latitude, longitude } = position.coords;
      /*     console.log(latitude, longitude); */
      let REVERSE_GEOCODING_URL = `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${api_key}`;

      fetch(REVERSE_GEOCODING_URL)
        .then((res) => res.json())
        .then((data) => {
          /*         console.log(data); */
          let { name, country, state } = data[0];
          getWeatherDetails(name, latitude, longitude, country, state);
        })
        .catch(() => {
          alert(`Failed to fetch User coordinates`);
        });
    },
    (error) => {
      if (error.code === error.PERMISSION_DENIED) {
        alert(
          "Geolocation permission denied. Please reset location permission to grant access again!"
        );
      }
    }
  );
}

/////////////////////////////////////////подсказки

let autocompleteList = document.getElementById("autocomplete-list");

cityInput.addEventListener("input", () => {
  let query = cityInput.value.trim();
  if (query.length < 1) {
    autocompleteList.innerHTML = ""; // Удаляем подсказки, если меньше 1 символов
    return;
  }

  let GEO_API_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${api_key}`;

  fetch(GEO_API_URL)
    .then((res) => res.json())
    .then((data) => {
      autocompleteList.innerHTML = ""; // Очистить список перед добавлением новых данных
      data.forEach((location) => {
        let listItem = document.createElement("li");
        listItem.textContent = `${location.name}, ${location.country}`;
        listItem.addEventListener("click", () => {
          cityInput.value = location.name;
          autocompleteList.innerHTML = ""; // Очистить список после выбора
          getWeatherDetails(
            location.name,
            location.lat,
            location.lon,
            location.country,
            location.state
          );
        });
        autocompleteList.appendChild(listItem);
      });
    })
    .catch((err) => {
      console.error("Error fetching autocomplete data:", err);
    });
});

document.addEventListener("click", (e) => {
  if (!e.target.closest(".autocomplete")) {
    autocompleteList.innerHTML = ""; // Закрыть подсказки, если клик не в зоне автозаполнения
  }
});

function closeAutocompleteList() {
  autocompleteList.innerHTML = "";
}

//////////////////////////////////////

//////////////////////////////////////modal

const cityModal = document.getElementById("cityModal");
const closeModal = document.getElementById("closeModal");
const modalSearchBtn = document.getElementById("modalSearchBtn");
const modalCityInput = document.getElementById("modalCityInput");

/////////////////////////////////////
function openModal() {
  // открытие модального окна
  cityModal.classList.add("show");
  modalCityInput.value = "";
  modalCityInput.focus(); // Устанавливаем фокус в поле ввода
  setTimeout(() => {
    cityModal.style.display = "block";
  }, 10);
}

function closeModalFunction() {
  // Закрываем модальное окно
  cityModal.classList.remove("show");
  modalCityInput.value = ""; // Очищаем поле ввода
  modalAutocompleteList.innerHTML = ""; // Удаляем список подсказок
  setTimeout(() => {
    cityModal.style.display = "none";
  }, 300);
}
/////////////////////////////////////

// Закрытие модального окна по клику на X
closeModal.addEventListener("click", () => {
  closeModalFunction();
});

// Закрытие модального окна при клике вне его области
window.addEventListener("click", (event) => {
  if (event.target === cityModal) {
    closeModalFunction();
  }
});

/////////////////////////
/////////////////////////

/////////////////////////////////////////

let modalAutocompleteList = document.getElementById("modalAutocomplete-list");

modalCityInput.addEventListener("input", () => {
  let query = modalCityInput.value.trim();
  if (query.length < 1) {
    modalAutocompleteList.innerHTML = ""; // Удаляем подсказки, если меньше 1 символов
    return;
  }

  let GEO_API_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${api_key}`;

  fetch(GEO_API_URL)
    .then((res) => res.json())
    .then((data) => {
      modalAutocompleteList.innerHTML = ""; // Очистить список перед добавлением новых данных
      data.forEach((location) => {
        let listItem = document.createElement("li");
        listItem.textContent = `${location.name}, ${location.country}`;
        listItem.addEventListener("click", () => {
          closeModalFunction();
          getWeatherDetails(
            location.name,
            location.lat,
            location.lon,
            location.country,
            location.state
          );
        });
        modalAutocompleteList.appendChild(listItem);
      });
    })
    .catch((err) => {
      console.error("Error fetching autocomplete data:", err);
    });
});

document.addEventListener("click", (e) => {
  if (!e.target.closest(".autocomplete")) {
    modalAutocompleteList.innerHTML = ""; // Закрыть подсказки, если клик не в зоне автозаполнения
  }
});

function closeModalAutocompleteList() {
  modalAutocompleteList.innerHTML = "";
}

//////////////////////////////////////
/////////////////////////
/////////////////////////
function getCityCoordinateModal() {
  let cityName = modalCityInput.value.trim();
  modalCityInput.value = "";
  if (!modalCityInput) return;
  closeModalFunction();
  let GEOCODING_API_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${api_key}`;
  fetch(GEOCODING_API_URL)
    .then((res) => res.json())
    .then((data) => {
      let { name, lat, lon, country, state } = data[0];
      getWeatherDetails(name, lat, lon, country, state);
    })
    .catch(() => {
      alert(`Failed to fetch coordinates of ${cityName}`);
    });
}

// Действие при нажатии на кнопку поиска в модальном окне///////////////////////////////////////////
modalSearchBtn.addEventListener("click", () => {
  getCityCoordinateModal();
});

/////////////////////////////////////

/////////////////////////////////////

searchBtn.addEventListener("click", () => {
  if (window.innerWidth > 660) {
    getCityCoordinates();
    closeAutocompleteList();
  }

  if (window.innerWidth <= 660) {
    openModal();
  }
});

// Функция для управления текстом на кнопке
function toggleButtonText() {
  if (window.innerWidth < 500) {
    searchBtn.innerHTML = '<i class="fa-regular fa-search"></i>'; // Только иконка
  } else {
    searchBtn.innerHTML = '<i class="fa-regular fa-search"></i> Search'; // Иконка и текст
  }
}

// Добавляем обработчик события изменения размера окна
window.addEventListener("resize", toggleButtonText);

// Вызываем функцию при загрузке страницы
toggleButtonText();

locationBtn.addEventListener("click", () => {
  getUserCoordinates();
  closeAutocompleteList();
});

cityInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    getCityCoordinates();
    closeAutocompleteList();
  }
});

modalCityInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    getCityCoordinateModal();
    closeModalAutocompleteList();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModalFunction();
  }
});

window.addEventListener("load", getUserCoordinates);
////////////////////////////////////////////$RECYCLE.BIN//////////////S-1-5-18/////////////////////////
/////////////////////////////////////////////////$RECYCLE.BIN/////////////////////////S-1-5-18/////////////
/////////////////////////////////////////$RECYCLE.BIN////////////////////////////S-1-5-18//////////////
function updateLayout() {
  let leftBlock = document.querySelector(".weather-left");
  let rightBlock = document.querySelector(".weather-right");
  let screenWidth = window.innerWidth;
  let screenHeight = window.innerHeight;

  if (screenWidth >= 850 && screenWidth < 1100) {
    rightBlock.style.overflowY = "auto";
    rightBlock.style.maxHeight = `${screenHeight}px`;

    let leftHeight = leftBlock.offsetHeight;
    if (leftHeight < screenHeight) {
      leftBlock.style.position = "sticky";
      leftBlock.style.top = "0";
    } else {
      leftBlock.style.position = "relative";
    }
  } else {
    rightBlock.style.overflowY = "visible";
    leftBlock.style.position = "relative";
  }
}

// Запускаем при загрузке и изменении размеров окна
window.addEventListener("load", updateLayout);
window.addEventListener("resize", updateLayout);
