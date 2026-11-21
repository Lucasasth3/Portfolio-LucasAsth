# Portfólio — Lucas Asth

Portfólio profissional em React e Vite com formação, experiências, projetos, leituras e atividade de programação. Conteúdo disponível em português e inglês.

- **Site publicado:** [portfolio-lucasasth.vercel.app](https://portfolio-lucasasth.vercel.app).
- **Figma e wireframes:** adicionar o link do protótipo.
- **Autor:** [Lucas Asth](https://github.com/Lucasasth3).

## Funcionalidades

Apresentação pessoal bilíngue, projetos com capas e tecnologias, experiências, formação e contato. A timeline ordena automaticamente as datas cadastradas do projeto mais antigo ao mais recente; itens sem data ficam ao final. O site inclui estatísticas do WakaTime, globo de habilidades e retrato interativo, com adaptações para telas menores e movimento reduzido.

## Tecnologias e dependências

| Dependência | Versão declarada | Uso |
| --- | --- | --- |
| React / React DOM | 19.3.1 | Componentes e renderização |
| React Router DOM | 7.18.5 | Navegação |
| Vite | 8.3.6 | Desenvolvimento e build |
| @vitejs/plugin-react | 6.1.2 | Integração React e Vite |
| Oxlint | 1.90.0 | Análise estática |
| @types/react / @types/react-dom | 19.3.0 | Definições de tipos |

O visual utiliza CSS e SVG. Os intervalos de versões estão em `package.json`, e as versões instaladas em `package-lock.json`. Os testes utilizam o executor nativo do Node.js.

## Estrutura de diretórios

```text
api/                    Função HTTP do WakaTime para Vercel
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
vercel.json             Acesso direto às rotas na hospedagem
```

## Instalação e execução local

Utilize Node.js 24 e npm. Na pasta do projeto:

```bash
npm ci
```

Copie `.env.example` para `.env.local`, preencha as integrações desejadas e execute:

```bash
npm run dev
```

Abra `http://localhost:5173`. Mantenha o terminal com o Vite em execução enquanto usar o site local: fechar ou interromper o servidor impede o carregamento de páginas e imagens, mesmo quando a aba já estava aberta. Reinicie o servidor após alterar variáveis de ambiente.

O comando usa a porta 5173 e informa um erro se ela estiver ocupada, em vez de abrir silenciosamente em outra porta. Se a página já estava aberta com imagens quebradas, inicie o servidor e atualize a aba com `Ctrl+F5`.

```bash
npm test
npm run lint
npm run build
npm run preview
```

O build gera `dist`; o preview permite verificar essa versão localmente.

## Configurar o formulário e WhatsApp

1. Crie um formulário em um serviço como Formspree e confirme o e-mail de destino na conta do serviço.
2. Coloque o endpoint recebido em `VITE_CONTACT_ENDPOINT`, no arquivo `.env.local`. O serviço deve aceitar POST com `FormData` e retornar sucesso HTTP apenas ao aceitar a mensagem.
3. Preencha `VITE_WHATSAPP_NUMBER` com seu número completo: código do país, DDD e número, somente dígitos.
4. Reinicie o Vite. Na hospedagem, cadastre essas variáveis e faça um novo build.
5. Envie uma mensagem real e confirme o recebimento na caixa de entrada, inclusive spam.

O formulário envia nome, e-mail, assunto e mensagem. Em caso de falha, mantém os campos e oferece contato direto por e-mail. As variáveis `VITE_` são públicas: não coloque senhas ou chaves privadas nelas.

As recomendações cadastradas na página de contato ficam somente no navegador que as salvou; não são um mural compartilhado.

## WakaTime

Preencha `WAKATIME_ACCESS_TOKEN` com um token pessoal de leitura de [WakaTime OAuth](https://wakatime.com/oauth). A chave do plugin do editor não permite consultar estatísticas. `WAKATIME_USERNAME` é opcional: adiciona o link do perfil e permite consultar estatísticas públicas. `WAKATIME_RANGE` define o período; o padrão é `all_time`.

Essas variáveis ficam no servidor, sem prefixo `VITE_`. A rota `/api/wakatime` funciona no desenvolvimento, no preview e na Vercel por `api/wakatime.js`. Retorna totais, linguagens e editores, sem nomes de projetos, arquivos ou máquinas. Os últimos dados válidos são preservados quando a consulta falha.

Para atualizar o registro incluído no build:

```bash
npm run sync:wakatime
```

Hospedagens exclusivamente estáticas utilizam `src/data/wakatimeSnapshot.json`; consultas atualizadas exigem a função HTTP.

## Conteúdo a completar

- `src/data/projetos.js`: mantenha as datas em `startedAt`, no formato `AAAA-MM-DD`, e complete os campos `website` quando houver URLs disponíveis. CalculaDOR utiliza 1º de julho de 2026 como referência aproximada do início do mês.
- DoAção e CalculaDOR têm repositórios privados. O portfólio apresenta suas telas, descrições e tecnologias; o código-fonte desses projetos não está disponível publicamente.
- `src/data/livros.js`: relaciona os títulos às capas locais.
- Inclua o link do Figma no início deste README.

## Hospedagem na Vercel

Importe o repositório na sua conta usando o preset Vite, comando `npm run build` e saída `dist`. Cadastre as variáveis de ambiente do contato e do WakaTime. O arquivo `vercel.json` prepara o acesso direto a páginas como `/projects` e `/contact`.

O projeto está publicado na Vercel como `portfolio-lucasasth`. Após cada atualização, confira o menu em computador e celular, a atualização direta das rotas, as imagens, o formulário e as estatísticas.

Para publicar os arquivos locais no projeto já vinculado:

```bash
npx vercel --prod
```

Os arquivos `.env*` não são enviados no deploy. Configure as variáveis pelo painel da Vercel; o token de leitura do WakaTime deve permanecer como segredo do servidor. O domínio personalizado desejado é `lucasasth.dev`, cuja configuração ainda depende do registro e do DNS.

## Créditos

Os ícones em `public/icons` vêm do [Devicon](https://github.com/devicons/devicon), sob licença MIT.
