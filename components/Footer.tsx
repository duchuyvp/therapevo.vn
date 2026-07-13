"use client";

const FOOTER_BG = "#0D1E3C";
const FOOTER_BORDER = "rgba(255,255,255,0.08)";

const navLinks: Record<string, string[]> = {
  "Dịch Vụ": [
    "Không gian Thực hành",
    "Tham vấn Cá nhân",
    "Tham vấn Gia đình",
    "Hỗ trợ Doanh nghiệp",
  ],
  "Tài Nguyên": [
    "Thư viện Tâm lý",
    "Bài viết Học thuật",
    "Talkshow Lời Hồi Đáp",
    "Đăng ký Newsletter",
  ],
  "Về Chúng Tôi": [
    "Giới thiệu Therapévo",
    "Lịch sử hình thành",
    "Đội ngũ chuyên gia",
    "Đạo đức & Tiêu chuẩn",
  ],
};

const socialLinkStyle: React.CSSProperties = {
  width: 36,
  height: 36,
  borderRadius: "50%",
  border: `1px solid ${FOOTER_BORDER}`,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  color: "rgba(250,250,248,0.7)",
  backgroundColor: "rgba(255,255,255,0.04)",
  textDecoration: "none",
  transition: "color 0.2s, background-color 0.2s, border-color 0.2s",
};

const inputStyle: React.CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontSize: 14,
  color: "#FAFAF8",
  backgroundColor: "rgba(255,255,255,0.06)",
  border: `1px solid ${FOOTER_BORDER}`,
  borderRadius: "var(--radius)",
  padding: "13px 16px",
  outline: "none",
  width: "100%",
};

