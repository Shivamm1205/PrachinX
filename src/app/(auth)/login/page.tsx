"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "src/store/authStore";
import { authService } from "src/services/auth.service";
import Logo from "src/components/Logo";
import { useWindowSize } from "src/hooks/useWindowSize";

export default function LoginPage() {
  const router = useRouter();
  const { setAuth } = useAuthStore();
  const { isMobile } = useWindowSize();
  const [formData, setFormData] = useState({
    email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await authService.login(formData);
      if (response.success) {
        const { token, ...user } = response.data;
        setAuth(user, token);
        router.push("/dashboard/overview");
      }
    } catch (err: any) {
      setError(err.response?.data?.message
        || "Invalid credentials!");
    } finally { setLoading(false); }
  };

  return (
    <div style={{
      minHeight: "100vh", display: "flex",
      background: "#0b0e11",
      fontFamily: "Inter, sans-serif",
      flexDirection: isMobile ? "column" : "row",
    }}>

      {/* Left Panel - Desktop Only */}
      {!isMobile && (
        <div style={{
          flex: 1, display: "flex", flexDirection: "column",
          justifyContent: "center", padding: "60px",
          background: "linear-gradient(135deg, #0b0e11, #161a1e)",
          borderRight: "1px solid #2b3139",
        }}>
          <div style={{ marginBottom: "48px" }}>
            <Logo size="lg" href="/" />
          </div>
          <h1 style={{ fontSize: "40px", fontWeight: "800",
            color: "#eaecef", lineHeight: 1.2,
            marginBottom: "16px" }}>
            Welcome back to
            <span style={{
              background: "linear-gradient(135deg, #f0b90b, #f8d33a)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              display: "block",
            }}>PrachinX</span>
          </h1>
          <p style={{ color: "#848e9c", fontSize: "15px",
            lineHeight: 1.7, marginBottom: "40px" }}>
            Your AI-powered trading journey continues here.
          </p>
          {[
            { icon: "🤖", text: "AI-powered price predictions" },
            { icon: "⚡", text: "Real-time market data" },
            { icon: "📊", text: "Portfolio management" },
            { icon: "🔒", text: "Bank-level security" },
          ].map((item) => (
            <div key={item.text} style={{
              display: "flex", alignItems: "center",
              gap: "12px", marginBottom: "14px",
            }}>
              <div style={{
                width: "34px", height: "34px",
                borderRadius: "8px",
                background: "rgba(240,185,11,0.1)",
                display: "flex", alignItems: "center",
                justifyContent: "center", fontSize: "15px",
              }}>{item.icon}</div>
              <span style={{ color: "#848e9c",
                fontSize: "14px" }}>{item.text}</span>
            </div>
          ))}
        </div>
      )}

      {/* Right Panel - Form */}
      <div style={{
        width: isMobile ? "100%" : "480px",
        display: "flex", alignItems: "center",
        justifyContent: "center",
        padding: isMobile ? "24px 16px" : "40px",
        background: "#0b0e11",
        minHeight: isMobile ? "100vh" : "auto",
      }}>
        <div style={{ width: "100%",
          maxWidth: isMobile ? "400px" : "100%" }}>

          {/* Mobile Logo */}
          {isMobile && (
            <div style={{ textAlign: "center",
              marginBottom: "32px" }}>
              <Logo size="md" href="/" />
            </div>
          )}

          <h2 style={{
            fontSize: isMobile ? "24px" : "26px",
            fontWeight: "800", color: "#eaecef",
            marginBottom: "6px" }}>Sign In</h2>
          <p style={{ color: "#848e9c", fontSize: "14px",
            marginBottom: "24px" }}>
            Don&apos;t have an account?{" "}
            <Link href="/register" style={{
              color: "#f0b90b", textDecoration: "none",
              fontWeight: "600" }}>Register</Link>
          </p>

          {error && (
            <div style={{
              background: "rgba(246,70,93,0.1)",
              border: "1px solid rgba(246,70,93,0.3)",
              borderRadius: "8px", padding: "12px 16px",
              marginBottom: "20px", color: "#f6465d",
              fontSize: "14px" }}>⚠️ {error}</div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "16px" }}>
              <label style={{ color: "#848e9c", fontSize: "13px",
                display: "block", marginBottom: "6px",
                fontWeight: "500" }}>Email</label>
              <input type="email" required
                value={formData.email}
                onChange={(e) => setFormData({
                  ...formData, email: e.target.value })}
                placeholder="you@example.com"
                style={{ width: "100%", background: "#161a1e",
                  border: "1px solid #2b3139", borderRadius: "8px",
                  padding: "13px 14px", color: "#eaecef",
                  fontSize: "15px", outline: "none",
                  boxSizing: "border-box" as any }}
                onFocus={(e) =>
                  e.target.style.borderColor = "#f0b90b"}
                onBlur={(e) =>
                  e.target.style.borderColor = "#2b3139"} />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <div style={{ display: "flex",
                justifyContent: "space-between",
                marginBottom: "6px" }}>
                <label style={{ color: "#848e9c",
                  fontSize: "13px", fontWeight: "500" }}>
                  Password
                </label>
                <a href="#" style={{ color: "#f0b90b",
                  fontSize: "12px", textDecoration: "none" }}>
                  Forgot?
                </a>
              </div>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  required value={formData.password}
                  onChange={(e) => setFormData({
                    ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  style={{ width: "100%", background: "#161a1e",
                    border: "1px solid #2b3139",
                    borderRadius: "8px",
                    padding: "13px 44px 13px 14px",
                    color: "#eaecef", fontSize: "15px",
                    outline: "none",
                    boxSizing: "border-box" as any }}
                  onFocus={(e) =>
                    e.target.style.borderColor = "#f0b90b"}
                  onBlur={(e) =>
                    e.target.style.borderColor = "#2b3139"} />
                <button type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: "absolute", right: "12px",
                    top: "50%", transform: "translateY(-50%)",
                    background: "none", border: "none",
                    cursor: "pointer", color: "#848e9c",
                    fontSize: "16px" }}>
                  {showPassword ? "🙈" : "👁"}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading}
              style={{ width: "100%", padding: "14px",
                borderRadius: "8px", border: "none",
                cursor: loading ? "not-allowed" : "pointer",
                fontWeight: "700", fontSize: "16px",
                color: "#000",
                background: loading ? "#848e9c"
                  : "linear-gradient(135deg, #f0b90b, #d4a200)",
                boxShadow: loading ? "none"
                  : "0 4px 16px rgba(240,185,11,0.3)" }}>
              {loading ? "Signing in..." : "Sign In →"}
            </button>
          </form>

          <div style={{ display: "flex", alignItems: "center",
            gap: "12px", margin: "20px 0" }}>
            <div style={{ flex: 1, height: "1px",
              background: "#2b3139" }} />
            <span style={{ color: "#848e9c",
              fontSize: "12px" }}>Secured by PrachinX</span>
            <div style={{ flex: 1, height: "1px",
              background: "#2b3139" }} />
          </div>

          <div style={{ display: "flex",
            justifyContent: "center", gap: "16px" }}>
            {["🔒 SSL", "⚡ Fast", "🤖 AI"].map((b) => (
              <span key={b} style={{ color: "#5e6673",
                fontSize: "11px" }}>{b}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
