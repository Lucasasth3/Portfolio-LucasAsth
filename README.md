# Portfólio — Lucas Asth

Portfólio profissional em React e Vite com formação, experiências, projetos, leituras e contato, disponível em português e inglês.

## Status do Projeto

Site publicado, com documentação visual local e wireframes no Figma. As telas do Figma não estão conectadas; a navegação funcional é demonstrada no site.

## Índice

- [Links úteis](#links-úteis)
- [Sobre o projeto](#sobre-o-projeto)
- [Funcionalidades principais](#funcionalidades-principais)
- [Tecnologias utilizadas](#tecnologias-utilizadas)
- [Arquitetura](#arquitetura)
- [Instalação e execução](#instalação-e-execução)
- [Deploy](#deploy)
- [Estrutura de pastas](#estrutura-de-pastas)
- [Demonstração](#demonstração)
- [Testes](#testes)
- [Documentações utilizadas](#documentações-utilizadas)
- [Autores](#autores)
- [Contribuição](#contribuição)
- [Agradecimentos](#agradecimentos)
- [Licença](#licença)

## Links úteis

- [Site publicado](https://portfolio-lucasasth.vercel.app).
- [Repositório](https://github.com/Lucasasth3/Portfolio-LucasAsth).
- [Figma](https://www.figma.com/design/J9LBsBqbds5wn447Rqflyo/Lucas-Asth-%E2%80%94-Portf%C3%B3lio-profissional).
- [Documentação visual](docs/design/).
- [Apresentação em PDF](docs/apresentacao/Apresentacao-Portfolio-Lucas-Asth.pdf) e [roteiro de fala](docs/apresentacao/Roteiro-de-apresentacao.md).

## Sobre o projeto

O portfólio reúne minha trajetória, formação em Engenharia de Software na PUC Minas e projetos em um único site. Foi desenvolvido para apresentar meu trabalho a professores, recrutadores e possíveis clientes, no contexto do Trabalho Prático 1 de Portfólio Profissional.

## Funcionalidades principais

- Apresentação pessoal em português e inglês.
- Timeline de projetos, do mais antigo ao mais recente, com capas e tecnologias.
- Formação, experiências profissionais e currículo.
- Livros com capas e avaliações.
- Estatísticas do WakaTime e globo de habilidades.
- Retrato interativo com efeito de pintura em pixel.
- Formulário de contato por e-mail e links para WhatsApp e redes profissionais.
- Layout responsivo e adaptações para movimento reduzido.

As recomendações cadastradas na página de contato ficam somente no navegador que as salvou.

## Tecnologias utilizadas

| Dependência | Versão declarada | Uso |
| --- | --- | --- |
| React / React DOM | 19.3.1 | Componentes e renderização |
| React Router DOM | 7.18.5 | Navegação |
| Vite | 8.3.6 | Desenvolvimento e build |
| @vitejs/plugin-react | 6.1.2 | Integração React e Vite |
| Oxlint | 1.90.0 | Análise estática |
| @types/react / @types/react-dom | 19.3.0 | Definições de tipos |

O projeto utiliza JavaScript, CSS e SVG, Node.js no servidor, Formspree para contato e Vercel para hospedagem. Os intervalos de versões estão em [package.json](package.json), e as versões instaladas em `package-lock.json`.

## Arquitetura

A interface utiliza React e React Router, com páginas compostas por componentes reutilizáveis. Os conteúdos ficam em `src/data`, separados das páginas. O contexto React centraliza o idioma.

O formulário envia dados ao Formspree pelo serviço de contato. A rota `/api/wakatime` consulta estatísticas no servidor e mantém o token fora do navegador, com cache dos últimos dados disponíveis. O portfólio não utiliza banco de dados próprio nem autenticação de visitantes.

## Instalação e execução

### Pré-requisitos

Node.js 24, npm e Git.

### Instalação de dependências

```bash
git clone https://github.com/Lucasasth3/Portfolio-LucasAsth.git
cd Portfolio-LucasAsth
npm ci
```

### Variáveis de ambiente

Copie [`.env.example`](.env.example) para `.env.local`, na raiz.

| Variável | Finalidade |
| --- | --- |
| `VITE_CONTACT_ENDPOINT` | Endpoint público do formulário |
| `VITE_WHATSAPP_NUMBER` | País, DDD e telefone, somente dígitos |
| `WAKATIME_ACCESS_TOKEN` | Token de leitura, exclusivo do servidor |
| `WAKATIME_USERNAME` | Perfil público opcional |
| `WAKATIME_RANGE` | Período consultado; padrão `all_time` |

As variáveis `VITE_` são públicas. Não coloque senhas ou tokens privados nelas. Reinicie o Vite após alterar o ambiente.

### Como executar

```bash
npm run dev
```

Abra `http://localhost:5173` e mantenha o terminal em execução. A porta é fixa: se estiver ocupada, o comando informa um erro. Se a aba estava aberta com o servidor parado, reinicie o servidor e atualize com `Ctrl+F5`.

```bash
npm run build
npm run preview
```

O build gera `dist`; o preview informa seu endereço no terminal.

### Formulário e WhatsApp

Crie um formulário no Formspree, confirme o e-mail de destino e preencha `VITE_CONTACT_ENDPOINT` com o endpoint recebido. Preencha `VITE_WHATSAPP_NUMBER` com o telefone completo. Envie uma mensagem real e confirme seu recebimento, inclusive em spam.

O formulário envia nome, e-mail, assunto e mensagem por `FormData`. Em caso de falha, mantém os campos e oferece contato direto por e-mail.

### WakaTime

Preencha `WAKATIME_ACCESS_TOKEN` com um token pessoal de leitura de [WakaTime OAuth](https://wakatime.com/oauth). A chave do plugin do editor não permite consultar estatísticas. As variáveis do WakaTime ficam no servidor, sem prefixo `VITE_`.

A rota `/api/wakatime` funciona no desenvolvimento, no preview e na Vercel. Retorna totais, linguagens e editores, sem nomes de projetos, arquivos ou máquinas. Os últimos dados válidos são preservados quando a consulta falha.

```bash
npm run sync:wakatime
```

Esse comando atualiza o registro incluído no build. Hospedagens exclusivamente estáticas utilizam `src/data/wakatimeSnapshot.json`; consultas atualizadas exigem a função HTTP.

## Deploy

O projeto está publicado na Vercel como `portfolio-lucasasth`. A configuração utiliza o preset Vite, comando `npm run build` e saída `dist`. O arquivo `vercel.json` permite acessar diretamente rotas como `/projects` e `/contact`.

Envie os commits para a branch `main` no GitHub: a integração inicia o deploy automaticamente. Confira o resultado em **Deployments** na Vercel. Cadastre as variáveis de ambiente no painel; alterações nelas exigem um novo deploy. Não envie tokens ou `.env.local` ao GitHub.

Após publicar, confira o menu em computador e celular, o acesso direto às rotas, as imagens, o formulário e as estatísticas. O domínio personalizado `lucasasth.dev` é opcional e ainda depende de registro e DNS.

## Estrutura de pastas

```text
api/                    Função HTTP do WakaTime para Vercel
docs/design/            Wireframes, telas e prévia navegável
public/
  capas/ e covers/      Capas dos livros
  icons/                Ícones de tecnologias
  images/               Retratos e imagens dos projetos
scripts/                Atualização do registro do WakaTime
server/                 Consulta e cache das estatísticas
src/
  components/           Componentes e seções
  data/                 Conteúdo, links e estatísticas salvas
  pages/                Páginas do portfólio
  services/             Envio do formulário e testes
  utils/                Ordenação da timeline e testes
  Aplicacao.jsx         Rotas e estrutura principal
  ProvedorIdioma.jsx    Seleção de idioma
vite.config.js          Configuração de desenvolvimento e build
vercel.json             Configuração das rotas na hospedagem
```

Atualize os projetos em `src/data/projetos.js`. As datas de início usam `startedAt`, no formato `AAAA-MM-DD`. CalculaDOR utiliza 1º de julho de 2026 como referência aproximada. DoAção e CalculaDOR possuem repositórios privados: suas telas, descrições e tecnologias estão no portfólio, mas o código não é público. As capas dos livros estão relacionadas em `src/data/livros.js`.

## Demonstração

Acesse o [site em funcionamento](https://portfolio-lucasasth.vercel.app) para testar a navegação, o idioma, o retrato e o contato. As [telas em SVG](docs/design/prototipos/) documentam as versões desktop e mobile.

### Wireframes e protótipos

O diretório `docs/design` contém 22 wireframes de média fidelidade e 22 telas visuais em SVG: 11 páginas e estados nas versões desktop (1440 px) e mobile (390 px). Inclui mapa de navegação e referência de estilos.

Para usar a prévia navegável, clone ou baixe o repositório e abra `docs/design/index.html` no navegador, sem servidor. O GitHub exibe o código desse HTML, não executa a prévia. Ela simula estados do formulário, sem enviar mensagens. Animações, busca de livros e serviços externos são referências estáticas.

O material documenta o site existente em 21 de novembro de 2026. O arquivo no Figma reúne wireframes das páginas principais e referências visuais. Ele não é um protótipo clicável; a navegação entre páginas deve ser demonstrada no site publicado. As versões completas em SVG e a prévia navegável estão em `docs/design`. As instruções estão em [LEIA-ME.txt](docs/design/LEIA-ME.txt).

## Testes

```bash
npm test
npm run lint
npm run build
```

Os testes usam o executor nativo do Node.js. Os arquivos [contato.test.js](src/services/contato.test.js) e [projetos.test.js](src/utils/projetos.test.js) verificam o envio do contato, o tratamento de falhas e a ordenação dos projetos. O Oxlint verifica o código e o Vite gera a versão de produção.

Na conferência manual, teste as páginas em computador e celular, a troca de idioma, os links e as imagens. No formulário, confirme tanto a mensagem de sucesso quanto o recebimento por e-mail.

## Documentações utilizadas

- [React](https://react.dev/).
- [React Router](https://reactrouter.com/).
- [Vite](https://vite.dev/guide/).
- [Node.js: testes](https://nodejs.org/api/test.html).
- [Vercel](https://vercel.com/docs).
- [Formspree](https://help.formspree.io/).
- [WakaTime API](https://wakatime.com/developers).

## Autores

[Lucas Asth](https://github.com/Lucasasth3) — estudante de Engenharia de Software na PUC Minas e autor do portfólio.

## Contribuição

Sugestões podem ser enviadas pelas issues do repositório. Para propor uma alteração, crie uma branch, descreva a mudança e execute testes, lint e build antes de abrir um pull request. Não inclua tokens ou arquivos de ambiente nas alterações.

## Agradecimentos

Documentação adaptada do [modelo de README do Prof. Dr. João Paulo Aramuni](https://github.com/joaopauloaramuni/desenvolvimento-e-integracao-de-aplicacoes-web/blob/main/TEMPLATES/template_README.md).

Os ícones em `public/icons` vêm do [Devicon](https://github.com/devicons/devicon), sob licença MIT.

## Licença

O repositório ainda não possui um arquivo de licença para o código do portfólio. Os recursos de terceiros permanecem sujeitos às respectivas licenças. Fotografias pessoais e capas de livros não recebem automaticamente a licença dos ícones.
