import React, { useContext } from 'react';
import { AppBar, Collapse, LinearProgress, Toolbar, Typography } from "@mui/material";

import { StoreContext } from '../store';

const containerStyles = {
  background: 'radial-gradient(farthest-corner circle at 0% 0%, hsla(210, 100%, 23%, 0.2) 0%, hsl(210, 14%, 7%) 100%)'
};

const AppHeader = () => {
  const { store, setStore } = useContext(StoreContext);

  return (
    <AppBar sx={containerStyles}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
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
