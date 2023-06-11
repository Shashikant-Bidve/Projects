const apikey = "4c4551a3a981e6a8fcce4ecb41833e08";

const weatherDataEl = document.getElementById("weather-data");

const cityInputEl = document.getElementById("city-input");

const formEl = document.querySelector("form");

formEl.addEventListener("submit",(event)=>{
    event.preventDefault();
    const cityValue = cityInputEl.value;
    weatherDataEl.classList.remove("hidden");
    getWeatherData(cityValue);
})

async function getWeatherData(cityValue){
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`);

        if(!response.ok){
            throw new Error("Network response was not ok!");
        }

        const data = await response.json();
        console.log(data);
        const temperature = Math.round(data.main.temp);
        const description = data.weather[0].description;
        const icon = data.weather[0].icon;
        
        const details = [`Feels like: ${data.main.feels_like} °C`,
                        `Humidity: ${data.main.humidity} %`,
                        `Wind Speed : ${data.wind.speed} m/s`];
        weatherDataEl.querySelector(".icon").innerHTML = ` <img src="https://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`
        weatherDataEl.querySelector(".temperature").textContent = `${temperature}°C`;
        weatherDataEl.querySelector(".description").textContent = `${description}`;
        weatherDataEl.querySelector(".details").innerHTML = details.map((v)=>{
                return `<div>${v}</div>`}).join("");


    } catch (error) {
        weatherDataEl.querySelector(".icon").innerHTML = "";
        weatherDataEl.querySelector(".temperature").textContent = "";
        weatherDataEl.querySelector(".description").textContent = "Sorry! An error occured!";      
        weatherDataEl.querySelector(".details").innerHTML = "";
            
    }
}