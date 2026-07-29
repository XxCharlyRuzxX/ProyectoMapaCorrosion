"use client";
import { useCallback, useState } from "react";
import MapComponent from "./components/MapComponent";
import { Info } from "lucide-react";
import InfoMapPanel from "./components/InfoMapPanel";
import PointDataPanel from "./components/PointDataPanel";
import { CorrosionPoint } from "../core/CorrosionPoint";

function getGridColsClass(leftOpen: boolean, rightOpen: boolean) {
  if (leftOpen && rightOpen) return "md:grid-cols-[1fr_2fr_1fr]";
  if (leftOpen && !rightOpen) return "md:grid-cols-[1fr_3fr]";
  if (!leftOpen && rightOpen) return "md:grid-cols-[3fr_1fr]";
  return "md:grid-cols-[1fr]";
}

export default function PageMap() {
  const [leftPanelOpen, setLeftPanelOpen] = useState(true);
  const [rightPanelOpen, setRightPanelOpen] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState<CorrosionPoint | null>(
    null,
  );

  const gridColsClass = getGridColsClass(leftPanelOpen, rightPanelOpen);

  const handlePointSelect = useCallback((point: CorrosionPoint) => {
    setSelectedPoint(point);
    setRightPanelOpen(true);
  }, []);

  return (
    <div className="w-full overflow-hidden">
      <div className={`grid h-[90vh] w-full grid-cols-1 ${gridColsClass}`}>
        {leftPanelOpen && (
          <InfoMapPanel key="left-panel" setLeftPanelOpen={setLeftPanelOpen} />
        )}

        <div key="map" className="overflow-hidden">
          <MapComponent
            onPointSelect={handlePointSelect}
            selectedPoint={selectedPoint}
          />
        </div>

        {rightPanelOpen && selectedPoint && (
          <div
            key="right-panel"
            className="hidden md:block border-l-2 border-white/10"
          >
            <PointDataPanel
              point={selectedPoint}
              onClose={() => {
                setRightPanelOpen(false);
                setSelectedPoint(null);
              }}
            />
          </div>
        )}
      </div>

      {!leftPanelOpen && (
        <Info
          className="absolute top-24 left-4 w-6 h-6 text-white cursor-pointer"
          onClick={() => setLeftPanelOpen(true)}
        />
      )}
    </div>
  );
}
