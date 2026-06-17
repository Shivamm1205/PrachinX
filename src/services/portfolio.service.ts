import axiosInstance from "@/lib/axios";
import { ApiResponse, Portfolio } from "@/types";

export const portfolioService = {
  getPortfolio: async (): Promise<ApiResponse<Portfolio>> => {
    const response = await axiosInstance.get("/api/portfolio");
    return response.data;
  },
};