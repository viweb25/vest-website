# -*- coding: utf-8 -*-
"""
Master generator for vest-website/data/servicesData.ts
Assembles all 10 services and writes a clean, typed TypeScript data file.
"""
import json
import os
import sys

# Import base services 1 to 5
sys.path.append(os.path.dirname(__file__))
from populate_all_services import services_dict

# ---------------------------------------------------------------------------
# 6. AI VISION & DEFECT INSPECTION (AOI)
# ---------------------------------------------------------------------------
services_dict["ai-vision-inspection"] = {
    "slug": "ai-vision-inspection",
    "aliases": ["ai-vision", "defect-inspection"],
    "meta": {
        "title": "Automated Optical Inspection (AOI) & AI Defect Detection | VEST Solutions",
        "description": "High-speed automated optical inspection (AOI) for microscopic surface defects, part presence, metrology, and deep learning anomaly detection.",
        "keywords": "Automated Optical Inspection, AOI, AI defect detection, surface crack detection, ONNX machine vision, LabVIEW vision, VEST Solutions"
    },
    "hero": {
        "eyebrow": "Computer Vision & Quality Gates",
        "title": "Automated Optical Inspection &",
        "titleAccent": "AI Defect Detection",
        "description": "High-resolution automated optical inspection systems combining telecentric optics, structured illumination, and deep learning anomaly detection for zero-defect manufacturing.",
        "primaryCta": {"text": "Request a Vision Assessment", "href": "#contact"},
        "secondaryCta": {"text": "Explore Vision Pipeline", "href": "#flow"},
        "artType": "vision",
        "statsText": "Resolution: 2.4 µm   |   False Escape: < 0.01%   |   Cycle: 15 ms"
    },
    "intro": {
        "eyebrow": "About the Service",
        "heading": "Microscopic Precision for",
        "headingAccent": "High-Speed Inspection",
        "paragraph1": "VEST Solutions develops industrial Automated Optical Inspection (AOI) systems that detect microscopic defects invisible to human inspectors. By uniting custom telecentric optics, multi-spectral lighting, and ONNX-accelerated deep learning models, we inspect 100% of production parts at line speeds.",
        "paragraph2": "From detecting hairline cracks in automotive metal castings to verifying sub-millimeter component placement on printed circuit boards, our systems eliminate human eye fatigue, classify defect types in real time, and trigger pneumatic scrap ejection without slowing the line."
    },
    "capabilities": {
        "eyebrow": "What We Offer",
        "heading": "Automated Optical Inspection",
        "headingAccent": "Capabilities",
        "cards": [
            {
                "title": "Microscopic Surface Defect Classification",
                "description": "Identify hairline scratches, porosity, burrs, pitting, and coating blemishes on reflective metal, ceramic, and plastic surfaces.",
                "bullets": ["Pixel-level defect segmentation", "Porosity and blemish categorization", "Depth-from-defocus estimation", "Dual dark-field / bright-field illumination"]
            },
            {
                "title": "Sub-Millimeter Dimensional Metrology",
                "description": "Non-contact precision measurement of critical physical tolerances, gap clearances, concentricity, and radii with calibrated telecentric optics.",
                "bullets": ["Calibrated sub-pixel edge detection", "Gauge R&R repeatability < 5%", "NIST-traceable optical calibration grid", "Multi-point geometric fitting"]
            },
            {
                "title": "Part Presence & Assembly Verification",
                "description": "Verify complete assemblies before downstream operations, ensuring screws, O-rings, clips, and connector pins are correctly seated.",
                "bullets": ["Missing clip and washer detection", "O-ring seat depth verification", "Connector pin alignment & skew", "Incorrect component color/type identification"]
            },
            {
                "title": "OCR & Dot-Peen Code Verification",
                "description": "Read and grade low-contrast direct part marking (DPM), dot-peen barcodes, laser-etched DataMatrix codes, and serial numbers.",
                "bullets": ["ISO/IEC 15415 & 15426 code grading", "Curved and shiny surface unwarping", "High-speed alphanumeric OCR", "Database serial number cross-referencing"]
            },
            {
                "title": "Automated Scrap Diverter Interfacing",
                "description": "Hardware-timed pneumatic blow-off and reject gate actuation synchronized with high-speed encoder conveyor tracking.",
                "bullets": ["Encoder-tracked reject timing", "Fail-safe reject verification sensor", "Defect image archival with timestamp", "Shift scrap analytics by defect category"]
            }
        ]
    },
    "howItWorks": {
        "eyebrow": "How It Works",
        "heading": "How Our AI Vision System",
        "headingAccent": "Inspects",
        "lead": "From optical illumination to pneumatic part rejection, every millisecond is deterministic.",
        "steps": [
            {"step": 1, "title": "Strobe Illumination & Trigger", "description": "Conveyor encoder fires microsecond LED strobe to freeze moving parts without blur."},
            {"step": 2, "title": "Image Registration & Alignment", "description": "Software locates reference fiducials to rotate and translate coordinates to nominal zero."},
            {"step": 3, "title": "Dual Inspection Pipeline", "description": "Classical edge tools measure dimensions while deep learning models evaluate surface texture."},
            {"step": 4, "title": "Defect Segmentation & Scoring", "description": "AI classifies defect type (scratch, pit, void) and generates heatmaps and confidence scores."},
            {"step": 5, "title": "Encoder-Tracked Reject Command", "description": "If rejected, PLC conveyor tracking activates pneumatic blow-off at the scrap bin."},
            {"step": 6, "title": "Quality Audit Logging", "description": "Raw image, defect overlay, serial number, and timestamp are written to the database."}
        ],
        "flowNote": "Encoder Pulse → Strobe Flash → Camera Grab → Dual AI / Metrology Pipeline → Pass/Fail Gate → Pneumatic Reject"
    },
    "technologies": {
        "eyebrow": "Technologies",
        "heading": "Vision Toolkits &",
        "headingAccent": "Deep Learning Engines",
        "languages": ["LabVIEW Vision Development Module (VDM)", "Python (PyTorch / OpenCV)", "C++ TensorRT Engine", "SQL"],
        "frameworks": ["ONNX Runtime with CUDA / TensorRT", "NI-IMAQdx", "OpenCV Image Processing", "GenICam Standard", "YOLOv8 & Segmentation Models"],
        "note": "We utilize GPU-accelerated TensorRT inference engines to achieve full segmentation on 5-megapixel images in under 15 milliseconds."
    },
    "architecture": {
        "eyebrow": "Software Architecture",
        "heading": "High-Throughput Vision",
        "headingAccent": "Pipelines",
        "cards": [
            {"title": "Lossless Ring-Buffer Acquisition", "description": "Acquires frames into circular pinned memory, guaranteeing zero dropped frames even during continuous 100 part-per-minute conveyor runs."},
            {"title": "Dual-Core Classical + AI Engine", "description": "Classical algorithms perform fast geometric alignment in 2ms, feeding cropped regions of interest to deep learning models for high-speed inference."},
            {"title": "Dynamic Recipe System", "description": "Operators can adjust defect size thresholds, inspection masks, and metrology tolerances per part SKU without restarting the vision application."},
            {"title": "Hardware-Interlocked Reject Tracking", "description": "Combines camera timestamps with conveyor rotary encoder pulses to actuate reject gates at the exact physical location of the defective unit."}
        ]
    },
    "hardware": {
        "eyebrow": "Hardware Integration",
        "heading": "Optics, Cameras &",
        "headingAccent": "Illumination",
        "col1Title": "Industrial Camera & Lens Hardware",
        "col1List": ["Basler, FLIR & Allied Vision Area Scan Cameras", "High-Resolution Sensors (5 MP to 45 MP Global Shutter)", "Opto Engineering & Edmund Telecentric Lenses", "High-speed Line Scan Cameras for continuous webs", "CoaXPress & 10GigE Vision high-bandwidth interfaces", "Precision C-Mount & F-Mount optical tubes"],
        "col1ChipsTitle": "Illumination Types",
        "col1Chips": ["Coaxial Telecentric", "Diffuse Dome Lights", "Polarized Dark-Field", "UV & Multi-Spectral", "Collimated Backlights"],
        "col1Note": "Optics configured specifically to eliminate perspective distortion and specular glare.",
        "col2Title": "National Instruments & Controller Hardware",
        "col2List": ["NI Industrial Controller & Vision IPCs", "NI PXIe Embedded Controllers with PCIe GPU", "NI-IMAQdx compliant frame grabbers", "High-speed isolated digital I/O for strobe timing", "Rotary optical incremental encoders", "Pneumatic high-speed solenoid reject valves"],
        "col2Note": "Microsecond trigger synchronization between strobe controller and camera sensor."
    },
    "performance": {
        "eyebrow": "Speed & Accuracy",
        "heading": "Detection Accuracy &",
        "headingAccent": "Cycle Time Metrics",
        "lead": "We calibrate optical resolution and AI confidence thresholds to eliminate false escapes entirely.",
        "metrics": [
            {"value": "< 0.01%", "label": "False escape rate (zero escapes)"},
            {"value": "15 ms", "label": "Full inspection & inference time"},
            {"value": "2.4 µm", "label": "Sub-pixel measurement resolution"},
            {"value": "120 PPM", "label": "Parts inspected per minute"},
            {"value": "99.8%", "label": "Defect classification precision"}
        ],
        "leftTitle": "Optics-First Defect Clarity",
        "leftBullets": ["Telecentric lenses providing constant magnification across depth", "Custom strobe lighting to create extreme defect contrast", "Polarizing filters to eliminate blinding reflections on shiny parts", "Vibration-isolated industrial camera gantries"],
        "rightTitle": "Inference Optimization",
        "rightBullets": ["ONNX Runtime model quantization (FP16 / INT8)", "CUDA GPU memory pinning to eliminate host-device transfer lag", "Region-of-interest (ROI) bounding prior to deep learning pass", "Multithreaded pipeline allowing next image grab while processing"]
    },
    "process": {
        "eyebrow": "Development Process",
        "heading": "Vision System",
        "headingAccent": "Development Lifecycle",
        "steps": [
            {"number": 1, "title": "Optical Sample Feasibility", "description": "Test customer sample parts in our optics laboratory under various lighting and lens configurations."},
            {"number": 2, "title": "Hardware Specification", "description": "Calculate sensor resolution, working distance, depth of field, and strobe illumination wattage."},
            {"number": 3, "title": "Defect Image Library Build", "description": "Collect and annotate representative defect samples across production variations and lighting shifts."},
            {"number": 4, "title": "Model Training & Validation", "description": "Train defect segmentation networks and benchmark false positive/negative rates against test sets."},
            {"number": 5, "title": "LabVIEW Vision Pipeline Build", "description": "Assemble image grab loops, UI defect overlays, recipe loaders, and PLC reject handshakes."},
            {"number": 6, "title": "Conveyor Synchronization & FAT", "description": "Install on mock conveyor to verify encoder tracking and pneumatic reject timing at full speed."},
            {"number": 7, "title": "Site Commissioning", "description": "Mount on production line, conduct lighting calibration, and train line operators on recipe creation."}
        ]
    },
    "deliverables": {
        "eyebrow": "Deliverables",
        "heading": "What You",
        "headingAccent": "Receive",
        "col1": [
            "Complete uncompiled LabVIEW Vision application source code",
            "Trained ONNX / TensorRT deep learning model weights",
            "Custom optics, camera gantry, and lighting bracket CAD files",
            "Full electrical schematics for strobe and trigger timing",
            "Operator HMI with interactive defect heatmap overlays",
            "Pneumatic reject synchronization and encoder tracking module"
        ],
        "col2": [
            "NIST-traceable optical calibration certificate",
            "Comprehensive Defect Labeling & Classification Guide",
            "False Acceptance / False Rejection statistical validation report",
            "Factory Acceptance Test (FAT) sign-off documents",
            "Operator and maintenance technician calibration manuals",
            "12-month on-site and remote vision support SLA"
        ]
    },
    "applications": {
        "eyebrow": "Industries",
        "heading": "Industrial",
        "headingAccent": "Use Cases",
        "cards": [
            {"title": "Automotive Precision Machining", "description": "Detecting micro-cracks, burrs, and porosity in engine cylinder bores, brake discs, and valve bodies."},
            {"title": "Semiconductor & Leadframe Inspection", "description": "Verifying wire bonding integrity, die attach tilt, solder bridge defects, and leadframe coplanarity."},
            {"title": "Medical Device & Pharmaceutical Packaging", "description": "Inspecting catheter needle sharpness, vial stopper crimping, blister pack pill presence, and seal integrity."},
            {"title": "Consumer Electronics Assembly", "description": "Inspecting smartphone glass scratches, glue bead continuity, screw presence, and cosmetic anodization blemishes."}
        ]
    },
    "whyUs": {
        "eyebrow": "Why VEST Solutions",
        "heading": "Why Choose",
        "headingAccent": "VEST Solutions?",
        "col1": [
            "Optics-first philosophy: 80% of vision problems are solved by proper lighting, not bigger neural nets",
            "Certified LabVIEW Vision and deep learning engineering team",
            "Full non-contact metrology capability with sub-micron precision calibration",
            "Complete in-house mechanical fixture and optical bracket fabrication"
        ],
        "col2": [
            "Extensive experience with shiny, reflective, and oil-covered industrial metal parts",
            "Zero false escape track record on mission-critical automotive safety components",
            "100% open source software delivery with no proprietary runtime dongles",
            "Rapid turnaround feasibility studies using your actual physical parts"
        ]
    },
    "perspective": {
        "eyebrow": "Our Perspective",
        "heading": "Engineering Truth:",
        "headingAccent": "Optics Trumps Algorithms",
        "lead": "No deep neural network can detect a hairline scratch if poor lighting washes out the surface into blown-out white pixels. Great machine vision starts with physics.",
        "leftTitle": "When to deploy AI / Deep Learning",
        "leftBullets": [
            "Organic defects with irregular shapes (scratches, cracks, stains, porosity)",
            "Textured or cast surfaces where fixed mathematical thresholds fail",
            "High natural part-to-part cosmetic variation from batch to batch",
            "Complex scene understanding (classifying 20 different defective features)"
        ],
        "rightTitle": "When classical vision tools are superior",
        "rightBullets": [
            "Sub-micron dimensional metrology (distances, radii, angles, diameters)",
            "Precise geometric alignment and coordinate translation",
            "High-contrast barcode reading and 2D DataMatrix decoding",
            "Simple binary presence/absence checks under fixed illumination"
        ],
        "recommendationTitle": "Our rule: combine classical alignment with AI scoring",
        "recommendationText": "The fastest, most reliable industrial vision systems use classical vision algorithms to find the part and rotate it to zero in 2 milliseconds, then pass only the critical target regions to an AI model for defect classification. This hybrid approach yields 10x faster cycle times with zero geometric hallucination."
    },
    "mistakes": {
        "eyebrow": "Shop Floor Insights",
        "heading": "Common Mistakes in",
        "headingAccent": "Vision Inspection",
        "cards": [
            {"title": "Ignoring ambient factory sunlight", "description": "Systems that work at night fail at 2 PM when sunlight floods the shop floor. We enclose optics and use high-intensity narrow-band strobe lighting."},
            {"title": "Using cheap standard CCTV lenses for measurement", "description": "Standard lenses exhibit severe barrel distortion and magnification changes with part height. We mandate calibrated telecentric lenses for metrology."},
            {"title": "Training models on clean laboratory parts", "description": "Models fail when real parts arrive covered in cutting fluid or dust. We collect training images across different shifts, tooling wear, and dirty conditions."},
            {"title": "Mounting cameras on vibrating machine frames", "description": "Frame vibration causes intermittent motion blur and loose lens focus over time. We install rigid, vibration-isolated optical gantries."},
            {"title": "Relying on human operator judgment for defect labels", "description": "If two quality inspectors disagree on what constitutes a scratch, no AI model can learn it. We build objective, measurable defect classification criteria."},
            {"title": "Failing to verify reject gate actuation", "description": "If an air line gets kinked, defective parts sail down the line unnoticed. We install optical sensors in the reject chute to confirm part ejection."}
        ]
    },
    "projectPlanning": {
        "eyebrow": "Planning Your Project",
        "heading": "Cost Drivers &",
        "headingAccent": "Typical Timeline",
        "lead": "Vision investments depend on optical field of view, resolution, defect complexity, and line speed.",
        "costDriversCol1": [
            "Optical resolution requirement (standard 5 MP vs 45 MP telecentric)",
            "Specialized illumination (diffuse dome, coaxial, UV, polarized)",
            "Conveyor line speed and parts-per-minute throughput",
            "Number of camera inspection angles required per station",
            "Availability of pre-sorted good and defective sample parts"
        ],
        "costDriversCol2": [
            "Mechanical gantry, mounting bracket, and light enclosure fabrication",
            "Pneumatic reject mechanism and encoder tracking hardware scope",
            "Integration with existing factory PLC and safety interlock circuits",
            "MES defect image archiving and quality traceability database",
            "On-site installation, optical calibration, and line runoff support"
        ],
        "phases": [
            {"badge": "A", "title": "Sample Optics Feasibility, 1 to 2 weeks", "description": "Evaluate physical parts in our optics lab, test lens/lighting configurations, and prove defect contrast."},
            {"badge": "B", "title": "Model Training & Vision App Build, 4 to 6 weeks", "description": "Collect image datasets, train segmentation models, and assemble LabVIEW UI and reject logic."},
            {"badge": "C", "title": "Line Commissioning & Runoff, 2 to 3 weeks", "description": "Install camera gantry on factory line, tune strobe timing, verify zero false escapes, and train staff."}
        ]
    },
    "faq": {
        "eyebrow": "FAQ",
        "heading": "Frequently Asked",
        "headingAccent": "Questions",
        "items": [
            {"question": "How small of a defect can your optical inspection systems detect?", "answer": "Using calibrated telecentric lenses and high-resolution sensors, our systems routinely detect surface scratches and porosity down to 2.4 micrometers."},
            {"question": "Can the system inspect shiny, reflective metal parts without glare?", "answer": "Yes. We eliminate blinding reflections by employing specialized diffuse dome lighting, coaxial telecentric illumination, and cross-polarizing filters."},
            {"question": "What happens when our production line runs a new part model?", "answer": "Our software includes a recipe editor allowing supervisors to adjust inspection masks, bounding boxes, and tolerance thresholds for new SKUs without writing code."},
            {"question": "How do you prevent moving parts from blurring?", "answer": "We utilize microsecond LED strobe illumination synchronized with camera global shutters and conveyor encoder pulses, completely freezing part motion up to 2 meters/second."},
            {"question": "Can we inspect parts from multiple sides simultaneously?", "answer": "Yes. We deploy multi-camera stations or optical mirror prism assemblies to capture top, bottom, and side views in a single synchronized trigger event."},
            {"question": "Can the vision software run on an industrial IPC without an external cloud connection?", "answer": "Yes, 100%. All AI inference and metrology algorithms run entirely on local, ruggedized industrial IPCs with dedicated GPUs, requiring zero cloud connectivity."},
            {"question": "How do you prove the system won't let defective parts pass?", "answer": "We conduct extensive validation runs with seeded defective parts during Factory Acceptance Testing (FAT), verifying a false escape rate of less than 0.01%."},
            {"question": "Do you provide the trained neural network model files?", "answer": "Yes. We deliver full ONNX/TensorRT model weights, training scripts, and dataset libraries so your team retains complete ownership of your intellectual property."}
        ]
    },
    "cta": {
        "title": "Achieve Zero Defect Quality with VEST Solutions",
        "description": "Stop relying on human visual fatigue. Partner with VEST Solutions for deterministic, microscopic Automated Optical Inspection.",
        "buttonText": "Send Your Parts for a Feasibility Study",
        "buttonHref": "/book?service=ai-vision-inspection"
    }
}

