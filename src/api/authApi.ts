import { LoginPayload } from "../features/auth/authSlice";
import { baseAxios } from "./baseAxios";

export const authApi = {
  login(params: LoginPayload) {
    return baseAxios.post('/auth/login', params)
  }
}