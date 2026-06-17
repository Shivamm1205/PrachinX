// Auth Types
export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  phoneNumber?: string;
  profileImage?: string;
  role: 'USER' | 'ADMIN' | 'TRADER';
  isVerified: boolean;
  isActive: boolean;
  createdAt: string;
}

export interface AuthResponse {
  token: string;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  role: string;
  message: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  phoneNumber?: string;
}

// Trade Types
export interface Trade {
  id: number;
  symbol: string;
  type: 'BUY' | 'SELL';
  quantity: number;
  price: number;
  totalValue: number;
  status: 'PENDING' | 'EXECUTED' | 'CANCELLED' | 'FAILED';
  notes?: string;
  createdAt: string;
  executedAt?: string;
}

export interface TradeRequest {
  symbol: string;
  type: 'BUY' | 'SELL';
  quantity: number;
  price: number;
  notes?: string;
}

// Portfolio Types
export interface Portfolio {
  id: number;
  totalBalance: number;
  availableBalance: number;
  investedAmount: number;
  totalProfitLoss: number;
  profitLossPercentage: number;
  createdAt: string;
  updatedAt: string;
}

// Market Types
export interface MarketPrice {
  symbol: string;
  price: string;
}

export interface MarketStats {
  symbol: string;
  priceChange: string;
  priceChangePercent: string;
  highPrice: string;
  lowPrice: string;
  volume: string;
  lastPrice: string;
}

// API Response Type
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
}

// Trading Bot Types
export interface TradingBot {
  id: number;
  name: string;
  description?: string;
  strategy: string;
  tradingPair: string;
  investmentAmount: number;
  profitLoss: number;
  status: 'ACTIVE' | 'INACTIVE' | 'PAUSED' | 'ERROR';
  createdAt: string;
}