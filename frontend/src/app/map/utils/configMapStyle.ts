import { CorrosionGrade, CorrosionPoint } from "@/app/core/CorrosionPoint";
import { Map } from "maplibre-gl";

export function configMapStyle(map: Map) {
  map.setPaintProperty("water", "fill-color", "#020202");
  map.setPaintProperty("water_shadow", "fill-color", "#030712");
  map.setPaintProperty("water", "fill-outline-color", "#ffffff");
  map.setPaintProperty("water_shadow", "fill-outline-color", "#ffffff");

  [
    "boundary_county",
    "boundary_state",
    "boundary_country_outline",
    "boundary_country_inner",
    "waterway",
  ].forEach((id) => {
    map.setPaintProperty(id, "line-color", "#ffffff");
    map.setPaintProperty(id, "line-width", 1.5);
  });

  const layers = map.getStyle().layers;
  layers?.forEach((layer) => {
    if (layer.type === "line" && layer.id.startsWith("road_")) {
      map.setPaintProperty(layer.id, "line-color", "#ffffff");
    }
    if (layer.type === "symbol") {
      map.setLayoutProperty(layer.id, "visibility", "none");
    }
  });
}


const gradeToHaloColor: Record<CorrosionGrade, string> = {
  [CorrosionGrade.Low]: "#22c55e",
  [CorrosionGrade.Medium]: "#f59e0b",
  [CorrosionGrade.High]: "#ef4444",
};

export function applySelectionHalo(map: Map, selectedPoint: CorrosionPoint | null) {
  const source = map.getSource("selection-halo") as maplibregl.GeoJSONSource;
  if (!source) return;

  if (!selectedPoint) {
    source.setData({ type: "FeatureCollection", features: [] });
    return;
  }

  source.setData({
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [selectedPoint.position.lng, selectedPoint.position.lat],
        },
        properties: {
          color: gradeToHaloColor[selectedPoint.corrosionGrade],
        },
      },
    ],
  });
}