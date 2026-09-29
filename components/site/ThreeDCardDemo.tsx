"use client";

import React from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

const IND = [
  [
    "plane",
    "Aerospace & Defense",
    "Test automation, data acquisition and validation workflows for demanding programmes.",
    "https://images.unsplash.com/photo-1517976487507-5b3b4b45f917?q=80&w=1000&auto=format&fit=crop",
  ],
  [
    "car",
    "Automotive",
    "HIL and functional test systems, CAN communication and end-of-line data logging.",
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1000&auto=format&fit=crop",
  ],
  [
    "factory",
    "Manufacturing",
    "Machine monitoring, production data and quality traceability.",
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop",
  ],
  [
    "gear",
    "Industrial Automation",
    "PLC, HMI and SCADA integration for machines and production lines.",
    "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1000&auto=format&fit=crop",
  ],
  [
    "struct",
    "Structural Engineering",
    "Structural drawings, connection details and technical documentation.",
    "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1000&auto=format&fit=crop",
  ],
  [
    "crane",
    "Construction",
    "Construction documentation, layouts and quantity take-off.",
    "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?q=80&w=1000&auto=format&fit=crop",
  ],
  [
    "flame",
    "Steel Fabrication",
    "Shop drawings, fabrication lists and bills of materials.",
    "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?q=80&w=1000&auto=format&fit=crop",
  ],
  [
    "bolt",
    "Energy",
    "Monitoring, test and data platforms for equipment and assets.",
    "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=1000&auto=format&fit=crop",
  ],
  [
    "chip",
    "Electronics",
    "Automated test benches, instrument control and production test.",
    "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop",
  ],
  [
    "flask",
    "Research & Development",
    "Flexible lab automation and data-acquisition frameworks.",
    "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1000&auto=format&fit=crop",
  ],
  [
    "bridge",
    "Infrastructure",
    "Engineering documentation and digital records for large assets.",
    "https://images.unsplash.com/photo-1545558014-8692077e9b5c?q=80&w=1000&auto=format&fit=crop",
  ],
  [
    "gauge",
    "Testing & Measurement",
    "DAQ, PXI, cDAQ and cRIO systems with reporting pipelines.",
    "https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=1000&auto=format&fit=crop",
  ],
];

import { 
  Plane, Car, Factory, Settings, Building2, Wrench, 
  Flame, Zap, Cpu, FlaskConical, Map, Gauge 
} from "lucide-react";

const getIcon = (key: string) => {
  switch (key) {
    case "plane": return <Plane className="w-12 h-12 text-slate-700" strokeWidth={1.5} />;
    case "car": return <Car className="w-12 h-12 text-slate-700" strokeWidth={1.5} />;
    case "factory": return <Factory className="w-12 h-12 text-slate-700" strokeWidth={1.5} />;
    case "gear": return <Settings className="w-12 h-12 text-slate-700" strokeWidth={1.5} />;
    case "struct": return <Building2 className="w-12 h-12 text-slate-700" strokeWidth={1.5} />;
    case "crane": return <Wrench className="w-12 h-12 text-slate-700" strokeWidth={1.5} />;
    case "flame": return <Flame className="w-12 h-12 text-slate-700" strokeWidth={1.5} />;
    case "bolt": return <Zap className="w-12 h-12 text-slate-700" strokeWidth={1.5} />;
    case "chip": return <Cpu className="w-12 h-12 text-slate-700" strokeWidth={1.5} />;
    case "flask": return <FlaskConical className="w-12 h-12 text-slate-700" strokeWidth={1.5} />;
    case "bridge": return <Map className="w-12 h-12 text-slate-700" strokeWidth={1.5} />;
    case "gauge": return <Gauge className="w-12 h-12 text-slate-700" strokeWidth={1.5} />;
    default: return <Settings className="w-12 h-12 text-slate-700" strokeWidth={1.5} />;
  }
};

export default function ThreeDCardDemo() {
  return (
    <section className="w-full bg-slate-50 py-16 relative">
      <div className="text-center z-20 px-4 sm:px-8 w-full mb-12 relative">
        <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
          Industry Solutions
        </h2>
        <p className="text-sm md:text-base text-slate-600 max-w-2xl mx-auto font-medium">
          Comprehensive technologies spanning multiple demanding industries.
        </p>
      </div>

      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {IND.map(([key, title, desc, imgUrl], index) => (
          <CardContainer key={index} className="inter-var w-full py-4">
            <CardBody className="bg-white relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full h-full rounded-2xl p-6 border flex flex-col items-center text-center shadow-sm">
              <CardItem
                translateZ="40"
                className="mb-4 p-3 rounded-full bg-slate-100 group-hover/card:bg-blue-50 transition-colors"
              >
                {getIcon(key)}
              </CardItem>

              <CardItem
                translateZ="50"
                className="text-lg font-bold text-slate-800 dark:text-white mb-2"
              >
                {title}
              </CardItem>

              <CardItem
                as="p"
                translateZ="60"
                className="text-slate-500 text-sm max-w-sm dark:text-neutral-300"
              >
                {desc}
              </CardItem>
            </CardBody>
          </CardContainer>
        ))}
      </div>
    </section>
  );
}