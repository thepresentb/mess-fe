import { BaseResponsive } from "./BaseResponsive"

interface AuthData {
  accessToken: string,
  user?: User,
}

export interface User {
  id: number,
  firstName: string,
  lastName: string
}

export interface AuthRes extends BaseResponsive<AuthData> { }

