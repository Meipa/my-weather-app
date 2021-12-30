let now = new Date();
let p = document.querySelector("#now");
let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let year = now.getFullYear();
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
let weekdays = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];
let month = months[now.getMonth()];
let currentWeekday = weekdays[now.getDay()];
p.innerHTML = `${currentWeekday}, ${date} ${month} ${year}, ${hours}:${minutes}h`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}
function searchCity(city) {
  let searchInput = document.querySelector("#searchbox-input");
  let currentCity = document.querySelector("#currentCity");
  let apiKey = "17550fd68ce06aee922346dcd610ca0a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  currentCity.innerHTML = `${searchInput.value}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let fahrenheit = Math.round((celsiusTemperature * 9) / 5 + 32);
  let temperature = document.querySelector("span.temp-number");
  temperature.innerHTML = `${fahrenheit}`;
}

let toFahrenheit = document.querySelector("#fahrenheit");
toFahrenheit.addEventListener("click", convertToFahrenheit);

function convertToCelsius(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(celsiusTemperature);
}

let toCelsius = document.querySelector("#celsius");
toCelsius.addEventListener("click", convertToCelsius);

function getForecast(coordinates) {
  let apiKey = "17550fd68ce06aee922346dcd610ca0a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayWeatherCondition(response) {
  document.querySelector("#currentCity").innerHTML = response.data.name;
  document.querySelector(".temp-number").innerHTML = Math.round(
    response.data.main.temp
  );
  let description = document.querySelector("#weatherDescription");
  description.innerHTML = response.data.weather[0].description;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = response.data.wind.speed;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  celsiusTemperature = response.data.main.temp;

  getForecast(response.data.coord);
}

function searchLocation(position) {
  let apiKey = "17550fd68ce06aee922346dcd610ca0a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
function inputCity(event) {
  event.preventDefault();
  let city = document.querySelector("#searchbox-input").value;
  searchCity(city);
}
let submit = document.querySelector("#submit-city");
submit.addEventListener("submit", inputCity);

let currentLocationButton = document.querySelector("#geoLocation");
currentLocationButton.addEventListener("click", getCurrentLocation);

let celsiusTemperature = null;

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
         <ul>
            <li><h4><span class="weather-forecast-date">${formatDay(
              forecastDay.dt
            )}</span></h4></li>
            <li><strong><span class="weather-forecast-temp-min">${Math.round(
              forecastDay.temp.min
            )}°C</span></strong> / <span class="weather-forecast-temp-max">${Math.round(
          forecastDay.temp.max
        )}°C</span></li>
              <br />
            <li><img src="http://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png"
          alt="" /></li>
        </ul>
            </div>
          </div>
          `;
    }
  });
  forecastHTML.Element = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

searchCity("Tahiti");
