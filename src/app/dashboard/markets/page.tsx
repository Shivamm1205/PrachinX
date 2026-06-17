"use client";

import { useEffect, useState } from "react";

export default function MarketsPage() {
  const [markets, setMarkets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchMarkets();
    const interval = setInterval(fetchMarkets, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchMarkets = async () => {
    try {
      const res = await fetch(`/api/market/top`);
      if (!res.ok) {
        console.error("Failed to load markets", res.status);
        return;
      }
      const data = await res.json();
      if (data.success) {
        setMarkets(Array.isArray(data.data) ? data.data : []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = markets.filter((m) =>
    m.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "24px", color: "white" }}>
      <div style={{ display: "flex", justifyContent: "space-between",
        alignItems: "center", marginBottom: "24px" }}>
        <div>
          <h1 style={{ fontSize: "28px", fontWeight: "bold",
            background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Markets
          </h1>
          <p style={{ color: "#94a3b8", marginTop: "4px" }}>
            Live cryptocurrency market data
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "8px", height: "8px",
            borderRadius: "50%", background: "#10b981" }} />
          <span style={{ color: "#10b981", fontSize: "12px" }}>Live</span>
        </div>
      </div>

      <input type="text" placeholder="Search symbol..."
        value={search} onChange={(e) => setSearch(e.target.value)}
        style={{ background: "#1e293b", border: "1px solid #334155",
          borderRadius: "8px", padding: "10px 16px", color: "white",
          fontSize: "14px", marginBottom: "16px", width: "300px" }} />

      <div style={{ background: "rgba(15,22,41,0.8)",
        border: "1px solid #1e2d4a", borderRadius: "12px", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #1e2d4a" }}>
              {["Symbol","Price","24h Change","High","Low","Volume"].map((h) => (
                <th key={h} style={{ padding: "16px", textAlign: "left",
                  color: "#64748b", fontSize: "13px", fontWeight: "500" }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} style={{ padding: "48px",
                  textAlign: "center", color: "#64748b" }}>
                  Loading markets...
                </td>
              </tr>
            ) : filtered.map((m: any) => (
              <tr key={m.symbol}
                style={{ borderBottom: "1px solid rgba(30,45,74,0.5)" }}>
                <td style={{ padding: "16px", fontWeight: "600" }}>
                  {m.symbol}
                </td>
                <td style={{ padding: "16px" }}>
                  ${Number(m.lastPrice).toFixed(2)}
                </td>
                <td style={{ padding: "16px",
                  color: Number(m.priceChangePercent) >= 0
                    ? "#10b981" : "#ef4444" }}>
                  {Number(m.priceChangePercent) >= 0 ? "+" : ""}
                  {Number(m.priceChangePercent).toFixed(2)}%
                </td>
                <td style={{ padding: "16px", color: "#94a3b8" }}>
                  ${Number(m.highPrice).toFixed(2)}
                </td>
                <td style={{ padding: "16px", color: "#94a3b8" }}>
                  ${Number(m.lowPrice).toFixed(2)}
                </td>
                <td style={{ padding: "16px", color: "#64748b",
                  fontSize: "13px" }}>
                  {Number(m.volume).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}