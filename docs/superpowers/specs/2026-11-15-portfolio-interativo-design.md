# Design — Portfólio interativo por jornada

## Objetivo

Transformar o portfólio em uma apresentação narrativa da trajetória do Lucas, combinando a organização profissional do modelo de Luca Azalim com a apresentação de projetos do modelo de Gustavo Gonzaga.

## Primeira versão

- Home com apresentação pessoal, frase principal e chamada para iniciar a jornada.
- História com linha do tempo clicável para formação, experiências e objetivos.
- Conhecimentos agrupados por áreas, com uma explicação curta de uso prático.
- Projetos em cards com imagem, descrição, tecnologias, GitHub e aprendizados.
- Experiência, formação, currículo e contato em páginas independentes.
- Navegação sem recarregar a página usando React Router.
- Animações discretas de entrada e expansão, priorizando leitura e acessibilidade.
- Suporte aos textos em português e inglês já previsto na estrutura existente.

## Direção visual

- Fundo principal: `#222223`.
- Texto claro: `#FEFEFE`.
- Vermelho principal: `#B62A2D`.
- Tons de apoio: `#E6A8A8` e `#D5575E`.
- Layout editorial, com bastante espaço, títulos grandes e divisões numeradas.

## Dados e componentes

Os dados pessoais, jornada, formação e projetos permanecerão separados dos componentes em `src/data`. A primeira implementação reutilizará a estrutura existente e evoluirá a Home e a página de jornada antes de alterar todas as páginas.

## Critérios de sucesso

- O visitante entende quem é o autor em poucos segundos.
- A trajetória pode ser explorada sem confusão.
- Projetos mostram evidências concretas de aprendizado e prática.
- A interface funciona em desktop e celular.
- O build do Vite continua passando após cada etapa.
