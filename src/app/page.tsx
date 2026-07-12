"use client";
import Link from "next/link";
import { useWindowSize } from "src/hooks/useWindowSize";
import Logo from "src/components/Logo";

export default function Home() {
  const { isMobile } = useWindowSize();

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0b0e11",
      color: "#eaecef",
      fontFamily: "Inter, sans-serif",
    }}>

      {/* Navbar */}
      <nav style={{
        display: "flex", justifyContent: "space-between",
        alignItems: "center",
        padding: isMobile ? "0 16px" : "0 48px",
        height: "60px", background: "#161a1e",
        borderBottom: "1px solid #2b3139",
        position: "sticky", top: 0, zIndex: 100,
      }}>
        <Logo size={isMobile ? "sm" : "md"} href="/" />
        <div style={{ display: "flex", gap: "8px",
          alignItems: "center" }}>
          {!isMobile && (
            <Link href="/about" style={{ padding: "8px 16px",
              color: "#848e9c", textDecoration: "none",
              fontSize: "14px" }}>About</Link>
          )}
          <Link href="/login" style={{
            padding: isMobile ? "7px 14px" : "8px 20px",
            borderRadius: "6px", color: "#eaecef",
            textDecoration: "none", fontSize: "14px",
            fontWeight: "600", border: "1px solid #2b3139" }}>
            Login
          </Link>
          <Link href="/register" style={{
            padding: isMobile ? "7px 14px" : "8px 20px",
            borderRadius: "6px", color: "#000",
            textDecoration: "none", fontSize: "14px",
            fontWeight: "700",
            background: "linear-gradient(135deg, #f0b90b, #d4a200)",
          }}>
            {isMobile ? "Join" : "Register"}
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section style={{
        maxWidth: "1200px", margin: "0 auto",
        padding: isMobile ? "40px 16px 32px" : "80px 48px 60px",
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
        gap: isMobile ? "32px" : "60px",
        alignItems: "center",
      }}>
        <div>
          <div style={{
            display: "inline-flex", alignItems: "center",
            gap: "8px", padding: "5px 12px",
            borderRadius: "100px", marginBottom: "16px",
            background: "rgba(240,185,11,0.1)",
            border: "1px solid rgba(240,185,11,0.3)",
          }}>
            <div style={{ width: "5px", height: "5px",
              borderRadius: "50%", background: "#f0b90b" }} />
            <span style={{ color: "#f0b90b", fontSize: "11px",
              fontWeight: "600", letterSpacing: "0.5px" }}>
              LIVE TRADING PLATFORM
            </span>
          </div>

          <h1 style={{
            fontSize: isMobile ? "32px" : "52px",
            fontWeight: "900", lineHeight: 1.1,
            marginBottom: "16px", color: "#eaecef",
          }}>
            Trade Crypto
            <br />
            <span style={{
              background: "linear-gradient(135deg, #f0b90b, #f8d33a)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>with AI Power</span>
          </h1>

          <p style={{ color: "#848e9c",
            fontSize: isMobile ? "14px" : "17px",
            lineHeight: 1.7, marginBottom: "24px" }}>
            PrachinX combines real-time market data with AI
            predictions. Built for traders who demand accuracy,
            speed, and integrity.
          </p>

          <div style={{ display: "flex", gap: "10px",
            flexWrap: "wrap" as any }}>
            <Link href="/register" style={{
              padding: isMobile ? "12px 24px" : "14px 32px",
              borderRadius: "8px", color: "#000",
              textDecoration: "none",
              fontSize: isMobile ? "14px" : "15px",
              fontWeight: "700",
              background: "linear-gradient(135deg, #f0b90b, #d4a200)",
              boxShadow: "0 4px 16px rgba(240,185,11,0.3)",
            }}>
              Start Trading Free
            </Link>
            <Link href="/login" style={{
              padding: isMobile ? "12px 24px" : "14px 32px",
              borderRadius: "8px", color: "#eaecef",
              textDecoration: "none",
              fontSize: isMobile ? "14px" : "15px",
              fontWeight: "600", border: "1px solid #2b3139",
            }}>
              Sign In →
            </Link>
          </div>

          {/* Stats */}
          <div style={{
            display: "flex", gap: isMobile ? "20px" : "32px",
            marginTop: "24px", paddingTop: "24px",
            borderTop: "1px solid #2b3139",
          }}>
            {[
              { value: "10K+", label: "Traders" },
              { value: "$2M+", label: "Volume" },
              { value: "95%", label: "AI Accuracy" },
            ].map((stat) => (
              <div key={stat.label}>
                <p style={{
                  fontSize: isMobile ? "18px" : "22px",
                  fontWeight: "800", color: "#f0b90b",
                  marginBottom: "2px" }}>{stat.value}</p>
                <p style={{ color: "#848e9c",
                  fontSize: "12px" }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Market Preview */}
        <div style={{
          background: "#161a1e",
          border: "1px solid #2b3139",
          borderRadius: "16px", overflow: "hidden",
        }}>
          <div style={{
            padding: "14px 16px",
            borderBottom: "1px solid #2b3139",
            display: "flex", justifyContent: "space-between",
            alignItems: "center", background: "#1e2329",
          }}>
            <span style={{ fontWeight: "700",
              fontSize: "14px" }}>Live Markets</span>
            <div style={{ display: "flex", alignItems: "center",
              gap: "6px" }}>
              <div style={{ width: "6px", height: "6px",
                borderRadius: "50%", background: "#0ecb81" }} />
              <span style={{ color: "#0ecb81",
                fontSize: "11px", fontWeight: "600" }}>LIVE</span>
            </div>
          </div>

          {[
            { symbol: "BTC", price: "67,234", change: "+2.34", up: true },
            { symbol: "ETH", price: "3,521", change: "+1.82", up: true },
            { symbol: "BNB", price: "582", change: "-0.54", up: false },
            { symbol: "SOL", price: "172", change: "+4.21", up: true },
            { symbol: "ADA", price: "0.45", change: "-1.23", up: false },
          ].map((item) => (
            <div key={item.symbol} style={{
              display: "flex", justifyContent: "space-between",
              alignItems: "center",
              padding: isMobile ? "10px 16px" : "12px 16px",
              borderBottom: "1px solid rgba(43,49,57,0.5)",
            }}>
              <div style={{ display: "flex", alignItems: "center",
                gap: "10px" }}>
                <div style={{
                  width: "30px", height: "30px",
                  borderRadius: "50%",
                  background: "rgba(240,185,11,0.15)",
                  display: "flex", alignItems: "center",
                  justifyContent: "center", fontSize: "11px",
                  fontWeight: "800", color: "#f0b90b",
                }}>{item.symbol.charAt(0)}</div>
                <span style={{ fontWeight: "700",
                  fontSize: "13px" }}>{item.symbol}</span>
              </div>
              <span style={{ fontSize: "13px",
                fontWeight: "600" }}>${item.price}</span>
              <span style={{
                padding: "3px 8px", borderRadius: "4px",
                fontSize: "12px", fontWeight: "700",
                background: item.up
                  ? "rgba(14,203,129,0.1)"
                  : "rgba(246,70,93,0.1)",
                color: item.up ? "#0ecb81" : "#f6465d",
              }}>
                {item.up ? "▲" : "▼"} {item.change}%
              </span>
            </div>
          ))}

          <div style={{ padding: "14px 16px",
            background: "#1e2329" }}>
            <Link href="/register" style={{
              display: "block", textAlign: "center",
              padding: "11px", borderRadius: "8px",
              background: "linear-gradient(135deg, #f0b90b, #d4a200)",
              color: "#000", textDecoration: "none",
              fontWeight: "700", fontSize: "14px",
            }}>
              Start Trading Now →
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{
        maxWidth: "1200px", margin: "0 auto",
        padding: isMobile ? "32px 16px" : "60px 48px",
        borderTop: "1px solid #2b3139",
      }}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <h2 style={{
            fontSize: isMobile ? "24px" : "32px",
            fontWeight: "800", marginBottom: "8px" }}>
            Everything You Need
          </h2>
          <p style={{ color: "#848e9c", fontSize: "14px" }}>
            Professional tools for every trader
          </p>
        </div>
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile
            ? "1fr 1fr" : "repeat(4, 1fr)",
          gap: "12px",
        }}>
          {[
            { icon: "🤖", title: "AI Predictions",
              desc: "95% accurate ML predictions",
              color: "240,185,11" },
            { icon: "⚡", title: "Real-time Data",
              desc: "Live Binance feeds",
              color: "14,203,129" },
            { icon: "🔒", title: "Secure",
              desc: "Bank-level security",
              color: "59,130,246" },
            { icon: "📊", title: "Analytics",
              desc: "P&L tracking",
              color: "246,70,93" },
          ].map((f) => (
            <div key={f.title} style={{
              background: "#161a1e",
              border: "1px solid #2b3139",
              borderRadius: "12px",
              padding: isMobile ? "16px" : "20px",
            }}>
              <div style={{
                width: "40px", height: "40px",
                borderRadius: "10px",
                background: `rgba(${f.color},0.1)`,
                display: "flex", alignItems: "center",
                justifyContent: "center", fontSize: "18px",
                marginBottom: "10px",
              }}>{f.icon}</div>
              <h3 style={{
                fontSize: isMobile ? "13px" : "15px",
                fontWeight: "700", marginBottom: "4px" }}>
                {f.title}
              </h3>
              <p style={{ color: "#848e9c",
                fontSize: isMobile ? "11px" : "13px",
                lineHeight: 1.5 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{
        maxWidth: "1200px", margin: "0 auto 40px",
        padding: isMobile ? "0 16px" : "0 48px",
      }}>
        <div style={{
          background: "#161a1e",
          border: "1px solid rgba(240,185,11,0.2)",
          borderRadius: "16px",
          padding: isMobile ? "28px 20px" : "40px 60px",
          textAlign: "center",
        }}>
          <h2 style={{
            fontSize: isMobile ? "20px" : "28px",
            fontWeight: "800", marginBottom: "8px" }}>
            Ready to Trade?
          </h2>
          <p style={{ color: "#848e9c",
            fontSize: isMobile ? "13px" : "15px",
            marginBottom: "20px" }}>
            Join 10,000+ traders on PrachinX
          </p>
          <Link href="/register" style={{
            display: "inline-block",
            padding: isMobile ? "12px 28px" : "14px 40px",
            borderRadius: "8px", color: "#000",
            textDecoration: "none",
            fontSize: isMobile ? "14px" : "15px",
            fontWeight: "700",
            background: "linear-gradient(135deg, #f0b90b, #d4a200)",
            boxShadow: "0 4px 16px rgba(240,185,11,0.3)",
          }}>
            Create Free Account →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: "1px solid #2b3139",
        padding: isMobile ? "20px 16px" : "24px 48px",
        background: "#161a1e",
      }}>
        <div style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between",
          alignItems: isMobile ? "flex-start" : "center",
          gap: isMobile ? "12px" : "0",
        }}>
          <div>
            <Logo size="sm" />
            <p style={{ color: "#5e6673", fontSize: "12px",
              marginTop: "6px" }}>
              © 2026 PrachinX. Trading With Integrity.
            </p>
          </div>
          <div style={{ display: "flex",
            gap: isMobile ? "16px" : "24px",
            flexWrap: "wrap" as any }}>
            {[
              { label: "About", href: "/about" },
              { label: "Contact",
                href: "mailto:prachinx03@gmail.com" },
              { label: "Twitter",
                href: "https://twitter.com/PrachinX" },
              { label: "Instagram",
                href: "https://instagram.com/prachinx" },
            ].map((item) => (
              <a key={item.label} href={item.href}
                style={{ color: "#848e9c",
                  textDecoration: "none", fontSize: "13px" }}>
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
