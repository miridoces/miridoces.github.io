import { useEffect, useState } from 'react'
import ProdutoCard from './ProdutoCard.jsx'
import { CATEGORIAS } from '../lib/conteudo.js'

// O filtro fica no endereço (ex.: /cardapio/#bolos) para dar para compartilhar o link.
function filtroDoEndereco() {
  const h = decodeURIComponent(window.location.hash.slice(1))
  return h in CATEGORIAS ? h : 'todos'
}

export default function Cardapio({ produtos, loja }) {
  const [filtro, setFiltro] = useState(filtroDoEndereco)

  useEffect(() => {
    const aoMudar = () => setFiltro(filtroDoEndereco())
    window.addEventListener('hashchange', aoMudar)
    return () => window.removeEventListener('hashchange', aoMudar)
  }, [])

  function escolher(c) {
    setFiltro(c)
    const destino = c === 'todos' ? window.location.pathname : `#${c}`
    window.history.replaceState(null, '', destino)
  }

  const presentes = Object.keys(CATEGORIAS).filter((c) => produtos.some((p) => p.dados.categoria === c))
  const visiveis = filtro === 'todos' ? produtos : produtos.filter((p) => p.dados.categoria === filtro)

  return (
    <section className="secao pagina-cardapio" aria-labelledby="cardapio-titulo">
      <div className="secao__in">
        <div className="pagina-cardapio__topo">
          <h1 id="cardapio-titulo">Cardápio</h1>
          <p>Tudo feito à mão, sob encomenda. Escolha o seu e chame a gente para combinar data e detalhes.</p>
        </div>
        {presentes.length > 1 && (
          <div className="filtros" role="group" aria-label="Filtrar por categoria">
            {['todos', ...presentes].map((c) => (
              <button key={c} type="button" aria-pressed={filtro === c} onClick={() => escolher(c)}>
                {c === 'todos' ? 'Todos' : CATEGORIAS[c]}
              </button>
            ))}
          </div>
        )}
        {visiveis.length ? (
          <div className="produtos" aria-live="polite">
            {visiveis.map((p) => <ProdutoCard key={p.slug} produto={p} loja={loja} />)}
          </div>
        ) : (
          <p className="vazio">O cardápio está sendo atualizado. Chame a gente para saber o que está saindo do forno.</p>
        )}
      </div>
    </section>
  )
}
