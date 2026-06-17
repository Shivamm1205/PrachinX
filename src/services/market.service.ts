import axiosInstance from "@/lib/axios";
import { ApiResponse, MarketPrice, MarketStats } from "@/types";

export const marketService = {
  getPrice: async (symbol: string): Promise<ApiResponse<MarketPrice>> => {
    const response = await axiosInstance.get(`/api/market/price/${symbol}`);
    return response.data;
  },

  getStats: async (symbol: string): Promise<ApiResponse<MarketStats>> => {
    const response = await axiosInstance.get(`/api/market/stats/${symbol}`);
    return response.data;
  },

  getTopMarkets: async (): Promise<ApiResponse<MarketStats[]>> => {
    const response = await axiosInstance.get("/api/market/top");
    return response.data;
  },

  getKlines: async (
    symbol: string,
    interval: string = "1h"
  ): Promise<ApiResponse<any>> => {
    const response = await axiosInstance.get(
      `/api/market/klines/${symbol}?interval=${interval}`
    );
    return response.data;
  },
};