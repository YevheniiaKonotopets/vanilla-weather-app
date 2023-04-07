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

function showFarenhaitTemp(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temperature");
  let farenhaitTemp = (celsiusTemp * 9) / 5 + 32;
  tempElement.innerHTML = Math.round(farenhaitTemp);
  celsiusLink.classList.remove("active");
  farenhaitLink.classList.add("active");
}

function showCelsiusTemp(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temperature");
  tempElement.innerHTML = Math.round(celsiusTemp);
  celsiusLink.classList.add("active");
  farenhaitLink.classList.remove("active");
}

let celsiusTemp = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSumit);

let farenhaitLink = document.querySelector("#farenhaitLink");
farenhaitLink.addEventListener("click", showFarenhaitTemp);

let celsiusLink = document.querySelector("#celsiusLink");
celsiusLink.addEventListener("click", showCelsiusTemp);

search("San Francisco");
