/**
 * src/App.jsx
 */


import {
  HashRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import './css/app.css'
import {
  Frame,
  Home,
  NotFound
} from './pages'
import { Provider } from './state'


export const App = () => {
  return (
    <Router>
      <Provider>
        <Routes>
          <Route path="/" element={<Frame />}>
            <Route
              index
              element={<Home />}
            />
            <Route
              path="/:group/:name/*"
              element={<Home />}
            />
            <Route
              path="/:group"
              element={<Home />}
            />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Provider>
    </Router>
  )
}