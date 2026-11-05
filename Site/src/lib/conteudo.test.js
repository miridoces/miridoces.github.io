import { describe, expect, it } from 'vitest'
import { LIMITE_MAIS_VENDIDOS, arquivosDeProduto, dadosLoja, maisVendidos, produtos, validarLoja, validarProduto } from './conteudo.js'
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

  it('coloca os mais vendidos primeiro no cardápio', () => {
    const iVendido = produtos.findIndex((p) => p.dados.maisVendido)
    const iComum = produtos.findIndex((p) => !p.dados.maisVendido)
    if (iVendido >= 0 && iComum >= 0) expect(iVendido).toBeLessThan(iComum)
  })

  it(`mostra no máximo ${LIMITE_MAIS_VENDIDOS} mais vendidos na página inicial, todos marcados`, () => {
    expect(maisVendidos.length).toBeLessThanOrEqual(LIMITE_MAIS_VENDIDOS)
    expect(maisVendidos.every((p) => p.dados.maisVendido)).toBe(true)
  })
})

describe('validações', () => {
  it('recusa categoria e preço inválidos', () => {
    const erros = validarProduto({ nome: 'X', categoria: 'salgados', preco: 'R$ 10' })
    expect(erros).toHaveLength(2)
  })

  it('avisa quando o campo antigo "destaque" é usado', () => {
    expect(validarProduto({ nome: 'X', categoria: 'bolos', destaque: true })[0]).toMatch(/maisVendido/)
  })

  it('aceita produto sem preço e sem foto', () => {
    expect(validarProduto({ nome: 'X', categoria: 'bolos', preco: null, foto: null })).toEqual([])
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
