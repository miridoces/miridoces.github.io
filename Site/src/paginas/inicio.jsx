import { montar } from './montar.jsx'
import Cabecalho from '../componentes/Cabecalho.jsx'
import Abertura from '../componentes/Abertura.jsx'
import Destaques from '../componentes/Destaques.jsx'
import { Encomendas, FestaOnline, Rodape, Sobre } from '../componentes/Secoes.jsx'
import {
  ComoEncomendar, Sobre as TextoSobre, TextoDestaques, TextoFestaOnline,
  dadosDestaques, dadosEncomendas, dadosFestaOnline, dadosLoja, destaques,
} from '../lib/conteudo.js'

function PaginaInicio() {
  return (
    <>
      <a className="pular" href="#conteudo">Pular para o conteúdo</a>
      <Cabecalho loja={dadosLoja} pagina="inicio" />
      <main id="conteudo">
        <Abertura loja={dadosLoja} />
        <Destaques destaques={destaques} titulo={dadosDestaques.titulo} Texto={TextoDestaques} />
        <FestaOnline dados={dadosFestaOnline} Texto={TextoFestaOnline} loja={dadosLoja} />
        <Sobre Texto={TextoSobre} />
        <Encomendas dados={dadosEncomendas} Texto={ComoEncomendar} loja={dadosLoja} />
      </main>
      <Rodape loja={dadosLoja} />
    </>
  )
}

montar(<PaginaInicio />)
