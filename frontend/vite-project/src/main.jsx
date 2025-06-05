import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Lobby from './lobby.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Lobby />
  </StrictMode>,
)
