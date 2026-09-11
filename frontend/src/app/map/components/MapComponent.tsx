"use client";

import { useEffect, useRef } from "react";
import { Map, NavigationControl, Marker } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { applySelectionHalo, configMapStyle } from "../utils/configMapStyle";
import {
  configCorrosionPoints,
  configInitialMap,
  configSelectionHalo,
} from "../utils/configMap";

import { CorrosionPoint } from "@/app/core/CorrosionPoint";

interface MapComponentProps {
  readonly onPointSelect?: (point: CorrosionPoint) => void;
  readonly selectedPoint?: CorrosionPoint | null;
}

export default function MapComponent({
  onPointSelect,
  selectedPoint,
}: MapComponentProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map | null>(null);
  const markersRef = useRef<Marker[]>([]);
  const isMapLoadedRef = useRef(false);

  useEffect(() => {
    if (mapRef.current || !mapContainer.current) return;

    mapRef.current = configInitialMap(mapContainer);
    mapRef.current?.on("load", () => {
      const map = mapRef.current!;
      configMapStyle(map);
      markersRef.current = configCorrosionPoints(
        map,
        onPointSelect ?? (() => {}),
      );
      configSelectionHalo(map);
      isMapLoadedRef.current = true;
    });

    mapRef.current.addControl(new NavigationControl(), "bottom-right");

    return () => {
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];
      mapRef.current?.remove();
      mapRef.current = null;
      isMapLoadedRef.current = false;
    };
  }, [onPointSelect]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !isMapLoadedRef.current) return;

    applySelectionHalo(map, selectedPoint ?? null);

    if (selectedPoint) {
      map.flyTo({
        center: [selectedPoint.position.lng, selectedPoint.position.lat],
        zoom: 12,
        duration: 1000,
      });
    }
  }, [selectedPoint]);

  return (
    <div
      ref={mapContainer}
      style={{ width: "100%", height: "100%", minHeight: "400px" }}
    />
  );
}
