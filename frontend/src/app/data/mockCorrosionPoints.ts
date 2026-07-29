import { CorrosionGrade, CorrosionPoint } from "../core/CorrosionPoint";

export const mockCorrosionPoints: CorrosionPoint[] = [
  {
    id: 1,
    name: "Tanque de almacenamiento A1",
    position: { lat: 20.967, lng: -89.6237 },
    lastUpdate: "2026-07-20",
    corrosionGrade: CorrosionGrade.High,
    corrosionRate: "0.45 mm/año",
    environmentalParameters: {
      temperature: 32,
      humidity: 78,
      ph: 6.2,
      chlorides: 120,
      sulfates: 85,
    },
  },
  {
    id: 2,
    name: "Tubería de transporte B2",
    position: { lat: 21.05, lng: -89.58 },
    lastUpdate: "2026-07-22",
    corrosionGrade: CorrosionGrade.Medium,
    corrosionRate: "0.22 mm/año",
    environmentalParameters: {
      temperature: 29,
      humidity: 65,
      ph: 7.1,
      chlorides: 60,
      sulfates: 40,
    },
  },
  {
    id: 3,
    name: "Estructura de soporte C3",
    position: { lat: 20.88, lng: -89.7 },
    lastUpdate: "2026-07-18",
    corrosionGrade: CorrosionGrade.Low,
    corrosionRate: "0.08 mm/año",
    environmentalParameters: {
      temperature: 27,
      humidity: 55,
      ph: 7.8,
      chlorides: 20,
      sulfates: 15,
    },
  },
];