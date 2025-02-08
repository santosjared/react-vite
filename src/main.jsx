import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import store from './store/store.js'
import { Provider } from 'react-redux'
import './index.css'
import App from './App.jsx'
import ThemeComponent from './theme/ThemeComponent.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Provider store={store}>
        <BrowserRouter>
        <ThemeComponent>
        <App />
        </ThemeComponent>
        </BrowserRouter>
      </Provider>
  </StrictMode>
)
