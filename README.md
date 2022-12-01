# weather-dashboard-app

## Purpose

The purpose of this weather dashboard app is to display to the user current weather as well as a 5-day outlook for any given city searched.  The application will be built utilizing server-side API's; specifically the "5 Day Weather Forecast" API provided by api.openweathermap.org to get live data from weather posts around the United States and render the information to the user viewing the Weather Dashboard App.

## Link to Deployed Application

https://pkrysinski.github.io/weather-dashboard-app/

![Alt text](https://github.com/Pkrysinski/weather-dashboard-app/blob/main/assets/images/github-screenshot.PNG)

## Acceptence Criteria Notes

GIVEN a weather dashboard with form inputs...

- - - - -
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
>Search history now stores in local storage.
>History now retrieves from local storage, return results to a list.  These is click-able with list elements, so that the content can be passed to the submitWeatherSearch() function to re-search for that city name and essentially refresh the page.

- - - - -
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
>Dynamically creating content in the currentWeather div with the city name, today's date, with a weather icon next to that.  Then below appending children of temperature, wind, and humidity.

- - - - -
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
>Am able to dynamically create HTML elements for the future weather (5 days) to get these results.  The API returns weather in 3-hour increments, so in order to show day-by-day, you have to make sure you loop through every 8 results to get the 24-hour day as a whole.

- - - - -
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
>I've finally been able to turn the history results into clickable list items that re-search based on the item clicked.

- - - - -
TODO...
NEEDS-
>Add some styling via CSS and make the page look a little nicer!
>Make search history return values unique, and all upper-case.
>Add comments to CSS file.
WANTS-
>Would like to have auto-fill set up for the search textbox with a few hundred cities.
>Would like to make textbox take zip codes.
>Try to get rid of "TypeError".
>Go back and make it properly responsive.  I know there was no acceptance criteria requirement asking for the page to be responsive, but at this point I want every challenge to encapsulate the fundamentals of challenges past, and responsive design is no exception.
