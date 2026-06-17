"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const pageTitles: Record<string, { title: string; desc: string }> = {
  "/dashboard/overview":
    { title: "Overview", desc: "Your trading dashboard" },
  "/dashboard/markets":
    { title: "Markets", desc: "Live cryptocurrency prices" },
  "/dashboard/trading":
    { title: "Trading", desc: "Buy and sell crypto" },
  "/dashboard/portfolio":
    { title: "Portfolio", desc: "Your assets and history" },
  "/dashboard/ai-predictions":
    { title: "AI Predictions", desc: "Machine learning insights" },
  "/dashboard/settings":
    { title: "Settings", desc: "Account preferences" },
};

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [time, setTime] = useState(new Date());
  const page = pageTitles[pathname] ||
    { title: "Dashboard", desc: "" };

  useEffect(() => {
    try {
      const stored = localStorage.getItem("auth-storage");
      if (stored) {
        const parsed = JSON.parse(stored);
        setUser(parsed.state?.user);
      }
    } catch {}
    const timer = setInterval(
      () => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("auth-storage");
    router.push("/login");
  };

  return (
    <header style={{
      height: "64px",
      background: "#161a1e",
      borderBottom: "1px solid #2b3139",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 24px",
      flexShrink: 0,
      position: "sticky",
      top: 0,
      zIndex: 50,
    }}>

      {/* Left */}
      <div>
        <h1 style={{ margin: 0, fontSize: "16px",
          fontWeight: "700", color: "#eaecef" }}>
          {page.title}
        </h1>
        <p style={{ margin: 0, fontSize: "11px",
          color: "#5e6673" }}>{page.desc}</p>
      </div>

      {/* Right */}
      <div style={{ display: "flex", alignItems: "center",
        gap: "12px" }}>

        {/* Time */}
        <div style={{ textAlign: "right",
          display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: "13px", fontWeight: "600",
            color: "#eaecef" }}>
            {time.toLocaleTimeString()}
          </span>
          <span style={{ fontSize: "11px", color: "#5e6673" }}>
            {time.toLocaleDateString("en-US", {
              month: "short", day: "numeric" })}
          </span>
        </div>

        <div style={{ width: "1px", height: "28px",
          background: "#2b3139" }} />

        {/* Live Badge */}
        <div style={{
          display: "flex", alignItems: "center", gap: "6px",
          padding: "5px 10px", borderRadius: "100px",
          background: "rgba(14,203,129,0.1)",
          border: "1px solid rgba(14,203,129,0.2)",
        }}>
          <div style={{ width: "6px", height: "6px",
            borderRadius: "50%", background: "#0ecb81" }} />
          <span style={{ color: "#0ecb81", fontSize: "11px",
            fontWeight: "600" }}>LIVE</span>
        </div>

        {/* Notification */}
        <button style={{
          width: "34px", height: "34px", borderRadius: "8px",
          background: "#1e2329", border: "1px solid #2b3139",
          cursor: "pointer", fontSize: "15px",
          display: "flex", alignItems: "center",
          justifyContent: "center", position: "relative",
          color: "#848e9c",
        }}>
          🔔
          <span style={{
            position: "absolute", top: "5px", right: "5px",
            width: "7px", height: "7px", borderRadius: "50%",
            background: "#f0b90b",
          }} />
        </button>

        {/* User Menu */}
        <div style={{ position: "relative" }}>
          <button
            onClick={() => setShowMenu(!showMenu)}
            style={{
              display: "flex", alignItems: "center",
              gap: "8px", background: "#1e2329",
              border: "1px solid #2b3139",
              borderRadius: "8px", padding: "6px 10px",
              cursor: "pointer",
            }}>
            <div style={{
              width: "26px", height: "26px", borderRadius: "50%",
              background: "linear-gradient(135deg, #f0b90b, #d4a200)",
              display: "flex", alignItems: "center",
              justifyContent: "center", fontWeight: "800",
              fontSize: "12px", color: "#000",
            }}>
              {user?.firstName?.charAt(0) || "U"}
            </div>
            <div style={{ textAlign: "left" }}>
              <p style={{ margin: 0, fontSize: "12px",
                fontWeight: "600", color: "#eaecef" }}>
                {user?.firstName || "User"}
              </p>
              <p style={{ margin: 0, fontSize: "10px",
                color: "#848e9c" }}>
                {user?.role || "TRADER"}
              </p>
            </div>
            <span style={{ color: "#848e9c",
              fontSize: "10px" }}>▾</span>
          </button>

          {showMenu && (
            <div style={{
              position: "absolute", right: 0, top: "46px",
              background: "#161a1e",
              border: "1px solid #2b3139",
              borderRadius: "12px", padding: "8px",
              minWidth: "200px", zIndex: 200,
              boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
            }}>
              <div style={{ padding: "10px 14px",
                borderBottom: "1px solid #2b3139",
                marginBottom: "6px" }}>
                <p style={{ margin: 0, fontSize: "13px",
                  fontWeight: "700", color: "#eaecef" }}>
                  {user?.firstName} {user?.lastName}
                </p>
                <p style={{ margin: 0, fontSize: "11px",
                  color: "#848e9c", marginTop: "2px" }}>
                  {user?.email}
                </p>
              </div>
              {[
                { icon: "💼", label: "Portfolio",
                  href: "/dashboard/portfolio" },
                { icon: "⚡", label: "Trade Now",
                  href: "/dashboard/trading" },
                { icon: "⚙️", label: "Settings",
                  href: "/dashboard/settings" },
                { icon: "❓", label: "Help",
                  href: "/about" },
              ].map((item) => (
                <Link key={item.label} href={item.href}
                  onClick={() => setShowMenu(false)}
                  style={{
                    display: "flex", alignItems: "center",
                    gap: "10px", padding: "9px 14px",
                    borderRadius: "8px", color: "#848e9c",
                    textDecoration: "none", fontSize: "13px",
                    transition: "all 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#1e2329";
                    e.currentTarget.style.color = "#eaecef";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background
                      = "transparent";
                    e.currentTarget.style.color = "#848e9c";
                  }}>
                  {item.icon} {item.label}
                </Link>
              ))}
              <div style={{ height: "1px",
                background: "#2b3139", margin: "6px 0" }} />
              <button onClick={handleLogout} style={{
                display: "flex", alignItems: "center",
                gap: "10px", padding: "9px 14px",
                borderRadius: "8px", color: "#f6465d",
                background: "none", border: "none",
                cursor: "pointer", fontSize: "13px",
                width: "100%", textAlign: "left" as any,
              }}>
                🚪 Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}