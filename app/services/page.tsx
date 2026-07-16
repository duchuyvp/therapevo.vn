import Image from "next/image";
import type { CSSProperties } from "react";

const subServices = [
  {
    title: "Tham vấn cá nhân",
    body: "Tạo ra một không gian an toàn để khám phá những khó khăn ảnh hưởng đến cuộc sống hàng ngày hoặc sức khỏe tinh thần của cá nhân. Chuyên viên tâm lý sẽ đồng hành cùng bạn nhằm giúp bạn hiểu rõ hơn về bản thân, phát triển các chiến lược đối phó và học được các công cụ thực tế để giải quyết khó khăn và nâng cao chất lượng cuộc sống một cách hiệu quả.",
  },
  {
    title: "Tham vấn nhóm",
    body: "Trong môi trường nhóm an toàn và được dẫn dắt bởi chuyên viên tâm lý, người tham gia có cơ hội chia sẻ trải nghiệm, học hỏi từ những người có hoàn cảnh tương tự, đồng thời phát triển các kỹ năng ứng phó, điều hòa cảm xúc và giải quyết vấn đề thông qua sự hỗ trợ và phản hồi tích cực từ tập thể.",
  },
  {
    title: "Tham vấn tổ chức",
    body: "Đồng hành cùng doanh nghiệp trong việc xây dựng môi trường làm việc lành mạnh thông qua các chương trình khảo sát sức khỏe tinh thần, đánh giá mức độ căng thẳng, tham vấn cho nhân viên, workshop tâm lý và các hoạt động nâng cao nhận thức. Những giải pháp được thiết kế linh hoạt nhằm góp phần giảm căng thẳng, phòng ngừa kiệt sức nghề nghiệp, tăng cường sự gắn kết và nâng cao hiệu quả làm việc của đội ngũ.",
  },
];

const SECTION_LABEL: CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontSize: 11,
  fontWeight: 600,
  color: "var(--app-muted-foreground)",
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  display: "block",
  marginBottom: 20,
};

const H2: CSSProperties = {
  fontFamily: "var(--font-display)",
  fontSize: "clamp(28px, 3.2vw, 44px)",
  fontWeight: 600,
  lineHeight: 1.18,
  letterSpacing: "-0.02em",
  color: "var(--app-foreground)",
};

const BODY: CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontSize: 16,
  fontWeight: 300,
  color: "var(--app-muted-foreground)",
  lineHeight: 1.8,
};

const PRIMARY_CTA: CSSProperties = {
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
};

const SUB_CTA: CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontSize: 13,
  fontWeight: 500,
  color: "var(--app-primary)",
  textDecoration: "none",
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  letterSpacing: "0.02em",
  marginTop: "auto",
};

