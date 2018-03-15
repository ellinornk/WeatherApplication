//Getting location

var location = document.getElementById("todaysWeather");

function getLocationOfClient(){
  if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition()
  }
  else{
    location.innerHTML ="Your browser doesn't support geolocation.";
  }
}

async function fetchData(url) {
    let promise = await fetch(url);
    let data = await promise.json();
    return JSON.stringify(data);
}
//get data from SMHI with latitude and longitude from getLocationOfClient
async function showWeatherOnLocation(position){
  url ='https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/' +
  position.coords.latitude +'/lat/' + position.coords.latitude + '/data.json';
}



function GetDate(){
  var day = getDate
}
