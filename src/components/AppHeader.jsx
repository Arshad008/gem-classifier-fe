import React, { useContext } from 'react';
import { AppBar, Collapse, LinearProgress, Toolbar, Typography } from "@mui/material";

import { StoreContext } from '../store';

const AppHeader = () => {
  const { store, setStore } = useContext(StoreContext);

  return (
    <AppBar>
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
