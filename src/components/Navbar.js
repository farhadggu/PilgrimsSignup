import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function Navbar() {
  return (
    <AppBar
      position="static"
      sx={{ background: "#ebebeb", margin: "10px 0", boxShadow: "none" }}
    >
      <a href="https://nahalgasht.com/" style={{textDecoration: "none"}}>
      <Box
        className="navbar"
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap="20px"
      >
          <img
            src="https://nahalgasht.com/wp-content/themes/nahalgasht/assets/img/logo-r.svg"
            alt="nahalgasht"
            width="50px"
            height="50px"
          />
          <Typography fontWeight="600" fontSize={22} sx={{ color: "#000" }}>
            نهال گشت
          </Typography>
      </Box>
      </a>
    </AppBar>
  );
}
export default Navbar;
