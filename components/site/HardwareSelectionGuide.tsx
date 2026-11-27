'use client';

import React from 'react';
import Image from 'next/image';

export interface HardwareProduct {
  id: string;
  title: string;
  image: string;
  imageAlt: string;
  imagePosition: 'left' | 'right';
  features: string[];
  bestFor: string[];
}

export const HARDWARE_SELECTION_PRODUCTS: HardwareProduct[] = [
  {
    id: 'pc-daq',
    title: 'PC-Based Data Acquisition Systems',
    image: '/NI Multifunction I_O Device Render.png',
    imageAlt: 'PC-Based Data Acquisition Systems NI USB DAQ',
    imagePosition: 'left',
    features: [
      '±10 V input/output options',
      'TTL digital lines and counter/timer circuitry',
      'Support for LabVIEW, Python, C/C++, .NET',
    ],
    bestFor: [
      'Cost-effective benchtop measurements',
      'Standard voltage and digital signals',
      'Install in PC as PCIe boards or connect over USB',
    ],
  },
  {
    id: 'cdaq',
    title: 'Modular Data Acquisition for Sensors and Electrical Signals (CompactDAQ)',
    image: '/NI CompactDAQ Modular Hardware Render.png',
    imageAlt: 'Modular Data Acquisition NI CompactDAQ',
    imagePosition: 'right',
    features: [
      'Connects to PC via USB/ENET',
      'Modular system for expansion',
      'Rugged operating specs for temperature, shock, and vibration',
      'Support for LabVIEW, FlexLogger, Python, C/C++, .NET',
    ],
    bestFor: [
      'High-speed sensor measurements',
      'Portable or benchtop validation systems',
      'Combining sensors and electrical measurements',
      'Sensor measurements',
    ],
  },
  {
    id: 'rf-hardware',
    title: 'RF Hardware',
    image: '/National Instruments PXI Module Trio.png',
    imageAlt: 'NI RF Hardware Vector Signal Transceivers',
    imagePosition: 'left',
    features: [
      'Vector signal transceivers',
      'USRP software defined radios',
    ],
    bestFor: [
      'Wireless design and test',
      'RFIC validation and production testing',
      'Radar prototyping',
      'Multi-channel test beds',
    ],
  },
  {
    id: 'pxi',
    title: 'PXI (PCI Extensions for Instrumentation)',
    image: '/National Instruments PXIe-1095 Chassis.png',
    imageAlt: 'PXI Chassis with Modular Instruments',
    imagePosition: 'right',
    features: [
      'Combining instruments, sensor, and electrical measurements',
      'Instruments and DAQ/sensors in one',
      'Modules for scopes, DMMs, switch/relay, ARB, high-speed digitizer, RF, and more',
      'Best synchronization',
      'High-bandwidth connection between I/O, instruments, and processors',
      'Run with on-board PXI controller (PC components) or connect to PC/laptop',
      'Open standard: multiple PXI vendors in the T&M market',
    ],
    bestFor: [
      'Production test systems for electronic devices',
      'Automated validation test',
      'High-channel, high-speed test applications',
    ],
  },
  {
    id: 'crio',
    title: 'High-Speed Control with Built-In Computer (CompactRIO)',
    image: '/NI CompactRIO Industrial Controller Modules.png',
    imageAlt: 'High-Speed Control NI CompactRIO Controller',
    imagePosition: 'left',
    features: [
      'Similar hardware and measurements specs of CompactDAQ',
      'Run code on built-in processor (no PC needed for runtime)',
      'Program as a controller with sub-second loop rates',
      'Programmable coprocessor (FPGA) for in-line processing/control from I/O modules',
      'Program with LabVIEW only',
    ],
    bestFor: [
      'Rugged monitoring and control applications',
      'High-speed signal and sensor data logging',
      'Rapid control prototyping',
    ],
  },
  {
    id: 'instrument-control',
    title: 'Instrument Control',
    image: '/National Instruments Hardware Collection.png',
    imageAlt: 'NI Instrument Control Hardware GPIB Serial',
    imagePosition: 'right',
    features: [
      'GPIB and serial conversion to USB, PCI(e), and Ethernet',
      'Simplified instrument control using LabVIEW prebuilt drivers',
    ],
    bestFor: [
      'Connecting your PC to boxed instruments from companies such as Keysight, Rohde & Schwarz, and Tektronix',
    ],
  },
];