# ---------------------------------------------------------------------------
# 7. LEGACY CODE REFACTORING & MIGRATION
# ---------------------------------------------------------------------------
services_dict["legacy-code-refactoring"] = {
    "slug": "legacy-code-refactoring",
    "aliases": ["modernization", "refactoring"],
    "meta": {
        "title": "Legacy LabVIEW Code Refactoring & System Modernization | VEST Solutions",
        "description": "Modernizing monolithic, buggy, or obsolete LabVIEW codebases into clean, modular, maintainable architectures without starting from scratch.",
        "keywords": "LabVIEW refactoring, legacy code modernization, spaghetti code cleanup, LabVIEW memory leak, DQMH migration, race condition elimination, VEST Solutions"
    },
    "hero": {
        "eyebrow": "Architecture Recovery & Modernization",
        "title": "Legacy LabVIEW Code Refactoring &",
        "titleAccent": "System Modernization",
        "description": "Transform fragile, crashing spaghetti codebases into robust, modular, and maintainable LabVIEW architectures while preserving your proven hardware validation.",
        "primaryCta": {"text": "Request a Codebase Audit", "href": "#contact"},
        "secondaryCta": {"text": "View Modernization Methodology", "href": "#flow"},
        "artType": "refactor",
        "statsText": "Memory Reduced: 75%   |   Crashes: Eliminated   |   Version: 64-bit 2024"
    },
    "intro": {
        "eyebrow": "About the Service",
        "heading": "Rescuing Mission-Critical Systems from",
        "headingAccent": "Technical Debt",
        "paragraph1": "Many manufacturing lines and aerospace test benches rely on 10- or 15-year-old LabVIEW codebases originally written by engineers who have long since left the company. Over the years, patches and emergency modifications turn the block diagrams into an unmaintainable tangled mess of global variables, race conditions, and random crashes.",
        "paragraph2": "At VEST Solutions, we specialize in legacy LabVIEW code refactoring. We audit, decouple, and systematically modernize your software into certified modular frameworks like DQMH and Actor Framework, upgrading obsolete hardware drivers and migrating to modern 64-bit LabVIEW 2024+ without breaking your physical test process."
    },
    "capabilities": {
        "eyebrow": "What We Offer",
        "heading": "Refactoring & Modernization",
        "headingAccent": "Capabilities",
        "cards": [
            {
                "title": "Spaghetti Code Unraveling",
                "description": "Restructure giant multi-screen block diagrams into clean, hierarchical subVIs with standardized connector panes and clear dataflow.",
                "bullets": ["SubVI extraction & modularization", "Elimination of sequence structures", "Consistent error cluster chaining", "Elimination of hidden wire bends & tunnels"]
            },
            {
                "title": "Race Condition & Deadlock Elimination",
                "description": "Replace uncoordinated parallel while loops and global variables with thread-safe queues, notifiers, and Delacor message channels.",
                "bullets": ["Global & local variable eradication", "Thread-safe FIFO queue synchronization", "Producer-Consumer decoupled loops", "Deterministic state machine control"]
            },
            {
                "title": "Memory Leak Eradication",
                "description": "Identify and close unreleased VISA sessions, DAQmx tasks, file handles, and continuously growing array shift registers.",
                "bullets": ["Desktop Execution Trace Toolkit profiling", "Automated reference closing subVIs", "Pre-allocated buffer management", "Decimated graph rendering pipelines"]
            },
            {
                "title": "LabVIEW 2024+ 64-Bit Migration",
                "description": "Upgrade legacy 32-bit LabVIEW 6.0–2015 applications to native 64-bit LabVIEW 2024+, unlocking access to multi-gigabyte RAM spaces.",
                "bullets": ["Obsolete ActiveX & .NET replacement", "Legacy Traditional NI-DAQ to NI-DAQmx", "Serial port VISA modernization", "64-bit Windows 11 compliance"]
            },
            {
                "title": "Automated Regression Test Harnesses",
                "description": "Build automated unit test suites that verify mathematical calculations and state transitions before and after refactoring.",
                "bullets": ["JKI VI Tester automated execution", "Hardware simulation replay stubs", "Bit-for-bit math verification", "Git version-controlled test reports"]
            }
        ]
    },
    "howItWorks": {
        "eyebrow": "How It Works",
        "heading": "Our Systematic Refactoring",
        "headingAccent": "Process",
        "lead": "We refactor incrementally, ensuring the system remains continuously functional at every stage.",
        "steps": [
            {"step": 1, "title": "Comprehensive Code Audit", "description": "Run VI Analyzer and Desktop Execution Trace Toolkit to catalog race conditions and memory leaks."},
            {"step": 2, "title": "Regression Harness Build", "description": "Create automated unit tests capturing current system behavior on real or recorded signal data."},
            {"step": 3, "title": "Decouple UI from Logic", "description": "Separate front panel event handling from measurement loops using asynchronous message queues."},
            {"step": 4, "title": "Replace Shared Variables", "description": "Eliminate global variables, replacing them with encapsulated DQMH modules or shift registers."},
            {"step": 5, "title": "Driver & Driver Upgrade", "description": "Migrate obsolete instrument calls to modern 64-bit VISA and NI-DAQmx hardware APIs."},
            {"step": 6, "title": "72-Hour Stress Burn-In", "description": "Subject the refactored software to continuous endurance runs, verifying zero memory growth."}
        ],
        "flowNote": "Codebase Audit → Regression Test Baseline → Decouple UI → Replace Globals → Modernize Drivers → 72-Hr Stress Run"
    },
    "technologies": {
        "eyebrow": "Technologies",
        "heading": "Diagnostic Toolkits &",
        "headingAccent": "Modern Architectures",
        "languages": ["LabVIEW 2020 – 2024+ (64-bit)", "LabVIEW Real-Time & FPGA", "Python Node Integration", "SQL / TDMS"],
        "frameworks": ["Desktop Execution Trace Toolkit (DETT)", "NI VI Analyzer Toolkit", "Delacor QMH (DQMH)", "Actor Framework", "JKI VI Tester", "Git for LabVIEW"],
        "note": "We use the Desktop Execution Trace Toolkit to monitor memory allocations down to individual subVI execution events in real time."
    },
    "architecture": {
        "eyebrow": "Target Architecture",
        "heading": "Modernized Modular",
        "headingAccent": "Architecture Patterns",
        "cards": [
            {"title": "Delacor QMH (DQMH)", "description": "The ideal target for refactored systems. Replaces unmaintainable state machines with standalone modules that can be started, stopped, and tested independently."},
            {"title": "Hardware Abstraction Layer (HAL)", "description": "Insulates legacy test routines from underlying physical instruments. Replacing an old GPIB meter with a modern PXI card requires zero changes to test logic."},
            {"title": "Lossless Producer–Consumer", "description": "Ensures that high-speed sensor acquisition runs uninterrupted at top priority, with data queued to consumer loops for processing and disk writes."},
            {"title": "Centralized Error Dispatcher", "description": "Replaces silent errors and cryptic dialog boxes with an enterprise error handler that logs stack traces, timestamps, and safe fallback states."}
        ]
    },
    "hardware": {
        "eyebrow": "Hardware Modernization",
        "heading": "Upgrading Obsolete",
        "headingAccent": "Hardware Systems",
        "col1Title": "Legacy Hardware Migrated",
        "col1List": ["Traditional NI-DAQ (Legacy PCI / ISA cards)", "Legacy PXI / SCXI signal conditioning chassis", "National Instruments FieldPoint & Compact FieldPoint", "Discontinued GPIB & RS-232 serial interfaces", "Obsolete third-party PCI frame grabbers", "Windows XP / Windows 7 industrial IPCs"],
        "col1ChipsTitle": "Protocols Converted",
        "col1Chips": ["ActiveX → .NET", "Traditional DAQ → DAQmx", "Direct DLL → Clean CLFN", "Flat File → TDMS / SQL"],
        "col1Note": "We preserve existing test racks while replacing obsolete PC controllers with modern hardware.",
        "col2Title": "Modern Replacement Platforms",
        "col2List": ["NI PXIe Express Chassis & Embedded Controllers", "NI CompactDAQ Ethernet, USB & TSN Chassis", "NI CompactRIO Linux Real-Time & FPGA Controllers", "Modern PCIe & USB Multifunction I/O Devices", "Gigabit Ethernet & USB 3.0 Vision Cameras", "Windows 11 64-bit Rugged Industrial IPCs"],
        "col2Note": "Zero rewiring of physical test fixtures whenever possible."
    },
    "performance": {
        "eyebrow": "Before vs After",
        "heading": "Measurable Performance",
        "headingAccent": "Improvements",
        "lead": "We deliver quantifiable metrics proving stability, responsiveness, and resource efficiency.",
        "metrics": [
            {"value": "0 Crashes", "label": "Zero crashes over 30-day continuous runs"},
            {"value": "75%", "label": "Reduction in application memory footprint"},
            {"value": "< 1 ms", "label": "UI front panel response latency"},
            {"value": "100%", "label": "Error cluster propagation coverage"},
            {"value": "10x", "label": "Faster feature addition turnaround"}
        ],
        "leftTitle": "What We Eradicate",
        "leftBullets": ["Intermittent race conditions that only happen under load", "Silent unhandled error codes that corrupt test data", "Freezing UI front panels that lock out emergency stops", "Memory leaks requiring daily machine reboots"],
        "rightTitle": "What You Gain",
        "rightBullets": ["Clean subVI block diagrams fitting on a single monitor", "Built-in standalone API testers for every module", "Complete Git version-controlled history and branches", "Confidence to add new features without breaking existing code"]
    },
    "process": {
        "eyebrow": "Modernization Process",
        "heading": "Step-by-Step Refactoring",
        "headingAccent": "Roadmap",
        "steps": [
            {"number": 1, "title": "Source Code Discovery Audit", "description": "Catalog all VIs, external dependencies, driver versions, and hidden race conditions."},
            {"number": 2, "title": "Architecture Blueprint", "description": "Design clean DQMH module boundaries and define inter-module communication events."},
            {"number": 3, "title": "Unit Regression Harness", "description": "Create automated test benches that snapshot input/output behavior for math verification."},
            {"number": 4, "title": "Incremental Module Refactoring", "description": "Refactor one subsystem at a time, keeping the application runnable throughout the project."},
            {"number": 5, "title": "Driver & OS Modernization", "description": "Upgrade to 64-bit LabVIEW 2024+, replace legacy drivers, and eliminate deprecated DLLs."},
            {"number": 6, "title": "DETT Memory & Leak Profiling", "description": "Execute continuous 72-hour burn-in runs under real load with automated trace logging."},
            {"number": 7, "title": "Site Commissioning & Handover", "description": "Deploy to factory floor, verify against physical hardware, and train internal team."}
        ]
    },
    "deliverables": {
        "eyebrow": "Deliverables",
        "heading": "What You",
        "headingAccent": "Receive",
        "col1": [
            "Fully refactored, unlocked LabVIEW source code (.lvproj)",
            "Modular DQMH architecture with standalone API testers",
            "Hardware Abstraction Layer (HAL) driver packages",
            "Modernized 64-bit Windows 11 compiled installer (.exe)",
            "Comprehensive Software Architecture Document (SAD)",
            "Automated unit test regression suite (JKI VI Tester)"
        ],
        "col2": [
            "Desktop Execution Trace Toolkit before/after benchmark report",
            "VI Analyzer automated code quality certificate",
            "Git repository with documented commit history and branches",
            "Updated wiring and hardware compatibility reference guide",
            "On-site factory floor commissioning and operator handover",
            "12-month code warranty and technical support SLA"
        ]
    },
    "applications": {
        "eyebrow": "Industries",
        "heading": "Modernized",
        "headingAccent": "Production Systems",
        "cards": [
            {"title": "Aerospace Flight Qualification Test Rigs", "description": "Modernizing 12-year-old LabVIEW 8.5 flight actuator test stands to modern PXIe and Windows 11 with zero downtime."},
            {"title": "Automotive Tier-1 EOL Testing Benches", "description": "Eliminating daily crashes and race conditions on high-volume sensor testing carousels."},
            {"title": "Semiconductor Fab Environmental Loggers", "description": "Refactoring massive monolithic monitoring systems into modular DQMH services with SQL data lakes."},
            {"title": "Medical Device Production Lines", "description": "Refactoring software to satisfy FDA 21 CFR Part 11 audit trails, electronic signatures, and validation standards."}
        ]
    },
    "whyUs": {
        "eyebrow": "Why VEST Solutions",
        "heading": "Why Choose",
        "headingAccent": "Our Architects?",
        "col1": [
            "Refactored over 100+ mission-critical legacy LabVIEW applications worldwide",
            "Certified LabVIEW Architects (CLA) with deep understanding of legacy NI platforms",
            "Incremental refactoring philosophy: we never advocate for a risky 'burn it all down and restart' approach",
            "100% open source delivery with clean, documented graphical code"
        ],
        "col2": [
            "In-house electrical and hardware team capable of replacing obsolete cards with modern equivalents",
            "Proven automated regression techniques that guarantee zero unintended behavior changes",
            "Zero operational downtime during the refactoring process",
            "Comprehensive training for your internal engineers on the new architecture"
        ]
    },
    "perspective": {
        "eyebrow": "Our Perspective",
        "heading": "Engineering Truth:",
        "headingAccent": "Refactor vs Rewrite",
        "lead": "When a codebase becomes painful, developers instinctively say: 'Let's throw it away and rewrite it from scratch.' In industrial testing, that is almost always a catastrophic business mistake.",
        "leftTitle": "Why smart refactoring wins over rewrites",
        "leftBullets": [
            "Your legacy code contains 10 years of hidden hardware quirks and calibration bug fixes",
            "Rewriting from scratch costs 3x to 5x more and introduces dozens of new unknown bugs",
            "Refactoring preserves proven hardware timing while modularizing the software structure",
            "Refactoring can be executed incrementally without stopping factory production"
        ],
        "rightTitle": "When a complete clean-sheet rewrite is truly necessary",
        "rightBullets": [
            "The physical product under test has changed so radically that 90% of tests are obsolete",
            "The original source code was lost and only a compiled .exe remains",
            "The legacy hardware platform has zero modern driver or bus equivalents",
            "The system was written in a non-standard scripting language that cannot be upgraded"
        ],
        "recommendationTitle": "Our rule: build a safety net of regression tests first",
        "recommendationText": "Before changing a single wire in a legacy VI, we construct an automated regression harness. By capturing how the system currently responds to real hardware inputs, we can refactor inner state machines with complete mathematical confidence that no calculation or safety threshold has been altered."
    },
    "mistakes": {
        "eyebrow": "Shop Floor Insights",
        "heading": "Costly Mistakes in",
        "headingAccent": "Legacy Code Upgrades",
        "cards": [
            {"title": "Starting a rewrite without documenting current logic", "description": "Attempting to rewrite without knowing the undocumented edge-case fixes in the legacy code leads to disaster on the test floor."},
            {"title": "Leaving local and global variables in place", "description": "Simply changing the LabVIEW version without replacing shared global variables leaves all original race conditions intact."},
            {"title": "Upgrading hardware drivers without testing timing", "description": "Modern NI-DAQmx drivers execute faster than 20-year-old Traditional DAQ, exposing hidden timing assumptions. We audit loop timing."},
            {"title": "Neglecting Windows 64-bit pointer alignment", "description": "Migrating 32-bit Call Library Function Nodes to 64-bit without adjusting memory pointer sizes causes instant hard system crashes."},
            {"title": "Failing to implement automated regression tests", "description": "Relying on manual clicking to verify a 500-VI application leaves dozens of hidden calculation bugs undiscovered until production."},
            {"title": "Not training the internal engineering staff", "description": "Delivering an advanced architecture without training the plant technicians results in them reverting back to bad coding habits."}
        ]
    },
    "projectPlanning": {
        "eyebrow": "Planning Your Project",
        "heading": "Cost Drivers &",
        "headingAccent": "Typical Timeline",
        "lead": "Refactoring effort is governed by VI count, degree of shared-variable entanglements, and driver obsolescence.",
        "costDriversCol1": [
            "Total VI count and hierarchy depth (100 VIs vs 2,000 VIs)",
            "Number of global and local variables to eliminate",
            "Presence of obsolete third-party ActiveX, DLL, or .NET dependencies",
            "Availability of original hardware test benches for validation",
            "Documentation quality of original software requirements"
        ],
        "costDriversCol2": [
            "Operating system migration scope (Windows XP/7 to Windows 11 64-bit)",
            "Physical hardware card replacements (Legacy PCI to PXIe/USB)",
            "Automated unit regression test coverage depth",
            "On-site factory acceptance testing and burn-in days",
            "Internal engineering team training workshops"
        ],
        "phases": [
            {"badge": "A", "title": "Diagnostic Code Audit, 1 to 2 weeks", "description": "Static code analysis, VI Analyzer report, memory profiling, and architecture modernization blueprint."},
            {"badge": "B", "title": "Incremental Refactoring, 4 to 8 weeks", "description": "Decouple UI, replace globals with DQMH modules, modernize drivers, and run automated regression tests."},
            {"badge": "C", "title": "72-Hr Stress Test & Site Commissioning, 2 to 3 weeks", "description": "Continuous endurance burn-in on physical test bench, operator sign-off, and team training."}
        ]
    },
    "faq": {
        "eyebrow": "FAQ",
        "heading": "Frequently Asked",
        "headingAccent": "Questions",
        "items": [
            {"question": "Will our production line have to stop during the refactoring process?", "answer": "No. We perform 95% of refactoring offline using simulated hardware stubs and recorded signal traces. Final on-site commissioning is scheduled during routine maintenance windows."},
            {"question": "What if our original LabVIEW code has no documentation or comments?", "answer": "That is completely normal for legacy codebases. Our Certified LabVIEW Architects reverse-engineer the execution paths, data structures, and state transitions, generating complete architecture documentation as part of the project."},
            {"question": "Can you upgrade code written in very old versions like LabVIEW 7.1 or 8.2?", "answer": "Yes. We maintain legacy development environments and multi-stage migration paths that safely bring code from LabVIEW 6.0 through 2024+ without file corruption."},
            {"question": "How do you guarantee that test calculations won't change after refactoring?", "answer": "We develop automated unit test harnesses that capture before-and-after mathematical outputs across thousands of input permutations, verifying bit-for-bit equivalence."},
            {"question": "What architecture do you migrate legacy code to?", "answer": "For most industrial systems, we migrate to Delacor Queued Message Handler (DQMH) or Actor Framework, providing modular, testable components with built-in diagnostic consoles."},
            {"question": "Can you replace our discontinued PCI DAQ cards during the upgrade?", "answer": "Yes. We replace obsolete PCI cards with modern NI PXIe, CompactDAQ, or USB DAQ devices, writing Hardware Abstraction Layers so the rest of the software is insulated from the hardware swap."},
            {"question": "Do you eliminate all global variables?", "answer": "Yes. We completely eliminate uncoordinated global and local variables, replacing them with thread-safe message queues, notifiers, or encapsulated module data."},
            {"question": "Will our internal team be able to maintain the refactored code?", "answer": "Yes. We provide complete code documentation, clean block diagrams with standard icons, and conduct hands-on training sessions with your engineers before handover."}
        ]
    },
    "cta": {
        "title": "Rescue Your Legacy LabVIEW Codebase with VEST Solutions",
        "description": "Stop worrying about system crashes and unmaintainable code. Modernize your test benches with certified architecture.",
        "buttonText": "Schedule a Legacy Codebase Audit",
        "buttonHref": "/book?service=legacy-code-refactoring"
    }
}

