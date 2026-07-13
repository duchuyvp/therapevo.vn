import type { CSSProperties } from "react";
import Image from "next/image";

type Person = {
  name: string;
  title: string;
  titleSub?: string;
  titleEn?: string;
  bio: string;
  photo?: string;
};

const advisors: Person[] = [
  {
    name: "PGS. TS. Nguyễn Thị Phương Hoa",
    title: "Bảo trợ Học thuật & Cố vấn Khoa học",
    titleSub:
      "Nguyên Viện trưởng Viện Tâm lý và Truyền thông — Hội Tâm lý học Việt Nam",
    bio: 'Tác giả của nhiều ấn phẩm khoa học và sách ứng dụng như "Có một cơn đau mang tên trầm cảm", "Hãy nói con cần mẹ", "Khi mây đen kéo tới"... Là cố vấn khoa học của Therapévo và Beautiful Mind Vietnam.',
    photo: "/team/phuong-hoa.jpg",
  },
  {
    name: "PGS. TS. Phan Thị Mai Hương",
    title: "Cố vấn Khoa học",
    titleSub:
      "Nghiên cứu viên cao cấp — Viện Xã hội học và Tâm lý học, Viện Hàn lâm KHXH Việt Nam",
    bio: "Một trong những chuyên gia hàng đầu trong lĩnh vực tâm lý học ứng dụng tại Việt Nam, với hơn 30 năm kinh nghiệm giảng dạy, nghiên cứu và tư vấn chính sách.",
    photo: "/team/mai-huong.jpg",
  },
  {
    name: "TS. Đỗ Thị Lệ Hằng",
    title: "Chuyên gia Tâm lý & Nghiên cứu viên",
    titleSub:
      "Tiến sĩ Tâm lý học — Viện Xã hội học & Tâm lý học, Viện Hàn lâm KHXH Việt Nam",
    bio: "Trưởng phòng Tâm lý học Xã hội và Ứng dụng tại Viện Xã hội học và Tâm lý học. Cô có nhiều thành tựu trong lĩnh vực nghiên cứu khoa học với đa dạng chủ đề về thực trạng các vấn đề trong xã hội, các vấn đề của học sinh, vấn đề hôn nhân gia đình, người lao động…",
    photo: "/team/le-hang.jpg",
  },
  {
    name: "TS. Đào Thị Diệu Linh",
    title: "Cố vấn Khoa học",
    titleSub:
      "Tiến sĩ Tâm lý học — Trưởng khoa Tâm lý – Giáo dục khai phóng, Trường ĐH Ngoại ngữ, ĐHQGHN",
    bio: "Với 20+ năm kinh nghiệm trong lĩnh vực tâm lý học giáo dục, cô có nhiều đóng góp trong việc giảng dạy và nghiên cứu các chủ đề như phát triển tâm lý cá nhân, tâm lý học giáo dục, và hỗ trợ tâm lý học đường.",
    photo: "/team/dieu-linh.jpg",
  },
  {
    name: "TS. Nguyễn Hạnh Liên",
    title: "Cố vấn Khoa học",
    titleSub: "Tiến sĩ Tâm lý học — Khoa Tâm lý học, Trường ĐH KHXH&NV, ĐHQGHN",
    bio: "Giảng viên Khoa Tâm lý học USSH-VNU HN, Thư ký của NT-PSY. Cô có nhiều kinh nghiệm trong các lĩnh vực như giám sát thực hành tâm lý, đạo đức hành nghề, tâm lý học giao tiếp, tâm lý học đại cương và tâm lý học xã hội.",
    photo: "/team/hanh-lien.jpg",
  },
  {
    name: "TS. Nguyễn Thị Chính",
    title: "Chuyên gia Tham vấn & Trị liệu Cao cấp",
    titleSub: "Tiến sĩ Tâm lý học",
    bio: "15+ năm kinh nghiệm tham vấn trị liệu tâm lý, đồng sáng lập nên Trung tâm Tham vấn trị liệu SHARE. Cô cũng là chuyên gia tư vấn nhiều năm cho các tổ chức phi chính phủ (Plan International, World Vision, Quỹ Vì tầm vóc Việt,...) trong các dự án về giáo dục giới tính, kỹ năng sống và sức khỏe tâm thần.",
    photo: "/team/thi-chinh.jpg",
  },
];

