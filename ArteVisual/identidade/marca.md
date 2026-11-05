# Guia da marca — MiriDoces

> Fonte da verdade da identidade visual. Itens `A DEFINIR` ainda não foram decididos com a cliente;
> itens marcados *(proposta)* foram sugeridos por nós e aguardam validação.
> Direção escolhida: **A · Confeito** (2026-11-05). Propostas originais em `propostas.html`.
> Última atualização: 2026-11-05

## Essência
- **Nome:** MiriDoces *(confirmar: o Instagram atual se chama "MIRIÃ GLUECK FESTA R DECORAÇÃO")*
- **O que vende:** bolos, biscoitos e sobremesas
- **Público:** encomendas para festas e presentes
- **Três palavras da marca:** artesanal, bonito, saboroso
- **Conceito visual:** cor de festa, letra gordinha e granulado. A marca chega como o bolo chega na mesa: alegre, generosa e fácil de reconhecer no feed.
- **Diferencial:** A DEFINIR
- **Contato para encomendas:** WhatsApp A DEFINIR · Instagram @miria.confeitaria
- **Embalagem/impressos:** fora do escopo por enquanto

## Paleta
| Função | Nome | HEX | Token CSS | Uso |
|---|---|---|---|---|
| Primária | Framboesa | `#B5305F` | `--cor-primaria` | Logo, botões, fundo dos posts |
| Texto | Chocolate | `#3A1E1A` | `--cor-texto` | Textos e títulos sobre fundo claro |
| Fundo claro | Merengue | `#FFF5F7` | `--cor-fundo` | Fundo do site, áreas de foto |
| Destaque | Caramelo | `#E7A03C` | `--cor-destaque` | Selos, etiquetas, granulado |
| Detalhe | Pistache | `#7FA872` | `--cor-detalhe` | Granulado e pequenos detalhes |
| Sobre primária | Branco | `#FFFFFF` | `--cor-sobre-primaria` | Texto sobre Framboesa ou Chocolate |

### Contraste aprovado (mínimo 4.5:1 para texto)
| Texto | Fundo | Razão | OK para |
|---|---|---|---|
| Chocolate | Merengue | 14,2:1 | qualquer texto |
| Branco | Framboesa | 5,9:1 | qualquer texto |
| Framboesa | Merengue / Branco | 5,5:1 / 5,9:1 | títulos, links, preços |
| Chocolate | Caramelo | 6,9:1 | selos e etiquetas |
| Chocolate | Pistache | 5,6:1 | selos e etiquetas |
| Merengue | Chocolate | 14,2:1 | rodapé, faixas escuras |

### Combinações proibidas para texto
| Texto | Fundo | Razão |
|---|---|---|
| Caramelo | Merengue | 2,1:1 |
| Pistache | Merengue | 2,5:1 |
| Branco | Caramelo ou Pistache | 2,2:1 / 2,7:1 |
| Framboesa | Chocolate (e vice-versa) | 2,6:1 |
| Caramelo | Framboesa | 2,7:1 |

Caramelo e Pistache são cores de **enfeite**: granulado, selos com texto Chocolate, ícones grandes.

## Tipografia (Google Fonts)
- **Títulos:** Caprasimo (só existe no peso 400). Usar em títulos curtos, nunca em parágrafos.
- **Textos e preços:** DM Sans 400, 500 e 700.
- **Import:** `https://fonts.googleapis.com/css2?family=Caprasimo&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700&display=swap`
- **Tamanhos no post 1080px:** título 110–120px (altura de linha 1) · etiqueta 40px em caixa alta, DM Sans 700, espaçamento .14em · texto mínimo 40px
- **Tamanhos no site:** título da página 40–48px · título de seção 28–32px · texto 16–18px

## Logo
Arquivos em `logo/` (texto convertido em curvas; não depende da fonte instalada):

| Arquivo | Quando usar |
|---|---|
| `miridoces-principal.svg` / `-2000.png` | Padrão: Framboesa com granulado Caramelo e Pistache no pingo dos "i". Sobre Merengue ou Branco. |
| `miridoces-chocolate.svg` | Uma cor, sobre fundos claros quando a Framboesa competir com a foto |
| `miridoces-branco.svg` | Uma cor, sobre Framboesa, Chocolate ou foto escura |
| `miridoces-simbolo.svg` / `-1080.png` | Foto de perfil, favicon, marca d'água: "M" branco em círculo Framboesa com granulado |

- **Área de respiro:** em volta do logo, no mínimo a altura do "M".
- **Tamanho mínimo:** logo principal com 120px de largura no digital; símbolo com 32px.
- **Não fazer:** distorcer, girar, trocar cores fora da paleta, usar granulado nas versões de uma cor (parece acento), aplicar sobre foto sem contraste.
- **Para regerar:** `node gerar-logo.js <Caprasimo-Regular.ttf> logo/` (precisa do pacote `opentype.js`).

## Granulado
Elemento gráfico da marca: bastõezinhos arredondados (proporção ~3:1), inclinados em ângulos variados.
- Sobre Framboesa: Caramelo, Pistache e Branco. Sobre Merengue: Framboesa, Caramelo e Pistache.
- Usar em fundos, bordas e cantos. Nunca atrás de texto pequeno nem sobre a foto do produto.
- Disponível como textura em `tokens.css` (`--granulado-sobre-primaria`, `--granulado-sobre-fundo`).

## Tom de voz *(proposta)*
- **Como falamos:** alegre, próximo e caloroso, como quem conversa com um cliente da vizinhança. Tratamos por "você".
- **Emojis:** até 2 por legenda, ligados ao produto (🎂 🍪 🍰 🎉 ✨). Nada de emoji no meio do nome do produto.
- **Palavras que usamos:** feito à mão, do seu jeito, fresquinho, sob encomenda, festa, presente, carinho.
- **Palavras que evitamos:** "gourmet" genérico, "barato", diminutivo em excesso, prazos ou preços que não foram confirmados.
- **Chamada padrão para encomenda:** "Peça pelo WhatsApp" (post) · "Encomendar pelo WhatsApp" (botão do site).

## Fotografia *(proposta)*
- **Estilo:** luz natural lateral, fundo Merengue ou branco liso, sem filtro pesado.
- **Ângulo:** 45° para bolos e sobremesas no pote; de cima para biscoitos e caixas.
- **Elementos de cena:** um toque de Framboesa (guardanapo, prato, fita) e granulado espalhado.

## Instagram
- **Formatos:** feed 1080×1350 · quadrado 1080×1080 · stories/reels 1080×1920
- **Margem interna do post:** 76px (7% da largura)
- **Margem de segurança nos stories:** 250px no topo e embaixo
- **Foto de perfil:** `logo/miridoces-simbolo-1080.png`
- **Hashtags fixas:** A DEFINIR (dependem da cidade de atendimento)
