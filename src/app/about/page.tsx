"use client";
import Link from "next/link";
import Logo from "../../components/logo";

export default function AboutPage() {
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
        <Logo size="md" href="/" />
        <div style={{ display: "flex", gap: "8px",
          alignItems: "center" }}>
          <Link href="/" style={{ padding: "8px 16px",
            color: "#848e9c", textDecoration: "none",
            fontSize: "14px", fontWeight: "500" }}>
            Home
          </Link>
          <Link href="/login" style={{
            padding: "8px 20px", borderRadius: "6px",
            color: "#eaecef", textDecoration: "none",
            fontSize: "14px", fontWeight: "600",
            border: "1px solid #2b3139" }}>
            Login
          </Link>
          <Link href="/register" style={{
            padding: "8px 20px", borderRadius: "6px",
            color: "#000", textDecoration: "none",
            fontSize: "14px", fontWeight: "700",
            background: "linear-gradient(135deg, #f0b90b, #d4a200)",
            boxShadow: "0 4px 12px rgba(240,185,11,0.2)" }}>
            Register
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section style={{
        maxWidth: "1100px", margin: "0 auto",
        padding: "80px 48px 60px",
        display: "grid", gridTemplateColumns: "1fr 1fr",
        gap: "60px", alignItems: "center",
      }}>
        <div>
          <div style={{
            display: "inline-flex", alignItems: "center",
            gap: "8px", padding: "5px 12px",
            borderRadius: "100px", marginBottom: "20px",
            background: "rgba(240,185,11,0.1)",
            border: "1px solid rgba(240,185,11,0.3)",
          }}>
            <div style={{ width: "5px", height: "5px",
              borderRadius: "50%", background: "#f0b90b" }} />
            <span style={{ color: "#f0b90b", fontSize: "12px",
              fontWeight: "600", letterSpacing: "0.5px" }}>
              ABOUT PRACHINX
            </span>
          </div>
          <h1 style={{ fontSize: "48px", fontWeight: "900",
            lineHeight: 1.1, marginBottom: "20px" }}>
            Trading With
            <br />
            <span style={{
              background: "linear-gradient(135deg, #f0b90b, #f8d33a)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>Integrity</span>
          </h1>
          <p style={{ color: "#848e9c", fontSize: "16px",
            lineHeight: 1.8, marginBottom: "32px" }}>
            PrachinX is a next-generation AI-powered cryptocurrency
            trading platform. We combine real-time market data,
            machine learning predictions, and professional tools
            to give every trader the edge they deserve.
          </p>
          <div style={{ display: "flex", gap: "12px" }}>
            <Link href="/register" style={{
              padding: "12px 28px", borderRadius: "8px",
              color: "#000", textDecoration: "none",
              fontSize: "14px", fontWeight: "700",
              background: "linear-gradient(135deg, #f0b90b, #d4a200)",
              boxShadow: "0 4px 16px rgba(240,185,11,0.3)" }}>
              Get Started Free
            </Link>
            <a href="mailto:prachinx03@gmail.com" style={{
              padding: "12px 28px", borderRadius: "8px",
              color: "#eaecef", textDecoration: "none",
              fontSize: "14px", fontWeight: "600",
              border: "1px solid #2b3139" }}>
              Contact Us
            </a>
          </div>
        </div>

        {/* Stats */}
        <div style={{ background: "#161a1e",
          border: "1px solid #2b3139",
          borderRadius: "16px", padding: "32px" }}>
          <h3 style={{ fontSize: "13px", fontWeight: "700",
            marginBottom: "20px", color: "#848e9c",
            textTransform: "uppercase" as any,
            letterSpacing: "1px" }}>
            Platform Stats
          </h3>
          {[
            { value: "0", label: "Active Traders",
              color: "#f0b90b" },
            { value: "$0", label: "Volume Traded",
              color: "#0ecb81" },
            { value: "95%", label: "AI Prediction Accuracy",
              color: "#3b82f6" },
            { value: "24/7", label: "Market Monitoring",
              color: "#8b5cf6" },
          ].map((stat) => (
            <div key={stat.label} style={{
              display: "flex", justifyContent: "space-between",
              alignItems: "center", padding: "16px 0",
              borderBottom: "1px solid #2b3139",
            }}>
              <span style={{ color: "#848e9c",
                fontSize: "14px" }}>{stat.label}</span>
              <span style={{ fontSize: "20px",
                fontWeight: "800", color: stat.color }}>
                {stat.value}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section style={{ background: "#161a1e",
        borderTop: "1px solid #2b3139",
        borderBottom: "1px solid #2b3139",
        padding: "60px 48px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center",
            marginBottom: "40px" }}>
            <h2 style={{ fontSize: "32px", fontWeight: "800",
              marginBottom: "8px" }}>
              Why Traders Choose PrachinX
            </h2>
            <p style={{ color: "#848e9c", fontSize: "15px" }}>
              Professional-grade tools for every level
            </p>
          </div>
          <div style={{ display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
            {[
              { icon: "🤖", title: "AI Predictions",
                desc: "ML models deliver 95% accurate price movement predictions updated in real-time.",
                color: "240,185,11" },
              { icon: "⚡", title: "Real-time Data",
                desc: "Live feeds from Binance and major exchanges updated every second.",
                color: "14,203,129" },
              { icon: "🔒", title: "Bank Security",
                desc: "JWT authentication with enterprise encryption keeps your funds safe.",
                color: "59,130,246" },
              { icon: "🤖", title: "Trading Bots",
                desc: "Automated strategies running 24/7 so you never miss an opportunity.",
                color: "139,92,246" },
              { icon: "📊", title: "Portfolio Analytics",
                desc: "Real P&L tracking, performance reports and portfolio management.",
                color: "246,70,93" },
              { icon: "🤝", title: "Copy Trading",
                desc: "Follow and copy top traders automatically to earn while you learn.",
                color: "240,185,11" },
            ].map((f) => (
              <div key={f.title} style={{
                background: "#0b0e11",
                border: "1px solid #2b3139",
                borderRadius: "12px", padding: "24px",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement)
                  .style.borderColor = `rgba(${f.color},0.5)`;
                (e.currentTarget as HTMLDivElement)
                  .style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement)
                  .style.borderColor = "#2b3139";
                (e.currentTarget as HTMLDivElement)
                  .style.transform = "translateY(0)";
              }}>
                <div style={{
                  width: "44px", height: "44px",
                  borderRadius: "10px",
                  background: `rgba(${f.color},0.1)`,
                  border: `1px solid rgba(${f.color},0.2)`,
                  display: "flex", alignItems: "center",
                  justifyContent: "center", fontSize: "20px",
                  marginBottom: "14px",
                }}>
                  {f.icon}
                </div>
                <h3 style={{ fontSize: "15px", fontWeight: "700",
                  marginBottom: "8px" }}>{f.title}</h3>
                <p style={{ color: "#848e9c", fontSize: "13px",
                  lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section style={{ maxWidth: "1100px", margin: "0 auto",
        padding: "60px 48px" }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h2 style={{ fontSize: "32px", fontWeight: "800",
            marginBottom: "8px" }}>Meet the Team</h2>
          <p style={{ color: "#848e9c", fontSize: "15px" }}>
            The people behind PrachinX
          </p>
        </div>
        <div style={{ display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
          {[
            { name: "Shivam Mishra", role: "Founder & CEO",
              desc: "Java developer and AI enthusiast building the future of trading technology.",
              letter: "SM", color: "#f0b90b" },
            { name: "AI Team", role: "Machine Learning",
              desc: "Expert engineers building predictive models for crypto market analysis.",
              letter: "A", color: "#0ecb81" },
            { name: "Dev Team", role: "Engineering",
              desc: "Full-stack team building scalable and secure trading infrastructure.",
              letter: "D", color: "#3b82f6" },
          ].map((m) => (
            <div key={m.name} style={{
              background: "#161a1e",
              border: "1px solid #2b3139",
              borderRadius: "12px", padding: "28px",
              textAlign: "center",
            }}>
              <div style={{
                width: "64px", height: "64px",
                borderRadius: "50%",
                background: `linear-gradient(135deg, ${m.color}, ${m.color}88)`,
                display: "flex", alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
                fontSize: "24px", fontWeight: "800",
                color: "#000",
              }}>
                {m.letter}
              </div>
              <h3 style={{ fontSize: "17px", fontWeight: "700",
                marginBottom: "4px" }}>{m.name}</h3>
              <p style={{ color: m.color, fontSize: "12px",
                fontWeight: "600", marginBottom: "10px",
                textTransform: "uppercase" as any,
                letterSpacing: "0.5px" }}>{m.role}</p>
              <p style={{ color: "#848e9c", fontSize: "13px",
                lineHeight: 1.6, margin: 0 }}>{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section style={{ background: "#161a1e",
        borderTop: "1px solid #2b3139" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto",
          padding: "60px 48px" }}>
          <div style={{ display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "48px", alignItems: "center" }}>
            <div>
              <h2 style={{ fontSize: "32px", fontWeight: "800",
                marginBottom: "12px" }}>Get in Touch</h2>
              <p style={{ color: "#848e9c", fontSize: "15px",
                lineHeight: 1.7, marginBottom: "24px" }}>
                Have questions about PrachinX? We'd love to
                hear from you. Reach out through any of
                our channels below.
              </p>
              <div style={{ display: "flex",
                flexDirection: "column" as any, gap: "10px" }}>
                {[
                  { icon: "📧", label: "Email",
                    value: "prachinx03@gmail.com",
                    href: "mailto:prachinx03@gmail.com" },
                  { icon: "🐦", label: "Twitter",
                    value: "@PrachinX",
                    href: "https://twitter.com/PrachinX" },
                  { icon: "📸", label: "Instagram",
                    value: "@prachinx",
                    href: "https://instagram.com/prachinx" },
                ].map((c) => (
                  <a key={c.label} href={c.href}
                    target="_blank" rel="noopener noreferrer"
                    style={{
                      display: "flex", alignItems: "center",
                      gap: "12px", padding: "14px 18px",
                      background: "#0b0e11",
                      border: "1px solid #2b3139",
                      borderRadius: "10px",
                      textDecoration: "none",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor
                        = "#f0b90b";
                      e.currentTarget.style.transform
                        = "translateX(4px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor
                        = "#2b3139";
                      e.currentTarget.style.transform
                        = "translateX(0)";
                    }}>
                    <span style={{ fontSize: "20px" }}>
                      {c.icon}
                    </span>
                    <div>
                      <p style={{ margin: 0, color: "#848e9c",
                        fontSize: "11px", fontWeight: "600",
                        textTransform: "uppercase" as any,
                        letterSpacing: "0.5px" }}>
                        {c.label}
                      </p>
                      <p style={{ margin: 0, color: "#eaecef",
                        fontSize: "14px", fontWeight: "600",
                        marginTop: "2px" }}>
                        {c.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* CTA Card */}
            <div style={{ background: "#0b0e11",
              border: "1px solid rgba(240,185,11,0.2)",
              borderRadius: "16px", padding: "36px",
              textAlign: "center",
              boxShadow: "0 0 40px rgba(240,185,11,0.05)" }}>
              <div style={{ marginBottom: "20px" }}>
                <Logo size="lg" />
              </div>
              <p style={{ color: "#848e9c", fontSize: "14px",
                lineHeight: 1.7, marginBottom: "24px" }}>
                Join thousands of traders using AI-powered
                insights to make smarter decisions every day.
              </p>
              <Link href="/register" style={{
                display: "block", padding: "14px",
                borderRadius: "8px", fontWeight: "700",
                fontSize: "15px", color: "#000",
                background:
                  "linear-gradient(135deg, #f0b90b, #d4a200)",
                textDecoration: "none",
                boxShadow:
                  "0 4px 16px rgba(240,185,11,0.3)",
              }}>
                Start Trading Free →
              </Link>
              <p style={{ color: "#5e6673", fontSize: "12px",
                marginTop: "12px" }}>
                No credit card required
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: "1px solid #2b3139",
        padding: "24px 48px",
        display: "flex", justifyContent: "space-between",
        alignItems: "center",
        background: "#0b0e11",
      }}>
        <div style={{ display: "flex", alignItems: "center",
          gap: "16px" }}>
          <Logo size="sm" />
          <p style={{ color: "#5e6673", fontSize: "13px",
            margin: 0 }}>
            © 2026 PrachinX. All rights reserved.
          </p>
        </div>
        <div style={{ display: "flex", gap: "24px" }}>
          {[
            { label: "Home", href: "/" },
            { label: "Contact",
              href: "mailto:prachinx03@gmail.com" },
            { label: "Twitter",
              href: "https://twitter.com/PrachinX" },
            { label: "Instagram",
              href: "https://instagram.com/prachinx" },
          ].map((item) => (
            <a key={item.label} href={item.href}
              style={{ color: "#848e9c", textDecoration: "none",
                fontSize: "13px", transition: "color 0.2s" }}
              onMouseEnter={(e) =>
                e.currentTarget.style.color = "#f0b90b"}
              onMouseLeave={(e) =>
                e.currentTarget.style.color = "#848e9c"}>
              {item.label}
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
}