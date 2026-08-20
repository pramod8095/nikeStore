import React, {
  useMemo,
  useState,
  useEffect,
  Suspense,
} from "react";
import { Canvas } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { Leva } from "leva";
import shoes from "../../../backend/shoes.json";
import MiniMap from "../MiniMap";
import { DEFAULT_CONFIG, CONFIG } from "./gridConfig";
import {
  rigState,
  calculateGridDimensions,
  EMPTY_COLORS,
  matchesFilter,
} from "./gridState";
import { useGridConfig } from "./useGridConfig";
import { Rig } from "./Rig";
import { GridCanvas } from "./GridCanvas";
import { UnifiedControlBar } from "../GridUI";
import Header from "../Header";
import { TopologyBackground } from "../TopologyBackground";
import "../HoloCardMaterial";

shoes.forEach((shoe) => {
  useTexture.preload(shoe.image_url);
});

export default function ShoeGrid() {
  const [zoomTarget, setZoomTarget] = useState(null);
  const [initialZoom] = useState(DEFAULT_CONFIG.zoomOut);
  const [currentZoom, setCurrentZoom] = useState(
    rigState.zoom
  );
  const controls = useGridConfig();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentZoom(rigState.zoom);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const [hasActiveSelection, setHasActiveSelection] =
    useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setHasActiveSelection(rigState.activeId !== null);
    }, 16);
    return () => clearInterval(interval);
  }, []);
  const isZoomedIn = currentZoom <= CONFIG.zoomIn + 0.5;

  useEffect(() => {
    const updateResponsiveZoom = () => {
      const width = window.innerWidth;
      let newZoomOut;
      if (width < 480) {
        newZoomOut = 48;
      } else if (width < 768) {
        newZoomOut = 38;
      } else {
        newZoomOut = DEFAULT_CONFIG.zoomOut;
      }
      CONFIG.zoomOut = newZoomOut;

      if (rigState.zoom > CONFIG.zoomIn + 2) {
        rigState.zoom = newZoomOut;
        setCurrentZoom(newZoomOut);
      }
    };
    updateResponsiveZoom();
    window.addEventListener("resize", updateResponsiveZoom);
    return () =>
      window.removeEventListener(
        "resize",
        updateResponsiveZoom
      );
  }, []);

  const [nikeFilter, setNikeFilter] = useState("all"); // 'all' | 'jordan' | 'dunk'
  const [colorFilter, setColorFilter] =
    useState(EMPTY_COLORS); // [] = all, ['blue','green'] = blue OR green

  const collectionsData = useMemo(() => {
    const nike = shoes.filter((s) => s.brand === "Nike");

    const newBalanceFull = shoes.filter(
      (s) => s.brand === "New Balance"
    );
    const newBalanceHalf = newBalanceFull.slice(
      0,
      Math.ceil(newBalanceFull.length / 2)
    );
    const newBalance = [
      ...newBalanceHalf,
      ...newBalanceHalf.map((s, i) => ({
        ...s,
        product_url: `${s.product_url}-dup-${i}`,
      })),
    ];

    const budget = shoes.filter((s) => {
      const price = parseInt(
        s.price?.replace(/[$,]/g, "") || "999"
      );
      return price < 150;
    });
    return [nike, newBalance, budget];
  }, []);

  const [gridLayers, setGridLayers] = useState(() => [
    {
      id: "init",
      items: shoes.filter((s) => s.brand === "Nike"),
      mode: "enter",
      startTime: 0,
    },
  ]);
  const [activeCollectionIdx, setActiveCollectionIdx] =
    useState(0);
  const handleCollectionSwitch = (index) => {
    if (index === activeCollectionIdx) return;
    const now = Date.now();
    setGridLayers((prev) => {
      const exitingLayers = prev.map((layer) =>
        layer.mode === "enter"
          ? { ...layer, mode: "exit", startTime: now }
          : layer
      );

      const newLayer = {
        id: `grid-${index}-${now}`,
        items: collectionsData[index],
        mode: "enter",
        startTime: now,
      };
      return [...exitingLayers, newLayer];
    });
    setActiveCollectionIdx(index);

    setNikeFilter("all");
    setColorFilter(EMPTY_COLORS);
    rigState.target.set(0, 2, 0);
    rigState.activeId = null;

    setTimeout(() => {
      setGridLayers((prev) =>
        prev.filter((layer) => layer.mode === "enter")
      );
    }, CONFIG.cleanupTimeout);
  };

  const handleFilterChange = (filter) => {
    if (filter === nikeFilter) return;
    setNikeFilter(filter);
    rigState.activeId = null;
  };

  const handleColorFilterChange = (colors) => {
    setColorFilter(
      colors.length > 0 ? colors : EMPTY_COLORS
    );
    rigState.activeId = null;
  };

  useEffect(() => {
    if (zoomTarget === "OUT") {
      rigState.zoom = CONFIG.zoomOut;
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCurrentZoom(CONFIG.zoomOut);
      rigState.target.set(0, 2, 0);
    } else if (typeof zoomTarget === "number") {
      rigState.zoom = zoomTarget;
      setCurrentZoom(zoomTarget);
    }
    setZoomTarget(null);
  }, [zoomTarget]);

  const activeLayer = gridLayers[gridLayers.length - 1];

  const filteredItemCount = useMemo(() => {
    if (activeCollectionIdx !== 0)
      return activeLayer.items.length;
    return activeLayer.items.filter((item) =>
      matchesFilter(item, nikeFilter, colorFilter)
    ).length;
  }, [
    activeLayer.items,
    activeCollectionIdx,
    nikeFilter,
    colorFilter,
  ]);

  const activeDims = calculateGridDimensions(
    filteredItemCount
  );

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: `
    radial-gradient(
      circle at 50% 18%,
      rgba(255,255,255,0.96) 0%,
      rgba(255,255,255,0.72) 22%,
      transparent 55%
    ),
    linear-gradient(
      180deg,
      #F8F8F5 0%,
      #F2F1ED 58%,
      #E9E8E3 100%
    )
  `,
        position: "relative",
        overflow: "hidden",
        touchAction: "none",
      }}
    >
      <Leva collapsed={true} hidden={false} />
      <Header />
      <Canvas
        camera={{ position: [0, 1.2, initialZoom] }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          toneMapping: THREE.NoToneMapping,
        }}
      >
        <Rig
          gridW={activeDims.width}
          gridH={activeDims.height}
        />

        <TopologyBackground
          isZoomedIn={isZoomedIn}
          color={CONFIG.bgColor}
          opacity={CONFIG.bgOpacity}
          speed={CONFIG.bgSpeed}
          scale={CONFIG.bgScale}
          lineThickness={CONFIG.bgLineThickness}
        />
        <fog
          attach="fog"
          args={[
            "#F2F1ED",
            controls?.fogNear ?? DEFAULT_CONFIG.fogNear,
            controls?.fogFar ?? DEFAULT_CONFIG.fogFar,
          ]}
        />

        <Suspense fallback={null}>
          {gridLayers.map((layer, layerIdx) => (
            <GridCanvas
              key={layer.id}
              items={layer.items}
              gridVisible={layer.mode === "enter"}
              transitionStartTime={layer.startTime}
              interactive={layer.mode === "enter"}
              filter={
                activeCollectionIdx === 0
                  ? nikeFilter
                  : "all"
              }
              colorFilter={
                activeCollectionIdx === 0
                  ? colorFilter
                  : EMPTY_COLORS
              }
            />
          ))}
        </Suspense>
      </Canvas>
      <MiniMap
        gridDims={activeDims}
        rigState={rigState}
        config={CONFIG}
        totalItems={filteredItemCount}
        isZoomedIn={isZoomedIn}
      />
      <UnifiedControlBar
        currentCollection={activeCollectionIdx}
        onSwitch={handleCollectionSwitch}
        setZoomTrigger={setZoomTarget}
        isZoomedIn={isZoomedIn}
        hasActiveSelection={hasActiveSelection}
        nikeFilter={nikeFilter}
        onFilterChange={handleFilterChange}
      />
    </div>
  );
}
