---
name: identidade-miridoces
description: Define, atualiza e aplica a identidade visual da Nosso Doce Seu, antiga MiriDoces (paleta, tipografia, logo, tom de voz). Use quando eu pedir para criar ou mudar a identidade da marca, e consulte-a antes de criar qualquer arte, post, página do site ou documento da Nosso Doce Seu (ou MiriDoces), para manter tudo consistente.
argument-hint: "[definir | atualizar <item> | consultar]"
---

# Identidade Nosso Doce Seu (antiga MiriDoces)

Pedido: $ARGUMENTS

A identidade da marca fica em `ArteVisual/identidade/`, na raiz do projeto:

| Arquivo | Conteúdo |
|---|---|
| `marca.md` | Guia da marca: fonte da verdade para todas as outras skills |
| `tokens.css` | As mesmas cores e fontes como variáveis CSS, usadas pelo site e pelas artes em HTML |
| `logo/` | Arquivos do logo (SVG de preferência, e PNG com fundo transparente) |
| `previa.html` | Página que mostra paleta, fontes, logo e exemplos aplicados |

Se `marca.md` não existir, copie `.skills/identidade-miridoces/modelos/marca.md` para lá.

## Modo consultar (padrão quando outra tarefa precisa da marca)
1. Leia `ArteVisual/identidade/marca.md` e use **apenas** as cores, fontes e regras dele.
2. Se um item necessário estiver marcado `A DEFINIR`, não invente: avise e pergunte, ou
   proponha um valor dizendo claramente que é provisório.

## Modo definir (identidade nova ou incompleta)
1. **Coletar o que já existe.** Pergunte (tudo de uma vez, no máximo 5 perguntas):
   - Já existe logo, cores ou fontes usadas pela cliente (embalagens, cartão, Instagram atual)?
   - Quais são os produtos carro-chefe e o público (festas, presentes, dia a dia)?
   - Três palavras que descrevem a marca (ex.: artesanal, delicada, afetiva).
   - Marcas ou perfis que a cliente admira — e o que ela **não** quer.
   - Onde a marca aparece além de site e Instagram (embalagem, etiqueta, cardápio impresso)?
2. **Propor 2 ou 3 direções** em `ArteVisual/identidade/propostas.html`, cada uma com:
   paleta (5–6 cores com HEX), par de fontes do Google Fonts, exemplo de post 1080×1350,
   exemplo de cabeçalho do site e etiqueta de embalagem. Abra com `xdg-open`.
3. Depois que eu escolher, preencha `marca.md`, gere `tokens.css` e `previa.html`.

## Modo atualizar
Altere só o item pedido em `marca.md`, replique em `tokens.css` e `previa.html`, e liste
os arquivos do projeto (Site/, ArteVisual/) que usam o valor antigo para eu decidir se atualiza.

## Regras de qualidade
- **Contraste:** texto sobre fundo deve ter pelo menos 4.5:1 (WCAG AA); títulos grandes, 3:1.
  Tons pastel quase sempre falham para texto — reserve-os para fundos e detalhes e tenha
  uma cor escura de texto. Registre os pares aprovados na tabela de contraste do `marca.md`.
- **Fontes:** só Google Fonts (gratuitas e fáceis de usar no site e no Canva). No máximo
  duas famílias: uma de destaque (títulos) e uma legível (textos e preços).
- **Celular primeiro:** as artes são vistas no celular. Texto do post com no mínimo ~40px
  em 1080px de largura; logo legível em 110×110 (foto de perfil do Instagram).
- **Tokens:** em `tokens.css`, nomes por função, não por cor
  (`--cor-primaria`, `--cor-texto`, `--cor-fundo`, `--fonte-titulo`), para trocar a paleta sem
  mexer nas páginas.
- Não use logos, fotos ou elementos de outras marcas.

## Entregar
Resuma no chat o que foi definido (paleta com HEX, fontes, regras principais), os arquivos
criados ou alterados e os itens que continuam `A DEFINIR`.