# ---------------------------------------------------------------------------
# 8. EV & BATTERY TEST BENCHES
# ---------------------------------------------------------------------------
services_dict["ev-battery-test-benches"] = {
    "slug": "ev-battery-test-benches",
    "aliases": ["ev-battery", "battery-test"],
    "meta": {
        "title": "EV & Battery Pack Automated Test Benches | VEST Solutions",
        "description": "High-voltage battery pack cycling, BMS CAN-FD validation, cell balancing, and thermal chamber integration for electric vehicle manufacturing.",
        "keywords": "EV battery test bench, battery pack cycling, BMS test, regenerative electronic load, LabVIEW battery test, CAN-FD battery validation, VEST Solutions"
    },
    "hero": {
        "eyebrow": "Automotive & E-Mobility",
        "title": "EV & Battery Pack Automated",
        "titleAccent": "Test Benches",
        "description": "High-voltage battery cycling, cell balancing, thermal chamber synchronization, and BMS communication validation test rigs designed with strict hardware safety interlocks.",
        "primaryCta": {"text": "Discuss Battery Testing Project", "href": "#contact"},
        "secondaryCta": {"text": "View Test Capabilities", "href": "#offer"},
        "artType": "battery",
        "statsText": "Voltage: Up to 1000V   |   Current: Up to 600A   |   BMS: CAN-FD"
    },
    "intro": {
        "eyebrow": "About the Service",
        "heading": "High-Voltage Precision for",
        "headingAccent": "Next-Gen E-Mobility",
        "paragraph1": "VEST Solutions engineers automated test benches for electric vehicle (EV) battery cells, modules, and full high-voltage battery packs. We integrate high-power regenerative DC power supplies, multi-channel cell voltage monitoring (CVM), and environmental thermal chambers under a unified LabVIEW test executive.",
        "paragraph2": "Our systems validate battery management system (BMS) communication over CAN-FD, measure internal resistance (DCIR) with milliohm accuracy, and execute complex drive cycle simulations (WLTP, US06) while enforcing multi-tier electrical and thermal safety shutdowns."
    },
    "capabilities": {
        "eyebrow": "What We Offer",
        "heading": "EV Battery Testing",
        "headingAccent": "Capabilities",
        "cards": [
            {
                "title": "High-Voltage Pack Cycling & Characterization",
                "description": "Regenerative charge/discharge cycling up to 1000V and 600A with energy recovery feeding back into the plant grid.",
                "bullets": ["Constant Current / Constant Voltage (CC/CV)", "Drive cycle replay (WLTP, US06, NEDC)", "DC Internal Resistance (DCIR) calculation", "Coulombic efficiency and capacity mapping"]
            },
            {
                "title": "Multi-Channel Cell Voltage & Temp Profiling",
                "description": "High-density isolated data acquisition monitoring up to 256 individual cell voltages and temperatures simultaneously.",
                "bullets": ["Galvanic isolation up to 1000VDC", "Sub-millivolt cell voltage accuracy", "Multi-point thermistor & RTD profiling", "Real-time thermal runaway early warning"]
            },
            {
                "title": "BMS CAN / CAN-FD Protocol Validation",
                "description": "Automated validation of Battery Management System firmware, safety interlocks, State of Charge (SOC), and State of Health (SOH).",
                "bullets": ["NI-XNET high-speed CAN-FD communication", "DBC database symbolic signal decoding", "High-voltage contactor actuation verification", "Diagnostic Trouble Code (DTC) reading & clearing"]
            },
            {
                "title": "Thermal Chamber & Chiller Synchronization",
                "description": "Automated control of climatic test chambers (-40°C to +85°C) and battery liquid coolant chillers synchronized with electrical loading.",
                "bullets": ["Modbus TCP & RS-485 chamber integration", "Coolant flow rate and pressure regulation", "Dew point & condensation prevention logic", "Thermal shock profile automation"]
            },
            {
                "title": "Multi-Tier Hardware Safety Interlocks",
                "description": "Fail-safe protection circuits integrating insulation resistance monitoring (Hipot), smoke/gas detectors, and emergency contactor trips.",
                "bullets": ["Hardware-timed emergency contactor dump", "Insulation & ground fault monitoring", "Hydrogen & VOC gas detection interlocks", "NFPA & ISO 6469 high-voltage compliance"]
            }
        ]
    },
    "howItWorks": {
        "eyebrow": "How It Works",
        "heading": "Automated Battery Pack",
        "headingAccent": "Test Flow",
        "lead": "From pre-charge safety checks to dynamic drive cycle stress testing, safety and precision are paramount.",
        "steps": [
            {"step": 1, "title": "Insulation & Pre-Charge Safety Check", "description": "High-voltage interlocks verify ground isolation, safety enclosures, and contactor integrity."},
            {"step": 2, "title": "BMS Communication Handshake", "description": "NI-XNET establishes CAN-FD communications, verifies firmware revision, and checks initial cell balances."},
            {"step": 3, "title": "Thermal Conditioning", "description": "Chamber and liquid chiller stabilize battery pack at specified testing temperature (-20°C to 45°C)."},
            {"step": 4, "title": "Dynamic Cycle Execution", "description": "Regenerative load executes automated CC/CV or real-world drive cycle profiles with microsecond logging."},
            {"step": 5, "title": "Cell Balancing & DCIR Measurement", "description": "System calculates internal cell resistance and profiles thermal gradients across the pack."},
            {"step": 6, "title": "Safe Discharge & Compliance Report", "description": "Pack is safely discharged to storage voltage, contactors open, and compliance report logs to SQL."}
        ],
        "flowNote": "Safety Interlock Check → BMS Handshake → Thermal Soak → Dynamic Drive Profile → DCIR Mapping → Storage Discharge"
    },
    "technologies": {
        "eyebrow": "Technologies",
        "heading": "Hardware Platforms &",
        "headingAccent": "Software Toolkits",
        "languages": ["LabVIEW & LabVIEW Real-Time", "NI TestStand", "Python (CAN-FD analysis / NumPy)", "SQL / TDMS"],
        "frameworks": ["NI-XNET Communication Framework", "NI-DAQmx Isolated Acquisition", "ASAM MCD-2 D/X (ODX/MDX) Standards", "Vector CANoe Interop", "MATLAB Battery Modeling"],
        "note": "We leverage NI-XNET hardware interfaces with hardware-timed frame transmission to eliminate communication latency during fast dynamic drive cycles."
    },
    "architecture": {
        "eyebrow": "Software Architecture",
        "heading": "Deterministic Battery Test",
        "headingAccent": "Architecture Patterns",
        "cards": [
            {"title": "Dual-Loop RTOS Safety Monitor", "description": "Runs on a deterministic real-time controller. If cell temperature or voltage exceeds critical thresholds, contactors open within 2ms, independent of Windows OS."},
            {"title": "Lossless TDMS Data Streaming", "description": "Streams 256 channels of voltage, current, and temperature data continuously to disk at 1 kHz without UI display stutter or memory leaks."},
            {"title": "DBC Symbolic CAN-FD Engine", "description": "Translates raw automotive network frames into physical engineering values (SOC, SOH, cell voltages) in real time using industry DBC database files."},
            {"title": "Automated Profile Sequencer", "description": "Allows battery test engineers to build custom multi-step charge, discharge, pulse, and rest profiles using intuitive spreadsheet recipes."}
        ]
    },
    "hardware": {
        "eyebrow": "Hardware Integration",
        "heading": "Supported Power Supplies &",
        "headingAccent": "Acquisition Hardware",
        "col1Title": "Regenerative Power Equipment",
        "col1List": ["Chroma 17020 & 17040 Regenerative Battery Test Systems", "EA Elektro-Automatik Bidirectional DC Power Supplies", "NH Research (NHR) High-Voltage Battery Cyclers", "MTS & Weiss Umwelttechnik Thermal Environmental Chambers", "Huber & Lauda High-Flow Liquid Coolant Chillers", "Megger & Bender Insulation & Ground Fault Monitors"],
        "col1ChipsTitle": "Automotive Buses",
        "col1Chips": ["CAN-FD", "High-Speed CAN", "LIN", "FlexRay", "Automotive Ethernet (100BASE-T1)"],
        "col1Note": "Full regenerative capability feeds up to 94% of discharge energy back to the plant grid.",
        "col2Title": "National Instruments DAQ & Control",
        "col2List": ["NI PXIe Chassis with Real-Time Controller", "NI-XNET High-Speed CAN / CAN-FD PXI Interfaces", "C Series High-Voltage Isolated Analog Input Modules", "C Series Thermocouple & RTD Temperature Modules", "Isolated High-Voltage Contactor Relay Drivers", "NI Industrial Touch IPCs for Operator Cockpit"],
        "col2Note": "1000V channel-to-channel and channel-to-earth galvanic isolation guarantees operator safety."
    },
    "performance": {
        "eyebrow": "Precision & Safety",
        "heading": "Measurement Precision &",
        "headingAccent": "Safety Benchmarks",
        "lead": "High-voltage testing demands uncompromising measurement accuracy and fail-safe safety responsiveness.",
        "metrics": [
            {"value": "1000V", "label": "Maximum pack voltage capability"},
            {"value": "< 2 ms", "label": "Hardware safety shutdown response"},
            {"value": "0.05%", "label": "Voltage & current measurement accuracy"},
            {"value": "256 ch", "label": "Isolated cell voltage & temp channels"},
            {"value": "94%", "label": "Energy recovery back to plant grid"}
        ],
        "leftTitle": "Safety System Rigor",
        "leftBullets": ["Hardware dual-channel e-stop interlocks bypassing all software", "Automated pre-charge circuits preventing massive inrush current", "Hydrogen and volatile organic compound (VOC) sniffer integration", "HV safety enclosures with locked door limit switches"],
        "rightTitle": "Battery Data Precision",
        "rightBullets": ["Kelvin 4-wire sensing directly at pack terminals", "Hardware-timed synchronized voltage and current sampling", "Sub-millivolt cell voltage accuracy for precise SOH estimation", "Automatic thermocouple cold-junction compensation"]
    },
    "process": {
        "eyebrow": "Development Process",
        "heading": "Turnkey Battery Test Rig",
        "headingAccent": "Lifecycle",
        "steps": [
            {"number": 1, "title": "Pack Electrical & Safety Audit", "description": "Review battery pack voltage ratings, BMS communication matrix (DBC), and required cooling profiles."},
            {"number": 2, "title": "Power & Thermal System Sizing", "description": "Size regenerative DC power cycler, thermal chamber volume, chiller BTU capacity, and power cabling."},
            {"number": 3, "title": "Electrical & Safety Enclosure Build", "description": "Design high-voltage distribution cabinet, contactor interlocks, and emergency disconnect circuits in EPLAN."},
            {"number": 4, "title": "LabVIEW RT / TestStand Development", "description": "Program deterministic safety loops, CAN-FD decoding modules, and automated drive cycle sequencers."},
            {"number": 5, "title": "Dry-Run Safety Qualification", "description": "Simulate battery responses with high-voltage resistors to verify 2ms safety shutdown mechanisms."},
            {"number": 6, "title": "Live Battery Pack Commissioning", "description": "Conduct full-power charge/discharge cycles on real battery packs, tuning chiller and thermal regulation."},
            {"number": 7, "title": "Operator Training & SAT", "description": "Deliver safety protocols, train technicians on high-voltage handling, and hand over complete software."}
        ]
    },
    "deliverables": {
        "eyebrow": "Deliverables",
        "heading": "What You",
        "headingAccent": "Receive",
        "col1": [
            "Complete uncompiled LabVIEW Real-Time & TestStand source code",
            "Full high-voltage electrical schematics & cabinet layout drawings",
            "Custom DBC symbolic CAN-FD communication drivers",
            "Automated drive cycle replay modules (WLTP, US06, custom CSV)",
            "Chamber and liquid chiller automation interface VIs",
            "Continuous TDMS and SQL battery test logging database"
        ],
        "col2": [
            "High-Voltage Safety Compliance & Interlock Certificate",
            "Factory Acceptance Test (FAT) & SAT qualification reports",
            "Battery Test Rig Operator and Maintenance Manual",
            "Calibration procedures for voltage and current channels",
            "Emergency High-Voltage Safe Operating Procedure (SOP)",
            "12-month on-site warranty and preventative maintenance SLA"
        ]
    },
    "applications": {
        "eyebrow": "Industries",
        "heading": "E-Mobility",
        "headingAccent": "Applications",
        "cards": [
            {"title": "Electric Passenger Vehicle Packs", "description": "End-of-line functional validation of 400V and 800V automotive lithium-ion battery packs and BMS modules."},
            {"title": "Electric Commercial Trucks & Buses", "description": "High-capacity multi-module battery cycling and thermal dissipation mapping for heavy-duty commercial fleets."},
            {"title": "Grid Energy Storage Systems (BESS)", "description": "Long-term degradation, capacity fade, and round-trip efficiency testing for containerized utility battery storage."},
            {"title": "Electric eVTOL & Aerospace Battery Rigs", "description": "High-altitude thermal vacuum cycling and burst-current discharge validation for urban air mobility."}
        ]
    },
    "whyUs": {
        "eyebrow": "Why VEST Solutions",
        "heading": "Why Choose",
        "headingAccent": "VEST Solutions?",
        "col1": [
            "Deep experience with 400V and 800V automotive EV battery architectures",
            "Combined mastery of high-power electrical engineering and certified NI software",
            "Uncompromising safety engineering: hardware interlocks guaranteed < 2ms",
            "Regenerative design reducing factory electrical operating costs by up to 90%"
        ],
        "col2": [
            "Native CAN-FD and automotive Ethernet protocol decoding capability",
            "In-house electrical control cabinet assembly and high-voltage wiring",
            "100% open source software delivery with no proprietary runtime restrictions",
            "Complete integration with third-party thermal chambers and chillers"
        ]
    },
    "perspective": {
        "eyebrow": "Our Perspective",
        "heading": "Engineering Truth:",
        "headingAccent": "Safety Is Not A Software Feature",
        "lead": "When cycling an 800V / 100 kWh battery pack, a software glitch or Windows operating system update must never have the power to cause a thermal runaway event.",
        "leftTitle": "What must run on dedicated hardware interlocks",
        "leftBullets": [
            "Emergency stop buttons and enclosure door safety interlocks",
            "Over-temperature contactor disconnect circuits",
            "High-voltage isolation breakdown and ground fault detection",
            "Smoke, gas, and fire suppression system trip lines"
        ],
        "rightTitle": "What the PC / LabVIEW software should control",
        "rightBullets": [
            "Dynamic charge/discharge profile sequencing and ramp rates",
            "BMS CAN-FD communication queries and DTC fault logging",
            "Chamber and chiller temperature setpoint ramping",
            "High-density data logging, impedance calculations, and PDF reporting"
        ],
        "recommendationTitle": "Our rule: real-time deterministic monitoring",
        "recommendationText": "We execute all cell voltage limits and temperature cutoffs on an embedded NI Linux Real-Time processor running independently of the Windows operator PC. Even if the operator PC completely freezes, the real-time controller will safely open the contactors within 2 milliseconds if a cell exceeds threshold."
    },
    "mistakes": {
        "eyebrow": "Shop Floor Insights",
        "heading": "Costly EV Battery",
        "headingAccent": "Testing Mistakes",
        "cards": [
            {"title": "Using non-isolated DAQ channels", "description": "Connecting standard DAQ channels to high-voltage battery stacks creates catastrophic short circuits. We mandate 1000V channel-to-channel galvanic isolation."},
            {"title": "Neglecting cable inductance during fast pulses", "description": "Long power cables generate massive inductive voltage spikes during high-current pulsing, damaging cyclers. We engineer low-inductance busbar connections."},
            {"title": "Omitting liquid chiller synchronization", "description": "Applying high-current discharge without active chiller regulation causes localized hot spots that destroy test cells. We link thermal flow with load profiles."},
            {"title": "Logging all data in uncompressed text files", "description": "Streaming 256 channels at 1 kHz generates gigabytes of data that crash text editors. We stream into structured binary TDMS databases."},
            {"title": "Relying on BMS data alone for safety", "description": "If the BMS firmware crashes, it stops reporting cell temperatures. We always install independent physical thermocouple sensors for safety verification."},
            {"title": "Ignoring condensation during cold thermal tests", "description": "Ramping temperature from -20°C to +40°C without dew point management causes condensation and flashovers. We automate dry air purging."}
        ]
    },
    "projectPlanning": {
        "eyebrow": "Planning Your Project",
        "heading": "Cost Drivers &",
        "headingAccent": "Typical Timeline",
        "lead": "Battery test rig investment depends on maximum power levels, channel counts, and safety enclosure scope.",
        "costDriversCol1": [
            "Pack voltage and current rating (400V/200A vs 1000V/600A)",
            "Regenerative vs non-regenerative electronic load selection",
            "Cell voltage and temperature channel count (16 ch vs 256 ch)",
            "Thermal chamber volume and liquid coolant chiller BTU capacity",
            "CAN-FD / Automotive Ethernet protocol complexity"
        ],
        "costDriversCol2": [
            "High-voltage safety enclosure and fire suppression integration",
            "In-plant electrical service transformer and distribution wiring",
            "MES database integration and battery serial traceability",
            "On-site commissioning, thermal tuning, and safety runoff",
            "Preventative maintenance SLA and calibration service"
        ],
        "phases": [
            {"badge": "A", "title": "Electrical & Safety Architecture, 2 to 3 weeks", "description": "Size regenerative cycler, map BMS CAN-FD signals, design safety interlocks, and draft electrical schematics."},
            {"badge": "B", "title": "Cabinet Build & Software Dev, 8 to 12 weeks", "description": "Assemble high-voltage distribution cabinet, program LabVIEW RT safety loops, and test chamber drivers."},
            {"badge": "C", "title": "Dry-Run & Live Pack Commissioning, 3 to 4 weeks", "description": "Validate 2ms safety shutdowns on simulated loads, execute full-power runs on real packs, and train team."}
        ]
    },
    "faq": {
        "eyebrow": "FAQ",
        "heading": "Frequently Asked",
        "headingAccent": "Questions",
        "items": [
            {"question": "Can your test benches simulate real-world automotive drive cycles like WLTP?", "answer": "Yes. Our software imports standard WLTP, US06, NEDC, or custom CSV current/power profiles, executing dynamic charge and discharge transitions with sub-millisecond response."},
            {"question": "How does the regenerative power feature save electricity costs?", "answer": "During battery discharge cycles, our regenerative cyclers invert the DC energy back into clean three-phase AC power, returning up to 94% of the electricity to your factory grid rather than wasting it as heat."},
            {"question": "What happens if a cell overheats during an unattended overnight test?", "answer": "The real-time controller detects the over-temperature threshold in less than 2ms, instantly trips the high-voltage safety contactors, and purges the chamber with inert nitrogen if smoke is detected."},
            {"question": "Can you test battery packs with proprietary or encrypted CAN protocols?", "answer": "Yes. We import OEM DBC files, configure security seed-and-key algorithms, and communicate over CAN-FD, LIN, or Automotive Ethernet."},
            {"question": "Do you build the physical high-voltage electrical enclosure?", "answer": "Yes. We design, wire, and certify complete industrial high-voltage cabinets adhering to NFPA 79 and IEC 60204 standards, including emergency stop relays and door interlocks."},
            {"question": "Can the software calculate State of Charge (SOC) and State of Health (SOH)?", "answer": "Yes. The software features built-in Coulomb counting algorithms, DC Internal Resistance (DCIR) calculation, and capacity mapping modules to evaluate pack degradation."},
            {"question": "How are cell temperature sensors attached to the battery pack?", "answer": "We interface with either the pack's internal BMS thermistors or mount external isolated thermocouple/RTD magnetic sensor harnesses across critical busbars and cell terminals."},
            {"question": "Can we expand the system in the future for higher voltages?", "answer": "Yes. Our modular PXI and power hardware architecture allows you to parallel additional power cycler cabinets to scale from 400V up to 1000V+ as battery technology evolves."}
        ]
    },
    "cta": {
        "title": "Engineer Your EV Battery Test Bench with VEST Solutions",
        "description": "Accelerate your e-mobility validation with high-voltage regenerative cycling, sub-millivolt cell precision, and deterministic safety.",
        "buttonText": "Schedule a Battery Test Consultation",
        "buttonHref": "/book?service=ev-battery-test-benches"
    }
}

