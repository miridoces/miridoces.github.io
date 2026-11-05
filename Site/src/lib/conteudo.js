// Carrega e valida o conteúdo editável do site (arquivos .mdx em src/conteudo).
import * as loja from '../conteudo/loja.mdx'
import * as encomendas from '../conteudo/encomendas.mdx'

export const CATEGORIAS = {
  bolos: 'Bolos',
  biscoitos: 'Biscoitos',
  sobremesas: 'Sobremesas',
}

const modulos = import.meta.glob('../conteudo/produtos/*.mdx', { eager: true })

/** Lista os problemas de um produto; vazio quando está tudo certo. */
export function validarProduto(fm) {
  const erros = []
  if (!fm || typeof fm !== 'object') return ['faltam os campos entre as linhas ---']
  if (!fm.nome || typeof fm.nome !== 'string') erros.push('campo "nome" vazio')
  if (!(fm.categoria in CATEGORIAS)) {
    erros.push(`categoria "${fm.categoria ?? ''}" inválida (use: ${Object.keys(CATEGORIAS).join(', ')})`)
  }
  if (fm.preco != null && (typeof fm.preco !== 'number' || fm.preco < 0)) {
    erros.push('campo "preco" deve ser só o número, ex.: 120 ou 89.9')
  }
  if ('destaque' in fm) erros.push('o campo "destaque" mudou de nome: use "maisVendido: true"')
  if (fm.foto != null && !/^[\w.-]+\.(jpe?g|png|webp)$/i.test(fm.foto)) {
    erros.push('campo "foto" deve ser o nome do arquivo em public/fotos, ex.: bolo.jpg')
  }
  return erros
}

/** Lista os problemas dos dados gerais da loja. */
export function validarLoja(fm) {
  const erros = []
  if (!fm?.nome) erros.push('campo "nome" vazio')
  if (!fm?.titulo) erros.push('campo "titulo" vazio')
  if (fm?.whatsapp && !/^55\d{10,11}$/.test(String(fm.whatsapp))) {
    erros.push('campo "whatsapp" deve ter só números, com 55 + DDD, ex.: 5511987654321')
  }
  if (!fm?.whatsapp && !fm?.instagram) erros.push('preencha "whatsapp" ou "instagram" para receber encomendas')
  return erros
}

/** Todos os arquivos de produto, com os erros de cada um (usado pelos testes). */
export const arquivosDeProduto = Object.entries(modulos).map(([caminho, mod]) => ({
  arquivo: caminho.split('/').pop(),
  slug: caminho.split('/').pop().replace(/\.mdx$/, ''),
  dados: mod.frontmatter ?? {},
  Descricao: mod.default,
  erros: validarProduto(mod.frontmatter),
}))

/** Produtos válidos e disponíveis: mais vendidos primeiro, depois pela ordem e pelo nome. */
export const produtos = arquivosDeProduto
  .filter((p) => {
    if (p.erros.length) {
      console.error(`[MiriDoces] ${p.arquivo} ignorado: ${p.erros.join('; ')}`)
      return false
    }
    return p.dados.disponivel !== false
  })
  .sort(
    (a, b) =>
      Number(Boolean(b.dados.maisVendido)) - Number(Boolean(a.dados.maisVendido)) ||
      (a.dados.ordem ?? 999) - (b.dados.ordem ?? 999) ||
      a.dados.nome.localeCompare(b.dados.nome, 'pt-BR'),
  )

/** Quantos mais vendidos aparecem na página inicial. */
export const LIMITE_MAIS_VENDIDOS = 3
export const maisVendidos = produtos.filter((p) => p.dados.maisVendido).slice(0, LIMITE_MAIS_VENDIDOS)

export const dadosLoja = loja.frontmatter ?? {}
export const Sobre = loja.default
export const dadosEncomendas = encomendas.frontmatter ?? {}
export const ComoEncomendar = encomendas.default

const reais = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
export function formatarPreco(preco) {
  return typeof preco === 'number' ? reais.format(preco) : null
}
