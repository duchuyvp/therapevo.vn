"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { label: "VỀ CHÚNG TÔI", href: "/#about", hash: true },
  { label: "HOẠT ĐỘNG & DỊCH VỤ", href: "/services", hash: false },
  { label: "THƯ VIỆN TÂM LÝ", href: "/blog", hash: false },
  { label: "ĐỘI NGŨ THỰC HIỆN", href: "/doi-ngu", hash: false },
];

const DARK_PAGES = new Set(["/doi-ngu", "/services"]);

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isDarkPage = DARK_PAGES.has(pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <header
      className={`site-header${isDarkPage ? " site-header-dark" : ""}`}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        backgroundColor: scrolled || menuOpen
          ? isDarkPage
            ? "rgba(13,30,60,0.96)"
            : "rgba(250,250,248,0.96)"
          : "transparent",
        borderBottom:
          scrolled || menuOpen ? "1px solid var(--app-border)" : "1px solid transparent",
        backdropFilter: scrolled || menuOpen ? "blur(12px)" : "none",
        transition: "background-color 0.3s ease, border-color 0.3s ease",
      }}
    >
      <div
        className="site-header-inner"
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 88,
        }}
      >
        <Link
          className="site-header-logo"
          href="/"
          style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/figma/logo-therapevo.png"
            alt="Therapévo Việt Nam logo"
            style={{
              height: 56,
              width: "auto",
              objectFit: "contain",
              filter: isDarkPage ? "brightness(0) invert(1)" : "none",
            }}
          />
        </Link>

        <button
          type="button"
          className="site-menu-toggle"
          aria-label={menuOpen ? "Đóng menu" : "Mở menu"}
          aria-expanded={menuOpen}
          aria-controls="site-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav
          id="site-navigation"
          className={`site-navigation${menuOpen ? " is-open" : ""}`}
          style={{ display: "flex", alignItems: "center", gap: 36 }}
        >
          {links.map((l) => {
            const linkStyle: React.CSSProperties = {
              fontFamily: "var(--font-sans)",
              fontSize: 14,
              fontWeight: 400,
              color: isDarkPage ? "#FFFFFF" : "var(--app-foreground)",
              textDecoration: "none",
              letterSpacing: "0.01em",
              opacity: 0.7,
              transition: "opacity 0.2s",
            };
            return l.hash ? (
              <a
                key={l.label}
                href={l.href}
                style={linkStyle}
                onClick={() => setMenuOpen(false)}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.7")}
              >
                {l.label}
              </a>
            ) : (
              <Link
                key={l.label}
                href={l.href}
                style={linkStyle}
                onClick={() => setMenuOpen(false)}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.opacity = "1")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.opacity = "0.7")
                }
              >
                {l.label}
              </Link>
            );
          })}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 13,
              fontWeight: 500,
              color: "var(--app-primary-foreground)",
              backgroundColor: "var(--app-primary)",
              padding: "9px 22px",
              borderRadius: "var(--radius)",
              textDecoration: "none",
              letterSpacing: "0.02em",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            ĐĂNG KÝ TƯ VẤN
          </a>
        </nav>
      </div>
    </header>
  );
}
