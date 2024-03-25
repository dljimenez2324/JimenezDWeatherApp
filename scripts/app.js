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
let twoDaysDay = document.getElementById("twoDaysDay");
let threeDaysDay = document.getElementById("threeDaysDay");
let fourDaysDay = document.getElementById("fourDaysDay");
let fiveDaysDay = document.getElementById("fiveDaysDay");
let oneDaysDate = document.getElementById("oneDaysDate");
let twoDaysDate = document.getElementById("twoDaysDate");
let threeDaysDate = document.getElementById("threeDaysDate");
let fourDaysDate = document.getElementById("fourDaysDate");
let fiveDaysDate = document.getElementById("fiveDaysDate");
let oneDaysAfterIcon = document.getElementById("oneDaysAfterIcon");
let twoDaysAfterIcon = document.getElementById("twoDaysAfterIcon");
let threeDaysAfterIcon = document.getElementById("threeDaysAfterIcon");
let fourDaysAfterIcon = document.getElementById("fourDaysAfterIcon");
let fiveDaysAfterIcon = document.getElementById("fiveDaysAfterIcon");
let oneDaysForecaTemp = document.getElementById("oneDaysForecaTemp");
let twoDaysForecaTemp = document.getElementById("twoDaysForecaTemp");
let threeDaysForecaTemp = document.getElementById("threeDaysForecaTemp");
let fourDaysForecaTemp = document.getElementById("fourDaysForecaTemp");
let fiveDaysForecaTemp = document.getElementById("fiveDaysForecaTemp");

// establishing global variables
let currentWeather = [];  //  seldom used
let forecastedWeather = [];  // currently, not used
let chosenCity = "";
let favArr = [];   // used to hold the values added from out local storage

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

    
    // saving our data to our global array for later use?  After a while I defaulted to using apiResponse instead.  Does this lead to the api being called many times, thus overusing the api call ?  Would it be better to store the apiResponse data into the global variable instead and extract the data from that?  Ask Bryan
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
    oneDaysAfterIcon.src = "https://openweathermap.org/img/wn/" + apiResponse.list[1].weather[0].icon + "@2x.png"; // show the icon for 1 day after today
    twoDaysAfterIcon.src = "https://openweathermap.org/img/wn/" + apiResponse.list[2].weather[0].icon + "@2x.png"; // show the icon for 2 day after today
    threeDaysAfterIcon.src = "https://openweathermap.org/img/wn/" + apiResponse.list[3].weather[0].icon + "@2x.png"; // show the icon for 3 day after today
    fourDaysAfterIcon.src = "https://openweathermap.org/img/wn/" + apiResponse.list[4].weather[0].icon + "@2x.png"; // show the icon for 4 day after today
    fiveDaysAfterIcon.src = "https://openweathermap.org/img/wn/" + apiResponse.list[5].weather[0].icon + "@2x.png"; // show the icon for 5 day after today

    
    // Date for 5 Day forecast showing the Month and day
    // THIS CODE CAN BE REFACTORED IF TIME PERMITS
    // For 1 day after today
    // let temporaryUnixTimestamp = apiResponse.list[1].dt - apiResponse.city.timezone;  // this is our unix time accounting for the city's timezone from the api

    // THIS IDEA IS SCRAPPED FOR NOW
    // To add the suffixes to our date days ie(1st, 2nd, 3rd, 4th - 20th 21st etc) we can create an array holding the suffix' we need  THEN concatenate the suffix[j] based upon the dates checked against an object which holds certain dates that require the proper suffix needed.  This was created and I couldnt see how i could tie the objects dot notation to match the date().day data as an index or key value pair

    // USE THIS IDEA INSTEAD
    // MAYBE we can add the suffix based upon the index is labeled by the formattedDate.day which gives a numerical value from 1 to 31 so then, we build an array with suffix' st, nd, rd, th at the index number just as in the date
    const suffix = ["n/a", "st", "nd", "rd", "th", "th", "th", "th", "th", "th", "th", "th", "th", "th", "th", "th", "th", "th", "th", "th", "th", "st", "nd", "rd", "th", "th", "th", "th", "th", "th", "th", "st"];

    // For generalized iteration through the indices of 0 to 5 for current date to 5 days out
    for (let i = 0; i <= 5; i++){
        
        // this is our unix time accounting for the city's timezone from the api
        let temporaryUnixTimestamp = apiResponse.list[i].dt - apiResponse.city.timezone;  
        // this is using out method to get the date formatted as a human-readable date object
        let formattedDate = DateConverter.getFormattedDate(temporaryUnixTimestamp);

        // this switch will determine which ids will be manipulated based on the iteration index "i" which is used to indicate which day we are asking for api info
        switch (i) {
            // case 0 gives us the month and day for today  remember cases 1 through 5 are the forecasted info
            case 0:

                dateToday.innerText = formattedDate.month + " " + formattedDate.day + suffix[formattedDate.day];

                // To have the more accurate data for Max and Min for the current day, we will use .list[0] to get the true max and min for the current day.  NOTICE! .list[0] means todays data at time of search NOTE: this is not in the documentation but had to be discovered & tested
                tempNowMax.innerText = Math.round(apiResponse.list[i].temp.max) + "°";
                tempNowMin.innerText = Math.round(apiResponse.list[i].temp.min) + "°";
                break;
            case 1:
                oneDaysDate.innerText = formattedDate.month + " " + formattedDate.day + suffix[formattedDate.day];
                break;
            case 2:
                twoDaysDate.innerText = formattedDate.month + " " + formattedDate.day + suffix[formattedDate.day];
                break;
            case 3:
                threeDaysDate.innerText = formattedDate.month + " " + formattedDate.day + suffix[formattedDate.day];
                break;
            case 4:
                fourDaysDate.innerText = formattedDate.month + " " + formattedDate.day + suffix[formattedDate.day];
                break;
            case 5:
                fiveDaysDate.innerText = formattedDate.month + " " + formattedDate.day + suffix[formattedDate.day];
                break;
        }

    };

    console.log("getFiveDayForecast function finished");
};



