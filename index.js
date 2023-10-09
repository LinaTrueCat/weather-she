let todaytime = document.querySelector("#today");
let currentTime = new Date();
let day = currentTime.getDay();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

let hours = currentTime.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minuts = currentTime.getMinutes();
todaytime.innerHTML = `${days[day]} ${hours}:${minuts}`;

// weather
function displayTemp(response) {
  let tempC = Math.round(response.data.main.temp);
  let currentTempC = document.querySelector("#temp-c");
  currentTempC.innerHTML = `${tempC}°C`;

  let tempF = Math.round((tempC * 9) / 5 + 32);
  let currentTempF = document.querySelector("#temp-f");
  currentTempF.innerHTML = `${tempF}°F`;

  let city = response.data.name;
  let currentCity = document.querySelector("#cityInput");
  currentCity.innerHTML = `${city}`;
}
function displayWeather(response2) {
  let humidity = response2.data.main.humidity;
  let currentHumidity = document.querySelector("#humidity");
  currentHumidity.innerHTML = `Humidity: ${humidity}%`;

  let windSpeed = Math.round(response2.data.wind.speed);
  let wind = document.querySelector("#wind");
  wind.innerHTML = `Wind speed: ${windSpeed}km/h`;

  let cloud = response2.data.weather[0].main;
  let skyDescription = document.querySelector("#current-description");
  skyDescription.innerHTML = `${cloud}`;
  console.log(response2.data);
}

function showCityName(event) {
  event.preventDefault();
  let citySearch = document.querySelector("#city-search");
  let h2 = document.querySelector("h2");

  h2.innerHTML = citySearch.value;
  let apiKey = "ff1d9ea9376b5c27a82e04fc2b2abdbb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch.value}&appid=${apiKey}&units=metric`;

  
  axios.get(apiUrl).then(displayTemp);
  axios.get(apiUrl).then(displayWeather);
  axios.get(apiUrl).then(displayTemp);
}

let form = document.querySelector("form");
form.addEventListener("submit", showCityName);

function currentPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "ff1d9ea9376b5c27a82e04fc2b2abdbb";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayTemp);
  axios.get(apiUrl).then(displayWeather);
}

function searchPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentPosition);
}

let currentCity = document.querySelector("#current-location");
currentCity.addEventListener("click", searchPosition);
