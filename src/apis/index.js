import Axios from "axios";

import { getAuthUserIdFromLocalStorage } from "../helpers";

const apiPaths = {
  user: "user",
};

const api = Axios.create({
  baseURL: `${process.env.REACT_APP_REST_API_BASE_URL}`,
  headers: {
    auth: getAuthUserIdFromLocalStorage(),
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

export const signUpUser = async (data) => {
  return api
    .post(`${process.env.REACT_APP_REST_API_BASE_URL}/${apiPaths.user}`, data)
    .then((res) => res.data)
    .catch((err) => err);
};

export const signInUser = async (data) => {
  return api
    .post(
      `${process.env.REACT_APP_REST_API_BASE_URL}/${apiPaths.user}/login`,
      data
    )
    .then((res) => res.data)
    .catch((err) => err);
};

export const getAuthUser = () => {
  return api
    .get(`${process.env.REACT_APP_REST_API_BASE_URL}/${apiPaths.user}`)
    .then((res) => res.data)
    .catch((err) => err);
};
