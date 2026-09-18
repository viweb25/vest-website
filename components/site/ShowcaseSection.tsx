"use client";
import { ZoomParallax } from "@/components/ui/zoom-parallax";
import { LampDemo } from "@/components/ui/lamp";
import { ProjectShowcase } from "@/components/ui/project-showcase";
import ScrollExpand from "@/components/animations/ScrollExpand";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import Pipeline from "@/components/site/Pipeline";

export default function ShowcaseSection() {
  const images = [
    {
      src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80",
      alt: "Modern architecture building",
    },
    {
      src: "https://res.cloudinary.com/defqgygsf/image/upload/v1789717166/28_wskf2h.png",
      alt: "Showcase Image 1",
    },
    {
      src: "https://res.cloudinary.com/defqgygsf/image/upload/v1789717170/8301_zb3xy5.png",
      alt: "Showcase Image 2",
    },
    {
      src: "https://res.cloudinary.com/defqgygsf/image/upload/v1789717196/682_ytf7xm.png",
      alt: "Showcase Image 3",
    },
    {
      src: "https://res.cloudinary.com/defqgygsf/image/upload/v1789717208/981_oihh6h.png",
      alt: "Showcase Image 4",
    },
    {
      src: "https://res.cloudinary.com/defqgygsf/image/upload/v1789717223/0198_v3sscn.png",
      alt: "Showcase Image 5",
    },
    {
      src: "https://res.cloudinary.com/defqgygsf/image/upload/v1789717220/91726_p9oqwr.png",
      alt: "Showcase Image 6",
    },
  ];

  return (
    <section className="w-full">
      <div className="relative flex h-[50vh] items-center justify-center">
        <h1 className="text-center text-4xl font-bold">
          Built to Outlast the Moment.
        </h1>
      </div>
      <ZoomParallax
        images={images}
        portalIndex={0}
        portalContent={<LampDemo />}
      />
      {/* <ScrollExpand
        stageBackground="radial-gradient(ellipse 100% 80% at 50% 50%, rgba(99,102,241,0.12) 0%, rgba(139,92,246,0.07) 28%, #08080f 58%, #050508 100%)"
        background="#080808"
      >
        <ProjectShowcase />
      </ScrollExpand> */}

      <ScrollReveal className="w-full">
        <Pipeline />
      </ScrollReveal>
    </section>
  );
}
