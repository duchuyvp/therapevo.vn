import Link from "next/link";

const pillars = [
  {
    num: "01",
    vi: "Không gian Thực hành Tiêu chuẩn",
    en: "Standard Practice Spaces",
    audience: "Dành cho Người làm Nghề",
    desc: "Hệ thống phòng thực hành tiêu chuẩn - phòng tham vấn riêng tư, tiện nghi và không gian thảo luận học thuật an toàn dành cho nhà tham vấn, nhà trị liệu tâm lý.",
    features: [
      "Phòng thực hành tiêu chuẩn",
      "Giám sát chuyên môn (Supervision)",
      "Không gian thảo luận hấp dẫn",
      "Đào tạo, nâng cao kĩ năng thực hành",
    ],
    img: "/figma/pillar-01-practice-space.jpg",
    imgAlt: "Phòng tham vấn chuyên nghiệp, tiêu chuẩn",
    href: "/services#khong-gian-thuc-hanh",
  },
  {
    num: "02",
    vi: "Tư vấn & Hỗ trợ Tâm lý",
    en: "Psychological Supporting",
    audience: "Dành cho Người cần Hỗ trợ",
    desc: "Lộ trình tư vấn & tham vấn trị liệu tâm lý cá nhân, gia đình và tổ chức dựa trên nền tảng khoa học ứng dụng, tôn trọng thế giới nội tâm và trải nghiệm của từng khách hàng.",
    features: [
      "Tham vấn cá nhân & gia đình",
      "Hỗ trợ thanh thiếu niên",
      "Tiếp cận nhân văn & khoa học",
      "Tư vấn cho doanh nghiệp, tổ chức",
    ],
    img: "/figma/pillar-02-counseling.jpg",
    imgAlt: "Buổi tham vấn tâm lý 1-1 với sự đồng cảm và chuyên nghiệp",
    href: "/services#tham-van-ho-tro",
  },
  {
    num: "03",
    vi: "Lan tỏa Tri thức Khoa học",
    en: "Public Knowledge Spreading",
    audience: "Dành cho Cộng đồng",
    desc: 'Sáng tạo nội dung về tâm lý học qua các bài viết dễ hiểu, talkshow định kỳ Lời Hồi Đáp, cuộc thi "Tâm lý học quanh ta" và các chiến dịch nâng cao nhận thức cộng đồng.',
    features: [
      'Talkshow "Lời Hồi Đáp"',
      'Cuộc thi "Tâm lý học quanh ta"',
      "Bài viết học thuật ứng dụng",
    ],
    img: "/figma/pillar-03-community.jpg",
    imgAlt: "Workshop và talkshow tâm lý học cộng đồng",
    href: "/services#lan-toa-tri-thuc",
  },
];

