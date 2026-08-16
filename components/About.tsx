const values = [
  {
    num: "01",
    title: "Khoa học Ứng dụng",
    titleEn: "Evidence-Based Practice",
    body: "Mọi chương trình đều được xây dựng dựa trên các khung lý thuyết tâm lý học được kiểm chứng, từ Lý thuyết Tự quyết (Self-Determination Theory), hay Mô hình Yerkes-Dodson đến các liệu pháp hỗ trợ khác ... tất cả đều được diễn giải thành công cụ thực tiễn, bám sát các nguyên tắc đạo đức nghề nghiệp.",
  },
  {
    num: "02",
    title: "Thấu cảm & Nhân văn",
    titleEn: "Humanistic & Empathetic",
    body: "Chúng tôi tin rằng mỗi người đều mang trong mình một thế giới nội tâm phong phú và xứng đáng được lắng nghe. Đối với Therapévo, sự nhân văn không chỉ là thái độ đón nhận, lắng nghe không phán xét, mà còn là cam kết tạo ra một môi trường an toàn, nơi mọi rào cản về tâm lý được tháo gỡ bằng sự thấu hiểu và sẻ chia.",
  },
  {
    num: "03",
    title: "Gắn kết & Bền vững",
    titleEn: "Connected & Sustainable",
    body: "Chăm sóc sức khỏe tinh thần và thay đổi nhận thức xã hội là một hành trình dài hạn, đòi hỏi sự chung tay của cả cộng đồng. Therapévo vận hành như một sợi dây gắn kết chặt chẽ các nguồn lực trong lĩnh vực tâm lý học, tạo nên một hệ sinh thái tương hỗ để không một cá nhân nào phải cô độc trên hành trình cân bằng sức khỏe tâm trí.",
  },
];

const milestones = [
  {
    year: "2021",
    event: "Thành lập BFN Academy",
    desc: "Khởi nguồn hành trình lan tỏa tri thức tâm lý học đến cộng đồng",
  },
  {
    year: "2023",
    event: "Therapévo Việt Nam ra đời",
    desc: "Chuyển đổi thành đơn vị hoạt động toàn diện với 3 trụ cột hệ sinh thái",
  },
  {
    year: "2025",
    event: "Doanh nghiệp hóa",
    desc: "Nâng cấp không gian thực hành và tiếp tục mở rộng phạm vi hoạt động",
  },
];

