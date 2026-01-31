import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import App from './App.jsx'
import Store from './app/Store.jsx'
import { Provider } from "react-redux";
createRoot(document.getElementById('root')).render(
  <>
 <BrowserRouter>
 <Provider store={Store}>
    <App />
 </Provider>
  </BrowserRouter>
  </>
 ,
)
