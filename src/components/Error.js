import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

import "../index.css";

export default function Error({ errorMessage, error, setError }) {
  const handleClose = () => {
    setError(null);
  };

  return (
    <Dialog open={Boolean(error)} onClose={handleClose} fullWidth maxWidth="xs">
      <DialogTitle
        sx={{
          backgroundColor: "#1976d2",
          color: "#fff",
          marginBottom: "1em",
          lineHeight: "0.05em",
          padding: "0.1em 0 0.6em 0",
        }}
        textAlign="center"
      >
        <ErrorOutlineIcon sx={{ position: "relative", top: "5px" }} /> Warning
      </DialogTitle>
      <DialogContent>
        <DialogContentText textAlign="center" sx={{ color: "#000" }}>
          {errorMessage}
        </DialogContentText>
      </DialogContent>
      <DialogActions style={{ justifyContent: "center" }}>
        <Button
          variant="contained"
          sx={{ textTransform: "capitalize" }}
          onClick={handleClose}
        >
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}
