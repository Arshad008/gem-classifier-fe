import React, { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { StoreContext, initialStore } from "./store";

const App = () => {
  const [store, setStore] = useState(initialStore);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <div>Hello world!</div>,
    },
  ]);

  return (
    <StoreContext.Provider value={{ store, setStore }}>
      <div className="app">
        <main>
          <RouterProvider router={router} />
        </main>
      </div>
    </StoreContext.Provider>
  );
};

export default App;
