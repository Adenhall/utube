import axios from "axios";

type User = {
  user_id: string;
  email: string;
};

export const signIn = (email: string, password: string) => {
  return axios.post<User>("/api/signin", { email, password });
};

export const logout = () => {
  return axios.post("/api/logout");
};

export const ping = () => {
  return axios.get<User>("/api/ping");
};
