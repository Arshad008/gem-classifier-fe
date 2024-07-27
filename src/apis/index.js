import Axios from "axios";

const apiPaths = {
  signUp: "user",
};

export const signUpUser = async (data) => {
  return Axios.post(
    `${process.env.REACT_APP_REST_API_BASE_URL}/${apiPaths.signUp}`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((res) => res.data)
    .catch((err) => err);
};