export default function HardwareSelectionGuide() {
  return (
    <section id="hardware-selection-guide" className="py-16 sm:py-20 bg-white relative isolate overflow-hidden">
      {/* Anchor for backward compatibility with jump links */}
      <div id="hardware-ecosystem" className="absolute -top-16 left-0" />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="mb-10 sm:mb-14">
          {/* Main Title in Serif Font Matching Reference Image */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#0B2340] tracking-tight leading-tight mb-3">
            Hardware Platform <span className="text-[#E7651A]">Selection Guide</span>
          </h2>

          {/* Subtitle Description */}
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed max-w-4xl mb-8">
            Use this page to select the NI platform best fit your needs. The features listed are typical decision factors and not an exhaustive list of capabilities. See the respective hardware section for your reference.
          </p>

          {/* Category Bar Heading */}
          <div className="flex items-center gap-2.5">

            <h3 className="text-xl sm:text-2xl font-black text-[#0B2340] tracking-tight">
              NI Hardware Products
            </h3>
          </div>
        </div>

        {/* 6 Hardware Product Rows */}
        <div className="space-y-10 sm:space-y-14 lg:space-y-16">
          {HARDWARE_SELECTION_PRODUCTS.map((product, idx) => {
            const isImageLeft = idx % 2 === 0;

            return (
              <div
                key={product.id}
                className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center"
              >
                {/* 1. Device Hardware Image (Clean on white canvas with no border or shadow) */}
                <div
                  className={`md:col-span-5 lg:col-span-6 flex items-center justify-center p-2 sm:p-4 ${isImageLeft ? 'md:order-1' : 'md:order-2'
                    }`}
                >
                  <div className="relative w-full flex items-center justify-center">
                    <Image
                      src={product.image}
                      alt={product.imageAlt}
                      width={750}
                      height={460}
                      className="max-h-[240px] sm:max-h-[290px] md:max-h-[330px] lg:max-h-[380px] w-auto max-w-full object-contain hover:scale-105 transition-transform duration-300"
                      priority={idx < 2}
                    />
                  </div>
                </div>

                {/* 2. Content Card (Warm peach card with signature orange border edge facing the image) */}
                <div
                  className={`md:col-span-7 lg:col-span-6 bg-[#FFF6EF] border border-[#FBD8C1] rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-9 shadow-sm transition-all duration-200 ${isImageLeft
                    ? 'md:order-2 border-l-[4.5px] border-l-[#E7651A]'
                    : 'md:order-1 border-r-[4.5px] border-r-[#E7651A]'
                    }`}
                >
                  {/* Title */}
                  <h4 className="text-base sm:text-lg lg:text-xl font-bold text-[#0B2340] leading-snug mb-3.5 tracking-tight">
                    {product.title}
                  </h4>

                  {/* Feature Bullets */}
                  <ul className="space-y-2 mb-4">
                    {product.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start text-xs sm:text-[13px] lg:text-sm text-slate-800 leading-snug">
                        <span className="text-[#E7651A] font-black mr-2 text-sm leading-none shrink-0 select-none">•</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Best for Section */}
                  <div className="pt-1.5 border-t border-[#FBD8C1]/60">
                    <p className="text-xs sm:text-[13px] lg:text-sm font-bold text-[#E7651A] mt-2 mb-1.5">
                      Best for:
                    </p>
                    <ul className="space-y-1.5">
                      {product.bestFor.map((bf, bIdx) => (
                        <li key={bIdx} className="flex items-start text-xs sm:text-[13px] lg:text-sm text-slate-800 leading-snug">
                          <span className="text-[#E7651A] font-black mr-2 text-sm leading-none shrink-0 select-none">•</span>
                          <span>{bf}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
