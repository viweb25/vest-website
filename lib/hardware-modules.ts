import {
  Cpu,
  Activity,
  Server,
  Factory,
  Sliders,
  Gauge,
  Eye,
  Car
} from 'lucide-react';

export const HARDWARE_MODULES = [
  {
    title: 'NI Modular',
    subtitle: 'CompactDAQ',
    label: 'NI cDAQ Chassis',
    eyebrow: 'MODULAR DAQ ARCHITECTURE',
    image: '/NI CompactDAQ Modular System Stack.png',
    chef: 'Modular DAQ',
    kitchen: 'National Instruments DAQmx',
    desc: 'Modular data acquisition systems for benchtop, laboratory, and production line measurements with sub-millisecond synchronization.',
    description: 'Modular data acquisition systems for benchtop, laboratory, and production line measurements with sub-millisecond synchronization.',
    tag: 'Modular DAQ',
    icon: Cpu,
    ingredients: ['Hot-Swappable C-Series', 'Up to 1 MS/s/ch', 'Analog & Digital I/O', 'USB / Ethernet / Wi-Fi'],
    accent: '#E7651A'
  },
  {
    title: 'NI Embedded',
    subtitle: 'CompactRIO',
    label: 'NI cRIO Controller',
    eyebrow: 'EMBEDDED RT & FPGA',
    image: '/NI CompactRIO Industrial Controller Modules.png',
    chef: 'Real-Time & FPGA',
    kitchen: 'Xilinx FPGA & NI Linux RT',
    desc: 'High-performance embedded control and acquisition with real-time processors and user-programmable FPGAs for deterministic microsecond loops.',
    description: 'High-performance embedded control and acquisition with real-time processors and user-programmable FPGAs for deterministic microsecond loops.',
    tag: 'Real-Time & FPGA',
    icon: Activity,
    ingredients: ['Deterministic RTOS', 'User-Programmable FPGA', 'Rugged -40°C to 70°C', 'High-Speed Interlocks'],
    accent: '#0284c7'
  },
  {
    title: 'Modular Instrument',
    subtitle: 'PXI Express',
    label: 'NI PXIe Chassis',
    eyebrow: 'HIGH-SPEED CHASSIS',
    image: '/NI PXIe-1085 Modular Instrument Chassis.png',
    chef: 'High-Speed Test',
    kitchen: 'PCI Express Bus & PXI Timing',
    desc: 'Rugged, PC-based platform for high-channel-count, high-speed automated test and measurement with picosecond backplane synchronization.',
    description: 'Rugged, PC-based platform for high-channel-count, high-speed automated test and measurement with picosecond backplane synchronization.',
    tag: 'High-Speed Test',
    icon: Server,
    ingredients: ['Up to 24 GB/s Bandwidth', 'Sub-Nanosecond Clock Sync', 'RF & High-Speed Digitisers', 'Multi-Slot Modular Chassis'],
    accent: '#0f766e'
  },
  {
    title: 'Industrial',
    subtitle: 'PLCs & SCADA',
    label: 'Siemens & Allen-Bradley',
    eyebrow: 'FACTORY AUTOMATION',
    image: '/Industrial SCADA Control System Collage.png',
    chef: 'Factory Control',
    kitchen: 'OPC UA, Modbus & Ethernet/IP',
    desc: 'Siemens (S7-1200/1500), Allen-Bradley (ControlLogix), Mitsubishi, and Delta PLC integration with role-based operator dashboards.',
    description: 'Siemens (S7-1200/1500), Allen-Bradley (ControlLogix), Mitsubishi, and Delta PLC integration with role-based operator dashboards.',
    tag: 'Factory Control',
    icon: Factory,
    ingredients: ['OPC UA Bi-Directional', 'Modbus TCP / RTU', 'EtherNet/IP Native', 'Fail-Safe Safety Interlocks'],
    accent: '#d97706'
  },
  {
    title: 'Precision',
    subtitle: 'Bench Instruments',
    label: 'GPIB / USB / SCPI',
    eyebrow: 'LABORATORY INSTRUMENTS',
    image: '/Precision NI Laboratory Instrument Stack.png',
    chef: 'Instrument Control',
    kitchen: 'VISA & SCPI Protocols',
    desc: 'Oscilloscopes, DMMs, power supplies, and function generators automated via GPIB, USB, and Ethernet with automated calibration.',
    description: 'Oscilloscopes, DMMs, power supplies, and function generators automated via GPIB, USB, and Ethernet with automated calibration.',
    tag: 'Instrument Control',
    icon: Sliders,
    ingredients: ['Keysight / Tektronix / Rohde', 'Automated SCPI Scripting', 'Multi-Instrument Sequencing', 'Automated Calibration Logging'],
    accent: '#6366f1'
  },
  {
    title: 'Precision',
    subtitle: 'Sensors & I/O',
    label: 'Sensors & Transducers',
    eyebrow: 'SIGNAL CONDITIONING',
    image: '/Precision Signal Conditioning Sensor Array.png',
    chef: 'Sensors & I/O',
    kitchen: 'mV, mA, Bridge & Piezo Transducers',
    desc: 'Thermocouples, RTDs, strain gauges, load cells, pressure transducers, accelerometers, and LVDTs conditioned with high precision.',
    description: 'Thermocouples, RTDs, strain gauges, load cells, pressure transducers, accelerometers, and LVDTs conditioned with high precision.',
    tag: 'Sensors & I/O',
    icon: Gauge,
    ingredients: ['Cold-Junction Compensation', 'Quarter/Half/Full Bridge', 'IEPE Accelerometer Inputs', 'Galvanic Channel Isolation'],
    accent: '#059669'
  },
  {
    title: 'High-Speed',
    subtitle: 'Vision Cameras',
    label: 'GigE & USB3 Vision',
    eyebrow: 'OPTICAL QUALITY CONTROL',
    image: '/Industrial Vision Quality Control Showcase.png',
    chef: 'Optical Quality Control',
    kitchen: 'NI Vision Development Module',
    desc: 'GigE and USB3 industrial cameras for high-speed automated defect inspection, dimensional verification, and OCR barcode reading.',
    description: 'GigE and USB3 industrial cameras for high-speed automated defect inspection, dimensional verification, and OCR barcode reading.',
    tag: 'Optical Quality Control',
    icon: Eye,
    ingredients: ['GigE Vision / USB3 Vision', 'Hardware Trigger Sync', 'Sub-Pixel Feature Gauging', 'Edge Deep Learning Models'],
    accent: '#2563eb'
  },
  {
    title: 'Automotive',
    subtitle: 'ECU & CAN Bus',
    label: 'CAN, LIN & FlexRay',
    eyebrow: 'VEHICLE NETWORK BUS',
    image: '/Automotive Ethernet and CAN Diagnostic Workstation.png',
    chef: 'Vehicle Network Bus',
    kitchen: 'NI-XNET & Vector Database',
    desc: 'CAN, CAN FD, LIN, and FlexRay interfaces for vehicle network communication, ECU flashing, and real-time HIL simulation.',
    description: 'CAN, CAN FD, LIN, and FlexRay interfaces for vehicle network communication, ECU flashing, and real-time HIL simulation.',
    tag: 'Vehicle Network Bus',
    icon: Car,
    ingredients: ['CAN FD up to 8 Mbps', 'DBC / FIBEX File Support', 'Hardware Cyclic Frame Tx/Rx', 'Fault Insertion Bus Testing'],
    accent: '#dc2626'
  }
];

