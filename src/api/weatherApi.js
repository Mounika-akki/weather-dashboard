import axios from "axios";

const GEO_API_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo";
const RAPID_API_KEY = process.env.REACT_APP_RAPID_API_KEY;

const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5";
const WEATHER_API_KEY = process.env.REACT_APP_API_KEY;

const GEO_API_OPTIONS = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": RAPID_API_KEY,
    "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
  },
};

export function fetchWeatherData(lat, lon, cb) {
  try {
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

export async function fetchCities(input, setError) {
  try {
    const response = await fetch(
      `${GEO_API_URL}/cities?minPopulation=10000&namePrefix=${input}`,
      GEO_API_OPTIONS
    );

    const resJson = await response.json();
    return resJson;
  } catch (error) {
    console.log(error);
    return;
  }
}
