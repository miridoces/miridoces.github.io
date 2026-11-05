# MiriConfeitaria

Projeto para a confeitaria **MiriDoces**, com três entregas:

1. **Arte visual**: identidade da marca e artes para o Instagram (posts, carrosséis, stories).
2. **Site**: vitrine dos produtos com encomenda pelo WhatsApp.
3. **Gerenciamento**: planilha de ficha técnica com registro de entrada e saída de insumos,
   custo das receitas, custo operacional e resumo financeiro mensal.

## Estrutura

```
ArteVisual/          Identidade da marca (ArteVisual/identidade/) e artes do Instagram
Site/                Site estático em React + MDX (Vite)
Gerenciamento/       Notas e link da planilha de gestão (Google Planilhas)
.skills/             Skills do Claude Code específicas deste projeto
.claude/skills  ->   link para .skills/ (é onde o Claude Code procura as skills)
TAREFAS.md           Tarefas em andamento
```

## Site

Requisitos: Node 24 (veja `Site/.nvmrc`) e npm.

```bash
cd Site
npm install
npm run dev       # servidor local em http://localhost:5173
npm test          # confere os arquivos de conteúdo (.mdx) e os links de encomenda
npm run lint
npm run build     # gera Site/dist/
```

Publicação: cada push na `main` publica o site em https://miridoces.github.io/ pelo GitHub Actions
(`.github/workflows/deploy.yml`, que roda testes, lint e build antes). Para gerar localmente
para uma subpasta, use `BASE_PATH=/<pasta>/ npm run build`.

### Atualizar o conteúdo
Tudo que muda com frequência fica em `Site/src/conteudo/`, sem mexer em código:

- `loja.mdx`: nome, título da página inicial, WhatsApp, Instagram, cidade e o texto "Sobre".
- `encomendas.mdx`: passos de "Como encomendar".
- `produtos/*.mdx`: um arquivo por produto (veja `produtos/LEIA-ME.md`). Fotos em `Site/public/fotos/`.

Depois de editar, rode `npm test` para conferir.

As cores, fontes e logos vêm de `ArteVisual/identidade/` (`tokens.css` e `logo/`).

## Skills
As skills do projeto ficam em `.skills/`. Veja `.skills/README.md`.
