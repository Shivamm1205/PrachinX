"use client";

import { useEffect, useState } from "react";
import axiosInstance from "../../../lib/axios";

const SYMBOLS = ["BTCUSDT", "ETHUSDT", "BNBUSDT", "SOLUSDT", "ADAUSDT"];

export default function TradingPage() {
  const [trades, setTrades] = useState<any[]>([]);
  const [symbol, setSymbol] = useState("BTCUSDT");
  const [type, setType] = useState("BUY");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [currentPrice, setCurrentPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTrades();
    fetchPrice("BTCUSDT");
  }, []);

  useEffect(() => {
    fetchPrice(symbol);
  }, [symbol]);

  const fetchTrades = async () => {
    try {
      const res = await axiosInstance.get("/api/trades");
      if (res.data.success) setTrades(res.data.data.slice(0, 10));
    } catch (err) {
      console.error(err);
    }
  };

  const fetchPrice = async (sym: string) => {
    try {
      const res = await axiosInstance.get(`/api/market/price/${sym}`);
      if (res.data.success) {
        setCurrentPrice(res.data.data.price);
        setPrice(res.data.data.price);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleTrade = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await axiosInstance.post("/api/trades/execute", {
        symbol,
        type,
        quantity: Number(quantity),
        price: Number(price),
      });
      if (res.data.success) {
        setSuccess("Trade executed successfully!");
        setQuantity("");
        fetchTrades();
      } else {
        setError(res.data.message || "Trade failed!");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Trade failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "24px", color: "white" }}>

      {/* Header */}
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "bold",
          background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          Trading
        </h1>
        <p style={{ color: "#94a3b8", marginTop: "4px" }}>
          Execute buy and sell orders
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>

        {/* Trade Form */}
        <div style={{ background: "rgba(15,22,41,0.8)",
          border: "1px solid #1e2d4a", borderRadius: "12px", padding: "24px" }}>
          <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "20px" }}>
            New Order
          </h2>

          {success && (
            <div style={{ background: "rgba(16,185,129,0.1)",
              border: "1px solid rgba(16,185,129,0.3)",
              borderRadius: "8px", padding: "12px",
              marginBottom: "16px", color: "#10b981", fontSize: "14px" }}>
              ✅ {success}
            </div>
          )}

          {error && (
            <div style={{ background: "rgba(239,68,68,0.1)",
              border: "1px solid rgba(239,68,68,0.3)",
              borderRadius: "8px", padding: "12px",
              marginBottom: "16px", color: "#ef4444", fontSize: "14px" }}>
              ❌ {error}
            </div>
          )}

          <form onSubmit={handleTrade}>

            {/* Symbol */}
            <div style={{ marginBottom: "16px" }}>
              <label style={{ color: "#94a3b8", fontSize: "13px",
                display: "block", marginBottom: "8px" }}>Symbol</label>
              <select value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
                style={{ width: "100%", background: "#1e293b",
                  border: "1px solid #334155", borderRadius: "8px",
                  padding: "12px", color: "white", fontSize: "14px",
                  outline: "none" }}>
                {SYMBOLS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Current Price */}
            <div style={{ background: "rgba(59,130,246,0.1)",
              border: "1px solid rgba(59,130,246,0.3)",
              borderRadius: "8px", padding: "12px", marginBottom: "16px" }}>
              <p style={{ color: "#94a3b8", fontSize: "12px" }}>Current Market Price</p>
              <p style={{ color: "#3b82f6", fontSize: "22px", fontWeight: "bold" }}>
                ${Number(currentPrice).toFixed(2)}
              </p>
            </div>

            {/* BUY/SELL */}
            <div style={{ marginBottom: "16px" }}>
              <label style={{ color: "#94a3b8", fontSize: "13px",
                display: "block", marginBottom: "8px" }}>Order Type</label>
              <div style={{ display: "grid",
                gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                {["BUY", "SELL"].map((t) => (
                  <button key={t} type="button"
                    onClick={() => setType(t)}
                    style={{ padding: "12px", borderRadius: "8px",
                      border: "none", cursor: "pointer",
                      fontWeight: "700", fontSize: "15px",
                      background: type === t
                        ? t === "BUY" ? "#16a34a" : "#dc2626"
                        : "#1e293b",
                      color: type === t ? "white" : "#64748b",
                      transition: "all 0.2s" }}>
                    {t === "BUY" ? "▲ BUY" : "▼ SELL"}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div style={{ marginBottom: "16px" }}>
              <label style={{ color: "#94a3b8", fontSize: "13px",
                display: "block", marginBottom: "8px" }}>Quantity</label>
              <input type="number" required min="0.00001" step="0.00001"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="0.00000"
                style={{ width: "100%", background: "#1e293b",
                  border: "1px solid #334155", borderRadius: "8px",
                  padding: "12px", color: "white", fontSize: "14px",
                  outline: "none", boxSizing: "border-box" as any }} />
            </div>

            {/* Price */}
            <div style={{ marginBottom: "16px" }}>
              <label style={{ color: "#94a3b8", fontSize: "13px",
                display: "block", marginBottom: "8px" }}>Price (USD)</label>
              <input type="number" required min="0" step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0.00"
                style={{ width: "100%", background: "#1e293b",
                  border: "1px solid #334155", borderRadius: "8px",
                  padding: "12px", color: "white", fontSize: "14px",
                  outline: "none", boxSizing: "border-box" as any }} />
            </div>

            {/* Total */}
            {quantity && price && (
              <div style={{ background: "rgba(255,255,255,0.05)",
                borderRadius: "8px", padding: "12px", marginBottom: "16px",
                display: "flex", justifyContent: "space-between",
                alignItems: "center" }}>
                <p style={{ color: "#94a3b8", fontSize: "14px" }}>
                  Total Value
                </p>
                <p style={{ color: "white", fontSize: "20px",
                  fontWeight: "bold" }}>
                  ${(Number(quantity) * Number(price)).toFixed(2)}
                </p>
              </div>
            )}

            <button type="submit" disabled={loading}
              style={{ width: "100%", padding: "14px",
                borderRadius: "8px", border: "none",
                cursor: loading ? "not-allowed" : "pointer",
                fontWeight: "700", fontSize: "16px", color: "white",
                background: loading ? "#334155"
                  : type === "BUY"
                  ? "linear-gradient(135deg, #16a34a, #15803d)"
                  : "linear-gradient(135deg, #dc2626, #b91c1c)",
                boxShadow: loading ? "none"
                  : type === "BUY"
                  ? "0 4px 20px rgba(22,163,74,0.4)"
                  : "0 4px 20px rgba(220,38,38,0.4)",
                transition: "all 0.2s" }}>
              {loading ? "Executing..." : `${type === "BUY" ? "▲" : "▼"} ${type} ${symbol}`}
            </button>
          </form>
        </div>

        {/* Recent Orders */}
        <div style={{ background: "rgba(15,22,41,0.8)",
          border: "1px solid #1e2d4a", borderRadius: "12px", padding: "24px" }}>
          <h2 style={{ fontSize: "18px", fontWeight: "600",
            marginBottom: "20px" }}>Recent Orders</h2>
          {trades.length === 0 ? (
            <div style={{ textAlign: "center", padding: "48px 0" }}>
              <p style={{ fontSize: "48px", marginBottom: "16px" }}>📊</p>
              <p style={{ color: "#64748b" }}>No orders yet!</p>
              <p style={{ color: "#94a3b8", fontSize: "13px", marginTop: "8px" }}>
                Place your first trade
              </p>
            </div>
          ) : (
            <div style={{ overflowY: "auto", maxHeight: "500px" }}>
              {trades.map((trade: any) => (
                <div key={trade.id} style={{
                  display: "flex", justifyContent: "space-between",
                  alignItems: "center", padding: "14px",
                  background: "rgba(255,255,255,0.03)",
                  borderRadius: "10px", marginBottom: "10px",
                  border: "1px solid rgba(255,255,255,0.05)" }}>
                  <div>
                    <p style={{ fontWeight: "700", fontSize: "15px" }}>
                      {trade.symbol}
                    </p>
                    <p style={{ color: "#64748b", fontSize: "12px",
                      marginTop: "2px" }}>
                      Qty: {trade.quantity}
                    </p>
                  </div>
                  <span style={{ padding: "5px 10px", borderRadius: "6px",
                    fontSize: "12px", fontWeight: "700",
                    background: trade.type === "BUY"
                      ? "rgba(16,185,129,0.2)" : "rgba(239,68,68,0.2)",
                    color: trade.type === "BUY" ? "#10b981" : "#ef4444" }}>
                    {trade.type === "BUY" ? "▲" : "▼"} {trade.type}
                  </span>
                  <div style={{ textAlign: "right" }}>
                    <p style={{ fontWeight: "700" }}>
                      ${Number(trade.totalValue).toFixed(2)}
                    </p>
                    <p style={{ fontSize: "12px", marginTop: "2px",
                      color: trade.status === "EXECUTED"
                        ? "#10b981" : "#f59e0b" }}>
                      {trade.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}