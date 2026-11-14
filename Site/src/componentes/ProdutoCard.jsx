import { useEffect, useRef, useState } from 'react'
import { CATEGORIAS, formatarPreco } from '../lib/conteudo.js'
import { linkEncomenda } from '../lib/contato.js'
import { url } from '../lib/caminhos.js'

/**
 * Cartão do cardápio. Todos os cartões têm o mesmo formato: nome em até 2 linhas e descrição
 * em até 3. Se a descrição não couber, aparece "Ver detalhes", que abre o texto completo.
 */
export default function ProdutoCard({ produto, loja, titulo: Titulo = 'h2' }) {
  const { nome, categoria, preco, unidade, foto } = produto.dados
  const { Descricao, slug } = produto
  const contato = linkEncomenda(loja, nome)
  const valor = formatarPreco(preco)
  const descRef = useRef(null)
  const dialogoRef = useRef(null)
  const [cortado, setCortado] = useState(false)

  // descobre se a descrição (ou o nome) passou do espaço do cartão; refaz quando a largura muda
  useEffect(() => {
    const el = descRef.current
    if (!el) return
    const medir = () => {
      const nomeEl = el.parentElement.querySelector('.produto__nome')
      const passou = (e) => e && e.scrollHeight - e.clientHeight > 1
      setCortado(passou(el) || passou(nomeEl))
    }
    medir()
    const obs = new ResizeObserver(medir)
    obs.observe(el)
    document.fonts?.ready.then(medir)
    return () => obs.disconnect()
  }, [])

  const precoTexto = valor ? <><strong>{valor}</strong>{unidade && <span> {unidade}</span>}</> : 'Preço sob consulta'
  const botao = contato.canal && (
    <a className="botao botao--primario produto__cta" href={contato.href} target="_blank" rel="noopener">
      Encomendar pelo {contato.canal}
    </a>
  )

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
        </div>
        <Titulo className="produto__nome" title={nome}>{nome}</Titulo>
        <div className="produto__desc" ref={descRef}><Descricao /></div>
        <div className="produto__rodape">
          <p className="produto__preco">{precoTexto}</p>
          {cortado && (
            <button
              type="button"
              className="produto__mais"
              aria-haspopup="dialog"
              aria-controls={`detalhes-${slug}`}
              onClick={() => dialogoRef.current?.showModal()}
            >
              Ver detalhes<span className="visualmente-oculto"> de {nome}</span>
            </button>
          )}
        </div>
        {botao}
      </div>

      {cortado && (
        <dialog
          id={`detalhes-${slug}`}
          ref={dialogoRef}
          className="detalhes"
          aria-labelledby={`detalhes-${slug}-titulo`}
          onClick={(e) => e.target === e.currentTarget && e.currentTarget.close()}
        >
          <div className="detalhes__in">
            <button type="button" className="detalhes__fechar" onClick={() => dialogoRef.current?.close()} aria-label="Fechar">×</button>
            <span className="etiqueta">{CATEGORIAS[categoria]}</span>
            <h2 id={`detalhes-${slug}-titulo`} className="detalhes__nome">{nome}</h2>
            <div className="texto detalhes__desc"><Descricao /></div>
            <p className="produto__preco">{precoTexto}</p>
            {botao}
          </div>
        </dialog>
      )}
    </article>
  )
}
