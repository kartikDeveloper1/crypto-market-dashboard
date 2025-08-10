import { AppBar, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <AppBar position="static" >
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: "none",
            color: "inherit", 
          }}
        >
          Nimo Industries Crypto Dashboard
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