export const SERVICE_HARDWARE_MAP: Record<string, string[]> = {
  // Vision & AI Services
  'ai-vision-inspection': ['Vision Cameras', 'Sensors & I/O', 'PLCs & SCADA', 'CompactRIO'],
  'vision-inspection-ai': ['Vision Cameras', 'Sensors & I/O', 'PLCs & SCADA', 'CompactRIO'],
  'ai-object-detection': ['Vision Cameras', 'Sensors & I/O', 'PLCs & SCADA', 'CompactRIO'],
  'ai-machine-vision-defect-detection': ['Vision Cameras', 'Sensors & I/O', 'PLCs & SCADA', 'CompactRIO'],
  'machine-vision': ['Vision Cameras', 'Sensors & I/O', 'PLCs & SCADA', 'CompactRIO'],

  // Automated Test Equipment (ATE Racks)
  'automated-test-systems': ['PXI Express', 'Bench Instruments', 'CompactDAQ', 'Sensors & I/O'],
  'automated-test-equipment-ate': ['PXI Express', 'Bench Instruments', 'CompactDAQ', 'Sensors & I/O'],
  'ate-systems': ['PXI Express', 'Bench Instruments', 'CompactDAQ', 'Sensors & I/O'],

  // Hardware & Instrument Integration
  'hardware-instrument-integration': ['CompactDAQ', 'PXI Express', 'Bench Instruments', 'Sensors & I/O', 'CompactRIO'],
  'instrument-integration': ['CompactDAQ', 'PXI Express', 'Bench Instruments', 'Sensors & I/O', 'CompactRIO'],
  'hardware-integration': ['CompactDAQ', 'PXI Express', 'Bench Instruments', 'Sensors & I/O', 'CompactRIO'],

  // PLC & Industrial Automation
  'industrial-automation': ['PLCs & SCADA', 'Sensors & I/O', 'CompactRIO', 'Vision Cameras'],
  'plc-automation-integration': ['PLCs & SCADA', 'Sensors & I/O', 'CompactRIO', 'Vision Cameras'],
  'plc-scada': ['PLCs & SCADA', 'Sensors & I/O', 'CompactRIO', 'Vision Cameras'],

  // LabVIEW Application Development
  'labview-application-development': ['CompactDAQ', 'CompactRIO', 'PXI Express', 'Bench Instruments'],
  'labview-architecture': ['CompactDAQ', 'CompactRIO', 'PXI Express', 'Bench Instruments'],
  'labview-solutions': ['CompactDAQ', 'CompactRIO', 'PXI Express', 'Bench Instruments'],
  'labview-engineering': ['CompactDAQ', 'CompactRIO', 'PXI Express', 'Bench Instruments'],

  // Legacy Code Refactoring
  'legacy-code-refactoring': ['Bench Instruments', 'PXI Express', 'CompactDAQ', 'Sensors & I/O'],
  'labview-code-refactoring': ['Bench Instruments', 'PXI Express', 'CompactDAQ', 'Sensors & I/O'],
  'legacy-modernization': ['Bench Instruments', 'PXI Express', 'CompactDAQ', 'Sensors & I/O'],

  // EV Battery Test Benches
  'ev-battery-test-benches': ['CompactDAQ', 'CompactRIO', 'Bench Instruments', 'ECU & CAN Bus'],
  'ev-battery-testing': ['CompactDAQ', 'CompactRIO', 'Bench Instruments', 'ECU & CAN Bus'],

  // Hardware-in-the-Loop (HIL)
  'hardware-in-the-loop-hil': ['PXI Express', 'ECU & CAN Bus', 'Sensors & I/O', 'CompactRIO'],
  'hil-testing': ['PXI Express', 'ECU & CAN Bus', 'Sensors & I/O', 'CompactRIO'],

  // RF & Wireless Automated Test
  'rf-wireless-automated-test': ['PXI Express', 'Bench Instruments', 'Sensors & I/O', 'CompactDAQ'],
  'rf-test': ['PXI Express', 'Bench Instruments', 'Sensors & I/O', 'CompactDAQ'],
};

export function getHardwareModulesForService(slug: string) {
  const allowed = SERVICE_HARDWARE_MAP[slug];
  if (!allowed || allowed.length < 3) {
    return HARDWARE_MODULES;
  }
  const filtered = HARDWARE_MODULES.filter((m) => allowed.includes(m.subtitle));
  return filtered.length >= 3 ? filtered : HARDWARE_MODULES;
}

