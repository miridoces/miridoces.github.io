# Como cadastrar um produto

1. Crie um arquivo `.mdx` nesta pasta (ex.: `brownie.mdx`, sem acentos nem espaços) e cole o modelo abaixo.
2. Preencha os campos entre as linhas `---`. Os comentários (depois de `#`) explicam cada um e podem ser apagados.
3. Abaixo da segunda linha `---`, escreva a descrição do produto.
4. Coloque a foto em `Site/public/fotos/` e escreva o nome do arquivo no campo `foto`.
5. Rode `npm test` para conferir se está tudo certo.

Categorias aceitas: `bolos`, `docinhos`, `biscoitos`, `sobremesas`, `chutneys`, `geleias`, `festa-online`, `natal`.

## Modelo
```mdx
---
nome: Brownie
categoria: sobremesas       # uma das categorias aceitas acima
preco:                      # número, ex.: 120 (vazio = "Preço sob consulta")
unidade: unidade            # aparece ao lado do preço, ex.: por kg, caixa, pote
foto:                       # arquivo em public/fotos, ex.: brownie.jpg
disponivel: true            # false esconde o produto sem apagar o arquivo
ordem: 1                    # posição no cardápio (menor aparece antes)
---

Descrição do produto, em uma ou duas frases.
```

## Destaques
A seção de destaques da página inicial mostra um cartão para cada categoria escolhida em
`src/conteudo/destaques.mdx` (lá também dá para trocar o título e o nome de cada cartão).
As fotos dos produtos da categoria passam em carrossel no cartão; para uma foto entrar lá, basta
preencher o campo `foto` do produto. Clicar no cartão abre o cardápio já filtrado na categoria.
No cardápio, os produtos aparecem na ordem das categorias e, dentro de cada uma, pelo campo `ordem`.
