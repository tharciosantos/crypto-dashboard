/* eslint-disable @next/next/no-img-element */
'use client'

import { useState, useEffect, useMemo } from "react"
import Link from 'next/link';
import { FALLBACK_COINS } from "@/data/fallbackCoins";

export default function HomePage() {
    const [coins, setCoins] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [isUsingFallback, setIsUsingFallback] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [filterCategory, setFilterCategory] = useState('todos') // 'todos', 'altas', 'baixas'

    useEffect(() => {
        const fetchCoins = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(
                    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=15&page=1&sparkline=false",
                    { cache: 'no-store' }
                );

                if (!response.ok) {
                    throw new Error(`Erro na API (${response.status})`);
                }

                const data = await response.json();
                if (Array.isArray(data) && data.length > 0) {
                    setCoins(data);
                    setIsUsingFallback(false);
                } else {
                    throw new Error("Dados vazios da API");
                }
            } catch (err) {
                console.warn("Utilizando dados de contingência/fallback para Crypto Dashboard:", err.message);
                setCoins(FALLBACK_COINS);
                setIsUsingFallback(true);
            } finally {
                setLoading(false);
            }
        };

        fetchCoins();
    }, []);

    // KPIs de Mercado
    const kpis = useMemo(() => {
        if (!coins || coins.length === 0) return null;
        
        const sortedByChange = [...coins].sort(
            (a, b) => (b.price_change_percentage_24h || 0) - (a.price_change_percentage_24h || 0)
        );
        const sortedByVolume = [...coins].sort(
            (a, b) => (b.total_volume || 0) - (a.total_volume || 0)
        );
        const totalMarketCap = coins.reduce((acc, c) => acc + (c.market_cap || 0), 0);

        return {
            topGainer: sortedByChange[0],
            topVolume: sortedByVolume[0],
            totalMarketCap
        };
    }, [coins]);

    // Filtragem e Busca
    const filteredCoins = useMemo(() => {
        let result = coins;

        if (searchTerm.trim()) {
            const term = searchTerm.toLowerCase();
            result = result.filter(coin =>
                coin.name.toLowerCase().includes(term) ||
                coin.symbol.toLowerCase().includes(term)
            );
        }

        if (filterCategory === 'altas') {
            result = result.filter(c => (c.price_change_percentage_24h || 0) >= 0);
        } else if (filterCategory === 'baixas') {
            result = result.filter(c => (c.price_change_percentage_24h || 0) < 0);
        }

        return result;
    }, [coins, searchTerm, filterCategory]);

    return (
        <main className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-8 selection:bg-indigo-500 selection:text-white font-sans antialiased">
            <div className="max-w-5xl mx-auto">
                
                {/* Header Principal */}
                <header className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-800/80 pb-6">
                    <div>
                        <div className="flex items-center gap-2 mb-1.5">
                            <div className="h-8 w-8 rounded-lg bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 font-bold text-lg">
                                ₿
                            </div>
                            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                                Crypto Dashboard
                            </h1>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-400">
                            Monitoramento em tempo real de cotações, capitalização e variação de ativos
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        {isUsingFallback && (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                                <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
                                Modo de Demonstração
                            </span>
                        )}
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                            CoinGecko API Live
                        </span>
                    </div>
                </header>

                {/* 3 KPIs Resumo de Mercado */}
                {kpis && !loading && (
                    <section className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-8">
                        {/* KPI 1: Maior Alta */}
                        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800/80 shadow-sm relative overflow-hidden group hover:border-emerald-500/40 transition-all">
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Maior Alta 24h</span>
                                <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                                    +{(kpis.topGainer?.price_change_percentage_24h || 0).toFixed(2)}%
                                </span>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                                <img src={kpis.topGainer?.image} alt={kpis.topGainer?.name} className="w-5 h-5 rounded-full" />
                                <span className="font-bold text-white text-sm">{kpis.topGainer?.name}</span>
                                <span className="text-xs text-slate-400 uppercase font-mono">{kpis.topGainer?.symbol}</span>
                            </div>
                        </div>

                        {/* KPI 2: Maior Volume */}
                        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800/80 shadow-sm relative overflow-hidden group hover:border-indigo-500/40 transition-all">
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Líder de Volume 24h</span>
                                <span className="text-xs font-mono font-semibold text-indigo-400">
                                    ${((kpis.topVolume?.total_volume || 0) / 1e9).toFixed(1)}B
                                </span>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                                <img src={kpis.topVolume?.image} alt={kpis.topVolume?.name} className="w-5 h-5 rounded-full" />
                                <span className="font-bold text-white text-sm">{kpis.topVolume?.name}</span>
                                <span className="text-xs text-slate-400 uppercase font-mono">{kpis.topVolume?.symbol}</span>
                            </div>
                        </div>

                        {/* KPI 3: Total Market Cap */}
                        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800/80 shadow-sm relative overflow-hidden group hover:border-slate-700 transition-all">
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Market Cap Monitorado</span>
                                <span className="text-xs font-semibold text-slate-300">
                                    {coins.length} Ativos
                                </span>
                            </div>
                            <p className="text-lg font-bold text-white font-mono mt-1">
                                ${(kpis.totalMarketCap / 1e12).toFixed(2)} Trilhões USD
                            </p>
                        </div>
                    </section>
                )}

                {/* Barra de Filtros e Busca */}
                <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between mb-6">
                    {/* Filtros em Pílulas */}
                    <div className="flex gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl">
                        <button 
                            type="button"
                            onClick={() => setFilterCategory('todos')}
                            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                                filterCategory === 'todos' 
                                    ? 'bg-indigo-600 text-white shadow-sm' 
                                    : 'text-slate-400 hover:text-white'
                            }`}
                        >
                            Todos ({coins.length})
                        </button>
                        <button 
                            type="button"
                            onClick={() => setFilterCategory('altas')}
                            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                                filterCategory === 'altas' 
                                    ? 'bg-emerald-600 text-white shadow-sm' 
                                    : 'text-slate-400 hover:text-white'
                            }`}
                        >
                            Maiores Altas ↗
                        </button>
                        <button 
                            type="button"
                            onClick={() => setFilterCategory('baixas')}
                            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                                filterCategory === 'baixas' 
                                    ? 'bg-rose-600 text-white shadow-sm' 
                                    : 'text-slate-400 hover:text-white'
                            }`}
                        >
                            Em Baixa ↘
                        </button>
                    </div>

                    {/* Input de Busca */}
                    <div className="relative flex-1 sm:max-w-xs">
                        <input
                            className="w-full pl-9 pr-8 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Buscar por nome ou símbolo (ex: BTC)..."
                        />
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs">
                            🔍
                        </span>
                        {searchTerm && (
                            <button 
                                type="button"
                                onClick={() => setSearchTerm('')}
                                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs cursor-pointer"
                            >
                                ✕
                            </button>
                        )}
                    </div>
                </div>

                {/* Conteúdo Principal / Tabela de Criptomoedas */}
                {loading ? (
                    <div className="py-16 text-center">
                        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-indigo-500 border-r-transparent mb-3" />
                        <p className="text-sm font-semibold text-slate-400">Carregando cotações de mercado...</p>
                    </div>
                ) : filteredCoins.length === 0 ? (
                    <div className="py-16 text-center border border-slate-800 rounded-2xl bg-slate-900/50">
                        <span className="text-3xl mb-2 block">🔍</span>
                        <p className="text-sm font-semibold text-slate-300">Nenhuma criptomoeda encontrada</p>
                        <p className="text-xs text-slate-500 mt-1">Tente ajustar o termo da busca ou o filtro selecionado.</p>
                    </div>
                ) : (
                    <div className="space-y-2.5">
                        {filteredCoins.map((coin, index) => {
                            const isPositive = (coin.price_change_percentage_24h || 0) >= 0;
                            return (
                                <Link 
                                    href={`/coin/${coin.id}`} 
                                    key={coin.id}
                                    className="block group"
                                >
                                    <div className="flex items-center justify-between p-3.5 sm:p-4 bg-slate-900/80 border border-slate-800/90 hover:border-indigo-500/50 hover:bg-slate-900 rounded-xl shadow-xs transition-all duration-200 cursor-pointer">
                                        
                                        {/* Lado Esquerdo: Rank + Ícone + Nome */}
                                        <div className="flex items-center gap-3 sm:gap-4">
                                            <span className="w-5 text-center text-xs font-mono font-semibold text-slate-500">
                                                #{coin.market_cap_rank || index + 1}
                                            </span>
                                            <img
                                                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-800 p-0.5"
                                                src={coin.image}
                                                alt={coin.name}
                                            />
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <span className="font-bold text-white text-sm sm:text-base group-hover:text-indigo-300 transition-colors">
                                                        {coin.name}
                                                    </span>
                                                    <span className="text-[11px] font-mono font-semibold text-slate-400 uppercase px-1.5 py-0.2 bg-slate-800 rounded">
                                                        {coin.symbol}
                                                    </span>
                                                </div>
                                                <span className="text-[11px] text-slate-500 hidden sm:block">
                                                    Cap: ${(coin.market_cap || 0).toLocaleString()}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Lado Direito: Preço + Variação 24h */}
                                        <div className="flex items-center gap-3 sm:gap-5">
                                            <div className="text-right">
                                                <div className="font-bold text-white font-mono text-sm sm:text-base">
                                                    ${(coin.current_price || 0).toLocaleString('en-US', { 
                                                        minimumFractionDigits: 2, 
                                                        maximumFractionDigits: coin.current_price < 1 ? 4 : 2 
                                                    })}
                                                </div>
                                                <div className="text-[11px] text-slate-400 font-mono hidden sm:block">
                                                    Vol: ${((coin.total_volume || 0) / 1e6).toFixed(1)}M
                                                </div>
                                            </div>

                                            {/* Badge de Variação 24h */}
                                            <div className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold flex items-center gap-1 border shrink-0 ${
                                                isPositive 
                                                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                                                    : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                                            }`}>
                                                <span>{isPositive ? '↗' : '↘'}</span>
                                                <span>{Math.abs(coin.price_change_percentage_24h || 0).toFixed(2)}%</span>
                                            </div>
                                        </div>

                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}

                {/* Rodapé Informativo */}
                <footer className="mt-10 pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
                    <p>Dados fornecidos pela CoinGecko Public API com atualização contínua.</p>
                    <p>Desenvolvido com Next.js 15 App Router & Tailwind CSS</p>
                </footer>

            </div>
        </main>
    );
}