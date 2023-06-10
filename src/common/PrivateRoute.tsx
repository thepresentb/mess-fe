import { Redirect } from "react-router"

export const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  if (!localStorage.getItem('token')) {
    return <Redirect to={'/login'}/>
  }

  return children
}

