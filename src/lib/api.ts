const API = process.env.NEXT_PUBLIC_API_URL 
  || "https://prachinx-backend.onrender.com";

export const getToken = (): string => {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("token") || "";
};

export const apiFetch = async (
  url: string,
  options: RequestInit = {}
): Promise<any> => {
  const token = getToken();
  const res = await fetch(`${API}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }
  const text = await res.text();
  if (!text || text.trim() === "") return null;
  return JSON.parse(text);
};

export default apiFetch;