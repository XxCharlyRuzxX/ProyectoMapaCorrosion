import { CorrosionPoint } from "@/app/core/CorrosionPoint";
import type { FeatureCollection, Point } from "geojson";

export function corrosionPointsToGeoJSON(
  points: CorrosionPoint[]
): FeatureCollection<Point> {
  return {
    type: "FeatureCollection",
    features: points.map((point) => ({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [point.position.lng, point.position.lat],
      },
      properties: {
        id: point.id,
        name: point.name,
        lastUpdate: point.lastUpdate,
        corrosionGrade: point.corrosionGrade,
        corrosionRate: point.corrosionRate,
        temperature: point.environmentalParameters.temperature,
        humidity: point.environmentalParameters.humidity,
        ph: point.environmentalParameters.ph,
        chlorides: point.environmentalParameters.chlorides,
        sulfates: point.environmentalParameters.sulfates,
      },
    })),
  };
}


