'use client';

import React from 'react';

interface HeroGraphicProps {
  type: 'vision' | 'test' | 'hardware' | 'plc' | 'refactor' | 'battery' | 'hil' | 'rf';
  statsText?: string;
}

export default function ServiceHeroGraphic({ type, statsText }: HeroGraphicProps) {
  switch (type) {
    case 'vision':
      return (
        <svg viewBox="0 0 480 340" className="w-full h-auto drop-shadow-2xl" role="img" aria-label="Camera detecting components on a conveyor with bounding boxes">
          <rect x="0" y="0" width="480" height="340" rx="14" fill="#07191e" />
          {/* Grid lines */}
          <line x1="0" y1="85" x2="480" y2="85" stroke="#E7651A" strokeWidth="1" opacity="0.15" />
          <line x1="0" y1="170" x2="480" y2="170" stroke="#E7651A" strokeWidth="1" opacity="0.15" />
          <line x1="0" y1="255" x2="480" y2="255" stroke="#E7651A" strokeWidth="1" opacity="0.15" />
          {/* Industrial camera */}
          <rect x="200" y="18" width="80" height="46" rx="8" fill="#E7651A" />
          <circle cx="240" cy="41" r="14" fill="#0B2340" />
          <circle cx="240" cy="41" r="7" fill="#38bdf8" />
          <circle cx="240" cy="41" r="3" fill="#ffffff" />
          {/* Vision light cone */}
          <path d="M240 64 L130 180 M240 64 L350 180" stroke="#38bdf8" strokeWidth="2" strokeDasharray="5 5" opacity="0.8" />
          <polygon points="240,64 130,180 350,180" fill="url(#coneGradient)" opacity="0.18" />
          <defs>
            <linearGradient id="coneGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#E7651A" stopOpacity="0.0" />
            </linearGradient>
          </defs>
          {/* Conveyor belt */}
          <rect x="25" y="235" width="430" height="20" rx="4" fill="#334155" />
          <rect x="25" y="255" width="430" height="8" fill="#1e293b" />
          {/* Moving parts */}
          <rect x="95" y="185" width="62" height="48" rx="6" fill="#E7651A" opacity="0.9" />
          <rect x="210" y="187" width="58" height="46" rx="6" fill="#0284c7" opacity="0.9" />
          <circle cx="360" cy="210" r="23" fill="#0f766e" opacity="0.9" />
          {/* Bounding boxes & confidence tags */}
          <rect x="85" y="175" width="82" height="68" fill="none" stroke="#38bdf8" strokeWidth="2.5" />
          <rect x="85" y="155" width="94" height="20" rx="3" fill="#E7651A" />
          <text x="91" y="169" fontFamily="Segoe UI, monospace" fontSize="11" fontWeight="700" fill="#ffffff">Part A 99.2%</text>

          <rect x="200" y="177" width="78" height="66" fill="none" stroke="#38bdf8" strokeWidth="2.5" />
          <rect x="200" y="157" width="94" height="20" rx="3" fill="#0284c7" />
          <text x="206" y="171" fontFamily="Segoe UI, monospace" fontSize="11" fontWeight="700" fill="#ffffff">Part B 98.6%</text>

          <rect x="332" y="182" width="56" height="56" fill="none" stroke="#10b981" strokeWidth="2.5" />
          <rect x="332" y="162" width="80" height="20" rx="3" fill="#10b981" />
          <text x="338" y="176" fontFamily="Segoe UI, monospace" fontSize="11" fontWeight="700" fill="#ffffff">Pass: OK</text>
          {/* Stats Bar */}
          <rect x="25" y="285" width="430" height="38" rx="8" fill="#0B2340" stroke="#1e293b" strokeWidth="1" />
          <circle cx="45" cy="304" r="5" fill="#10b981" />
          <text x="60" y="308" fontFamily="Segoe UI, monospace" fontSize="12" fill="#e2e8f0">
            {statsText || "Count: 1,248   |   Inference: 14 ms   |   PLC: OK"}
          </text>
          <text x="390" y="308" fontFamily="Segoe UI, monospace" fontSize="10" fill="#38bdf8" fontWeight="700">LIVE AOI</text>
        </svg>
      );

    case 'test':
      return (
        <svg viewBox="0 0 480 340" className="w-full h-auto drop-shadow-2xl" role="img" aria-label="Automated test rack with oscilloscope and pass fail indicators">
          <rect x="0" y="0" width="480" height="340" rx="14" fill="#07191e" />
          {/* 19-inch ATE rack frame */}
          <rect x="30" y="20" width="420" height="260" rx="10" fill="#0f172a" stroke="#E7651A" strokeWidth="2" />
          {/* Top Chassis / Controller */}
          <rect x="45" y="35" width="390" height="60" rx="6" fill="#1e293b" />
          <text x="60" y="58" fontFamily="Segoe UI, monospace" fontSize="13" fontWeight="700" fill="#38bdf8">NI PXIe-8881 TEST EXECUTIVE</text>
          <text x="60" y="78" fontFamily="Segoe UI, monospace" fontSize="11" fill="#94a3b8">Sequence: EOL_Module_Run_V4   |   Status: RUNNING</text>
          <circle cx="400" cy="55" r="7" fill="#10b981" />
          <circle cx="418" cy="55" r="7" fill="#38bdf8" />
          {/* Middle Oscilloscope & DMM */}
          <rect x="45" y="105" width="230" height="100" rx="6" fill="#0B2340" stroke="#E7651A" strokeWidth="1" />
          {/* Oscilloscope Grid & Wave */}
          <line x1="45" y1="155" x2="275" y2="155" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="160" y1="105" x2="160" y2="205" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3" />
          <path d="M 50 155 Q 80 120, 110 155 T 170 155 T 230 155 T 270 155" fill="none" stroke="#38bdf8" strokeWidth="2.5" />
          <text x="55" y="122" fontFamily="Segoe UI, monospace" fontSize="10" fill="#10b981">CH1: 3.28V RMS</text>
          <text x="55" y="198" fontFamily="Segoe UI, monospace" fontSize="10" fill="#94a3b8">Freq: 1.000 kHz</text>
          {/* Right Parametric Matrix */}
          <rect x="285" y="105" width="150" height="100" rx="6" fill="#1e293b" />
          <text x="295" y="125" fontFamily="Segoe UI, monospace" fontSize="11" fontWeight="700" fill="#e2e8f0">PARAMETRIC</text>
          <text x="295" y="145" fontFamily="Segoe UI, monospace" fontSize="10" fill="#10b981">V_Standby: 12.04V [PASS]</text>
          <text x="295" y="165" fontFamily="Segoe UI, monospace" fontSize="10" fill="#10b981">I_Active: 342 mA [PASS]</text>
          <text x="295" y="185" fontFamily="Segoe UI, monospace" fontSize="10" fill="#10b981">CAN_Resp: 1.2 ms [PASS]</text>
          {/* Bottom UUT Bed of Nails Clamping Fixture */}
          <rect x="45" y="215" width="390" height="50" rx="6" fill="#094750" />
          <text x="60" y="245" fontFamily="Segoe UI, monospace" fontSize="12" fontWeight="700" fill="#ffffff">PNEUMATIC BED-OF-NAILS CASSETTE</text>
          <rect x="330" y="227" width="90" height="26" rx="4" fill="#10b981" />
          <text x="350" y="244" fontFamily="Segoe UI, monospace" fontSize="11" fontWeight="800" fill="#ffffff">100% PASS</text>
          {/* Stats Bar */}
          <rect x="30" y="290" width="420" height="35" rx="8" fill="#0B2340" />
          <text x="45" y="312" fontFamily="Segoe UI, monospace" fontSize="12" fill="#e2e8f0">
            {statsText || "Cycle Time: 8.4 s   |   Yield: 99.7%   |   TestStand: Ready"}
          </text>
        </svg>
      );

    case 'hardware':
      return (
        <svg viewBox="0 0 480 340" className="w-full h-auto drop-shadow-2xl" role="img" aria-label="NI PXIe and benchtop instrument communication architecture">
          <rect x="0" y="0" width="480" height="340" rx="14" fill="#07191e" />
          {/* PXIe Chassis Box */}
          <rect x="25" y="30" width="220" height="230" rx="10" fill="#0f172a" stroke="#E7651A" strokeWidth="2" />
          <text x="40" y="55" fontFamily="Segoe UI, monospace" fontSize="13" fontWeight="800" fill="#38bdf8">NI PXIe-1085</text>
          <text x="40" y="70" fontFamily="Segoe UI, monospace" fontSize="10" fill="#94a3b8">18-Slot Gen-3 Chassis</text>
          {/* Card slots */}
          <rect x="40" y="85" width="25" height="160" rx="3" fill="#1e293b" />
          <rect x="70" y="85" width="25" height="160" rx="3" fill="#E7651A" />
          <rect x="100" y="85" width="25" height="160" rx="3" fill="#1e293b" />
          <rect x="130" y="85" width="25" height="160" rx="3" fill="#0284c7" />
          <rect x="160" y="85" width="25" height="160" rx="3" fill="#1e293b" />
          <rect x="190" y="85" width="25" height="160" rx="3" fill="#E7651A" />
          <line x1="40" y1="210" x2="215" y2="210" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 4" />
          <text x="45" y="235" fontFamily="Segoe UI, monospace" fontSize="9" fill="#38bdf8">24 GB/s BACKPLANE</text>
          {/* Benchtop Instruments */}
          <rect x="270" y="30" width="185" height="65" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="1" />
          <text x="285" y="55" fontFamily="Segoe UI, monospace" fontSize="11" fontWeight="700" fill="#ffffff">KEYSIGHT DMM 6.5</text>
          <text x="285" y="75" fontFamily="Segoe UI, monospace" fontSize="13" fontWeight="800" fill="#10b981">12.00034 VDC</text>

          <rect x="270" y="110" width="185" height="65" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="1" />
          <text x="285" y="135" fontFamily="Segoe UI, monospace" fontSize="11" fontWeight="700" fill="#ffffff">CHROMA 62000P</text>
          <text x="285" y="155" fontFamily="Segoe UI, monospace" fontSize="13" fontWeight="800" fill="#38bdf8">48.0V / 25.0A</text>

          <rect x="270" y="190" width="185" height="70" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="1" />
          <text x="285" y="215" fontFamily="Segoe UI, monospace" fontSize="11" fontWeight="700" fill="#ffffff">ROHDE &amp; SCHWARZ</text>
          <text x="285" y="235" fontFamily="Segoe UI, monospace" fontSize="13" fontWeight="800" fill="#f59e0b">2.450 GHz -12dBm</text>

          {/* Connection Bus Lines */}
          <path d="M 245 100 L 270 65" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3" />
          <path d="M 245 145 L 270 145" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3" />
          <path d="M 245 190 L 270 225" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3" />

          {/* Stats Bar */}
          <rect x="25" y="285" width="430" height="35" rx="8" fill="#0B2340" />
          <text x="40" y="307" fontFamily="Segoe UI, monospace" fontSize="12" fill="#e2e8f0">
            {statsText || "Sync Jitter: < 1 ns   |   Bandwidth: 24 GB/s   |   Bus: PCIe / PXIe"}
          </text>
        </svg>
      );

    case 'plc':
      return (
        <svg viewBox="0 0 480 340" className="w-full h-auto drop-shadow-2xl" role="img" aria-label="Industrial PLC automation and SCADA dashboard">
          <rect x="0" y="0" width="480" height="340" rx="14" fill="#07191e" />
          {/* PLC Rack */}
          <rect x="30" y="30" width="210" height="150" rx="8" fill="#0f172a" stroke="#E7651A" strokeWidth="2" />
          <rect x="45" y="45" width="40" height="120" rx="4" fill="#094750" />
          <text x="50" y="70" fontFamily="Segoe UI, monospace" fontSize="9" fontWeight="800" fill="#ffffff">CPU</text>
          <text x="48" y="85" fontFamily="Segoe UI, monospace" fontSize="8" fill="#38bdf8">1515</text>
          <circle cx="65" cy="110" r="4" fill="#10b981" />
          <circle cx="65" cy="125" r="4" fill="#10b981" />
          <circle cx="65" cy="140" r="4" fill="#38bdf8" />
          {/* I/O Modules */}
          <rect x="95" y="45" width="30" height="120" rx="3" fill="#1e293b" />
          <rect x="135" y="45" width="30" height="120" rx="3" fill="#1e293b" />
          <rect x="175" y="45" width="30" height="120" rx="3" fill="#E7651A" />
          <text x="45" y="195" fontFamily="Segoe UI, monospace" fontSize="11" fontWeight="700" fill="#38bdf8">SIEMENS S7-1500 / PROFINET</text>

          {/* Pneumatic Cylinder Actuator */}
          <rect x="270" y="40" width="180" height="130" rx="8" fill="#1e293b" stroke="#334155" />
          <rect x="290" y="75" width="90" height="30" rx="4" fill="#334155" />
          <rect x="380" y="85" width="50" height="10" fill="#94a3b8" />
          <circle cx="430" cy="90" r="8" fill="#f59e0b" />
          <text x="290" y="65" fontFamily="Segoe UI, monospace" fontSize="11" fontWeight="700" fill="#ffffff">FESTO PNEUMATICS</text>
          <text x="290" y="130" fontFamily="Segoe UI, monospace" fontSize="10" fill="#10b981">Clamp: EXTENDED</text>
          <text x="290" y="148" fontFamily="Segoe UI, monospace" fontSize="10" fill="#38bdf8">Interlock: LOCKED</text>

          {/* Plant SCADA Dashboard */}
          <rect x="30" y="200" width="420" height="70" rx="8" fill="#0B2340" stroke="#E7651A" strokeWidth="1" />
          <text x="45" y="225" fontFamily="Segoe UI, monospace" fontSize="12" fontWeight="700" fill="#38bdf8">OPC UA / ETHERNET-IP BRIDGE</text>
          <text x="45" y="248" fontFamily="Segoe UI, monospace" fontSize="11" fill="#cbd5e1">Station_1: IDLE  |  Station_2: TESTING  |  Station_3: CONVEYOR RUN</text>
          <circle cx="420" cy="235" r="7" fill="#10b981" />

          {/* Stats Bar */}
          <rect x="30" y="285" width="420" height="35" rx="8" fill="#0B2340" />
          <text x="45" y="307" fontFamily="Segoe UI, monospace" fontSize="12" fill="#e2e8f0">
            {statsText || "Cycle Time: 10 ms   |   Protocol: OPC UA / CIP   |   Safety: Cat 4"}
          </text>
        </svg>
      );

    case 'refactor':
      return (
        <svg viewBox="0 0 480 340" className="w-full h-auto drop-shadow-2xl" role="img" aria-label="Modular LabVIEW software architecture and message brokers">
          <rect x="0" y="0" width="480" height="340" rx="14" fill="#07191e" />
          {/* Main Module (DQMH Core) */}
          <rect x="35" y="30" width="180" height="100" rx="8" fill="#094750" stroke="#E7651A" strokeWidth="2" />
          <text x="50" y="58" fontFamily="Segoe UI, monospace" fontSize="12" fontWeight="800" fill="#ffffff">UI MESSAGE BROKER</text>
          <text x="50" y="78" fontFamily="Segoe UI, monospace" fontSize="10" fill="#38bdf8">Event-Driven Queue</text>
          <text x="50" y="98" fontFamily="Segoe UI, monospace" fontSize="10" fill="#e2e8f0">Status: Non-Blocking</text>

          {/* Acquisition Worker Module */}
          <rect x="265" y="30" width="180" height="100" rx="8" fill="#0f172a" stroke="#0284c7" strokeWidth="2" />
          <text x="280" y="58" fontFamily="Segoe UI, monospace" fontSize="12" fontWeight="800" fill="#38bdf8">DAQ ENGINE (HAL)</text>
          <text x="280" y="78" fontFamily="Segoe UI, monospace" fontSize="10" fill="#94a3b8">Lossless Producer Loop</text>
          <text x="280" y="98" fontFamily="Segoe UI, monospace" fontSize="10" fill="#10b981">Rate: 1.00 MS/s Stream</text>

          {/* Connecting Asynchronous Queues */}
          <path d="M 215 80 L 265 80" stroke="#38bdf8" strokeWidth="3" markerEnd="url(#arrow)" />
          <path d="M 265 95 L 215 95" stroke="#10b981" strokeWidth="2" strokeDasharray="3 3" />

          {/* Memory Profiler / Trace Graph */}
          <rect x="35" y="150" width="410" height="115" rx="8" fill="#0B2340" stroke="#1e293b" />
          <text x="50" y="175" fontFamily="Segoe UI, monospace" fontSize="11" fontWeight="700" fill="#ffffff">MEMORY LEAK &amp; JITTER PROFILE (DETT)</text>
          {/* Flat line graph showing zero leaks */}
          <line x1="50" y1="210" x2="425" y2="210" stroke="#1e293b" strokeWidth="1" />
          <path d="M 50 220 L 100 215 L 180 216 L 250 215 L 340 215 L 420 215" fill="none" stroke="#10b981" strokeWidth="3" />
          <text x="50" y="245" fontFamily="Segoe UI, monospace" fontSize="10" fill="#10b981">RAM: 42.4 MB (FLAT / ZERO LEAKS)</text>
          <text x="280" y="245" fontFamily="Segoe UI, monospace" fontSize="10" fill="#38bdf8">RT Jitter: &lt; 5 µs Deterministic</text>

          {/* Stats Bar */}
          <rect x="35" y="285" width="410" height="35" rx="8" fill="#0B2340" />
          <text x="50" y="307" fontFamily="Segoe UI, monospace" fontSize="12" fill="#e2e8f0">
            {statsText || "Uptime: 99.98%   |   RT Jitter: < 5 µs   |   Threads: Safe"}
          </text>
        </svg>
      );

    case 'battery':
      return (
        <svg viewBox="0 0 480 340" className="w-full h-auto drop-shadow-2xl" role="img" aria-label="EV high-voltage battery test bench and regenerative cycler">
          <rect x="0" y="0" width="480" height="340" rx="14" fill="#07191e" />
          {/* Battery Pack Enclosure */}
          <rect x="30" y="30" width="220" height="150" rx="10" fill="#0f172a" stroke="#E7651A" strokeWidth="2" />
          <text x="45" y="55" fontFamily="Segoe UI, monospace" fontSize="12" fontWeight="800" fill="#ffffff">800V EV BATTERY PACK</text>
          {/* Cell Matrix */}
          <g fill="#E7651A" opacity="0.8">
            <rect x="45" y="70" width="28" height="20" rx="3" />
            <rect x="80" y="70" width="28" height="20" rx="3" />
            <rect x="115" y="70" width="28" height="20" rx="3" />
            <rect x="150" y="70" width="28" height="20" rx="3" />
            <rect x="185" y="70" width="28" height="20" rx="3" />

            <rect x="45" y="98" width="28" height="20" rx="3" />
            <rect x="80" y="98" width="28" height="20" rx="3" />
            <rect x="115" y="98" width="28" height="20" rx="3" fill="#10b981" />
            <rect x="150" y="98" width="28" height="20" rx="3" />
            <rect x="185" y="98" width="28" height="20" rx="3" />

            <rect x="45" y="126" width="28" height="20" rx="3" />
            <rect x="80" y="126" width="28" height="20" rx="3" />
            <rect x="115" y="126" width="28" height="20" rx="3" />
            <rect x="150" y="126" width="28" height="20" rx="3" />
            <rect x="185" y="126" width="28" height="20" rx="3" />
          </g>
          <text x="45" y="165" fontFamily="Segoe UI, monospace" fontSize="10" fill="#38bdf8">256 CH ISOLATED DAQ</text>

          {/* Regenerative DC Power Cycler */}
          <rect x="275" y="30" width="175" height="150" rx="10" fill="#1e293b" stroke="#0284c7" strokeWidth="2" />
          <text x="290" y="55" fontFamily="Segoe UI, monospace" fontSize="12" fontWeight="800" fill="#38bdf8">CHROMA REGEN</text>
          <text x="290" y="80" fontFamily="Segoe UI, monospace" fontSize="15" fontWeight="900" fill="#ffffff">742.8 VDC</text>
          <text x="290" y="105" fontFamily="Segoe UI, monospace" fontSize="15" fontWeight="900" fill="#10b981">+285.4 A</text>
          <text x="290" y="130" fontFamily="Segoe UI, monospace" fontSize="10" fill="#94a3b8">Power: 212 kW (Regen)</text>
          <rect x="290" y="145" width="80" height="22" rx="4" fill="#094750" />
          <text x="298" y="160" fontFamily="Segoe UI, monospace" fontSize="10" fontWeight="700" fill="#10b981">CAN-FD OK</text>

          {/* Thermal Chiller & Safety Interlock Bar */}
          <rect x="30" y="195" width="420" height="75" rx="8" fill="#0B2340" stroke="#1e293b" />
          <text x="45" y="220" fontFamily="Segoe UI, monospace" fontSize="11" fontWeight="700" fill="#38bdf8">CHILLER &amp; SAFETY INTERLOCK BUS</text>
          <text x="45" y="242" fontFamily="Segoe UI, monospace" fontSize="11" fill="#cbd5e1">Coolant Temp: 24.2°C  |  Flow: 18.5 L/min  |  Hipot: PASS  |  E-Stop: ARMED</text>
          <circle cx="420" cy="235" r="7" fill="#10b981" />

          {/* Stats Bar */}
          <rect x="30" y="285" width="420" height="35" rx="8" fill="#0B2340" />
          <text x="45" y="307" fontFamily="Segoe UI, monospace" fontSize="12" fill="#e2e8f0">
            {statsText || "Voltage: Up to 1000V   |   Current: Up to 600A   |   BMS: CAN-FD"}
          </text>
        </svg>
      );

    case 'hil':
      return (
        <svg viewBox="0 0 480 340" className="w-full h-auto drop-shadow-2xl" role="img" aria-label="Hardware-in-the-Loop simulator with FPGA plant model and fault insertion">
          <rect x="0" y="0" width="480" height="340" rx="14" fill="#07191e" />
          {/* Target ECU */}
          <rect x="30" y="30" width="130" height="150" rx="8" fill="#1e293b" stroke="#94a3b8" strokeWidth="2" />
          <text x="45" y="55" fontFamily="Segoe UI, monospace" fontSize="12" fontWeight="800" fill="#ffffff">TARGET ECU</text>
          <text x="45" y="75" fontFamily="Segoe UI, monospace" fontSize="9" fill="#94a3b8">Flight / Powertrain</text>
          <circle cx="50" cy="110" r="4" fill="#10b981" />
          <circle cx="50" cy="125" r="4" fill="#38bdf8" />
          <circle cx="50" cy="140" r="4" fill="#f59e0b" />
          <text x="60" y="114" fontFamily="Segoe UI, monospace" fontSize="8" fill="#e2e8f0">CAN-FD</text>
          <text x="60" y="129" fontFamily="Segoe UI, monospace" fontSize="8" fill="#e2e8f0">PWM Out</text>
          <text x="60" y="144" fontFamily="Segoe UI, monospace" fontSize="8" fill="#e2e8f0">Sensors</text>

          {/* Fault Insertion Unit (FIU) Matrix */}
          <rect x="185" y="30" width="110" height="150" rx="8" fill="#094750" stroke="#E7651A" strokeWidth="1.5" />
          <text x="195" y="55" fontFamily="Segoe UI, monospace" fontSize="11" fontWeight="800" fill="#38bdf8">FIU MATRIX</text>
          <rect x="195" y="70" width="90" height="20" rx="3" fill="#0B2340" />
          <text x="200" y="84" fontFamily="Segoe UI, monospace" fontSize="9" fill="#10b981">Pin 12: Normal</text>
          <rect x="195" y="95" width="90" height="20" rx="3" fill="#0B2340" />
          <text x="200" y="109" fontFamily="Segoe UI, monospace" fontSize="9" fill="#ef4444">Pin 14: Short-GND</text>
          <rect x="195" y="120" width="90" height="20" rx="3" fill="#0B2340" />
          <text x="200" y="134" fontFamily="Segoe UI, monospace" fontSize="9" fill="#10b981">Pin 18: Normal</text>
          <text x="195" y="165" fontFamily="Segoe UI, monospace" fontSize="9" fill="#ffffff">AUTO FAULT INJ</text>

          {/* FPGA Real-Time Plant Model */}
          <rect x="320" y="30" width="130" height="150" rx="8" fill="#0f172a" stroke="#0284c7" strokeWidth="2" />
          <text x="335" y="55" fontFamily="Segoe UI, monospace" fontSize="11" fontWeight="800" fill="#38bdf8">FPGA PLANT</text>
          <text x="335" y="75" fontFamily="Segoe UI, monospace" fontSize="9" fill="#94a3b8">Kintex-7 RT Engine</text>
          <text x="335" y="105" fontFamily="Segoe UI, monospace" fontSize="12" fontWeight="800" fill="#10b981">&lt; 1 µs LOOP</text>
          <text x="335" y="125" fontFamily="Segoe UI, monospace" fontSize="9" fill="#cbd5e1">PMSM Motor Sim</text>
          <text x="335" y="145" fontFamily="Segoe UI, monospace" fontSize="9" fill="#cbd5e1">Aero Flight Model</text>

          {/* Closed Loop Arrows */}
          <path d="M 160 85 L 185 85" stroke="#38bdf8" strokeWidth="2" />
          <path d="M 295 85 L 320 85" stroke="#38bdf8" strokeWidth="2" />

          {/* TestStand Automation Dashboard */}
          <rect x="30" y="195" width="420" height="75" rx="8" fill="#0B2340" stroke="#1e293b" />
          <text x="45" y="220" fontFamily="Segoe UI, monospace" fontSize="11" fontWeight="700" fill="#38bdf8">NI TESTSTAND REGRESSION CAMPAIGN</text>
          <text x="45" y="242" fontFamily="Segoe UI, monospace" fontSize="11" fill="#cbd5e1">1,240 / 1,240 Test Cases Executed  |  ISO 26262 ASIL D Pass: 100%</text>
          <circle cx="420" cy="235" r="7" fill="#10b981" />

          {/* Stats Bar */}
          <rect x="30" y="285" width="420" height="35" rx="8" fill="#0B2340" />
          <text x="45" y="307" fontFamily="Segoe UI, monospace" fontSize="12" fill="#e2e8f0">
            {statsText || "Loop Rate: < 1 µs   |   Plant Models: FPGA   |   Fault Insertion: Auto"}
          </text>
        </svg>
      );

    case 'rf':
      return (
        <svg viewBox="0 0 480 340" className="w-full h-auto drop-shadow-2xl" role="img" aria-label="Vector network analyzer Smith chart and 40 GHz spectrum display">
          <rect x="0" y="0" width="480" height="340" rx="14" fill="#07191e" />
          {/* VNA Screen */}
          <rect x="30" y="30" width="240" height="160" rx="8" fill="#0B2340" stroke="#E7651A" strokeWidth="2" />
          <text x="45" y="55" fontFamily="Segoe UI, monospace" fontSize="11" fontWeight="800" fill="#38bdf8">VNA S11 SMITH CHART</text>
          {/* Smith Chart circles */}
          <circle cx="150" cy="115" r="50" fill="none" stroke="#1e293b" strokeWidth="1.5" />
          <circle cx="175" cy="115" r="25" fill="none" stroke="#1e293b" strokeWidth="1" />
          <path d="M 100 115 A 50 50 0 0 1 200 115" fill="none" stroke="#1e293b" strokeWidth="1" />
          {/* Measured S11 curve */}
          <path d="M 110 115 Q 140 85, 160 110 T 175 115" fill="none" stroke="#10b981" strokeWidth="2.5" />
          <circle cx="175" cy="115" r="4" fill="#f59e0b" />
          <text x="45" y="175" fontFamily="Segoe UI, monospace" fontSize="9" fill="#10b981">Marker 1: 28.5 GHz, Z = 50.2 - j1.1 Ω</text>

          {/* S21 Frequency Response & Insertion Loss */}
          <rect x="285" y="30" width="165" height="160" rx="8" fill="#0f172a" stroke="#0284c7" strokeWidth="1.5" />
          <text x="295" y="55" fontFamily="Segoe UI, monospace" fontSize="11" fontWeight="800" fill="#38bdf8">S21 INSERTION LOSS</text>
          <line x1="295" y1="120" x2="435" y2="120" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3" />
          <path d="M 295 90 L 340 92 L 360 140 L 380 92 L 435 95" fill="none" stroke="#38bdf8" strokeWidth="2" />
          <text x="295" y="165" fontFamily="Segoe UI, monospace" fontSize="9" fill="#e2e8f0">Bandwidth: 2.4 - 40.0 GHz</text>
          <text x="295" y="180" fontFamily="Segoe UI, monospace" fontSize="9" fill="#10b981">Rejection: &gt; 65 dB @ Notch</text>

          {/* Touchstone Export & Coaxial Switch Bar */}
          <rect x="30" y="200" width="420" height="70" rx="8" fill="#0B2340" stroke="#1e293b" />
          <text x="45" y="225" fontFamily="Segoe UI, monospace" fontSize="11" fontWeight="700" fill="#38bdf8">TOUCHSTONE S2P EXPORT &amp; DE-EMBEDDING</text>
          <text x="45" y="248" fontFamily="Segoe UI, monospace" fontSize="11" fill="#cbd5e1">File: DUT_Filter_KaBand.s2p  |  E-Cal: VALID  |  Switch Isolation: &gt; 90 dB</text>
          <circle cx="420" cy="235" r="7" fill="#10b981" />

          {/* Stats Bar */}
          <rect x="30" y="285" width="420" height="35" rx="8" fill="#0B2340" />
          <text x="45" y="307" fontFamily="Segoe UI, monospace" fontSize="12" fill="#e2e8f0">
            {statsText || "Frequency: DC to 40 GHz   |   Repeatability: < 0.05 dB   |   SOLT Cal: Auto"}
          </text>
        </svg>
      );

    default:
      return null;
  }
}

