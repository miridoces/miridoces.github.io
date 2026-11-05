# Skills do projeto MiriDoces

Skills específicas deste projeto. Cada skill fica em uma subpasta com um `SKILL.md`:

```
.skills/
  nome-da-skill/
    SKILL.md        # frontmatter (name, description) + instruções
    referencias/    # opcional: paleta, modelos, exemplos
```

> O Claude Code só descobre skills de projeto em `.claude/skills/`. Para usar as
> skills desta pasta, crie um link: `mkdir -p .claude && ln -s ../.skills .claude/skills`

## Skills a criar (específicas da MiriDoces)

| Skill | Frente | O que faz |
|---|---|---|
| `identidade-miridoces` | Base | Guia da marca: paleta, fontes, uso do logo e tom de voz. As outras skills consultam esta, para site e Instagram ficarem consistentes. |
| `post-instagram` | Arte visual | Gera post, carrossel ou story nos tamanhos certos (1080×1350, 1080×1080, 1080×1920) em HTML → PNG, com legenda e hashtags. |
| `calendario-conteudo` | Arte visual | Monta o plano mensal de posts com datas da confeitaria (Páscoa, Dia das Mães, festas juninas, Natal). |
| `produto-site` | Site | Cria ou atualiza o `.mdx` de um doce em `Site/src/conteudo/produtos/` (frontmatter com nome, preço, foto, categoria; botão de encomenda no WhatsApp). |
| `ficha-tecnica-receita` | Gerenciamento | Cadastra uma receita: ingredientes, quantidades, rendimento, custo por unidade e preço sugerido (markup). |
| `movimentar-insumos` | Gerenciamento | Registra entrada (compra) e saída (uso na produção) de insumos e avisa quando o estoque está baixo. |
| `fechamento-mensal` | Gerenciamento | Gera o resumo financeiro do mês: vendas, custo de insumos, custo operacional (gás, energia, embalagens, mão de obra), margem e gráficos. |

## Skills já disponíveis que servem aqui

| Skill | Quando usar |
|---|---|
| `/planejar` | Quebrar as três frentes (Site, ArteVisual, Gerenciamento) em tarefas no `TAREFAS.md`. |
| `/documentar` | Criar `README.md` e `CLAUDE.md` do projeto (ainda não existem). |
| `/wireframe` | Rascunhar as telas do site (home, cardápio, sobre, contato/encomenda) antes de desenhar. |
| `design:design-system` | Documentar a identidade visual como sistema (cores, tipografia, componentes). |
| `design:ux-copy` | Textos do site e chamadas: “Encomende pelo WhatsApp”, descrições de produtos. |
| `design:design-critique` | Revisar layouts do site e artes do Instagram. |
| `design:accessibility-review` | Conferir contraste e legibilidade do site (paletas de confeitaria costumam ter pouco contraste). |
| `anthropic-skills:google-workspace` | Criar e editar a planilha de gestão no Google Planilhas (estoque, custos, resumo). |
| `dataviz` | Gráficos do resumo financeiro. |
| `anthropic-skills:pdf` | Cardápio em PDF ou ficha técnica para imprimir. |
| `run` | Abrir o site localmente para conferir as mudanças. |
