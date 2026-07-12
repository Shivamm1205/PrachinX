"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Logo from "../Logo";
import { useWindowSize } from "../../hooks/useWindowSize";

const navItems = [
  { href: "/dashboard/overview", label: "Overview", icon: "📊" },
  { href: "/dashboard/markets", label: "Markets", icon: "📈" },
  { href: "/dashboard/trading", label: "Trading", icon: "⚡" },
  { href: "/dashboard/portfolio", label: "Portfolio", icon: "💼" },
  { href: "/dashboard/ai-predictions", label: "AI", icon: "🤖" },
  { href: "/dashboard/settings", label: "Settings", icon: "⚙️" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { isMobile } = useWindowSize();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
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

  useEffect(() => {
    if (isMobile) setCollapsed(true);
    else setMobileOpen(false);
  }, [isMobile]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("auth-storage");
    router.push("/login");
  };

  // Mobile Bottom Nav
  if (isMobile) {
    return (
      <>
        {/* Mobile Top Bar */}
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0,
          height: "56px", background: "#161a1e",
          borderBottom: "1px solid #2b3139",
          display: "flex", alignItems: "center",
          justifyContent: "space-between",
          padding: "0 16px", zIndex: 100,
        }}>
          <Logo size="sm" href="/dashboard/overview" />
          <div style={{ display: "flex", alignItems: "center",
            gap: "10px" }}>
            <div style={{ display: "flex", alignItems: "center",
              gap: "4px", padding: "4px 8px",
              borderRadius: "100px",
              background: "rgba(14,203,129,0.1)",
              border: "1px solid rgba(14,203,129,0.2)" }}>
              <div style={{ width: "5px", height: "5px",
                borderRadius: "50%", background: "#0ecb81" }} />
              <span style={{ color: "#0ecb81", fontSize: "10px",
                fontWeight: "600" }}>LIVE</span>
            </div>
            <div style={{
              width: "30px", height: "30px", borderRadius: "50%",
              background: "linear-gradient(135deg, #f0b90b, #d4a200)",
              display: "flex", alignItems: "center",
              justifyContent: "center", fontWeight: "800",
              fontSize: "13px", color: "#000",
            }}>
              {user?.firstName?.charAt(0) || "U"}
            </div>
          </div>
        </div>

        {/* Mobile Bottom Navigation */}
        <div style={{
          position: "fixed", bottom: 0, left: 0, right: 0,
          height: "60px", background: "#161a1e",
          borderTop: "1px solid #2b3139",
          display: "flex", alignItems: "center",
          justifyContent: "space-around",
          zIndex: 100, paddingBottom: "4px",
        }}>
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} style={{
                display: "flex", flexDirection: "column",
                alignItems: "center", gap: "2px",
                textDecoration: "none", padding: "4px 8px",
                borderRadius: "8px", minWidth: "44px",
                background: active
                  ? "rgba(240,185,11,0.1)" : "transparent",
              }}>
                <span style={{ fontSize: "18px" }}>
                  {item.icon}
                </span>
                <span style={{
                  fontSize: "9px", fontWeight: "600",
                  color: active ? "#f0b90b" : "#5e6673",
                }}>
                  {item.label}
                </span>
              </Link>
            );
          })}
          <button onClick={handleLogout} style={{
            display: "flex", flexDirection: "column",
            alignItems: "center", gap: "2px",
            background: "none", border: "none",
            cursor: "pointer", padding: "4px 8px",
            minWidth: "44px",
          }}>
            <span style={{ fontSize: "18px" }}>🚪</span>
            <span style={{ fontSize: "9px", fontWeight: "600",
              color: "#f6465d" }}>Out</span>
          </button>
        </div>

        {/* Spacer for content */}
        <div style={{ width: 0 }} />
      </>
    );
  }

  // Desktop Sidebar
  return (
    <aside style={{
      width: collapsed ? "68px" : "220px",
      minHeight: "100vh",
      background: "#161a1e",
      borderRight: "1px solid #2b3139",
      display: "flex", flexDirection: "column",
      transition: "width 0.25s ease",
      flexShrink: 0, overflow: "hidden",
    }}>
      {/* Logo */}
      <div style={{
        height: "64px", display: "flex",
        alignItems: "center",
        justifyContent: collapsed ? "center" : "space-between",
        padding: collapsed ? "0" : "0 16px",
        borderBottom: "1px solid #2b3139", flexShrink: 0,
      }}>
        {!collapsed && <Logo size="sm"
          href="/dashboard/overview" />}
        <button onClick={() => setCollapsed(!collapsed)}
          style={{ background: "none", border: "none",
            cursor: "pointer", color: "#848e9c",
            fontSize: "14px", padding: "6px",
            borderRadius: "6px" }}>
          {collapsed ? "▶" : "◀"}
        </button>
      </div>

      {/* User */}
      {!collapsed && (
        <div style={{ padding: "14px 16px",
          borderBottom: "1px solid #2b3139",
          display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            width: "34px", height: "34px", borderRadius: "50%",
            background: "linear-gradient(135deg, #f0b90b, #d4a200)",
            display: "flex", alignItems: "center",
            justifyContent: "center", fontWeight: "800",
            fontSize: "14px", color: "#000", flexShrink: 0,
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

      {/* Nav */}
      <nav style={{ flex: 1, padding: "10px 8px",
        overflowY: "auto" }}>
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} style={{
              display: "flex", alignItems: "center",
              gap: collapsed ? "0" : "10px",
              padding: collapsed ? "12px 0" : "10px 12px",
              borderRadius: "8px", marginBottom: "2px",
              textDecoration: "none", transition: "all 0.15s",
              background: active
                ? "rgba(240,185,11,0.1)" : "transparent",
              border: active
                ? "1px solid rgba(240,185,11,0.2)"
                : "1px solid transparent",
              justifyContent: collapsed ? "center" : "flex-start",
            }}>
              <span style={{ fontSize: "18px",
                flexShrink: 0 }}>{item.icon}</span>
              {!collapsed && (
                <span style={{ fontSize: "13px",
                  fontWeight: "600",
                  color: active ? "#f0b90b" : "#eaecef" }}>
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div style={{ padding: "10px 8px",
        borderTop: "1px solid #2b3139" }}>
        <button onClick={handleLogout} style={{
          display: "flex", alignItems: "center",
          gap: collapsed ? "0" : "10px",
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
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "none";
        }}>
          <span style={{ fontSize: "18px" }}>🚪</span>
          {!collapsed && (
            <span style={{ fontSize: "13px", fontWeight: "600",
              color: "#f6465d" }}>Logout</span>
          )}
        </button>
      </div>
    </aside>
  );
}