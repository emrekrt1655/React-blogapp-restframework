import axios from "axios";

export const postData = async (path, data) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(`${path}`, data, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/jyson",
      Authorization: token ? "Token " + token : null,
    },
  });
  return response;
};
