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

// 

let weatherIconUrl = "https://openweathermap.org/img/wn/";
let nowIcon = "./media/sun.png";
let chosenCity = "Stockton";

// Function for getCurrentWeather function for API call
async function getCurrentWeather(chosenCityLocal){
    let currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${chosenCityLocal}&units=imperial&appid=${apiKey}`;

    let apiResponse = await fetch(currentWeatherUrl).then(Response => Response.json());
    console.log(apiResponse);

    chosenCity = chosenCityLocal;

    // saving our data to our global array for later use
    currentWeather = apiResponse;

    // display to 1st card current temp
    let roundTemp = Math.round(apiResponse.main.temp);
    tempNow.innerText = roundTemp + "°";
    weatherWordsNow.innerText = apiResponse.weather[0].description;

    // display icon on 1st card
    nowIcon = apiResponse.weather[0].icon;
    weatherNowIcon.src = weatherIconUrl + nowIcon + "@2x.png";
}

// using our get weather Function
getCurrentWeather(chosenCity);

// to get the location from our search input lets use the input and button to get the location
searchBtn.addEventListener("click", function(){
    chosenCity = searchBar.value;
    getCurrentWeather(chosenCity);  // this should get the value of the input and place into the weather function
    cityName.innerText = chosenCity;
    console.log(searchBar.value);
})

console.log(chosenCity);
// !!!!!!!!!!!!!!!!!!!!!!!!!!  the above console log will not show mu updated chosenCity to what the searchinput is after clicking the search button
//  ASK BRYAN !!!!!!!!
// !!!!! also ask why chosenCity is not  changing to chozenCityLocal vairable within the async function