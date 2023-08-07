import { Redirect } from "react-router"
import { getToken } from "../util/auth"

export const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  if (!getToken()) {
    return <Redirect to={'/login'} />
  }

  return children
}

