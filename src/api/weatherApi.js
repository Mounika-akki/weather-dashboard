import axios from "axios";

const GEO_API_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo";

const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5";
const WEATHER_API_KEY = process.env.REACT_APP_API_KEY;

const GEO_API_OPTIONS = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "4f0dcce84bmshac9e329bd55fd14p17ec6fjsnff18c2e61917",
    "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
  },
};

export function fetchWeatherData(lat, lon, cb) {
  try {
    console.log(lat, lon);
    axios
      .get(
        `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
      )
      .then((res) => {
        cb(null, res.data);
      });
  } catch (error) {
    console.log(error);
    cb(error);
  }
}

export async function fetchCities(input) {
  try {
    const response = await fetch(
      `${GEO_API_URL}/cities?minPopulation=10000&namePrefix=${input}`,
      GEO_API_OPTIONS
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return;
  }
}