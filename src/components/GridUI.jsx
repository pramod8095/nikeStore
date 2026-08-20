import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CONFIG } from "./grid/gridConfig";

const islandTransition = {
  type: "spring",
  stiffness: 420,
  damping: 30,
  mass: 0.8,
};

const fastSpring = {
  type: "spring",
  stiffness: 520,
  damping: 28,
  mass: 0.55,
};

const collections = ["Nike", "New Balance", "Under $150"];

const nikeFilters = [
  {
    id: "all",
    label: "All",
  },
  {
    id: "jordan",
    label: "Jordan",
  },
  {
    id: "dunk",
    label: "Dunk",
  },
];

export function UnifiedControlBar({
  currentCollection,
  onSwitch,
  setZoomTrigger,
  isZoomedIn,
  hasActiveSelection,
  nikeFilter,
  onFilterChange,
}) {
  const collectionLabel =
    collections[currentCollection] ?? collections[0];

  return (
    <>
      <div
        className="control-bar-container"
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: "34px",
          zIndex: 100,
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
          pointerEvents: "none",
          padding: "0 16px",
        }}
      >
        <motion.div
          className="control-bar-island"
          layout
          transition={islandTransition}
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            minWidth: "fit-content",
            height: "58px",
            padding: "6px",

            borderRadius: "30px",

            background:
              "linear-gradient( 145deg, rgba(255,255,255,0.90) 0%, rgba(248,248,245,0.82) 55%, rgba(238,237,233,0.78) 100%)",

            border: "1px solid rgba(255,255,255,0.74)",

            boxShadow:
              "0 20px 55px rgba(26,48,42,0.16), 0 4px 14px rgba(26,48,42,0.08), inset 0 1px 0 rgba(255,255,255,0.92), inset 0 -1px 0 rgba(20,40,34,0.05)",

            backdropFilter: "blur(28px) saturate(150%)",

            WebkitBackdropFilter:
              "blur(28px) saturate(150%)",

            pointerEvents: "auto",

            overflow: "hidden",

            isolation: "isolate",
          }}
        >
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "inherit",
              pointerEvents: "none",
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.22), transparent 5%)",
            }}
          />

          <motion.div
            aria-hidden="true"
            layout
            style={{
              position: "absolute",
              top: "-42px",
              left: "50%",
              width: "170px",
              height: "100px",
              transform: "translateX(-50%)",
              borderRadius: "50%",
              background:
                "radial-gradient(circle,rgba(255,255,255,0.65),transparent 72%)",
              filter: "blur(18px)",
              pointerEvents: "none",
            }}
            animate={{
              opacity: hasActiveSelection ? 1 : 0.65,
            }}
            transition={{
              duration: 0.35,
            }}
          />

          <AnimatePresence mode="popLayout" initial={false}>
            {hasActiveSelection ? (
              <motion.div
                key="buy-mode"
                layout
                initial={{
                  opacity: 0,
                  scale: 0.86,
                  filter: "blur(8px)",
                  x: 12,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  filter: "blur(0px)",
                  x: 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.86,
                  filter: "blur(8px)",
                  x: -12,
                }}
                transition={{
                  ...islandTransition,
                  opacity: {
                    duration: 0.18,
                  },
                }}
              >
                <BuyButton />
              </motion.div>
            ) : isZoomedIn ? (
              <motion.div
                key="zoom-mode"
                layout
                initial={{
                  opacity: 0,
                  scale: 0.75,
                  filter: "blur(8px)",
                  x: -10,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  filter: "blur(0px)",
                  x: 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.75,
                  filter: "blur(8px)",
                  x: 10,
                }}
                transition={{
                  ...islandTransition,
                  opacity: {
                    duration: 0.18,
                  },
                }}
              >
                <ControlButton
                  icon="remove"
                  label="Zoom out"
                  onClick={() => setZoomTrigger("OUT")}
                />
              </motion.div>
            ) : (
              <motion.div
                key="normal-mode"
                layout
                initial={{
                  opacity: 0,
                  scale: 0.92,
                  filter: "blur(6px)",
                  y: 4,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  filter: "blur(0px)",
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.92,
                  filter: "blur(6px)",
                  y: -4,
                }}
                transition={{
                  ...islandTransition,
                  opacity: {
                    duration: 0.18,
                  },
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <ControlButton
                  icon="add"
                  label="Zoom in"
                  onClick={() =>
                    setZoomTrigger(CONFIG.zoomIn)
                  }
                />

                <Divider />

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "2px",
                    color:"white"
                  }}
                >
                  {collections.map((name, index) => (
                    <TabButton
                      key={name}
                      isActive={currentCollection === index}
                      onClick={() => onSwitch(index)}
                    >
                      {name}
                    </TabButton>
                  ))}
                </div>

                <AnimatePresence initial={false}>
                  {currentCollection === 0 && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        width: 0,
                        filter: "blur(5px)",
                      }}
                      animate={{
                        opacity: 1,
                        width: "auto",
                        filter: "blur(0px)",
                      }}
                      exit={{
                        opacity: 0,
                        width: 0,
                        filter: "blur(5px)",
                      }}
                      transition={islandTransition}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        overflow: "hidden",
                      }}
                    >
                      <Divider compact />

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "3px",
                          paddingLeft: "2px",
                        }}
                      >
                        {nikeFilters.map((filter) => (
                          <FilterChip
                            key={filter.id}
                            isActive={
                              nikeFilter === filter.id
                            }
                            onClick={() =>
                              onFilterChange(filter.id)
                            }
                            layoutGroup="desktop"
                          >
                            {filter.label}
                          </FilterChip>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>

          {!hasActiveSelection && (
            <motion.div
              className="desktop-status-dot"
              initial={{
                opacity: 0,
                scale: 0,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                delay: 0.15,
                ...fastSpring,
              }}
              style={{
                width: "6px",
                height: "6px",
                marginLeft: "5px",
                marginRight: "3px",
                borderRadius: "50%",
                background: "#F2F0EF",
                boxShadow: "0 0 10px rgba(63,167,155,0.48)",
                flexShrink: 0,
              }}
            />
          )}
        </motion.div>

        <AnimatePresence>
          {currentCollection === 0 &&
            !isZoomedIn &&
            !hasActiveSelection && (
              <motion.div
                className="mobile-filters"
                initial={{
                  opacity: 0,
                  y: 12,
                  scale: 0.96,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  y: 12,
                  scale: 0.96,
                }}
                transition={islandTransition}
                style={{
                  position: "absolute",
                  bottom: "68px",
                  left: 0,
                  right: 0,
                  display: "none",
                  justifyContent: "center",
                  pointerEvents: "none",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "3px",
                    padding: "5px",

                    borderRadius: "18px",

                    background: "rgba(247,250,248,0.84)",

                    border:
                      "1px solid #111111",

                    boxShadow:
                      "0 14px 32px rgba(25,48,42,0.14), inset 0 1px 0 rgba(255,255,255,0.9)",

                    backdropFilter:
                      "blur(24px) saturate(140%)",

                    WebkitBackdropFilter:
                      "blur(24px) saturate(140%)",

                    pointerEvents: "auto",
                  }}
                >
                  {nikeFilters.map((filter) => (
                    <FilterChip
                      key={`mobile-${filter.id}`}
                      isActive={nikeFilter === filter.id}
                      onClick={() =>
                        onFilterChange(filter.id)
                      }
                      layoutGroup="mobile"
                    >
                      {filter.label}
                    </FilterChip>
                  ))}
                </div>
              </motion.div>
            )}
        </AnimatePresence>
      </div>

      <style>{`
        .control-bar-container {
          transition:
            bottom 0.35s cubic-bezier(0.16, 0.84, 0.25, 1),
            transform 0.35s cubic-bezier(0.16, 0.84, 0.25, 1);
        }

        .control-bar-island {
          transform: translateZ(0);
        }

        .desktop-filters {
          display: flex;
          align-items: center;
        }

        .mobile-filters {
          display: none !important;
        }

        @media (max-height: 800px) {
          .control-bar-container {
            bottom: 24px !important;
          }

          .control-bar-island {
            height: 52px !important;
            border-radius: 27px !important;
          }
        }

        @media (max-height: 650px) {
          .control-bar-container {
            bottom: 16px !important;
          }

          .control-bar-island {
            height: 48px !important;
            border-radius: 25px !important;
          }
        }

        @media (max-width: 768px) {
          .control-bar-container {
            bottom: 18px !important;
            padding: 0 12px !important;
          }

          .control-bar-island {
            max-width: calc(100vw - 24px);
            height: 50px !important;
            border-radius: 26px !important;
          }

          .desktop-filters {
            display: none !important;
          }

          .mobile-filters {
            display: flex !important;
          }

          .desktop-status-dot {
            display: none;
          }
        }

        @media (max-width: 560px) {
          .control-bar-island {
            width: auto !important;
            max-width: calc(100vw - 20px);
            height: 48px !important;
            padding: 5px !important;
          }
        }

        @media (max-width: 430px) {
          .control-bar-container {
            bottom: 14px !important;
          }

          .control-bar-island {
            height: 46px !important;
            border-radius: 24px !important;
            padding: 4px !important;
          }
        }

        @media (max-width: 360px) {
          .control-bar-island {
            transform: scale(0.96);
            transform-origin: bottom center;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .control-bar-container,
          .control-bar-island {
            transition: none !important;
          }
        }
      `}</style>
    </>
  );
}

function BuyButton() {
  return (
    <motion.button
      layout="position"
      type="button"
      whileHover={{
        scale: 1.025,
      }}
      whileTap={{
        scale: 0.96,
      }}
      transition={fastSpring}
      style={{
        position: "relative",
        height: "44px",
        padding: "0 22px",
        border: "1px solid rgba(255,255,255,0.10)",
        borderRadius: "23px",
        background:
          "linear-gradient(135deg, #143F3E, #0A5A57)",
        color: "#F7FAF8",
        fontSize: "13px",
        fontWeight: "600",
        letterSpacing: "0.01em",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        whiteSpace: "nowrap",
        boxShadow:
          "0 8px 22px rgba(7,55,53,0.24), inset 0 1px 0 rgba(255,255,255,0.18)",
        overflow: "hidden",
      }}
    >
      <motion.span
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(100deg, transparent 30%, rgba(255,255,255,0.20) 50%, transparent 70%)",
        }}
        animate={{
          x: ["-120%", "140%"],
        }}
        transition={{
          duration: 2.8,
          repeat: Infinity,
          repeatDelay: 2,
          ease: "linear",
        }}
      />

      <span
        style={{
          position: "relative",
          zIndex: 1,
        }}
      >
        Buy Now
      </span>

      <span
        style={{
          position: "relative",
          zIndex: 1,
          marginLeft: "8px",
          fontSize: "11px",
          opacity: 0.72,
        }}
      >
        ↗
      </span>
    </motion.button>
  );
}

