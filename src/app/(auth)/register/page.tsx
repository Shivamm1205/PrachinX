"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "src/store/authStore";
import { authService } from "src/services/auth.service";
import Logo from "src/components/Logo";
import { useWindowSize } from "src/hooks/useWindowSize";

export default function RegisterPage() {
  const router = useRouter();
  const { setAuth } = useAuthStore();
  const { isMobile } = useWindowSize();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", username: "",
    email: "", password: "", phoneNumber: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName
      || !formData.username) {
      setError("Please fill all required fields!");
      return;
    }
    setError(""); setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError("");
    try {
      const response = await authService.register(formData);
      if (response.success) {
        const { token, ...user } = response.data;
        setAuth(user, token);
        router.push("/dashboard/overview");
      }
    } catch (err: any) {
      setError(err.response?.data?.message
        || "Registration failed!");
    } finally { setLoading(false); }
  };

  const inputStyle: any = {
    width: "100%", background: "#161a1e",
    border: "1px solid #2b3139", borderRadius: "8px",
    padding: "13px 14px", color: "#eaecef",
    fontSize: "14px", outline: "none",
    boxSizing: "border-box", transition: "border-color 0.2s",
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0b0e11",
      fontFamily: "Inter, sans-serif",
      display: "flex",
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
          <div style={{ marginBottom: "40px" }}>
            <Logo size="lg" href="/" />
          </div>
          <h1 style={{ fontSize: "40px", fontWeight: "800",
            color: "#eaecef", lineHeight: 1.2,
            marginBottom: "16px" }}>
            Start Trading with
            <span style={{
              background: "linear-gradient(135deg, #f0b90b, #f8d33a)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              display: "block",
            }}>Intelligence</span>
          </h1>
          {[
            { num: "01", title: "Create Account",
              desc: "Sign up in 2 minutes" },
            { num: "02", title: "Deposit Funds",
              desc: "Add virtual balance" },
            { num: "03", title: "Start Trading",
              desc: "Use AI to trade smarter" },
          ].map((item) => (
            <div key={item.num} style={{
              display: "flex", gap: "14px",
              marginBottom: "20px", alignItems: "flex-start",
            }}>
              <div style={{
                width: "36px", height: "36px", borderRadius: "8px",
                background: "rgba(240,185,11,0.1)",
                border: "1px solid rgba(240,185,11,0.3)",
                display: "flex", alignItems: "center",
                justifyContent: "center", flexShrink: 0,
                color: "#f0b90b", fontWeight: "800",
                fontSize: "12px",
              }}>{item.num}</div>
              <div>
                <p style={{ fontWeight: "700",
                  marginBottom: "2px", color: "#eaecef",
                  fontSize: "14px" }}>{item.title}</p>
                <p style={{ color: "#848e9c",
                  fontSize: "13px" }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Form */}
      <div style={{
        width: isMobile ? "100%" : "520px",
        display: "flex", alignItems: "center",
        justifyContent: "center",
        padding: isMobile ? "24px 16px" : "40px",
        minHeight: isMobile ? "100vh" : "auto",
      }}>
        <div style={{ width: "100%",
          maxWidth: isMobile ? "400px" : "100%" }}>

          {/* Mobile Logo */}
          {isMobile && (
            <div style={{ textAlign: "center",
              marginBottom: "28px" }}>
              <Logo size="md" href="/" />
            </div>
          )}

          {/* Step Indicator */}
          <div style={{ display: "flex", alignItems: "center",
            gap: "8px", marginBottom: "24px" }}>
            {[1, 2].map((s) => (
              <div key={s} style={{ display: "flex",
                alignItems: "center", gap: "6px" }}>
                <div style={{
                  width: "26px", height: "26px",
                  borderRadius: "50%", display: "flex",
                  alignItems: "center", justifyContent: "center",
                  fontSize: "12px", fontWeight: "700",
                  background: step >= s
                    ? "linear-gradient(135deg, #f0b90b, #d4a200)"
                    : "#2b3139",
                  color: step >= s ? "#000" : "#848e9c",
                }}>
                  {step > s ? "✓" : s}
                </div>
                <span style={{ fontSize: "12px",
                  color: step >= s ? "#f0b90b" : "#848e9c",
                  fontWeight: step >= s ? "600" : "400" }}>
                  {s === 1 ? "Personal" : "Credentials"}
                </span>
                {s === 1 && (
                  <div style={{ width: "32px", height: "2px",
                    background: step > 1 ? "#f0b90b" : "#2b3139",
                    margin: "0 2px" }} />
                )}
              </div>
            ))}
          </div>

          <h2 style={{
            fontSize: isMobile ? "22px" : "24px",
            fontWeight: "800", color: "#eaecef",
            marginBottom: "4px" }}>
            {step === 1 ? "Personal Info" : "Set Credentials"}
          </h2>
          <p style={{ color: "#848e9c", fontSize: "13px",
            marginBottom: "20px" }}>
            Have account?{" "}
            <Link href="/login" style={{ color: "#f0b90b",
              textDecoration: "none", fontWeight: "600" }}>
              Sign In
            </Link>
          </p>

          {error && (
            <div style={{
              background: "rgba(246,70,93,0.1)",
              border: "1px solid rgba(246,70,93,0.3)",
              borderRadius: "8px", padding: "10px 14px",
              marginBottom: "16px", color: "#f6465d",
              fontSize: "13px" }}>⚠️ {error}</div>
          )}

          {step === 1 && (
            <form onSubmit={handleStep1}>
              <div style={{ display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "12px", marginBottom: "14px" }}>
                <div>
                  <label style={{ color: "#848e9c",
                    fontSize: "12px", display: "block",
                    marginBottom: "6px" }}>First Name *</label>
                  <input type="text" name="firstName" required
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="John" style={inputStyle}
                    onFocus={(e) =>
                      e.target.style.borderColor = "#f0b90b"}
                    onBlur={(e) =>
                      e.target.style.borderColor = "#2b3139"} />
                </div>
                <div>
                  <label style={{ color: "#848e9c",
                    fontSize: "12px", display: "block",
                    marginBottom: "6px" }}>Last Name *</label>
                  <input type="text" name="lastName" required
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Doe" style={inputStyle}
                    onFocus={(e) =>
                      e.target.style.borderColor = "#f0b90b"}
                    onBlur={(e) =>
                      e.target.style.borderColor = "#2b3139"} />
                </div>
              </div>
              <div style={{ marginBottom: "14px" }}>
                <label style={{ color: "#848e9c",
                  fontSize: "12px", display: "block",
                  marginBottom: "6px" }}>Username *</label>
                <input type="text" name="username" required
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="johndoe" style={inputStyle}
                  onFocus={(e) =>
                    e.target.style.borderColor = "#f0b90b"}
                  onBlur={(e) =>
                    e.target.style.borderColor = "#2b3139"} />
              </div>
              <div style={{ marginBottom: "20px" }}>
                <label style={{ color: "#848e9c",
                  fontSize: "12px", display: "block",
                  marginBottom: "6px" }}>Phone (Optional)</label>
                <input type="tel" name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="+91 9999999999" style={inputStyle}
                  onFocus={(e) =>
                    e.target.style.borderColor = "#f0b90b"}
                  onBlur={(e) =>
                    e.target.style.borderColor = "#2b3139"} />
              </div>
              <button type="submit" style={{
                width: "100%", padding: "13px",
                borderRadius: "8px", border: "none",
                cursor: "pointer", fontWeight: "700",
                fontSize: "15px", color: "#000",
                background:
                  "linear-gradient(135deg, #f0b90b, #d4a200)",
                boxShadow: "0 4px 16px rgba(240,185,11,0.3)",
              }}>
                Continue →
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: "14px" }}>
                <label style={{ color: "#848e9c",
                  fontSize: "12px", display: "block",
                  marginBottom: "6px" }}>Email *</label>
                <input type="email" name="email" required
                  value={formData.email} onChange={handleChange}
                  placeholder="you@example.com" style={inputStyle}
                  onFocus={(e) =>
                    e.target.style.borderColor = "#f0b90b"}
                  onBlur={(e) =>
                    e.target.style.borderColor = "#2b3139"} />
              </div>
              <div style={{ marginBottom: "8px" }}>
                <label style={{ color: "#848e9c",
                  fontSize: "12px", display: "block",
                  marginBottom: "6px" }}>Password *</label>
                <div style={{ position: "relative" }}>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password" required minLength={8}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Min 8 characters"
                    style={{ ...inputStyle, paddingRight: "44px" }}
                    onFocus={(e) =>
                      e.target.style.borderColor = "#f0b90b"}
                    onBlur={(e) =>
                      e.target.style.borderColor = "#2b3139"} />
                  <button type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)}
                    style={{ position: "absolute", right: "12px",
                      top: "50%", transform: "translateY(-50%)",
                      background: "none", border: "none",
                      cursor: "pointer", color: "#848e9c",
                      fontSize: "15px" }}>
                    {showPassword ? "🙈" : "👁"}
                  </button>
                </div>
              </div>

              {formData.password && (
                <div style={{ marginBottom: "20px" }}>
                  <div style={{ height: "3px", borderRadius: "2px",
                    background: "#2b3139", overflow: "hidden",
                    marginBottom: "4px" }}>
                    <div style={{
                      height: "100%", borderRadius: "2px",
                      width: formData.password.length < 6
                        ? "30%" : formData.password.length < 10
                        ? "65%" : "100%",
                      background: formData.password.length < 6
                        ? "#f6465d"
                        : formData.password.length < 10
                        ? "#f0b90b" : "#0ecb81",
                    }} />
                  </div>
                  <p style={{ fontSize: "11px",
                    color: formData.password.length < 6
                      ? "#f6465d"
                      : formData.password.length < 10
                      ? "#f0b90b" : "#0ecb81" }}>
                    {formData.password.length < 6 ? "Weak"
                      : formData.password.length < 10
                      ? "Medium" : "Strong"} password
                  </p>
                </div>
              )}

              <div style={{ display: "flex", gap: "10px",
                marginTop: "20px" }}>
                <button type="button" onClick={() => setStep(1)}
                  style={{ flex: 1, padding: "13px",
                    borderRadius: "8px",
                    border: "1px solid #2b3139",
                    cursor: "pointer", fontWeight: "600",
                    fontSize: "14px", color: "#848e9c",
                    background: "transparent" }}>
                  ← Back
                </button>
                <button type="submit" disabled={loading}
                  style={{ flex: 2, padding: "13px",
                    borderRadius: "8px", border: "none",
                    cursor: loading ? "not-allowed" : "pointer",
                    fontWeight: "700", fontSize: "15px",
                    color: "#000",
                    background: loading ? "#848e9c"
                      : "linear-gradient(135deg, #f0b90b, #d4a200)",
                    boxShadow: loading ? "none"
                      : "0 4px 16px rgba(240,185,11,0.3)" }}>
                  {loading ? "Creating..." : "Create Account →"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
