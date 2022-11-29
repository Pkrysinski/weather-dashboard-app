var searchHistoryEL = document.querySelector('#searchHistory');
var searchCityInputEL = document.querySelector('#searchCity');
var submitEL = document.querySelector('#submit');
var currentWeatherEl = document.querySelector('#currentWeather');
var futureWeatherEL = document.querySelector('#futureWeather');
var listEL = document.createElement("ol");

var apiKey = "e486a7d8b0b54203d41c260f6ded5efd";
var apiSearchURL = "https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={apiKey}";
var searchCity;

function displayDay() {
    var today = dayjs().format('MMMM D YYYY');
    return today;
};

var submitWeatherSearch = function (event) {
    event.preventDefault();
  
    searchCity = searchCityInputEL.value.trim();
  
    if (searchCity) {
      // First need to pass in the city name and get the lat/long from a first API
      fetchCoordinates(searchCity);

      //Add searchCity to searchHistory
      var searchHistory = readHistoryFromStorage();
      searchHistory.push(searchCity);
      saveHistoryToStorage(searchHistory);

    } else {
      window.alert('Please search for a city!');
    }
  };

function fetchCoordinates(cityName){
    fetch("http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=1&appid=" + apiKey)
    .then(function(resp) { return resp.json() }) // Convert data to json
    .then(function(data) {
    fetchCurrentWeatherData(data[0].lat, data[0].lon);
    fetchFutureWeatherData(data[0].lat, data[0].lon);
    })
    .catch(function(err) {
      // catch any errors
      console.log(err);
  });
};

function fetchCurrentWeatherData(lat,lon){
    fetch("https://api.openweathermap.org/data/2.5/weather?units=imperial&lat=" + lat + "&lon=" + lon + "&appid=" + apiKey)
    .then(function(resp) { return resp.json() }) // Convert data to json
    .then(function(data) {
      
      // QUESTION - Need to clear out any old results before building new ones
      // BELOW DOESN'T WORK...
      // currentWeatherEl.removeChild();
      // NEITHER DOES BELOW...
      // todaysWeatherEL.remove();
      // currentTempEL.remove();
      // currentWindEL.remove();
      // currentHumidityEL.remove();

      // Build cityName and today's date, with an icon of the current weather (call it "Today's Weather Headline")
      var todaysWeatherEL = document.createElement('h4');
      var imgIconEL = document.createElement('img');

      imgIconEL.src = "./assets/icons/" + data.weather[0].icon + ".png";
      imgIconEL.classList.add("weatherImg");
      todaysWeatherEL.textContent = searchCity + " (" + displayDay() + ") ";      
      todaysWeatherEL.appendChild(imgIconEL);
      currentWeatherEl.append(todaysWeatherEL);

      var currentTempEL = document.createElement('h4');
      var currentWindEL = document.createElement('h4');
      var currentHumidityEL = document.createElement('h4');

      currentTempEL.textContent = "Temp: " + data.main.temp + " °F";
      currentWindEL.textContent = "Wind: " + data.wind.speed + " mph";
      currentHumidityEL.textContent = "Humidity: " + data.main.humidity + " %";

      currentWeatherEl.appendChild(currentTempEL);
      currentTempEL.appendChild(currentWindEL);
      currentWindEL.appendChild(currentHumidityEL);
    })
    .catch(function(err) {
      // catch any errors
      console.log(err);
  });
};

//Need function to get 5-day weather data too
function fetchFutureWeatherData(lat,lon){
    fetch("https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&units=imperial&cnt=120")
    .then(function(resp) { return resp.json() }) // Convert data to json
    .then(function(data) {

      // Since data is returned every 3 hours, in order to loop through 24 to get the next day's weather, we need to increment i by 8.  I also want to start at index 4 (which is 12:00pm), because the user probably wants to see what the weather's like closer to the middle of the day, not midnight...
      // TODO - Add styling to turn these into horizontal cards
      for (let i = 4; i < 120; i += 8){

        var dailyWeatherDivEL = document.createElement('div');
        dailyWeatherDivEL.classList.add("card");

        var dailyWeatherEL = document.createElement('h4');
        var imgIconEL = document.createElement('img');

        imgIconEL.src = "./assets/icons/" + data.list[i].weather[0].icon + ".png";
        imgIconEL.classList.add("weatherImg");
        dailyWeatherEL.textContent = data.list[i].dt_txt;
        dailyWeatherEL.append(imgIconEL);

        var dailyTempEL = document.createElement('h4');
        var dailyWindEL = document.createElement('h4');
        var dailyHumidityEL = document.createElement('h4');
        dailyTempEL.textContent = "Temp: " + data.list[i].main.temp + " °F";
        dailyWindEL.textContent = "Wind: " + data.list[i].wind.speed + " mph";
        dailyHumidityEL.textContent = "Humidity: " + data.list[i].main.humidity + " %";


        futureWeatherEL.append(dailyWeatherDivEL);
        dailyWeatherDivEL.append(dailyWeatherEL,dailyTempEL,dailyWindEL,dailyHumidityEL);

    };
      
    })
    .catch(function(err) {
        // catch any errors
        console.log(err);
    });
};

// Reads history from local storage and returns array of search history objects.
// Returns an empty array ([]) if there aren't any search results.
function readHistoryFromStorage() {
    var searchHistory = localStorage.getItem('searchHistory');
    if (searchHistory) {
        searchHistory = JSON.parse(searchHistory);
    } else {
        searchHistory = [];
    }

    // Need to display searchHistory to screen so users can click and search based on that city
    // Only want to return last 10 results.  Otherwise this list is gonna get hella long.
    if (searchHistory.length < 10) {
      varLength = searchHistory.length;
    } else {
      varLength = 10;
    };

    for (var i = 0; i < varLength; i++){

      var liHistoryResult = document.createElement("li");
      liHistoryResult.textContent = searchHistory[i];
    
      searchHistoryEL.appendChild(liHistoryResult);

      // console.log(searchHistory[i]);
  }    

    return searchHistory;
};


  
// Takes an search result and saves to local storage.
function saveHistoryToStorage(searchHistory) {
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
};

// This function is being called below and will run when the page loads.
function init() {
  searchCity = "Salt Lake City";
  fetchCoordinates(searchCity);
  readHistoryFromStorage();
};

submitEL.addEventListener('click', submitWeatherSearch);

init();
