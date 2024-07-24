import React, { useState } from "react";
import { Toolbar } from "@mui/material";
import { Route, Routes } from "react-router-dom";

import { StoreContext, initialStore } from "./store";
import AppHeader from "./components/AppHeader";
import AppFooter from "./components/AppFooter";
import Home from "./pages/home";

const mainContainerStyles = {
  minHeight: 'calc(100vh - (64px + 56px))'
};

const App = () => {
  const [store, setStore] = useState(initialStore);

  return (
    <StoreContext.Provider value={{ store, setStore }}>
      <div className="app">
        <AppHeader />
        <Toolbar />
        <main style={mainContainerStyles}>
          <Routes>
            <Route index element={<Home />} />
          </Routes>
        </main>
        <AppFooter />
      </div>
    </StoreContext.Provider>
  );
};

export default App;
