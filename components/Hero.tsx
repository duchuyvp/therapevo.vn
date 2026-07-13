export function Hero() {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        backgroundColor: "var(--app-background)",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "url(https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=1800&h=1200&fit=crop&auto=format)",
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
          opacity: 0.06,
        }}
        aria-hidden
      />

      <svg
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          height: "100%",
          width: "auto",
          opacity: 0.04,
        }}
        viewBox="0 0 400 900"
        fill="none"
        aria-hidden
      >
        <ellipse cx="350" cy="450" rx="300" ry="420" fill="var(--app-primary)" />
      </svg>

      <div
        style={{
          position: "relative",
          maxWidth: 1200,
          margin: "0 auto",
          padding: "120px 40px 80px",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 80,
            alignItems: "center",
          }}
        >
          <div>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(36px, 4.5vw, 58px)",
                fontWeight: 700,
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                color: "var(--app-foreground)",
                marginBottom: 28,
              }}
            >
              Kiến tạo hệ sinh thái chăm sóc{" "}
              <em style={{ fontStyle: "italic", color: "var(--app-primary)" }}>
                sức khỏe tinh thần toàn diện
              </em>{" "}
              cho người Việt.
            </h1>

            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 14,
                fontWeight: 400,
                color: "var(--app-muted-foreground)",
                lineHeight: 1.65,
                maxWidth: 460,
                marginBottom: 48,
                fontStyle: "italic",
                opacity: 0.8,
              }}
            >
              Therapévo Việt Nam - Be kind to your mind
            </p>

            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <a
                href="#services"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 14,
                  fontWeight: 500,
                  color: "var(--app-primary-foreground)",
                  backgroundColor: "var(--app-primary)",
                  padding: "14px 28px",
                  borderRadius: "var(--radius)",
                  textDecoration: "none",
                  letterSpacing: "0.02em",
                  display: "inline-block",
                }}
              >
                Khám phá giải pháp
              </a>
              <a
                href="#contact"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 14,
                  fontWeight: 500,
                  color: "var(--app-foreground)",
                  backgroundColor: "transparent",
                  padding: "13px 28px",
                  borderRadius: "var(--radius)",
                  border: "1px solid var(--app-border)",
                  textDecoration: "none",
                  letterSpacing: "0.02em",
                  display: "inline-block",
                }}
              >
                Đăng ký nhận tư vấn
              </a>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {[
              {
                number: "03",
                label:
                  "Trụ cột hoạt động kết nối người làm nghề, khách hàng và cộng đồng",
              },
              {
                number: "600+",
                label: "Phiên lắng nghe và tham vấn tâm lý được thực hiện",
              },
              {
                number: "100+",
                label:
                  "Nhà tâm lý trẻ và người học được đồng hành và hỗ trợ trên hành trình phát triển cá nhân",
              },
            ].map((stat, i) => (
              <div
                key={i}
                style={{
                  padding: "32px 36px",
                  borderTop: "1px solid var(--app-border)",
                  borderBottom: i === 2 ? "1px solid var(--app-border)" : "none",
                  display: "grid",
                  gridTemplateColumns: "88px 1fr",
                  gap: 24,
                  alignItems: "start",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 38,
                    fontWeight: 700,
                    color: "var(--app-primary)",
                    lineHeight: 1,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {stat.number}
                </span>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 14,
                    fontWeight: 400,
                    color: "var(--app-foreground)",
                    lineHeight: 1.55,
                  }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
