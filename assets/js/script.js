var searchHistoryEL = document.querySelector('#searchHistory');
var searchCityInputEL = document.querySelector('#searchCity');
var submitEL = document.querySelector('#submit');

var submitWeatherSearch = function (event) {
    event.preventDefault();
  
    var searchCity = searchCityInputEL.value.trim();

    console.log(searchCity);
  
    if (searchCity) {
      //Call 5-day weather API

      //Add searchCity to searchHistory
      var searchHistory = readHistoryFromStorage();
      searchHistory.push(searchCity);
      saveHistoryToStorage(searchHistory);
  
      //Render results from API to screen

    } else {
      window.alert('Please search for a city!');
    }
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
