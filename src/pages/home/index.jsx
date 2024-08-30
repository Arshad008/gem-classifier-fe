import React from "react";
import { ButtonBase, Container, Stack, Typography } from "@mui/material";

const heroContainerStyles = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  background: "linear-gradient(180deg, #000000, #434343)",
  color: "#ffffff",
  textAlign: "center",
  padding: "40px 16px",
  borderBottomLeftRadius: "12px",
  borderBottomRightRadius: "12px",
};

const heroActionButtonStyles = {
  padding: "12px 24px",
  borderRadius: "7px",
  backgroundColor: "#ffffff",
  color: "#000000",
  fontWeight: 600,
  fontSize: "18px",
};

const HomePage = () => {
  return (
    <div>
      <Stack sx={heroContainerStyles} rowGap="10px">
        <Typography variant="h3">
          Discover the beauty of gemstones with AI!
        </Typography>
        <Typography variant="h6">
          Upload an image of your gemsonte and let our AI model classify
          instantly!.
        </Typography>
        <img
          src="/images/app-logo.png"
          alt="app-logo"
          style={{ maxWidth: "300px" }}
        />
        <ButtonBase sx={heroActionButtonStyles}>Get Started</ButtonBase>
      </Stack>
    </div>
  );
};

export default HomePage;
