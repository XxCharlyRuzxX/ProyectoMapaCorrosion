export type CorrosionPoint = {
  id: number;
  name: string;
  position: {
    lat: number;
    lng: number;
  };
  lastUpdate: string;
  corrosionGrade: CorrosionGrade;
  corrosionRate: string;
  environmentalParameters: {
    temperature: number;
    humidity: number;
    ph: number;
    chlorides: number;
    sulfates: number;
  };
}

export enum CorrosionGrade {
  Low = "low",
  Medium = "medium",
  High = "high",
}