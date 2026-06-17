"use client";

import { useState } from "react";
import aiService from "../../../services/ai.service";
const SYMBOLS = ["BTCUSDT","ETHUSDT","BNBUSDT","SOLUSDT","ADAUSDT"];

export default function AIPredictionsPage() {
  const [symbol, setSymbol] = useState("BTCUSDT");
  const [prediction, setPrediction] = useState<any>(null);
  const [sentiment, setSentiment] = useState<any>(null);
  const [chat, setChat] = useState<any[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState({
    prediction: false, sentiment: false, chat: false
  });

  const getPrediction = async () => {
    setLoading((l) => ({ ...l, prediction: true }));
    try {
        const data = await aiService.getPricePrediction(symbol);
        setPrediction(data.data || { error: "AI Engine not connected yet" });
    } catch {
      setPrediction({ error: "AI Engine not connected yet. Coming in Phase 3!" });
    } finally {
      setLoading((l) => ({ ...l, prediction: false }));
    }
  };

  const getSentiment = async () => {
    setLoading((l) => ({ ...l, sentiment: true }));
    try {
        const data = await aiService.getSentimentAnalysis(symbol);
        setSentiment(data.data || { error: "AI Engine not connected yet" });
    } catch {
      setSentiment({ error: "AI Engine not connected yet. Coming in Phase 3!" });
    } finally {
      setLoading((l) => ({ ...l, sentiment: false }));
    }
  };

  const sendMessage = async () => {
    if (!message.trim()) return;
    const userMsg = message;
    setMessage("");
    setChat((c) => [...c, { role: "user", text: userMsg }]);
    setLoading((l) => ({ ...l, chat: true }));
    try {
      const data = await aiService.chatWithAI(userMsg);
      setChat((c) => [...c, {
        role: "ai",
        text: data.data?.reply || "AI Engine not connected yet!"
      }]);
    } catch {
      setChat((c) => [...c, {
        role: "ai",
        text: "AI Engine not connected yet. Coming in Phase 3!"
      }]);
    } finally {
      setLoading((l) => ({ ...l, chat: false }));
    }
  };

  return (
    <div style={{ padding: "24px", color: "white" }}>
      <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "8px",
        background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
        AI Predictions
      </h1>
      <p style={{ color: "#94a3b8", marginBottom: "24px" }}>
        AI-powered market analysis and predictions
      </p>

      {/* Symbol Selector */}
      <div style={{ background: "rgba(15,22,41,0.8)",
        border: "1px solid #1e2d4a", borderRadius: "12px",
        padding: "16px", marginBottom: "24px" }}>
        <label style={{ color: "#94a3b8", fontSize: "14px",
          marginRight: "12px" }}>Select Symbol:</label>
        <select value={symbol} onChange={(e) => setSymbol(e.target.value)}
          style={{ background: "#1e293b", border: "1px solid #334155",
            borderRadius: "8px", padding: "8px 12px", color: "white" }}>
          {SYMBOLS.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* AI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr",
        gap: "24px", marginBottom: "24px" }}>

        {/* Price Prediction */}
        <div style={{ background: "rgba(15,22,41,0.8)",
          border: "1px solid #1e2d4a", borderRadius: "12px", padding: "24px" }}>
          <h3 style={{ fontSize: "16px", fontWeight: "600",
            marginBottom: "16px" }}>Price Prediction</h3>
          {prediction && (
            <div style={{ background: "rgba(59,130,246,0.1)",
              border: "1px solid rgba(59,130,246,0.2)",
              borderRadius: "8px", padding: "12px", marginBottom: "16px" }}>
              <p style={{ color: prediction.error ? "#f59e0b" : "#94a3b8",
                fontSize: "13px" }}>
                {prediction.error || JSON.stringify(prediction, null, 2)}
              </p>
            </div>
          )}
          <button onClick={getPrediction} disabled={loading.prediction}
            style={{ width: "100%", padding: "10px", borderRadius: "8px",
              border: "none", cursor: "pointer", background: "#3b82f6",
              color: "white", fontWeight: "600",
              opacity: loading.prediction ? 0.7 : 1 }}>
            {loading.prediction ? "Analyzing..." : "Get Prediction"}
          </button>
        </div>

        {/* Sentiment */}
        <div style={{ background: "rgba(15,22,41,0.8)",
          border: "1px solid #1e2d4a", borderRadius: "12px", padding: "24px" }}>
          <h3 style={{ fontSize: "16px", fontWeight: "600",
            marginBottom: "16px" }}>Sentiment Analysis</h3>
          {sentiment && (
            <div style={{ background: "rgba(139,92,246,0.1)",
              border: "1px solid rgba(139,92,246,0.2)",
              borderRadius: "8px", padding: "12px", marginBottom: "16px" }}>
              <p style={{ color: sentiment.error ? "#f59e0b" : "#94a3b8",
                fontSize: "13px" }}>
                {sentiment.error || JSON.stringify(sentiment, null, 2)}
              </p>
            </div>
          )}
          <button onClick={getSentiment} disabled={loading.sentiment}
            style={{ width: "100%", padding: "10px", borderRadius: "8px",
              border: "none", cursor: "pointer", background: "#8b5cf6",
              color: "white", fontWeight: "600",
              opacity: loading.sentiment ? 0.7 : 1 }}>
            {loading.sentiment ? "Analyzing..." : "Analyze Sentiment"}
          </button>
        </div>
      </div>

      {/* AI Chat */}
      <div style={{ background: "rgba(15,22,41,0.8)",
        border: "1px solid #1e2d4a", borderRadius: "12px", padding: "24px" }}>
        <h3 style={{ fontSize: "16px", fontWeight: "600",
          marginBottom: "16px" }}>AI Trading Assistant</h3>

        <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: "8px",
          padding: "16px", height: "250px", overflowY: "auto",
          marginBottom: "16px" }}>
          {chat.length === 0 ? (
            <p style={{ color: "#64748b", textAlign: "center",
              marginTop: "80px" }}>
              Ask me anything about trading!
            </p>
          ) : (
            chat.map((msg, i) => (
              <div key={i} style={{ display: "flex",
                justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                marginBottom: "12px" }}>
                <div style={{ maxWidth: "70%", padding: "10px 14px",
                  borderRadius: "12px", fontSize: "14px",
                  background: msg.role === "user" ? "#3b82f6" : "#1e293b",
                  color: "white" }}>
                  {msg.text}
                </div>
              </div>
            ))
          )}
          {loading.chat && (
            <div style={{ display: "flex", justifyContent: "flex-start" }}>
              <div style={{ background: "#1e293b", padding: "10px 14px",
                borderRadius: "12px", color: "#64748b", fontSize: "14px" }}>
                AI is thinking...
              </div>
            </div>
          )}
        </div>

        <div style={{ display: "flex", gap: "12px" }}>
          <input type="text" value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Ask about market trends, strategies..."
            style={{ flex: 1, background: "#1e293b",
              border: "1px solid #334155", borderRadius: "8px",
              padding: "12px", color: "white", fontSize: "14px" }} />
          <button onClick={sendMessage} disabled={loading.chat}
            style={{ padding: "12px 24px", borderRadius: "8px",
              border: "none", cursor: "pointer", background: "#3b82f6",
              color: "white", fontWeight: "600",
              opacity: loading.chat ? 0.7 : 1 }}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}