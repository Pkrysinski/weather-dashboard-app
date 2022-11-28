var searchHistoryEL = document.querySelector('#searchHistory');
var searchCityInputEL = document.querySelector('#searchCity');
var submitEL = document.querySelector('#submit');

var apiKey = "e486a7d8b0b54203d41c260f6ded5efd";
var apiSearchURL = "https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={apiKey}";

var submitWeatherSearch = function (event) {
    event.preventDefault();
  
    var searchCity = searchCityInputEL.value.trim();
  
    if (searchCity) {
      //Call 5-day weather API
      // First need to pass in the city name and get the lat/long from a first API
      fetchCoordinates(searchCity);

      //Add searchCity to searchHistory
      var searchHistory = readHistoryFromStorage();
      searchHistory.push(searchCity);
      saveHistoryToStorage(searchHistory);
  
      //Render results from API to screen

    } else {
      window.alert('Please search for a city!');
    }
  };

function fetchCoordinates(cityName){
    fetch("http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=1&appid=" + apiKey)
    .then(function(resp) { return resp.json() }) // Convert data to json
    .then(function(data) {
    fetchCurrentWeatherData(data[0].lat, data[0].lon);
    fetch5dayWeatherData(data[0].lat, data[0].lon);
    })
    .catch(function() {
      // catch any errors
    });
};

function fetchCurrentWeatherData(lat,lon){
    fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey)
    .then(function(resp) { return resp.json() }) // Convert data to json
    .then(function(data) {
      console.log("fetchCurrentWeatherData");
      console.log(data);
    })
    .catch(function() {
      // catch any errors
    });
};

//Need function to get 5-day weather data too
function fetch5dayWeatherData(lat,lon){
    fetch("https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey)
    .then(function(resp) { return resp.json() }) // Convert data to json
    .then(function(data) {
        console.log("fetch5dayWeatherData");
        console.log(data);
    })
    .catch(function() {
        // catch any errors
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
    return searchHistory;
};
  
// Takes an search result and saves to local storage.
function saveHistoryToStorage(searchHistory) {
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
};



submitEL.addEventListener('click', submitWeatherSearch);

