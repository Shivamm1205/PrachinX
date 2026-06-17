"use client";
import Logo from "../logo";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const navItems = [
  { href: "/dashboard/overview", label: "Overview",
    icon: "📊", desc: "Dashboard" },
  { href: "/dashboard/markets", label: "Markets",
    icon: "📈", desc: "Live prices" },
  { href: "/dashboard/trading", label: "Trading",
    icon: "⚡", desc: "Buy & Sell" },
  { href: "/dashboard/portfolio", label: "Portfolio",
    icon: "💼", desc: "My assets" },
  { href: "/dashboard/ai-predictions", label: "AI",
    icon: "🤖", desc: "Predictions" },
  { href: "/dashboard/settings", label: "Settings",
    icon: "⚙️", desc: "Account" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("auth-storage");
      if (stored) {
        const parsed = JSON.parse(stored);
        setUser(parsed.state?.user);
      }
    } catch {}
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("auth-storage");
    router.push("/login");
  };

  return (
    <aside style={{
      width: collapsed ? "68px" : "230px",
      minHeight: "100vh",
      background: "#161a1e",
      borderRight: "1px solid #2b3139",
      display: "flex",
      flexDirection: "column",
      transition: "width 0.25s ease",
      flexShrink: 0,
      overflow: "hidden",
    }}>

      {/* Logo */}
      <div style={{
        height: "64px",
        display: "flex",
        alignItems: "center",
        justifyContent: collapsed ? "center" : "space-between",
        padding: collapsed ? "0" : "0 16px",
        borderBottom: "1px solid #2b3139",
        flexShrink: 0,
      }}>
        {!collapsed && (
  <Logo size="sm" href="/dashboard/overview" />
)}
        <button
          onClick={() => setCollapsed(!collapsed)}
          style={{
            background: "none", border: "none",
            cursor: "pointer", color: "#848e9c",
            fontSize: "14px", padding: "6px",
            borderRadius: "6px", display: "flex",
            alignItems: "center", justifyContent: "center",
            transition: "all 0.2s",
          }}>
          {collapsed ? "▶" : "◀"}
        </button>
      </div>

      {/* User Info */}
      {!collapsed && (
        <div style={{
          padding: "16px",
          borderBottom: "1px solid #2b3139",
          display: "flex", alignItems: "center", gap: "10px",
        }}>
          <div style={{
            width: "36px", height: "36px", borderRadius: "50%",
            background: "linear-gradient(135deg, #f0b90b, #d4a200)",
            display: "flex", alignItems: "center",
            justifyContent: "center", fontWeight: "800",
            fontSize: "15px", color: "#000", flexShrink: 0,
          }}>
            {user?.firstName?.charAt(0) || "U"}
          </div>
          <div style={{ overflow: "hidden" }}>
            <p style={{ margin: 0, fontSize: "13px",
              fontWeight: "700", color: "#eaecef",
              whiteSpace: "nowrap", overflow: "hidden",
              textOverflow: "ellipsis" }}>
              {user?.firstName} {user?.lastName}
            </p>
            <p style={{ margin: 0, fontSize: "11px",
              color: "#848e9c" }}>
              {user?.role || "TRADER"}
            </p>
          </div>
        </div>
      )}

      {/* Nav Items */}
      <nav style={{ flex: 1, padding: "10px 8px",
        overflowY: "auto" }}>
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: collapsed ? "0" : "12px",
                padding: collapsed ? "12px 0" : "10px 12px",
                borderRadius: "8px",
                marginBottom: "2px",
                textDecoration: "none",
                transition: "all 0.15s",
                background: active
                  ? "rgba(240,185,11,0.1)" : "transparent",
                border: active
                  ? "1px solid rgba(240,185,11,0.2)"
                  : "1px solid transparent",
                justifyContent: collapsed
                  ? "center" : "flex-start",
              }}>
              <span style={{ fontSize: "18px", flexShrink: 0 }}>
                {item.icon}
              </span>
              {!collapsed && (
                <div>
                  <p style={{ margin: 0, fontSize: "13px",
                    fontWeight: "600",
                    color: active ? "#f0b90b" : "#eaecef" }}>
                    {item.label}
                  </p>
                  <p style={{ margin: 0, fontSize: "11px",
                    color: "#5e6673" }}>
                    {item.desc}
                  </p>
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div style={{ padding: "10px 8px",
        borderTop: "1px solid #2b3139" }}>
        <button
          onClick={handleLogout}
          style={{
            display: "flex", alignItems: "center",
            gap: collapsed ? "0" : "12px",
            padding: collapsed ? "12px 0" : "10px 12px",
            borderRadius: "8px", background: "none",
            border: "1px solid transparent",
            cursor: "pointer", width: "100%",
            justifyContent: collapsed ? "center" : "flex-start",
            transition: "all 0.15s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background
              = "rgba(246,70,93,0.1)";
            e.currentTarget.style.borderColor
              = "rgba(246,70,93,0.2)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "none";
            e.currentTarget.style.borderColor = "transparent";
          }}>
          <span style={{ fontSize: "18px" }}>🚪</span>
          {!collapsed && (
            <span style={{ fontSize: "13px", fontWeight: "600",
              color: "#f6465d" }}>
              Logout
            </span>
          )}
        </button>
      </div>
    </aside>
  );
}