import * as THREE from "three";
import { CONFIG } from "./gridConfig";

export const rigState = {
  target: new THREE.Vector3(0, 2, 0),
  current: new THREE.Vector3(0, 2, 0),
  velocity: new THREE.Vector3(0, 0, 0),
  zoom: CONFIG.zoomOut,
  isDragging: false,
  activeId: null,
};

export const calculateGridDimensions = (count) => {
  const rows = Math.ceil(count / CONFIG.gridCols);
  const spacing = CONFIG.itemSize + CONFIG.gap;
  return {
    width: CONFIG.gridCols * spacing,
    height: rows * spacing,
  };
};

export const EMPTY_COLORS = [];

export const matchesFilter = (
  item,
  filter,
  colorFilter = EMPTY_COLORS
) => {
  let matchesType = true;
  if (filter !== "all") {
    const title = item.title.toLowerCase();
    if (filter === "jordan")
      matchesType = title.includes("jordan");
    else if (filter === "dunk")
      matchesType = title.includes("dunk");
  }

  let matchesColor = true;
  if (colorFilter.length > 0) {
    const shoeColor = item.primary_color || "";
    matchesColor = colorFilter.some((c) => {
      if (c === "gray") return shoeColor.includes("gray");
      return shoeColor === c;
    });
  }

  return matchesType && matchesColor;
};