function Divider({ compact = false }) {
  return (
    <motion.div
      layout
      initial={{
        opacity: 0,
        scaleY: 0,
      }}
      animate={{
        opacity: 1,
        scaleY: 1,
      }}
      transition={{
        duration: 0.24,
      }}
      style={{
        width: "1px",
        height: compact ? "22px" : "26px",
        margin: compact ? "0 4px" : "0 5px",
        background: "rgba(24,43,38,0.10)",
        boxShadow: "0 0 1px rgba(255,255,255,0.75)",
        transformOrigin: "center",
        flexShrink: 0,
      }}
    />
  );
}

function ControlButton({ onClick, icon, label }) {
  return (
    <motion.button
      layout="position"
      type="button"
      onClick={onClick}
      aria-label={label}
      className="control-button"
      whileHover={{
        scale: 1.06,
      }}
      whileTap={{
        scale: 0.9,
      }}
      transition={fastSpring}
      style={{
        position: "relative",
        width: "44px",
        height: "44px",
        flexShrink: 0,
        border: "none",
        borderRadius: "50%",
        background: "rgba(255,255,255,0.24)",
        color: "#20302B",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        outline: "none",
      }}
    >
      <motion.span
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 35% 28%, rgba(255,255,255,0.42), transparent 58%)",
          opacity: 0.6,
        }}
        whileHover={{
          opacity: 1,
        }}
      />

      <span
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon === "add" ? (
          <svg
            width="19"
            height="19"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.3"
            strokeLinecap="round"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        ) : (
          <svg
            width="19"
            height="19"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.3"
            strokeLinecap="round"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        )}
      </span>
    </motion.button>
  );
}

