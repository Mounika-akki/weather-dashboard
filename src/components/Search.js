import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { fetchCities, fetchWeatherData } from "../api/weatherApi";
import { Box, Button } from "@mui/material";

const Search = ({
  setIsLoading,
  setError,
  setWeatherData,
  setDeniedText,
  setCanUpdateHistory,
  canUpdateHistory,
}) => {
  const [searchValue, setSearchValue] = useState(null);

  const loadCities = async (inputValue) => {
    const citiesList = await fetchCities(inputValue);

    return {
      options: citiesList?.data.map((city) => {
        return {
          value: `${city.latitude} ${city.longitude}`,
          label: `${city.name}, ${city.countryCode}`,
        };
      }),
    };
  };

  const handleSearchSubmit = () => {
    if (!searchValue || !searchValue.value) return;
    setDeniedText(null);
    setIsLoading(true);
    const [latitude, longitude] = searchValue.value.split(" ");

    const fetchCb = (err, data) => {
      console.log(data);
      if (err) {
        setError(true);
      } else {
        setWeatherData(data || {});
        let dataToStore = {
          name: data.name,
          temp: data.main.temp,
          icon: `https://openweathermap.org/img/wn/${data?.weather[0].icon}@2x.png`,
          temp_max: data.main.temp_max,
          temp_min: data.main.temp_min,
          description: data?.weather[0].description,
          feels_like: data.main.feels_like,
          wind: data.wind.speed,
          humidity: data.main.humidity,
          clouds: data.clouds.all,
          date: new Date(),
        };
        let dataFromStore =
          JSON.parse(localStorage.getItem("searchHistory")) || [];
        console.log(dataFromStore);
        dataFromStore = [...dataFromStore, dataToStore];
        localStorage.setItem("searchHistory", JSON.stringify(dataFromStore));
        setCanUpdateHistory(!canUpdateHistory);
      }
    };

    fetchWeatherData(latitude, longitude, fetchCb);

    setIsLoading(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <Box
        sx={{
          width: "50%",
          maxWidth: "95%",
          padding: "0 1em",
          margin: "1em",
        }}
      >
        <AsyncPaginate
          placeholder="Search for a city"
          debounceTimeout={500}
          value={searchValue}
          onChange={(val) => setSearchValue(val)}
          loadOptions={loadCities}
        />
      </Box>

      <Box
        sx={{
          width: "fitContent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button
          variant="contained"
          sx={{ height: "3em" }}
          onClick={handleSearchSubmit}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default Search;
