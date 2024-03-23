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
let forcastedWeather = [];
let chosenCity = "";

// My API Key
const apiKey = "b5081063510cb1d1936ae3ec13a7744b";

// Weather Icon link
const weatherIconUrl = "https://openweathermap.org/img/wn/";
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
    //console.log("The searched city is " + chosenCity);

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
    feelsLikeNow.innerText = Math.round(apiResponse.main.feels_like) + "°";  
    humidityNow.innerText = Math.round(apiResponse.main.humidity);  
    // !! Max & Min temp below are not accurate according to openweathermap documentation !!
    //tempNowMax.innerText = Math.round(apiResponse.main.temp_max) + "°";  // approximated by using the temp_max but is not the true max min for the day... requires use of paid version of one call or 16 day forecast
    //tempNowMin.innerText = Math.round(apiResponse.main.temp_min) + "°";  // approximated by using the temp_min but again, not the true min for the day... requires use of paid version of one call or 16 day forecast

    console.log("getCurrentWeather function finished");
};

// This below will use the function once with the City as Stockton
//getCurrentWeather("Stockton");

// !!!!Function for 5 Day forecast BUT USING 16 DAY FORECAST PAID VERSION (STUDENT VERSION FREE IF APPLIED FOR IT)!!!!!
async function getFiveDayForecast(chosenCityLocal){

    // for each day Maybe I can do a for loop to get the data for each day of the 16 day API but only 6 days. OR I can be more direct which would require less thought but significantly more lines of code
    // we will use cnt = 6 for 6 days of data and we will exclude .list[0] because its for the current day at 1200 (noon)
    let forecastUrl = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${chosenCityLocal}&units=imperial&cnt=6&appid=${apiKey}`;

    let apiResponse = await fetch(forecastUrl).then(Response => Response.json());
    console.log(apiResponse);

    // Temperature for the subsequent days after today requires starting at 1 for the count.  I can refactor this code if I have time
    // let forecastWeather = apiResponse;
    oneDaysForecaTemp.innerText = Math.round(apiResponse.list[1].temp.day) + "°"; // shows average temp for 1 day after today
    twoDaysForecaTemp.innerText = Math.round(apiResponse.list[2].temp.day) + "°"; // shows average temp for 2 day after today
    threeDaysForecaTemp.innerText = Math.round(apiResponse.list[3].temp.day) + "°"; // shows average temp for 3 day after today
    fourDaysForecaTemp.innerText = Math.round(apiResponse.list[4].temp.day) + "°"; // shows average temp for 4 day after today
    fiveDaysForecaTemp.innerText = Math.round(apiResponse.list[5].temp.day) + "°"; // shows average temp for 5 day after today

    // Icons for each day after today
    oneDayAfterIcon.src = "https://openweathermap.org/img/wn/" + apiResponse.list[1].weather[0].icon + "@2x.png"; // show the icon for 1 day after today
    twoDayAfterIcon.src = "https://openweathermap.org/img/wn/" + apiResponse.list[2].weather[0].icon + "@2x.png"; // show the icon for 1 day after today
    threeDayAfterIcon.src = "https://openweathermap.org/img/wn/" + apiResponse.list[3].weather[0].icon + "@2x.png"; // show the icon for 1 day after today

    let indexOne = 1
    let testVar = apiResponse.List[indexOne].weather[0].icon;  // code is broken here and cannot display the icon at line 109 to 114
    console.log(testVar);
    // To have the more accurate data for Max and Min for the current day, we will use .list[0] to get the true max and min for the current day.
    tempNowMax.innerText = Math.round(apiResponse.list[0].temp.max) + "°";
    tempNowMin.innerText = Math.round(apiResponse.list[0].temp.min) + "°";

    console.log("getFiveDayForecast function finished");
};



//  NON ASYNC FUNCTIONS LIVING BELOW THIS LINE

// Search Function
// to get the location from our search input lets use the search input and search button to get the location
searchBtn.addEventListener("click", function(){
    
    // get input from searchBar & save to local a variable
    let newCity = searchBar.value.trim(); // trims off the spaces from beginning or end of string to reduce user mistakes
    
    // checks for if value exists then runs getCurrentWeather and getFiveDayForecast functions for the searched city
    if (newCity){ 
        getCurrentWeather(newCity);  
        getFiveDayForecast(newCity); 
    }

    console.log("Search button finished");
});

// With the help of Chat GPT I created a date converter from UTC so that I can use "dot notation" to extract the day numerically and the month in it's name form
// This is a constant object named DateConverter with a method named getFormattedDate which will be used to pass in dt (the unixTimestamp parameter) from our OpenWeatherMap 16 day forecast API.  What it will return is an object with key:value pairs with the useful names year, month, day & etc  so that we can easily call the data we want
// Please see the example below for how it would be used
// ALSO understand to make sure we pass in the correct UTC value we need to account for the timezone. 
// we can do this by saying that our temporaryUnixTimestamp variable that will be passed in which will be predefined as seen below:
//     the currentWeather function  we must use "let temporaryUnixTimestamp = apiResponse.dt - apiResponse.timezone"
//     the fiveDayForecast function we must use "let temporaryUnixTimestamp = apiResponse.list[i].dt - apiResponse.city.timezone"
const DateConverter = {
    getFormattedDate: function(unixTimestamp) {
        // Convert Unix timestamp to milliseconds (required by Date object)
        let timestampInMillis = unixTimestamp * 1000;

        // Create a new Date object with the Unix timestamp
        let date = new Date(timestampInMillis);

        // Extract individual date components
        let year = date.getFullYear();
        let month = date.toLocaleString('default', { month: 'long' }); // Get month name in the language of the users location settings
        let day = ("0" + date.getDate()).slice(-2);
        let hours = ("0" + date.getHours()).slice(-2);
        let minutes = ("0" + date.getMinutes()).slice(-2);
        let seconds = ("0" + date.getSeconds()).slice(-2);

        // Create a human-readable date object of key:value pairs
        let humanReadableDate = {
            year: year,
            month: month,
            day: day,
            hours: hours,
            minutes: minutes,
            seconds: seconds
        };

        return humanReadableDate;

        // // Example usage:
        // let unixTimestamp = 1406080800;  // this is our dt from the api
        // let formattedDate = DateConverter.getFormattedDate(unixTimestamp);
        // console.log(formattedDate.month); // Accessing month name property individually
    }
};









// CODE AND NOTES FROM OTHERS!!!
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




// LESSONS WITH ALICA AND JOE  to show how the api works 
// // this is assuming that the index list[0]  means starting at midnight for tomorrow THIS IS FOR THE 5 WEATHER FORCAST  NOT THE 16 DAY
// tomorrowTemp.innerText = Math.round(apiResponse.list[4].main.temp); // this index is for the weatherapi at 12 noon 1 day after today
// twoDaysAfterToday.innerText = Math.round(apiResponse.list[12].main.temp);  // this index is for the weatherapi at 12 noon 2 days after today
// threeDaysAfterToday.innerText     = apiResponse.list[20].main.temp;
// fourDaysAfterToday.innerText      = apiResponse.list[28].main.temp;
// fiveDaysAfterToday.innerText      = apiResponse.list[36].main.temp;


// // look at the weather icon
// tomorrowDaysIcon.src = "https://openweathermap.org/img/wn/" + apiResponse.list[4].weather.icon + "@2x.png";
// apiResponse.list[28]
// apiResponse.list[36]