import Cabecalho from './componentes/Cabecalho.jsx'
import Inicio from './componentes/Inicio.jsx'
import Cardapio from './componentes/Cardapio.jsx'
import { Encomendas, Rodape, Sobre } from './componentes/Secoes.jsx'
import { ComoEncomendar, Sobre as TextoSobre, dadosEncomendas, dadosLoja, produtos } from './lib/conteudo.js'

export default function App() {
  return (
    <>
      <a className="pular" href="#cardapio">Pular para o cardápio</a>
      <Cabecalho loja={dadosLoja} />
      <main>
        <Inicio loja={dadosLoja} />
        <Cardapio produtos={produtos} loja={dadosLoja} />
        <Sobre Texto={TextoSobre} />
        <Encomendas dados={dadosEncomendas} Texto={ComoEncomendar} loja={dadosLoja} />
      </main>
      <Rodape loja={dadosLoja} />
    </>
  )
}
