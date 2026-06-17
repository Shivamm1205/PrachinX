import axiosInstance from "../lib/axios";

export const authService = {
  register: async (data: {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    phoneNumber?: string;
  }) => {
    const response = await axiosInstance.post("/api/auth/register", data);
    return response.data;
  },

  login: async (data: { email: string; password: string }) => {
    const response = await axiosInstance.post("/api/auth/login", data);
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await axiosInstance.get("/api/users/me");
    return response.data;
  },
};