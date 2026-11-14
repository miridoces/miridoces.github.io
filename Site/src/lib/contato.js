// Monta os links de encomenda. Sem WhatsApp cadastrado, cai para a mensagem direta do Instagram.

/** Link para encomendar; `produto` (opcional) entra na mensagem pronta. */
export function linkEncomenda(loja, produto) {
  const nome = loja.nome || 'Nosso Doce Seu'
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

/** Telefone para mostrar na tela: 5531988683545 → (31) 98868-3545. */
export function formatarTelefone(numero) {
  const m = String(numero ?? '').match(/^55(\d{2})(\d{4,5})(\d{4})$/)
  return m ? `(${m[1]}) ${m[2]}-${m[3]}` : null
}

export function linkInstagram(loja) {
  return loja.instagram ? `https://www.instagram.com/${loja.instagram}/` : null
}
