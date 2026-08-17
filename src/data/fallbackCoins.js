export const FALLBACK_COINS = [
  {
    id: 'bitcoin',
    symbol: 'btc',
    name: 'Bitcoin',
    image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
    current_price: 96420.50,
    market_cap: 1905200340000,
    market_cap_rank: 1,
    total_volume: 42150890000,
    high_24h: 98150.00,
    low_24h: 95300.20,
    price_change_percentage_24h: 2.85,
    description: {
      pt: 'Bitcoin é a primeira moeda digital descentralizada do mundo, criada por Satoshi Nakamoto em 2009. Utiliza a tecnologia blockchain para permitir transações peer-to-peer seguras sem a necessidade de intermediários financeiros.',
      en: 'Bitcoin is the first decentralized digital currency, enabling instant payments to anyone, anywhere in the world without central authorities.'
    }
  },
  {
    id: 'ethereum',
    symbol: 'eth',
    name: 'Ethereum',
    image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
    current_price: 2780.40,
    market_cap: 334800120000,
    market_cap_rank: 2,
    total_volume: 21340500000,
    high_24h: 2845.00,
    low_24h: 2710.80,
    price_change_percentage_24h: 3.42,
    description: {
      pt: 'Ethereum é uma plataforma blockchain descentralizada global que executa contratos inteligentes (smart contracts) e aplicações descentralizadas (DApps).',
      en: 'Ethereum is a global, decentralized platform for smart contracts and decentralized applications.'
    }
  },
  {
    id: 'tether',
    symbol: 'usdt',
    name: 'Tether USD',
    image: 'https://assets.coingecko.com/coins/images/325/large/Tether.png',
    current_price: 1.00,
    market_cap: 138500200000,
    market_cap_rank: 3,
    total_volume: 68120400000,
    high_24h: 1.002,
    low_24h: 0.998,
    price_change_percentage_24h: 0.02,
    description: {
      pt: 'Tether (USDT) é a principal stablecoin atrelada ao dólar americano (1:1), amplamente utilizada para liquidez e hedge no mercado cripto.',
      en: 'Tether converts cash into digital currency, to anchor or tether the value to the price of national currencies like the US dollar.'
    }
  },
  {
    id: 'solana',
    symbol: 'sol',
    name: 'Solana',
    image: 'https://assets.coingecko.com/coins/images/4128/large/solana.png',
    current_price: 198.75,
    market_cap: 93450600000,
    market_cap_rank: 4,
    total_volume: 7890300000,
    high_24h: 205.10,
    low_24h: 192.40,
    price_change_percentage_24h: 4.65,
    description: {
      pt: 'Solana é uma blockchain de alto desempenho projetada para suportar aplicações descentralizadas em escala com taxas extremamente baixas e alta velocidade.',
      en: 'Solana is a highly functional open source project that banks on blockchain technology’s permissionless nature to provide decentralized finance (DeFi) solutions.'
    }
  },
  {
    id: 'binancecoin',
    symbol: 'bnb',
    name: 'BNB',
    image: 'https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png',
    current_price: 645.20,
    market_cap: 94120300000,
    market_cap_rank: 5,
    total_volume: 1850400000,
    high_24h: 658.00,
    low_24h: 638.10,
    price_change_percentage_24h: -0.84,
    description: {
      pt: 'BNB é a moeda nativa do ecossistema BNB Chain e da exchange Binance, utilizada para taxas de transação e governança.',
      en: 'BNB powers the BNB Chain ecosystem and is used for gas fees and exchange fee discounts.'
    }
  },
  {
    id: 'ripple',
    symbol: 'xrp',
    name: 'XRP',
    image: 'https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png',
    current_price: 2.34,
    market_cap: 133400500000,
    market_cap_rank: 6,
    total_volume: 9450200000,
    high_24h: 2.48,
    low_24h: 2.22,
    price_change_percentage_24h: 5.12,
    description: {
      pt: 'XRP é o ativo digital criado para pagamentos e transferências internacionais rápidas e de baixo custo pela Ripple.',
      en: 'XRP is a digital asset built for global real-time payments across financial institutions.'
    }
  },
  {
    id: 'cardano',
    symbol: 'ada',
    name: 'Cardano',
    image: 'https://assets.coingecko.com/coins/images/975/large/cardano.png',
    current_price: 0.78,
    market_cap: 27800400000,
    market_cap_rank: 7,
    total_volume: 1240500000,
    high_24h: 0.82,
    low_24h: 0.75,
    price_change_percentage_24h: 1.94,
    description: {
      pt: 'Cardano é uma plataforma blockchain de terceira geração baseada em pesquisa científica e validação por pares.',
      en: 'Cardano is a proof-of-stake blockchain platform that says its goal is to allow changemakers, innovators and visionaries to bring about positive global change.'
    }
  },
  {
    id: 'avalanche-2',
    symbol: 'avax',
    name: 'Avalanche',
    image: 'https://assets.coingecko.com/coins/images/12559/large/Avalanche_Circle_RedWhite_Trans.png',
    current_price: 31.45,
    market_cap: 12850300000,
    market_cap_rank: 8,
    total_volume: 890400000,
    high_24h: 33.10,
    low_24h: 30.50,
    price_change_percentage_24h: -1.25,
    description: {
      pt: 'Avalanche é uma plataforma de contratos inteligentes que visa proporcionar alta escalabilidade e finalização de transações quase instantânea.',
      en: 'Avalanche is an umbrella platform for launching decentralized finance (DeFi) applications, financial assets, trading and other services.'
    }
  },
  {
    id: 'dogecoin',
    symbol: 'doge',
    name: 'Dogecoin',
    image: 'https://assets.coingecko.com/coins/images/5/large/dogecoin.png',
    current_price: 0.264,
    market_cap: 38700200000,
    market_cap_rank: 9,
    total_volume: 2450100000,
    high_24h: 0.281,
    low_24h: 0.255,
    price_change_percentage_24h: 3.18,
    description: {
      pt: 'Dogecoin é uma criptomoeda de código aberto e peer-to-peer com uma comunidade vibrante e suporte a microtransações.',
      en: 'Dogecoin is an open-source peer-to-peer cryptocurrency that utilizes blockchain technology.'
    }
  },
  {
    id: 'chainlink',
    symbol: 'link',
    name: 'Chainlink',
    image: 'https://assets.coingecko.com/coins/images/877/large/chainlink-new-logo.png',
    current_price: 18.90,
    market_cap: 11450200000,
    market_cap_rank: 10,
    total_volume: 670300000,
    high_24h: 19.45,
    low_24h: 18.20,
    price_change_percentage_24h: 2.10,
    description: {
      pt: 'Chainlink é uma rede de oráculos descentralizada que conecta contratos inteligentes a dados do mundo real e APIs externas.',
      en: 'Chainlink is a blockchain abstraction layer that enables universally connected smart contracts.'
    }
  }
];
