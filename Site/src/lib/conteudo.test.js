import { describe, expect, it } from 'vitest'
import { CATEGORIAS, arquivosDeProduto, dadosDestaques, dadosLoja, destaques, produtos, validarDestaques, validarLoja, validarProduto } from './conteudo.js'
import { linkEncomenda } from './contato.js'

describe('conteúdo do site', () => {
  it('tem pelo menos um produto', () => {
    expect(arquivosDeProduto.length).toBeGreaterThan(0)
  })

  it.each(arquivosDeProduto.map((p) => [p.arquivo, p.erros]))('%s está preenchido corretamente', (_arquivo, erros) => {
    expect(erros).toEqual([])
  })

  it('dados da loja (loja.mdx) estão corretos', () => {
    expect(validarLoja(dadosLoja)).toEqual([])
  })

  it('não há dois produtos com o mesmo nome', () => {
    const nomes = arquivosDeProduto.map((p) => p.dados.nome)
    expect(new Set(nomes).size).toBe(nomes.length)
  })

  it('agrupa o cardápio na ordem das categorias', () => {
    const ordem = Object.keys(CATEGORIAS)
    const posicoes = produtos.map((p) => ordem.indexOf(p.dados.categoria))
    expect(posicoes).toEqual([...posicoes].sort((a, b) => a - b))
  })

  it('destaques.mdx só usa categorias que existem', () => {
    expect(validarDestaques(dadosDestaques)).toEqual([])
  })

  it('mostra as categorias de destaques.mdx que têm produtos, na ordem de lá, só com fotos da própria categoria', () => {
    const escolhidas = dadosDestaques.categorias.map((i) => i.categoria)
    const comProdutos = escolhidas.filter((c) => produtos.some((p) => p.dados.categoria === c))
    expect(destaques.map((d) => d.categoria)).toEqual(comProdutos)
    for (const d of destaques) {
      const daCategoria = produtos.filter((p) => p.dados.categoria === d.categoria)
      expect(d.total).toBe(daCategoria.length)
      expect(d.fotos.map((f) => f.foto)).toEqual(daCategoria.filter((p) => p.dados.foto).map((p) => p.dados.foto))
    }
  })
})

describe('validações', () => {
  it('recusa categoria e preço inválidos', () => {
    const erros = validarProduto({ nome: 'X', categoria: 'salgados', preco: 'R$ 10' })
    expect(erros).toHaveLength(2)
  })

  it('aceita produto sem preço e sem foto', () => {
    expect(validarProduto({ nome: 'X', categoria: 'bolos', preco: null, foto: null })).toEqual([])
  })

  it('recusa Facebook sem o endereço completo', () => {
    expect(validarLoja({ nome: 'X', titulo: 'Y', instagram: 'z', facebook: 'miria.confeitaria' })).toHaveLength(1)
    expect(validarLoja({ nome: 'X', titulo: 'Y', instagram: 'z', facebook: 'https://www.facebook.com/miria' })).toEqual([])
  })

  it('recusa categoria inexistente em destaques.mdx', () => {
    expect(validarDestaques({ categorias: [{ categoria: 'bolos' }, { categoria: 'biscoito' }] })).toHaveLength(1)
  })

  it('recusa WhatsApp com formatação', () => {
    expect(validarLoja({ nome: 'X', titulo: 'Y', whatsapp: '(11) 98765-4321' })).toHaveLength(1)
  })
})

describe('links de encomenda', () => {
  it('usa o WhatsApp com mensagem pronta quando há número', () => {
    const { href, canal } = linkEncomenda({ nome: 'MiriDoces', whatsapp: '5511987654321' }, 'Bolo de festa')
    expect(canal).toBe('WhatsApp')
    expect(href).toBe('https://wa.me/5511987654321?text=Ol%C3%A1%2C%20MiriDoces!%20Quero%20encomendar%3A%20Bolo%20de%20festa.')
  })

  it('cai para o Instagram sem WhatsApp', () => {
    expect(linkEncomenda({ instagram: 'miria.confeitaria' }).href).toBe('https://ig.me/m/miria.confeitaria')
  })
})
