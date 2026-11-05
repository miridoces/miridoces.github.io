import logo from '../../../ArteVisual/identidade/logo/miridoces-principal.svg'
import { linkEncomenda } from '../lib/contato.js'

export default function Cabecalho({ loja }) {
  const contato = linkEncomenda(loja)
  return (
    <header className="cabecalho">
      <div className="cabecalho__in">
        <a href="#inicio" className="cabecalho__logo">
          <img src={logo} alt={loja.nome} width="150" height="28" />
        </a>
        <nav aria-label="Seções do site" className="cabecalho__nav">
          <a href="#cardapio">Cardápio</a>
          <a href="#sobre">Sobre</a>
          <a href="#encomendas">Encomendas</a>
        </nav>
        {contato.canal && (
          <a className="botao botao--primario cabecalho__cta" href={contato.href} target="_blank" rel="noopener">
            Encomendar
          </a>
        )}
      </div>
    </header>
  )
}
