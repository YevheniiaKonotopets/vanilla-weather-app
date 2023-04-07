let apiKey = "bfb7te16e3bfb40a3db6aod25134ef7e";
let city = "Lund";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

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
    minutes = "0" + hours;
  }
  return `${day} ${hours}:${minutes}`;
}

function displayTemp(response) {
  console.log(response.data);
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
}

axios.get(apiUrl).then(displayTemp);
