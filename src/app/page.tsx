"use client";
import Link from "next/link";
import Logo from "../components/logo";
export default function Home() {
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
        alignItems: "center", padding: "0 48px",
        height: "64px", background: "#161a1e",
        borderBottom: "1px solid #2b3139",
        position: "sticky", top: 0, zIndex: 100,
      }}>
        {/* Logo Text */}
       <Logo size="md" href="/" />
        {/* Right Side */}
        <div style={{ display: "flex", gap: "12px",
          alignItems: "center" }}>
          <Link href="/about" style={{
            padding: "8px 20px", borderRadius: "6px",
            color: "#848e9c", textDecoration: "none",
            fontSize: "14px", fontWeight: "500",
            border: "1px solid transparent",
            transition: "all 0.2s",
          }}>About</Link>
          <Link href="/login" style={{
            padding: "8px 20px", borderRadius: "6px",
            color: "#eaecef", textDecoration: "none",
            fontSize: "14px", fontWeight: "600",
            border: "1px solid #2b3139",
            background: "transparent",
          }}>Log In</Link>
          <Link href="/register" style={{
            padding: "8px 20px", borderRadius: "6px",
            color: "#000", textDecoration: "none",
            fontSize: "14px", fontWeight: "700",
            background: "linear-gradient(135deg, #f0b90b, #d4a200)",
            boxShadow: "0 4px 12px rgba(240,185,11,0.3)",
          }}>Register</Link>
        </div>
      </nav>

      {/* Hero */}
      <section style={{
        maxWidth: "1200px", margin: "0 auto",
        padding: "80px 48px 60px",
        display: "grid", gridTemplateColumns: "1fr 1fr",
        gap: "60px", alignItems: "center",
      }}>
        {/* Left */}
        <div>
          <div style={{
            display: "inline-flex", alignItems: "center",
            gap: "8px", padding: "6px 14px",
            borderRadius: "100px", marginBottom: "24px",
            background: "rgba(240,185,11,0.1)",
            border: "1px solid rgba(240,185,11,0.3)",
          }}>
            <div style={{ width: "6px", height: "6px",
              borderRadius: "50%", background: "#f0b90b" }} />
            <span style={{ color: "#f0b90b", fontSize: "12px",
              fontWeight: "600", letterSpacing: "0.5px" }}>
              LIVE TRADING PLATFORM
            </span>
          </div>

          <h1 style={{
            fontSize: "52px", fontWeight: "900",
            lineHeight: 1.1, marginBottom: "20px",
            color: "#eaecef",
          }}>
            Trade Crypto
            <br />
            <span style={{
              background: "linear-gradient(135deg, #f0b90b, #f8d33a)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>with AI Power</span>
          </h1>

          <p style={{
            color: "#848e9c", fontSize: "17px",
            lineHeight: 1.7, marginBottom: "36px",
          }}>
            PrachinX combines real-time market data with advanced
            AI predictions. Built for traders who demand accuracy,
            speed, and integrity.
          </p>

          <div style={{ display: "flex", gap: "12px",
            marginBottom: "40px" }}>
            <Link href="/register" style={{
              padding: "14px 32px", borderRadius: "8px",
              color: "#000", textDecoration: "none",
              fontSize: "15px", fontWeight: "700",
              background: "linear-gradient(135deg, #f0b90b, #d4a200)",
              boxShadow: "0 8px 24px rgba(240,185,11,0.3)",
            }}>
              Start Trading Free
            </Link>
            <Link href="/login" style={{
              padding: "14px 32px", borderRadius: "8px",
              color: "#eaecef", textDecoration: "none",
              fontSize: "15px", fontWeight: "600",
              border: "1px solid #2b3139",
            }}>
              Sign In →
            </Link>
          </div>

          {/* Stats */}
          <div style={{ display: "flex", gap: "32px",
            paddingTop: "32px",
            borderTop: "1px solid #2b3139" }}>
            {[
              { value: "0", label: "Active Traders" },
              { value: "0", label: "Volume Traded" },
              { value: "95%", label: "AI Accuracy" },
            ].map((stat) => (
              <div key={stat.label}>
                <p style={{ fontSize: "22px", fontWeight: "800",
                  color: "#f0b90b", marginBottom: "2px" }}>
                  {stat.value}
                </p>
                <p style={{ color: "#848e9c", fontSize: "13px" }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right - Market Preview */}
        <div style={{
          background: "#161a1e",
          border: "1px solid #2b3139",
          borderRadius: "16px", overflow: "hidden",
          boxShadow: "0 24px 48px rgba(0,0,0,0.4)",
        }}>
          {/* Header */}
          <div style={{
            padding: "16px 20px",
            borderBottom: "1px solid #2b3139",
            display: "flex", justifyContent: "space-between",
            alignItems: "center",
            background: "#1e2329",
          }}>
            <div style={{ display: "flex", gap: "20px" }}>
              {["Spot", "Futures", "Options"].map((tab, i) => (
                <span key={tab} style={{
                  fontSize: "14px", fontWeight: "600",
                  color: i === 0 ? "#f0b90b" : "#848e9c",
                  paddingBottom: "2px",
                  borderBottom: i === 0
                    ? "2px solid #f0b90b" : "none",
                  cursor: "pointer",
                }}>
                  {tab}
                </span>
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "center",
              gap: "6px" }}>
              <div style={{ width: "6px", height: "6px",
                borderRadius: "50%", background: "#0ecb81" }} />
              <span style={{ color: "#0ecb81", fontSize: "12px",
                fontWeight: "600" }}>LIVE</span>
            </div>
          </div>

          {/* Table Header */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            padding: "10px 20px",
            borderBottom: "1px solid #2b3139",
          }}>
            {["Name", "Price", "24h Change"].map((h) => (
              <span key={h} style={{ color: "#848e9c",
                fontSize: "12px", fontWeight: "600",
                textTransform: "uppercase" as any,
                letterSpacing: "0.5px" }}>{h}</span>
            ))}
          </div>

          {/* Market Rows */}
          {[
            { symbol: "BTC", name: "Bitcoin",
              price: "67,234.50", change: "+2.34", up: true },
            { symbol: "ETH", name: "Ethereum",
              price: "3,521.80", change: "+1.82", up: true },
            { symbol: "BNB", name: "BNB",
              price: "582.40", change: "-0.54", up: false },
            { symbol: "SOL", name: "Solana",
              price: "172.30", change: "+4.21", up: true },
            { symbol: "ADA", name: "Cardano",
              price: "0.4521", change: "-1.23", up: false },
            { symbol: "DOT", name: "Polkadot",
              price: "7.82", change: "+0.91", up: true },
          ].map((item) => (
            <div key={item.symbol} style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              padding: "14px 20px",
              borderBottom: "1px solid rgba(43,49,57,0.5)",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "#1e2329")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "transparent")}>
              <div style={{ display: "flex", alignItems: "center",
                gap: "10px" }}>
                <div style={{
                  width: "32px", height: "32px", borderRadius: "50%",
                  background: "rgba(240,185,11,0.15)",
                  display: "flex", alignItems: "center",
                  justifyContent: "center", fontSize: "12px",
                  fontWeight: "800", color: "#f0b90b",
                }}>
                  {item.symbol.charAt(0)}
                </div>
                <div>
                  <p style={{ fontWeight: "700", fontSize: "14px",
                    margin: 0 }}>{item.symbol}</p>
                  <p style={{ color: "#848e9c", fontSize: "12px",
                    margin: 0 }}>{item.name}</p>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <span style={{ fontWeight: "700", fontSize: "14px" }}>
                  ${item.price}
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <span style={{
                  padding: "4px 8px", borderRadius: "4px",
                  fontSize: "13px", fontWeight: "700",
                  background: item.up
                    ? "rgba(14,203,129,0.1)"
                    : "rgba(246,70,93,0.1)",
                  color: item.up ? "#0ecb81" : "#f6465d",
                }}>
                  {item.up ? "▲" : "▼"} {item.change}%
                </span>
              </div>
            </div>
          ))}

          {/* CTA */}
          <div style={{ padding: "16px 20px",
            background: "#1e2329" }}>
            <Link href="/register" style={{
              display: "block", textAlign: "center",
              padding: "12px", borderRadius: "8px",
              background: "linear-gradient(135deg, #f0b90b, #d4a200)",
              color: "#000", textDecoration: "none",
              fontWeight: "700", fontSize: "14px",
              boxShadow: "0 4px 12px rgba(240,185,11,0.2)",
            }}>
              Start Trading Now →
            </Link>
          </div>
        </div>
      </section>

      {/* Ticker Bar */}
      <div style={{
        background: "#161a1e",
        borderTop: "1px solid #2b3139",
        borderBottom: "1px solid #2b3139",
        padding: "12px 48px",
        display: "flex", gap: "40px",
        overflowX: "auto" as any,
      }}>
        {[
          { symbol: "BTC/USDT", price: "67,234", change: "+2.34%" },
          { symbol: "ETH/USDT", price: "3,521", change: "+1.82%" },
          { symbol: "BNB/USDT", price: "582", change: "-0.54%" },
          { symbol: "SOL/USDT", price: "172", change: "+4.21%" },
          { symbol: "ADA/USDT", price: "0.45", change: "-1.23%" },
          { symbol: "DOT/USDT", price: "7.82", change: "+0.91%" },
          { symbol: "MATIC/USDT", price: "0.87", change: "+2.11%" },
        ].map((item) => (
          <div key={item.symbol} style={{
            display: "flex", gap: "8px", alignItems: "center",
            flexShrink: 0,
          }}>
            <span style={{ color: "#eaecef", fontSize: "13px",
              fontWeight: "600" }}>{item.symbol}</span>
            <span style={{ color: "#848e9c",
              fontSize: "13px" }}>${item.price}</span>
            <span style={{
              fontSize: "12px", fontWeight: "600",
              color: item.change.startsWith("+")
                ? "#0ecb81" : "#f6465d",
            }}>{item.change}</span>
          </div>
        ))}
      </div>

      {/* Features */}
      <section style={{
        maxWidth: "1200px", margin: "0 auto",
        padding: "60px 48px",
      }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <h2 style={{ fontSize: "32px", fontWeight: "800",
            marginBottom: "12px", color: "#eaecef" }}>
            Everything You Need to Trade
          </h2>
          <p style={{ color: "#848e9c", fontSize: "16px" }}>
            Professional-grade tools for every trader
          </p>
        </div>

        <div style={{ display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
          {[
            { icon: "🤖", title: "AI Predictions",
              desc: "95% accurate ML price predictions",
              color: "240,185,11" },
            { icon: "⚡", title: "Real-time Data",
              desc: "Live feeds from Binance every second",
              color: "14,203,129" },
            { icon: "🔒", title: "Secure Trading",
              desc: "JWT auth with bank-level encryption",
              color: "139,92,246" },
            { icon: "📊", title: "Portfolio Track",
              desc: "Full P&L analytics and reporting",
              color: "246,70,93" },
          ].map((f) => (
            <div key={f.title} style={{
              background: "#161a1e",
              border: "1px solid #2b3139",
              borderRadius: "12px", padding: "24px",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor
                = "#f0b90b";
              (e.currentTarget as HTMLDivElement).style.transform
                = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor
                = "#2b3139";
              (e.currentTarget as HTMLDivElement).style.transform
                = "translateY(0)";
            }}>
              <div style={{
                width: "48px", height: "48px", borderRadius: "10px",
                background: `rgba(${f.color},0.15)`,
                display: "flex", alignItems: "center",
                justifyContent: "center", fontSize: "22px",
                marginBottom: "16px",
              }}>
                {f.icon}
              </div>
              <h3 style={{ fontSize: "16px", fontWeight: "700",
                marginBottom: "8px", color: "#eaecef" }}>
                {f.title}
              </h3>
              <p style={{ color: "#848e9c", fontSize: "14px",
                lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{
        maxWidth: "1200px", margin: "0 auto 60px",
        padding: "0 48px",
      }}>
        <div style={{
          background: "linear-gradient(135deg, #1a1f2e, #161a1e)",
          border: "1px solid rgba(240,185,11,0.2)",
          borderRadius: "16px", padding: "48px 60px",
          display: "flex", justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 0 60px rgba(240,185,11,0.05)",
        }}>
          <div>
            <h2 style={{ fontSize: "28px", fontWeight: "800",
              marginBottom: "8px", color: "#eaecef" }}>
              Ready to Start Trading?
            </h2>
            <p style={{ color: "#848e9c", fontSize: "15px" }}>
              Join 10,000+ traders on PrachinX today
            </p>
          </div>
          <Link href="/register" style={{
            padding: "14px 40px", borderRadius: "8px",
            color: "#000", textDecoration: "none",
            fontSize: "15px", fontWeight: "700",
            background: "linear-gradient(135deg, #f0b90b, #d4a200)",
            boxShadow: "0 8px 24px rgba(240,185,11,0.3)",
            whiteSpace: "nowrap" as any,
          }}>
            Create Free Account →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: "1px solid #2b3139",
        padding: "32px 48px",
        display: "flex", justifyContent: "space-between",
        alignItems: "center", background: "#161a1e",
      }}>
        <div>
          <div style={{ display: "flex", alignItems: "center",
            gap: "8px", marginBottom: "6px" }}>
            <div style={{
              width: "28px", height: "28px", borderRadius: "6px",
              background: "linear-gradient(135deg, #f0b90b, #d4a200)",
              display: "flex", alignItems: "center",
              justifyContent: "center", fontWeight: "900",
              fontSize: "14px", color: "#000",
            }}>P</div>
            <span style={{ fontWeight: "800", color: "#eaecef",
              fontSize: "16px" }}>
              PRACHIN<span style={{
                background: "linear-gradient(135deg, #f0b90b, #d4a200)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>X</span>
            </span>
          </div>
          <p style={{ color: "#5e6673", fontSize: "13px" }}>
            © 2026 PrachinX. Trading With Integrity.
          </p>
        </div>
        <div style={{ display: "flex", gap: "24px" }}>
          {[
            { label: "About", href: "/about" },
            { label: "Contact",
              href: "mailto:prachinx03@gmail.com" },
            { label: "Twitter",
              href: "https://twitter.com/PrachinX" },
            { label: "Instagram",
              href: "https://instagram.com/prachinx" },
          ].map((item) => (
            <a key={item.label} href={item.href} style={{
              color: "#848e9c", textDecoration: "none",
              fontSize: "13px", transition: "color 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "#f0b90b")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "#848e9c")}>
              {item.label}
            </a>
          ))}
        </div>
      </footer>

    </div>
  );
}