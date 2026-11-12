import simbolo from '../../../ArteVisual/identidade/logo/miridoces-simbolo.svg'
import logoBranco from '../../../ArteVisual/identidade/logo/miridoces-branco.svg'
import { linkEncomenda, linkInstagram } from '../lib/contato.js'
import { PAGINAS } from '../lib/caminhos.js'

export function Sobre({ Texto }) {
  return (
    <section id="sobre" className="secao secao--branca" aria-labelledby="sobre-titulo">
      <div className="secao__in sobre">
        <img className="sobre__simbolo" src={simbolo} alt="" width="200" height="200" />
        <div className="texto">
          <h2 id="sobre-titulo">Sobre</h2>
          <Texto />
        </div>
      </div>
    </section>
  )
}

/** Seção "Festa on-line" (texto em festa-online.mdx). */
export function FestaOnline({ dados, Texto, loja }) {
  const contato = linkEncomenda(loja, dados.titulo || 'Festa on-line')
  const kit = Array.isArray(dados.kit) ? dados.kit : []
  return (
    <section id="festa-online" className="secao festa" aria-labelledby="festa-titulo">
      <div className="secao__in festa__in">
        <div className="texto festa__texto">
          {dados.selo && <span className="etiqueta">{dados.selo}</span>}
          <h2 id="festa-titulo">{dados.titulo || 'Festa on-line'}</h2>
          <Texto />
          <div className="festa__acoes">
            {contato.canal && (
              <a className="botao botao--destaque" href={contato.href} target="_blank" rel="noopener">
                Encomendar pelo {contato.canal}
              </a>
            )}
            <a className="botao botao--claro" href={`${PAGINAS.cardapio}#festa-online`}>Ver no cardápio</a>
          </div>
        </div>
        {kit.length > 0 && (
          <div className="festa__kit">
            <h3>Kit</h3>
            <ul>{kit.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
        )}
      </div>
    </section>
  )
}

export function Encomendas({ dados, Texto, loja }) {
  const contato = linkEncomenda(loja)
  return (
    <section id="encomendas" className="secao" aria-labelledby="encomendas-titulo">
      <div className="secao__in encomendas">
        <h2 id="encomendas-titulo">{dados.titulo || 'Como encomendar'}</h2>
        <div className="texto encomendas__passos"><Texto /></div>
        {loja.aviso && <p className="aviso">{loja.aviso}</p>}
        {contato.canal && (
          <a className="botao botao--primario" href={contato.href} target="_blank" rel="noopener">
            Encomendar pelo {contato.canal}
          </a>
        )}
      </div>
    </section>
  )
}

export function Rodape({ loja }) {
  const insta = linkInstagram(loja)
  return (
    <footer className="rodape">
      <div className="rodape__in">
        <img src={logoBranco} alt={loja.nome} width="150" height="28" />
        <ul>
          <li><a href={PAGINAS.cardapio}>Cardápio</a></li>
          {insta && <li><a href={insta} target="_blank" rel="noopener">Instagram @{loja.instagram}</a></li>}
          {loja.facebook && <li><a href={loja.facebook} target="_blank" rel="noopener">Facebook</a></li>}
          {loja.whatsapp && <li><a href={`https://wa.me/${loja.whatsapp}`} target="_blank" rel="noopener">WhatsApp</a></li>}
          {loja.cidade && <li>{loja.cidade}</li>}
        </ul>
        <small>© {new Date().getFullYear()} {loja.nome}. Feito à mão, sob encomenda.</small>
      </div>
    </footer>
  )
}
