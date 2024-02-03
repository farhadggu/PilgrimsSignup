import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import logo from "../images/logo.svg";

function Navbar() {
  return (
    <AppBar position="static" sx={{ background: "#ebebeb", margin: "10px 0", boxShadow: "none" }}>
      <a href="https://nahalgasht.com/tours/iraq/karbala/" style={{ textDecoration: "none" }}>
        <Box
          className="navbar"
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap="20px"
        >
          <img src={logo} alt="nahalgasht" width="50px" height="50px" />
          <Typography fontWeight="600" fontSize={22} sx={{ color: "#000" }}>
            گروه زیارتی آمنین
          </Typography>
        </Box>
      </a>
    </AppBar>
  );
}
export default Navbar;
