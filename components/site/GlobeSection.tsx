"use client"

import { GlobeInteractive } from "@/components/ui/globe-interactive"

export default function GlobeSection() {
  return (
    <section className="py-20 relative overflow-hidden bg-white text-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tighter text-slate-900">Global Presence</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Connect with our network spanning across multiple continents, offering blazing fast interactions everywhere.
          </p>
        </div>
        <div className="flex items-center justify-center w-full">
          <div className="w-full max-w-lg">
            <GlobeInteractive />
          </div>
        </div>
      </div>
    </section>
  )
}
