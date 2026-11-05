import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Cores, fontes e granulado vêm do guia da marca (fonte única)
import '../../../ArteVisual/identidade/tokens.css'
import '../estilos.css'

/** Renderiza uma página no #root. */
export function montar(pagina) {
  createRoot(document.getElementById('root')).render(<StrictMode>{pagina}</StrictMode>)
}
