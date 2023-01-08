let apiKey = "3eb4b0dca3267978aa192a5a0660c7d2";
let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial";

function formatDate(timestamp){
  let now = new Date(timestamp);
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
  return `${month} ${date}, ${year} ${day} ${hours}:${minutes}pm EST`
}

formatDate(new Date())

function searchCity(city) {
  let apiKey = "3eb4b0dca3267978aa192a5a0660c7d2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayTemperature);
}
 function searchSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  searchCity(city);
}

function formatDay(timestamp) {
  console.log (response.data);
  let date = new Date (timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue","Wed","Thur","Fri","Sat"];

  return days[day];
}

 function searchLocation(position) {
  let apiKey = "3eb4b0dca3267978aa192a5a0660c7d2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeatherCondition);
}
function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(findLocation);
}
function findLocation(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
  
}

function displayTemperature(response) {
let cityElement = document.querySelector("#city"); 
let tempElement = document.querySelector("#temp");
let descriptionElement = document.querySelector("#description");
let humidityElement = document.querySelector("#humidity");
let windElement = document.querySelector("#wind");
let dateElement = document.querySelector("#dateTime");
let iconELement = document.querySelector("#icon");

tempElement.innerHTML = Math.round (response.data.main.temp);
cityElement.innerHTML = response.data.name;
descriptionElement.innerHTML = response.data.weather[0].description;
iconELement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
humidityElement.innerHTML = response.data.main.humidity;
windElement.innerHTML = Math.round(response.data.wind.speed);
dateElement.innerHTML = formatDate(response.data.dt * 1000);


getForecast(response.data.coord);


}

function displayWeatherCondition(response) {
  console.log(response.data);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );

}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
            <div class="col-2">
                <div class = "weather-forecast-day">${forecastDay.dt}</div>
               <div class = "weather-forecast-date">11/15</div>
                <img class = "forecast-icon" src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
                 alt="${forecastDay.icon}"
                width="60px"
                 />
                <div class = "weather-forecast-temp">
                    <span class ="weather-forecast-max">${forecastDay.temp.max}°</span> 
                    <span class="weather-forecast-min">${forecastDay.temp.min}°</span>
                    </div>
            </div>
`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}


function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "e947cb2640f1db92e6a19005bc43b435";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}


let locatebutton = document.querySelector("#location-button");
locatebutton.addEventListener("click", currentLocation)

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchSubmit);