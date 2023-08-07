
import { LoginPayload } from "./typing/payload/LoginPayload";
import { request } from "./baseAxios";
import { AuthRes } from "./typing/responsive/AuthRes"
import { RegisterPayload } from "./typing/payload/RegisterPayload";
import { VerifyCodePayload } from "./typing/payload/VerifiCodePayload";
import { BaseResponsive } from "./typing/responsive/BaseResponsive";

export const authApi = {
  async login(payload: LoginPayload): Promise<AuthRes> {
    return await request().post('/auths/login', payload)
  },

  async register(payload: RegisterPayload): Promise<AuthRes> {
    return await request().post('/users', payload)
  },

  async verifyCode(payload: VerifyCodePayload): Promise<BaseResponsive<null>> {
    return await request().post('/users/verify-code', payload)
  }
}
