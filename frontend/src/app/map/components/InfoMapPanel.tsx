import { X } from "lucide-react";

interface InfoMapPanelProps {
  readonly setLeftPanelOpen: (open: boolean) => void;
}

export default function InfoMapPanel({ setLeftPanelOpen }: InfoMapPanelProps) {
  return (
    <div className="hidden md:block border-r-2 border-white/10 m-4">
      <X
        className="w-6 h-6 text-white cursor-pointer"
        onClick={() => setLeftPanelOpen(false)}
      />
      <h1 className="text-white text-2xl font-bold m-4">
        Bienvenido al Mapa de Corrosión de Yucatán
      </h1>
      <div className="flex flex-col m-4 gap-3">
        <h1 className="text-white text-xl font-bold">
          1. Explora los puntos de medición
        </h1>
        <p>
          En el mapa interactivo verás marcados los puntos estratégicos
          correspondientes a las estaciones de monitoreo reales almacenadas en
          nuestra base de datos.
        </p>
        <h1 className="text-white text-xl font-bold">2. Selecciona un punto</h1>
        <p>
          Haz clic sobre cualquier marcador en el mapa para el cual desees
          consultar información. Al hacerlo, se desplegará de forma automática
          un bloque con los datos medidos en esa ubicación exacta.
        </p>
        <h1 className="text-white text-xl font-bold">
          3. Consulta el detalle de los datos
        </h1>
        <p>
          En el panel informativo de cada punto podrás visualizar datos como el
          grado y velocidad de corrosión estimado y Variables ambientales como
          Humedad, temperatura, pH, cloruros y sulfatos.
        </p>
      </div>
    </div>
  );
}
