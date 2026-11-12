import ProdutoCard from './ProdutoCard.jsx'
import { PAGINAS } from '../lib/caminhos.js'

/** Seção da página inicial com os produtos marcados como mais vendidos (até 3). */
export default function MaisVendidos({ produtos, loja }) {
  return (
    <section id="mais-vendidos" className="secao" aria-labelledby="mais-vendidos-titulo">
      <div className="secao__in">
        <div className="secao__topo">
          <h2 id="mais-vendidos-titulo">Mais vendidos</h2>
          <a className="link-seta" href={PAGINAS.cardapio}>Ver cardápio completo</a>
        </div>
        {produtos.length > 0 ? (
          <div className="produtos">
            {produtos.map((p) => <ProdutoCard key={p.slug} produto={p} loja={loja} titulo="h3" />)}
          </div>
        ) : (
          <p className="vazio">
            Bolos, biscoitos e sobremesas feitos à mão. <a href={PAGINAS.cardapio}>Veja o cardápio completo</a>.
          </p>
        )}
      </div>
    </section>
  )
}
