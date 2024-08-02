import React, { useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import { getAuthUser } from "./apis";
import { StoreContext } from "./store";
import HomePage from "./pages/home";
import SignUpPage from "./pages/signup";
import SignInPage from "./pages/signin";

const AppRoutes = () => {
  const { store, setStore } = useContext(StoreContext);
  console.log("store", store);

  useEffect(() => {
    if (store.authUserId && !store.authUser) {
      getAuthUserData();
    }
  }, [store.authUserId]);

  const updateStore = (attributes = {}) => {
    setStore((prevState) => ({
      ...prevState,
      ...attributes,
    }));
  };

  const getAuthUserData = async () => {
    await getAuthUser()
      .then((res) => {
        console.log("res", res);
        if (res.success && res.data) {
          console.log("res.data", res.data);
          updateStore({
            authUser: res.data,
          });
        }
      })
      .catch((err) => console.error("auth error", err));
    console.log("store 2", store);
  };

  return (
    <Routes>
      <Route index path="/" element={<HomePage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/sign-in" element={<SignInPage />} />
    </Routes>
  );
};

export default AppRoutes;