export function Footer() {
  return (
    <footer id="contact" style={{ backgroundColor: FOOTER_BG, color: "#FAFAF8" }}>
      <div style={{ borderBottom: `1px solid ${FOOTER_BORDER}` }}>
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "80px 40px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 80,
            alignItems: "center",
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(28px, 3vw, 42px)",
                fontWeight: 600,
                lineHeight: 1.2,
                letterSpacing: "-0.02em",
                color: "#FAFAF8",
                marginBottom: 20,
              }}
            >
              Cùng nhau xây dựng một hệ sinh thái tinh thần lành mạnh hơn.
            </h2>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 15,
                fontWeight: 300,
                color: "rgba(250,250,248,0.6)",
                lineHeight: 1.7,
                maxWidth: 400,
                marginBottom: 32,
              }}
            >
              Dù bạn là nhà chuyên môn, cá nhân đang cần hỗ trợ, hay doanh nghiệp muốn đồng
              hành — chúng tôi luôn lắng nghe. Mọi liên hệ đầu tiên đều được bảo mật và
              không ràng buộc.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { label: "Hotline", value: "(+84) 964727910" },
                { label: "Email", value: "cskh@therapevo.vn / therapevo.psy@gmail.com" },
                { label: "Địa chỉ", value: "Ngõ 278 Tôn Đức Thắng, P. Ô Chợ Dừa, TP. Hà Nội" },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{ display: "flex", gap: 16, alignItems: "baseline" }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: 10,
                      fontWeight: 600,
                      color: "var(--app-accent)",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      minWidth: 52,
                    }}
                  >
                    {item.label}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: 14,
                      color: "rgba(250,250,248,0.72)",
                    }}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <form
            style={{ display: "flex", flexDirection: "column", gap: 12 }}
            onSubmit={(e) => {
              e.preventDefault();
              alert("Cảm ơn bạn! Chúng tôi sẽ liên hệ sớm nhất. (form chưa nối backend)");
            }}
          >
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <input type="text" placeholder="Họ và tên" style={inputStyle} />
              <input type="text" placeholder="Tỉnh thành" style={inputStyle} />
            </div>
            <input type="tel" placeholder="Số điện thoại" style={inputStyle} />
            <input
              type="email"
              placeholder="Địa chỉ email làm việc"
              style={inputStyle}
            />
            <select
              style={{
                ...inputStyle,
                color: "rgba(250,250,248,0.55)",
                cursor: "pointer",
                appearance: "none",
              }}
              defaultValue=""
            >
              <option value="">Tôi quan tâm đến…</option>
              <option value="space">Không gian Thực hành Tiêu chuẩn</option>
              <option value="counseling">Dịch vụ Tham vấn & Trị liệu</option>
              <option value="org">Giải pháp cho Tổ chức / Doanh nghiệp</option>
              <option value="community">Chương trình Cộng đồng</option>
              <option value="other">Khác</option>
            </select>
            <textarea
              placeholder="Chia sẻ đôi điều về bối cảnh và điều bạn mong muốn đạt được"
              rows={4}
              style={{ ...inputStyle, resize: "none", lineHeight: 1.6 }}
            />
            <button
              type="submit"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 14,
                fontWeight: 500,
                color: FOOTER_BG,
                backgroundColor: "#FAFAF8",
                border: "none",
                borderRadius: "var(--radius)",
                padding: "14px 28px",
                cursor: "pointer",
                letterSpacing: "0.02em",
                textAlign: "left",
              }}
            >
              Gửi liên hệ →
            </button>
          </form>
        </div>
      </div>

      <div style={{ borderBottom: `1px solid ${FOOTER_BORDER}` }}>
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "64px 40px",
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gap: 48,
          }}
        >
          <div>
            <div style={{ marginBottom: 20 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/figma/logo-therapevo.png"
                alt="Therapévo Việt Nam"
                style={{
                  height: 48,
                  width: "auto",
                  objectFit: "contain",
                  filter: "brightness(0) invert(1)",
                }}
              />
            </div>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 11,
                fontWeight: 500,
                color: "rgba(255,255,255,0.6)",
                lineHeight: 1.7,
                marginBottom: 20,
                letterSpacing: "0.02em",
                maxWidth: 260,
              }}
            >
              CÔNG TY TNHH NGHIÊN CỨU, SÁNG TẠO
              <br />
              VÀ PHÁT TRIỂN THERAPÉVO VIỆT NAM
            </p>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 13,
                fontWeight: 300,
                color: "rgba(255,255,255,0.6)",
                lineHeight: 1.7,
                maxWidth: 260,
                marginBottom: 20,
              }}
            >
              Khoa học · Nhân văn · Bền vững
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 11,
                  color: "rgba(255,255,255,0.6)",
                  letterSpacing: "0.05em",
                }}
              >
                Mã số doanh nghiệp: 0110935045
              </span>
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 11,
                  color: "rgba(250,250,248,0.6)",
                  letterSpacing: "0.05em",
                }}
              >
                Được cấp bởi Sở Tài chính Thành phố Hà Nội
              </span>
            </div>

            <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
              <a
                href="https://www.facebook.com/share/1Cw3DeDiuN/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                style={socialLinkStyle}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M13.5 21v-8.25h2.813l.421-3.281H13.5V7.375c0-.95.264-1.598 1.627-1.598h1.735V2.844A23.32 23.32 0 0 0 14.335 2.7c-2.505 0-4.222 1.53-4.222 4.34v2.429H7.313v3.281h2.8V21h3.387Z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/therapevo.vietnam?igsh=d2xpcTN3NDBiM2lt"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                style={socialLinkStyle}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a
                href="https://youtube.com/@therapevo.vietnam?si=gc0zaqC_nN5N-fC5"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                style={socialLinkStyle}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M23.5 6.5a2.99 2.99 0 0 0-2.11-2.11C19.6 4 12 4 12 4s-7.6 0-9.39.39A2.99 2.99 0 0 0 .5 6.5C.11 8.29.11 12 .11 12s0 3.71.39 5.5a2.99 2.99 0 0 0 2.11 2.11C4.4 20 12 20 12 20s7.6 0 9.39-.39a2.99 2.99 0 0 0 2.11-2.11c.39-1.79.39-5.5.39-5.5s0-3.71-.39-5.5ZM9.75 15.5v-7l6 3.5-6 3.5Z" />
                </svg>
              </a>
            </div>
          </div>

          {Object.entries(navLinks).map(([section, items]) => (
            <div key={section}>
              <div
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 11,
                  fontWeight: 600,
                  color: "#FAFAF8",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: 20,
                }}
              >
                {section}
              </div>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: 13,
                        fontWeight: 300,
                        color: "rgba(250,250,248,0.6)",
                        textDecoration: "none",
                      }}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "24px 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 12,
            fontWeight: 300,
            color: "rgba(250,250,248,0.6)",
          }}
        >
          © 2025 Therapévo Việt Nam.&nbsp;&nbsp;&nbsp;Thành viên: Hội Tâm lý Trị liệu Việt
          Nam (VnPA)
        </span>
        <div style={{ display: "flex", gap: 24 }}>
          {["Chính sách Bảo mật", "Điều khoản Dịch vụ", "Quy tắc Đạo đức"].map((l) => (
            <a
              key={l}
              href="#"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 12,
                fontWeight: 300,
                color: "rgba(250,250,248,0.28)",
                textDecoration: "none",
              }}
            >
              {l}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