# ---------------------------------------------------------------------------
# 9. HARDWARE-IN-THE-LOOP (HIL) SIMULATORS
# ---------------------------------------------------------------------------
services_dict["hardware-in-the-loop-hil"] = {
    "slug": "hardware-in-the-loop-hil",
    "aliases": ["hil", "hil-simulators"],
    "meta": {
        "title": "Hardware-in-the-Loop (HIL) Real-Time Simulators | VEST Solutions",
        "description": "Validating complex electronic control units (ECUs) in real time using NI PXI, FPGA plant models, and automated fault insertion testing.",
        "keywords": "Hardware in the Loop, HIL simulator, NI PXI HIL, ECU validation, fault insertion unit, LabVIEW FPGA, VeriStand, VEST Solutions"
    },
    "hero": {
        "eyebrow": "Aerospace, Defense & ECU Validation",
        "title": "Hardware-in-the-Loop Real-Time",
        "titleAccent": "Simulators (HIL)",
        "description": "Validate mission-critical ECUs, flight computers, and embedded control units prior to field integration using microsecond FPGA plant models and automated fault insertion.",
        "primaryCta": {"text": "Discuss HIL Architecture", "href": "#contact"},
        "secondaryCta": {"text": "Explore Simulation Flow", "href": "#flow"},
        "artType": "hil",
        "statsText": "Loop Rate: < 1 µs   |   Plant Models: FPGA   |   Fault Insertion: Auto"
    },
    "intro": {
        "eyebrow": "About the Service",
        "heading": "Deterministic Verification for",
        "headingAccent": "Safety-Critical Embedded Controllers",
        "paragraph1": "VEST Solutions designs and builds turnkey Hardware-in-the-Loop (HIL) simulators that trick embedded control units (ECUs) into believing they are operating inside a real physical aircraft, vehicle, or power grid. We emulate real-world sensors, actuators, and communication networks with sub-microsecond determinism.",
        "paragraph2": "By running mathematical plant models on NI PXI Real-Time and FPGA hardware, our HIL systems execute thousands of automated regression tests, edge-case failure simulations, and Fault Insertion Unit (FIU) tests without endangering expensive physical prototypes or personnel."
    },
    "capabilities": {
        "eyebrow": "What We Offer",
        "heading": "Turnkey HIL",
        "headingAccent": "Capabilities",
        "cards": [
            {
                "title": "Microsecond FPGA Plant Model Execution",
                "description": "Simulate high-speed electrical motors, inverters, hydraulic servos, and combustion physics on user-programmable Xilinx FPGAs.",
                "bullets": ["Sub-microsecond model loop rates", "MATLAB / Simulink C-code compilation", "Electric motor PMSM / BLDC emulation", "Non-linear sensor transfer functions"]
            },
            {
                "title": "Automated Fault Insertion Unit (FIU) Matrix",
                "description": "Programmatic relay matrices that inject physical electrical faults directly onto ECU signal pins to verify safety recovery.",
                "bullets": ["Pin-to-pin short circuits", "Short-to-battery / short-to-ground", "Open circuit / broken wire injection", "Intermittent contact and contact bounce"]
            },
            {
                "title": "Electronic Sensor & Actuator Emulation",
                "description": "Generate precision electrical signals that emulate real physical transducers without needing physical sensors.",
                "bullets": ["Variable Reluctance (VR) & Hall wheel speed", "Thermocouple, RTD & strain gauge simulators", "LVDT & RVDT resolver position emulation", "Electronic load banks for actuator driver outputs"]
            },
            {
                "title": "Multi-Bus Network Simulation (Rest-Bus)",
                "description": "Simulate absent ECUs across automotive, aerospace, and industrial buses with microsecond message timestamping.",
                "bullets": ["CAN 2.0B, CAN-FD & LIN rest-bus simulation", "FlexRay & Automotive Ethernet (100BASE-T1)", "MIL-STD-1553 & ARINC 429 avionics buses", "Automated network error frame injection"]
            },
            {
                "title": "Automated TestStand Regression Campaigns",
                "description": "Execute continuous 24/7 test campaigns covering thousands of test cases, generating ISO 26262 and DO-178C compliance reports.",
                "bullets": ["Automated nocturnal regression suites", "Traceability mapping to system requirements", "Automated pass/fail limit verification", "Comprehensive PDF and XML compliance logging"]
            }
        ]
    },
    "howItWorks": {
        "eyebrow": "How It Works",
        "heading": "How Our HIL Simulation",
        "headingAccent": "Loop Works",
        "lead": "From mathematical physics to physical electrical pin signals, the loop runs deterministically every microsecond.",
        "steps": [
            {"step": 1, "title": "Actuator Output Sampling", "description": "HIL system measures ECU PWM, solenoid, and motor driver outputs with high-speed digitisers."},
            {"step": 2, "title": "FPGA Plant Model Calculation", "description": "Mathematical physics models solve vehicle dynamics and mechanical loads within 1 microsecond."},
            {"step": 3, "title": "Sensor Signal Generation", "description": "Analog, digital, and resolver outputs generate exact physical voltages corresponding to the plant state."},
            {"step": 4, "title": "Network Bus Telemetry Injection", "description": "Rest-bus simulator sends synchronized CAN-FD and avionics packets back to the ECU."},
            {"step": 5, "title": "Programmatic Fault Injection", "description": "Automated TestStand sequence triggers FIU relays to short or disconnect pins during execution."},
            {"step": 6, "title": "ECU Response & Safety Verification", "description": "System monitors whether ECU detects fault, transitions to limp mode, and logs correct DTC."}
        ],
        "flowNote": "ECU Actuator Drive → High-Speed Digitizer → FPGA Plant Model → Sensor Signal DAC → Rest-Bus Simulation → ECU Sensor Inputs"
    },
    "technologies": {
        "eyebrow": "Technologies",
        "heading": "HIL Platforms &",
        "headingAccent": "Modeling Engines",
        "languages": ["LabVIEW & LabVIEW FPGA", "LabVIEW Real-Time", "NI VeriStand", "MATLAB / Simulink / Simscape", "NI TestStand", "Python"],
        "frameworks": ["NI VeriStand Real-Time Engine", "Simulink Coder / Embedded Coder", "Pickering & NI Fault Insertion APIs", "ASAM XIL API Standard", "CANoe Interfacing"],
        "note": "We compile MATLAB/Simulink models directly into NI VeriStand real-time engines, allowing controls engineers to test models without rewriting code."
    },
    "architecture": {
        "eyebrow": "System Architecture",
        "heading": "Deterministic HIL",
        "headingAccent": "Architecture Patterns",
        "cards": [
            {"title": "FPGA-Accelerated Co-Simulation", "description": "High-frequency components (inverter PWM, motor commutation) execute on FPGA at 1 MHz, while slower vehicle physics execute on Linux RT at 1 kHz."},
            {"title": "Non-Blocking Signal Conditioning Layers", "description": "Custom hardware abstraction that converts engineering units (RPM, km/h, bar) into calibrated DAC voltages and PWM frequencies automatically."},
            {"title": "Hardware-Synchronized Fault Injection", "description": "FIU relays triggered directly by FPGA event comparators, allowing fault injection at precise crank angles or message frames."},
            {"title": "Asynchronous Telemetry Streamer", "description": "Streams hundreds of simulation variables to high-capacity SSDs without imposing latency on the deterministic real-time control loop."}
        ]
    },
    "hardware": {
        "eyebrow": "Hardware Integration",
        "heading": "HIL Chassis, FIU &",
        "headingAccent": "Breakout Hardware",
        "col1Title": "HIL Simulation Hardware",
        "col1List": ["NI PXIe-8881 High-Performance Embedded Controllers", "NI PXIe Kintex-7 & Virtex FPGA Modules", "Pickering & NI PXI Fault Insertion (FIU) Switching Cards", "Multi-channel high-speed D/A and A/D PXI modules", "Resistor Simulator Cards (RTD / Thermistor emulation)", "LVDT / RVDT and Resolver Simulation Modules"],
        "col1ChipsTitle": "Automotive & Aero Protocols",
        "col1Chips": ["CAN-FD", "LIN", "FlexRay", "Automotive Ethernet", "MIL-STD-1553", "ARINC 429"],
        "col1Note": "High-density mass interconnect panels (Virginia Panel Corporation) for quick ECU hookup.",
        "col2Title": "Load Emulation & Breakout Panels",
        "col2List": ["Real & electronic load banks for solenoid / actuator drive outputs", "Automated breakout boxes (BOB) for physical probe access", "Programmable power supplies with battery droop / crank simulation", "Custom PCB signal conditioning and filter modules", "Industrial 19-inch steel rack cabinets with forced ventilation", "Emergency power cutoff and thermal interlocks"],
        "col2Note": "Complete galvanic isolation between ECU power grounds and simulation instrument grounds."
    },
    "performance": {
        "eyebrow": "Determinism & Speed",
        "heading": "Simulation Precision &",
        "headingAccent": "Timing Benchmarks",
        "lead": "True Hardware-in-the-Loop simulation requires absolute temporal determinism.",
        "metrics": [
            {"value": "< 1 µs", "label": "FPGA plant model calculation loop time"},
            {"value": "100%", "label": "Zero missed bus frames or loop overruns"},
            {"value": "1000+", "label": "Automated regression tests per hour"},
            {"value": "< 50 ns", "label": "Trigger-to-fault injection latency"},
            {"value": "16-bit", "label": "Sensor emulation DAC precision"}
        ],
        "leftTitle": "Deterministic Fidelity",
        "leftBullets": ["Dedicated FPGA hardware logic guaranteeing microsecond loop execution", "NI Linux Real-Time OS with thread priority isolation", "Point-to-point shielded wiring to eliminate digital crosstalk", "Calibrated voltage/current outputs conforming to ECU sensor ranges"],
        "rightTitle": "Automated Verification",
        "rightBullets": ["Continuous nocturnal execution of thousands of boundary test vectors", "Automated fault injection without human technician intervention", "Full requirement traceability conforming to ISO 26262 ASIL D", "Instantaneous detection of ECU reboot or watchdog reset events"]
    },
    "process": {
        "eyebrow": "Development Process",
        "heading": "Turnkey HIL System",
        "headingAccent": "Delivery Process",
        "steps": [
            {"number": 1, "title": "ECU Pinout & Interface Audit", "description": "Catalog all ECU analog inputs, digital drives, communication buses, and electrical load requirements."},
            {"number": 2, "title": "Plant Model Integration", "description": "Import customer MATLAB/Simulink models, partition between RT and FPGA, and verify offline simulation."},
            {"number": 3, "title": "Rack Design & Wiring Schematics", "description": "Design 19-inch HIL rack, mass interconnect interface, breakout panels, and FIU routing in EPLAN."},
            {"number": 4, "title": "Signal Conditioning PCB Build", "description": "Fabricate custom breakout fixtures, dummy electronic loads, and sensor conditioning filters."},
            {"number": 5, "title": "VeriStand / TestStand Programming", "description": "Configure real-time I/O mapping, rest-bus simulation, and automated test campaign sequences."},
            {"number": 6, "title": "Open-Loop & Closed-Loop Verification", "description": "Validate simulator outputs with oscilloscopes, connect physical ECU, and verify closed-loop control."},
            {"number": 7, "title": "On-Site Commissioning & Training", "description": "Deploy to customer laboratory, integrate with automated CI/CD pipeline, and train controls team."}
        ]
    },
    "deliverables": {
        "eyebrow": "Deliverables",
        "heading": "What You",
        "headingAccent": "Receive",
        "col1": [
            "Turnkey 19-inch HIL simulator rack with mass interconnect console",
            "Complete NI VeriStand / LabVIEW FPGA project files and bitfiles",
            "Automated NI TestStand regression campaign sequence suites",
            "Full electrical schematics (EPLAN) and point-to-point pinout tables",
            "Rest-bus simulation models and DBC / ARXML database files",
            "Custom electronic load and signal conditioning assemblies"
        ],
        "col2": [
            "Hardware-in-the-Loop Simulator User Manual and API docs",
            "ISO 26262 / DO-178C validation and traceability compliance package",
            "Factory Acceptance Test (FAT) & Site Acceptance Test (SAT) reports",
            "Automated Breakout Box (BOB) for physical probe diagnostics",
            "Spare parts kit including replacement FIU relays and harnesses",
            "12-month on-site warranty and plant model maintenance SLA"
        ]
    },
    "applications": {
        "eyebrow": "Industries",
        "heading": "Mission-Critical",
        "headingAccent": "HIL Deployments",
        "cards": [
            {"title": "Automotive Powertrain & ADAS ECUs", "description": "Validating engine control units, electronic stability control (ESC), and radar/camera emergency braking logic under extreme corner-case conditions."},
            {"title": "Aerospace Flight Control Computers (FCC)", "description": "DO-178C qualification of fly-by-wire flight control computers, actuator servos, and avionics bus communication."},
            {"title": "Electric Vehicle Inverters & Motor Drives", "description": "Microsecond FPGA simulation of permanent magnet synchronous motors (PMSM) to test inverter gate driver firmware."},
            {"title": "Renewable Power Grid & Inverter Microgrids", "description": "Testing microgrid controllers and utility solar inverters against simulated grid frequency transients and lightning faults."}
        ]
    },
    "whyUs": {
        "eyebrow": "Why VEST Solutions",
        "heading": "Why Choose",
        "headingAccent": "VEST Solutions?",
        "col1": [
            "Deep expertise in both NI Real-Time/FPGA hardware and MATLAB/Simulink plant modeling",
            "Turnkey mechanical, electrical, and software engineering: no hand-waving between contractors",
            "Extensive experience with Fault Insertion Units (FIU) and safety-critical automotive standards",
            "Custom signal conditioning PCB design for exotic or high-power ECU signals"
        ],
        "col2": [
            "Mass interconnect engineering allowing one HIL rack to test multiple ECU variants",
            "Proven track record with Tier-1 automotive and aerospace defense contractors",
            "100% open source delivery of all VeriStand models, TestStand sequences, and wiring files",
            "Comprehensive training ensuring your engineering team can modify plant models in-house"
        ]
    },
    "perspective": {
        "eyebrow": "Our Perspective",
        "heading": "Engineering Truth:",
        "headingAccent": "Find Bugs in HIL, Not in Flight",
        "lead": "Testing software edge cases on a physical prototype vehicle is dangerous, expensive, and slow. True HIL simulation allows you to inject thousands of electrical catastrophes before the physical vehicle is even built.",
        "leftTitle": "What HIL does that physical testing cannot",
        "leftBullets": [
            "Inject short-to-battery faults on sensor wires without blowing up real prototypes",
            "Run 10,000 automated regression cycles overnight while engineers sleep",
            "Simulate extreme sub-zero Siberian starts and Death Valley thermal overloads in seconds",
            "Achieve full DO-178C and ISO 26262 regulatory test coverage with automated logs"
        ],
        "rightTitle": "What physical testing must still verify",
        "rightBullets": [
            "Physical mechanical vibration, acoustic resonances, and structural fatigue",
            "Electromagnetic compatibility (EMC) in full anechoic chambers",
            "Physical wire harness chafing and environmental seal degradation",
            "Final human driver perception, ergonomics, and tactile pedal feel"
        ],
        "recommendationTitle": "Our rule: decouple models from physical pin assignments",
        "recommendationText": "We architect HIL simulators with an intermediate software mapping layer between Simulink models and physical PXI DAC pins. When the ECU pinout changes between prototype revisions, updating the simulator takes 10 minutes in software rather than weeks of rewiring the test rack."
    },
    "mistakes": {
        "eyebrow": "Shop Floor Insights",
        "heading": "Common HIL",
        "headingAccent": "Simulation Mistakes",
        "cards": [
            {"title": "Underestimating motor model execution latency", "description": "Electric motor inverters switch at 20 kHz. Running motor models on standard CPUs introduces phase lag that destabilizes the ECU. We use 1 MHz FPGA models."},
            {"title": "Using resistive loads instead of inductive loads", "description": "ECU drivers behave differently when driving real inductive solenoids versus simple resistors, causing false fault flags. We build true reactive load banks."},
            {"title": "Neglecting power supply voltage drop during crank", "description": "ECU reset behavior during engine cranking is critical. We use programmable power supplies that faithfully replay automotive battery drop curves."},
            {"title": "Hardwiring ECUs directly without a mass interconnect", "description": "Hardwiring ECU harnesses directly to PXI cards turns cable replacement into a nightmare. We install Virginia Panel mass interconnect receivers."},
            {"title": "Skipping rest-bus simulation of missing network nodes", "description": "If absent dashboard or sensor ECUs are not simulated on CAN-FD, the target ECU enters limp mode and refuses to execute main routines."},
            {"title": "No plan for automated night-time test runs", "description": "Using an expensive HIL simulator only for manual interactive testing wastes 70% of its value. We automate TestStand campaigns for 24/7 testing."}
        ]
    },
    "projectPlanning": {
        "eyebrow": "Planning Your Project",
        "heading": "Cost Drivers &",
        "headingAccent": "Typical Timeline",
        "lead": "HIL investment is governed by total ECU pin counts, plant model complexity, and fault insertion matrix density.",
        "costDriversCol1": [
            "Total ECU pin count (analog inputs, digital drives, sensor channels)",
            "Plant model complexity (standard vehicle dynamics vs high-speed FPGA motor)",
            "Fault Insertion Unit (FIU) channel count and fault injection modes",
            "Number of automotive and avionics network communication buses",
            "Power supply voltage and current ratings (12V / 24V / 48V / 800V)"
        ],
        "costDriversCol2": [
            "Mass interconnect receiver and interchangeable ECU cassette adapters",
            "Automated Breakout Box (BOB) hardware integration",
            "Automated TestStand regression sequence authoring scope",
            "On-site factory integration with customer ECU engineering teams",
            "Long-term simulator support, model updates, and maintenance SLA"
        ],
        "phases": [
            {"badge": "A", "title": "ECU Pinout Audit & Model Spec, 2 to 3 weeks", "description": "Catalog all ECU electrical I/O, analyze Simulink plant models, and design HIL rack electrical schematics."},
            {"badge": "B", "title": "Rack Build & VeriStand Integration, 8 to 12 weeks", "description": "Assemble 19-inch PXI rack, wire mass interconnect console, compile FPGA bitfiles, and build rest-bus simulation."},
            {"badge": "C", "title": "Closed-Loop Validation & Commissioning, 3 to 4 weeks", "description": "Connect customer ECU, verify closed-loop simulation stability, execute regression campaigns, and train team."}
        ]
    },
    "faq": {
        "eyebrow": "FAQ",
        "heading": "Frequently Asked",
        "headingAccent": "Questions",
        "items": [
            {"question": "Can we import our existing MATLAB / Simulink models into your HIL simulator?", "answer": "Yes. We compile MATLAB and Simulink models into C/C++ shared libraries and FPGA bitfiles that execute natively within the NI VeriStand real-time environment with microsecond determinism."},
            {"question": "How does the Fault Insertion Unit (FIU) inject electrical faults?", "answer": "The FIU features programmatic relay matrices inserted inline on ECU signal wires. Under software control, it can disconnect pins (open circuit), short pins to ground or battery power, or short adjacent pins together."},
            {"question": "Can one HIL rack test different types of ECUs?", "answer": "Yes. By utilizing modular Virginia Panel mass interconnect consoles and interchangeable cable cassettes, you can reconfigure the HIL simulator to test different ECU models in under 5 minutes."},
            {"question": "Can the HIL simulator run automated tests overnight without an engineer present?", "answer": "Yes. We configure NI TestStand to run automated nocturnal regression suites that execute thousands of test cases, record pass/fail results, and email summary reports to your team by morning."},
            {"question": "How fast does the FPGA plant model execute?", "answer": "Our FPGA-based plant models (such as permanent magnet synchronous motors and high-frequency inverters) execute at loop rates under 1 microsecond, providing seamless fidelity for high-speed ECUs."},
            {"question": "Do you provide electrical schematics and wire run lists?", "answer": "Yes. You receive full EPLAN electrical schematics, wire run lists with gauge and color codes, terminal block layouts, and 3D CAD models of the complete rack assembly."},
            {"question": "Can you simulate missing ECUs on the CAN-FD network?", "answer": "Yes. Our rest-bus simulation engine emulates all missing nodes on automotive CAN, CAN-FD, LIN, and FlexRay networks using your industry DBC or ARXML database files."},
            {"question": "Does the system support ISO 26262 and DO-178C compliance testing?", "answer": "Yes. We provide automated test logging, requirement traceability linking, and statistical qualification reports conforming to ISO 26262 ASIL D and DO-178C safety standards."}
        ]
    },
    "cta": {
        "title": "Validate Your Mission-Critical ECUs with VEST Solutions",
        "description": "Find software bugs and electrical faults in the lab, not in the field. Partner with VEST Solutions for turnkey HIL simulators.",
        "buttonText": "Schedule a HIL Architecture Consultation",
        "buttonHref": "/book?service=hardware-in-the-loop-hil"
    }
}

