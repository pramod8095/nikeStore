import React from "react";
import { motion } from "framer-motion";

const GITHUB_URL =
  "https://github.com/pramod8095/nikeStore";

export default function SneakerFooter() {
  return (
    <motion.footer
      className="sneaker-footer"
      initial={{
        opacity: 0,
        y: 30,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.8,
        delay: 0.3,
        ease: [0.16, 0.84, 0.25, 1],
      }}
      style={{
        position: "fixed",
        left: "0",
        bottom: "35px",
        zIndex: 80,
        transform: "translateX(-50%)",
        width: "min(92vw, 520px)",
        pointerEvents: "auto",
      }}
    >
      <motion.a
        href={GITHUB_URL}
        target="_blank"
        rel="noreferrer"
        aria-label="View Nike Store source on GitHub"
        whileHover="hover"
        whileTap={{
          scale: 0.98,
        }}
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",

          width: "100%",
          minHeight: "52px",
          padding: "8px 10px 8px 16px",

          borderRadius: "28px",

          textDecoration: "none",

          color: "#111111",

          background:
            "linear-gradient(145deg, rgba(255,255,255,0.82), rgba(242,241,237,0.76))",

          border: "1px solid rgba(17,17,17,0.07)",

          boxShadow:
            "0 16px 45px rgba(17,17,17,0.10), 0 3px 12px rgba(17,17,17,0.05), inset 0 1px 0 rgba(255,255,255,0.95)",

          backdropFilter: "blur(24px) saturate(150%)",

          WebkitBackdropFilter: "blur(24px) saturate(150%)",

          overflow: "hidden",
        }}
      >
        {/* ==================================================
            MOVING LIGHT
           ================================================== */}

        <motion.span
          aria-hidden="true"
          variants={{
            hover: {
              x: ["-120%", "140%"],
            },
          }}
          transition={{
            duration: 0.75,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            top: "-40%",
            left: 0,
            width: "28%",
            height: "180%",

            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.62), transparent)",

            filter: "blur(10px)",

            transform: "rotate(14deg)",

            pointerEvents: "none",
          }}
        />

        {/* ==================================================
            LEFT CONTENT
           ================================================== */}

        <div
          style={{
            position: "relative",
            zIndex: 2,
            display: "flex",
            alignItems: "center",
            gap: "11px",
            minWidth: 0,
          }}
        >
          {/* Github icon */}
          <motion.div
            variants={{
              hover: {
                rotate: 8,
                scale: 1.08,
              },
            }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 20,
            }}
            style={{
              width: "30px",
              height: "30px",
              flexShrink: 0,
              display: "grid",
              placeItems: "center",
              borderRadius: "50%",
              background: "#111111",
              color: "#FFFFFF",
              boxShadow: "0 5px 14px rgba(17,17,17,0.16)",
            }}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M12 2C6.48 2 2 6.58 2 12.21C2 16.72 4.87 20.54 8.84 21.9C9.34 22 9.52 21.68 9.52 21.4C9.52 21.15 9.51 20.52 9.51 19.67C6.73 20.3 6.14 18.29 6.14 18.29C5.68 17.1 5.02 16.79 5.02 16.79C4.11 16.15 5.09 16.16 5.09 16.16C6.1 16.23 6.63 17.23 6.63 17.23C7.53 18.81 8.98 18.36 9.53 18.08C9.62 17.39 9.88 16.91 10.17 16.63C7.95 16.37 5.62 15.51 5.62 11.69C5.62 10.6 6 9.71 6.62 9.01C6.51 8.74 6.18 7.7 6.72 6.34C6.72 6.34 7.53 6.07 9.49 7.43C10.28 7.2 11.13 7.09 12 7.09C12.87 7.09 13.72 7.2 14.51 7.43C16.47 6.07 17.28 6.34 17.28 6.34C17.82 7.7 17.49 8.74 17.38 9.01C18 9.71 18.38 10.6 18.38 11.69C18.38 15.52 16.04 16.36 13.81 16.63C14.17 16.95 14.48 17.57 14.48 18.53C14.48 19.9 14.47 21 14.47 21.4C14.47 21.68 14.65 22 15.16 21.9C19.13 20.54 22 16.72 22 12.21C22 6.58 17.52 2 12 2Z"
                fill="currentColor"
              />
            </svg>
          </motion.div>

          <div
            style={{
              minWidth: 0,
            }}
          >
            <div
              style={{
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                lineHeight: 1.1,
                whiteSpace: "nowrap",
              }}
            >
              Nike Store
            </div>

            <div
              style={{
                marginTop: "3px",
                fontFamily:
                  "ui-monospace, SFMono-Regular, Menlo, monospace",
                fontSize: "8px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#7A7B77",
                whiteSpace: "nowrap",
              }}
            >
              Open source / 3D experiment
            </div>
          </div>
        </div>

        {/* ==================================================
            RIGHT CTA
           ================================================== */}

        <motion.div
          variants={{
            hover: {
              x: 2,
            },
          }}
          transition={{
            type: "spring",
            stiffness: 420,
            damping: 24,
          }}
          style={{
            position: "relative",
            zIndex: 2,
            display: "flex",
            alignItems: "center",
            gap: "9px",
            flexShrink: 0,

            padding: "8px 11px",

            borderRadius: "20px",

            background: "#111111",
            color: "#FFFFFF",

            boxShadow: "0 6px 18px rgba(17,17,17,0.14)",
          }}
        >
          <span
            style={{
              fontFamily:
                "ui-monospace, SFMono-Regular, Menlo, monospace",
              fontSize: "8px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}
          >
            View Source
          </span>

          <motion.span
            variants={{
              hover: {
                x: 3,
                y: -2,
              },
            }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 20,
            }}
            style={{
              fontSize: "12px",
              lineHeight: 1,
            }}
          >
            ↗
          </motion.span>
        </motion.div>

        {/* ==================================================
            EDGE HIGHLIGHT
           ================================================== */}

        <motion.span
          aria-hidden="true"
          variants={{
            hover: {
              opacity: 1,
            },
          }}
          transition={{
            duration: 0.2,
          }}
          style={{
            position: "absolute",
            left: "16px",
            right: "16px",
            top: 0,
            height: "1px",

            background:
              "linear-gradient(90deg, transparent, rgba(17,17,17,0.16), transparent)",

            opacity: 0.35,

            pointerEvents: "none",
          }}
        />
      </motion.a>

      <style>{`
        @media (max-width: 640px) {
          .sneaker-footer {
            bottom: 12px !important;
            width: calc(100vw - 24px) !important;
          }
        }

        @media (max-width: 430px) {
          .sneaker-footer {
            bottom: 10px !important;
          }

          .sneaker-footer a {
            min-height: 48px !important;
            padding-left: 12px !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .sneaker-footer * {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </motion.footer>
  );
}
