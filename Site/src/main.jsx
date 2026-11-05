import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Cores, fontes e granulado vêm do guia da marca (fonte única)
import '../../ArteVisual/identidade/tokens.css'
import './estilos.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