//  NON ASYNC FUNCTIONS LIVING BELOW THIS LINE !!!!!!!!!!!!!!

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

// With the help of Chat GPT I created a date converter from UTC so that I can use "dot notation" to extract the day numerically and the month in its name form.  I had to be very specific and iterated my method until I could get exactly what I wanted as an output.
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


// CODE PASTED FROM DYNAMICS FAVE LIST TO HELP FACILITATE FAVES LIST FOR THIS PROJECT
//local storage  saves into a local object  local storage likes to use strings not other things.  So local storage will want to save into strings so we will need to turn things from strings to arrays and back again
// So we will be using stringify !!!
saveBtn.addEventListener("click", function(){
    // if we want to prevent saving the same pokemon we would need to check if there is already a pokemon saved with that name but lets not worry about that

    // we're going to put our data which are objects into our array pokedata
    let obj = {
        "pokeName" : pokeData.name ,
    }
    console.log(obj);
    // favArr is a global variable that gives us more immediate access to the information we want from local storage.  This makes it easier to manipulate what our favorites contains by changing favArr and we can save those changes.
    // arr.push(data) === take the passed in "data" and adds them to the end of the given array ie arr
    favArr.push(obj);  // this will get our favArray and push the data from object into our array and this will be added to the end of our array
    console.log(favArr);
    // now with our local storage this will add an entry (remember CRUD cycle)
    // we need to stringify our favArr because our local storage prefers strings, and we can  turn it back into an array later on when we pull the data back out
    localStorage.setItem("favoritePokemon", JSON.stringify(favArr));  // we are going to get a single item  where we get from the stringify it will turn it into a string and work with the data   FOR US THIS WILL BE OUR FAV CITY
    console.log(localStorage);


    // we will create a fav element on the fly  or injecting a piece of html into our dom
    let colDiv = document.createElement("div");
    colDiv.classList = "col";
    let pTag = document.createElement("p");
    pTag.innerText = pokeData.name;

    // now lets make the pTag clickable
    pTag.addEventListener("click", function(){
        getPokes(pTag.innerText);
    })

    // Now we will inject to the dom   We will "append" our newly created eleement into our favorites list in the html  remember IN THIS ORDER
    colDiv.appendChild(pTag);
    injectHere.appendChild(colDiv);
});


