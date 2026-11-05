// Links internos sempre a partir do BASE_URL, para funcionar na raiz ou em subpasta.
export const url = (caminho = '') => `${import.meta.env.BASE_URL}${caminho}`

export const PAGINAS = {
  inicio: url(),
  cardapio: url('cardapio/'),
  sobre: url('#sobre'),
  encomendas: url('#encomendas'),
}
