import { history } from "../util/history"

export const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  if (!localStorage.getItem('token')) {
    history.push('/login')
    return <></>
  }

  return children
}
