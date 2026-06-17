import axiosInstance from "@/lib/axios";
import { ApiResponse } from "@/types";

export const aiService = {
  getPricePrediction: async (symbol: string): Promise<ApiResponse<any>> => {
    const response = await axiosInstance.get(
      `/api/ai/predict/price?symbol=${symbol}`
    );
    return response.data;
  },

  getSentimentAnalysis: async (symbol: string): Promise<ApiResponse<any>> => {
    const response = await axiosInstance.get(
      `/api/ai/predict/sentiment?symbol=${symbol}`
    );
    return response.data;
  },

  getTradingStrategy: async (
    symbol: string,
    risk: string
  ): Promise<ApiResponse<any>> => {
    const response = await axiosInstance.get(
      `/api/ai/strategy?symbol=${symbol}&risk=${risk}`
    );
    return response.data;
  },

  chatWithAI: async (message: string): Promise<ApiResponse<any>> => {
    const response = await axiosInstance.post("/api/ai/chat", { message });
    return response.data;
  },
};

export default aiService;