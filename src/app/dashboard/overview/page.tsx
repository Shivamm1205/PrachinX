"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import apiFetch from "../../../lib/api";

export default function OverviewPage() {
  const [markets, setMarkets] = useState<any[]>([]);
  const [portfolio, setPortfolio] = useState<any>(null);
  const [trades, setTrades] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("auth-storage");
      if (stored) {
        const parsed = JSON.parse(stored);
        setUser(parsed.state?.user);
      }
    } catch {}
    fetchAll();
    const interval = setInterval(fetchMarkets, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchAll = async () => {
    await Promise.all([
      fetchMarkets(),
      fetchPortfolio(),
      fetchTrades(),
    ]);
    setLoading(false);
  };

  const fetchMarkets = async () => {
    try {
      const data = await apiFetch("/api/market/top");
      if (data?.success) {
        const popular = Array.isArray(data.data)
          ? data.data.filter((m: any) =>
              ["BTCUSDT","ETHUSDT","BNBUSDT","SOLUSDT"]
              .includes(m.symbol))
          : [];
        setMarkets(popular.slice(0, 4));
      }
    } catch (err) { console.error("markets:", err); }
  };

  const fetchPortfolio = async () => {
    try {
      const data = await apiFetch("/api/portfolio");
      if (data?.success) setPortfolio(data.data);
    } catch (err) { console.error("portfolio:", err); }
  };

  const fetchTrades = async () => {
    try {
      const data = await apiFetch("/api/trades");
      if (data?.success) setTrades(data.data.slice(0, 5));
    } catch (err) { console.error("trades:", err); }
  };

  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center",
        justifyContent: "center", height: "400px",
        background: "#0b0e11" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "32px", marginBottom: "12px" }}>
            ⏳
          </div>
          <p style={{ color: "#f0b90b", fontSize: "16px",
            fontWeight: "600" }}>
            Loading Dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "24px 28px", color: "#eaecef",
      fontFamily: "Inter, sans-serif" }}>

      {/* Header */}
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "22px", fontWeight: "800",
          color: "#eaecef", margin: 0 }}>
          Welcome back,{" "}
          <span style={{
            background: "linear-gradient(135deg, #f0b90b, #f8d33a)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            {user?.firstName || "Trader"}!
          </span>
        </h1>
        <p style={{ color: "#5e6673", margin: 0,
          fontSize: "13px", marginTop: "4px" }}>
          Here's your trading overview for today
        </p>
      </div>

      {/* Top 4 Cards */}
      <div style={{ display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "16px", marginBottom: "24px" }}>

        {/* AI Prediction */}
        <Link href="/dashboard/ai-predictions"
          style={{ textDecoration: "none" }}>
          <div style={{
            background: "#161a1e",
            border: "1px solid rgba(240,185,11,0.3)",
            borderRadius: "12px", padding: "20px",
            cursor: "pointer", transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLDivElement)
              .style.transform = "translateY(-2px)";
            (e.currentTarget as HTMLDivElement)
              .style.boxShadow
              = "0 8px 20px rgba(240,185,11,0.15)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLDivElement)
              .style.transform = "translateY(0)";
            (e.currentTarget as HTMLDivElement)
              .style.boxShadow = "none";
          }}>
            <div style={{ display: "flex",
              justifyContent: "space-between",
              alignItems: "center", marginBottom: "12px" }}>
              <span style={{ fontSize: "20px" }}>🤖</span>
              <span style={{
                background: "rgba(14,203,129,0.15)",
                color: "#0ecb81", padding: "3px 8px",
                borderRadius: "4px", fontSize: "11px",
                fontWeight: "700", letterSpacing: "0.5px",
              }}>LIVE</span>
            </div>
            <p style={{ color: "#848e9c", fontSize: "12px",
              margin: 0, marginBottom: "6px" }}>
              AI Prediction
            </p>
            <p style={{ color: "#eaecef", fontSize: "20px",
              fontWeight: "800", margin: 0 }}>BULLISH</p>
            <p style={{ color: "#0ecb81", fontSize: "12px",
              margin: 0, marginTop: "4px" }}>
              95% Confidence →
            </p>
          </div>
        </Link>

        {/* Balance */}
        <div style={{
          background: "#161a1e",
          border: "1px solid rgba(139,92,246,0.3)",
          borderRadius: "12px", padding: "20px",
        }}>
          <div style={{ display: "flex",
            justifyContent: "space-between",
            alignItems: "center", marginBottom: "12px" }}>
            <span style={{ fontSize: "20px" }}>💰</span>
            <span style={{ color: "#848e9c", fontSize: "11px",
              fontWeight: "600" }}>PORTFOLIO</span>
          </div>
          <p style={{ color: "#848e9c", fontSize: "12px",
            margin: 0, marginBottom: "6px" }}>
            Total Balance
          </p>
          <p style={{ color: "#eaecef", fontSize: "20px",
            fontWeight: "800", margin: 0 }}>
            ${Number(portfolio?.totalBalance || 0).toFixed(2)}
          </p>
          <p style={{ color: "#848e9c", fontSize: "12px",
            margin: 0, marginTop: "4px" }}>
            Avail: $
            {Number(portfolio?.availableBalance || 0).toFixed(2)}
          </p>
        </div>

        {/* Trade Now */}
        <Link href="/dashboard/trading"
          style={{ textDecoration: "none" }}>
          <div style={{
            background: "#161a1e",
            border: "1px solid rgba(14,203,129,0.3)",
            borderRadius: "12px", padding: "20px",
            cursor: "pointer", transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLDivElement)
              .style.transform = "translateY(-2px)";
            (e.currentTarget as HTMLDivElement)
              .style.boxShadow
              = "0 8px 20px rgba(14,203,129,0.15)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLDivElement)
              .style.transform = "translateY(0)";
            (e.currentTarget as HTMLDivElement)
              .style.boxShadow = "none";
          }}>
            <div style={{ display: "flex",
              justifyContent: "space-between",
              alignItems: "center", marginBottom: "12px" }}>
              <span style={{ fontSize: "20px" }}>⚡</span>
              <span style={{
                background: "rgba(14,203,129,0.15)",
                color: "#0ecb81", padding: "3px 8px",
                borderRadius: "4px", fontSize: "11px",
                fontWeight: "700",
              }}>TRADE</span>
            </div>
            <p style={{ color: "#848e9c", fontSize: "12px",
              margin: 0, marginBottom: "6px" }}>Trade Now</p>
            <p style={{ color: "#eaecef", fontSize: "20px",
              fontWeight: "800", margin: 0 }}>BTC/USDT</p>
            <p style={{ color: "#0ecb81", fontSize: "12px",
              margin: 0, marginTop: "4px" }}>
              Click to Trade →
            </p>
          </div>
        </Link>

        {/* Portfolio */}
        <Link href="/dashboard/portfolio"
          style={{ textDecoration: "none" }}>
          <div style={{
            background: "#161a1e",
            border: "1px solid rgba(246,70,93,0.3)",
            borderRadius: "12px", padding: "20px",
            cursor: "pointer", transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLDivElement)
              .style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLDivElement)
              .style.transform = "translateY(0)";
          }}>
            <div style={{ display: "flex",
              justifyContent: "space-between",
              alignItems: "center", marginBottom: "12px" }}>
              <span style={{ fontSize: "20px" }}>📊</span>
              <span style={{ color: "#f6465d", fontSize: "11px",
                fontWeight: "600" }}>P&L</span>
            </div>
            <p style={{ color: "#848e9c", fontSize: "12px",
              margin: 0, marginBottom: "6px" }}>
              My Portfolio
            </p>
            <p style={{ color: "#eaecef", fontSize: "20px",
              fontWeight: "800", margin: 0 }}>
              ${Number(portfolio?.totalProfitLoss || 0)
                .toFixed(2)}
            </p>
            <p style={{ color: "#f0b90b", fontSize: "12px",
              margin: 0, marginTop: "4px" }}>
              View Details →
            </p>
          </div>
        </Link>
      </div>

      {/* Markets Table + Recent Trades */}
      <div style={{ display: "grid",
        gridTemplateColumns: "1.5fr 1fr",
        gap: "20px", marginBottom: "20px" }}>

        {/* Markets */}
        <div style={{ background: "#161a1e",
          border: "1px solid #2b3139",
          borderRadius: "12px", overflow: "hidden" }}>
          <div style={{ padding: "16px 20px",
            borderBottom: "1px solid #2b3139",
            display: "flex", justifyContent: "space-between",
            alignItems: "center",
            background: "#1e2329" }}>
            <div style={{ display: "flex", alignItems: "center",
              gap: "8px" }}>
              <h2 style={{ margin: 0, fontSize: "15px",
                fontWeight: "700" }}>Live Markets</h2>
              <div style={{ width: "6px", height: "6px",
                borderRadius: "50%", background: "#0ecb81" }} />
            </div>
            <Link href="/dashboard/markets" style={{
              color: "#f0b90b", textDecoration: "none",
              fontSize: "13px", fontWeight: "600",
            }}>View All →</Link>
          </div>

          {/* Table Header */}
          <div style={{ display: "grid",
            gridTemplateColumns: "1.5fr 1fr 1fr 1fr",
            padding: "10px 20px",
            borderBottom: "1px solid #2b3139" }}>
            {["Symbol", "Price", "24h %", "Action"].map((h) => (
              <span key={h} style={{ color: "#5e6673",
                fontSize: "11px", fontWeight: "600",
                textTransform: "uppercase" as any,
                letterSpacing: "0.5px" }}>{h}</span>
            ))}
          </div>

          {markets.length === 0 ? (
            <div style={{ padding: "32px", textAlign: "center",
              color: "#5e6673" }}>
              Loading market data...
            </div>
          ) : markets.map((m: any) => (
            <div key={m.symbol} style={{
              display: "grid",
              gridTemplateColumns: "1.5fr 1fr 1fr 1fr",
              padding: "14px 20px",
              borderBottom: "1px solid rgba(43,49,57,0.5)",
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "#1e2329")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "transparent")}>
              <div style={{ display: "flex", alignItems: "center",
                gap: "10px" }}>
                <div style={{
                  width: "32px", height: "32px",
                  borderRadius: "50%",
                  background: "rgba(240,185,11,0.15)",
                  display: "flex", alignItems: "center",
                  justifyContent: "center", fontSize: "12px",
                  fontWeight: "800", color: "#f0b90b",
                }}>
                  {m.symbol.charAt(0)}
                </div>
                <div>
                  <p style={{ margin: 0, fontWeight: "700",
                    fontSize: "13px" }}>{m.symbol}</p>
                  <p style={{ margin: 0, color: "#5e6673",
                    fontSize: "11px" }}>Crypto</p>
                </div>
              </div>
              <div style={{ display: "flex",
                alignItems: "center" }}>
                <span style={{ fontWeight: "700",
                  fontSize: "13px" }}>
                  ${Number(m.lastPrice).toLocaleString("en-US",
                    { minimumFractionDigits: 2,
                      maximumFractionDigits: 2 })}
                </span>
              </div>
              <div style={{ display: "flex",
                alignItems: "center" }}>
                <span style={{
                  padding: "3px 7px", borderRadius: "4px",
                  fontSize: "12px", fontWeight: "700",
                  background: Number(m.priceChangePercent) >= 0
                    ? "rgba(14,203,129,0.1)"
                    : "rgba(246,70,93,0.1)",
                  color: Number(m.priceChangePercent) >= 0
                    ? "#0ecb81" : "#f6465d",
                }}>
                  {Number(m.priceChangePercent) >= 0 ? "▲" : "▼"}
                  {Math.abs(Number(m.priceChangePercent))
                    .toFixed(2)}%
                </span>
              </div>
              <div style={{ display: "flex",
                alignItems: "center" }}>
                <Link href="/dashboard/trading" style={{
                  padding: "5px 12px", borderRadius: "6px",
                  background: "rgba(240,185,11,0.1)",
                  border: "1px solid rgba(240,185,11,0.2)",
                  color: "#f0b90b", textDecoration: "none",
                  fontSize: "12px", fontWeight: "600",
                }}>Trade</Link>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Trades */}
        <div style={{ background: "#161a1e",
          border: "1px solid #2b3139",
          borderRadius: "12px", overflow: "hidden" }}>
          <div style={{ padding: "16px 20px",
            borderBottom: "1px solid #2b3139",
            display: "flex", justifyContent: "space-between",
            alignItems: "center", background: "#1e2329" }}>
            <h2 style={{ margin: 0, fontSize: "15px",
              fontWeight: "700" }}>Recent Trades</h2>
            <Link href="/dashboard/portfolio" style={{
              color: "#f0b90b", textDecoration: "none",
              fontSize: "13px", fontWeight: "600",
            }}>View All →</Link>
          </div>
          <div style={{ padding: "12px" }}>
            {trades.length === 0 ? (
              <div style={{ textAlign: "center",
                padding: "32px 0" }}>
                <p style={{ fontSize: "32px",
                  marginBottom: "8px" }}>📊</p>
                <p style={{ color: "#5e6673", fontSize: "13px",
                  marginBottom: "16px" }}>No trades yet!</p>
                <Link href="/dashboard/trading" style={{
                  padding: "8px 20px", borderRadius: "6px",
                  background: "linear-gradient(135deg, #f0b90b, #d4a200)",
                  color: "#000", textDecoration: "none",
                  fontSize: "13px", fontWeight: "700",
                }}>Start Trading</Link>
              </div>
            ) : trades.map((trade: any) => (
              <div key={trade.id} style={{
                display: "flex", justifyContent: "space-between",
                alignItems: "center", padding: "12px",
                background: "rgba(255,255,255,0.02)",
                borderRadius: "8px", marginBottom: "8px",
                border: "1px solid rgba(43,49,57,0.5)",
              }}>
                <div>
                  <p style={{ margin: 0, fontWeight: "700",
                    fontSize: "13px" }}>{trade.symbol}</p>
                  <p style={{ margin: 0, color: "#5e6673",
                    fontSize: "11px" }}>
                    Qty: {trade.quantity}
                  </p>
                </div>
                <span style={{
                  padding: "3px 8px", borderRadius: "4px",
                  fontSize: "11px", fontWeight: "700",
                  background: trade.type === "BUY"
                    ? "rgba(14,203,129,0.15)"
                    : "rgba(246,70,93,0.15)",
                  color: trade.type === "BUY"
                    ? "#0ecb81" : "#f6465d",
                }}>
                  {trade.type}
                </span>
                <div style={{ textAlign: "right" }}>
                  <p style={{ margin: 0, fontWeight: "700",
                    fontSize: "13px" }}>
                    ${Number(trade.totalValue).toFixed(2)}
                  </p>
                  <p style={{ margin: 0, fontSize: "11px",
                    color: trade.status === "EXECUTED"
                      ? "#0ecb81" : "#f0b90b" }}>
                    {trade.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{ background: "#161a1e",
        border: "1px solid #2b3139",
        borderRadius: "12px", padding: "20px" }}>
        <h2 style={{ margin: 0, fontSize: "15px",
          fontWeight: "700", marginBottom: "16px" }}>
          Quick Actions
        </h2>
        <div style={{ display: "flex", gap: "12px",
          flexWrap: "wrap" as any }}>
          {[
            { label: "⚡ Trade Now",
              href: "/dashboard/trading",
              bg: "linear-gradient(135deg, #f0b90b, #d4a200)",
              color: "#000" },
            { label: "📈 View Markets",
              href: "/dashboard/markets",
              bg: "rgba(59,130,246,0.15)",
              color: "#3b82f6",
              border: "1px solid rgba(59,130,246,0.3)" },
            { label: "💼 My Portfolio",
              href: "/dashboard/portfolio",
              bg: "rgba(14,203,129,0.15)",
              color: "#0ecb81",
              border: "1px solid rgba(14,203,129,0.3)" },
            { label: "🤖 AI Predictions",
              href: "/dashboard/ai-predictions",
              bg: "rgba(139,92,246,0.15)",
              color: "#8b5cf6",
              border: "1px solid rgba(139,92,246,0.3)" },
            { label: "⚙️ Settings",
              href: "/dashboard/settings",
              bg: "rgba(255,255,255,0.05)",
              color: "#848e9c",
              border: "1px solid #2b3139" },
          ].map((action) => (
            <Link key={action.label} href={action.href}
              style={{
                padding: "10px 20px", borderRadius: "8px",
                textDecoration: "none", fontSize: "13px",
                fontWeight: "700", background: action.bg,
                color: action.color,
                border: (action as any).border || "none",
                transition: "all 0.2s",
              }}>
              {action.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}