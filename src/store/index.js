import React from "react";
import { getAuthUserIdFromLocalStorage } from "../helpers";

export const StoreContext = React.createContext(null);

export const initialStore = {
  isLoading: false,
  authUserId: getAuthUserIdFromLocalStorage(),
  authUser: undefined,
};