const practitioners: Person[] = [
  {
    name: "ThS. Nguyễn Vân Anh",
    title: "Chuyên gia Tâm lý Trẻ em & Thanh thiếu niên",
    titleSub: "Thạc sĩ Tâm lý học trẻ em và thanh thiếu niên",
    bio: 'Dịch giả các sách tâm lý nổi tiếng: "Vắng cha, con trai lạc lối", "Liệu pháp tâm hồn"... Chị là nhà thực hành thôi miên nhân văn trị liệu có chứng chỉ, đồng thời là Cố vấn chuyên môn cho dự án về thôi miên trị liệu – House of Hypnosis Vietnam.',
    photo: "/team/van-anh.jpg",
  },
  {
    name: "ThS.BS. Nguyễn Khắc Dũng",
    title: "Chuyên gia Tâm thần học & Lâm sàng",
    titleSub: "Phó trưởng Khoa Lâm sàng — BV Tâm thần ban ngày Mai Hương",
    bio: "12+ năm kinh nghiệm lâm sàng trong lĩnh vực khám, tư vấn và điều trị các rối loạn tâm lý và tâm thần. Là đối tác chuyên môn với nhiều phòng khám, bệnh viện.",
    photo: "/team/khac-dung.jpg",
  },
];

const executives: Person[] = [
  {
    name: "ThS. Trần Thị Thu Thủy",
    title: "Sáng lập & Giám đốc Vận hành",
    titleEn: "Founder & Operations Director",
    bio: "Thạc sĩ Tâm lý học lâm sàng (định hướng ứng dụng) - Trường ĐH KHXH&NV, ĐHQGHN. Là người dẫn dắt sứ mệnh của Therapévo từ 2021. Tận tâm với việc mở rộng không gian sức khỏe tâm thần chuyên nghiệp và phát triển bền vững.",
  },
  {
    name: "ThS. Vương Yến Nhi",
    title: "Giám đốc Chuyên môn (CPO)",
    titleEn: "Chief Professional Officer",
    bio: "Thạc sĩ Tâm lý học lâm sàng Trẻ em và Thanh thiếu niên - Trường ĐH Giáo dục, ĐHQGHN. Chịu trách nhiệm đảm bảo tiêu chuẩn học thuật và lâm sàng của hệ sinh thái mà Therapévo luôn gây dựng.",
  },
];

const philosophies = [
  {
    num: "01",
    vi: "Khoa học",
    en: "Evidence-Based Practice",
    desc: "Mọi phương pháp đều dựa trên các khung lý thuyết tâm lý học được kiểm chứng và bằng chứng khoa học cập nhật.",
  },
  {
    num: "02",
    vi: "Nhân văn",
    en: "Humanistic & Empathetic",
    desc: "Tiếp cận lấy thân chủ làm trung tâm, không phán xét, không làm hại — tôn trọng thế giới nội tâm phong phú của mỗi cá nhân.",
  },
  {
    num: "03",
    vi: "Bền vững",
    en: "Connected & Sustainable",
    desc: "Cùng nhau xây dựng hệ sinh thái — người làm nghề, khách hàng và cộng đồng đều là những người đồng hành.",
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
  fontSize: "clamp(28px, 3vw, 40px)",
  fontWeight: 600,
  lineHeight: 1.2,
  letterSpacing: "-0.02em",
  color: "var(--app-foreground)",
  marginBottom: 56,
  whiteSpace: "nowrap",
};

function getInitials(name: string) {
  const parts = name.replace(/^(PGS\.|TS\.|ThS\.|BS\.|GS\.|\s)+/g, "").trim().split(" ");
  return parts.slice(-2).map((p) => p[0]).join("").toUpperCase();
}

function PhotoOrInitials({ person, size }: { person: Person; size: number }) {
  if (person.photo) {
    return (
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "1 / 1",
          borderRadius: "var(--radius)",
          overflow: "hidden",
          backgroundColor: "var(--app-secondary)",
          marginBottom: 20,
        }}
      >
        <Image
          src={person.photo}
          alt={person.name}
          fill
          sizes="(max-width: 900px) 100vw, 380px"
          style={{ objectFit: "cover", objectPosition: "center 20%" }}
        />
      </div>
    );
  }
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        backgroundColor: "var(--app-secondary)",
        color: "var(--app-primary)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--font-display)",
        fontSize: size * 0.32,
        fontWeight: 700,
        flexShrink: 0,
        letterSpacing: "-0.02em",
        marginBottom: 20,
      }}
    >
      {getInitials(person.name)}
    </div>
  );
}

