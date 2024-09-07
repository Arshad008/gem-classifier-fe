import React, { useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import { getAuthUser } from "./apis";
import { StoreContext } from "./store";
import HomePage from "./pages/home";
import SignUpPage from "./pages/signup";
import SignInPage from "./pages/signin";
import PredictPage from "./pages/predict";

const AppRoutes = () => {
  const { store, setStore } = useContext(StoreContext);

  useEffect(() => {
    getAuthUserData();
  }, [store.authUserId]);

  const updateStore = (attributes = {}) => {
    setStore((prevState) => ({
      ...prevState,
      ...attributes,
    }));
  };

  const getAuthUserData = async () => {
    if (store.authUserId && !store.authUser) {
      updateStore({ isLoading: true });

      await getAuthUser(store.authUserId)
        .then((res) => {
          if (res.success && res.data) {
            updateStore({
              authUser: res.data,
            });
          }
        })
        .catch((err) => console.error("auth error", err));

      updateStore({ isLoading: false });
    }
  };

  return (
    <Routes>
      <Route index path="/" element={<HomePage />} />
      <Route index path="/predict" element={<PredictPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/sign-in" element={<SignInPage />} />
    </Routes>
  );
};

export default AppRoutes;
