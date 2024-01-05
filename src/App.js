import React, { useEffect, useState } from "react";
import { Box, Divider, Grid, Typography } from "@mui/material";
import Search from "./components/Search";
import Loading from "./components/Loading";
import Weather from "./components/Weather";
import { fetchWeatherData } from "./api/weatherApi";
import SearchDefault from "./components/SearchDefault";
import SearchHistory from "./components/SearchHistory";
import Error from "./components/Error";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = React.useState(null);
  const [deniedText, setDeniedText] = useState(null);
  const [canUpdateHistory, setCanUpdateHistory] = useState(false);
  const [canShowBtn, setCanShowBtn] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(locationSuccess, locationErr);
    } else {
      setDeniedText(
        "Unable to get location information. Search any country/state/city to get current weather information"
      );
    }
  }, []);

  const locationSuccess = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setIsLoading(true);

    fetchWeatherData(latitude, longitude, (err, data) => {
      if (err) {
        setError("Oops Something went wrong! Please try again later.");
      } else {
        setWeatherData(data || {});
      }
      setIsLoading(false);
    });
  };

  const locationErr = () => {
    setDeniedText(
      "Location permission denied. Search for any country/state/city to get current weather information"
    );
    setIsLoading(false);
  };

  let weatherDisplay = <SearchDefault deniedText={deniedText} />;

  if (weatherData) {
    weatherDisplay = (
      <React.Fragment>
        <Grid item sx={{ marginRight: "1em" }} xs={12}>
          <Weather weatherData={weatherData} />
        </Grid>
      </React.Fragment>
    );
  }

  if (error) {
    weatherDisplay = (
      <Error errorMessage={error} setError={setError} error={error} />
    );
  }

  if (isLoading) {
    weatherDisplay = <Loading />;
  }

  return (
    <Box
      sx={{
        height: "100%",
        padding: "0",
      }}
    >
      <Grid container columnSpacing={2}>
        <Grid
          item
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "fixed",
            padding: "2.5em 1.5em 2em",
            background: "rgba(41, 91, 139, 1)",
            color: "rgba(253, 146, 45)",
            width: "105%",
            zIndex: 10,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              height: "1.2em",
              justifySelf: "center",
              letterSpacing: 2,
              textTransform: "uppercase",
              fontWeight: "4em",
              fontSize: "1.5em",
              paddingLeft: "1em",
            }}
          >
            Weather Dashboard
          </Typography>
        </Grid>
        <Grid
          container
          item
          sx={{
            marginTop: "130px",
            height: "3em",
          }}
        >
          <Search
            setWeatherData={setWeatherData}
            setIsLoading={setIsLoading}
            setError={setError}
            setDeniedText={setDeniedText}
            setCanUpdateHistory={setCanUpdateHistory}
            setCanShowBtn={setCanShowBtn}
            canUpdateHistory={canUpdateHistory}
          />
        </Grid>
        <Grid
          container
          item
          sx={{
            flexWrap: "wrap",
            margin: "2em 1em",
            justifyContent: "center",
          }}
        >
          <Grid item sm={12} md={5} lg={5}>
            {weatherDisplay}
          </Grid>
          <Grid
            item
            sx={{ width: "1px", position: "relative", right: "4%" }}
            xs={0}
            sm={1}
          >
            <Divider
              orientation="vertical"
              sx={{
                display: { xs: "none", sm: "none", md: "block" },
              }}
            />
          </Grid>
          <Grid
            item
            sm={12}
            md={5}
            sx={{ paddingLeft: { sm: "0", md: "1em" } }}
          >
            <SearchHistory
              canUpdateHistory={canUpdateHistory}
              canShowBtn={canShowBtn}
              setCanShowBtn={setCanShowBtn}
            />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
