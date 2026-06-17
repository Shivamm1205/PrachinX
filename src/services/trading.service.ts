import axiosInstance from "@/lib/axios";
import { ApiResponse, Trade, TradeRequest } from "@/types";

export const tradingService = {
  executeTrade: async (data: TradeRequest): Promise<ApiResponse<Trade>> => {
    const response = await axiosInstance.post("/api/trades/execute", data);
    return response.data;
  },

  getTrades: async (): Promise<ApiResponse<Trade[]>> => {
    const response = await axiosInstance.get("/api/trades");
    return response.data;
  },

  getTradeById: async (id: number): Promise<ApiResponse<Trade>> => {
    const response = await axiosInstance.get(`/api/trades/${id}`);
    return response.data;
  },

  cancelTrade: async (id: number): Promise<ApiResponse<Trade>> => {
    const response = await axiosInstance.put(`/api/trades/${id}/cancel`);
    return response.data;
  },
};