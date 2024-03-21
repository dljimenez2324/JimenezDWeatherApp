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
let chosenCity = "";

// My API Key
const apiKey = "b5081063510cb1d1936ae3ec13a7744b";

// Weather Icon link
let weatherIconUrl = "https://openweathermap.org/img/wn/";
let nowIcon = "./media/sun.png";

// Function for getCurrentWeather function for API call
async function getCurrentWeather(chosenCityLocal){
    let currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${chosenCityLocal}&units=imperial&appid=${apiKey}`;

    let apiResponse = await fetch(currentWeatherUrl).then(Response => Response.json());
    console.log(apiResponse);

    
    // saving our data to our global array for later use?
    currentWeather = apiResponse;
    console.log(currentWeather);

    chosenCity = currentWeather.name;
    console.log("The searched city is " + chosenCity);

    // display to 1st card current temp
    let roundTemp = Math.round(apiResponse.main.temp);
    tempNow.innerText = roundTemp + "°";
    weatherWordsNow.innerText = apiResponse.weather[0].description;
    cityName.innerText = apiResponse.name + ", " + apiResponse.sys.country;
    
    // display icon on 1st card
    nowIcon = apiResponse.weather[0].icon;
    weatherNowIcon.src = weatherIconUrl + nowIcon + "@2x.png";


    // display to 2nd card area for max, min, feels, and humidity
    // Change 2nd card's inner texts
    tempNowMax.innerText = Math.round(apiResponse.main.temp_max) + "°";  // approximated by using the temp_max but is not the true max min for the day... requires paid version of api  
    tempNowMin.innerText = Math.round(apiResponse.main.temp_min) + "°";  // approximated by using the temp_min but again, not the true min for the day
    feelsLikeNow.innerText = Math.round(apiResponse.main.feels_like) + "°";  
    humidityNow.innerText = Math.round(apiResponse.main.humidity);  
    
}


// Function for 5 Day forecast


// to get the location from our search input lets use the search input and search button to get the location
searchBtn.addEventListener("click", function(){
    
    // get input from searchBar & save to local a variable
    let newCity = searchBar.value.trim(); // trims off the spaces from beginning or end of string to reduce user mistakes
    
    // checks for if value exists then runs getCurrentWeather function for the searched city
    if (newCity){ 
        getCurrentWeather(newCity);   
    }

    console.log("Search button finished");
})

// checking to see if apiResponse is saved to currentWeather variable outside of the async function  !!! and its not !!!
//console.log(currentWeather);
