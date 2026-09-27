'use client';

import React, { useEffect, useState } from "react";
import { CircularGallery } from "@/components/ui/circular-gallery-2";
import { ShimmerText } from "@/components/ui/shimmer-text";

const icons: Record<string, string> = {
  Requirement: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#168a9f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/></svg>`,
  Architecture: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#168a9f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`,
  Integration: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#168a9f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="8" width="8" height="8" rx="2" ry="2"/><line x1="12" y1="2" x2="12" y2="8"/><line x1="12" y1="16" x2="12" y2="22"/><line x1="2" y1="12" x2="8" y2="12"/><line x1="16" y1="12" x2="22" y2="12"/></svg>`,
  Development: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#168a9f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
  Testing: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#168a9f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 2v7.31"/><path d="M14 9.3V1.99"/><path d="M8.5 2h7"/><path d="M14 9.3a6.5 6.5 0 1 1-4 0"/><line x1="5.52" y1="16" x2="18.48" y2="16"/></svg>`,
  Deployment: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#168a9f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>`,
  Support: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#168a9f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`
};

const journeyData = [
  {
    id: "step-1",
    year: "01",
    month: "Requirement",
    content: "Test objectives, measurements, limits, throughput and reporting needs are captured and agreed before design begins.",
  },
  {
    id: "step-2",
    year: "02",
    month: "Architecture",
    content: "Software structure, hardware selection, data model and communication design are defined for maintainability.",
  },
  {
    id: "step-3",
    year: "03",
    month: "Integration",
    content: "DAQ, PXI, cDAQ, cRIO, instruments and industrial devices are connected, configured and verified.",
  },
  {
    id: "step-4",
    year: "04",
    month: "Development",
    content: "Application code, user interface, sequencing, data logging and database or web-service integration are built.",
  },
  {
    id: "step-5",
    year: "05",
    month: "Testing",
    content: "The system is verified against the requirement, with validation of accuracy, timing and fault handling.",
  },
  {
    id: "step-6",
    year: "06",
    month: "Deployment",
    content: "Executables, installers, configuration and documentation are prepared for the target environment.",
  },
  {
    id: "step-7",
    year: "07",
    month: "Support",
    content: "Troubleshooting, updates and legacy application support keep the system running as needs evolve.",
  },
];

async function createCardTexture(stepNum: string, heading: string, content: string, svgString: string): Promise<string> {
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas");
    canvas.width = 800;
    canvas.height = 1000;
    const ctx = canvas.getContext("2d");
    if (!ctx) return resolve("");

    // Background
    const grad = ctx.createLinearGradient(0, 0, 0, 1000);
    grad.addColorStop(0, "#ffffff");
    grad.addColorStop(1, "#f1f5f9");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 800, 1000);

    // Border
    ctx.strokeStyle = "#e2e8f0";
    ctx.lineWidth = 4;
    ctx.strokeRect(2, 2, 796, 996);

    // Background Icon / Number
    ctx.fillStyle = "rgba(15, 23, 42, 0.03)";
    ctx.font = "900 600px system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(stepNum, 400, 500);

    const drawText = () => {
      // Draw Heading
      ctx.fillStyle = "#0f172a";
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      ctx.font = "bold 64px system-ui, sans-serif";
      ctx.fillText(heading, 100, 260);

      // Accent bar
      ctx.fillStyle = "#168a9f";
      ctx.fillRect(100, 360, 120, 8);

      // Content text setup
      ctx.fillStyle = "#475569";
      ctx.font = "500 44px system-ui, sans-serif";

      const words = content.split(" ");
      const lines: string[] = [];
      let line = "";

      for (let i = 0; i < words.length; i++) {
        const testLine = line + words[i] + " ";
        const metrics = ctx.measureText(testLine);
        if (metrics.width > 600 && i > 0) {
          lines.push(line);
          line = words[i] + " ";
        } else {
          line = testLine;
        }
      }
      lines.push(line);

      let y = 430;
      for (const l of lines) {
        ctx.fillText(l, 100, y);
        y += 65;
      }

      resolve(canvas.toDataURL("image/png"));
    };

    if (svgString) {
      const img = new Image();
      const svg64 = btoa(svgString);
      const b64Start = 'data:image/svg+xml;base64,';
      img.src = b64Start + svg64;
      img.onload = () => {
        // Draw icon (scale up 24x24 to 100x100)
        ctx.drawImage(img, 100, 110, 100, 100);
        drawText();
      };
      img.onerror = () => drawText();
    } else {
      drawText();
    }
  });
}

export default function SystemsWorkflow() {
  const [items, setItems] = useState<{ image: string; text: string }[]>([]);

  useEffect(() => {
    const generateCards = async () => {
      const generated = await Promise.all(
        journeyData.map(async (d) => {
          const texture = await createCardTexture(d.year, d.month, d.content, icons[d.month] || "");
          return {
            image: texture,
            text: `Step ${d.year}`, // Will be rendered as the HTML label
          };
        })
      );
      setItems(generated);
    };

    generateCards();
  }, []);

  return (
    <section className="py-24 md:py-32 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 text-center relative z-10">
        <h2
          className="font-black uppercase text-black"
          style={{
            fontSize: "clamp(2rem, 5vw, 4.25rem)",
            lineHeight: 0.98,
            letterSpacing: "-0.035em",
            WebkitTextStroke: "2px currentColor",
          }}
        >
          LabVIEW development services
        </h2>
        <p className="mt-6 max-w-3xl mx-auto text-[clamp(1rem,1.2vw,1.15rem)] leading-[1.8] tracking-[0.005em] font-medium text-slate-600">
          <ShimmerText duration={3}>
            We develop reliable LabVIEW applications for test, measurement, automation, and industrial systems.
            From system architecture and VI development to hardware integration and deployment, we deliver scalable solutions built for real-world engineering needs.
          </ShimmerText>
        </p>
      </div>

      <div className="w-full h-[500px] md:h-[650px] text-slate-900 relative -mt-4 md:-mt-8">
        {items.length > 0 ? (
          <CircularGallery
            items={items}
            bend={3}
            borderRadius={0.05}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-[#168a9f] border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    </section>
  );
}
