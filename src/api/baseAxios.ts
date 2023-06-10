import axios from "axios";

export const baseAxios = axios.create({
  baseURL: "https://chat-app-liard-zeta.vercel.app/api/",
  timeout: 5000,
});