import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

const Loading = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        gap: "1em",
        width: "100%",
        minHeight: "500px",
      }}
    >
      <CircularProgress sx={{ color: "#ffffff" }} />
      <Typography
        variant="h6"
        sx={{
          color: "#ffffff",
        }}
      >
        Loading...
      </Typography>
    </Box>
  );
};

export default Loading;
