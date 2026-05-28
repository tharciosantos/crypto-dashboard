# Crypto Dashboard

![Screenshot do Crypto Dashboard](./public/screenshot-crypto.png)

Dashboard de criptomoedas construído com Next.js App Router. A aplicação consome a API publica da CoinGecko para listar os principais ativos do mercado e exibir uma pagina de detalhes com metricas relevantes.

[Demo online](https://crypto-dashboard-five-sandy.vercel.app/)

## Visao geral

O projeto foi criado para demonstrar integracao com API externa, renderizacao dinamica no Next.js e uma interface responsiva com Tailwind CSS. O fluxo principal e simples:

- listar as 10 criptomoedas com maior market cap
- permitir busca instantanea por nome ou simbolo
- navegar para uma rota dinamica com detalhes da moeda selecionada
- apresentar estados de carregamento, erro e lista vazia

## Funcionalidades

- Listagem das 10 principais criptomoedas em USD
- Busca em tempo real por nome ou simbolo
- Pagina de detalhes em `/coin/[id]`
- Exibicao de preco atual, variacao em 24h, market cap, volume, maxima, minima e ranking
- Descricao da moeda com prioridade para conteudo em portugues e fallback para ingles
- Layout responsivo para desktop e mobile

## Stack

- `Next.js 15`
- `React 19`
- `Tailwind CSS 3`
- `@tailwindcss/typography`
- `CoinGecko API`

## Estrutura do projeto

```text
.
|-- public/
|   `-- screenshot-crypto.png
|-- src/
|   `-- app/
|       |-- coin/
|       |   `-- [id]/
|       |       `-- page.js
|       |-- globals.css
|       |-- layout.js
|       `-- page.js
|-- eslint.config.mjs
|-- next.config.mjs
|-- package.json
`-- tailwind.config.js
```

## Como executar

```bash
git clone https://github.com/tharciosantos/crypto-dashboard.git
cd crypto-dashboard
npm install
npm run dev
```

Abra `http://localhost:3000`.

## Scripts disponiveis

- `npm run dev`: inicia o servidor de desenvolvimento
- `npm run build`: gera a build de producao
- `npm run start`: sobe a aplicacao em modo producao
- `npm run lint`: executa o lint do projeto

## Fonte de dados

O projeto utiliza a API publica da CoinGecko:

- endpoint de mercado para a listagem principal
- endpoint individual por moeda para a pagina de detalhes

Como a versao gratuita possui limite de requisicoes, falhas temporarias podem ocorrer em momentos de uso intenso.

## Pontos de atencao

- A busca e o carregamento de dados acontecem no cliente
- O projeto depende da disponibilidade da API externa
- Algumas descricoes podem vir apenas em ingles, dependendo da moeda

## Autor

Tharcio Santos

- [LinkedIn](https://www.linkedin.com/in/tharcio-santos/)
- [Email](mailto:tharciosantos09@gmail.com)
