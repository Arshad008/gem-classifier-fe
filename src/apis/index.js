import Axios from "axios";

import { getAuthUserIdFromLocalStorage } from "../helpers";

const apiPaths = {
  user: "user",
};

const defaultHeaders = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
};

const api = Axios.create({
  baseURL: `${process.env.REACT_APP_REST_API_BASE_URL}`,
  headers: {
    auth: getAuthUserIdFromLocalStorage(),
    ...defaultHeaders,
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

export const getAuthUser = (userId) => {
  return Axios.get(
    `${process.env.REACT_APP_REST_API_BASE_URL}/${apiPaths.user}`,
    {
      headers: {
        ...defaultHeaders,
        auth: userId,
      },
    }
  )
    .then((res) => res.data)
    .catch((err) => err);
};
