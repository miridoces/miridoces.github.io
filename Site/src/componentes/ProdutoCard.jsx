import { CATEGORIAS, formatarPreco } from '../lib/conteudo.js'
import { linkEncomenda } from '../lib/contato.js'
import { url } from '../lib/caminhos.js'

export default function ProdutoCard({ produto, loja, titulo: Titulo = 'h2' }) {
  const { nome, categoria, preco, unidade, foto, maisVendido } = produto.dados
  const { Descricao } = produto
  const contato = linkEncomenda(loja, nome)
  const valor = formatarPreco(preco)
  return (
    <article className="produto">
      {foto ? (
        <img className="produto__foto" src={url(`fotos/${foto}`)} alt={nome} loading="lazy" />
      ) : (
        <div className="produto__foto produto__foto--vazia" role="img" aria-label={`Foto de ${nome} em breve`}>
          <span>foto em breve</span>
        </div>
      )}
      <div className="produto__corpo">
        <div className="produto__selos">
          <span className="etiqueta">{CATEGORIAS[categoria]}</span>
          {maisVendido && <span className="etiqueta etiqueta--vendido">Mais vendido</span>}
        </div>
        <Titulo className="produto__nome">{nome}</Titulo>
        <div className="produto__desc"><Descricao /></div>
        <p className="produto__preco">
          {valor ? <><strong>{valor}</strong>{unidade && <span> {unidade}</span>}</> : 'Preço sob consulta'}
        </p>
        {contato.canal && (
          <a className="botao botao--primario produto__cta" href={contato.href} target="_blank" rel="noopener">
            Encomendar pelo {contato.canal}
          </a>
        )}
      </div>
    </article>
  )
}
