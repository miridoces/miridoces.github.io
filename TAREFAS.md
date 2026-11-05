# Tarefas — MiriConfeitaria

## Em andamento
- [ ] Mover o site para a organização `miridoces`: criar a organização, transferir o repositório, renomear para `miridoces.github.io` e ativar Pages (Source = GitHub Actions) — pronto quando: https://miridoces.github.io/ abre com logo, fontes e cardápio
- [ ] Preencher conteúdo real do site: WhatsApp, cidade, produtos, preços e fotos — arquivos: `Site/src/conteudo/`, `Site/public/fotos/` — pronto quando: nenhum produto de EXEMPLO e `npm test` passando
- [ ] Validar o guia da marca com a cliente (https://claude.ai/artifact/Cbipcc9ok8zimuxf6cQLgp) — arquivos: `ArteVisual/identidade/marca.md` — pronto quando: tom de voz e fotografia aprovados (hoje são proposta) e preenchidos diferencial, WhatsApp e hashtags
- [ ] Confirmar com a cliente o nome da marca (perfil do Instagram usa "Miriã Glueck Festa e Decoração") e o WhatsApp de encomendas

## A fazer

### Plano: identidade + Instagram, site e planilha de gestão da MiriDoces

**Decisões**
- [x] Site: estático em React + MDX (conteúdo atualizado editando arquivos `.mdx`)
- [x] Planilha: Google Planilhas (online, acessível pelo celular)
- [x] Hospedagem: GitHub Pages na organização `miridoces` (https://miridoces.github.io/) para apresentar à cliente; depois de aprovado, domínio próprio da cliente
- [ ] Planilha: criar no meu Google Drive e compartilhar com a cliente, ou direto no Drive dela? (decidir ao montar a planilha)

**0. Base**

**1. Gerenciamento (planilha)**
- [ ] Levantar receitas, insumos (preço e unidade de compra) e custos fixos — arquivos: `Gerenciamento/levantamento.md` — pronto quando: pelo menos 3 receitas e todos os custos fixos listados
- [ ] Criar skill `ficha-tecnica-receita` — arquivos: `.skills/ficha-tecnica-receita/SKILL.md` — pronto quando: gerar a ficha de uma receita de teste com custo por unidade e preço sugerido
- [ ] Montar a planilha no Google Planilhas (abas Insumos, Receitas, Movimentações, Custos fixos, Vendas, Resumo mensal), compartilhada com a cliente — arquivos: "MiriDoces — Gestão" no Google Drive; link em `Gerenciamento/README.md` — pronto quando: fórmulas recalculam certo com dados de teste e sem #REF!/#DIV/0!
- [ ] Criar skills `movimentar-insumos` e `fechamento-mensal` — arquivos: `.skills/` — pronto quando: lançar uma compra atualiza o estoque e o resumo do mês sai com gráfico
- [ ] Teste com a cliente (uma semana real, inclusive pelo celular) — arquivos: `Gerenciamento/guia-de-uso.pdf` — pronto quando: ajustes feitos e guia de 1 página entregue

**2. Instagram**
- [ ] Criar skill `post-instagram` (modelos HTML → PNG em 1080×1350, 1080×1080, 1080×1920) — arquivos: `.skills/post-instagram/` — pronto quando: gerar um post e um story usando `tokens.css`
- [ ] Kit do perfil: foto de perfil, bio, capas dos destaques e 9 posts de lançamento — arquivos: `ArteVisual/instagram/` — pronto quando: aprovado pela cliente
- [ ] Criar skill `calendario-conteudo` e o primeiro calendário mensal — arquivos: `ArteVisual/calendario/AAAA-MM.md` — pronto quando: mês com posts planejados, incluindo datas comemorativas

**3. Site**
- [ ] Criar skill `produto-site` e cadastrar o cardápio — arquivos: `.skills/produto-site/`, `Site/src/conteudo/produtos/` — pronto quando: cada produto tem foto, descrição, preço e botão de WhatsApp com mensagem pronta
- [ ] Revisar com `design:accessibility-review` e `design:ux-copy` e apresentar à cliente pelo link do GitHub Pages — pronto quando: cliente aprovar
- [ ] Apontar o domínio da cliente (DNS + `Site/public/CNAME`, `base` do Vite = `/`, HTTPS ativado) — pronto quando: site abre no domínio com HTTPS

## Concluído
- [x] Repositório https://github.com/TiagoGlueck/miridoces criado (push via SSH) e workflow de deploy no GitHub Pages; build, testes e lint passam no Actions
- [x] Site: projeto Vite + React + MDX, página única (início, cardápio com filtro, sobre, como encomendar, rodapé) usando `tokens.css` e logos; testes, lint e build passando (wireframe pulado: a identidade já estava pronta)
- [x] Formato do conteúdo em MDX definido (`loja.mdx`, `encomendas.mdx`, `produtos/*.mdx` + `LEIA-ME.md`)
- [x] Direção A · Confeito escolhida (2026-11-05)
- [x] Identidade fechada: `marca.md`, `tokens.css`, `previa.html` e logos em SVG/PNG em `ArteVisual/identidade/logo/`
- [x] Briefing inicial registrado em `ArteVisual/identidade/marca.md` (liberdade criativa; bolos, biscoitos e sobremesas; festas e presentes)
- [x] Propostas de identidade criadas e publicadas (https://claude.ai/artifact/JvGMbq4fBMxW23qqG7QenQ)
- [x] Estrutura inicial do projeto e pasta `.skills/` (link em `.claude/skills`)
- [x] Skill `identidade-miridoces` com modelo de `marca.md`
- [x] `README.md` e `CLAUDE.md` do projeto
- [x] Decisão de stack registrada: site React + MDX estático; gestão em Google Planilhas
