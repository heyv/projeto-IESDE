import React from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars({ texto, errorType }) {
  return (
    <Stack
      spacing={2}
      sx={{ width: "50%" }}
      style={{ margin: "auto", position: "absolute" }}
    >
      <Snackbar open={true} autoHideDuration={3000}>
        <Alert severity={errorType} sx={{ width: "100%" }}>
          {texto}
        </Alert>
      </Snackbar>
    </Stack>
  );
}

// tipos de alert = "error", "warning", "info", "success"

/* <Alert severity="error">This is an error message!</Alert>
      <Alert severity="warning">This is a warning message!</Alert>
      <Alert severity="info">This is an information message!</Alert>
      <Alert severity="success">This is a success message!</Alert> */
