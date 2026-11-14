# Guia da marca — Nosso Doce Seu

> Fonte da verdade da identidade visual. Itens `A DEFINIR` ainda não foram decididos com a cliente;
> itens marcados *(proposta)* foram sugeridos por nós e aguardam validação.
> **Mudança de marca em 2026-11-13:** a cliente enviou o logo novo (chantilly com cereja) e a marca
> passou de MiriDoces para **Nosso Doce Seu**. Paleta e fontes foram tiradas do logo.
> A identidade anterior (direção A · Confeito, Framboesa + Caprasimo + granulado) está no histórico do git
> e em `propostas.html`.
> **Folder da cliente (2026-11-13):** a cliente fez um folder no Canva com fonte Nunito e títulos em vermelho
> `#BF0A37`. Adotamos os dois no lugar da proposta anterior (Dancing Script e Cereja `#C20A26`).
> Última atualização: 2026-11-13

## Essência
- **Nome:** Nosso Doce Seu — no logo aparece junto, "Nossodoceseu", com "CONFEITARIA" embaixo.
  Em texto corrido escreva **Nosso Doce Seu** (ex.: "a confeitaria Nosso Doce Seu").
- **O que vende:** bolos, biscoitos e sobremesas
- **Público:** encomendas para festas e presentes
- **Três palavras da marca:** artesanal, bonito, saboroso
- **Conceito visual:** a cereja do bolo. Chantilly cremoso, letra cursiva em chocolate e uma cereja
  vermelha que chama atenção: delicado, caseiro e com um toque de festa.
