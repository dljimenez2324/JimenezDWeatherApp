// declare and initialize all elements with IDs
let searchBar = document.getElementById("searchBar");
let searchBtn = document.getElementById("searchBtn");
let cityName = document.getElementById("cityName");
let dateToday = document.getElementById("dateToday");
let favHeart = document.getElementById("favHeart");
let tempNow = document.getElementById("tempNow");
let weatherWordsNow = document.getElementById("weatherWordsNow");
let weatherNowIcon = document.getElementById("weatherNowIcon");
let tempNowMax = document.getElementById("tempNowMax");
let tempNowMin = document.getElementById("tempNowMin");
let feelsLikeNow = document.getElementById("feelsLikeNow");
let humidityNow = document.getElementById("humidityNow");


// establishing global variables
let currentWeather = [];
let defaultCity = "Stockton";
// My API Key
const apiKey = "b5081063510cb1d1936ae3ec13a7744b";
let currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${defaultCity}&units=imperial&appid=${apiKey}`;


// Function for getCurrentWeather function for API call
async function getCurrentWeather(chosenCity){
    let apiResponse = await fetch(currentWeatherUrl).then(Response => Response.json());
    console.log(apiResponse);

    // saving our data to our global array for later use
    currentWeather = apiResponse;

    // display to 1st card current temp
    let roundDown = Math.round(apiResponse.main.temp);
    tempNow.innerText = roundDown + "°";
    weatherWordsNow.innerText = apiResponse.weather[0].description;
}

// using our get weather Function
getCurrentWeather(defaultCity);

