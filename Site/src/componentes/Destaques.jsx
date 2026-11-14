import { useEffect, useState } from 'react'
import { PAGINAS, url } from '../lib/caminhos.js'

/** Tempo que cada foto fica na tela, em milissegundos. */
const INTERVALO = 4000

function preferePoucoMovimento() {
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
}

/** Fotos dos produtos da categoria, uma de cada vez. Decorativo: o nome da categoria está no cartão. */
function Carrossel({ fotos, parado, atraso }) {
  const [atual, setAtual] = useState(0)
  const total = fotos.length

  useEffect(() => {
    if (parado || total < 2) return
    const avancar = () => setAtual((i) => (i + 1) % total)
    let repetir
    // o atraso desencontra os cartões, para as fotos não trocarem todas ao mesmo tempo
    const primeira = setTimeout(() => {
      avancar()
      repetir = setInterval(avancar, INTERVALO)
    }, INTERVALO + atraso)
    return () => {
      clearTimeout(primeira)
      clearInterval(repetir)
    }
  }, [parado, total, atraso])

  if (!total) {
    return <div className="carrossel carrossel--vazio" aria-hidden="true"><span>fotos em breve</span></div>
  }
  return (
    <div className="carrossel" aria-hidden="true">
      {fotos.map((f, i) => (
        <img key={f.foto} className={i === atual ? 'ativa' : undefined} src={url(`fotos/${f.foto}`)} alt="" loading="lazy" />
      ))}
      {total > 1 && (
        <span className="carrossel__pontos">
          {fotos.map((f, i) => <i key={f.foto} className={i === atual ? 'ativo' : undefined} />)}
        </span>
      )}
    </div>
  )
}

/** Cartão de uma categoria: o cartão inteiro leva ao cardápio com o filtro dela aplicado. */
function CartaoCategoria({ destaque, pausado, atraso }) {
  const { categoria, nome, total, fotos, recado } = destaque
  const [emUso, setEmUso] = useState(false) // mouse em cima ou foco do teclado: segura a foto atual
  return (
    <li>
      <a
        className="categoria"
        href={`${PAGINAS.cardapio}#${categoria}`}
        onMouseEnter={() => setEmUso(true)}
        onMouseLeave={() => setEmUso(false)}
        onFocus={() => setEmUso(true)}
        onBlur={() => setEmUso(false)}
      >
        <Carrossel fotos={fotos} parado={pausado || emUso} atraso={atraso} />
        <div className="categoria__corpo">
          <h3 className="categoria__nome">{nome}</h3>
          <span className="categoria__qtd">{total} {total === 1 ? 'opção' : 'opções'}</span>
          {recado && <span className="categoria__recado">{recado}</span>}
          <span className="link-seta">Ver no cardápio</span>
        </div>
      </a>
    </li>
  )
}

/** Seção de destaques da página inicial (texto em destaques.mdx): um cartão por categoria do cardápio. */
export default function Destaques({ destaques, titulo, Texto }) {
  const [pausado, setPausado] = useState(preferePoucoMovimento)
  const temCarrossel = destaques.some((d) => d.fotos.length > 1)

  return (
    <section id="destaques" className="secao" aria-labelledby="destaques-titulo">
      <div className="secao__in">
        <div className="secao__topo">
          <h2 id="destaques-titulo">{titulo || 'Destaques'}</h2>
          <div className="destaques__acoes">
            {temCarrossel && (
              <button type="button" className="destaques__pausa" aria-pressed={pausado} onClick={() => setPausado((p) => !p)}>
                Pausar fotos
              </button>
            )}
            <a className="link-seta" href={PAGINAS.cardapio}>Ver cardápio completo</a>
          </div>
        </div>
        {destaques.length > 0 ? (
          <ul className="categorias">
            {destaques.map((d, i) => (
              <CartaoCategoria key={d.categoria} destaque={d} pausado={pausado} atraso={i * 700} />
            ))}
          </ul>
        ) : (
          <p className="vazio">
            O cardápio está sendo atualizado. <a href={PAGINAS.cardapio}>Veja o que já está lá</a>.
          </p>
        )}
        {Texto && <div className="texto destaques__texto"><Texto /></div>}
      </div>
    </section>
  )
}
