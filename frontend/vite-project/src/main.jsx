import { StrictMode } from 'react'
import { ReactDom, createRoot } from 'react-dom/client'
import { BrowserRouter} from 'react-router-dom';
import './index.css'
import App from './App.jsx'
import Lobby from './lobby.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
