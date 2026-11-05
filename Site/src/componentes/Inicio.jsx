import { linkEncomenda } from '../lib/contato.js'

export default function Inicio({ loja }) {
  const contato = linkEncomenda(loja)
  return (
    <section id="inicio" className="inicio" aria-labelledby="inicio-titulo">
      <div className="inicio__in">
        <h1 id="inicio-titulo">{loja.titulo}</h1>
        {loja.subtitulo && <p className="inicio__sub">{loja.subtitulo}</p>}
        <div className="inicio__acoes">
          {contato.canal && (
            <a className="botao botao--destaque" href={contato.href} target="_blank" rel="noopener">
              Encomendar pelo {contato.canal}
            </a>
          )}
          <a className="botao botao--claro" href="#cardapio">Ver cardápio</a>
        </div>
      </div>
    </section>
  )
}
