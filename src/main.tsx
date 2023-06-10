import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'
import { ConnectedRouter } from 'connected-react-router'
import { history } from './util/history.ts'
import '../src/i18n/i18n.ts';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>
  // </React.StrictMode>,
)