# ---------------------------------------------------------------------------
# 10. RF & WIRELESS AUTOMATED TEST
# ---------------------------------------------------------------------------
services_dict["rf-wireless-automated-test"] = {
    "slug": "rf-wireless-automated-test",
    "aliases": ["rf-wireless", "rf-testing"],
    "meta": {
        "title": "RF & Wireless Automated Characterization Systems | VEST Solutions",
        "description": "Automated S-parameter extraction, multi-port VNA automation, spectrum analysis, and RF switching matrices up to 40 GHz for aerospace and telecom.",
        "keywords": "RF automated test, VNA automation, S-parameter extraction, spectrum analyzer automation, LabVIEW RF, microwave test bench, VEST Solutions"
    },
    "hero": {
        "eyebrow": "Microwave & Telecommunications",
        "title": "RF & Wireless Automated",
        "titleAccent": "Characterization Systems",
        "description": "Automated measurement of S-parameters, gain, noise figure, and spectrum emissions for RF components, radar modules, and wireless transceivers up to 40 GHz.",
        "primaryCta": {"text": "Discuss RF Testing Project", "href": "#contact"},
        "secondaryCta": {"text": "View RF Capabilities", "href": "#offer"},
        "artType": "rf",
        "statsText": "Frequency: DC to 40 GHz   |   Repeatability: < 0.05 dB   |   SOLT Cal: Auto"
    },
    "intro": {
        "eyebrow": "About the Service",
        "heading": "High-Frequency Precision for",
        "headingAccent": "Aerospace, Defense & Telecom",
        "paragraph1": "VEST Solutions engineers automated RF and microwave test systems that eliminate the tedious manual knob-turning of traditional laboratory characterization. We automate Vector Network Analyzers (VNAs), Spectrum Analyzers, Power Meters, and multi-port coaxial switching matrices across frequencies from DC up to 40 GHz.",
        "paragraph2": "Whether characterizing radar transmit/receive modules, verifying 5G front-end filters, or conducting automated wireless transceiver regulatory compliance, our systems automate NIST-traceable calibration, de-embed fixture parasitics, and output complete Touchstone (.s2p) data files in seconds."
    },
    "capabilities": {
        "eyebrow": "What We Offer",
        "heading": "Automated RF & Microwave",
        "headingAccent": "Capabilities",
        "cards": [
            {
                "title": "Multi-Port VNA & S-Parameter Automation",
                "description": "Automate S11, S21, S12, and S22 measurements across thousands of frequency points with sub-second sweep rates.",
                "bullets": ["Touchstone (.s2p / .s4p) automated export", "Group delay & phase linearity mapping", "Time-domain reflectometry (TDR) gating", "Dynamic range characterization > 120 dB"]
            },
            {
                "title": "Harmonic Distortion & Spectrum Analysis",
                "description": "Automated capture of third-order intercept (TOI/IP3), spurious emissions, adjacent channel leakage ratio (ACLR), and harmonics.",
                "bullets": ["Automated peak search and marker tracking", "Spur search across multi-GHz spans", "Phase noise & jitter characterization", "Occupied Bandwidth (OBW) verification"]
            },
            {
                "title": "Automated Coaxial Matrix Switching",
                "description": "Low-loss microwave relay matrices that route high-frequency signals across multiple DUT ports without human cable swapping.",
                "bullets": ["Switch repeatability < 0.03 dB up to 40 GHz", "Automated relay cycle count tracking", "Matched path electrical length routing", "High isolation > 90 dB between channels"]
            },
            {
                "title": "NIST-Traceable Calibration & De-Embedding",
                "description": "Automated electronic calibration (E-Cal) and mathematical de-embedding to remove test fixture and cable insertion loss.",
                "bullets": ["Automated SOLT & TRL calibration routines", "2X Thru and TRL fixture de-embedding", "Real-time cable phase stability monitoring", "NIST-traceable calibration verification logs"]
            },
            {
                "title": "Noise Figure & Power Meter Profiling",
                "description": "High-precision automated measurement of amplifier noise figure, gain compression (P1dB), and saturated output power.",
                "bullets": ["Y-Factor noise figure measurement", "P1dB automated gain sweep compression", "Multi-channel average & peak power sensing", "Thermal drift power compensation"]
            }
        ]
    },
    "howItWorks": {
        "eyebrow": "How It Works",
        "heading": "Automated Microwave",
        "headingAccent": "Characterization Flow",
        "lead": "From automated calibration de-embedding to S-parameter Touchstone export, precision is absolute.",
        "steps": [
            {"step": 1, "title": "Electronic Calibration (E-Cal)", "description": "Automated VNA calibration standards (Short, Open, Load, Thru) move reference plane to DUT ports."},
            {"step": 2, "title": "Coaxial Switch Matrix Routing", "description": "Microwave relays route RF signal to the active test port while terminating unused lines in 50 ohms."},
            {"step": 3, "title": "Vector Network Analyzer Sweep", "description": "VNA executes fast hardware-triggered sweep across frequency span with synchronized IF bandwidths."},
            {"step": 4, "title": "Mathematical De-Embedding", "description": "Software strips test fixture and connector parasitics using S-parameter matrix subtraction."},
            {"step": 5, "title": "Spectrum & Harmonic Analysis", "description": "Spectrum analyzer captures harmonics and spurious emissions under maximum RF drive power."},
            {"step": 6, "title": "Touchstone & Compliance Export", "description": "Data exports to Touchstone S2P, Smith charts render, and pass/fail limits log to SQL."}
        ],
        "flowNote": "E-Cal Reference → Microwave Matrix Route → Hardware VNA Sweep → De-Embedding Math → Spectrum Analysis → S2P Export"
    },
    "technologies": {
        "eyebrow": "Technologies",
        "heading": "RF Frameworks &",
        "headingAccent": "Instrument Toolkits",
        "languages": ["LabVIEW & LabVIEW RF Toolkits", "Python (scikit-rf / PyVISA)", "MATLAB RF Toolbox", "SCPI Command Sets", "SQL"],
        "frameworks": ["NI Switch Executive", "NI-VISA High-Speed Bus Engine", "IVIFndation IVI-RF Drivers", "Touchstone Specification Standard", "OpenTAP RF Plugins"],
        "note": "We leverage Python's scikit-rf library integrated natively with LabVIEW to execute advanced microwave matrix conversions and de-embedding."
    },
    "architecture": {
        "eyebrow": "Software Architecture",
        "heading": "High-Frequency Automated",
        "headingAccent": "Test Architecture",
        "cards": [
            {"title": "Switch Executive Virtual Routing", "description": "Manages complex multi-tier microwave switch topologies through symbolic path names (e.g. 'DUT1_PortA_to_VNA1'), automatically preventing illegal relay closures."},
            {"title": "Binary SCPI Block Transfers", "description": "Transfers thousands of complex S-parameter trace points using high-speed IEEE 488.2 binary blocks rather than slow ASCII text, accelerating sweeps by 5x."},
            {"title": "Fixture De-Embedding Engine", "description": "Mathematically strips out the S-parameters of PCB breakout fixtures, moving the measurement reference plane directly to the pins of the DUT."},
            {"title": "Automated Touchstone Parser", "description": "Exports standardized .s1p, .s2p, and .s4p files compatible with Keysight ADS, AWR Microwave Office, and Ansys HFSS simulation software."}
        ]
    },
    "hardware": {
        "eyebrow": "Hardware Integration",
        "heading": "Supported Microwave &",
        "headingAccent": "RF Instruments",
        "col1Title": "Supported RF Benchtop Vendors",
        "col1List": ["Keysight Technologies / Agilent (PNA, ENA, FieldFox)", "Rohde & Schwarz (ZNA, ZNB, FSW, SMBV)", "Anritsu VectorStar & ShockLine VNAs", "Tektronix Real-Time Spectrum Analyzers (RSA)", "Chroma & Keysight Programmable Power Supplies", "Boonton & Mini-Circuits RF USB Power Sensors"],
        "col1ChipsTitle": "Connectors Supported",
        "col1Chips": ["SMA (26.5 GHz)", "2.92mm / K (40 GHz)", "2.4mm (50 GHz)", "Type-N (18 GHz)", "BNC", "SMP / SMPM"],
        "col1Note": "Torque-wrench verified coaxial connections to prevent connector damage.",
        "col2Title": "PXI Modular RF & Switching",
        "col2List": ["NI PXI Vector Signal Transceivers (VST up to 44 GHz)", "Pickering & NI PXI Microwave Coaxial Multiplexers", "Dow-Key & Radiall High-Repeatability Microwave Relays", "Automated Electronic Calibration Modules (Keysight / R&S E-Cal)", "Semi-rigid and flexible phase-stable coaxial cable assemblies", "Custom RF shielded test enclosures with absorber foam"],
        "col2Note": "Insertion loss calibration verified across temperature shifts."
    },
    "performance": {
        "eyebrow": "Repeatability & Precision",
        "heading": "Measurement Precision &",
        "headingAccent": "Repeatability Benchmarks",
        "lead": "In high-frequency microwave testing, 0.1 dB of repeatability error can cause false scrap of expensive components.",
        "metrics": [
            {"value": "DC–40 GHz", "label": "Frequency coverage capability"},
            {"value": "< 0.03 dB", "label": "Switch repeatability across 1M cycles"},
            {"value": "> 120 dB", "label": "Dynamic range for isolation testing"},
            {"value": "5x", "label": "Faster sweep rate with binary streaming"},
            {"value": "< 0.05 dB", "label": "Measurement repeatability"}
        ],
        "leftTitle": "RF Signal Integrity",
        "leftBullets": ["Phase-stable flexible coaxial test cables with stainless steel armor", "Calibrated precision torque wrenches used for all mating connections", "50-ohm characteristic impedance matching across all fixtures", "Absorber-lined RF isolation enclosures suppressing ambient Wi-Fi/cellular"],
        "rightTitle": "Automated Throughput",
        "rightBullets": ["Automated multi-port matrix switching eliminating manual cable swaps", "Hardware-timed PXI backplane triggering between VNA and power meters", "Direct binary memory parsing of complex real/imaginary data points", "Automated limit mask checking with instantaneous pass/fail graphics"]
    },
    "process": {
        "eyebrow": "Development Process",
        "heading": "Turnkey RF Test System",
        "headingAccent": "Lifecycle",
        "steps": [
            {"number": 1, "title": "Frequency & Port Mapping", "description": "Catalog DUT frequencies, maximum power levels, S-parameter requirements, and port counts."},
            {"number": 2, "title": "Microwave Matrix Topology", "description": "Design coaxial switch tree, evaluate insertion loss budgets, and select phase-stable cables."},
            {"number": 3, "title": "Mechanical & Enclosure Design", "description": "Model 19-inch rack, RF shielding chamber, and custom DUT test fixture with SMA/2.92mm ports."},
            {"number": 4, "title": "LabVIEW / Python Driver Build", "description": "Program SCPI binary communication drivers, switch routing logic, and de-embedding algorithms."},
            {"number": 5, "title": "Calibration & Loss Characterization", "description": "Execute full E-Cal calibration, measure switch insertion loss, and verify return loss > 20 dB."},
            {"number": 6, "title": "Gage R&R Repeatability Trials", "description": "Run 30-part multi-cycle repeatability trials to prove measurement stability < 0.05 dB."},
            {"number": 7, "title": "On-Site Installation & Training", "description": "Deploy to customer RF lab, integrate with factory database, and train RF technicians."}
        ]
    },
    "deliverables": {
        "eyebrow": "Deliverables",
        "heading": "What You",
        "headingAccent": "Receive",
        "col1": [
            "Complete uncompiled LabVIEW RF application source code",
            "Custom SCPI binary instrument drivers for VNA and Spectrum Analyzer",
            "Modular Switch Executive coaxial routing configurations",
            "Fixture de-embedding module (.s2p math subtraction)",
            "Automated Touchstone (.s2p / .s4p) file export utility",
            "Complete electrical schematics and coaxial routing diagram"
        ],
        "col2": [
            "RF Test System Operator & Calibration Manual",
            "Gage R&R statistical repeatability qualification report",
            "Phase-stable coaxial test cable assemblies with test reports",
            "Factory Acceptance Test (FAT) sign-off documents",
            "Touchstone simulation verification against Keysight ADS",
            "12-month on-site warranty and calibration maintenance SLA"
        ]
    },
    "applications": {
        "eyebrow": "Industries",
        "heading": "High-Frequency",
        "headingAccent": "Use Cases",
        "cards": [
            {"title": "Aerospace Radar T/R Modules", "description": "Automated S-parameter, phase linearity, and pulsed RF power validation for phased array radar transceivers."},
            {"title": "Satellite Transponders & Filters", "description": "Multi-band Ku/Ka-band filter group delay, insertion loss, and out-of-band rejection characterization."},
            {"title": "5G Front-End Modules (FEM)", "description": "High-speed automated testing of power amplifiers, low-noise amplifiers (LNAs), and multi-port RF switches."},
            {"title": "Automotive 77 GHz Radar Antennas", "description": "Automated return loss, antenna gain, and radiation pattern characterization for automotive safety radar."}
        ]
    },
    "whyUs": {
        "eyebrow": "Why VEST Solutions",
        "heading": "Why Choose",
        "headingAccent": "VEST Solutions?",
        "col1": [
            "Deep microwave engineering expertise up to 40 GHz across multi-vendor instruments (Keysight, R&S, Anritsu)",
            "Turnkey automated coaxial matrix design eliminating human cable swapping errors",
            "Mathematically verified fixture de-embedding yielding true chip-level S-parameters",
            "Certified LabVIEW and Python developers specializing in high-speed binary SCPI transfers"
        ],
        "col2": [
            "Proven Gage R&R repeatability track record exceeding strict aerospace standards",
            "100% open source delivery of all measurement code and calibration routines",
            "In-house mechanical fixture fabrication with precision microwave connector mounting",
            "Hands-on operator training on calibration maintenance and torque-wrench discipline"
        ]
    },
    "perspective": {
        "eyebrow": "Our Perspective",
        "heading": "Engineering Truth:",
        "headingAccent": "Calibration Decides Everything",
        "lead": "At 10 GHz, moving a coaxial cable by 2 inches changes its electrical phase length. Automated RF testing requires extreme calibration discipline and mechanical rigidity.",
        "leftTitle": "What automated RF systems solve",
        "leftBullets": [
            "Eliminate human operator torque errors when tightening expensive microwave connectors",
            "Reduce 4-hour manual multi-port S-parameter measurements down to 30 seconds",
            "Automatically de-embed PCB test fixture loss and trace parasitics",
            "Prevent accidental damage to delicate VNA front-panel test ports"
        ],
        "rightTitle": "What requires physical laboratory discipline",
        "rightBullets": [
            "Using precision torque wrenches (8 in-lbs for SMA/2.92mm) on every single connection",
            "Inspecting connector mating surfaces under a microscope for pin wear or metal shavings",
            "Allowing instruments to thermally stabilize for 45 minutes before calibration",
            "Maintaining clean, temperature-controlled laboratory environments (23°C ± 1°C)"
        ],
        "recommendationTitle": "Our rule: automate switching, protect connectors",
        "recommendationText": "Manual cable swapping wears out expensive VNA test ports after 500 connections. We install high-repeatability microwave switch matrices. The operator connects the DUT once, and software routes all ports automatically, extending instrument lifespan by 10x and cutting test time by 80%."
    },
    "mistakes": {
        "eyebrow": "Shop Floor Insights",
        "heading": "Costly Mistakes in",
        "headingAccent": "RF Test Automation",
        "cards": [
            {"title": "Over-tightening coaxial connectors with pliers", "description": "Over-torquing permanently crushes the internal pin air interface, ruining 40 GHz precision. We enforce calibrated breakaway torque wrenches."},
            {"title": "Transferring S-parameters in ASCII text format", "description": "Querying 1,601 complex frequency points as ASCII text strings takes seconds per sweep. We stream IEEE binary blocks in under 100 milliseconds."},
            {"title": "Ignoring switch path electrical length differences", "description": "Failing to normalize path lengths across different switch matrix routes adds phase error. We calibrate and store offsets for every switch path."},
            {"title": "Using cheap non-armored coaxial cables", "description": "Standard coaxial cables change phase when flexed by operators. We mandate double-shielded, phase-stable armored cables."},
            {"title": "Skipping daily calibration verification", "description": "Assuming yesterday's calibration is valid causes scrap when temperature shifts. We include automated 10-second reference verification checks."},
            {"title": "Leaving unused switch ports open-circuit", "description": "Unterminated microwave ports reflect energy back into the matrix, causing spurious resonances. We terminate all unused ports in 50 ohms."}
        ]
    },
    "projectPlanning": {
        "eyebrow": "Planning Your Project",
        "heading": "Cost Drivers &",
        "headingAccent": "Typical Timeline",
        "lead": "RF system investment depends on upper frequency limit, port count, and coaxial switch matrix complexity.",
        "costDriversCol1": [
            "Maximum frequency band (6 GHz vs 26.5 GHz vs 40 GHz)",
            "VNA instrument brand and model (Keysight PNA/ENA vs Rohde & Schwarz ZNB)",
            "Coaxial switch matrix port count and topology (1x4 vs 4x16 matrix)",
            "Automated Electronic Calibration (E-Cal) module integration",
            "Phase-stable armored coaxial cable assemblies count"
        ],
        "costDriversCol2": [
            "RF shielding test enclosure with absorber foam lining",
            "Custom PCB test fixture and microwave launch connector design",
            "Automated Touchstone export and de-embedding software scope",
            "Gage R&R statistical repeatability verification trials",
            "On-site installation, laboratory calibration, and team training"
        ],
        "phases": [
            {"badge": "A", "title": "RF Audit & Link Budget Spec, 1 to 2 weeks", "description": "Evaluate frequency requirements, calculate insertion loss budgets, and select instruments and relays."},
            {"badge": "B", "title": "Matrix Fabrication & Software Build, 6 to 8 weeks", "description": "Assemble microwave switch rack, wire semi-rigid coaxial lines, and program LabVIEW/Python drivers."},
            {"badge": "C", "title": "Calibration & Gage R&R Runoff, 2 to 3 weeks", "description": "Execute E-Cal routines, verify de-embedding math, prove < 0.05 dB repeatability, and train staff."}
        ]
    },
    "faq": {
        "eyebrow": "FAQ",
        "heading": "Frequently Asked",
        "headingAccent": "Questions",
        "items": [
            {"question": "What is the maximum frequency capability of your automated RF test systems?", "answer": "We design automated RF and microwave test systems operating from DC up to 40 GHz, utilizing precision 2.92mm (K) and 2.4mm coaxial connectors and high-frequency microwave relays."},
            {"question": "How do you de-embed the test fixture parasitics from the measurement?", "answer": "We utilize 2X Thru and TRL (Thru-Reflect-Line) calibration math to characterize the S-parameters of the PCB trace and launch connectors, mathematically subtracting them from the raw measurement to yield true DUT performance."},
            {"question": "Can your software export standard Touchstone (.s2p) files for RF simulation tools?", "answer": "Yes. Our software automatically generates industry-standard Touchstone format files (.s1p, .s2p, .s4p) compatible with Keysight ADS, Cadence AWR Microwave Office, and Ansys HFSS."},
            {"question": "What is the repeatability of your microwave switch matrices?", "answer": "Our automated microwave switch matrices utilize premium Radiall or Dow-Key relays achieving switch insertion loss repeatability better than 0.03 dB across 1 million switching cycles."},
            {"question": "Can you automate instruments from different vendors in the same test bench?", "answer": "Yes. We regularly unify Keysight VNAs, Rohde & Schwarz spectrum analyzers, and Anritsu power meters into a single seamless automated LabVIEW or Python test executive."},
            {"question": "How much faster is automated testing compared to manual VNA measurements?", "answer": "Automated testing typically accelerates multi-port characterization by 5x to 10x, reducing a 30-minute manual knob-turning sequence to under 15 seconds while completely eliminating operator recording errors."},
            {"question": "Do you provide RF shielding enclosures for wireless testing?", "answer": "Yes. We integrate custom aluminum RF shielded test boxes lined with microwave absorber foam, achieving > 80 dB isolation against ambient cellular and Wi-Fi signals."},
            {"question": "What torque wrench should be used for coaxial connections?", "answer": "We supply calibrated 8 in-lb (0.9 N-m) breakaway torque wrenches with every system to guarantee correct connector seating without damage."}
        ]
    },
    "cta": {
        "title": "Automate Your Microwave Testing with VEST Solutions",
        "description": "Achieve sub-0.05 dB measurement repeatability and accelerate S-parameter sweeps up to 40 GHz with certified RF engineering.",
        "buttonText": "Schedule an RF Testing Consultation",
        "buttonHref": "/book?service=rf-wireless-automated-test"
    }
}

