import Axios from "axios";

import { getAuthUserIdFromLocalStorage } from "../helpers";

const apiPaths = {
  user: "user",
  predict: "predict",
  history: "history",
};

const defaultHeaders = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  auth: getAuthUserIdFromLocalStorage(),
};

const api = Axios.create({
  baseURL: `${process.env.REACT_APP_REST_API_BASE_URL}`,
  headers: {
    ...defaultHeaders,
  },
});

export const signUpUser = async (data) => {
  return api
    .post(`/${apiPaths.user}`, data)
    .then((res) => res.data)
    .catch((err) => err);
};

export const signInUser = async (data) => {
  return api
    .post(`/${apiPaths.user}/login`, data)
    .then((res) => res.data)
    .catch((err) => err);
};

export const getAuthUser = (userId) => {
  return api
    .get(`/${apiPaths.user}`, {
      headers: {
        ...defaultHeaders,
        auth: userId,
      },
    })
    .then((res) => res.data)
    .catch((err) => err);
};

export const uploadFile = (data) => {
  return api
    .post(`/${apiPaths.predict}`, data, {
      headers: {
        ...defaultHeaders,
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res.data)
    .catch((err) => err);
};

export const getPredictionHistory = () => {
  return api
    .get(`/${apiPaths.history}`)
    .then((res) => res.data)
    .catch((err) => err);
};
