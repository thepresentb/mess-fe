import { Route, Switch } from "react-router-dom"
import { Link } from "react-router-dom"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { PrivateRoute } from "./common/PrivateRoute"
import { NotFound } from "./common/NotFound"

const lngs = {
  en: { nativeName: 'English' },
  vi: { nativeName: 'Tiếng Việt' }
};

function App() {
  const [darkToggle, setDarkToggle] = useState(false);
  const { t, i18n } = useTranslation();

  return (
    <div className={`${darkToggle && 'dark'}`}>
      {/* test route */}
      <div className="flex">
        <div className="grow">
          <Link className="mr-4" to={'/chat'}>{t('nav.chat')}</Link>
          <Link className="mr-4" to={'/login'}>{t('nav.login')}</Link>
          <Link className="mr-4" to={'/abc'}>not found</Link>
        </div>
        <div className="mr-4">
          {Object.keys(lngs).map((lng) => (
            <button key={lng} style={{ fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal' }} type="submit" onClick={() => i18n.changeLanguage(lng)}>
              {lngs[lng].nativeName}
            </button>
          ))}
        </div>
        <label className="toggleDarkBtn">
          <input type="checkbox" onClick={() => setDarkToggle(!darkToggle)} />
          <span className="slideBtnTg round">dark mode</span>
        </label>
      </div>

      {/* main */}
      <Switch>
        <Route path="/login"><>Login</></Route >
        <Route
          path="/chat"
        >
          <PrivateRoute>
            <>app</>
          </PrivateRoute>
        </Route>
        <Route path={'*'}><NotFound /></Route>

      </Switch>

      {/* test i18n */}
      <p className="dark:bg-slate-900 dark:text-white">
        {t('description.part1')}
      </p>
      <a className="dark:bg-slate-900 dark:text-white">
        {t('description.part2')}
      </a>
    </div>)
}

export default App
