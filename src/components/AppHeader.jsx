import React, { useContext } from "react";
import {
  AppBar,
  Collapse,
  LinearProgress,
  Toolbar,
  Typography,
} from "@mui/material";

import { StoreContext } from "../store";
import { NavLink } from "react-router-dom";

const containerStyles = {
  backgroundColor: "#24303c",
};

const AppHeader = () => {
  const { store, setStore } = useContext(StoreContext);

  return (
    <AppBar sx={containerStyles}>
      <Toolbar>
        <NavLink to="/">
          <img
            src="/images/nav-icon.png"
            alt="app-logo"
            width="36px"
            height="36px"
          />
        </NavLink>
        <Typography variant="h6" color="#ffffff" ml="10px">
          Gem Classifier
        </Typography>
      </Toolbar>
      <Collapse
        in={store.isLoading}
        sx={{
          position: "fixed",
          width: "100%",
          top: {
            xs: "calc(56px - 4px)",
            sm: "calc(64px - 4px)",
          },
        }}
      >
        <LinearProgress color="inherit" />
      </Collapse>
    </AppBar>
  );
};

export default AppHeader;
