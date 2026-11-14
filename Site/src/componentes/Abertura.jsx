import simbolo from '../../../ArteVisual/identidade/logo/web/simbolo-640.png'
import { linkEncomenda } from '../lib/contato.js'
import { PAGINAS } from '../lib/caminhos.js'

export default function Abertura({ loja }) {
  const contato = linkEncomenda(loja)
  return (
    <section id="inicio" className="inicio" aria-labelledby="inicio-titulo">
      <div className="inicio__in">
        <div className="inicio__texto">
          <h1 id="inicio-titulo">{loja.titulo}</h1>
          {loja.subtitulo && <p className="inicio__sub">{loja.subtitulo}</p>}
          <div className="inicio__acoes">
            {contato.canal && (
              <a className="botao botao--primario" href={contato.href} target="_blank" rel="noopener">
                Encomendar pelo {contato.canal}
              </a>
            )}
            <a className="botao botao--claro" href={PAGINAS.cardapio}>Ver cardápio</a>
          </div>
        </div>
        <img className="inicio__simbolo" src={simbolo} alt="" width="420" height="302" fetchpriority="high" />
      </div>
    </section>
  )
}
