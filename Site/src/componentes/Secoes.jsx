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

export function Encomendas({ dados, Texto, loja }) {
  const contato = linkEncomenda(loja)
  return (
    <section id="encomendas" className="secao" aria-labelledby="encomendas-titulo">
      <div className="secao__in encomendas">
        <h2 id="encomendas-titulo">{dados.titulo || 'Como encomendar'}</h2>
        <div className="texto encomendas__passos"><Texto /></div>
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
          {loja.whatsapp && <li><a href={`https://wa.me/${loja.whatsapp}`} target="_blank" rel="noopener">WhatsApp</a></li>}
          {loja.cidade && <li>{loja.cidade}</li>}
        </ul>
        <small>© {new Date().getFullYear()} {loja.nome}. Feito à mão, sob encomenda.</small>
      </div>
    </footer>
  )
}