// ON START        OR           ON LOAD
// we need to now start with keeping our favorites from our local storage stick around
// so lets create our ON START which will grab and instance of our favorites list and store it in our array so we can populate the page with our favorite elements

// first we should look to see if we have items in our favs  so we will check our local storage and put it into our favs array if it exists
// remember we had to stringify the json data into our favArr
// this below will check to see if local storage has stuff in it


let favData = JSON.parse(localStorage.getItem("favoritePokemon")); // parse is going to unstringify what we're giving it but this is not its primary purpose  this will turn our favepokemon and turn it into an array
console.log(JSON.parse(localStorage.favoritePokemon));
console.log(favData);  // seems to be the same as above

// if favData means  if theres stuff in it  as opposed to undefined which = false   so in this case if its undefined this makes it false and the if will not run
// this will populate our favs list but must be  checked first
if(favData && favData !=null){  
    // if the data DOES exist and is not empty, then we go inside the if statement, and we have an existing favorites list to work with, we will not make a WORKING COPY of our favorites list to start
    favArr = favData;

    // now lets go through our array of favorites and make elements for each entry in the same way we do when we save a new favoite!  This way, our existing favorites are ready to be used after we load the page
    for(let i=0; i < favArr.length; i++){
        // we are now going to recreate the  fav element on the fly from line 55
        let colDiv = document.createElement("div");
        colDiv.classList = "col";
        let pTag = document.createElement("p");
        pTag.innerText = favArr[i].pokeName;
        pTag.addEventListener("click", function(){
            getPokes(favArr[i].pokeName);
        })
        // this below will now glue the pTag inside the colDiv and then the colDiv into the injectHere ID for the element on the html page
        colDiv.appendChild(pTag);
        injectHere.appendChild(colDiv);
    }

}


// Delete Button
// We will be iterating through our favorites array (favArr) and comparing the data of the current page to identify the pokemon we want to remove
// remember that this  is a button  but i will need to make a delete function
deleteBtn.addEventListener("click", function(){
    for(let i = 0; i < favArr.length; i++){
        // for the current info on our page  check ...
        if(displayName.innerText === favArr[i].pokeName){
            // remove 1 element starting at the current index
            favArr.splice(i, 1);
            // now lets remove the element from the page by class name at its index   so if we picked the second item  the second column will be erased
            let colDiv = injectHere.getElementsByClassName("col")[i];
            injectHere.removeChild(colDiv)
        }
    }
    // now lets remove it from our local storage and remember that .setItem  will UPDATE  (from CRUD cycle of apis) but we also need to stringify it since we dont want it to be a bunch of objects
    localStorage.setItem("favoritePokemon", JSON.stringify(favArr));

    // lets see this
    console.log(favArr);
    console.log(localStorage);
})

// for me I will need to make sure to make a row then make a city  and then favorite heart










// CODE AND NOTES FROM OTHERS!!!!!!!!!!!!!!!!!!!



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




// LESSONS WITH ALICIA AND JOE  to show how the api works 
// // this is assuming that the index list[0]  means starting at midnight for tomorrow THIS IS FOR THE 5 WEATHER FORECAST  NOT THE 16 DAY
// tomorrowTemp.innerText = Math.round(apiResponse.list[4].main.temp); // this index is for the weather api at 12 noon 1 day after today
// twoDaysAfterToday.innerText = Math.round(apiResponse.list[12].main.temp);  // this index is for the weather api at 12 noon 2 days after today
// threeDaysAfterToday.innerText     = apiResponse.list[20].main.temp;
// fourDaysAfterToday.innerText      = apiResponse.list[28].main.temp;
// fiveDaysAfterToday.innerText      = apiResponse.list[36].main.temp;


// // look at the weather icon
// tomorrowDaysIcon.src = "https://openweathermap.org/img/wn/" + apiResponse.list[4].weather.icon + "@2x.png";
// apiResponse.list[28]
// apiResponse.list[36]