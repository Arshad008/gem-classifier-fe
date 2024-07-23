import React, { useState } from "react";
import { Toolbar, Typography } from "@mui/material";

import { StoreContext, initialStore } from "./store";
import AppHeader from "./components/AppHeader";
import AppFooter from "./components/AppFooter";

const mainContainerStyles = {
  minHeight: 'calc(100vh - 64px)'
};

const App = () => {
  const [store, setStore] = useState(initialStore);

  return (
    <StoreContext.Provider value={{ store, setStore }}>
      <div className="app">
        <AppHeader />
        <Toolbar />
        <main style={mainContainerStyles}>
          hi
        </main>
        <AppFooter />
      </div>
    </StoreContext.Provider>
  );
};

export default App;
