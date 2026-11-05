// Monta os links de encomenda. Sem WhatsApp cadastrado, cai para a mensagem direta do Instagram.

/** Link para encomendar; `produto` (opcional) entra na mensagem pronta. */
export function linkEncomenda(loja, produto) {
  const nome = loja.nome || 'MiriDoces'
  const mensagem = produto
    ? `Olá, ${nome}! Quero encomendar: ${produto}.`
    : `Olá, ${nome}! Quero fazer uma encomenda.`
  if (loja.whatsapp) {
    return { href: `https://wa.me/${loja.whatsapp}?text=${encodeURIComponent(mensagem)}`, canal: 'WhatsApp' }
  }
  if (loja.instagram) {
    return { href: `https://ig.me/m/${loja.instagram}`, canal: 'Instagram' }
  }
  return { href: '#encomendas', canal: null }
}

export function linkInstagram(loja) {
  return loja.instagram ? `https://www.instagram.com/${loja.instagram}/` : null
}