export function About() {
  return (
    <section
      id="about"
      style={{
        backgroundColor: "var(--app-background)",
        borderTop: "1px solid var(--app-border)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 40px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 80,
            marginBottom: 80,
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
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
                02 — Về Therapévo
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
              }}
            >
              Sức khỏe tinh thần không phải đặc quyền.{" "}
              <em style={{ fontStyle: "italic", color: "var(--app-primary)" }}>
                Đó là nền tảng của một cuộc sống trọn vẹn.
              </em>
            </h2>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              gap: 20,
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 16,
                fontWeight: 300,
                color: "var(--app-muted-foreground)",
                lineHeight: 1.85,
                textAlign: "justify",
              }}
            >
              <strong style={{ fontWeight: 700, color: "var(--app-foreground)" }}>
                Bạn có từng nghĩ việc chăm sóc tâm trí là một thứ gì đó xa xỉ - chỉ dành cho
                những ai có đủ điều kiện, hoặc khi mọi tổn thương đã chạm đáy?
              </strong>
            </p>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 16,
                fontWeight: 300,
                color: "var(--app-muted-foreground)",
                lineHeight: 1.85,
                textAlign: "justify",
              }}
            >
              Chúng ta dễ dàng đầu tư cho vẻ bề ngoài, nhưng lại bắt tâm trí phải âm thầm
              gồng gánh những áp lực vô hình từ ngày này qua ngày khác. Nhưng một cái cây
              không thể xanh tươi nếu bộ rễ đang khô héo và một cuộc sống hạnh phúc không
              thể xây dựng trên một tâm trí kiệt quệ. Lắng nghe bản thân hay tìm kiếm sự
              trợ giúp tâm lý khi cần thiết, tuyệt đối không phải là một lựa chọn xa hoa.
            </p>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 16,
                fontWeight: 700,
                color: "var(--app-muted-foreground)",
                lineHeight: 1.85,
                fontStyle: "italic",
              }}
            >
              Từ những trăn trở và niềm tin ấy, hành trình của Therapévo bắt đầu...
            </p>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 1,
            backgroundColor: "var(--app-border)",
            borderRadius: "var(--radius)",
            overflow: "hidden",
            marginBottom: 80,
          }}
        >
          {milestones.map((m) => (
            <div
              key={m.year}
              style={{
                backgroundColor: "var(--app-card)",
                padding: "32px 32px",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 36,
                  fontWeight: 700,
                  color: "var(--app-primary)",
                  marginBottom: 10,
                  letterSpacing: "-0.02em",
                }}
              >
                {m.year}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 15,
                  fontWeight: 600,
                  color: "var(--app-foreground)",
                  marginBottom: 8,
                }}
              >
                {m.event}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 13,
                  fontWeight: 300,
                  color: "var(--app-muted-foreground)",
                  lineHeight: 1.6,
                }}
              >
                {m.desc}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "380px 1fr",
            gap: 64,
            alignItems: "start",
          }}
        >
          <div style={{ position: "relative" }}>
            <div
              style={{
                width: "100%",
                aspectRatio: "3 / 4",
                borderRadius: "var(--radius)",
                overflow: "hidden",
                backgroundColor: "var(--app-secondary)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/figma/about-consultation.jpg"
                alt="Chuyên gia tâm lý học Therapévo trong buổi tư vấn"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>
            <div
              style={{
                position: "absolute",
                bottom: 28,
                right: -24,
                backgroundColor: "var(--app-primary)",
                color: "var(--app-primary-foreground)",
                padding: "18px 22px",
                borderRadius: "var(--radius)",
                maxWidth: 172,
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 26,
                  fontWeight: 700,
                  lineHeight: 1,
                }}
              >
                15+
              </div>
              <div
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 11,
                  fontWeight: 400,
                  marginTop: 6,
                  lineHeight: 1.45,
                  opacity: 0.88,
                }}
              >
                tổ chức và doanh nghiệp đã đồng hành
              </div>
            </div>
          </div>

          <div style={{ paddingTop: 8 }}>
            <div style={{ marginBottom: 32 }}>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 24,
                  fontWeight: 600,
                  color: "var(--app-foreground)",
                  marginBottom: 8,
                  letterSpacing: "-0.01em",
                }}
              >
                Giá trị cốt lõi
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 14,
                  fontWeight: 300,
                  color: "var(--app-muted-foreground)",
                  lineHeight: 1.7,
                }}
              >
                Khoa học · Nhân văn · Bền vững — Những giá trị định hướng mọi quyết định và
                hoạt động của Therapévo.
              </p>
            </div>

            {values.map((v, i) => (
              <div
                key={v.num}
                style={{
                  padding: "24px 0",
                  borderBottom: "1px solid var(--app-border)",
                  borderTop: i === 0 ? "1px solid var(--app-border)" : "none",
                  display: "grid",
                  gridTemplateColumns: "44px 1fr",
                  gap: 20,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 11,
                    fontWeight: 600,
                    color: "var(--app-muted-foreground)",
                    letterSpacing: "0.1em",
                    paddingTop: 3,
                  }}
                >
                  {v.num}
                </span>
                <div>
                  <h4
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: 18,
                      fontWeight: 600,
                      color: "var(--app-foreground)",
                      marginBottom: 4,
                      letterSpacing: "-0.01em",
                  }}
                  >
                    <span className="core-value-title">{v.title}</span>
                    <span
                      className="core-value-title-en"
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: 12,
                        fontWeight: 300,
                        color: "var(--app-muted-foreground)",
                        marginLeft: 10,
                        fontStyle: "italic",
                        letterSpacing: 0,
                      }}
                    >
                      {v.titleEn}
                    </span>
                  </h4>
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: 14,
                      fontWeight: 300,
                      color: "var(--app-muted-foreground)",
                      lineHeight: 1.72,
                    }}
                  >
                    {v.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
