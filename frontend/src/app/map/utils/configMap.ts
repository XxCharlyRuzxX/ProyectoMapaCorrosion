import { Map, Marker } from "maplibre-gl";
import { createElement } from "react";
import { createRoot } from "react-dom/client";
import { MapPin } from "lucide-react";
import { mockCorrosionPoints } from "@/app/data/mockCorrosionPoints";
import { CorrosionPoint } from "@/app/core/CorrosionPoint";

export function configInitialMap(
  mapContainer: React.RefObject<HTMLDivElement | null>,
): Map {
  const mapStyleBase =
    "https://basemaps.cartocdn.com/gl/voyager-nolabels-gl-style/style.json";

  return new Map({
    container: mapContainer.current as HTMLElement,
    style: mapStyleBase,
    center: [-89.6237, 20.967],
    zoom: 7,
    renderWorldCopies: false,
    attributionControl: false,
    maxBounds: [
      [-119, 6],
      [-82, 33],
    ],
  });
}


function createMarkerElement(color: string): HTMLDivElement {
  const el = document.createElement("div");
  el.style.cursor = "pointer";
  el.style.filter = "drop-shadow(0 2px 3px rgba(0,0,0,0.4))";

  const root = createRoot(el);
  root.render(
    createElement(MapPin, {
      size: 36,
      color: "#ffffff",
      fill: color,
      strokeWidth: 1.5,
    }),
  );

  return el;
}

export function configCorrosionPoints(
  map: Map,
  onPointSelect: (point: CorrosionPoint) => void,
): Marker[] {
  const markers: Marker[] = [];

  mockCorrosionPoints.forEach((point) => {
    const color = "#6b7280";
    const el = createMarkerElement(color);

    el.addEventListener("click", (e) => {
      e.stopPropagation();
      onPointSelect(point);
    });

    const marker = new Marker({ element: el, anchor: "bottom" })
      .setLngLat([point.position.lng, point.position.lat])
      .addTo(map);

    markers.push(marker);
  });

  return markers;
}

export function configSelectionHalo(map: Map) {
  map.addSource("selection-halo", {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [],
    },
  });

  map.addLayer({
    id: "selection-halo-layer",
    type: "circle",
    source: "selection-halo",
    paint: {
      "circle-radius": 130,
      "circle-color": ["get", "color"],
      "circle-blur": 0.8,
      "circle-opacity": 0.55,
    },
  });
}