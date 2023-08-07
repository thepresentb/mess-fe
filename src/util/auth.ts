import dayjs from "dayjs";
import { parseJson } from "./json";

export const getToken = (): string | undefined => {
  const data = localStorage.getItem("auth");
  const auth = parseJson<string>(data);
  return auth;
};

export const setToken = (t: string) => {
  const expIn = new Date();
  const b = dayjs(expIn).add(25, 'day');
  console.log(b.toISOString());
  console.log(new Date() > new Date(b.toISOString()))
  localStorage.setItem("auth", JSON.stringify(t));
};

export const removeToken = () => {
  localStorage.removeItem("auth");
};