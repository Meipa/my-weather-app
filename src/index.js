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

function searchCity(city) {
  let searchInput = document.querySelector("#searchbox-input");
  let currentCity = document.querySelector("#currentCity");
  let apiKey = "17550fd68ce06aee922346dcd610ca0a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  currentCity.innerHTML = `${searchInput.value}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

let form = document.querySelector("#submit-city");
form.addEventListener("submit", searchCity);

function convertToFahrenheit(event) {
  event.preventDefault();
  let celsius = 10;
  let fahrenheit = Math.round((celsius * 9) / 5 + 32);
  let temperature = document.querySelector("span.temp-number");
  temperature.innerHTML = `${fahrenheit}`;
}

function convertToCelsius(event) {
  event.preventDefault();
  let celsius = 10;
  let temperature = document.querySelector("span.temp-number");
  temperature.innerHTML = `${celsius}`;
}

let toFahrenheit = document.querySelector("#fahrenheit");
toFahrenheit.addEventListener("click", convertToFahrenheit);

let toCelsius = document.querySelector("#celsius");
toCelsius.addEventListener("click", convertToCelsius);

function displayWeatherCondition(response) {
  document.querySelector("#currentCity").innerHTML = response.data.name;
  document.querySelector(".temp-number").innerHTML = Math.round(
    response.data.main.temp
  );
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

searchCity("Tahiti");
