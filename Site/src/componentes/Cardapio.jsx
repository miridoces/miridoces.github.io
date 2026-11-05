import { useState } from 'react'
import { CATEGORIAS, formatarPreco } from '../lib/conteudo.js'
import { linkEncomenda } from '../lib/contato.js'

function ProdutoCard({ produto, loja }) {
  const { nome, categoria, preco, unidade, foto } = produto.dados
  const { Descricao } = produto
  const contato = linkEncomenda(loja, nome)
  const valor = formatarPreco(preco)
  return (
    <article className="produto">
      {foto ? (
        <img className="produto__foto" src={`${import.meta.env.BASE_URL}fotos/${foto}`} alt={nome} loading="lazy" />
      ) : (
        <div className="produto__foto produto__foto--vazia" role="img" aria-label={`Foto de ${nome} em breve`}>
          <span>foto em breve</span>
        </div>
      )}
      <div className="produto__corpo">
        <span className="etiqueta">{CATEGORIAS[categoria]}</span>
        <h3>{nome}</h3>
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

export default function Cardapio({ produtos, loja }) {
  const [filtro, setFiltro] = useState('todos')
  const presentes = Object.keys(CATEGORIAS).filter((c) => produtos.some((p) => p.dados.categoria === c))
  const visiveis = filtro === 'todos' ? produtos : produtos.filter((p) => p.dados.categoria === filtro)

  return (
    <section id="cardapio" className="secao" aria-labelledby="cardapio-titulo">
      <div className="secao__in">
        <div className="secao__topo">
          <h2 id="cardapio-titulo">Cardápio</h2>
          {presentes.length > 1 && (
            <div className="filtros" role="group" aria-label="Filtrar por categoria">
              {['todos', ...presentes].map((c) => (
                <button key={c} type="button" aria-pressed={filtro === c} onClick={() => setFiltro(c)}>
                  {c === 'todos' ? 'Todos' : CATEGORIAS[c]}
                </button>
              ))}
            </div>
          )}
        </div>
        {visiveis.length ? (
          <div className="produtos">
            {visiveis.map((p) => <ProdutoCard key={p.slug} produto={p} loja={loja} />)}
          </div>
        ) : (
          <p className="vazio">O cardápio está sendo atualizado. Chame a gente para saber o que está saindo do forno.</p>
        )}
      </div>
    </section>
  )
}
