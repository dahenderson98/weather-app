document.getElementById("weatherSubmit").addEventListener("click", function(event) {
  event.preventDefault();
  const value = document.getElementById("weatherInput").value;
  if (value === "")
    return;
  console.log(value);

  //Get current weather data
  const url = "http://api.openweathermap.org/data/2.5/weather?q=" + value + ",US&units=imperial" + "&APPID=9477254a050cba1453f1cfaa8e785253";
  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      console.log(json);
      document.getElementById("top-label").innerHTML="Current Weather in " + json.name;
      let results = "";
      results += '<div class="card" id=\"current-weather-card\"><div class="card-body">';

      //Create first current weather column element
      results += "<div id=\"current-weather-column\">";
      for (let i=0; i < json.weather.length; i++) {
	       results += '<img src="http://openweathermap.org/img/w/' + json.weather[i].icon + '.png"/>';
      }
      let currentTemp = json.main.temp;
      results += '<h2>' + currentTemp.toFixed(0) + " &deg;F</h2>"
      results += "<p>"
      for (let i=0; i < json.weather.length; i++) {
         results += json.weather[i].description
         if (i !== json.weather.length - 1) results += ", "
      }
      //Close first current weather column element
      results += "</p></div>";

      //Create second current weather column element
      results += "<div id=\"current-weather-column\" style=\"padding-top: 15px;\">";
      results += "<h4 style=\"float: center;\">Humidity: " + json.main.humidity + "%</h4><br>";
      let feelsLike = json.main.feels_like;
      results += "<h4 style=\"float: center;\">Feels Like: " + feelsLike.toFixed(0) + " &deg;F</h4>";
      //Close second current weather column element
      results += "</div>";

      //Create third current weather column element
      results += "<div id=\"current-weather-column\" style=\"padding-top: 15px;\">";
      results += "<h4 style=\"float: center;\">Wind</h4>";
      results += "<p style=\"float: center; margin-top: 5px;\">Direction: " + json.wind.deg + " &deg;</p>";
      let speed = json.wind.speed;
      results += "<p style=\"float: center;\">Speed: " + speed.toFixed(0) + " MPH</p>";
      //Close third current weather column element
      results += "</div>";

      // close card and cardbody
      results += "</div></div>";
      document.getElementById("weatherResults").innerHTML = results;
    })
    .catch(error => alert(error.message));

  //Get forecast data
  const url2 = "http://api.openweathermap.org/data/2.5/forecast?q=" + value + ", US&units=imperial" + "&APPID=9477254a050cba1453f1cfaa8e785253";
  fetch(url2)
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      console.log(json);
      let forecastHeader = "";
      forecastHeader += "<h3>5-Day Forecast for ";
      forecastHeader += json.city.name;
      forecastHeader += "</h3>";
      document.getElementById("forecast-section-header").innerHTML = forecastHeader;
      let forecast = "";
      for (let i=0; i < json.list.length; i++) {
         // style=\"width: 18rem\";
      	forecast += "<div class=\"card\" id=\"forecast-item\"><div class=\"card-body\"><h2>" + moment(json.list[i].dt_txt).format('MMMM Do, YYYY h:mm A') + "</h2>";
      	// forecast += "<p>Temperature: " + json.list[i].main.temp + " &deg;F</p>"
        let maxTemp = json.list[i].main.temp_max;
        forecast += "<p>High: \t" + maxTemp.toFixed(0) + " &deg;F</p>";
        let minTemp = json.list[i].main.temp_min;
        forecast += "<p>Low: \t" + minTemp.toFixed(0) + " &deg;F</p>";
      	forecast += '<img src="http://openweathermap.org/img/w/' + json.list[i].weather[0].icon + '.png"/>'
        forecast += json.list[i].weather[0].description + '<br>';
        let popInt = parseInt(parseFloat(json.list[i].pop) * 100);
        forecast += "Chance of Precipitation: " + popInt.toString() + "%";
        forecast += "</p></div></div>"
      }
      document.getElementById("forecastResults").innerHTML = forecast;
    })
    .catch(error => alert(error.message));
});
