"use client";

import Sidebar from "../../components/dashboard/Sidebar";
import Navbar from "../../components/dashboard/Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{
      display: "flex",
      minHeight: "100vh",
      background: "#0b0e11",
      fontFamily: "Inter, -apple-system, sans-serif",
    }}>
      <Sidebar />
      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        minWidth: 0,
        overflow: "hidden",
      }}>
        <Navbar />
        <main style={{
          flex: 1,
          overflowY: "auto",
          background: "#0b0e11",
          padding: "0",
        }}>
          {children}
        </main>
      </div>
    </div>
  );
}