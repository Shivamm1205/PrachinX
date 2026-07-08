const API_URL = process.env.NEXT_PUBLIC_API_URL
  || "https://prachinx-backend.onrender.com";

export const authService = {
  register: async (data: {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    phoneNumber?: string;
  }) => {
    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const text = await response.text();
    return JSON.parse(text);
  },

  login: async (data: { email: string; password: string }) => {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const text = await response.text();
    return JSON.parse(text);
  },

  getCurrentUser: async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/api/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const text = await response.text();
    return JSON.parse(text);
  },
};