import type { Metadata } from "next";
import "@fontsource-variable/playfair-display";
import "@fontsource-variable/playfair-display/wght-italic.css";
import "@fontsource-variable/noto-sans";
import "@fontsource-variable/noto-sans/wght-italic.css";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "Therapévo Việt Nam | Be kind to your mind",
    template: "%s | Therapévo Việt Nam",
  },
  description:
    "Kiến tạo hệ sinh thái chăm sóc sức khỏe tinh thần toàn diện cho người Việt.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
