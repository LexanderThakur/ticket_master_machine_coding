import axios from "axios";

const api = import.meta.env.VITE_API_URL;

export async function login(username, password) {
  const response = await axios.post(api + "/auth/login/", {
    username,
    password,
  });

  return response.data;
}

export async function register(username, password) {
  const response = await axios.post(api + "/auth/register/", {
    username,
    password,
  });

  return response.data;
}
