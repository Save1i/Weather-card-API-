// let userLat, userLng;

// async function position() {
//   const pos = await new Promise((resolve, reject) => {
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });

//   return {
//     lat: pos.coords.latitude,
//     lng: pos.coords.longitude,
//   };
// } // если понадобятся координаты без ограничения по запросам со стороны API
//////////////////////////////////////////////////////////////////////////////

// const locationUrl = "http://api.db-ip.com/v2/free/self"; // разблокируй для автоматического определения местоположения

async function userLocation() {
  try {
    const rawData = await fetch(locationUrl);
    const textData = await rawData.text();
    const data = JSON.parse(textData);
    return data.city;
  } catch (error) {
    console.log(`${error}`);
  }
}

let local = "";

const timeApi = "http://worldtimeapi.org/api/timezone/Europe/Vaduz";

async function timeZone() {
  const resp = await fetch(timeApi, { mode: "cors" });
  const data = await resp.json();

  const date = new Date(data.datetime);

  // Опции для форматирования даты
  const options = {
    weekday: "short",
    month: "short",
    day: "numeric",
  };

  // Форматируем дату с использованием toLocaleDateString
  const formattedDate = date.toLocaleDateString("en-US", options);

  document.querySelector(".time").innerHTML = formattedDate;
  console.log(data);
}

timeZone();

const Apiurl = `https://api.openweathermap.org/data/2.5/weather?`;
let myApiKey = "2648abbb783df953999876283f68f540";
const cityInput = document.querySelector(".city__input");

async function getData(city, unit) {
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

async function makeCard(city, unit) {
  console.log(city);
  const tempUnit = document.querySelector(".temp__img");
  unit === "metric" ? (tempUnit.innerHTML = "°C") : (tempUnit.innerHTML = "°F");
  let data = await getData(city, unit);

  if (data.cod != 200) {
    document.querySelector(".city").innerHTML = data?.name || "N/A";
    document.querySelector(".temp").innerHTML = Math.round(data.main?.temp) || "N/A";
    document.querySelector(".weather-main").innerHTML = data.weather?.[0]?.main || "N/A";
    document.querySelector(".country").innerHTML = data.sys?.country || "N/A";
    document.querySelector("#wind").innerHTML = Math.round(data.wind?.speed) + " km/h" || "N/A";
    document.querySelector("#rainFall").innerHTML = Math.round(data.wind?.speed) + " km/h" || "N/A";
    document.querySelector("#humidity").innerHTML = Math.round(data.wind?.speed) + " km/h" || "N/A";
    document.querySelector(".temp__img").classList.add("hidden");
  } else {
    document.querySelector(".temp__img").classList.remove("hidden");
    document.querySelector(".city").innerHTML = data?.name || "N/A";
    document.querySelector(".temp").innerHTML = Math.round(data.main?.temp) || "N/A";
    document.querySelector(".weather-main").innerHTML = data.weather?.[0]?.main || "N/A";
    document.querySelector(".country").innerHTML = data.sys?.country || "N/A";
    document.querySelector("#wind").innerHTML = Math.round(data.wind?.speed) + " km/h" || "N/A";
    document.querySelector("#humidity").innerHTML = Math.round(data.main?.humidity) + " %" || "N/A";
    // document.querySelector("#rainFall").innerHTML = Math.round(data.wind?.speed) + " km/h" || "N/A";
  }

  if (!city) {
    document.querySelector(".wether__img").src = "unload.png";
  } else if (data.weather[0].main == "Thunderstorm") {
    document.querySelector(".wether__img").src = "TStorm.png";
  } else if (data.weather[0].main == "Drizzle") {
    document.querySelector(".wether__img").src = "drizle.png";
  } else if (data.weather[0].main == "Rain") {
    document.querySelector(".wether__img").src = "rain.png";
  } else if (data.weather[0].main == "Snow") {
    document.querySelector(".wether__img").src = "snow.png";
  } else if (data.weather[0].main == "Clouds") {
    document.querySelector(".wether__img").src = "cloudy.png";
  } else if (data.weather[0].main == "Clear") {
    document.querySelector(".wether__img").src = "clear.png";
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  let unit = units.checked ? " imperial" : "metric";
  const locationCity = await userLocation();
  makeCard(locationCity, unit);
});

cityInput.addEventListener("change", () => {
  let unit = units.checked ? " imperial" : "metric";
  console.log(unit);
  makeCard(cityInput.value, unit);
  console.log("Selected city:", cityInput.value);
});

const ApiHourly = `https://api.openweathermap.org/data/2.5/forecast?`;

async function getDataHourly(lat, lon) {
  try {
    const resp = await fetch(ApiHourly + `lat=${lat}&lon=${lon}` + `&appid=${myApiKey}`, {
      mode: "cors",
    });
    const data = await resp.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("Error fetching weather data:", error);
  }
}

getDataHourly(53.9, 27.5667);

const units = document.querySelector(".unit");

units.addEventListener("click", () => {
  let unit = units.checked ? " imperial" : "metric";

  console.log(unit);
  makeCard(cityInput.value, unit);
});
