function currentTime(timestamp) {
  let date = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let hours = date.getHours();
  if (hours < 10) {
    hours = "0" + hours;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  console.log(forecast);
  let forecastElement = document.querySelector("#weatherForcast");

  let forecastHTML = "";

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="col">
       <div class="forecast-day">${formatDay(forecastDay.time)}</div>
       
       <img src="${forecastDay.condition.icon_url}" width="50" height="50"/>
        <div class="forecast-temperature">
        ${Math.round(forecastDay.temperature.maximum)}° 
        <span class="forecast-temperature-lowest">
        ${Math.round(forecastDay.temperature.minimum)}°
        </span>
        </div>
     </div>`;
    }
    forecastElement.innerHTML = forecastHTML;
  });
}

function getForecast(city) {
  let apiKey = "bfb7te16e3bfb40a3db6aod25134ef7e";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemp(response) {
  let tempElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#cityName");
  let descriptionElement = document.querySelector("#weatherDescription");
  let iconElement = document.querySelector("#weatherIcon");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dataElement = document.querySelector("#currentTime");
  tempElement.innerHTML = Math.round(response.data.temperature.current);
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  iconElement.src = response.data.condition.icon_url;
  humidityElement.innerHTML = response.data.temperature.humidity + "%";
  windElement.innerHTML = response.data.wind.speed + " km/h";
  dataElement.innerHTML = currentTime(response.data.time * 1000);
  celsiusTemp = response.data.temperature.current;

  getForecast(response.data.city);
}

function search(city) {
  let apiKey = "bfb7te16e3bfb40a3db6aod25134ef7e";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemp);
}

function handleSumit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#cityInput");
  search(cityInputElement.value);
}

let celsiusTemp = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSumit);

search("Lund");
