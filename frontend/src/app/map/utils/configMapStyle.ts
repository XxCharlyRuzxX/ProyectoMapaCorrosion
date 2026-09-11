import { CorrosionGrade, CorrosionPoint } from "@/app/core/CorrosionPoint";
import { Map } from "maplibre-gl";

export function configMapStyle(map: Map) {
  map.setPaintProperty("background", "background-color", "#e8e6df");

  // Terreno / suelo
  map.setPaintProperty("landcover", "fill-color", "#d8dcc8"); // bosque/pasto, tono verde-grisáceo suave
  map.setPaintProperty("landuse", "fill-color", "#e2ded2");
  map.setPaintProperty("landuse_residential", "fill-color", "#e6e1d3");

  // Parques
  map.setPaintProperty("park_national_park", "fill-color", "#c8d6b0");
  map.setPaintProperty("park_nature_reserve", "fill-color", "#c8d6b0");

  // Edificios
  map.setPaintProperty("building", "fill-color", "#d4cfc0");
  map.setPaintProperty("building-top", "fill-color", "#d4cfc0");

  // Agua
  map.setPaintProperty("water", "fill-color", "#a8c4d4");
  map.setPaintProperty("water_shadow", "fill-color", "#94b3c6");
  map.setPaintProperty("water", "fill-outline-color", "#7fa3ba");
  map.setPaintProperty("water_shadow", "fill-outline-color", "#7fa3ba");

  // Fronteras
  [
    "boundary_county",
    "boundary_state",
    "boundary_country_outline",
    "boundary_country_inner",
    "waterway",
  ].forEach((id) => {
    map.setPaintProperty(id, "line-color", "#8a8577");
    map.setPaintProperty(id, "line-width", 1.5);
  });

  // Calles
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
  [CorrosionGrade.Low]: "#16a34a",
  [CorrosionGrade.Medium]: "#f59e0b",
  [CorrosionGrade.High]: "#dc2626",
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