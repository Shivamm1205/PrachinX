import { create } from "zustand";
import { MarketPrice, MarketStats } from "@/types";

interface MarketState {
  prices: Record<string, MarketPrice>;
  stats: Record<string, MarketStats>;
  topMarkets: MarketStats[];
  isLoading: boolean;
  setPrices: (symbol: string, price: MarketPrice) => void;
  setStats: (symbol: string, stats: MarketStats) => void;
  setTopMarkets: (markets: MarketStats[]) => void;
  setLoading: (loading: boolean) => void;
}

export const useMarketStore = create<MarketState>((set) => ({
  prices: {},
  stats: {},
  topMarkets: [],
  isLoading: false,

  setPrices: (symbol, price) =>
    set((state) => ({
      prices: { ...state.prices, [symbol]: price },
    })),

  setStats: (symbol, stats) =>
    set((state) => ({
      stats: { ...state.stats, [symbol]: stats },
    })),

  setTopMarkets: (markets) => set({ topMarkets: markets }),

  setLoading: (loading) => set({ isLoading: loading }),
}));