export function Services() {
  return (
    <section
      id="services"
      style={{
        backgroundColor: "var(--app-muted)",
        borderTop: "1px solid var(--app-border)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 40px" }}>
        <div style={{ marginBottom: 64 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 11,
                fontWeight: 600,
                color: "var(--app-muted-foreground)",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
              }}
            >
              03 — Ba Trụ Cột Hoạt Động
            </span>
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(32px, 3.5vw, 48px)",
              fontWeight: 600,
              lineHeight: 1.18,
              letterSpacing: "-0.02em",
              color: "var(--app-foreground)",
              marginBottom: 20,
            }}
          >
            Hệ sinh thái kết nối người làm nghề,
            <br />
            người cần trợ giúp và cộng đồng
          </h2>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 16,
              fontWeight: 300,
              color: "var(--app-muted-foreground)",
              lineHeight: 1.7,
            }}
          >
            Ba hoạt động chủ đạo của Therapévo tạo nên một vòng tròn khép kín - từ không
            gian thực hành chuẩn mực, đến dịch vụ hỗ trợ chuyên sâu và lan tỏa tri thức đến
            đại chúng.
          </p>
          <Link
            href="/services"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              marginTop: 24,
              fontFamily: "var(--font-sans)",
              fontSize: 14,
              fontWeight: 500,
              color: "var(--app-primary)",
              textDecoration: "none",
              letterSpacing: "0.02em",
              borderBottom: "1px solid var(--app-primary)",
              paddingBottom: 2,
            }}
          >
            Xem chi tiết ⭢
          </Link>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24,
          }}
        >
          {pillars.map((p) => (
            <div
              key={p.num}
              style={{
                backgroundColor: "var(--app-card)",
                borderRadius: "var(--radius)",
                overflow: "hidden",
                border: "1px solid var(--app-border)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  width: "100%",
                  aspectRatio: "4/3",
                  overflow: "hidden",
                  backgroundColor: "var(--app-secondary)",
                  position: "relative",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.img}
                  alt={p.imgAlt}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: 16,
                    left: 16,
                    backgroundColor: "var(--app-primary)",
                    color: "var(--app-primary-foreground)",
                    fontFamily: "var(--font-display)",
                    fontSize: 13,
                    fontWeight: 700,
                    letterSpacing: "0.05em",
                    padding: "4px 12px",
                    borderRadius: 4,
                  }}
                >
                  {p.num}
                </div>
              </div>

              <div
                style={{
                  padding: "28px 28px 32px",
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
                  <span
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: 10,
                      fontWeight: 600,
                      color: "var(--app-primary)",
                      backgroundColor: "var(--app-secondary)",
                      padding: "3px 10px",
                      borderRadius: 3,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}
                  >
                    {p.audience}
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 20,
                    fontWeight: 600,
                    color: "var(--app-foreground)",
                    marginBottom: 6,
                    lineHeight: 1.3,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {p.vi}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 12,
                    fontWeight: 400,
                    color: "var(--app-muted-foreground)",
                    marginBottom: 16,
                    fontStyle: "italic",
                  }}
                >
                  {p.en}
                </p>

                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 14,
                    fontWeight: 300,
                    color: "var(--app-muted-foreground)",
                    lineHeight: 1.72,
                    marginBottom: 24,
                  }}
                >
                  {p.desc}
                </p>

                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: "0 0 28px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                  }}
                >
                  {p.features.map((f) => (
                    <li
                      key={f}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        fontFamily: "var(--font-sans)",
                        fontSize: 13,
                        color: "var(--app-foreground)",
                        fontWeight: 400,
                      }}
                    >
                      <span
                        style={{
                          width: 5,
                          height: 5,
                          borderRadius: "50%",
                          backgroundColor: "var(--app-primary)",
                          flexShrink: 0,
                        }}
                      />
                      {f}
                    </li>
                  ))}
                </ul>

                <div style={{ marginTop: "auto" }}>
                  <Link
                    href={p.href}
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: 13,
                      fontWeight: 500,
                      color: "var(--app-primary)",
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      letterSpacing: "0.02em",
                      paddingBottom: 2,
                    }}
                  >
                    Tìm hiểu thêm →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: 48,
            backgroundColor: "var(--app-primary)",
            borderRadius: "var(--radius)",
            padding: "40px 48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 32,
            flexWrap: "wrap",
          }}
        >
          <div>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 22,
                fontWeight: 600,
                color: "var(--app-primary-foreground)",
                marginBottom: 8,
                letterSpacing: "-0.01em",
              }}
            >
              Chưa biết nên bắt đầu từ đâu?
            </h3>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 15,
                fontWeight: 300,
                color: "var(--app-primary-foreground)",
                opacity: 0.82,
                lineHeight: 1.6,
                fontStyle: "italic",
              }}
            >
              Hãy bắt đầu với phiên tư vấn miễn phí để được đề xuất lộ trình phù hợp nhất.
            </p>
          </div>
          <a
            href="#contact"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 14,
              fontWeight: 500,
              color: "var(--app-primary)",
              backgroundColor: "var(--app-primary-foreground)",
              padding: "14px 28px",
              borderRadius: "var(--radius)",
              textDecoration: "none",
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            Đăng ký tư vấn
          </a>
        </div>
      </div>
    </section>
  );
}
