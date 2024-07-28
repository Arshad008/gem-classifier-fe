import Axios from "axios";

const apiPaths = {
  signUp: "user",
  signIn: "user/login",
};

const api = Axios.create({
  baseURL: `${process.env.REACT_APP_REST_API_BASE_URL}`,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

export const signUpUser = async (data) => {
  return api
    .post(`${process.env.REACT_APP_REST_API_BASE_URL}/${apiPaths.signUp}`, data)
    .then((res) => res.data)
    .catch((err) => err);
};

export const signInUser = async (data) => {
  return api
    .post(`${process.env.REACT_APP_REST_API_BASE_URL}/${apiPaths.signIn}`, data)
    .then((res) => res.data)
    .catch((err) => err);
};