print(f"Successfully assembled all {len(services_dict)} services!")

# Write out TypeScript file
ts_content = """// ═════════════════════════════════════════════════════════════════════════════
// VEST SOLUTIONS - 10 COMPREHENSIVE INDUSTRIAL ENGINEERING SERVICES DATA
// Unified Data Architecture powering /services/[slug] with reusable ServiceTemplate
// ═════════════════════════════════════════════════════════════════════════════

export interface ServicePageData {
  slug: string;
  aliases?: string[];
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    description: string;
    primaryCta: { text: string; href: string };
    secondaryCta: { text: string; href: string };
    artType: 'vision' | 'test' | 'hardware' | 'plc' | 'refactor' | 'battery' | 'hil' | 'rf';
    statsText?: string;
  };
  intro: {
    eyebrow: string;
    heading: string;
    headingAccent: string;
    paragraph1: string;
    paragraph2: string;
  };
  capabilities: {
    eyebrow: string;
    heading: string;
    headingAccent: string;
    cards: Array<{
      title: string;
      description: string;
      bullets: string[];
    }>;
  };
  howItWorks: {
    eyebrow: string;
    heading: string;
    headingAccent: string;
    lead: string;
    steps: Array<{
      step: number;
      title: string;
      description: string;
    }>;
    flowNote: string;
  };
  technologies: {
    eyebrow: string;
    heading: string;
    headingAccent: string;
    languages: string[];
    frameworks: string[];
    note: string;
  };
  architecture: {
    eyebrow: string;
    heading: string;
    headingAccent: string;
    cards: Array<{
      title: string;
      description: string;
    }>;
  };
  hardware: {
    eyebrow: string;
    heading: string;
    headingAccent: string;
    col1Title: string;
    col1List: string[];
    col1ChipsTitle?: string;
    col1Chips?: string[];
    col1Note?: string;
    col2Title: string;
    col2List: string[];
    col2Note?: string;
  };
  performance: {
    eyebrow: string;
    heading: string;
    headingAccent: string;
    lead: string;
    metrics: Array<{
      value: string;
      label: string;
    }>;
    leftTitle: string;
    leftBullets: string[];
    rightTitle: string;
    rightBullets: string[];
  };
  process: {
    eyebrow: string;
    heading: string;
    headingAccent: string;
    steps: Array<{
      number: number;
      title: string;
      description: string;
    }>;
  };
  deliverables: {
    eyebrow: string;
    heading: string;
    headingAccent: string;
    col1: string[];
    col2: string[];
  };
  applications: {
    eyebrow: string;
    heading: string;
    headingAccent: string;
    cards: Array<{
      title: string;
      description: string;
    }>;
  };
  whyUs: {
    eyebrow: string;
    heading: string;
    headingAccent: string;
    col1: string[];
    col2: string[];
  };
  perspective: {
    eyebrow: string;
    heading: string;
    headingAccent: string;
    lead: string;
    leftTitle: string;
    leftBullets: string[];
    rightTitle: string;
    rightBullets: string[];
    recommendationTitle: string;
    recommendationText: string;
  };
  mistakes: {
    eyebrow: string;
    heading: string;
    headingAccent: string;
    cards: Array<{
      title: string;
      description: string;
    }>;
  };
  projectPlanning: {
    eyebrow: string;
    heading: string;
    headingAccent: string;
    lead: string;
    costDriversCol1: string[];
    costDriversCol2: string[];
    phases: Array<{
      badge: string;
      title: string;
      description: string;
    }>;
  };
  faq: {
    eyebrow: string;
    heading: string;
    headingAccent: string;
    items: Array<{
      question: string;
      answer: string;
    }>;
  };
  cta: {
    title: string;
    description: string;
    buttonText: string;
    buttonHref: string;
  };
}

export const SERVICES_DATA: Record<string, ServicePageData> = """ + json.dumps(services_dict, indent=2, ensure_ascii=False) + """;

/**
 * Helper function to lookup a service by its primary slug or any configured alias.
 */
export function getServiceData(slugOrAlias: string): ServicePageData | undefined {
  if (SERVICES_DATA[slugOrAlias]) {
    return SERVICES_DATA[slugOrAlias];
  }
  for (const s of Object.values(SERVICES_DATA)) {
    if (s.aliases && s.aliases.includes(slugOrAlias)) {
      return s;
    }
  }
  return undefined;
}

/**
 * Returns all 10 primary slugs and configured aliases for static path generation.
 */
export function getAllServiceSlugs(): string[] {
  const slugs = Object.keys(SERVICES_DATA);
  const aliases: string[] = [];
  for (const s of Object.values(SERVICES_DATA)) {
    if (s.aliases) {
      aliases.push(...s.aliases);
    }
  }
  return Array.from(new Set([...slugs, ...aliases]));
}
"""

target_path = r"C:\Users\DELL\.gemini\antigravity\brain\91d533ab-c9df-4d21-b7b4-9f8f7b93e0fb\scratch\servicesData.ts"
os.makedirs(os.path.dirname(target_path), exist_ok=True)
with open(target_path, "w", encoding="utf-8") as f:
    f.write(ts_content)

print(f"Successfully wrote {len(ts_content)} characters to {target_path}")
