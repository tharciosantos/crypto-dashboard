/* eslint-disable @next/next/no-img-element */
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { FALLBACK_COINS } from "@/data/fallbackCoins";

export default function CoinDetailsPage() {
    const { id } = useParams(); 

    const [coinDetails, setCoinDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isFallback, setIsFallback] = useState(false);

    const fetchCoinDetails = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const url = `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`;
            const response = await fetch(url, { cache: 'no-store' });
            
            if (!response.ok) {
                 if (response.status === 404) throw new Error('Moeda não encontrada');
                 if (response.status === 429) throw new Error('Limite da API atingido (Rate Limit)');
                 throw new Error(`Erro ao buscar dados da moeda (${response.status})`);
            }
            const data = await response.json();
            setCoinDetails(data);
            setIsFallback(false);
        } catch (fetchError) {
            console.warn("Utilizando dados de contingência para detalhe da moeda:", fetchError.message);
            const fallback = FALLBACK_COINS.find(c => c.id === id || c.symbol === id);
            if (fallback) {
                setCoinDetails({
                    name: fallback.name,
                    symbol: fallback.symbol,
                    image: { large: fallback.image, thumb: fallback.image },
                    market_cap_rank: fallback.market_cap_rank,
                    description: fallback.description,
                    market_data: {
                        current_price: { usd: fallback.current_price },
                        price_change_percentage_24h: fallback.price_change_percentage_24h,
                        market_cap: { usd: fallback.market_cap },
                        total_volume: { usd: fallback.total_volume },
                        high_24h: { usd: fallback.high_24h },
                        low_24h: { usd: fallback.low_24h },
                    }
                });
                setIsFallback(true);
            } else {
                setError(fetchError.message);
            }
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        if (id) fetchCoinDetails();
    }, [id, fetchCoinDetails]);

    if (loading) { 
        return (
            <main className="min-h-screen bg-slate-950 text-white p-8 flex flex-col items-center justify-center">
                <div className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-indigo-500 border-r-transparent mb-4" />
                <p className="text-sm font-semibold text-slate-400">Carregando métricas da moeda...</p>
            </main>
        );
    }

    if (error && !coinDetails) {
        return (
            <main className="min-h-screen bg-slate-950 text-white p-8 flex flex-col items-center justify-center">
                <div className="max-w-md w-full bg-slate-900 border border-rose-500/30 p-6 rounded-2xl text-center">
                    <span className="text-3xl mb-2 block">⚠️</span>
                    <h2 className="text-lg font-bold text-rose-400 mb-2">Erro ao Carregar Moeda</h2>
                    <p className="text-xs text-slate-400 mb-6">{error}</p>
                    <Link 
                        href="/"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-all"
                    >
                        ← Voltar para o Dashboard
                    </Link>
                </div>
            </main>
        );
    }

    if (!coinDetails) return null;

    const marketData = coinDetails.market_data;
    const currentPrice = marketData?.current_price?.usd || 0;
    const priceChange = marketData?.price_change_percentage_24h || 0;
    const isPositive = priceChange >= 0;
    const high24h = marketData?.high_24h?.usd || currentPrice;
    const low24h = marketData?.low_24h?.usd || currentPrice;
    
    // Cálculo da barra de variação 24h
    const rangeSpan = high24h - low24h;
    const priceProgress = rangeSpan > 0 ? Math.min(100, Math.max(0, ((currentPrice - low24h) / rangeSpan) * 100)) : 50;

    return (
        <main className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-8 font-sans antialiased selection:bg-indigo-500 selection:text-white">
            <div className="max-w-4xl mx-auto">
                
                {/* Botão de Retorno e Indicador de Modo */}
                <div className="flex items-center justify-between mb-6">
                    <Link 
                        href="/" 
                        className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors bg-slate-900 border border-slate-800 px-3.5 py-2 rounded-xl"
                    >
                        ← Voltar para a lista
                    </Link>

                    {isFallback && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
                            Dados em Demonstração
                        </span>
                    )}
                </div>

                {/* Card Principal do Ativo */}
                <div className="p-6 sm:p-8 bg-slate-900/90 border border-slate-800 rounded-2xl shadow-xl backdrop-blur-sm mb-6">
                    
                    {/* Topo: Logo + Nome + Rank */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
                        <div className="flex items-center gap-4">
                            <img
                                src={coinDetails.image?.large || coinDetails.image?.thumb}
                                alt={coinDetails.name}
                                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-slate-800 p-1 border border-slate-700 shadow-md"
                            />
                            <div>
                                <div className="flex items-center gap-2.5">
                                    <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                                        {coinDetails.name}
                                    </h1>
                                    <span className="text-xs font-mono font-bold text-slate-400 uppercase px-2 py-0.5 bg-slate-800 border border-slate-700 rounded-md">
                                        {coinDetails.symbol}
                                    </span>
                                </div>
                                <span className="text-xs text-slate-400 font-medium">
                                    Rank #{coinDetails.market_cap_rank || 'N/A'} no Mercado Global
                                </span>
                            </div>
                        </div>

                        {/* Preço Principal */}
                        <div className="sm:text-right">
                            <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight">
                                ${currentPrice.toLocaleString('en-US', { 
                                    minimumFractionDigits: 2, 
                                    maximumFractionDigits: currentPrice < 1 ? 6 : 2 
                                })}
                            </div>
                            <div className="flex sm:justify-end items-center gap-2 mt-1">
                                <span className={`inline-flex items-center gap-1 text-sm font-mono font-bold px-2 py-0.5 rounded-lg border ${
                                    isPositive 
                                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                                        : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                                }`}>
                                    <span>{isPositive ? '↗' : '↘'}</span>
                                    <span>{Math.abs(priceChange).toFixed(2)}%</span>
                                </span>
                                <span className="text-xs text-slate-500">(24h)</span>
                            </div>
                        </div>
                    </div>

                    {/* Barra de Range 24h (Mínima vs Máxima) */}
                    <div className="py-6 border-b border-slate-800">
                        <div className="flex justify-between items-center text-xs font-mono text-slate-400 mb-2">
                            <span>Mín 24h: ${low24h.toLocaleString()}</span>
                            <span className="text-slate-500 font-sans">Faixa de Preço 24 Horas</span>
                            <span>Máx 24h: ${high24h.toLocaleString()}</span>
                        </div>
                        <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden relative">
                            <div 
                                className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400 rounded-full transition-all duration-500"
                                style={{ width: `${priceProgress}%` }}
                            />
                        </div>
                    </div>

                    {/* Grid de 4 Estatísticas Chave */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-b border-slate-800 text-sm">
                        <div className="p-3 bg-slate-950/60 border border-slate-800/80 rounded-xl">
                            <p className="text-xs text-slate-500 font-medium mb-1">Capitalização</p>
                            <p className="font-mono font-bold text-white text-sm sm:text-base">
                                ${marketData?.market_cap?.usd ? (marketData.market_cap.usd / 1e9).toFixed(2) + 'B' : 'N/A'}
                            </p>
                        </div>
                        <div className="p-3 bg-slate-950/60 border border-slate-800/80 rounded-xl">
                            <p className="text-xs text-slate-500 font-medium mb-1">Volume (24h)</p>
                            <p className="font-mono font-bold text-white text-sm sm:text-base">
                                ${marketData?.total_volume?.usd ? (marketData.total_volume.usd / 1e9).toFixed(2) + 'B' : 'N/A'}
                            </p>
                        </div>
                        <div className="p-3 bg-slate-950/60 border border-slate-800/80 rounded-xl">
                            <p className="text-xs text-slate-500 font-medium mb-1">Máxima (24h)</p>
                            <p className="font-mono font-bold text-emerald-400 text-sm sm:text-base">
                                ${high24h.toLocaleString()}
                            </p>
                        </div>
                        <div className="p-3 bg-slate-950/60 border border-slate-800/80 rounded-xl">
                            <p className="text-xs text-slate-500 font-medium mb-1">Mínima (24h)</p>
                            <p className="font-mono font-bold text-rose-400 text-sm sm:text-base">
                                ${low24h.toLocaleString()}
                            </p>
                        </div>
                    </div>

                    {/* Sobre a Criptomoeda */}
                    {(coinDetails.description?.pt || coinDetails.description?.en) ? (
                        <div className="pt-6">
                            <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                                <span>Sobre {coinDetails.name}</span>
                            </h2>
                            {!coinDetails.description?.pt && coinDetails.description?.en && (
                                <div className="mb-3.5 px-3.5 py-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs flex items-start sm:items-center gap-2.5">
                                    <span className="text-base leading-none">🌐</span>
                                    <span className="leading-tight">
                                        <strong>Nota de Tradução:</strong> Descrição oficial fornecida em inglês pela CoinGecko (tradução em português indisponível para este ativo).
                                    </span>
                                </div>
                            )}
                            <div
                                className="text-slate-300 text-xs sm:text-sm leading-relaxed prose prose-invert max-w-none prose-p:mb-3 prose-a:text-indigo-400 hover:prose-a:underline"
                                dangerouslySetInnerHTML={{ __html: coinDetails.description.pt || coinDetails.description.en }}
                            />
                        </div>
                    ) : (
                        <div className="pt-6">
                            <h2 className="text-lg font-bold text-white mb-2">Sobre {coinDetails.name}</h2>
                            <p className="text-xs text-slate-500 italic">Descrição textual não fornecida para este ativo pela API pública.</p>
                        </div>
                    )}

                </div>

            </div>
        </main>
    );
}