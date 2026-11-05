import { montar } from './montar.jsx'
import Cabecalho from '../componentes/Cabecalho.jsx'
import Abertura from '../componentes/Abertura.jsx'
import MaisVendidos from '../componentes/MaisVendidos.jsx'
import { Encomendas, Rodape, Sobre } from '../componentes/Secoes.jsx'
import { ComoEncomendar, Sobre as TextoSobre, dadosEncomendas, dadosLoja, maisVendidos } from '../lib/conteudo.js'

function PaginaInicio() {
  return (
    <>
      <a className="pular" href="#conteudo">Pular para o conteúdo</a>
      <Cabecalho loja={dadosLoja} pagina="inicio" />
      <main id="conteudo">
        <Abertura loja={dadosLoja} />
        <MaisVendidos produtos={maisVendidos} loja={dadosLoja} />
        <Sobre Texto={TextoSobre} />
        <Encomendas dados={dadosEncomendas} Texto={ComoEncomendar} loja={dadosLoja} />
      </main>
      <Rodape loja={dadosLoja} />
    </>
  )
}

montar(<PaginaInicio />)
