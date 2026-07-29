import { Map } from "maplibre-gl";
import { corrosionPointsToGeoJSON } from "./toGeoJson";
import { mockCorrosionPoints } from "@/app/data/mockCorrosionPoints";
import { CorrosionPoint } from "@/app/core/CorrosionPoint";

export function configInitialMap(
  mapContainer: React.RefObject<HTMLDivElement | null>,
): Map {
  const mapStyleBase =
    "https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json";

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

export function configCorrosionPoints(
  map: Map,
  onPointSelect: (point: CorrosionPoint) => void,
) {
  map.addSource("corrosion-points", {
    type: "geojson",
    data: corrosionPointsToGeoJSON(mockCorrosionPoints),
  });

  map.addLayer({
    id: "corrosion-points-layer",
    type: "circle",
    source: "corrosion-points",
    paint: {
      "circle-radius": 8,
      "circle-color": "#999999",
      "circle-stroke-width": 2,
      "circle-stroke-color": "#ffffff",
    },
  });

  map.on("mouseenter", "corrosion-points-layer", () => {
    map.getCanvas().style.cursor = "pointer";
  });
  map.on("mouseleave", "corrosion-points-layer", () => {
    map.getCanvas().style.cursor = "";
  });

  map.on("click", "corrosion-points-layer", (e) => {
    const feature = e.features?.[0];
    if (feature?.geometry?.type !== "Point") return;

    const props = feature.properties;
    const original = mockCorrosionPoints.find((p) => p.id === props.id);
    if (original && onPointSelect) {
      onPointSelect(original);
    }
  });
}

export function configSelectionHalo(map: Map) {
  map.addSource("selection-halo", {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [],
    },
  });

  map.addLayer(
    {
      id: "selection-halo-layer",
      type: "circle",
      source: "selection-halo",
      paint: {
        "circle-radius": 120,
        "circle-color": ["get", "color"],
        "circle-blur": 1,
        "circle-opacity": 0.35,
      },
    },
    "corrosion-points-layer",
  );
}