import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Box, Toolbar } from "@mui/material";
import { SnackbarProvider } from "notistack";

import { StoreContext, initialStore } from "./store";
import AppHeader from "./components/AppHeader";
import AppFooter from "./components/AppFooter";
import AppRoutes from "./AppRoutes";

const defaultSnackBarOptions = {
  maxSnack: 3,
  autoHideDuration: 3000,
  anchorOrigin: {
    horizontal: "right",
    vertical: "top",
  },
};

const mainContainerStyles = {
  minHeight: {
    xs: "calc(100vh - (56px + 56px))",
    sm: "calc(100vh - (64px + 56px))",
  },
};

const App = () => {
  const location = useLocation();

  // State
  const [store, setStore] = useState(initialStore);

  return (
    <SnackbarProvider {...defaultSnackBarOptions}>
      <StoreContext.Provider value={{ store, setStore }}>
        <div className="app">
          {location.pathname !== "/" ? (
            <>
              <AppHeader />
              <Toolbar />
            </>
          ) : null}
          <Box component="main" sx={mainContainerStyles}>
            <AppRoutes />
          </Box>
          <AppFooter />
        </div>
      </StoreContext.Provider>
    </SnackbarProvider>
  );
};

export default App;
