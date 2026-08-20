import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import * as THREE from "three";

import vertexShader from "@/shaders/topography.vert";
import fragmentShader from "@/shaders/topography.frag";

const TopographyMaterial = shaderMaterial(
  {
    uTime: 0,
    uResolution: new THREE.Vector2(1, 1),

    uColor: new THREE.Color("#F2F0EF"),
    uOpacity: 0.4,

    uLineOpacity: 0.52,
    uScale: 3.0,
    uLineThickness: 0.03,

    uSpeed: 0.05,
    uZoom: 0,

    uPointer: new THREE.Vector2(0.5, 0.5),

    uPrimaryFrequency: 1.0,
    uSecondaryFrequency: 4.0,
    uSecondaryOpacity: 0.22,

    uWaveStrength: 0.1,
  },
  vertexShader,
  fragmentShader
);

extend({ TopographyMaterial });

export function TopologyBackground({
  isZoomedIn = false,
  quality = 1,

  color = "#d8dfdc",
  opacity = 0.4,

  speed = 0.05,
  scale = 3.0,
  lineThickness = 0.03,
}) {
  const materialRef = useRef(null);

  const pointer = useRef(new THREE.Vector2(0.5, 0.5));
  const targetPointer = useRef(new THREE.Vector2(0.5, 0.5));

  const planeWidth = 90;
  const planeHeight = 40;

  useEffect(() => {
    const handlePointerMove = () => {
      targetPointer.current.x =
        event.clientX / window.innerWidth;
      targetPointer.current.y =
        1 - event.clientY / window.innerHeight;
    };

    window.addEventListener(
      "pointermove",
      handlePointerMove
    );

    return () => {
      window.removeEventListener(
        "pointermove",
        handlePointerMove
      );
    };
  }, []);

  useFrame((state, delta) => {
    const material = materialRef.current;

    if (!material) return;
    pointer.current.lerp(targetPointer.current, 0.045);
    material.uTime += delta * (speed / 0.05);

    material.uResolution.set(planeWidth, planeHeight);

    material.uColor.set(color);

    material.uLineOpacity = opacity;
    material.uScale = scale;
    material.uLineThickness = lineThickness;

    material.uPointer.copy(pointer.current);

    const targetZoom = isZoomedIn ? 1 : 0;

    material.uZoom = THREE.MathUtils.damp(
      material.uZoom,
      targetZoom,
      4,
      delta
    );

    material.uWaveStrength = THREE.MathUtils.damp(
      material.uWaveStrength,
      isZoomedIn ? 0.045 : 0.1,
      3,
      delta
    );

    material.uSpeed = THREE.MathUtils.damp(
      material.uSpeed,
      isZoomedIn ? 0.025 : speed,
      3,
      delta
    );
  });

  if (quality < 0.5) {
    return (
      <mesh position={[0, 0, -15]} renderOrder={-10}>
        <planeGeometry args={[planeWidth, planeHeight]} />

        <meshBasicMaterial
          color="#e8ecea"
          transparent
          opacity={0.65}
          depthWrite={false}
        />
      </mesh>
    );
  }

  return (
    <mesh
      position={[0, 0, -15]}
      renderOrder={-10}
      frustumCulled={false}
    >
      <planeGeometry
        args={[
          planeWidth,
          planeHeight,
          quality > 0.85 ? 256 : 128,
          quality > 0.85 ? 128 : 64,
        ]}
      />

      <topographyMaterial
        ref={materialRef}
        transparent
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
}
