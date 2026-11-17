# Portfólio — Lucas Asth

Site pessoal com formação, experiências, projetos, leituras e atividade de programação. Feito com React, Vite e CSS.

## Executar

```bash
npm install
npm run dev
```

## WakaTime

Copie `.env.example` para `.env.local` e preencha `WAKATIME_ACCESS_TOKEN` com o token pessoal de leitura de https://wakatime.com/oauth. A chave do plugin do editor não permite consultar estatísticas e recebe resposta 403 para esse uso. Reinicie o servidor depois de alterar as variáveis.

`WAKATIME_USERNAME` é opcional: adiciona o link do perfil e permite consultar estatísticas públicas sem token. `WAKATIME_RANGE` define o período; o padrão é `all_time`. Os segredos ficam no servidor, sem prefixo `VITE_`.

A rota `/api/wakatime` funciona no servidor local, em `npm run preview` e no Vercel pela função `api/wakatime.js`. No Vercel, configure as mesmas variáveis nas configurações do projeto. Outros provedores precisam executar a função em um servidor Node; hospedagem exclusivamente estática usa o último registro incluído no site.

O servidor retorna apenas totais, linguagens e editores, sem nomes de projetos, arquivos ou máquinas. Servidor e navegador mantêm os últimos dados válidos por seis horas e preservam esse registro quando a consulta falha. A média diária considera os dias com código. Estatísticas em processamento recebem até três tentativas com intervalo crescente.

O registro real em `src/data/wakatimeSnapshot.json` também fica disponível em uma primeira visita sem conexão. Para renová-lo antes de compilar, execute `npm run sync:wakatime` com o token configurado. Esse comando preserva o arquivo anterior se a consulta falhar.

## Capas e tecnologias

As capas são arquivos locais em `public/capas` e `public/covers`, associados aos títulos em `src/data/livros.js`. Uma imagem indisponível recebe uma capa com título e autor. Os ícones de tecnologias em `public/icons` vêm do projeto [Devicon](https://github.com/devicons/devicon), sob licença MIT.

## Verificar e compilar

```bash
npm test
npm run lint
npm run build
npm run preview
```
