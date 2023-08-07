import { Route, Switch } from "react-router-dom"
import React, { useState } from "react"
import { PrivateRoute } from "./common/PrivateRoute"
import Login from "./feature/auth/page/Login"
import NotFound from "./common/NotFound"
import { Register } from "./feature/auth/page/Register"

function App() {
  const [darkToggle, setDarkToggle] = useState(false);

  return (
    <div className={`${darkToggle && 'dark'}`}>
      <Switch>
        <Route path="/login"><Login /></Route >
        <Route path="/register"><Register /></Route >
        <Route
          exact
          path="/"
        >
          <PrivateRoute>
            <>app</>
          </PrivateRoute>
        </Route>
        <Route path={'*'}><NotFound /></Route>

      </Switch>
    </div>)
}

export default React.memo(App)
