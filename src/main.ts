import "./style.css"

const timeApi:string = "http://worldtimeapi.org/api/timezone/Europe/Vaduz";

async function timeZone(): Promise<void> {

  try {
    const resp = await fetch(timeApi, { mode: "cors" });
    
    const data = await resp.json();

    const date = new Date(data.datetime);

  // Опции для форматирования даты
   const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    month: "short",
    day: "numeric",
  };

  // Форматируем дату с использованием toLocaleDateString
  const formattedDate = date.toLocaleDateString("en-US", options);

  document.querySelector(".time")!.innerHTML = formattedDate;
  console.log(data);
  } catch (error) {
    console.log("Error fetching weather data:", error);
  }



}

timeZone();


const Apiurl: string = `https://api.openweathermap.org/data/2.5/weather?`;
let myApiKey: string = "2648abbb783df953999876283f68f540";

async function getData(city: string, unit: string) {
  try {
    const resp = await fetch(Apiurl + `units=${unit}&q=` + city + `&appid=${myApiKey}`, {
      mode: "cors",
    });

    const data = await resp.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("Error fetching weather data:", error);
  }
}

const weatherImg = document.querySelector(".wether__img") as HTMLImageElement;
if (weatherImg) {
  weatherImg.src = "images/unload.png"; 
}

function defaultV(): any {
  document.querySelector(".temp__img")!.classList.remove("hidden");
    document.querySelector(".city")!.innerHTML = "N/A";
    document.querySelector(".temp")!.innerHTML = "N/A";
    document.querySelector(".weather-main")!.innerHTML = "N/A";
    document.querySelector(".country")!.innerHTML = "N/A";
    document.querySelector("#wind")!.innerHTML = "N/A";
    document.querySelector("#humidity")!.innerHTML =  "N/A";
    document.querySelector("#rainFall")!.innerHTML = "N/A";
    // document.querySelector("#rainFall").innerHTML = Math.round(data.wind?.speed) + " km/h" || "N/A";
    weatherImg.src = "images/unload.png"; 
}

defaultV()

async function makeCard(city:string, unit:string) {
  console.log(city);
  const tempUnit = document.querySelector(".temp__img");
  unit === "metric" ? (tempUnit!.innerHTML = "°C") : (tempUnit!.innerHTML = "°F");
  let data = await getData(city, unit);

  if (data.cod !== 200) {
    document.querySelector(".city")!.innerHTML = data?.name || "N/A";
    document.querySelector(".temp")!.innerHTML = String(data?.main?.temp ? Math.round(data.main.temp) : "N/A");
    document.querySelector(".weather-main")!.innerHTML = data.weather?.[0]?.main || "N/A";
    document.querySelector(".country")!.innerHTML = data.sys?.country || "N/A";
    document.querySelector("#wind")!.innerHTML = Math.round(data.wind?.speed) + " km/h" || "N/A";
    document.querySelector("#rainFall")!.innerHTML = "N/A";
    document.querySelector("#humidity")!.innerHTML = Math.round(data.wind?.speed) + " km/h" || "N/A";
    document.querySelector(".temp__img")!.classList.add("hidden");
  } else {
    document.querySelector(".temp__img")!.classList.remove("hidden");
    document.querySelector(".city")!.innerHTML = data?.name || "N/A";
    document.querySelector(".temp")!.innerHTML = String(data?.main?.temp ? Math.round(data.main.temp) : "N/A");
    document.querySelector(".weather-main")!.innerHTML = data.weather?.[0]?.main || "N/A";
    document.querySelector(".country")!.innerHTML = data.sys?.country || "N/A";
    document.querySelector("#wind")!.innerHTML = Math.round(data.wind?.speed) + " km/h" || "N/A";
    document.querySelector("#humidity")!.innerHTML = Math.round(data.main?.humidity) + " %" || "N/A";
    // document.querySelector("#rainFall").innerHTML = Math.round(data.wind?.speed) + " km/h" || "N/A";
    weatherImg.src = "images/unload.png"; 
  }

  if (!city) {
    const weatherImg = document.querySelector(".wether__img") as HTMLImageElement;
    if (weatherImg) {
      weatherImg.src = "images/unload.png"; 
    }
  } else {
    if (data.weather && data.weather.length > 0) {
      const weatherCondition = data.weather[0].main;
      const weatherImg = document.querySelector(".wether__img") as HTMLImageElement;
  
      if (weatherImg) {
        if (weatherCondition === "Thunderstorm") {
          weatherImg.src = "images/TStorm.png";
        } else if (weatherCondition === "Drizzle") {
          weatherImg.src = "images/drizle.png";
        } else if (weatherCondition === "Rain") {
          weatherImg.src = "images/rain.png";
        } else if (weatherCondition === "Snow") {
          weatherImg.src = "images/snow.png";
        } else if (weatherCondition === "Clouds") {
          weatherImg.src = "images/cloudy.png";
        } else if (weatherCondition === "Clear") {
          weatherImg.src = "images/clear.png";
        }
      }
    }
  }
}



console.log("good morning");


// document.addEventListener("DOMContentLoaded", async () => {
//     const units = document.querySelector(".unit") as HTMLInputElement;
//   let unit = units.checked ? "imperial" : "metric";
//   const locationCity = await userLocation();
//   makeCard(locationCity, unit);
// });

document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.querySelector(".city__input") as HTMLInputElement;
  

  if (cityInput) {
    cityInput.addEventListener("change", () => {
      let unit = units.checked ? "imperial" : "metric";
      console.log(unit);
      makeCard(cityInput.value, unit);
      console.log("Selected city:", cityInput.value);
    });
  } else {
    console.error("Element with id 'city-input' not found!");
  }



const units = document.querySelector(".unit") as HTMLInputElement;;
units.addEventListener("click", () => {
  let unit = units.checked ? "imperial" : "metric";

  console.log(unit);
  makeCard(cityInput.value, unit);
});

});

