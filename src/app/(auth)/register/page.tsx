"use client";
import Logo from "@/components/logo";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { authService } from "@/services/auth.service";
export default function RegisterPage() {
  const router = useRouter();
  const { setAuth } = useAuthStore();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", username: "",
    email: "", password: "", phoneNumber: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.username) {
      setError("Please fill all required fields!");
      return;
    }
    setError("");
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await authService.register(formData);
      if (response.success) {
        const { token, ...user } = response.data;
        setAuth(user, token);
        router.push("/dashboard/overview");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed!");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle: any = {
    width: "100%", background: "#161a1e",
    border: "1px solid #2b3139", borderRadius: "8px",
    padding: "14px 16px", color: "#eaecef",
    fontSize: "15px", outline: "none",
    boxSizing: "border-box", transition: "border-color 0.2s",
  };

  return (
    <div style={{
      minHeight: "100vh", display: "flex",
      background: "#0b0e11", fontFamily: "Inter, sans-serif",
    }}>

      {/* Left Panel */}
      <div style={{ flex: 1, padding: "80px" }}>
      <Logo size="lg" href="/" />

        <h1 style={{ fontSize: "42px", fontWeight: "800",
          color: "#eaecef", lineHeight: 1.2, marginBottom: "20px" }}>
          Start Trading with
          <span style={{
            background: "linear-gradient(135deg, #f0b90b, #f8d33a)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            display: "block",
          }}>
            Intelligence
          </span>
        </h1>

        <p style={{ color: "#848e9c", fontSize: "16px",
          lineHeight: 1.7, marginBottom: "40px" }}>
          Join thousands of traders using PrachinX to make
          data-driven decisions powered by artificial intelligence.
        </p>

        {/* Steps */}
        {[
          { num: "01", title: "Create Account",
            desc: "Sign up in less than 2 minutes" },
          { num: "02", title: "Deposit Funds",
            desc: "Add virtual balance to start trading" },
          { num: "03", title: "Start Trading",
            desc: "Use AI predictions to trade smarter" },
        ].map((item) => (
          <div key={item.num} style={{
            display: "flex", gap: "16px",
            marginBottom: "24px", alignItems: "flex-start",
          }}>
            <div style={{
              width: "40px", height: "40px", borderRadius: "8px",
              background: "rgba(240,185,11,0.1)",
              border: "1px solid rgba(240,185,11,0.3)",
              display: "flex", alignItems: "center",
              justifyContent: "center", flexShrink: 0,
              color: "#f0b90b", fontWeight: "800", fontSize: "13px",
            }}>
              {item.num}
            </div>
            <div>
              <p style={{ fontWeight: "700", marginBottom: "4px",
                color: "#eaecef" }}>{item.title}</p>
              <p style={{ color: "#848e9c", fontSize: "14px" }}>
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
      

      {/* Right Panel */}
      <div style={{
        width: "520px", display: "flex", alignItems: "center",
        justifyContent: "center", padding: "40px",
        background: "#0b0e11",
      }}>
        <div style={{ width: "100%" }}>

          {/* Step Indicator */}
          <div style={{ display: "flex", alignItems: "center",
            gap: "8px", marginBottom: "32px" }}>
            {[1, 2].map((s) => (
              <div key={s} style={{ display: "flex",
                alignItems: "center", gap: "8px" }}>
                <div style={{
                  width: "28px", height: "28px", borderRadius: "50%",
                  display: "flex", alignItems: "center",
                  justifyContent: "center", fontSize: "13px",
                  fontWeight: "700",
                  background: step >= s
                    ? "linear-gradient(135deg, #f0b90b, #d4a200)"
                    : "#2b3139",
                  color: step >= s ? "#000" : "#848e9c",
                }}>
                  {step > s ? "✓" : s}
                </div>
                <span style={{ fontSize: "13px",
                  color: step >= s ? "#f0b90b" : "#848e9c",
                  fontWeight: step >= s ? "600" : "400" }}>
                  {s === 1 ? "Personal Info" : "Credentials"}
                </span>
                {s === 1 && (
                  <div style={{ width: "40px", height: "2px",
                    background: step > 1 ? "#f0b90b" : "#2b3139",
                    margin: "0 4px" }} />
                )}
              </div>
            ))}
          </div>

          <h2 style={{ fontSize: "26px", fontWeight: "800",
            color: "#eaecef", marginBottom: "8px" }}>
            {step === 1 ? "Personal Information" : "Account Credentials"}
          </h2>
          <p style={{ color: "#848e9c", fontSize: "14px",
            marginBottom: "28px" }}>
            Already have an account?{" "}
            <Link href="/login" style={{ color: "#f0b90b",
              textDecoration: "none", fontWeight: "600" }}>
              Sign In
            </Link>
          </p>

          {error && (
            <div style={{
              background: "rgba(246,70,93,0.1)",
              border: "1px solid rgba(246,70,93,0.3)",
              borderRadius: "8px", padding: "12px 16px",
              marginBottom: "20px", color: "#f6465d", fontSize: "14px",
            }}>
              ⚠️ {error}
            </div>
          )}

          {/* Step 1 */}
          {step === 1 && (
            <form onSubmit={handleStep1}>
              <div style={{ display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px", marginBottom: "16px" }}>
                <div>
                  <label style={{ color: "#848e9c", fontSize: "13px",
                    display: "block", marginBottom: "8px" }}>
                    First Name *
                  </label>
                  <input type="text" name="firstName" required
                    value={formData.firstName} onChange={handleChange}
                    placeholder="John" style={inputStyle}
                    onFocus={(e) =>
                      e.target.style.borderColor = "#f0b90b"}
                    onBlur={(e) =>
                      e.target.style.borderColor = "#2b3139"} />
                </div>
                <div>
                  <label style={{ color: "#848e9c", fontSize: "13px",
                    display: "block", marginBottom: "8px" }}>
                    Last Name *
                  </label>
                  <input type="text" name="lastName" required
                    value={formData.lastName} onChange={handleChange}
                    placeholder="Doe" style={inputStyle}
                    onFocus={(e) =>
                      e.target.style.borderColor = "#f0b90b"}
                    onBlur={(e) =>
                      e.target.style.borderColor = "#2b3139"} />
                </div>
              </div>

              <div style={{ marginBottom: "16px" }}>
                <label style={{ color: "#848e9c", fontSize: "13px",
                  display: "block", marginBottom: "8px" }}>
                  Username *
                </label>
                <input type="text" name="username" required
                  value={formData.username} onChange={handleChange}
                  placeholder="johndoe" style={inputStyle}
                  onFocus={(e) =>
                    e.target.style.borderColor = "#f0b90b"}
                  onBlur={(e) =>
                    e.target.style.borderColor = "#2b3139"} />
              </div>

              <div style={{ marginBottom: "24px" }}>
                <label style={{ color: "#848e9c", fontSize: "13px",
                  display: "block", marginBottom: "8px" }}>
                  Phone Number (Optional)
                </label>
                <input type="tel" name="phoneNumber"
                  value={formData.phoneNumber} onChange={handleChange}
                  placeholder="+91 9999999999" style={inputStyle}
                  onFocus={(e) =>
                    e.target.style.borderColor = "#f0b90b"}
                  onBlur={(e) =>
                    e.target.style.borderColor = "#2b3139"} />
              </div>

              <button type="submit" style={{
                width: "100%", padding: "14px", borderRadius: "8px",
                border: "none", cursor: "pointer", fontWeight: "700",
                fontSize: "16px", color: "#000",
                background: "linear-gradient(135deg, #f0b90b, #d4a200)",
                boxShadow: "0 4px 20px rgba(240,185,11,0.3)",
              }}>
                Continue →
              </button>
            </form>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: "16px" }}>
                <label style={{ color: "#848e9c", fontSize: "13px",
                  display: "block", marginBottom: "8px" }}>
                  Email Address *
                </label>
                <input type="email" name="email" required
                  value={formData.email} onChange={handleChange}
                  placeholder="you@example.com" style={inputStyle}
                  onFocus={(e) =>
                    e.target.style.borderColor = "#f0b90b"}
                  onBlur={(e) =>
                    e.target.style.borderColor = "#2b3139"} />
              </div>

              <div style={{ marginBottom: "8px" }}>
                <label style={{ color: "#848e9c", fontSize: "13px",
                  display: "block", marginBottom: "8px" }}>
                  Password *
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password" required minLength={8}
                    value={formData.password} onChange={handleChange}
                    placeholder="Min 8 characters"
                    style={{ ...inputStyle, paddingRight: "48px" }}
                    onFocus={(e) =>
                      e.target.style.borderColor = "#f0b90b"}
                    onBlur={(e) =>
                      e.target.style.borderColor = "#2b3139"} />
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

              {/* Password Strength */}
              {formData.password && (
                <div style={{ marginBottom: "24px" }}>
                  <div style={{ height: "3px", borderRadius: "2px",
                    background: "#2b3139", overflow: "hidden",
                    marginBottom: "6px" }}>
                    <div style={{
                      height: "100%", borderRadius: "2px",
                      transition: "all 0.3s",
                      width: formData.password.length < 6 ? "30%"
                        : formData.password.length < 10 ? "65%" : "100%",
                      background: formData.password.length < 6
                        ? "#f6465d"
                        : formData.password.length < 10
                        ? "#f0b90b" : "#0ecb81",
                    }} />
                  </div>
                  <p style={{ fontSize: "12px",
                    color: formData.password.length < 6 ? "#f6465d"
                      : formData.password.length < 10
                      ? "#f0b90b" : "#0ecb81" }}>
                    {formData.password.length < 6 ? "Weak password"
                      : formData.password.length < 10
                      ? "Medium strength" : "Strong password"}
                  </p>
                </div>
              )}

              <div style={{ display: "flex", gap: "12px",
                marginTop: "24px" }}>
                <button type="button" onClick={() => setStep(1)}
                  style={{ flex: 1, padding: "14px", borderRadius: "8px",
                    border: "1px solid #2b3139", cursor: "pointer",
                    fontWeight: "600", fontSize: "15px",
                    color: "#848e9c", background: "transparent" }}>
                  ← Back
                </button>
                <button type="submit" disabled={loading}
                  style={{ flex: 2, padding: "14px", borderRadius: "8px",
                    border: "none", cursor: loading
                      ? "not-allowed" : "pointer",
                    fontWeight: "700", fontSize: "16px",
                    color: "#000",
                    background: loading ? "#848e9c"
                      : "linear-gradient(135deg, #f0b90b, #d4a200)",
                    boxShadow: loading ? "none"
                      : "0 4px 20px rgba(240,185,11,0.3)" }}>
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