import React from "react";
import { Typography } from "@mui/material";

const containerStyles = {
  background: "#0c1926",
  color: "#ffffff",
  padding: "16px",
  textAlign: "center",
};

const AppFooter = () => {
  return (
    <footer style={containerStyles}>
      <Typography>&copy; 2024, Copyright Gem Classifier</Typography>
    </footer>
  );
};

export default AppFooter;
