# Home e Jornada Interativa — Implementation Plan

> **For agentic workers:** Implement task-by-task and verify each task before continuing.

**Goal:** Transformar a Home em uma entrada narrativa do portfólio e preparar a primeira interação da jornada pessoal.

**Architecture:** Reutilizar React Router e os dados existentes em `src/data`. A Home será composta por apresentação, chamada para explorar a jornada e uma linha do tempo reutilizável, mantendo páginas independentes e responsivas.

**Tech Stack:** React, Vite, React Router, CSS existente do projeto.

## Global Constraints

- Manter a paleta `#222223`, `#FEFEFE`, `#B62A2D`, `#E6A8A8` e `#D5575E`.
- Não instalar dependências novas nesta etapa.
- Preservar as rotas existentes.
- Validar com `npm.cmd run build`.

## Review Focus

- A Home deve continuar legível em telas pequenas.
- A navegação para a jornada deve funcionar sem recarregar a página.
- A linha do tempo deve funcionar mesmo quando houver poucos itens.
- Os textos devem permanecer fáceis de substituir pelos dados reais do usuário.

### Task 1: Atualizar a apresentação da Home

**Files:**
- Modify: `src/pages/PaginaInicial.jsx`
- Modify: `src/components/Apresentacao.jsx`
- Modify: `src/Aplicacao.css`

- [ ] Substituir a apresentação inicial por uma composição com rótulo profissional, título principal, resumo curto e dois CTAs.
- [ ] Fazer o CTA principal navegar para a página de jornada usando `Link` ou `NavLink`.
- [ ] Aplicar hierarquia visual e espaçamento responsivo usando as variáveis de cor existentes.
- [ ] Executar `npm.cmd run build` e verificar que a aplicação compila.
- [ ] Commitar com `feat: transforma home em entrada narrativa`.

### Task 2: Reforçar a jornada interativa

**Files:**
- Modify: `src/components/Jornada.jsx`
- Modify: `src/components/Jornada.css`
- Modify: `src/data/jornada.js`

- [ ] Organizar os itens da jornada para mostrar período, título, descrição e tecnologias quando existirem.
- [ ] Adicionar estado local para expandir e recolher detalhes de um item por vez.
- [ ] Garantir foco visível e botão acessível para teclado.
- [ ] Executar `npm.cmd run build` e testar a abertura e o fechamento de itens no navegador.
- [ ] Commitar com `feat: adiciona detalhes expansivos na jornada`.
