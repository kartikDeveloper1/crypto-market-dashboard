import { Alert, Box } from "@mui/material";

export default function ErrorAlert({ message }) {
  return (
    <Box mt={2}>
      <Alert severity="error">{message}</Alert>
    </Box>
  );
}
