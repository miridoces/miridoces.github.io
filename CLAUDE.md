# MiriConfeitaria

Trabalho para a confeitaria MiriDoces: identidade visual e Instagram, site e planilha de
gestão (ficha técnica, insumos, custos e resumo financeiro).

- **Tipo:** design + web + planilha
- **Stack:** site estático em React + MDX (Vite + `@mdx-js/rollup`) · gestão em Google Planilhas

## Comandos
Site (rodar dentro de `Site/`, Node 24):
- Instalar: `npm install`
- Rodar: `npm run dev`
- Testar: `npm test` (valida o frontmatter dos .mdx e os links de encomenda)
- Lint: `npm run lint`
- Build: `npm run build` (`BASE_PATH=/<repo>/` para GitHub Pages)

## Estrutura
- `ArteVisual/`: identidade (`ArteVisual/identidade/marca.md` é a fonte da verdade; direção A · Confeito) e artes do Instagram
  - `ArteVisual/identidade/tokens.css`: cores e fontes como variáveis CSS; site e artes importam daqui
  - `ArteVisual/identidade/logo/`: logos em curvas (SVG) e PNG; regerar com `gerar-logo.js`
- `Site/`: site da confeitaria (Vite + React + MDX, uma página com âncoras: início, cardápio, sobre, encomendas)
  - `Site/src/conteudo/`: conteúdo editável (`loja.mdx`, `encomendas.mdx`, `produtos/*.mdx`)
  - `Site/src/lib/conteudo.js`: carrega e valida o conteúdo; `contato.js` monta links do WhatsApp (ou Instagram, se não houver número)
  - `Site/src/estilos.css`: usa só os tokens de `tokens.css`, sem HEX soltos
- `Gerenciamento/`: planilha de ficha técnica e financeiro
- `.skills/`: skills do projeto; `.claude/skills` é um link para ela

## Convenções deste projeto
- Textos voltados à cliente e ao público em português (pt-BR), com tom de voz do `marca.md`.
- Antes de criar arte, página ou documento, consulte a skill `identidade-miridoces`. Não
  invente cores, fontes ou textos de marca; itens `A DEFINIR` precisam de confirmação.
- Site: o conteúdo editável (produtos, preços, textos das páginas) fica em arquivos `.mdx`
  com frontmatter em `Site/src/conteudo/`; componentes React só cuidam do layout. Atualizar
  o cardápio não deve exigir mexer em código. Saída 100% estática (`dist/`), sem backend.
- Hospedagem: GitHub Pages. Na fase de apresentação o site fica em `/<repo>/`, depois vai
  para o domínio da cliente na raiz `/`. Por isso o `base` do Vite vem de variável de
  ambiente, e caminhos de imagens e links nunca são fixos (`/foto.jpg` quebra no GitHub Pages).
  Se houver rotas, use `HashRouter` ou um `404.html` de fallback, porque o GitHub Pages não
  tem rewrite de rotas.
- Gerenciamento é **Google Planilhas**, não sistema web: a cliente precisa conseguir usar
  sozinha, inclusive pelo celular. Fórmulas nativas e simples, abas claras, sem Apps Script
  a menos que eu peça. Use a skill `anthropic-skills:google-workspace` para criar e editar.
- Valores em reais (R$) e unidades de medida da cozinha (g, kg, ml, L, unidade).
- Novas skills do projeto vão em `.skills/<nome>/SKILL.md` e entram na lista de `.skills/README.md`.

## Tarefas
Veja `TAREFAS.md`.