- **Diferencial:** A DEFINIR
- **Contato para encomendas:** WhatsApp (31) 98868-3545 (Miriã Glueck) · Instagram @nosso.doce.seu (https://www.instagram.com/nosso.doce.seu/)
- **Embalagem/impressos:** fora do escopo por enquanto

## Paleta
| Função | Nome | HEX | Token CSS | Uso |
|---|---|---|---|---|
| Texto | Chocolate | `#561B06` | `--cor-texto` | Textos, nomes de produto, faixas escuras |
| Fundo | Creme | `#FDF3E4` | `--cor-fundo` | Fundo do site e dos posts (o mesmo fundo do logo) |
| Primária e títulos | Cereja | `#BF0A37` | `--cor-primaria`, `--cor-titulo` | Títulos grandes, botões, preços, links (o vermelho do folder) |
| Fundo alternativo | Chantilly | `#FFE1CF` | `--cor-fundo-alt` | Faixa de abertura, avisos, áreas de destaque |
| Destaque | Rosa | `#F7808A` | `--cor-destaque` | Fios (como os do logo), selos com texto Chocolate |
| Sobre primária | Branco | `#FFFFFF` | `--cor-sobre-primaria` | Texto sobre Cereja; fundo de cartões |

A Cereja da paleta é um pouco mais escura que a cereja desenhada no logo (`#E10624`), para
o texto Branco nos botões passar no contraste. O logo continua com as cores originais.

### Contraste aprovado (mínimo 4.5:1 para texto)
| Texto | Fundo | Razão | OK para |
|---|---|---|---|
| Chocolate | Creme | 12,3:1 | qualquer texto |
| Chocolate | Branco | 13,5:1 | qualquer texto |
| Chocolate | Chantilly | 10,9:1 | qualquer texto |
| Creme | Chocolate | 12,3:1 | rodapé, faixas escuras |
| Branco | Cereja | 6,3:1 | botões |
| Cereja | Creme / Branco | 5,8:1 / 6,3:1 | títulos, links, preços, palavras em destaque |
| Cereja | Chantilly | 5,1:1 | títulos e links na faixa Chantilly |
| Chocolate | Rosa | 5,4:1 | selos e etiquetas |

### Combinações proibidas para texto
| Texto | Fundo | Razão |
|---|---|---|
| Rosa | Creme ou Branco | 2,3:1 |
| Branco | Rosa | 2,5:1 |
| Cereja | Chocolate (e vice-versa) | 2,1:1 |

Rosa é cor de **enfeite**: fios, detalhes e fundo de selo com texto Chocolate.

## Tipografia (Google Fonts)
Uma família só, **Nunito**, como no folder da cliente. A letra cursiva fica só no logo.
- **Títulos:** Nunito 800 em Cereja (títulos grandes) ou Chocolate (nomes de produto e cartões).
- **Rótulos de seção:** Nunito 700 em caixa alta com espaçamento largo (.14em), como "BOLOS" e "HISTÓRIA" no folder
  e o "CONFEITARIA" do logo.
- **Textos e preços:** Nunito 400 e 500; destaques em 700.
- **Import:** `https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;700;800&display=swap`
- **Tamanhos no post 1080px:** título 96–110px · rótulo 40px em caixa alta, espaçamento .14em · texto mínimo 40px
- **Tamanhos no site:** título da página 36–60px · título de seção 30–42px · títulos de cartão 22–24px · texto 16–18px

## Logo
O logo veio como imagem (JPEG 1536×1024, fundo creme), não em vetor. Os arquivos abaixo foram gerados dele
com `preparar-logo.py`. Todos estão em `logo/`:

| Arquivo | Quando usar |
|---|---|
| `nossodoceseu-original.jpg` | A arte como a cliente enviou (fundo creme). Guardar; não editar. |
| `nossodoceseu-principal.png` | Logo completo, fundo transparente. **Só sobre Creme, Chantilly ou Branco.** |
| `nossodoceseu-nome.png` | Só o nome + "CONFEITARIA", para espaços horizontais (cabeçalho do site). Fundos claros. |
| `nossodoceseu-nome-creme.png` | O nome em uma cor (Creme), para fundo Chocolate ou foto escura. |
| `nossodoceseu-simbolo.png` | Só o chantilly com a cereja: selo, marca d'água, enfeite. Fundos claros. |
| `nossodoceseu-perfil-1080.png` | Foto de perfil do Instagram (símbolo em círculo Creme). |
| `web/*.png` | Versões menores usadas pelo site. `Site/public/favicon.png` é só a cereja. |

- **Área de respiro:** em volta do logo, no mínimo a altura da cereja.
- **Tamanho mínimo:** logo completo com 240px de largura no digital; nome com 150px; símbolo com 48px.
  Menor que isso, use só a cereja (favicon).
- **Não fazer:** distorcer, girar, trocar as cores, usar o logo colorido sobre Chocolate ou foto escura
  (o chantilly é transparente e some), aplicar sobre foto sem contraste.
- **Para regerar:** `python3 preparar-logo.py logo/nossodoceseu-original.jpg logo/ --favicon-dir ../../Site/public`
  (precisa do Pillow: `requirements.txt`).
- **Pendente:** pedir à cliente o arquivo original em vetor (SVG/PDF/AI) ou PNG grande com fundo transparente.
  O JPEG tem 1536px e serve para tela e Instagram, mas não para impressão grande.

## Elementos gráficos
- **Fios Rosa:** linhas finas em Rosa, como as que ladeiam o "CONFEITARIA", para separar títulos e etiquetas.
- **Símbolo:** o chantilly com a cereja pode aparecer grande ao lado de títulos (como na abertura do site).
- O granulado da identidade anterior não é mais usado.

## Tom de voz *(proposta)*
- **Como falamos:** alegre, próximo e caloroso, como quem conversa com um cliente da vizinhança. Tratamos por "você".
- **Emojis:** até 2 por legenda, ligados ao produto (🎂 🍪 🍰 🍒 ✨). Nada de emoji no meio do nome do produto.
- **Palavras que usamos:** feito à mão, do seu jeito, fresquinho, sob encomenda, festa, presente, carinho, a cereja do bolo.
- **Palavras que evitamos:** "gourmet" genérico, "barato", diminutivo em excesso, prazos ou preços que não foram confirmados.
- **Chamada padrão para encomenda:** "Peça pelo WhatsApp" (post) · "Encomendar pelo WhatsApp" (botão do site).

## Fotografia *(proposta)*
- **Estilo:** luz natural lateral, fundo Creme ou branco liso, sem filtro pesado.
- **Ângulo:** 45° para bolos e sobremesas no pote; de cima para biscoitos e caixas.
- **Elementos de cena:** um toque de vermelho-cereja ou rosa (guardanapo, prato, fita, cerejas).

## Instagram
- **Formatos:** feed 1080×1350 · quadrado 1080×1080 · stories/reels 1080×1920
- **Margem interna do post:** 76px (7% da largura)
- **Margem de segurança nos stories:** 250px no topo e embaixo
- **Foto de perfil:** `logo/nossodoceseu-perfil-1080.png`
- **Hashtags fixas:** A DEFINIR (dependem da cidade de atendimento)
