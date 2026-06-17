"use client";
import Logo from "@/components/logo";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { authService } from "@/services/auth.service";

export default function LoginPage() {
  const router = useRouter();
  const { setAuth } = useAuthStore();
  const [formData, setFormData] = useState({ email: "", password: "" });
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
      setError(err.response?.data?.message || "Invalid credentials!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh", display: "flex",
      background: "#0b0e11", fontFamily: "Inter, sans-serif",
    }}>

      {/* Left Panel */}
      <div style={{ flex: 1, padding: "60px 40px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <Logo size="lg" href="/" />
        

        <h1 style={{ fontSize: "42px", fontWeight: "800",
          color: "#eaecef", lineHeight: 1.2, marginBottom: "20px" }}>
          Welcome back to
          <span style={{
            background: "linear-gradient(135deg, #f0b90b, #f8d33a)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            display: "block",
          }}>
            PrachinX
          </span>
        </h1>

        <p style={{ color: "#848e9c", fontSize: "16px",
          lineHeight: 1.7, marginBottom: "48px" }}>
          Your AI-powered trading journey continues here.
          Access real-time markets, AI predictions, and
          your complete portfolio.
        </p>

        {/* Features List */}
        {[
          { icon: "🤖", text: "AI-powered price predictions" },
          { icon: "⚡", text: "Real-time market data" },
          { icon: "📊", text: "Portfolio management" },
          { icon: "🔒", text: "Bank-level security" },
        ].map((item) => (
          <div key={item.text} style={{
            display: "flex", alignItems: "center",
            gap: "12px", marginBottom: "16px",
          }}>
            <div style={{
              width: "36px", height: "36px", borderRadius: "8px",
              background: "rgba(240,185,11,0.1)",
              display: "flex", alignItems: "center",
              justifyContent: "center", fontSize: "16px",
            }}>
              {item.icon}
            </div>
            <span style={{ color: "#848e9c", fontSize: "15px" }}>
              {item.text}
            </span>
          </div>
        ))}
      </div>

      {/* Right Panel - Form */}
      <div style={{
        flex: 1, display: "flex", alignItems: "center",
        justifyContent: "center", padding: "40px",
      }}>
        <div style={{
        width: "480px", display: "flex", alignItems: "center",
        justifyContent: "center", padding: "40px",
        background: "#0b0e11",
      }}>
        <div style={{ width: "100%" }}>

          <h2 style={{ fontSize: "26px", fontWeight: "800",
            color: "#eaecef", marginBottom: "8px" }}>
            Sign In
          </h2>
          <p style={{ color: "#848e9c", fontSize: "14px",
            marginBottom: "32px" }}>
            Don't have an account?{" "}
            <Link href="/register" style={{ color: "#f0b90b",
              textDecoration: "none", fontWeight: "600" }}>
              Register Now
            </Link>
          </p>

          {error && (
            <div style={{
              background: "rgba(246,70,93,0.1)",
              border: "1px solid rgba(246,70,93,0.3)",
              borderRadius: "8px", padding: "12px 16px",
              marginBottom: "20px", color: "#f6465d",
              fontSize: "14px", display: "flex",
              alignItems: "center", gap: "8px",
            }}>
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            {/* Email */}
            <div style={{ marginBottom: "20px" }}>
              <label style={{ color: "#848e9c", fontSize: "13px",
                fontWeight: "500", display: "block",
                marginBottom: "8px" }}>
                Email Address
              </label>
              <input type="email" required
                value={formData.email}
                onChange={(e) => setFormData({
                  ...formData, email: e.target.value })}
                placeholder="Enter your email"
                style={{
                  width: "100%", background: "#161a1e",
                  border: "1px solid #2b3139", borderRadius: "8px",
                  padding: "14px 16px", color: "#eaecef",
                  fontSize: "15px", outline: "none",
                  boxSizing: "border-box" as any,
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => e.target.style.borderColor = "#f0b90b"}
                onBlur={(e) => e.target.style.borderColor = "#2b3139"}
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: "12px" }}>
              <div style={{ display: "flex",
                justifyContent: "space-between",
                alignItems: "center", marginBottom: "8px" }}>
                <label style={{ color: "#848e9c", fontSize: "13px",
                  fontWeight: "500" }}>Password</label>
                <a href="#" style={{ color: "#f0b90b",
                  fontSize: "13px", textDecoration: "none" }}>
                  Forgot password?
                </a>
              </div>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  required value={formData.password}
                  onChange={(e) => setFormData({
                    ...formData, password: e.target.value })}
                  placeholder="Enter your password"
                  style={{
                    width: "100%", background: "#161a1e",
                    border: "1px solid #2b3139", borderRadius: "8px",
                    padding: "14px 48px 14px 16px",
                    color: "#eaecef", fontSize: "15px",
                    outline: "none", boxSizing: "border-box" as any,
                    transition: "border-color 0.2s",
                  }}
                  onFocus={(e) => e.target.style.borderColor = "#f0b90b"}
                  onBlur={(e) => e.target.style.borderColor = "#2b3139"}
                />
                <button type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: "absolute", right: "14px",
                    top: "50%", transform: "translateY(-50%)",
                    background: "none", border: "none",
                    cursor: "pointer", color: "#848e9c",
                    fontSize: "16px" }}>
                  {showPassword ? "🙈" : "👁"}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading}
              style={{
                width: "100%", padding: "14px", borderRadius: "8px",
                border: "none", cursor: loading ? "not-allowed" : "pointer",
                fontWeight: "700", fontSize: "16px",
                color: "#000", marginTop: "24px",
                background: loading
                  ? "#848e9c"
                  : "linear-gradient(135deg, #f0b90b, #d4a200)",
                boxShadow: loading
                  ? "none" : "0 4px 20px rgba(240,185,11,0.3)",
                transition: "all 0.2s",
              }}>
              {loading ? "Signing in..." : "Sign In →"}
            </button>

          </form>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center",
            gap: "12px", margin: "24px 0" }}>
            <div style={{ flex: 1, height: "1px",
              background: "#2b3139" }} />
            <span style={{ color: "#848e9c", fontSize: "13px" }}>
              Secured by PrachinX
            </span>
            <div style={{ flex: 1, height: "1px",
              background: "#2b3139" }} />
          </div>

          {/* Trust */}
          <div style={{ display: "flex", justifyContent: "center",
            gap: "20px" }}>
            {["🔒 SSL Secure", "⚡ Fast Login",
              "🤖 AI Ready"].map((badge) => (
              <span key={badge} style={{ color: "#5e6673",
                fontSize: "12px" }}>{badge}</span>
            ))}
          </div>

        </div>
        </div>
      </div>
    </div>
  );
}