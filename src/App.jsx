import React, { useState } from "react";
import { Box, Toolbar } from "@mui/material";
import { Route, Routes } from "react-router-dom";

import { StoreContext, initialStore } from "./store";
import AppHeader from "./components/AppHeader";
import AppFooter from "./components/AppFooter";
import HomePage from "./pages/home";
import SignUpPage from "./pages/signup";
import SignInPage from "./pages/signin";

const mainContainerStyles = {
  minHeight: {
    xs: "calc(100vh - (56px + 56px))",
    sm: "calc(100vh - (64px + 56px))",
  },
};

const App = () => {
  const [store, setStore] = useState(initialStore);

  return (
    <StoreContext.Provider value={{ store, setStore }}>
      <div className="app">
        <AppHeader />
        <Toolbar />
        <Box component="main" sx={mainContainerStyles}>
          <Routes>
            <Route index path="/" element={<HomePage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/sign-in" element={<SignInPage />} />
          </Routes>
        </Box>
        <AppFooter />
      </div>
    </StoreContext.Provider>
  );
};

export default App;
