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
// let defaultCity = "Stockton";


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

    
    // saving our data to our global array for later use
    currentWeather = apiResponse;
    
    //chosenCity = currentWeather.name;

    // display to 1st card current temp
    let roundTemp = Math.round(apiResponse.main.temp);
    tempNow.innerText = roundTemp + "°";
    weatherWordsNow.innerText = apiResponse.weather[0].description;
    cityName.innerText = apiResponse.name;
    // display icon on 1st card
    nowIcon = apiResponse.weather[0].icon;
    weatherNowIcon.src = weatherIconUrl + nowIcon + "@2x.png";

    // Change 2nd card's inner texts
    //tempNowMax.innerText =  ;   // CANNOT BE COMPLETED WITH THIS THE CURRENT WEATHER DATA  API !!!  

    console.log("get weather finished");
}

// show data saved to my temp data
console.log(currentWeather);

// using our get weather Function
//getCurrentWeather(chosenCity);

// to get the location from our search input lets use the input and button to get the location
searchBtn.addEventListener("click", function(){
    
    // different way than at bottom of function
    let newCity = searchBar.value.trim(); // trims off the spaces from begeinning or end of string to reduce user mistakes
    if (newCity){  // ensures value exists
        getCurrentWeather(newCity);
        
    }
    

    // City name change
    // chosenCity = currentWeather.name;
    // cityName.innerText = chosenCity;

    
    // console.log("search button finished");

    // chosenCity = searchBar.value;
    // getCurrentWeather(chosenCity);  // this should get the value of the input and place into the weather function
    // cityName.innerText = chosenCity; // should change html element with id to searchBar input value
    // //cityName.innerText = currentWeather.name;

    // console.log("Input for city is " + searchBar.value);
    
    
    // alert("button works");  // data for city shows but clears as soon as the alert is dismissed why????
})


console.log(chosenCity);
// !!!!!!!!!!!!!!!!!!!!!!!!!!  the above console log will not show my updated chosenCity to what the search input (searchBar) is after clicking the search button
//  ASK BRYAN !!!!!!!!
// !!!!! also ask why chosenCity is not  changing to chosenCityLocal variable within the async function