function TabButton({ children, isActive, onClick }) {
  return (
    <motion.button
      layout
      type="button"
      onClick={onClick}
      className="tab-button"
      whileHover={{
        y: -1,
      }}
      whileTap={{
        scale: 0.95,
      }}
      transition={fastSpring}
      style={{
        position: "relative",
        minHeight: "44px",
        padding: "0 13px",
        border: "none",
        borderRadius: "22px",
        background: "transparent",
        color: isActive ? "white" : "#72807B",
        fontSize: "12px",
        fontWeight: isActive ? "650" : "500",
        letterSpacing: "-0.01em",
        cursor: "pointer",
        whiteSpace: "nowrap",
        zIndex: 1,
        outline: "none",
      }}
    >
      {isActive && (
        <motion.span
          layoutId="collection-active"
          transition={islandTransition}
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "22px",
            background: "#111111",
            border: "1px solid #111111",
            boxShadow:
              "0 4px 12px rgba(32,55,48,0.08), inset 0 1px 0 rgba(255,255,255,0.8)",
            zIndex: -1,
          }}
        />
      )}

      <span
        style={{
          position: "relative",
          zIndex: 2,
        }}
      >
        {children}
      </span>

      {isActive && (
        <motion.span
          layoutId="collection-dot"
          transition={fastSpring}
          style={{
            position: "absolute",
            bottom: "6px",
            left: "50%",
            width: "3px",
            height: "3px",
            borderRadius: "50%",
            background: "#F2F0EF",
            transform: "translateX(-50%)",
            boxShadow: "0 0 7px rgba(63,167,155,0.45)",
          }}
        />
      )}
    </motion.button>
  );
}

