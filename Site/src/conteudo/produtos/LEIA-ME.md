# Como cadastrar um produto

1. Copie um arquivo `.mdx` desta pasta e renomeie (ex.: `brownie.mdx`, sem acentos nem espaços).
2. Preencha os campos entre as linhas `---`. Os comentários (depois de `#`) explicam cada um.
3. Abaixo da segunda linha `---`, escreva a descrição do produto.
4. Coloque a foto em `Site/public/fotos/` e escreva o nome do arquivo no campo `foto`.
5. Rode `npm test` para conferir se está tudo certo.

Categorias aceitas: `bolos`, `biscoitos`, `sobremesas`.

## Mais vendidos
Marque `maisVendido: true` nos produtos que devem aparecer na seção "Mais vendidos" da página
inicial. Aparecem até 3, pela ordem do campo `ordem`. No cardápio completo eles vêm primeiro,
com o selo "Mais vendido".
