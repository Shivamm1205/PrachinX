import Link from "next/link";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  href?: string;
}

export default function Logo({
  size = "md",
  href,
}: LogoProps) {
  const sizes = {
    sm: { box: 26, font: 13, text: 13, sub: 8 },
    md: { box: 32, font: 16, text: 15, sub: 9 },
    lg: { box: 44, font: 22, text: 20, sub: 10 },
  };
  const s = sizes[size];

  const content = (
    <div style={{
      display: "flex", alignItems: "center", gap: "10px",
    }}>
      <div style={{
        width: `${s.box}px`, height: `${s.box}px`,
        borderRadius: `${Math.round(s.box * 0.25)}px`,
        background: "linear-gradient(135deg, #f0b90b, #d4a200)",
        display: "flex", alignItems: "center",
        justifyContent: "center", fontWeight: "900",
        fontSize: `${s.font}px`, color: "#000",
        flexShrink: 0,
        boxShadow: "0 4px 12px rgba(240,185,11,0.3)",
      }}>P</div>
      <div>
        <div style={{
          fontSize: `${s.text}px`, fontWeight: "900",
          color: "#eaecef", lineHeight: 1.1,
          letterSpacing: "-0.3px",
        }}>
          PRACHIN
          <span style={{
            background: "linear-gradient(135deg, #f0b90b, #d4a200)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>X</span>
        </div>
        <div style={{
          fontSize: `${s.sub}px`, color: "#5e6673",
          letterSpacing: "1.5px", marginTop: "1px",
          textTransform: "uppercase" as any,
          fontWeight: "600",
        }}>
          Trading With Integrity
        </div>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} style={{ textDecoration: "none" }}>
        {content}
      </Link>
    );
  }
  return content;
}