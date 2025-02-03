"use strict";

const api_key = "d57e7dd67678ae3df53bfb464eebf81a";
let cityInput = document.getElementById("city_input"),
  searchBtn = document.getElementById("searchBtn"),
  locationBtn = document.getElementById("locationBtn"),
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

function showSpinner() {
  document.getElementById("spinner").classList.add("show-spinner");
}

function hideSpinner() {
  document.getElementById("spinner").classList.remove("show-spinner");
}

showSpinner();

function getWeatherDetails(name, lat, lon, country, state) {
  showSpinner(); // Показываем спиннер перед запросами
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
      let { co, no, no2, o3, so2, pm2_5, pm10, nh3 } = data.list[0].components;

      // Очистка контейнера перед добавлением новых элементов
      aqiCard.innerHTML = "";

      // Создаем card-head
      const cardHead = document.createElement("div");
      cardHead.classList.add("card-head");

      const title = document.createElement("p");
      title.textContent = "Air Quality Index";

      const airIndex = document.createElement("p");
      airIndex.classList.add("air-index", `aqi-${data.list[0].main.aqi}`);
      airIndex.textContent = aqiList[data.list[0].main.aqi - 1];

      cardHead.appendChild(title);
      cardHead.appendChild(airIndex);

      // Создаем air-indices
      const airIndices = document.createElement("div");
      airIndices.classList.add("air-indices");

      const icon = document.createElement("i");
      icon.classList.add("fa-regular", "fa-wind", "fa-3x");
      airIndices.appendChild(icon);

      // Функция для создания элемента индекса
      const createItemIndexes = (label, value) => {
        const item = document.createElement("div");
        item.classList.add("item");

        const labelEl = document.createElement("p");
        labelEl.textContent = label;

        const valueEl = document.createElement("h2");
        valueEl.textContent = value;

        item.appendChild(labelEl);
        item.appendChild(valueEl);

        return item;
      };

      // Добавляем все индексы
      const indices = [
        { label: "PM2.5", value: pm2_5 },
        { label: "PM10", value: pm10 },
        { label: "SO2", value: so2 },
        { label: "CO", value: co },
        { label: "NO", value: no },
        { label: "NO2", value: no2 },
        { label: "NH3", value: nh3 },
        { label: "O3", value: o3 },
      ];

      indices.forEach(({ label, value }) => {
        airIndices.appendChild(createItemIndexes(label, value));
      });

      // Добавляем все элементы в основной контейнер
      aqiCard.appendChild(cardHead);
      aqiCard.appendChild(airIndices);
    })
    .catch(() => {
      alert(`Failed to fetch Air Quality Index`);
    });

  fetch(WEATHER_API_URL)
    .then((res) => res.json())
    .then((data) => {
      let date = new Date();
      let weatherImg = "img/WeatherioLogo.svg";
      let body = document.getElementById("body");
      switch (data.weather[0].icon) {
        case "01n":
        case "01d":
          weatherImg = "img/ClearSkySunny.svg";
          body.style.backgroundImage = "url('img/ClearSky2.jpg')";
          break;
        case "02n":
        case "02d":
          weatherImg = "img/FewClouds.svg";
          body.style.backgroundImage = "url('img/FewClouds.jpg')";
          break;
        case "03n":
        case "03d":
          weatherImg = "img/ScatteredClouds.svg";
          body.style.backgroundImage = "url('img/ScatteredClouds.jpg')";
          break;
        case "04n":
        case "04d":
          weatherImg = "img/BrokenClouds.svg";
          body.style.backgroundImage = "url('img/BrokenClouds.jpg')";
          break;
        case "09n":
        case "09d":
        case "10n":
        case "10d":
          weatherImg = "img/Rain.svg";
          body.style.backgroundImage = "url('img/Rain.jpg')";
          break;
        case "11n":
        case "11d":
          weatherImg = "img/Thunderstorm.svg";
          body.style.backgroundImage = "url('img/Thunderstorm.jpg')";
          break;
        case "13n":
        case "13d":
          weatherImg = "img/Snow.svg";
          body.style.backgroundImage = "url('img/Snow.jpg')";
          break;
        case "50n":
        case "50d":
          weatherImg = "img/Mist.svg";
          body.style.backgroundImage = "url('img/Mist.jpg')";
          break;
        default:
          weatherImg = "img/WeatherioLogo.svg";
          body.style.backgroundImage = "url('img/ClearSky2.jpg')";
      }

      // Очистка контейнера перед добавлением новых элементов
      currentWeatherCard.innerHTML = "";

      // Создаем основной контейнер
      const currentWeather = document.createElement("div");
      currentWeather.classList.add("current-weather");

      // Создаем блок с деталями
      const details = document.createElement("div");
      details.classList.add("details");

      const nowText = document.createElement("p");
      nowText.textContent = "Now";

      const temp = document.createElement("h2");
      temp.innerHTML = `${(data.main.temp - 273.15).toFixed(2)}&deg;C`;

      const description = document.createElement("p");
      description.textContent = data.weather[0].description;

      details.appendChild(nowText);
      details.appendChild(temp);
      details.appendChild(description);

      // Создаем блок с иконкой погоды
      const weatherIcon = document.createElement("div");
      weatherIcon.classList.add("weather-icon");

      const weatherImgEl = document.createElement("img");
      weatherImgEl.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      weatherImgEl.alt = "weather-icon";

      weatherIcon.appendChild(weatherImgEl);

      // Добавляем в контейнер
      currentWeather.appendChild(details);
      currentWeather.appendChild(weatherIcon);

      // Создаем разделитель
      const hr1 = document.createElement("hr");

      // Создаем футер карточки
      const cardFooter = document.createElement("div");
      cardFooter.classList.add("card-footer");

      const dateInfo = document.createElement("p");
      dateInfo.innerHTML = `<i class="fa-light fa-calendar"></i> ${
        days[date.getDay()]
      }, ${date.getDate()}, ${months[date.getMonth()]} ${date.getFullYear()}`;

      const locationInfo = document.createElement("p");
      locationInfo.innerHTML = `<i class="fa-light fa-location-dot"></i> ${name}, ${country}`;

      cardFooter.appendChild(dateInfo);
      cardFooter.appendChild(locationInfo);

      // Второй разделитель
      const hr2 = document.createElement("hr");

      // Создаем карточку "Feels like"
      const feelsLikeCard = document.createElement("div");
      feelsLikeCard.classList.add("feelsLike__card");

      // Создаем элемент "Feels like"
      const feelsLikeItem = document.createElement("div");
      feelsLikeItem.classList.add("feelsLike__card-item");

      const feelsLikeHead = document.createElement("div");
      feelsLikeHead.classList.add("feelsLike__card-head");
      feelsLikeHead.textContent = "Feels like";

      const tempIcon = document.createElement("i");
      tempIcon.classList.add("fa-light", "fa-temperature-list", "fa-2x");

      const feelsLikeTemp = document.createElement("h2");
      feelsLikeTemp.innerHTML = `${(data.main.feels_like - 273.15).toFixed(
        2
      )}&deg;C`;

      // Добавляем элементы в карточку "Feels like"
      feelsLikeItem.appendChild(feelsLikeHead);
      feelsLikeItem.appendChild(tempIcon);
      feelsLikeItem.appendChild(feelsLikeTemp);

      const weatherImgEl2 = document.createElement("img");
      weatherImgEl2.src = weatherImg;
      weatherImgEl2.alt = "weatherImg";
      weatherImgEl2.classList.add("weatherImg");

      // Собираем карточку "Feels like"
      feelsLikeCard.appendChild(feelsLikeItem);
      feelsLikeCard.appendChild(weatherImgEl2);

      // Добавляем все элементы в основной контейнер
      currentWeatherCard.appendChild(currentWeather);
      currentWeatherCard.appendChild(hr1);
      currentWeatherCard.appendChild(cardFooter);
      currentWeatherCard.appendChild(hr2);
      currentWeatherCard.appendChild(feelsLikeCard);

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

      // Очистка контейнера перед добавлением элементов
      sunriseCard.innerHTML = "";

      // Создаем заголовок карточки
      const cardHead = document.createElement("div");
      cardHead.classList.add("card-head");

      const cardTitle = document.createElement("p");
      cardTitle.textContent = "Sunrise & Sunset";

      cardHead.appendChild(cardTitle);

      // Создаем контейнер для sunrise и sunset
      const sunContainer = document.createElement("div");
      sunContainer.classList.add("sunrise-sunset");

      // Функция для создания элемента с данными о солнце
      const createSunItem = (iconClass, label, value) => {
        const item = document.createElement("div");
        item.classList.add("item");

        const iconContainer = document.createElement("div");
        iconContainer.classList.add("icon");

        const icon = document.createElement("i");
        icon.classList.add("fa-light", iconClass, "fa-4x");

        iconContainer.appendChild(icon);

        const textContainer = document.createElement("div");
        const title = document.createElement("p");
        title.textContent = label;

        const time = document.createElement("h2");
        time.textContent = value;

        textContainer.appendChild(title);
        textContainer.appendChild(time);

        item.appendChild(iconContainer);
        item.appendChild(textContainer);

        return item;
      };

      // Добавляем элементы sunrise и sunset
      sunContainer.appendChild(
        createSunItem("fa-sunrise", "Sunrise", sRiseTime)
      );
      sunContainer.appendChild(createSunItem("fa-sunset", "Sunset", sSetTime));

      // Добавляем все элементы в карточку
      sunriseCard.appendChild(cardHead);
      sunriseCard.appendChild(sunContainer);

      // Обновляем значения в других карточках
      humidityVal.textContent = `${humidity}%`;
      pressureVal.textContent = `${pressure}hPa`;
      visibilityVal.textContent = `${visibility / 1000}km`;
      windSpeedVal.textContent = `${speed}m/s`;
      feelsVal.innerHTML = `${(feels_like - 273.15).toFixed(2)}&deg;C`; // Здесь допустимо использовать innerHTML для вставки спецсимвола "°"
    })
    .catch(() => {
      alert(`Failed to fetch current weather`);
    });

  fetch(FORECAST_API_URL)
    .then((res) => res.json())
    .then((data) => {
      let hourlyForecast = data.list;

      // Очистка контейнера
      hourlyForecastCard.innerHTML = "";

      // Генерация почасового прогноза
      for (let i = 0; i <= 7; i++) {
        let hrForecastDate = new Date(hourlyForecast[i].dt_txt);
        let hr = hrForecastDate.getHours();
        let a = hr < 12 ? "AM" : "PM";
        hr = hr === 0 ? 12 : hr > 12 ? hr - 12 : hr;

        // Создаем карточку прогноза
        const card = document.createElement("div");
        card.classList.add("card");

        const timeEl = document.createElement("p");
        timeEl.textContent = `${hr} ${a}`;

        const imgEl = document.createElement("img");
        imgEl.src = `https://openweathermap.org/img/wn/${hourlyForecast[i].weather[0].icon}.png`;
        imgEl.alt = "hourly-forecast";

        const tempEl = document.createElement("p");
        tempEl.innerHTML = `${(hourlyForecast[i].main.temp - 273.15).toFixed(
          2
        )}&deg;C`;

        card.appendChild(timeEl);
        card.appendChild(imgEl);
        card.appendChild(tempEl);

        hourlyForecastCard.appendChild(card);
      }

      // Фильтрация уникальных дней для 5-дневного прогноза
      let uniqueForecastDays = [];
      let fiveDaysForecast = data.list.filter((forecast) => {
        let forecastDate = new Date(forecast.dt_txt).getDate();
        if (!uniqueForecastDays.includes(forecastDate)) {
          uniqueForecastDays.push(forecastDate);
          return true;
        }
        return false;
      });

      // Очистка контейнера
      fiveDaysForecastCard.innerHTML = "";

      // Генерация прогноза на 5 дней
      for (let i = 1; i < fiveDaysForecast.length; i++) {
        let date = new Date(fiveDaysForecast[i].dt_txt);

        // Создаем элемент прогноза
        const forecastItem = document.createElement("div");
        forecastItem.classList.add("forecast-item");

        // Обертка для иконки и температуры
        const iconWrapper = document.createElement("div");
        iconWrapper.classList.add("icon-wrapper");

        const imgEl = document.createElement("img");
        imgEl.src = `https://openweathermap.org/img/wn/${fiveDaysForecast[i].weather[0].icon}.png`;
        imgEl.alt = "forecast_img";

        const tempSpan = document.createElement("span");
        tempSpan.innerHTML = `${(
          fiveDaysForecast[i].main.temp - 273.15
        ).toFixed(2)}&deg;C`;

        iconWrapper.appendChild(imgEl);
        iconWrapper.appendChild(tempSpan);

        const dateEl = document.createElement("p");
        dateEl.textContent = `${date.getDate()} ${months[date.getMonth()]}`;

        const dayEl = document.createElement("p");
        dayEl.textContent = days[date.getDay()];

        forecastItem.appendChild(iconWrapper);
        forecastItem.appendChild(dateEl);
        forecastItem.appendChild(dayEl);

        fiveDaysForecastCard.appendChild(forecastItem);
      }
    })
    .catch(() => {
      alert(`Failed to fetch weather forecast`);
    })
    .finally(() => {
      hideSpinner(); // Скрываем спиннер после загрузки данных
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
      let REVERSE_GEOCODING_URL = `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${api_key}`;

      fetch(REVERSE_GEOCODING_URL)
        .then((res) => res.json())
        .then((data) => {
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
          cityInput.value = "";
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
////////////////////////////////////////////
///////////////////////////////////////////
////////////////////////////////////////
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
