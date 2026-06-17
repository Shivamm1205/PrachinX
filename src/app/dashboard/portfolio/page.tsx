"use client";

import { useEffect, useState } from "react";
import apiFetch from "../../../lib/api";

export default function PortfolioPage() {
  const [portfolio, setPortfolio] = useState<any>(null);
  const [trades, setTrades] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [depositAmount, setDepositAmount] = useState("");
  const [depositing, setDepositing] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [showDeposit, setShowDeposit] = useState(false);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const [portfolioData, tradesData] = await Promise.all([
        apiFetch("/api/portfolio"),
        apiFetch("/api/trades"),
      ]);
      if (portfolioData?.success) setPortfolio(portfolioData.data);
      if (tradesData?.success) setTrades(tradesData.data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const handleDeposit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!depositAmount || Number(depositAmount) <= 0) {
      setError("Enter a valid amount!");
      return;
    }
    setDepositing(true);
    setError(""); setSuccess("");
    try {
      const data = await apiFetch("/api/portfolio/deposit", {
        method: "POST",
        body: JSON.stringify({ amount: Number(depositAmount) }),
      });
      if (data?.success) {
        setSuccess(`Deposited $${depositAmount} successfully!`);
        setDepositAmount("");
        setShowDeposit(false);
        fetchData();
      }
    } catch (err: any) {
      setError("Deposit failed!");
    } finally { setDepositing(false); }
  };

  return (
    <div style={{ padding: "24px 28px", color: "#eaecef",
      fontFamily: "Inter, sans-serif" }}>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between",
        alignItems: "center", marginBottom: "24px" }}>
        <div>
          <h1 style={{ fontSize: "22px", fontWeight: "800",
            margin: 0 }}>My Portfolio</h1>
          <p style={{ color: "#5e6673", margin: 0,
            fontSize: "13px", marginTop: "4px" }}>
            Manage your funds and trading history
          </p>
        </div>
        <button onClick={() => setShowDeposit(!showDeposit)}
          style={{ padding: "10px 20px", borderRadius: "8px",
            border: "none", cursor: "pointer", fontWeight: "700",
            fontSize: "14px", color: "#000",
            background: "linear-gradient(135deg, #0ecb81, #059669)",
            boxShadow: "0 4px 12px rgba(14,203,129,0.3)" }}>
          + Deposit Funds
        </button>
      </div>

      {/* Alerts */}
      {success && (
        <div style={{ background: "rgba(14,203,129,0.1)",
          border: "1px solid rgba(14,203,129,0.3)",
          borderRadius: "8px", padding: "12px 16px",
          marginBottom: "16px", color: "#0ecb81",
          fontSize: "14px" }}>✅ {success}</div>
      )}
      {error && (
        <div style={{ background: "rgba(246,70,93,0.1)",
          border: "1px solid rgba(246,70,93,0.3)",
          borderRadius: "8px", padding: "12px 16px",
          marginBottom: "16px", color: "#f6465d",
          fontSize: "14px" }}>❌ {error}</div>
      )}

      {/* Deposit Form */}
      {showDeposit && (
        <div style={{ background: "#161a1e",
          border: "1px solid rgba(14,203,129,0.3)",
          borderRadius: "12px", padding: "24px",
          marginBottom: "24px" }}>
          <h3 style={{ fontSize: "16px", fontWeight: "700",
            marginBottom: "8px", color: "#0ecb81" }}>
            Deposit Virtual Funds
          </h3>
          <p style={{ color: "#848e9c", fontSize: "13px",
            marginBottom: "16px" }}>
            Add virtual balance to start trading.
            This is a demo — no real money involved!
          </p>
          <form onSubmit={handleDeposit}
            style={{ display: "flex", gap: "12px",
              flexWrap: "wrap" as any }}>
            <div style={{ position: "relative", flex: 1,
              minWidth: "200px" }}>
              <span style={{ position: "absolute", left: "14px",
                top: "50%", transform: "translateY(-50%)",
                color: "#0ecb81", fontWeight: "700" }}>$</span>
              <input type="number" required min="1" step="1"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                placeholder="Enter amount..."
                style={{ width: "100%", background: "#1e2329",
                  border: "1px solid #2b3139",
                  borderRadius: "8px",
                  padding: "12px 12px 12px 28px",
                  color: "#eaecef", fontSize: "15px",
                  outline: "none",
                  boxSizing: "border-box" as any }} />
            </div>
            {["1000", "5000", "10000"].map((amt) => (
              <button key={amt} type="button"
                onClick={() => setDepositAmount(amt)}
                style={{ padding: "12px 16px", borderRadius: "8px",
                  border: `1px solid ${depositAmount === amt
                    ? "#0ecb81" : "#2b3139"}`,
                  background: depositAmount === amt
                    ? "rgba(14,203,129,0.1)" : "transparent",
                  color: depositAmount === amt
                    ? "#0ecb81" : "#848e9c",
                  cursor: "pointer", fontWeight: "600",
                  fontSize: "13px" }}>
                ${amt}
              </button>
            ))}
            <button type="submit" disabled={depositing}
              style={{ padding: "12px 24px", borderRadius: "8px",
                border: "none", cursor: "pointer",
                fontWeight: "700", color: "#000", fontSize: "14px",
                background: depositing ? "#848e9c"
                  : "linear-gradient(135deg, #0ecb81, #059669)" }}>
              {depositing ? "Processing..." : "Deposit"}
            </button>
          </form>
        </div>
      )}

      {/* Stats */}
      <div style={{ display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "16px", marginBottom: "24px" }}>
        {[
          { label: "Total Balance",
            value: `$${Number(portfolio?.totalBalance || 0)
              .toFixed(2)}`,
            color: "240,185,11", icon: "💰" },
          { label: "Available",
            value: `$${Number(portfolio?.availableBalance || 0)
              .toFixed(2)}`,
            color: "14,203,129", icon: "💵" },
          { label: "Invested",
            value: `$${Number(portfolio?.investedAmount || 0)
              .toFixed(2)}`,
            color: "139,92,246", icon: "📈" },
          { label: "Total P&L",
            value: `$${Number(portfolio?.totalProfitLoss || 0)
              .toFixed(2)}`,
            color: Number(portfolio?.totalProfitLoss) >= 0
              ? "14,203,129" : "246,70,93",
            icon: "📊" },
        ].map((item) => (
          <div key={item.label} style={{
            background: "#161a1e",
            border: `1px solid rgba(${item.color},0.2)`,
            borderRadius: "12px", padding: "20px",
          }}>
            <span style={{ fontSize: "20px" }}>{item.icon}</span>
            <p style={{ color: "#848e9c", fontSize: "12px",
              margin: "10px 0 4px" }}>{item.label}</p>
            <p style={{ color: "#eaecef", fontSize: "20px",
              fontWeight: "800", margin: 0 }}>{item.value}</p>
          </div>
        ))}
      </div>

      {/* Warning */}
      {(!portfolio ||
        Number(portfolio?.availableBalance) === 0) && (
        <div style={{ background: "rgba(240,185,11,0.08)",
          border: "1px solid rgba(240,185,11,0.3)",
          borderRadius: "10px", padding: "14px 18px",
          marginBottom: "20px", display: "flex",
          alignItems: "center", gap: "12px" }}>
          <span style={{ fontSize: "20px" }}>⚠️</span>
          <div>
            <p style={{ color: "#f0b90b", fontWeight: "700",
              margin: 0, fontSize: "14px" }}>
              No balance available!
            </p>
            <p style={{ color: "#848e9c", fontSize: "13px",
              margin: 0, marginTop: "2px" }}>
              Deposit funds above to start trading.
            </p>
          </div>
        </div>
      )}

      {/* Trade History */}
      <div style={{ background: "#161a1e",
        border: "1px solid #2b3139",
        borderRadius: "12px", overflow: "hidden" }}>
        <div style={{ padding: "16px 20px",
          borderBottom: "1px solid #2b3139",
          background: "#1e2329" }}>
          <h2 style={{ margin: 0, fontSize: "15px",
            fontWeight: "700" }}>
            Trade History ({trades.length})
          </h2>
        </div>
        {loading ? (
          <div style={{ padding: "48px", textAlign: "center",
            color: "#5e6673" }}>Loading...</div>
        ) : trades.length === 0 ? (
          <div style={{ padding: "48px", textAlign: "center" }}>
            <p style={{ fontSize: "32px" }}>📊</p>
            <p style={{ color: "#5e6673", fontSize: "13px" }}>
              No trades yet!
            </p>
          </div>
        ) : (
          <table style={{ width: "100%",
            borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #2b3139" }}>
                {["Symbol","Type","Qty","Price",
                  "Total","Status","Date"].map((h) => (
                  <th key={h} style={{ padding: "10px 20px",
                    textAlign: "left" as any, color: "#5e6673",
                    fontSize: "11px", fontWeight: "600",
                    textTransform: "uppercase" as any,
                    letterSpacing: "0.5px" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {trades.map((trade: any) => (
                <tr key={trade.id} style={{
                  borderBottom:
                    "1px solid rgba(43,49,57,0.5)",
                  transition: "background 0.15s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background
                    = "#1e2329")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background
                    = "transparent")}>
                  <td style={{ padding: "14px 20px",
                    fontWeight: "700", fontSize: "13px" }}>
                    {trade.symbol}
                  </td>
                  <td style={{ padding: "14px 20px" }}>
                    <span style={{ padding: "4px 8px",
                      borderRadius: "4px", fontSize: "11px",
                      fontWeight: "700",
                      background: trade.type === "BUY"
                        ? "rgba(14,203,129,0.15)"
                        : "rgba(246,70,93,0.15)",
                      color: trade.type === "BUY"
                        ? "#0ecb81" : "#f6465d" }}>
                      {trade.type}
                    </span>
                  </td>
                  <td style={{ padding: "14px 20px",
                    color: "#848e9c", fontSize: "13px" }}>
                    {trade.quantity}
                  </td>
                  <td style={{ padding: "14px 20px",
                    color: "#848e9c", fontSize: "13px" }}>
                    ${Number(trade.price).toFixed(2)}
                  </td>
                  <td style={{ padding: "14px 20px",
                    fontWeight: "700", fontSize: "13px" }}>
                    ${Number(trade.totalValue).toFixed(2)}
                  </td>
                  <td style={{ padding: "14px 20px" }}>
                    <span style={{ padding: "4px 8px",
                      borderRadius: "4px", fontSize: "11px",
                      background: trade.status === "EXECUTED"
                        ? "rgba(14,203,129,0.15)"
                        : "rgba(240,185,11,0.15)",
                      color: trade.status === "EXECUTED"
                        ? "#0ecb81" : "#f0b90b" }}>
                      {trade.status}
                    </span>
                  </td>
                  <td style={{ padding: "14px 20px",
                    color: "#5e6673", fontSize: "12px" }}>
                    {new Date(trade.createdAt)
                      .toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}