function ExpertCard({ person }: { person: Person }) {
  return (
    <div
      style={{
        backgroundColor: "var(--app-card)",
        border: "1px solid var(--app-border)",
        borderRadius: "var(--radius)",
        padding: 24,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <PhotoOrInitials person={person} size={64} />
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 18,
          fontWeight: 600,
          color: "var(--app-foreground)",
          lineHeight: 1.3,
          marginBottom: 8,
        }}
      >
        {person.name}
      </div>
      <div
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: 13,
          fontWeight: 600,
          color: "var(--app-primary)",
          marginBottom: 4,
        }}
      >
        {person.title}
      </div>
      {person.titleSub && (
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 12,
            fontWeight: 300,
            color: "var(--app-muted-foreground)",
            lineHeight: 1.55,
            fontStyle: "italic",
            marginBottom: 12,
          }}
        >
          {person.titleSub}
        </div>
      )}
      <p
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: 13,
          fontWeight: 300,
          color: "var(--app-muted-foreground)",
          lineHeight: 1.7,
          margin: 0,
        }}
      >
        {person.bio}
      </p>
    </div>
  );
}

export const metadata = { title: "Đội ngũ thực hiện" };

export default function TeamPage() {
  return (
    <>
      <section
        style={{
          backgroundColor: "rgb(49,56,91)",
          paddingTop: 160,
          paddingBottom: 100,
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px" }}>
          <span style={{ ...SECTION_LABEL, color: "var(--app-accent)" }}>
            Đội ngũ thực hiện
          </span>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(36px, 5vw, 64px)",
              fontWeight: 600,
              lineHeight: 1.12,
              letterSpacing: "-0.02em",
              color: "#FAFAF8",
              maxWidth: 780,
              marginBottom: 28,
            }}
          >
            Những người kiến tạo Therapévo
          </h1>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 17,
              fontWeight: 300,
              color: "rgba(250,250,248,0.65)",
              lineHeight: 1.75,
              maxWidth: 620,
            }}
          >
            Nơi hội tụ những nhà chuyên môn, chuyên gia tâm lý học, nhà trị liệu thấu cảm và
            tâm huyết, cùng nhau đồng kiến tạo hệ sinh thái bền vững vì sự bình yên của tâm
            hồn người Việt.
          </p>
        </div>
      </section>

      <section
        style={{
          backgroundColor: "var(--app-background)",
          borderTop: "1px solid var(--app-border)",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 40px" }}>
          <span style={SECTION_LABEL}>Ban Cố vấn &amp; Bảo trợ Học thuật</span>
          <h2 style={H2}>Nền tảng khoa học và uy tín học thuật</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 24,
            }}
          >
            {advisors.map((a) => (
              <ExpertCard key={a.name} person={a} />
            ))}
          </div>
        </div>
      </section>

      <section
        style={{
          backgroundColor: "var(--app-muted)",
          borderTop: "1px solid var(--app-border)",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 40px" }}>
          <span style={SECTION_LABEL}>Đội ngũ Chuyên gia Trị liệu &amp; Tham vấn</span>
          <h2 style={H2}>Những nhà thực hành tận tâm</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 32,
              maxWidth: 860,
              margin: "0 auto",
            }}
          >
            {practitioners.map((p) => (
              <ExpertCard key={p.name} person={p} />
            ))}
          </div>
        </div>
      </section>

      <section
        style={{
          backgroundColor: "var(--app-background)",
          borderTop: "1px solid var(--app-border)",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 40px" }}>
          <span style={SECTION_LABEL}>Ban Điều hành</span>
          <h2 style={H2}>Những người dẫn dắt sứ mệnh</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 32,
              maxWidth: 860,
              margin: "0 auto",
            }}
          >
            {executives.map((ex) => (
              <div
                key={ex.name}
                style={{
                  backgroundColor: "var(--app-card)",
                  border: "1px solid var(--app-border)",
                  borderTop: "3px solid var(--app-primary)",
                  borderRadius: "var(--radius)",
                  padding: "36px 32px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
                <div
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: "50%",
                    backgroundColor: "var(--app-secondary)",
                    color: "var(--app-primary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-display)",
                    fontSize: 24,
                    fontWeight: 700,
                    marginBottom: 8,
                  }}
                >
                  {getInitials(ex.name)}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 20,
                    fontWeight: 600,
                    color: "var(--app-foreground)",
                    lineHeight: 1.3,
                  }}
                >
                  {ex.name}
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: 14,
                      fontWeight: 600,
                      color: "var(--app-primary)",
                      marginBottom: 2,
                    }}
                  >
                    {ex.title}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: 12,
                      color: "var(--app-muted-foreground)",
                      fontStyle: "italic",
                    }}
                  >
                    {ex.titleEn}
                  </div>
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 14,
                    fontWeight: 300,
                    color: "var(--app-muted-foreground)",
                    lineHeight: 1.72,
                    marginTop: 4,
                  }}
                >
                  {ex.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        style={{
          backgroundColor: "var(--app-secondary)",
          borderTop: "1px solid var(--app-border)",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 40px" }}>
          <span style={SECTION_LABEL}>Triết lý Đồng hành</span>
          <h2 style={H2}>Ba giá trị dẫn đường</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 24,
            }}
          >
            {philosophies.map((ph) => (
              <div key={ph.num} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <span
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 11,
                    fontWeight: 600,
                    color: "var(--app-muted-foreground)",
                    letterSpacing: "0.1em",
                  }}
                >
                  {ph.num}
                </span>
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: 26,
                      fontWeight: 600,
                      color: "var(--app-primary)",
                      letterSpacing: "-0.01em",
                      marginBottom: 4,
                    }}
                  >
                    {ph.vi}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: 12,
                      color: "var(--app-muted-foreground)",
                      fontStyle: "italic",
                      marginBottom: 14,
                    }}
                  >
                    {ph.en}
                  </div>
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 14,
                    fontWeight: 300,
                    color: "var(--app-muted-foreground)",
                    lineHeight: 1.72,
                  }}
                >
                  {ph.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        style={{
          backgroundColor: "var(--app-foreground)",
          borderTop: "1px solid var(--app-border)",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "100px 40px",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(28px, 3.5vw, 44px)",
              fontWeight: 600,
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
              color: "#FAFAF8",
              marginBottom: 20,
            }}
          >
            Bạn muốn đồng hành cùng chúng tôi?
          </h2>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 16,
              fontWeight: 300,
              color: "rgba(250,250,248,0.6)",
              lineHeight: 1.7,
              maxWidth: 520,
              margin: "0 auto 40px",
            }}
          >
            Trở thành một phần của hệ sinh thái hoặc đặt lịch tham vấn với chuyên gia phù
            hợp ngay hôm nay.
          </p>
          <div
            style={{
              display: "flex",
              gap: 16,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <a
              href="#contact"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 14,
                fontWeight: 500,
                color: "var(--app-foreground)",
                backgroundColor: "#FAFAF8",
                padding: "14px 28px",
                borderRadius: "var(--radius)",
                textDecoration: "none",
              }}
            >
              Gia nhập Mạng lưới Người làm nghề
            </a>
            <a
              href="https://www.facebook.com/share/1Cw3DeDiuN/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 14,
                fontWeight: 500,
                color: "#FAFAF8",
                backgroundColor: "var(--app-primary)",
                padding: "14px 28px",
                borderRadius: "var(--radius)",
                textDecoration: "none",
              }}
            >
              Tìm Chuyên gia Phù hợp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
