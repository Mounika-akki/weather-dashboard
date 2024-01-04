import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { ArrowUpward, ArrowDownward } from "@mui/icons-material";

import WeatherItem from "./WeatherItem";

const Weather = ({ weatherData }) => {
  return (
    <Grid
      container
      direction={"column"}
      sx={{
        padding: "2rem 0rem",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <Grid item>
        <Typography
          variant="h3"
          component="h3"
          sx={{
            fontFamily: "Poppins",
            fontWeight: "600",
            fontSize: { xs: "12px", sm: "14px", md: "16px" },
            color: "#000",
            textTransform: "uppercase",
            marginBottom: "8px",
          }}
        >
          Todays Weather in {weatherData?.name || null}
        </Typography>
      </Grid>
      <Grid item>
        <Box
          component="img"
          sx={{
            width: { xs: "150px", sm: "100px" },
            height: "auto",
          }}
          alt="weather"
          src={`https://openweathermap.org/img/wn/${weatherData?.weather[0].icon}@2x.png`}
        />
      </Grid>
      <Grid item>
        <Typography
          variant="h3"
          component="h3"
          sx={{
            fontWeight: "600",
            fontSize: "3em",
            color: "white",
            fontFamily: "Poppins",
          }}
        >
          {Math.round(weatherData.main.temp)}°C
        </Typography>
      </Grid>
      <Grid item>
        <Typography
          variant="h5"
          component="h5"
          sx={{
            fontSize: { xs: "12px", sm: "14px", md: "14px" },
            color: "white",
            fontFamily: "Poppins",
            marginBottom: "1.5em",
          }}
        >
          {Math.round(weatherData.main.temp_max)}°C
          <ArrowUpward sx={{ fontSize: "12px" }} />/
          {Math.round(weatherData.main.temp_min)}°C
          <ArrowDownward sx={{ fontSize: "12px" }} />
        </Typography>
      </Grid>
      <Grid item>
        <Typography
          variant="h3"
          component="h3"
          sx={{
            fontSize: "1.5em",
            color: "#ffffff",
            fontFamily: "Roboto Condensed",
            marginBottom: "1.5em",
            fontWeight: "500",
          }}
        >
          {weatherData?.weather[0].description}
        </Typography>
      </Grid>
      <Grid
        container
        item
        sx={{
          padding: "1em",
          borderRadius: "20px",
          fontSize: "16px",
          fontWeight: "bold",
          backgroundColor: "rgba(253,146,45, 0.2)",
          width: "100%",
        }}
        justifyContent="space-between"
      >
        <WeatherItem
          title="Feels Like"
          value={`${Math.round(weatherData.main.feels_like)} °C`}
          type="temperature"
        />
        <WeatherItem
          title="Wind"
          value={`${weatherData.wind.speed} m/s`}
          type="wind"
        />
        <WeatherItem
          title="Clouds"
          value={`${Math.round(weatherData.clouds.all)} %`}
          type="clouds"
        />
        <WeatherItem
          title="Humidity"
          value={`${Math.round(weatherData.main.humidity)} %`}
          type="humidity"
        />
      </Grid>
    </Grid>
  );
};

export default Weather;
