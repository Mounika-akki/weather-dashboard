import React, { useEffect, useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";

import SearchHistoryItem from "./SearchHistoryItem";

const SearchHistory = ({ canUpdateHistory, setCanShowBtn, canShowBtn }) => {
  const [historyData, setHistoryData] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [dataToShow, setDataToShow] = useState([]);

  useEffect(() => {
    const searchHistory =
      JSON.parse(localStorage.getItem("searchHistory")) || [];
    if (searchHistory.lenth >= 3) {
      setCanShowBtn(true);
    }
    setHistoryData([...searchHistory]);
    setDataToShow([...searchHistory.slice(0, 3)]);
  }, [canUpdateHistory]);

  const handleShowMore = () => {
    if (showMore) {
      setDataToShow(historyData);
    } else {
      setDataToShow(historyData.slice(0, 3));
    }
    setShowMore(!showMore);
  };

  const displayDate = (date) => {
    return new Date(date).toDateString().slice(4);
  };

  const displayTime = (date) => {
    return new Date(date).toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        color: "#fff",
        height: "100%",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontFamily: "Poppins",
          fontWeight: "600",
          fontSize: { xs: "12px", sm: "14px", md: "16px" },
          color: "#000",
          textTransform: "uppercase",
          margin: "2em 0",
        }}
      >
        Search History
      </Typography>
      <Grid
        item
        container
        gap="4px"
        sx={{
          width: "100%",
          overflow: "auto",
          justifyContent: "center",
        }}
      >
        {dataToShow && dataToShow.length > 0 ? (
          <>
            {dataToShow.map((item, idx) => {
              return (
                <Grid
                  item
                  key={idx}
                  xs={12}
                  display="flex"
                  sx={{
                    padding: "1em",
                    background:
                      "linear-gradient(0deg, rgba(255, 255, 255, .05) 0%, rgba(171, 203, 222, .05) 100%) 0% 0%",
                    boxShadow:
                      "rgba(0, 0, 0, 0.05) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
                    borderRadius: "8px",
                  }}
                >
                  <Grid
                    container
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      paddingLeft: { xs: "12px", sm: "20px", md: "32px" },
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: "Poppins",
                        fontSize: { xs: "12px", sm: "13px", md: "14px" },
                        lineHeight: 1,
                        height: "31px",
                        alignItems: "center",
                        display: "flex",
                      }}
                      xs={12}
                    >
                      {displayDate(item.date)}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "Poppins",
                        fontSize: { xs: "12px", sm: "13px", md: "14px" },
                        lineHeight: 1,
                        height: "31px",
                        alignItems: "center",
                        display: "flex",
                      }}
                      xs={12}
                    >
                      {displayTime(item.date)}
                    </Typography>
                  </Grid>
                  <Grid
                    container
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      paddingLeft: { xs: "12px", sm: "20px", md: "32px" },
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: "Poppins",
                        fontSize: { xs: "12px", sm: "13px", md: "14px" },
                        lineHeight: 1,
                        height: "31px",
                        alignItems: "center",
                        display: "flex",
                      }}
                      xs={12}
                    >
                      {item.name}
                    </Typography>
                    <Box
                      xs={12}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "31px",
                      }}
                    >
                      <Box
                        component="img"
                        sx={{
                          width: { xs: "24px", sm: "28px", md: "31px" },
                          height: "auto",
                          marginRight: "4px",
                        }}
                        alt="weather"
                        src={item.icon}
                      />
                      <Typography
                        variant="h4"
                        component="h4"
                        sx={{
                          fontSize: { xs: "12px", md: "14px" },
                          lineHeight: 1,
                          fontFamily: "Roboto Condensed",
                        }}
                      >
                        {item.description}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid
                    container
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <SearchHistoryItem
                      type="temperature"
                      value={Math.round(item.temp) + " °C"}
                    />
                    <SearchHistoryItem
                      type="clouds"
                      value={item.clouds + " %"}
                    />
                  </Grid>
                  <Grid
                    container
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <SearchHistoryItem type="wind" value={item.wind + " m/s"} />
                    <SearchHistoryItem
                      type="humidity"
                      value={item.humidity + " %"}
                    />
                  </Grid>
                </Grid>
              );
            })}
            {canShowBtn && (
              <Button
                sx={{ marginTop: "1.5em" }}
                variant="contained"
                onClick={handleShowMore}
              >
                {showMore ? "...Show More" : "...Show Less"}
              </Button>
            )}
          </>
        ) : (
          <Box
            sx={{
              color: "#fff",
              fontSize: "0.8em",
              marginTop: "10em",
            }}
          >
            <Typography>**Your search history appears here**</Typography>
          </Box>
        )}
      </Grid>
    </Box>
  );
};

export default SearchHistory;
