const apiKey = "a0c04b8fb1e7f2d9daee0f7b4f1aeecf";
const cityInput = document.getElementById("city-input");
const fetchWeatherBtn = document.getElementById("fetch-weather");
const weatherResults = document.getElementById("weather-results");
const cityNameEl = document.getElementById("city-name");
const weatherDescEl = document.getElementById("weather-desc");
const tempEl = document.getElementById("temp");
const humidityEl = document.getElementById("humidity");
const windSpeedEl = document.getElementById("wind-speed");
const cityNotFoundEl = document.getElementById("city-not-found"); 

fetchWeatherBtn.addEventListener("click", () => {
  const cityName = cityInput.value.trim();
  
  if (!cityName) {
    alert("Please enter a city name.");
    return;
  }

  weatherResults.classList.add("hidden");
  cityNotFoundEl.classList.add("hidden");

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then((data) => {
      displayWeather(data); 
    })
    .catch((error) => {
      displayError(error.message); 
    });
});

function displayWeather(data) {
  cityNameEl.textContent = data.name;
  weatherDescEl.textContent = data.weather[0].description;
  tempEl.textContent = data.main.temp;
  humidityEl.textContent = data.main.humidity;
  windSpeedEl.textContent = data.wind.speed;

  weatherResults.classList.remove("hidden");
  cityNotFoundEl.classList.add("hidden");
}

function displayError(message) {
  cityNotFoundEl.textContent = message; 
  cityNotFoundEl.classList.remove("hidden"); 
  weatherResults.classList.add("hidden"); 
}
