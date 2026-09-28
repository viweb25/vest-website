import { SectionHeader } from '@/components/ui/section-header';
import Image from 'next/image';

export default function TechnologyEcosystem() {
  return (
    <section id="technology-ecosystem" className="relative w-full bg-white pt-16 pb-16">
      <div className="text-center z-20 px-4 sm:px-8 w-full mb-2 relative">
        <SectionHeader
          eyebrow="ECOSYSTEM"
          title="Technology & Engineering Ecosystem"
          description="The platforms, protocols and languages our engineers work with. Technologies are listed to show what our engineers work with. Listing does not imply official partnership, certification or authorisation."
          className="text-center flex flex-col items-center"
        />
      </div>
      <div className="relative w-full max-w-[1600px] mx-auto px-4 sm:px-8 -mt-4">
        <Image
          src="/banners.png"
          alt="Technology Ecosystem"
          width={1920}
          height={1080}
          className="w-full h-auto object-contain"
          quality={100}
          priority={false}
        />
      </div>
    </section>
  );
}
