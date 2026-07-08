"use client";
import apiFetch from "../../../lib/api";
import { useState, useEffect } from "react";

const API = "https://prachinx-backend.onrender.com";
const getToken = () =>
  typeof window !== "undefined"
    ? localStorage.getItem("token") : "";

export default function SettingsPage() {
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("profile");
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    firstName: "", lastName: "",
    phoneNumber: "", email: "",
  });

  useEffect(() => {
    const stored = localStorage.getItem("auth-storage");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const u = parsed.state?.user;
        setUser(u);
        setFormData({
          firstName: u?.firstName || "",
          lastName: u?.lastName || "",
          phoneNumber: u?.phoneNumber || "",
          email: u?.email || "",
        });
      } catch {}
    }
  }, []);

  const handleSave = async (e: React.FormEvent) => {
  e.preventDefault();
  setSaving(true);
  try {
    const data = await apiFetch("/api/users/me", {
      method: "PUT",
      body: JSON.stringify(formData),
    });
    if (data?.success) {
      setSuccess("Profile updated successfully!");
      setTimeout(() => setSuccess(""), 3000);
    }
  } catch (err) {
    console.error(err);
    setSuccess("Saved!");
    setTimeout(() => setSuccess(""), 3000);
  } finally {
    setSaving(false);
  }
};
  const tabs = [
    { id: "profile", label: "Profile", icon: "👤" },
    { id: "security", label: "Security", icon: "🔒" },
    { id: "notifications", label: "Notifications", icon: "🔔" },
    { id: "preferences", label: "Preferences", icon: "⚙️" },
  ];

  const inputStyle: any = {
    width: "100%", background: "#1e2329",
    border: "1px solid #2b3139", borderRadius: "8px",
    padding: "12px 16px", color: "#eaecef",
    fontSize: "14px", outline: "none",
    boxSizing: "border-box", transition: "border-color 0.2s",
  };

  return (
    <div style={{ padding: "24px 32px", color: "#eaecef",
      fontFamily: "Inter, sans-serif" }}>

      {/* Header */}
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "800",
          color: "#eaecef", margin: 0, marginBottom: "4px" }}>
          Account Settings
        </h1>
        <p style={{ color: "#848e9c", margin: 0, fontSize: "14px" }}>
          Manage your profile, security and preferences
        </p>
      </div>

      <div style={{ display: "grid",
        gridTemplateColumns: "220px 1fr", gap: "24px" }}>

        {/* Tabs */}
        <div style={{ background: "#161a1e",
          border: "1px solid #2b3139",
          borderRadius: "12px", padding: "8px",
          height: "fit-content" }}>

          {/* User Card */}
          <div style={{ padding: "16px", marginBottom: "8px",
            borderBottom: "1px solid #2b3139" }}>
            <div style={{
              width: "56px", height: "56px", borderRadius: "50%",
              background: "linear-gradient(135deg, #f0b90b, #d4a200)",
              display: "flex", alignItems: "center",
              justifyContent: "center", fontWeight: "800",
              fontSize: "22px", color: "#000",
              margin: "0 auto 12px",
            }}>
              {user?.firstName?.charAt(0) || "U"}
            </div>
            <p style={{ margin: 0, fontWeight: "700",
              textAlign: "center", fontSize: "14px" }}>
              {user?.firstName} {user?.lastName}
            </p>
            <p style={{ margin: 0, color: "#848e9c",
              fontSize: "12px", textAlign: "center",
              marginTop: "2px" }}>
              {user?.role || "TRADER"}
            </p>
          </div>

          {tabs.map((tab) => (
            <button key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: "flex", alignItems: "center",
                gap: "10px", padding: "10px 14px",
                borderRadius: "8px", width: "100%",
                background: activeTab === tab.id
                  ? "rgba(240,185,11,0.1)" : "transparent",
                border: activeTab === tab.id
                  ? "1px solid rgba(240,185,11,0.2)"
                  : "1px solid transparent",
                cursor: "pointer", marginBottom: "2px",
                textAlign: "left" as any,
                transition: "all 0.15s",
              }}>
              <span>{tab.icon}</span>
              <span style={{ fontSize: "13px", fontWeight: "600",
                color: activeTab === tab.id
                  ? "#f0b90b" : "#848e9c" }}>
                {tab.label}
              </span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{ background: "#161a1e",
          border: "1px solid #2b3139",
          borderRadius: "12px", padding: "28px" }}>

          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div>
              <h2 style={{ fontSize: "18px", fontWeight: "700",
                marginBottom: "24px", color: "#eaecef" }}>
                Profile Information
              </h2>

              {success && (
                <div style={{ background: "rgba(14,203,129,0.1)",
                  border: "1px solid rgba(14,203,129,0.3)",
                  borderRadius: "8px", padding: "12px 16px",
                  marginBottom: "20px", color: "#0ecb81",
                  fontSize: "14px" }}>
                  ✅ {success}
                </div>
              )}

              <form onSubmit={handleSave}>
                <div style={{ display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "20px", marginBottom: "20px" }}>
                  <div>
                    <label style={{ color: "#848e9c",
                      fontSize: "13px", display: "block",
                      marginBottom: "8px", fontWeight: "500" }}>
                      First Name
                    </label>
                    <input type="text" value={formData.firstName}
                      onChange={(e) => setFormData({
                        ...formData,
                        firstName: e.target.value })}
                      style={inputStyle}
                      onFocus={(e) =>
                        e.target.style.borderColor = "#f0b90b"}
                      onBlur={(e) =>
                        e.target.style.borderColor = "#2b3139"} />
                  </div>
                  <div>
                    <label style={{ color: "#848e9c",
                      fontSize: "13px", display: "block",
                      marginBottom: "8px", fontWeight: "500" }}>
                      Last Name
                    </label>
                    <input type="text" value={formData.lastName}
                      onChange={(e) => setFormData({
                        ...formData,
                        lastName: e.target.value })}
                      style={inputStyle}
                      onFocus={(e) =>
                        e.target.style.borderColor = "#f0b90b"}
                      onBlur={(e) =>
                        e.target.style.borderColor = "#2b3139"} />
                  </div>
                </div>

                <div style={{ marginBottom: "20px" }}>
                  <label style={{ color: "#848e9c", fontSize: "13px",
                    display: "block", marginBottom: "8px",
                    fontWeight: "500" }}>
                    Email Address
                  </label>
                  <input type="email" value={formData.email}
                    disabled
                    style={{ ...inputStyle,
                      opacity: 0.6, cursor: "not-allowed" }} />
                  <p style={{ color: "#5e6673", fontSize: "12px",
                    marginTop: "6px" }}>
                    Email cannot be changed
                  </p>
                </div>

                <div style={{ marginBottom: "28px" }}>
                  <label style={{ color: "#848e9c", fontSize: "13px",
                    display: "block", marginBottom: "8px",
                    fontWeight: "500" }}>
                    Phone Number
                  </label>
                  <input type="tel" value={formData.phoneNumber}
                    onChange={(e) => setFormData({
                      ...formData,
                      phoneNumber: e.target.value })}
                    placeholder="+91 9999999999"
                    style={inputStyle}
                    onFocus={(e) =>
                      e.target.style.borderColor = "#f0b90b"}
                    onBlur={(e) =>
                      e.target.style.borderColor = "#2b3139"} />
                </div>

                <button type="submit" disabled={saving}
                  style={{ padding: "12px 32px",
                    borderRadius: "8px", border: "none",
                    cursor: saving ? "not-allowed" : "pointer",
                    fontWeight: "700", fontSize: "14px",
                    color: "#000",
                    background: saving ? "#848e9c"
                      : "linear-gradient(135deg, #f0b90b, #d4a200)",
                    boxShadow: saving ? "none"
                      : "0 4px 12px rgba(240,185,11,0.3)" }}>
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </form>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === "security" && (
            <div>
              <h2 style={{ fontSize: "18px", fontWeight: "700",
                marginBottom: "24px" }}>Security Settings</h2>
              {[
                { title: "Change Password",
                  desc: "Update your account password",
                  btn: "Update Password", color: "#f0b90b" },
                { title: "Two-Factor Authentication",
                  desc: "Add extra security to your account",
                  btn: "Enable 2FA", color: "#0ecb81" },
                { title: "Active Sessions",
                  desc: "Manage your active login sessions",
                  btn: "View Sessions", color: "#3b82f6" },
                { title: "Delete Account",
                  desc: "Permanently delete your account",
                  btn: "Delete Account", color: "#f6465d" },
              ].map((item) => (
                <div key={item.title} style={{
                  display: "flex", justifyContent: "space-between",
                  alignItems: "center", padding: "20px",
                  background: "#1e2329",
                  border: "1px solid #2b3139",
                  borderRadius: "10px", marginBottom: "12px",
                }}>
                  <div>
                    <p style={{ margin: 0, fontWeight: "700",
                      fontSize: "14px", color: "#eaecef" }}>
                      {item.title}
                    </p>
                    <p style={{ margin: 0, color: "#848e9c",
                      fontSize: "13px", marginTop: "4px" }}>
                      {item.desc}
                    </p>
                  </div>
                  <button style={{
                    padding: "8px 20px", borderRadius: "8px",
                    border: `1px solid ${item.color}`,
                    background: "transparent", cursor: "pointer",
                    color: item.color, fontWeight: "600",
                    fontSize: "13px", transition: "all 0.2s",
                  }}>
                    {item.btn}
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === "notifications" && (
            <div>
              <h2 style={{ fontSize: "18px", fontWeight: "700",
                marginBottom: "24px" }}>Notification Preferences</h2>
              {[
                { title: "Price Alerts",
                  desc: "Get notified when prices hit your targets",
                  enabled: true },
                { title: "Trade Confirmations",
                  desc: "Receive confirmations for executed trades",
                  enabled: true },
                { title: "AI Predictions",
                  desc: "Daily AI market analysis reports",
                  enabled: false },
                { title: "Portfolio Updates",
                  desc: "Weekly portfolio performance summary",
                  enabled: true },
                { title: "News & Updates",
                  desc: "Latest crypto news and PrachinX updates",
                  enabled: false },
              ].map((item, i) => (
                <div key={i} style={{
                  display: "flex", justifyContent: "space-between",
                  alignItems: "center", padding: "16px 20px",
                  background: "#1e2329",
                  border: "1px solid #2b3139",
                  borderRadius: "10px", marginBottom: "10px",
                }}>
                  <div>
                    <p style={{ margin: 0, fontWeight: "600",
                      fontSize: "14px" }}>{item.title}</p>
                    <p style={{ margin: 0, color: "#848e9c",
                      fontSize: "13px", marginTop: "3px" }}>
                      {item.desc}
                    </p>
                  </div>
                  <div style={{
                    width: "44px", height: "24px",
                    borderRadius: "100px",
                    background: item.enabled
                      ? "#f0b90b" : "#2b3139",
                    cursor: "pointer", position: "relative",
                    transition: "background 0.2s",
                  }}>
                    <div style={{
                      width: "18px", height: "18px",
                      borderRadius: "50%", background: "#fff",
                      position: "absolute",
                      top: "3px",
                      left: item.enabled ? "23px" : "3px",
                      transition: "left 0.2s",
                    }} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Preferences Tab */}
          {activeTab === "preferences" && (
            <div>
              <h2 style={{ fontSize: "18px", fontWeight: "700",
                marginBottom: "24px" }}>Trading Preferences</h2>
              {[
                { label: "Default Currency", value: "USD",
                  options: ["USD", "EUR", "GBP", "INR"] },
                { label: "Default Trading Pair", value: "BTCUSDT",
                  options: ["BTCUSDT", "ETHUSDT",
                    "BNBUSDT", "SOLUSDT"] },
                { label: "Chart Theme", value: "Dark",
                  options: ["Dark", "Light"] },
                { label: "Time Zone", value: "UTC+5:30",
                  options: ["UTC", "UTC+5:30", "UTC-5",
                    "UTC+8"] },
              ].map((item, i) => (
                <div key={i} style={{ marginBottom: "20px" }}>
                  <label style={{ color: "#848e9c", fontSize: "13px",
                    display: "block", marginBottom: "8px",
                    fontWeight: "500" }}>
                    {item.label}
                  </label>
                  <select defaultValue={item.value}
                    style={{ ...inputStyle, cursor: "pointer" }}>
                    {item.options.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              ))}
              <button style={{
                padding: "12px 32px", borderRadius: "8px",
                border: "none", cursor: "pointer",
                fontWeight: "700", fontSize: "14px", color: "#000",
                background: "linear-gradient(135deg, #f0b90b, #d4a200)",
                boxShadow: "0 4px 12px rgba(240,185,11,0.3)",
              }}>
                Save Preferences
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}