import { describe, expect, it } from 'vitest'
import { arquivosDeProduto, dadosLoja, produtos, validarLoja, validarProduto } from './conteudo.js'
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

  it('coloca os destaques primeiro', () => {
    const iDestaque = produtos.findIndex((p) => p.dados.destaque)
    const iComum = produtos.findIndex((p) => !p.dados.destaque)
    if (iDestaque >= 0 && iComum >= 0) expect(iDestaque).toBeLessThan(iComum)
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