function FilterChip({
  children,
  isActive,
  onClick,
  layoutGroup = "default",
}) {
  return (
    <motion.button
      layout
      type="button"
      onClick={onClick}
      className="filter-chip"
      whileHover={{
        y: -1,
      }}
      whileTap={{
        scale: 0.94,
      }}
      transition={fastSpring}
      style={{
        position: "relative",
        minHeight: "32px",
        padding: "0 10px",
        border: "none",
        borderRadius: "16px",
        background: "transparent",
        color: isActive ? "#EDF5F2" : "#76847F",
        fontSize: "11px",
        fontWeight: isActive ? "600" : "500",
        cursor: "pointer",
        whiteSpace: "nowrap",
        zIndex: 1,
        outline: "none",
      }}
    >
      {isActive && (
        <motion.span
          layoutId={`filter-active-${layoutGroup}`}
          transition={islandTransition}
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "16px",
            background:
              "linear-gradient(135deg, #214B49, #176A64)",
            boxShadow:
              "0 4px 12px rgba(26,73,69,0.20), inset 0 1px 0 rgba(255,255,255,0.12)",
            zIndex: -1,
          }}
        />
      )}

      {!isActive && (
        <motion.span
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "16px",
            background: "rgba(30,55,48,0.035)",
            zIndex: -1,
          }}
          whileHover={{
            background: "rgba(30,55,48,0.07)",
          }}
        />
      )}

      <span
        style={{
          position: "relative",
          zIndex: 2,
        }}
      >
        {children}
      </span>
    </motion.button>
  );
}
