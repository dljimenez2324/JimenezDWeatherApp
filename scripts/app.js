// declare and initialize all elements with IDs
// First and Second Card Areas
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

// 5 Day Forecast Area
let oneDaysDay = document.getElementById("oneDaysDay");
let twoDaysDay = document.getElementById("oneDaysDay");
let threeDaysDay = document.getElementById("oneDaysDay");
let fourDaysDay = document.getElementById("oneDaysDay");
let fiveDaysDay = document.getElementById("oneDaysDay");
let oneDaysDate = document.getElementById("oneDaysDate");
let twoDaysDate = document.getElementById("oneDaysDate");
let threeDaysDate = document.getElementById("oneDaysDate");
let fourDaysDate = document.getElementById("oneDaysDate");
let fiveDaysDate = document.getElementById("oneDaysDate");
let oneDayAfterIcon = document.getElementById("oneDayAfterIcon");
let twoDayAfterIcon = document.getElementById("oneDayAfterIcon");
let threeDayAfterIcon = document.getElementById("oneDayAfterIcon");
let fourDayAfterIcon = document.getElementById("oneDayAfterIcon");
let fiveDayAfterIcon = document.getElementById("oneDayAfterIcon");
let oneDaysForecaTemp = document.getElementById("oneDaysForecaTemp");
let twoDaysForecaTemp = document.getElementById("twoDaysForecaTemp");
let threeDaysForecaTemp = document.getElementById("threeDaysForecaTemp");
let fourDaysForecaTemp = document.getElementById("fourDaysForecaTemp");
let fiveDaysForecaTemp = document.getElementById("fiveDaysForecaTemp");

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
async function getFiveDayForecast(chosenCityLocal){

    // for each day maybe I can do a for loop to get the data for each day of the 16 day API but only 5 days
    let forecastUrl = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${chosenCityLocal}&units=imperial&cnt=5&appid=${apiKey}`;

    let apiResponse = await fetch(forecastUrl).then(Response => Response.json());
    console.log(apiResponse);

    let forecastWeather = apiResponse;
    oneDaysForecaTemp.innerText = Math.round(apiResponse.list[0].temp.day) + "°"; // shows average temp for 1 day after today
    twoDaysForecaTemp.innerText = Math.round(apiResponse.list[1].temp.day) + "°"; // shows average temp for 1 day after today
    threeDaysForecaTemp.innerText = Math.round(apiResponse.list[2].temp.day) + "°"; // shows average temp for 1 day after today
    fourDaysForecaTemp.innerText = Math.round(apiResponse.list[3].temp.day) + "°"; // shows average temp for 1 day after today
    fiveDaysForecaTemp.innerText = Math.round(apiResponse.list[4].temp.day) + "°"; // shows average temp for 1 day after today
};

//  STOPPED HERE !!!!!!!!!!!!!!!!!!!!!!  NEXT step is to make icons change then figure out dates OR do the faves list

// Search Function
// to get the location from our search input lets use the search input and search button to get the location
searchBtn.addEventListener("click", function(){
    
    // get input from searchBar & save to local a variable
    let newCity = searchBar.value.trim(); // trims off the spaces from beginning or end of string to reduce user mistakes
    
    // checks for if value exists then runs getCurrentWeather function for the searched city
    if (newCity){ 
        getCurrentWeather(newCity);  
        getFiveDayForecast(newCity); 
    }

    console.log("Search button finished");
})

// checking to see if apiResponse is saved to currentWeather variable outside of the async function  !!! and its not !!!
//console.log(currentWeather);


// code from Jerie  THIS OS FOR DAYS
// let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday","Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
// let d = new Date();
// let day = days[d.getDay()];

// Notice toDay is the id tag from html to signify todays day  the others are for the subsequent forecast days
// toDay.innerText = day;
// day1.innerText = days[d.getDay()+1];
// day2.innerText = days[d.getDay()+2];
// day3.innerText = days[d.getDay()+3];
// day4.innerText = days[d.getDay()+4];
// day5.innerText = days[d.getDay()+5];