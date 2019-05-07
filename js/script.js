$(document).ready(function() {
  // hides elements and then calls findLocation
  $("button").hide();
  $("#weather").hide();
  findLocation();
  
  // degree "button" click event handler - converts from fahrenheit to celsius and vice versa
  $("button").click(function() {
    var $temp = $("#num");
    var $degree = $("#degree");
    var temp = $temp.text();
    if ($degree.text() === "°C") {
      temp = Math.round(temp * 9 / 5 + 32);
      $temp.text(temp);
      $degree.text("°F");
    } else {
      temp = Math.round((temp - 32) * 5 / 9);
      $temp.html(temp);
      $degree.text("°C");
    }
  });

  // gets users latitude and longitude
  function findLocation() {
    navigator.geolocation.getCurrentPosition(function(position) {
      var lat = position.coords.latitude;
      var lon = position.coords.longitude;
      sendRequest(lat, lon);
    });
  }

  // sendes AJAX request to API
  function sendRequest(lat, lon) {
    var url =
      "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat=" +
      lat +
      "&lon=" +
      lon +
      "&units=imperial&appid=269bc8338cc539f3167d02b7a2ebb873";
    $.getJSON(url, function(data) {
      var city = data.name;
      var temperature = data.main.temp;
      var status = data.weather[0].main;
      var icon = data.weather[0].icon;
      $("img").attr("src", "http://openweathermap.org/img/w/" + icon + ".png");
      updatePage(city, temperature, status);
    });
  }

  // updates the page - shows the user's data
  function updatePage(city, temperature, status) {
    $("#weather").show();
    $("#city").text(city);
    $("#num").text(Math.round(temperature));
    $("#stat").text(status);
    $("button").show();
  }
});
