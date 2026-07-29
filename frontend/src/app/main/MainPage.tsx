import Link from "next/link";
import CardTransparent, {
  CardTransparentProps,
} from "./components/CardTransparent";
import { Activity, RefreshCw, Target, MoveRight} from 'lucide-react';

const trasparentCardData: CardTransparentProps[] = [
  {
    title: "VOLUMEN",
    description: "15k+",
    icon: <RefreshCw className="w-5 h-5 text-[#38bdf8]"/>,
    children: (
      <div className="text-xs text-gray-400 mt-1">
        Puntos de datos procesados
      </div>
    ),
  },
  {
    title: "EXACTITUD",
    description: "98%",
    icon: <Target className="w-5 h-5 text-[#38bdf8]"/>,
    children: (
      <div className="text-xs text-gray-400 mt-1">Precisión predictiva</div>
    ),
  },
  {
    title: "ESTADO",
    description: "24/7",
    icon: <Activity className="w-5 h-5 text-[#38bdf8]"/>,
    children: (
      <div className="text-xs text-gray-400 mt-1">Disponibilidad 24/7</div>
    ),
  },
];

export default function MainPage() {
  return (
    <main className="flex-1 flex flex-col relative px-8 py-26 overflow-hidden w-full bg-[url(/background-main.png)]  bg-cover">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto z-10 w-full">
        <div className="flex flex-col justify-center gap-16">
          <div className="w-3/4 h-12">
            <h1 className="text-4xl font-semibold text-white">
              Bienvenido al Mapa de Corrosion
            </h1>
          </div>
          <div className="w-2/3 h-12">
            <h3 className="text-lg font-medium text-white">
              Plataforma de análisis predictivo basado en GIS para
              infraestructura crítica. Visualiza el riesgo de corrosión en
              tiempo real con datos de alta fidelidad.
            </h3>
          </div>
          <Link href="/map" className="inline-flex justify-center items-center w-48 h-12 bg-[#59D5FF] text-[#011014] font-semibold hover:bg-[#75d4fd] transition-colors rounded-sm mt-10">
            Explorar Mapa
            <MoveRight className="ml-2 w-4 h-4"/>
          </Link>

        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mx-auto mt-8 lg:mt-16 z-10">
        {trasparentCardData.map((card) => (
          <CardTransparent
            key={card.title}
            title={card.title}
            description={card.description}
            icon={card.icon}
          >
            {card.children}
          </CardTransparent>
        ))}
      </div>
    </main>
  );
}
