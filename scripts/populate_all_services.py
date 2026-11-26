# -*- coding: utf-8 -*-
"""
Full Generator for vest-website/data/servicesData.ts
Populates all 10 comprehensive, production-grade service pages.
"""
import json
import os

services_dict = {}

# Import or define the first 3
import sys
sys.path.append(os.path.dirname(__file__))
from build_all_services import SERVICES as BASE_SERVICES

services_dict.update(BASE_SERVICES)

# ---------------------------------------------------------------------------
# 4. HARDWARE & BENCH INSTRUMENT INTEGRATION
# ---------------------------------------------------------------------------
services_dict["hardware-instrument-integration"] = {
    "slug": "hardware-instrument-integration",
    "aliases": ["hardware", "instrument-integration"],
    "meta": {
        "title": "Hardware & Bench Instrument Integration | NI PXI, cDAQ, cRIO – VEST Solutions",
        "description": "Seamless interfacing with NI PXI, CompactDAQ, CompactRIO, PLCs, and third-party laboratory instruments via SCPI, VISA, and bus protocols.",
        "keywords": "NI PXI integration, CompactDAQ, CompactRIO, SCPI automation, VISA drivers, instrument control, labview hardware, VEST Solutions"
    },
    "hero": {
        "eyebrow": "NI Hardware & SCPI Interfacing",
        "title": "Hardware & Bench Instrument Integration for",
        "titleAccent": "Automated Testing",
        "description": "Sub-millisecond synchronization and deterministic control across NI PXI, CompactDAQ, CompactRIO, and multi-vendor laboratory bench instruments.",
        "primaryCta": {"text": "Discuss Hardware Requirements", "href": "#contact"},
        "secondaryCta": {"text": "View Supported Instruments", "href": "#hardware"},
        "artType": "hardware",
        "statsText": "Sync Jitter: < 1 ns   |   Bandwidth: 24 GB/s   |   Bus: PCIe / PXIe"
    },
    "intro": {
        "eyebrow": "About the Service",
        "heading": "Unified Hardware Control for",
        "headingAccent": "Complex Multi-Instrument Rigs",
        "paragraph1": "At VEST Solutions, we eliminate the communication chaos of multi-vendor hardware environments. We develop standardized, high-speed instrument drivers and hardware abstraction layers (HAL) that unify National Instruments PXIe, cDAQ, and cRIO platforms with standalone bench instruments.",
        "paragraph2": "Whether automating high-bandwidth oscilloscopes over Gigabit LAN, synchronizing multichannel digitisers via PXI star triggers, or integrating legacy GPIB meters, we deliver bulletproof communication architectures that never drop packets or hang the software."
    },
    "capabilities": {
        "eyebrow": "What We Offer",
        "heading": "Hardware Interfacing",
        "headingAccent": "Capabilities",
        "cards": [
            {
                "title": "NI PXI & Modular Instruments",
                "description": "High-bandwidth automated test architectures leveraging PXIe backplane trigger buses and picosecond clock synchronization.",
                "bullets": ["Multi-chassis PXIe star trigger sync", "Direct Memory Access (DMA) streaming", "High-speed digitizers & AWGs", "Sub-nanosecond phase alignment"]
            },
            {
                "title": "CompactDAQ & Field DAQ",
                "description": "Modular sensor measurement systems for temperature, strain, pressure, acceleration, and high-voltage isolation.",
                "bullets": ["Hot-swappable C Series modules", "Time Sensitive Networking (TSN) sync", "NI-DAQmx high-speed task buffering", "Rugged IP67 field enclosures"]
            },
            {
                "title": "CompactRIO RT & FPGA",
                "description": "Rugged embedded control systems combining real-time processors with user-programmable Xilinx FPGAs for microsecond loops.",
                "bullets": ["Deterministic hardware interlocks", "Microsecond PID control loops", "Custom FPGA digital protocols", "Extended -40°C to 70°C operation"]
            },
            {
                "title": "SCPI & VISA Instrument Drivers",
                "description": "Certified driver packages automating laboratory oscilloscopes, spectrum analyzers, power supplies, and electronic loads.",
                "bullets": ["Standard Commands for Programmable Instruments", "Ethernet / LXI & USBTMC connectivity", "Legacy IEEE 488.2 GPIB preservation", "Automated self-calibration routines"]
            },
            {
                "title": "Industrial Bus Interfacing",
                "description": "Bridging test systems to automotive, industrial, and avionics communication buses with microsecond hardware timestamping.",
                "bullets": ["CAN 2.0B & CAN-FD automotive networks", "RS-232 / RS-422 / RS-485 serial buses", "Modbus TCP & RTU field controllers", "ARINC 429 & MIL-STD-1553 avionics"]
            }
        ]
    },
    "howItWorks": {
        "eyebrow": "How It Works",
        "heading": "How Our Hardware Integration",
        "headingAccent": "Operates",
        "lead": "From physical cable routing to standardized software abstraction, we enforce hardware rigor.",
        "steps": [
            {"step": 1, "title": "Signal & Bus Audit", "description": "Catalog all voltages, frequencies, bandwidth requirements, and communication protocols."},
            {"step": 2, "title": "Trigger & Timing Topology", "description": "Map hardware star triggers, 10 MHz reference clocks, and synchronization lines."},
            {"step": 3, "title": "Driver Layer Creation", "description": "Write thread-safe VISA/SCPI or DAQmx drivers with error handling and simulated offline modes."},
            {"step": 4, "title": "Hardware Abstraction (HAL)", "description": "Encapsulate drivers into polymorphic classes so physical instruments can be swapped later."},
            {"step": 5, "title": "Bus Saturation Benchmarking", "description": "Benchmark multi-channel streaming under continuous peak network and bus traffic."},
            {"step": 6, "title": "Calibration & Commissioning", "description": "Validate NIST-traceable calibration offsets and deploy on-site with full wiring docs."}
        ],
        "flowNote": "Physical Sensors → Signal Conditioning → NI DAQ / SCPI Bench → VISA / DAQmx Bus → Hardware Abstraction Layer → Test Logic"
    },
    "technologies": {
        "eyebrow": "Technologies",
        "heading": "Protocols, Standards &",
        "headingAccent": "Drivers",
        "languages": ["LabVIEW & LabVIEW FPGA", "Python (PyVISA / NI-DAQmx)", "C / C++ VISA SDK", "SCPI Command Sets", "VXIplug&play"],
        "frameworks": ["NI-DAQmx Framework", "NI-VISA", "NI-Sync & PXI Trigger Routing", "IVI (Interchangeable Virtual Instruments)", "LXI Consortium Standards"],
        "note": "We build IVI-compliant driver layers that allow test sequences to target logical instrument roles (e.g. 'DMM_Primary') rather than hardcoded vendor models."
    },
    "architecture": {
        "eyebrow": "Software Architecture",
        "heading": "Hardware Abstraction",
        "headingAccent": "Patterns",
        "cards": [
            {"title": "Hardware Abstraction Layer (HAL)", "description": "Abstracts physical devices behind generic interfaces (Initialize, Configure, Read, Reset, Close). Upgrading an instrument requires zero changes to test routines."},
            {"title": "PXI Backplane Trigger Routing", "description": "Uses dedicated PXI trigger and star lines to synchronize digitisers and AWGs in hardware without software latency jitter."},
            {"title": "Thread-Safe VISA Sessions", "description": "Implements semaphore-guarded instrument sessions to prevent simultaneous thread collisions on shared communication buses."},
            {"title": "Offline Hardware Simulator", "description": "Injects synthetic waveforms and responses when running on development laptops without physical hardware connected."}
        ]
    },
    "hardware": {
        "eyebrow": "Hardware Integration",
        "heading": "Instrument Vendors &",
        "headingAccent": "NI Platforms",
        "col1Title": "Supported Benchtop Manufacturers",
        "col1List": ["Keysight Technologies / Agilent", "Tektronix & Keithley Instruments", "Rohde & Schwarz RF Analyzers", "Chroma AC/DC Power Supplies & Loads", "Yokogawa Precision Power Analyzers", "Stanford Research Systems"],
        "col1ChipsTitle": "Communication Interfaces",
        "col1Chips": ["PXI Express", "GigE / LXI", "USB 3.0 / USBTMC", "GPIB (IEEE 488)", "RS-485", "CAN-FD"],
        "col1Note": "Full compatibility verification for discontinued and legacy equipment.",
        "col2Title": "National Instruments Ecosystem",
        "col2List": ["NI PXIe Chassis (up to 18 slots, 24 GB/s)", "NI PXIe Embedded Controllers & MXI Fiber Links", "CompactDAQ Ethernet, USB & Wi-Fi Chassis", "CompactRIO Real-Time Controllers & Chassis", "C Series Analog, Digital & Relay Modules", "NI Industrial Switching & Matrix Cards"],
        "col2Note": "Direct DMA channel optimization for multi-megasample continuous streaming."
    },
    "performance": {
        "eyebrow": "Timing & Determinism",
        "heading": "Hardware Precision &",
        "headingAccent": "Synchronization",
        "lead": "We eliminate software-induced measurement errors through hardware-timed synchronization.",
        "metrics": [
            {"value": "< 1 ns", "label": "PXI backplane skew across slots"},
            {"value": "24 GB/s", "label": "PXIe backplane data throughput"},
            {"value": "100%", "label": "Packet reception under peak bus load"},
            {"value": "10 µs", "label": "Hardware-timed trigger latency"},
            {"value": "1000V", "label": "Galvanic channel isolation"}
        ],
        "leftTitle": "Signal Integrity Assurance",
        "leftBullets": ["Differential signaling to reject factory common-mode noise", "Proper 50-ohm characteristic impedance termination", "Shielded twisted-pair cabling with star point grounding", "Calibration verification against NIST standards"],
        "rightTitle": "Bus Optimization",
        "rightBullets": ["Batch binary SCPI queries to reduce ASCII parse overhead", "Circular double-buffered DMA memory allocations", "Asynchronous non-blocking VISA read pipelines", "Dedicated hardware trigger lines replacing polling loops"]
    },
    "process": {
        "eyebrow": "Development Process",
        "heading": "Hardware Integration",
        "headingAccent": "Methodology",
        "steps": [
            {"number": 1, "title": "Instrument Interface Audit", "description": "Verify firmware versions, command sets, connection interfaces, and bus bandwidth."},
            {"number": 2, "title": "Wiring & Topology Blueprint", "description": "Design cable assemblies, shielding schematics, and star grounding topology."},
            {"number": 3, "title": "HAL Class Development", "description": "Write object-oriented LabVIEW or Python classes with simulation capability."},
            {"number": 4, "title": "Driver Stress Testing", "description": "Benchmark instrument query timeouts, buffer overflows, and reconnection logic."},
            {"number": 5, "title": "System Synchronization", "description": "Align clocks and test triggers using high-speed oscilloscopes to measure skew."},
            {"number": 6, "title": "Calibration Routine Build", "description": "Create automated multi-point voltage and current calibration routines."},
            {"number": 7, "title": "Site Commissioning", "description": "Install on customer test floor, verify noise margins, and deliver wiring manuals."}
        ]
    },
    "deliverables": {
        "eyebrow": "Deliverables",
        "heading": "What You",
        "headingAccent": "Receive",
        "col1": [
            "Complete LabVIEW project with driver libraries (.lvlib)",
            "Modular Hardware Abstraction Layer (HAL) source code",
            "Instrument simulation test stubs for offline development",
            "Auto-detection and hardware configuration utility",
            "Custom instrument communication error handling suite",
            "Automated calibration & zero-offset VIs"
        ],
        "col2": [
            "Comprehensive Hardware Interconnect Wiring Diagrams",
            "Trigger synchronization & skew validation reports",
            "SCPI / VISA command reference documentation",
            "Instrument firmware compatibility checklist",
            "Rack layout and cable management specification",
            "On-site installation and hardware commissioning sign-off"
        ]
    },
    "applications": {
        "eyebrow": "Industries",
        "heading": "Integrated",
        "headingAccent": "Applications",
        "cards": [
            {"title": "Aerospace Multi-Axis Shaker Tables", "description": "High-channel CompactDAQ acceleration and strain gauge acquisition synchronized with hydraulic servo controllers."},
            {"title": "Automotive Inverter Dynamometers", "description": "High-voltage isolated PXI power measurement synchronized with CAN-FD telemetry and chiller controllers."},
            {"title": "RF Component Characterization", "description": "Automated switching matrices coordinating VNAs, noise figure meters, and multi-channel power supplies."},
            {"title": "Power Grid Substation Monitoring", "description": "Rugged CompactRIO systems running Linux RT to sample three-phase transformers and execute transient capture."}
        ]
    },
    "whyUs": {
        "eyebrow": "Why VEST Solutions",
        "heading": "Why Choose",
        "headingAccent": "Our Engineers?",
        "col1": [
            "Extensive National Instruments alliance and certified hardware background",
            "Deep multi-vendor bench instrument expertise across 500+ device models",
            "Clean Hardware Abstraction Layers that protect software investments",
            "In-house electrical engineering capability for custom breakout fixtures"
        ],
        "col2": [
            "Strict adherence to CE, UL, and industrial noise immunity standards",
            "Complete open source delivery of all instrument drivers and VIs",
            "Hands-on experience with legacy GPIB modernization and fiber optic links",
            "Fast turn-around on custom instrument driver requests"
        ]
    },
    "perspective": {
        "eyebrow": "Our Perspective",
        "heading": "Engineering Truth:",
        "headingAccent": "Software Can't Fix Bad Physics",
        "lead": "A 100 MS/s digitizer will give you meaningless noise if you route unshielded cables across a high-current motor drive. True hardware integration starts with physical physics.",
        "leftTitle": "When to invest in modular PXI / cDAQ systems",
        "leftBullets": [
            "Channel counts exceeding 16 analog or digital measurement lines",
            "Sub-microsecond synchronization required across different measurement types",
            "High-throughput continuous streaming directly to disk (TDMS)",
            "Challenging shop-floor environments requiring shock and vibration tolerance"
        ],
        "rightTitle": "When standalone benchtop instruments are best",
        "rightBullets": [
            "Ultra-high precision RF or metrology calibration requirements",
            "R&D laboratory benches where manual front-panel knobs are essential",
            "Single-purpose test benches requiring only one or two measurements",
            "Low-frequency, intermittent logging tasks easily handled by USB meters"
        ],
        "recommendationTitle": "Our rule: eliminate software polling loops",
        "recommendationText": "Never poll an instrument repeatedly in a high-speed while loop to ask 'Are you done?'. Always utilize hardware triggers, service requests (SRQ), or DMA buffer completion interrupts. Hardware timing relieves CPU utilization from 90% down to 2% and completely removes jitter."
    },
    "mistakes": {
        "eyebrow": "Shop Floor Insights",
        "heading": "Common Hardware",
        "headingAccent": "Integration Pitfalls",
        "cards": [
            {"title": "Creating ground loops between instruments", "description": "Connecting multiple earth grounds creates circulating currents that add 50Hz hum to sensitive signals. We enforce single-point star grounding."},
            {"title": "Ignoring instrument command queue latency", "description": "Spamming SCPI queries over slow serial or GPIB buses causes buffer overruns and frozen instruments. We implement query pacing and timeout queues."},
            {"title": "Unterminated high-frequency coaxial cables", "description": "Omitting 50-ohm load termination causes signal reflections, ringing, and inaccurate voltage readings at high frequencies."},
            {"title": "Neglecting thermal drift in precision DAQ", "description": "Failing to allow instruments to warm up or neglecting self-calibration leads to significant measurement drift over shift changes."},
            {"title": "Relying on software timing for synchronization", "description": "Using Windows OS sleep timers to synchronize two instruments introduces 15ms random jitter. We use hardware backplane triggers."},
            {"title": "Hardcoding VISA resource strings in diagrams", "description": "Hardcoding 'GPIB0::14::INSTR' breaks the software when an instrument address changes. We use external configuration files."}
        ]
    },
    "projectPlanning": {
        "eyebrow": "Planning Your Project",
        "heading": "Cost Drivers &",
        "headingAccent": "Typical Timeline",
        "lead": "Integration costs depend on channel count, bus interfaces, and driver availability.",
        "costDriversCol1": [
            "Total instrument count and communication bus diversity",
            "Availability of pre-existing certified LabVIEW/VISA drivers",
            "High-speed synchronization and hardware triggering requirements",
            "Continuous data streaming rates and storage architecture",
            "Custom cable harness and breakout panel fabrication"
        ],
        "costDriversCol2": [
            "Legacy GPIB or proprietary serial protocol reverse engineering",
            "Hardware Abstraction Layer (HAL) and simulation scope",
            "NIST-traceable calibration validation protocols",
            "On-site installation and electrical noise shielding audit",
            "Post-deployment maintenance and driver update SLA"
        ],
        "phases": [
            {"badge": "A", "title": "Hardware Audit & Pinout Spec, 1 to 2 weeks", "description": "Verify instrument command sets, design wiring topologies, and map synchronization trigger lines."},
            {"badge": "B", "title": "Driver Layer & HAL Build, 2 to 4 weeks", "description": "Implement robust VISA/SCPI drivers, error handling modules, and offline simulation stubs."},
            {"badge": "C", "title": "Site Commissioning & Calibration, 1 to 2 weeks", "description": "Install on customer rack, connect physical signals, verify noise margins, and deliver documentation."}
        ]
    },
    "faq": {
        "eyebrow": "FAQ",
        "heading": "Frequently Asked",
        "headingAccent": "Questions",
        "items": [
            {"question": "Can you integrate our existing 15-year-old GPIB instruments with modern software?", "answer": "Yes. We preserve legacy IEEE 488.2 GPIB instruments by interfacing them through modern NI USB-GPIB or PCIe-GPIB controllers with standardized SCPI driver wrappers."},
            {"question": "What is the difference between NI PXIe and CompactDAQ?", "answer": "CompactDAQ is optimized for modular sensor measurements (temperatures, strains, pressures) up to 1 MS/s. PXIe is a high-bandwidth modular instrumentation standard (up to 24 GB/s) designed for high-speed digitisers, RF analyzers, and microsecond synchronization."},
            {"question": "Can we test our software without physical hardware connected?", "answer": "Yes. All our Hardware Abstraction Layers include built-in simulation engines that emulate instrument responses, allowing developers to test business logic completely offline."},
            {"question": "How do you synchronize measurements across multiple PXI chassis?", "answer": "We utilize NI-Sync timing modules and dedicated coaxial star trigger / 10 MHz reference clock cables to synchronize multiple chassis within sub-nanosecond phase alignment."},
            {"question": "Can you develop instrument drivers in Python as well as LabVIEW?", "answer": "Yes. We develop robust hardware drivers using PyVISA, NI-DAQmx Python, and C/C++ DLLs, ensuring interoperability across all programming languages."},
            {"question": "How do you handle instrument disconnects during continuous runs?", "answer": "Our drivers include automatic session reconnection watchdogs that gracefully re-establish communications and re-initialize device parameters without crashing the main application."},
            {"question": "Do you manufacture custom cable harnesses?", "answer": "Yes. We provide complete custom wiring harnesses, shielded breakout boxes, and mass interconnect panels labeled according to industrial schematics."},
            {"question": "Are your drivers compatible with 64-bit LabVIEW?", "answer": "Yes. All drivers are compiled and verified for both 32-bit and native 64-bit LabVIEW 2024+ environments."}
        ]
    },
    "cta": {
        "title": "Unify Your Hardware Ecosystem with VEST Solutions",
        "description": "Achieve deterministic multi-instrument synchronization and eliminate communication errors on your test benches.",
        "buttonText": "Schedule a Hardware Consultation",
        "buttonHref": "/book?service=hardware-instrument-integration"
    }
}

