let apiKey = "3eb4b0dca3267978aa192a5a0660c7d2";
let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric";
let now = new Date();
let date = now.getDate();
let year = now.getFullYear();
let hours = now.getHours();
let minutes = now.getMinutes();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];
let months = [
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
  "Dec"
];
let month = months[now.getMonth()];

let currentDate = document.querySelector("#dateTime");
currentDate.innerHTML = `${month} ${date}, ${year} ${day} ${hours}:${minutes}pm EST`;

function searchCity(city) {
  let apiKey = "3eb4b0dca3267978aa192a5a0660c7d2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}
 function searchSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  searchCity(city);
}

 function searchLocation(position) {
  let apiKey = "3eb4b0dca3267978aa192a5a0660c7d2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}
function displayTemperature(response){
let cityElement = document.querySelector("#city"); 
let tempElement = document.querySelector("#temp");
let weatherElement = document.querySelector("#description");
let humidityElement = querySelector("#humidity");
let windElement = querySelector("#wind");
let dateElement = querySelector("#date");

 celsiusTemp = response.data.temperature.current;
 temperatureElement.innerHTML = Math.round(celsiusTemp);

 tempElement.innerHTML = Math.round (response.data.main.temp);
 cityElement.innerHTML = response.data.name;
weatherElement.innerHTML = response.data.condition.description;
humidityElement.innerHTML = response.data.main.humidity;
windElement.innerHTML = Math.round(response.data.wind.speed);
dateElement.innerHTML = formatDate(response.data.dt*1000);

}
function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchSubmit);
