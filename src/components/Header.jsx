import React from "react";
import Logo from "../assests/logo.png";
import Image from "next/image";

export default function Header() {
  return (
    <header
      className="site-header"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: "20px 32px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        pointerEvents: "none",
      }}
    >
      <Image
        src={Logo}
        href="#"
        alt="Pramod Archives"
        width={200}
        height={200}
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          pointerEvents: "auto",
          color:"black"
        }}
      >
        {" "}
        Pramod Archives
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <span
              style={{
                fontFamily:
                  "'Helvetica Neue', Helvetica, Arial, sans-serif",
                fontSize: "15px",
                fontWeight: "700",
                letterSpacing: "0.12em",
                color: "#000",
                textTransform: "uppercase",
              }}
            >
              MY PERFECT PAIR&apos;S
            </span>
          </div>
        </div>
      </div>
      <div
        className="header-nav"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "24px",
          pointerEvents: "auto",
        }}
      ></div>
      <style>{`
        @media (max-width: 600px) {
          .site-header {
            padding: 16px 20px !important;
          }
          .header-nav {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}

function NavItem({ label, number }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "baseline",
        gap: "6px",
        cursor: "pointer",
        opacity: 0.6,
        transition: "opacity 0.2s ease",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.opacity = 1)
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.opacity = 0.6)
      }
    >
      <span
        style={{
          fontFamily:
            "'Helvetica Neue', Helvetica, Arial, sans-serif",
          fontSize: "9px",
          fontWeight: "400",
          color: "#999",
        }}
      >
        {number}
      </span>
      <span
        style={{
          fontFamily:
            "'Helvetica Neue', Helvetica, Arial, sans-serif",
          fontSize: "11px",
          fontWeight: "500",
          letterSpacing: "0.08em",
          color: "#000",
        }}
      >
        {label}
      </span>
    </div>
  );
}