# ---------------------------------------------------------------------------
# 5. INDUSTRIAL AUTOMATION & PLC INTEGRATION
# ---------------------------------------------------------------------------
services_dict["industrial-automation"] = {
    "slug": "industrial-automation",
    "aliases": ["industrial", "plc-scada"],
    "meta": {
        "title": "PLC & Industrial SCADA Automation Systems | VEST Solutions",
        "description": "Bridging LabVIEW and test benches with industrial PLCs (Siemens, Allen-Bradley) via OPC UA, Modbus TCP, EtherNet/IP, and SCADA dashboards.",
        "keywords": "PLC integration, industrial automation, SCADA, Siemens S7-1500, Allen-Bradley, OPC UA, EtherNet/IP, Modbus TCP, VEST Solutions"
    },
    "hero": {
        "eyebrow": "Plant Floor Control & HMI",
        "title": "PLC & Industrial SCADA Automation for",
        "titleAccent": "Smart Factories",
        "description": "Seamless integration between high-speed PC/LabVIEW measurement systems and industrial PLCs, safety interlocks, and plant-wide SCADA architectures.",
        "primaryCta": {"text": "Discuss Automation Project", "href": "#contact"},
        "secondaryCta": {"text": "Explore PLC Protocols", "href": "#flow"},
        "artType": "plc",
        "statsText": "Cycle Time: 10 ms   |   Protocol: OPC UA / CIP   |   Safety: Cat 4"
    },
    "intro": {
        "eyebrow": "About the Service",
        "heading": "Bridging the Gap Between",
        "headingAccent": "Measurement and Industrial Control",
        "paragraph1": "VEST Solutions engineers robust industrial automation architectures that connect high-speed PC-based test and measurement systems with factory floor PLCs. We eliminate the boundary between lab-grade data acquisition and shop-floor manufacturing execution.",
        "paragraph2": "We specialize in Siemens (S7-1200 / S7-1500), Rockwell / Allen-Bradley (ControlLogix / CompactLogix), Mitsubishi, and Omron controllers, integrating them via deterministic industrial Ethernet protocols, fail-safe safety circuits, and responsive SCADA/HMI dashboards."
    },
    "capabilities": {
        "eyebrow": "What We Offer",
        "heading": "Industrial Automation",
        "headingAccent": "Capabilities",
        "cards": [
            {
                "title": "PLC–LabVIEW Bi-Directional Handshaking",
                "description": "Deterministic communication loops exchanging test triggers, part numbers, pass/fail status, and emergency interlocks.",
                "bullets": ["Zero-drop heartbeat monitoring", "Sub-10ms trigger synchronization", "Part serialization tracking", "Automated fault recovery protocols"]
            },
            {
                "title": "OPC UA & Industrial Ethernet",
                "description": "Secure, platform-independent connectivity linking test benches with factory SCADA, historians, and MES systems.",
                "bullets": ["OPC UA secure certificate encryption", "EtherNet/IP & CIP native drivers", "PROFINET & Modbus TCP gateways", "MQTT / Sparkplug B IoT streaming"]
            },
            {
                "title": "Touchscreen Operator HMIs",
                "description": "Industrial PC and panel touchscreen interfaces designed for shop-floor operators with clear alarms and intuitive manual overrides.",
                "bullets": ["Role-based access (Operator / Admin)", "Live animated conveyor & valve mimics", "Historical trending & alarm logging", "Multilingual operator interfaces"]
            },
            {
                "title": "Pneumatic & Motion System Control",
                "description": "Integration of pneumatic clamping cylinders, linear servo actuators, stepper motors, and robotic pick-and-place arms.",
                "bullets": ["Festo & SMC pneumatic manifold control", "Servo drive positioning profiles", "Proximity & safety limit switch arrays", "Collision prevention interlocking"]
            },
            {
                "title": "Machine Safety Systems (Cat 4 / SIL 3)",
                "description": "Certified machine safety engineering implementing emergency stop circuits, safety relays, and optical light curtains.",
                "bullets": ["Dual-channel safety relay loops", "Optical light curtain guarding", "Pneumatic dump valve dump circuits", "CE / OSHA machinery compliance"]
            }
        ]
    },
    "howItWorks": {
        "eyebrow": "How It Works",
        "heading": "How Our PLC Integration",
        "headingAccent": "Workflow Operates",
        "lead": "From sensor input to factory cloud reporting, data flows reliably across industrial boundaries.",
        "steps": [
            {"step": 1, "title": "I/O & Memory Mapping", "description": "Define address tables, DB tags, bit handshakes, and floating-point registers in the PLC."},
            {"step": 2, "title": "Protocol Bridge Setup", "description": "Configure native OPC UA, EtherNet/IP, or Modbus communication drivers in the test software."},
            {"step": 3, "title": "Heartbeat & Safety Loop", "description": "Implement bi-directional watchdog timers that abort motion instantly if communication lags."},
            {"step": 4, "title": "Sequence Coordination", "description": "Coordinate conveyor indexing, pneumatic clamping, and test start triggers with microsecond accuracy."},
            {"step": 5, "title": "HMI & SCADA Deployment", "description": "Assemble operator graphics, alarm banners, maintenance screens, and recipe managers."},
            {"step": 6, "title": "Shop Floor Commissioning", "description": "Validate I/O points, conduct safety stop audits, and achieve customer sign-off on the active line."}
        ],
        "flowNote": "Field Sensors / Valves → Industrial PLC → Industrial Ethernet Bus → LabVIEW / HMI Station → Plant SCADA / MES"
    },
    "technologies": {
        "eyebrow": "Technologies",
        "heading": "PLC Platforms, Protocols &",
        "headingAccent": "Software",
        "languages": ["Siemens TIA Portal (LAD, SCL, FBD)", "Rockwell Studio 5000", "LabVIEW DSC (Datalogging & Supervisory Control)", "Python (pycomm3, asyncua)", "SQL"],
        "frameworks": ["OPC Unified Architecture (OPC UA)", "EtherNet/IP & CIP", "PROFINET & PROFIBUS", "Modbus TCP / RTU", "MQTT & Sparkplug B"],
        "note": "We configure secure OPC UA endpoints with digital certificate authentication, preventing unauthorized access across factory VLANs."
    },
    "architecture": {
        "eyebrow": "System Architecture",
        "heading": "Industrial Control",
        "headingAccent": "Architecture Patterns",
        "cards": [
            {"title": "Dual-Threaded Communication Bridge", "description": "Dedicated asynchronous worker thread constantly polls PLC registers while a command queue dispatches write operations, eliminating UI lag."},
            {"title": "Fail-Safe Watchdog Handshake", "description": "Toggling bit heartbeat between PC and PLC. If the PC freezes or the cable disconnects, the PLC trips safe holding mode within 50ms."},
            {"title": "Tag-Based Recipe Architecture", "description": "Allows operators to select product recipes that instantly update both LabVIEW test parameters and PLC motion profiles simultaneously."},
            {"title": "Event-Driven Alarm Subsystem", "description": "Historical alarm buffering with millisecond timestamps, audio alert triggers, and maintenance technician diagnostic guidance."}
        ]
    },
    "hardware": {
        "eyebrow": "Hardware Integration",
        "heading": "Supported PLCs &",
        "headingAccent": "Industrial Hardware",
        "col1Title": "Supported PLC Controllers",
        "col1List": ["Siemens S7-1200, S7-1500 & S7-300", "Allen-Bradley ControlLogix & CompactLogix", "Allen-Bradley Micro800 Series", "Mitsubishi MELSEC iQ-R / iQ-F", "Omron Sysmac NJ / NX Series", "Schneider Electric Modicon PLCs"],
        "col1ChipsTitle": "Protocols Supported",
        "col1Chips": ["OPC UA", "EtherNet/IP", "Modbus TCP", "PROFINET", "CC-Link", "BACnet"],
        "col1Note": "Direct symbolic tag browsing with no manual memory offset calculation.",
        "col2Title": "Pneumatic, Motion & Safety Hardware",
        "col2List": ["Festo & SMC Valve Manifolds & Cylinders", "Oriental Motor & Leadshine Stepper Drives", "Yaskawa & Mitsubishi AC Servo Systems", "Sick & Banner Optical Safety Light Curtains", "Pilz & Banner Safety Relays & Interlocks", "Advantech & Beckhoff Industrial Touch PCs"],
        "col2Note": "All control panels assembled to NFPA 79 and IEC 60204-1 electrical standards."
    },
    "performance": {
        "eyebrow": "Speed & Determinism",
        "heading": "Deterministic Cycling &",
        "headingAccent": "Safety Reliability",
        "lead": "We guarantee zero missed parts and zero synchronization timeouts during high-speed production runs.",
        "metrics": [
            {"value": "< 10 ms", "label": "PLC–PC roundtrip handshake latency"},
            {"value": "100%", "label": "Heartbeat watchdog coverage"},
            {"value": "SIL 3", "label": "Safety integrity level capability"},
            {"value": "99.99%", "label": "Network uptime on industrial Ethernet"},
            {"value": "0 drops", "label": "Zero dropped test trigger signals"}
        ],
        "leftTitle": "Control System Rigor",
        "leftBullets": ["Hardware-interlocked pneumatic dump valves", "Debounced digital sensor inputs to prevent false triggers", "Symbolic tag binding to prevent register alignment errors", "Optocoupled 24V industrial digital I/O lines"],
        "rightTitle": "Network Robustness",
        "rightBullets": ["Managed industrial Ethernet switches with RSTP redundancy", "Separate test subnet preventing office network broadcast storms", "Direct memory buffer transfers on EtherNet/IP CIP connections", "Automatic socket reconnect watchdogs on power cycles"]
    },
    "process": {
        "eyebrow": "Development Process",
        "heading": "Industrial Automation",
        "headingAccent": "Lifecycle",
        "steps": [
            {"number": 1, "title": "P&ID and Sequence Flowchart", "description": "Document complete pneumatic strokes, sensor interlocks, and test station handshakes."},
            {"number": 2, "title": "I/O List & Tag Mapping", "description": "Formulate exact symbolic PLC tag lists, data structures, and command bit masks."},
            {"number": 3, "title": "Electrical & Panel Design", "description": "Create 24VDC power distribution, safety circuit, and terminal block schematics in EPLAN."},
            {"number": 4, "title": "PLC Logic & Safety Programming", "description": "Program ladder logic / structured text in TIA Portal or Studio 5000 with safety blocks."},
            {"number": 5, "title": "HMI & SCADA Interface Build", "description": "Assemble operator touchscreen panels with real-time status indicators and alarms."},
            {"number": 6, "title": "Dry-Run & I/O Check", "description": "Verify every physical sensor, pneumatic valve, and e-stop circuit prior to live line power."},
            {"number": 7, "title": "Shop Floor Commissioning", "description": "Integrate with active conveyor, tune cycle times, and conduct operator handover."}
        ]
    },
    "deliverables": {
        "eyebrow": "Deliverables",
        "heading": "What You",
        "headingAccent": "Receive",
        "col1": [
            "Complete uncompiled PLC logic project files (TIA Portal / Studio 5000)",
            "LabVIEW / PC communication bridge and HMI source code",
            "Full electrical control panel schematics (EPLAN / PDF)",
            "Symbolic I/O mapping and tag address documentation",
            "Emergency stop safety validation certification",
            "Custom OPC UA configuration certificates and security keys"
        ],
        "col2": [
            "Operator panel user manual and troubleshooting guide",
            "Factory Acceptance Test (FAT) & Site Acceptance Test (SAT) reports",
            "Bill of Materials (BOM) with manufacturer part numbers",
            "Panel wiring layout drawings with terminal block designations",
            "PLC backup image files on industrial USB drive",
            "On-site startup assistance and 12-month automation warranty"
        ]
    },
    "applications": {
        "eyebrow": "Industries",
        "heading": "Industrial",
        "headingAccent": "Deployments",
        "cards": [
            {"title": "Automotive Tier-1 Assembly Lines", "description": "Synchronizing pneumatic pressing stations, torque tool validation, and test carousel indexing via Siemens S7-1500."},
            {"title": "Pharmaceutical Packaging & Serialization", "description": "OPC UA compliant track-and-trace systems verifying barcode labeling and carton reject gates with 21 CFR Part 11 logs."},
            {"title": "Chemical Batch Processing SCADA", "description": "Tank farm monitoring, proportional valve PID temperature regulation, and historical trend logging on Allen-Bradley ControlLogix."},
            {"title": "High-Speed Robotic Sorting Cells", "description": "Coordinating vision inspection cameras, pneumatic blow-off gates, and 6-axis articulated robots via EtherNet/IP."}
        ]
    },
    "whyUs": {
        "eyebrow": "Why VEST Solutions",
        "heading": "Why Choose",
        "headingAccent": "VEST Solutions?",
        "col1": [
            "Cross-disciplinary mastery of both industrial PLCs and advanced PC/LabVIEW software",
            "Certified safety system engineering (TUV / CE / OSHA compliant practices)",
            "Proven track record with major Tier-1 automotive and aerospace assembly plants",
            "100% open architecture delivery with zero locked proprietary function blocks"
        ],
        "col2": [
            "Extensive library of pre-tested OPC UA, Modbus, and EtherNet/IP communication drivers",
            "In-house electrical control panel assembly and UL 508A compliant build capability",
            "Rapid on-site emergency response for factory line commissioning",
            "Deep expertise in bridging legacy machinery to Industry 4.0 IoT platforms"
        ]
    },
    "perspective": {
        "eyebrow": "Our Perspective",
        "heading": "Engineering Truth:",
        "headingAccent": "PLCs for Safety, PCs for Math",
        "lead": "A common mistake is forcing a PLC to do complex FFT math and image processing, or conversely using a Windows PC to control safety interlocks. The best engineering honors both roles.",
        "leftTitle": "What the PLC must always own",
        "leftBullets": [
            "Emergency stop circuits, light curtains, and physical operator safety",
            "Conveyor indexing, pneumatic cylinder clamping, and hard limits",
            "Deterministic valve sequencing and machine state holding during power cuts",
            "Low-level motor drive enable lines and hardware interlocks"
        ],
        "rightTitle": "What the PC / LabVIEW system should own",
        "rightBullets": [
            "High-bandwidth analog sensor acquisition and FFT frequency analysis",
            "Machine vision defect inspection and deep learning inference",
            "Large SQL database logging and enterprise MES communication",
            "Dynamic parametric test recipe calculations and rich operator charts"
        ],
        "recommendationTitle": "Our rule: never use software buttons for safety",
        "recommendationText": "Never rely on a mouse click on an HMI screen as an emergency stop. Physical safety must run through dedicated, hardwired dual-channel safety relays. Software informs the operator; hardware protects their life."
    },
    "mistakes": {
        "eyebrow": "Shop Floor Insights",
        "heading": "Costly Automation",
        "headingAccent": "Mistakes on the Line",
        "cards": [
            {"title": "Omitting communication watchdogs", "description": "If a PC freezes while the PLC keeps indexing, expensive mechanical tooling crashes. We mandate hardware-interlocked heartbeat watchdogs."},
            {"title": "Using raw memory offsets instead of symbolic tags", "description": "Hardcoding 'DB1.DBD4' breaks when the PLC program is modified. We bind exclusively to symbolic OPC UA or CIP tag names."},
            {"title": "Mixing 24V field wiring with sensitive analog lines", "description": "Routing solenoid valve return lines in the same conduit as load cell wires causes erratic test limits. We enforce separate wire raceways."},
            {"title": "Neglecting operator panel contrast and font size", "description": "Dainty desktop fonts are unreadable on a vibrating factory floor. We design high-contrast HMIs with large touchscreen buttons."},
            {"title": "No plan for manual maintenance overrides", "description": "When a part jams, technicians shouldn't need a laptop to clear it. We build secure, password-protected manual valve override screens."},
            {"title": "Ignoring inductive kickback on solenoid valves", "description": "Failing to install flyback diodes across 24VDC pneumatic coils slowly burns PLC transistor output cards. We protect every coil."}
        ]
    },
    "projectPlanning": {
        "eyebrow": "Planning Your Project",
        "heading": "Cost Drivers &",
        "headingAccent": "Typical Timeline",
        "lead": "Automation scopes depend on I/O channel count, safety architecture, and physical enclosure requirements.",
        "costDriversCol1": [
            "Total digital and analog I/O point count",
            "PLC brand and model (Siemens S7-1500 vs Micro800)",
            "Safety integrity level requirement (Standard vs Category 4 / SIL 3)",
            "Enclosure size, rating (IP54 / IP65 / NEMA 4X), and air conditioning",
            "Conveyor and pneumatic mechanical interface complexity"
        ],
        "costDriversCol2": [
            "MES and SCADA enterprise database integration protocols",
            "On-site plant commissioning days and multi-shift run-off support",
            "Third-party robot or servo drive synchronization scope",
            "Legacy panel rewiring vs greenfield control enclosure build",
            "Operator training and maintenance documentation depth"
        ],
        "phases": [
            {"badge": "A", "title": "P&ID & Tag Mapping, 1 to 2 weeks", "description": "Establish sequence flowcharts, define PLC tag addresses, and select sensors and valves."},
            {"badge": "B", "title": "Panel Assembly & Code Build, 4 to 6 weeks", "description": "Build electrical enclosure, program TIA Portal / Studio 5000 logic, and assemble HMI screens."},
            {"badge": "C", "title": "Line Commissioning & SAT, 2 to 3 weeks", "description": "Install panel on factory floor, verify I/O dry-runs, run production trials, and train plant staff."}
        ]
    },
    "faq": {
        "eyebrow": "FAQ",
        "heading": "Frequently Asked",
        "headingAccent": "Questions",
        "items": [
            {"question": "Can you connect LabVIEW to both Siemens and Allen-Bradley PLCs?", "answer": "Yes. We utilize native communication drivers such as Siemens S7 protocol, EtherNet/IP CIP, and vendor-neutral OPC UA to interface with any major industrial PLC platform."},
            {"question": "What happens if the PC running the test software crashes?", "answer": "The PLC detects the loss of the heartbeat signal within 50ms and transitions all actuators and conveyors into a safe holding state, preventing tooling damage."},
            {"question": "Do you design and build the physical electrical control panel?", "answer": "Yes. We design, wire, and certify complete industrial control panels adhering to UL 508A and NFPA 79 standards, complete with labeled terminal blocks and safety relays."},
            {"question": "Can operators change test recipes from the HMI screen?", "answer": "Yes. We implement recipe management systems allowing authorized supervisors to load, edit, and save production recipes that configure both the PC test limits and PLC parameters."},
            {"question": "Can the system log production metrics to our plant-wide MES or SAP?", "answer": "Yes. We integrate directly with factory MES and SQL databases via REST APIs, OPC UA, or direct ODBC queries to record cycle times, serial numbers, and quality metrics."},
            {"question": "How are operator permissions handled on the touchscreen?", "answer": "We provide multi-tier role-based access control (Operator, Maintenance Technician, Quality Engineer, Administrator) secured by PIN code, RFID badge, or Windows domain login."},
            {"question": "Do you provide electrical schematics in EPLAN?", "answer": "Yes. All electrical panel drawings are drafted in professional CAD/EPLAN format, including point-to-point wiring diagrams, component part numbers, and panel cutouts."},
            {"question": "Can we monitor the machine status remotely from an office computer?", "answer": "Yes. We deploy web-based SCADA dashboards and VNC/RDP remote viewing solutions so supervisors can review live production metrics across company networks."}
        ]
    },
    "cta": {
        "title": "Modernize Your Plant Floor with VEST Solutions",
        "description": "Bridge the gap between precision test measurements and industrial PLC automation. Eliminate downtime with certified architectures.",
        "buttonText": "Request an Automation Consultation",
        "buttonHref": "/book?service=industrial-automation"
    }
}

print(f"Total services generated: {len(services_dict)}")

