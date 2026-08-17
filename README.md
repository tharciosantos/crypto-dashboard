# Crypto Dashboard

Aplicação web para monitoramento em tempo real do mercado de criptomoedas, desenvolvida com **Next.js 15 (App Router)** e **Tailwind CSS**. O projeto consome a API pública da **CoinGecko**, conta com blindagem de contingência contra rate-limits, KPIs de mercado, filtros por altas/baixas e páginas detalhadas de cada ativo.

## Status do projeto

**Concluído com versão disponível em produção.**

As funcionalidades de listagem em tempo real, busca fuzzy, cálculo de indicadores de mercado (KPIs), faixas de preço 24h e rotas dinâmicas estão 100% implementadas e validadas.

## Objetivo do projeto

O Crypto Dashboard foi desenvolvido para demonstrar boas práticas no consumo de APIs financeiras externas em aplicações React modernas, com foco em:
- **Resiliência e Disponibilidade:** tratamento elegante de rate-limiting (HTTP 429) e dados de contingência para evitar telas de erro.
- **UI/UX Dark FinTech:** visual inspirado em terminais financeiros profissionais (TradingView, CoinMarketCap) com tipografia mono para números e badges de variação.
- **Next.js 15 App Router:** rotas dinâmicas, renderização otimizada com React Compiler e imagens remotas seguras.

## Demonstração

- **Aplicação em produção:** [https://crypto-dashboard-five-sandy.vercel.app/](https://crypto-dashboard-five-sandy.vercel.app/)
- **Repositório:** [https://github.com/tharciosantos/crypto-dashboard](https://github.com/tharciosantos/crypto-dashboard)

![Tela principal do Crypto Dashboard](./public/screenshot-crypto.png)

## Funcionalidades implementadas

### Painel Geral & Indicadores de Mercado (KPIs)

- **3 Cards de KPIs no Topo:**
  - 🚀 **Maior Alta 24h:** ativo com melhor desempenho percentual do dia.
  - 💧 **Líder de Volume 24h:** ativo com maior liquidez e volume financeiro negociado.
  - 📊 **Market Cap Monitorado:** soma da capitalização total em trilhões de dólares.
- **Filtros Rápidos por Desempenho:**
  - *Todos* (listagem completa)
  - *Maiores Altas ↗* (apenas ativos no positivo)
  - *Em Baixa ↘* (ativos em correção)
- **Busca em tempo real** por nome ou símbolo (ex: `BTC`, `ETH`, `Solana`).
- **Badges de Variação 24h Coloridos:** identificação visual instantânea de oscilação positiva ou negativa.

### Página de Detalhes do Ativo (`/coin/[id]`)

- **Cabeçalho com Rank de Mercado:** posição do ativo no ranking global (ex: `#1`).
- **Preço com Alta Precisão:** formatação monetária com suporte a decimais para moedas fracionárias.
- **Barra de Faixa de Preço 24h:** indicador visual mostrando a posição do preço atual entre a mínima e a máxima do dia.
- **Grid de Estatísticas Chave:** Capitalização, Volume 24h, Máxima 24h e Mínima 24h.
- **Seção "Sobre a Criptomoeda":** descrição histórica e técnica do projeto em português/inglês.

### Resiliência & Contingência (Rate-Limit Shield)

- Fallback automático com dados estruturados caso a API pública atinja o limite temporário de requisições gratuitas (HTTP 429).
- A aplicação nunca entra em tela de erro quebrada, garantindo 100% de tempo de atividade em demonstrações.

## Tecnologias utilizadas

### Front-end & Framework

- Next.js 15 (App Router)
- React 19
- React Compiler
- Tailwind CSS 3
- Tailwind CSS Typography

### APIs & Dados

- CoinGecko Public API (REST)
- Fetch API com controle de cache

### Qualidade e deploy

- ESLint
- Vercel

## Estrutura geral do projeto

```text
crypto-dashboard/
├── public/
│   └── screenshot-crypto.png       # Imagem utilizada no README
├── src/
│   ├── app/
│   │   ├── coin/
│   │   │   └── [id]/
│   │   │       └── page.js         # Página de detalhes com estatísticas e faixa 24h
│   │   ├── globals.css             # Estilos globais e fontes
│   │   ├── layout.js               # RootLayout e metadados
│   │   └── page.js                 # Painel principal com KPIs, filtros e busca
│   └── data/
│       └── fallbackCoins.js        # Dataset de contingência contra rate-limits
├── next.config.mjs                 # Configuração Next.js, imagens e React Compiler
├── package.json                    # Dependências e scripts
└── tailwind.config.js              # Configuração Tailwind CSS
```

## Como executar localmente

### 1. Clone o repositório

```bash
git clone https://github.com/tharciosantos/crypto-dashboard.git
cd crypto-dashboard
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Inicie a aplicação

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador.

### Scripts disponíveis

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento Next.js. |
| `npm run build` | Gera o build otimizado de produção. |
| `npm run start` | Inicia o servidor com o build gerado. |
| `npm run lint` | Executa o ESLint. |

## Autor

**Nome:** Tharcio Santos  
**GitHub:** [https://github.com/tharciosantos](https://github.com/tharciosantos)  
**LinkedIn:** [https://www.linkedin.com/in/tharcio-santos-dev/](https://www.linkedin.com/in/tharcio-santos-dev/)  
**Portfólio:** [https://tharcio-portfolio.vercel.app/](https://tharcio-portfolio.vercel.app/)
