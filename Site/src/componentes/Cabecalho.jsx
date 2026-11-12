import logo from '../../../ArteVisual/identidade/logo/miridoces-principal.svg'
import { linkEncomenda } from '../lib/contato.js'
import { PAGINAS } from '../lib/caminhos.js'

/** `pagina`: "inicio" ou "cardapio", para marcar o link da página atual. */
export default function Cabecalho({ loja, pagina }) {
  const contato = linkEncomenda(loja)
  return (
    <header className="cabecalho">
      <div className="cabecalho__in">
        <a href={PAGINAS.inicio} className="cabecalho__logo" aria-label={`${loja.nome}, página inicial`}>
          <img src={logo} alt="" width="150" height="28" />
        </a>
        <nav aria-label="Navegação principal" className="cabecalho__nav">
          <a href={PAGINAS.inicio}>Início</a>
          <a href={PAGINAS.cardapio} aria-current={pagina === 'cardapio' ? 'page' : undefined}>Cardápio</a>
          <a href={PAGINAS.sobre}>Sobre</a>
          <a href={PAGINAS.encomendas}>Encomendas</a>
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
