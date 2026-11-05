import { montar } from './montar.jsx'
import Cabecalho from '../componentes/Cabecalho.jsx'
import Cardapio from '../componentes/Cardapio.jsx'
import { Rodape } from '../componentes/Secoes.jsx'
import { dadosLoja, produtos } from '../lib/conteudo.js'

function PaginaCardapio() {
  return (
    <>
      <a className="pular" href="#conteudo">Pular para o conteúdo</a>
      <Cabecalho loja={dadosLoja} pagina="cardapio" />
      <main id="conteudo">
        <Cardapio produtos={produtos} loja={dadosLoja} />
      </main>
      <Rodape loja={dadosLoja} />
    </>
  )
}

montar(<PaginaCardapio />)