export const metadata = { title: "Hoạt động & Dịch vụ" };

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section
        style={{
          backgroundColor: "rgb(49,56,91)",
          paddingTop: 160,
          paddingBottom: 100,
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px" }}>
          <span style={{ ...SECTION_LABEL, color: "var(--app-accent)" }}>
            Hoạt động — Dịch vụ
          </span>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(36px, 5vw, 64px)",
              fontWeight: 600,
              lineHeight: 1.12,
              letterSpacing: "-0.02em",
              color: "#FAFAF8",
              maxWidth: 900,
              marginBottom: 28,
            }}
          >
            Hoạt động &amp; Dịch vụ
          </h1>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 17,
              fontWeight: 300,
              color: "rgba(250,250,248,0.7)",
              lineHeight: 1.75,
              maxWidth: 780,
            }}
          >
            Tại Therapévo Việt Nam, chúng tôi hướng đến sự đồng hành cùng cộng đồng trong
            hành trình chăm sóc sức khỏe tinh thần. Với mục tiêu đó, chúng tôi phát triển
            hệ sinh thái toàn diện, bao gồm tham vấn tâm lý, hỗ trợ doanh nghiệp, cung cấp
            không gian hành nghề cho các chuyên gia và các hoạt động giáo dục cộng đồng
            nhằm lan tỏa những giá trị của tâm lý học.
          </p>
        </div>
      </section>

      {/* 01 — Không gian thực hành */}
      <section
        id="khong-gian-thuc-hanh"
        style={{
          backgroundColor: "var(--app-background)",
          borderTop: "1px solid var(--app-border)",
          scrollMarginTop: 88,
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "100px 40px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 80,
            alignItems: "center",
          }}
        >
          <div>
            <span style={SECTION_LABEL}>01 — Dành cho người làm nghề</span>
            <h2 style={{ ...H2, marginBottom: 24 }}>
              Không gian thực hành dành cho{" "}
              <em style={{ fontStyle: "italic", color: "var(--app-primary)" }}>
                nhà tâm lý
              </em>
            </h2>
            <p style={{ ...BODY, marginBottom: 32 }}>
              Không gian tham vấn chuyên nghiệp dành cho các nhà tham vấn và nhà trị liệu
              tâm lý tự do. Mỗi phòng được thiết kế đảm bảo sự riêng tư, yên tĩnh và đầy
              đủ tiện nghi, giúp chuyên gia tập trung vào chất lượng phiên làm việc và
              mang đến trải nghiệm an toàn cho thân chủ.
            </p>
            <a href="#contact" style={PRIMARY_CTA}>
              Đăng ký ngay ⭢
            </a>
          </div>
          <div
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "4 / 3",
              borderRadius: "var(--radius)",
              overflow: "hidden",
              backgroundColor: "var(--app-secondary)",
            }}
          >
            <Image
              src="/figma/pillar-01-practice-space.jpg"
              alt="Không gian thực hành tâm lý tiêu chuẩn"
              fill
              sizes="(max-width: 900px) 100vw, 560px"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </section>

      {/* 02 — Tham vấn & Hỗ trợ tâm lý */}
      <section
        id="tham-van-ho-tro"
        style={{
          backgroundColor: "var(--app-muted)",
          borderTop: "1px solid var(--app-border)",
          scrollMarginTop: 88,
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 40px" }}>
          <div style={{ maxWidth: 780, marginBottom: 64 }}>
            <span style={SECTION_LABEL}>02 — Dành cho người cần hỗ trợ</span>
            <h2 style={{ ...H2, marginBottom: 24 }}>
              Tham vấn &amp;{" "}
              <em style={{ fontStyle: "italic", color: "var(--app-primary)" }}>
                Hỗ trợ tâm lý
              </em>
            </h2>
            <p style={BODY}>
              Dịch vụ đánh giá, tham vấn và hỗ trợ tâm lý dành cho cá nhân, nhóm, gia đình
              và tổ chức được xây dựng dựa trên nhu cầu và mục tiêu riêng của từng đối
              tượng.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 24,
            }}
          >
            {subServices.map((s) => (
              <div
                key={s.title}
                style={{
                  backgroundColor: "var(--app-card)",
                  border: "1px solid var(--app-border)",
                  borderRadius: "var(--radius)",
                  padding: "32px 28px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                  minHeight: 320,
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 22,
                    fontWeight: 600,
                    color: "var(--app-foreground)",
                    lineHeight: 1.25,
                    letterSpacing: "-0.01em",
                    margin: 0,
                  }}
                >
                  {s.title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 14,
                    fontWeight: 300,
                    color: "var(--app-muted-foreground)",
                    lineHeight: 1.72,
                    margin: 0,
                  }}
                >
                  {s.body}
                </p>
                <a href="#contact" style={SUB_CTA}>
                  Đăng ký ngay ⭢
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 03 — Lan tỏa tri thức khoa học */}
      <section
        id="lan-toa-tri-thuc"
        style={{
          backgroundColor: "var(--app-background)",
          borderTop: "1px solid var(--app-border)",
          scrollMarginTop: 88,
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "100px 40px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 80,
            alignItems: "center",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "4 / 3",
              borderRadius: "var(--radius)",
              overflow: "hidden",
              backgroundColor: "var(--app-secondary)",
              order: -1,
            }}
          >
            <Image
              src="/figma/pillar-03-community.jpg"
              alt="Talkshow và workshop tâm lý học cộng đồng"
              fill
              sizes="(max-width: 900px) 100vw, 560px"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div>
            <span style={SECTION_LABEL}>03 — Dành cho cộng đồng</span>
            <h2 style={{ ...H2, marginBottom: 24 }}>
              Lan tỏa{" "}
              <em style={{ fontStyle: "italic", color: "var(--app-primary)" }}>
                tri thức khoa học
              </em>
            </h2>
            <p style={{ ...BODY, marginBottom: 32 }}>
              Tổ chức các hoạt động truyền thông, talkshow, cuộc thi và chiến dịch cộng
              đồng định kỳ nhằm phổ biến kiến thức tâm lý ứng dụng, giảm kỳ thị và khuyến
              khích mỗi người chủ động chăm sóc sức khỏe tinh thần. Chúng tôi tin rằng
              chăm sóc sức khỏe tinh thần không chỉ bắt đầu khi gặp khó khăn mà còn được
              nuôi dưỡng thông qua việc tiếp cận những kiến thức khoa học đáng tin cậy.
            </p>
            <a href="/blog" style={PRIMARY_CTA}>
              Theo dõi ngay ⭢
            </a>
          </div>
        </div>
      </section>

      {/* Tin tức & Sự kiện — placeholder slidebar */}
      <section
        style={{
          backgroundColor: "var(--app-muted)",
          borderTop: "1px solid var(--app-border)",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 40px 60px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              marginBottom: 32,
              flexWrap: "wrap",
              gap: 16,
            }}
          >
            <div>
              <span style={SECTION_LABEL}>Cập nhật</span>
              <h2 style={{ ...H2, margin: 0 }}>Tin tức &amp; Sự kiện</h2>
            </div>
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 12,
                color: "var(--app-muted-foreground)",
                fontStyle: "italic",
              }}
            >
              Nội dung sắp cập nhật
            </span>
          </div>
        </div>
        <div
          style={{
            overflow: "hidden",
            paddingBottom: 60,
            maskImage:
              "linear-gradient(to right, transparent 0, black 60px, black calc(100% - 60px), transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0, black 60px, black calc(100% - 60px), transparent 100%)",
          }}
        >
          <div
            className="marquee-track"
            style={{
              display: "flex",
              gap: 20,
              width: "max-content",
              paddingLeft: 40,
            }}
          >
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                aria-hidden
                style={{
                  flex: "0 0 300px",
                  backgroundColor: "var(--app-card)",
                  border: "1px dashed var(--app-border)",
                  borderRadius: "var(--radius)",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  opacity: 0.75,
                }}
              >
                <div
                  style={{
                    width: "100%",
                    aspectRatio: "16 / 10",
                    background:
                      "repeating-linear-gradient(135deg, var(--app-secondary) 0 12px, var(--app-muted) 12px 24px)",
                  }}
                />
                <div
                  style={{
                    padding: "20px 22px 24px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: 10,
                      fontWeight: 600,
                      color: "var(--app-primary)",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                    }}
                  >
                    Sắp ra mắt
                  </span>
                  <div
                    style={{
                      height: 14,
                      width: "88%",
                      backgroundColor: "var(--app-secondary)",
                      borderRadius: 4,
                    }}
                  />
                  <div
                    style={{
                      height: 14,
                      width: "62%",
                      backgroundColor: "var(--app-secondary)",
                      borderRadius: 4,
                    }}
                  />
                  <div
                    style={{
                      marginTop: 8,
                      height: 10,
                      width: "40%",
                      backgroundColor: "var(--app-secondary)",
                      borderRadius: 4,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section
        style={{
          backgroundColor: "var(--app-secondary)",
          borderTop: "1px solid var(--app-border)",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "80px 40px",
          }}
        >
          <div
            style={{
              backgroundColor: "var(--app-primary)",
              borderRadius: "var(--radius)",
              padding: "48px 56px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 40,
              flexWrap: "wrap",
            }}
          >
            <div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 28,
                  fontWeight: 600,
                  color: "var(--app-primary-foreground)",
                  marginBottom: 10,
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
                  opacity: 0.85,
                  lineHeight: 1.65,
                  fontStyle: "italic",
                  maxWidth: 560,
                }}
              >
                Hãy bắt đầu với phiên tư vấn miễn phí để được đề xuất lộ trình phù hợp nhất
                với bối cảnh và nhu cầu của bạn.
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
                padding: "14px 32px",
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
    </>
  );
}
