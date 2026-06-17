export interface TradeRecord {
  id: number;
  symbol: string;
  type: "BUY" | "SELL";
  quantity: number;
  price: number;
  totalValue: number;
  status: "PENDING" | "EXECUTED" | "CANCELLED" | "FAILED";
  notes?: string;
  createdAt: string;
  executedAt?: string;
}

export const tradeHistory: TradeRecord[] = [
  {
    id: 1,
    symbol: "BTCUSDT",
    type: "BUY",
    quantity: 0.125,
    price: 28000,
    totalValue: 3500,
    status: "EXECUTED",
    notes: "Initial buy",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    executedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
  {
    id: 2,
    symbol: "ETHUSDT",
    type: "SELL",
    quantity: 2.1,
    price: 1700,
    totalValue: 3570,
    status: "EXECUTED",
    notes: "Profit-taking",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 15).toISOString(),
    executedAt: new Date(Date.now() - 1000 * 60 * 60 * 15).toISOString(),
  },
  {
    id: 3,
    symbol: "SOLUSDT",
    type: "BUY",
    quantity: 15,
    price: 22,
    totalValue: 330,
    status: "PENDING",
    notes: "Rebalance",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
  },
];

export function addTrade(trade: TradeRecord) {
  tradeHistory.unshift(trade);
}

export function getTrade(id: number) {
  return tradeHistory.find((trade) => trade.id === id);
}

export function cancelTrade(id: number) {
  const trade = getTrade(id);
  if (!trade) return null;
  trade.status = "CANCELLED";
  trade.executedAt = new Date().toISOString();
  return trade;
}
