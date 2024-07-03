import axios from "axios";

export const authSignup = (email: string, password: string) => {
  return axios.post("/api/signup", { email, password });
};

export const authLogin = (email: string, password: string) => {
  return axios.post("/api/login", { email, password });
};

