
//Tar ut latitude och longitude från position

  window.onload = function getLocation() {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition);
      } else {
          posCurrPos.innerHTML = "Geolocation is not supported by this browser.";
      }
  }
  function showPosition(position) {
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;
      var lon = longitude.toFixed(5);
      var lat = latitude.toFixed(5);

      //async function
        async function fetchData(url){
          let promise = await fetch(url);
          let data = await promise.json();
          return data;
        }

      //Gets city name from Google Maps API
        getCity();
        async function getCity(){
          let googleResponse = await fetchData('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&key=AIzaSyAnTTqeN7ukZ1LxavCUaQxSceJdcdCQTAU');
          console.log(googleResponse);
          let text = googleResponse.results[6].formatted_address;
          let posCurrPos = document.getElementById("posCurrPos");
          posCurrPos.innerHTML = text;
        }

      //Weather for current day
        getTodaysWeather();
        async function getTodaysWeather(){
          let todaysWeatherResponse = await fetchData('http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=4193f83670e8762d9b30d187da002bb6&units=metric');
          //Weather description
          let text = todaysWeatherResponse.weather[0].description;
          weatherDescription.innerHTML = text;
          //Weather icon
          let icon = todaysWeatherResponse.weather[0].icon;
          document.getElementById("todaysWeatherIcon").src = getIcon(icon);

          //Todays temperature
          let todaysTemp = todaysWeatherResponse.main.temp;
          todaysTemperature.innerHTML = todaysTemp.toFixed(0) + " °C";
        }

        //Weather for the dayily view
        getDailyView();
        async function getDailyView(){
          let dailyViewsResponse = await fetchData('http://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=4193f83670e8762d9b30d187da002bb6&units=metric');
          /*  for(var i=0; i<dailyViewsResponse.length; i++){
              let theArrayForThis = dailyViewsResponse.list[i].dt_txt;
              console.log(theArrayForThis);
            } */
            for (var i = 0; i < 8; i++) {
              let thisThing = dailyViewsResponse.list[i].dt_txt;
              let newThing = thisThing.includes(12);

            }

            for (var i = 0; i < 40; i++) {

                if((dailyViewsResponse.list[i].dt_txt).includes("12") == true){

                  let iconInput = dailyViewsResponse.list[i].weather[0].icon;
                  console.log(iconInput);
                  document.getElementById("image"+(x)).src = getIcon(iconInput);
                  x++;
                }


                //Minimum temperature
                let min = "min" + (i+1);
                let tempMinDay = dailyViewsResponse.list[i].main.temp_min;
                console.log(tempMinDay);
                //document.getElementById(min).innerHTML= "Min: " + tempDay.toFixed(1) + " °C";

                //Maximum temperature
                let max = "max" + (i+1);
                let tempMaxDay = dailyViewsResponse.list[i].main.temp_max;
                console.log(tempMaxDay);
                //document.getElementById(max).innerHTML = "Max: " + tempMaxDay.toFixed(1) + " °C";
            }
        }


        //Get weather icon
        function getIcon(data){
            if((data == "01d") || (data == "01n")){ //clear skies
              return "images/weatherIcons/sunny.svg";
            }
            else if((data == "02d" )|| (data == "02n")){ //part cloudy
              return "images/weatherIcons/sunnyWithClouds.svg";
            }
            else if((data == "03d" )|| (data == "03n")){ //cloudy
              return "images/weatherIcons/brokenClouds.svg";
            }
            else if((data == "04d" )|| (data == "04n")){ //broken clouds
              return "images/weatherIcons/brokenClouds.svg";
            }
            else if((data == "09d" )|| (data == "09n")){ //hard rain ???
              return "images/weatherIcons/hardRain.svg";
            }
            else if((data == "10d" )|| (data == "10n")){ //rain
              return "images/weatherIcons/rain.svg";
            }
            else if((data == "11d") || (data == "11n")){ //thunder
              return "images/weatherIcons/thunder.svg";
            }
            else if((data == "13d") || (data == "13n")){ //snow
              return "images/weatherIcons/snow.svg";
            }
            else if((data == "50d") || (data == "50n")){ //mist or fog
              return "images/weatherIcons/mist.svg";
            }
        }

        //To get time and date
        let today = new Date();
        let day = today.getDay();
        let date = today.getDate();
        let month = today.getMonth() + 1;
        let year = today.getFullYear();
        let hours = today.getHours();
        let minutes = today.getMinutes();

        //Time
        currentTimeAndDate.innerHTML = 'Time:' + hours + ':' + minutes + '  Date:' + date + '/' + month + '/' + year;

        //Daily View day and date
        for (var i = 0; i < 5; i++) {
          let thisday = day + i;
          let innerText = "day" + (1 + i);
          let dateToday = "date" + (1 + i);
          let newDate = date + i;
          //document.getElementById(innerText).innerHTML = daysArray[thisday];
          document.getElementById(dateToday).innerHTML = newDate + '/' + month + '/' + year;
        }

  }
