import React from "react";
import { Typography } from "@mui/material";

const containerStyles = {
  background: 'hsl(210, 14%, 7%)',
  color: '#ffffff',
  padding: '16px',
  textAlign: 'center'
};

const AppFooter = () => {
  return (
    <footer style={containerStyles}>
      <Typography>
        &copy; Copyright Gem Classifier
      </Typography>
    </footer>
  );
};

export default AppFooter;
