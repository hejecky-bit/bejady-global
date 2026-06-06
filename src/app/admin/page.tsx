"use client";
import { useState } from "react";
export default function AdminDashboard() {
  const [page, setPage] = useState("dashboard");
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", minHeight: "100vh", background: "#f5f5f7" }}>
      <div style={{ background: "#1a1a2e", color: "white", padding: "16px 32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ fontSize: 18, fontWeight: 700 }}>BEJADY CMS</h1>
        <span style={{ fontSize: 13, opacity: 0.6 }}>v1.0</span>
      </div>
      <div style={{ display: "flex", minHeight: "calc(100vh - 60px)" }}>
        <div style={{ width: 220, background: "white", borderRight: "1px solid #e5e5e5", padding: 16 }}>
          {[
            { id: "dashboard", label: "📊 Dashboard" },
            { id: "products", label: "📦 Products" },
            { id: "blog", label: "📝 Blog Posts" },
            { id: "messages", label: "✉️ Messages" },
          ].map(item => (
            <button key={item.id} onClick={() => setPage(item.id)} style={{
              display: "block", width: "100%", textAlign: "left", padding: "10px 14px",
              borderRadius: 8, border: "none", cursor: "pointer", fontSize: 14,
              background: page === item.id ? "#6c5ce7" : "transparent",
              color: page === item.id ? "white" : "#333", marginBottom: 4, fontWeight: 500,
            }}>{item.label}</button>
          ))}
        </div>
        <div style={{ flex: 1, padding: 32 }}>
          {page === "dashboard" && (
            <div>
              <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>Dashboard</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 32 }}>
                {[
                  { label: "Products", count: 5, color: "#6c5ce7" },
                  { label: "Blog Posts", count: 4, color: "#00b894" },
                  { label: "Languages", count: 4, color: "#fdcb6e" },
                ].map(s => (
                  <div key={s.label} style={{ background: "white", borderRadius: 12, padding: 24, border: "1px solid #e5e5e5" }}>
                    <div style={{ fontSize: 32, fontWeight: 800, color: s.color }}>{s.count}</div>
                    <div style={{ fontSize: 14, color: "#666", marginTop: 4 }}>{s.label}</div>
                  </div>
                ))}
              </div>
              <div style={{ background: "white", borderRadius: 12, padding: 24, border: "1px solid #e5e5e5" }}>
                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Quick Actions</h3>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <a href="https://github.com/hejecky-bit/bejady-global/tree/main/content/products" target="_blank" style={{ padding: "10px 20px", background: "#f0f0f0", borderRadius: 8, fontSize: 13, color: "#333", textDecoration: "none" }}>✏️ Edit Products on GitHub</a>
                  <a href="https://github.com/hejecky-bit/bejady-global/tree/main/content/blog" target="_blank" style={{ padding: "10px 20px", background: "#f0f0f0", borderRadius: 8, fontSize: 13, color: "#333", textDecoration: "none" }}>✏️ Edit Blog Posts on GitHub</a>
                  <a href="https://vercel.com/hejecky-6653/bejady-global" target="_blank" style={{ padding: "10px 20px", background: "#f0f0f0", borderRadius: 8, fontSize: 13, color: "#333", textDecoration: "none" }}>⚡ Vercel Dashboard</a>
                </div>
              </div>
            </div>
          )}
          {page === "products" && (
            <div>
              <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>Products</h2>
              {["Single Cylinder", "Double Cylinder", "Triple Cylinder", "Four Cylinder", "Six Cylinder"].map((name, i) => (
                <div key={name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 20px", background: "white", borderRadius: 8, border: "1px solid #e5e5e5", marginBottom: 8 }}>
                  <div><div style={{ fontWeight: 600, fontSize: 14 }}>{name}</div></div>
                  <a href={`https://github.com/hejecky-bit/bejady-global/edit/main/content/products/${name.toLowerCase().replace(/\s/g, "-")}.json`} target="_blank" style={{ fontSize: 13, color: "#6c5ce7", textDecoration: "none" }}>Edit on GitHub →</a>
                </div>
              ))}
            </div>
          )}
          {page === "blog" && (
            <div>
              <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>Blog Posts</h2>
              {["How to Choose Gelato Machine", "How to Start a Gelato Business"].map((title, i) => (
                <div key={title} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 20px", background: "white", borderRadius: 8, border: "1px solid #e5e5e5", marginBottom: 8 }}>
                  <div><div style={{ fontWeight: 600, fontSize: 14 }}>{title}</div></div>
                  <a href={`https://github.com/hejecky-bit/bejady-global/edit/main/content/blog/en/${title.toLowerCase().replace(/\s/g, "-")}.json`} target="_blank" style={{ fontSize: 13, color: "#6c5ce7", textDecoration: "none" }}>Edit on GitHub →</a>
                </div>
              ))}
            </div>
          )}
          {page === "messages" && (
            <div>
              <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>Contact Inquiries</h2>
              <div style={{ background: "white", borderRadius: 12, padding: 40, border: "1px solid #e5e5e5", textAlign: "center", color: "#999" }}>
                Inquiries sent to your email: 11338168@qq.com
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
