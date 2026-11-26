import { ServicePageData } from './types';

export const ai_object_detection: ServicePageData = {
  slug: "ai-object-detection",
  aliases: ["vision", "object-detection"],
  meta: {
    title: "AI-Based Object Detection Systems | Industrial AI Vision – VEST Solutions",
    description: "Custom AI object detection for industrial automation: component identification, part inspection, counting, positioning, and real-time manufacturing.",
    keywords: "AI object detection, industrial machine vision, AI visual inspection, LabVIEW AI, YOLO industrial inspection, component detection, conveyor counting, pick and place vision, manufacturing AI, VEST Solutions"
  },
  hero: {
    eyebrow: "Industrial Machine Vision",
    title: "AI-Based Object Detection Systems for",
    titleAccent: "Industrial Automation",
    description: "Customized AI systems that identify, locate, classify and track objects in real time, bringing intelligent visual inspection to your production line.",
    primaryCta: {
      text: "Discuss Your Requirements",
      href: "#contact"
    },
    secondaryCta: {
      text: "See How It Works",
      href: "#flow"
    },
    artType: "vision",
    statsText: "Count: 1,248   |   Inference: 14 ms   |   PLC: OK"
  },
  intro: {
    eyebrow: "About the Service",
    heading: "Intelligent Object Detection for",
    headingAccent: "Smart Manufacturing",
    paragraph1: "At VEST Solutions, we develop customized AI-powered object detection systems using advanced machine vision and deep learning. Our solutions integrate industrial cameras, computer vision algorithms, deep learning models, LabVIEW applications and automation hardware to deliver intelligent visual inspection systems.",
    paragraph2: "Whether you need to identify automotive components, detect missing parts, count products on a conveyor, verify assembly or locate objects for robotic applications, we build software tailored to your production requirements."
  },
  capabilities: {
    eyebrow: "What We Offer",
    heading: "AI Object Detection",
    headingAccent: "Capabilities",
    cards: [
      {
        title: "Industrial Component Detection",
        description: "Identify and locate individual components within manufacturing processes.",
        bullets: [
          "Automotive component identification",
          "Electronic component detection",
          "Component orientation detection",
          "Multiple-object identification"
        ]
      },
      {
        title: "Part Presence & Absence",
        description: "Verify required components are correctly positioned before the next operation.",
        bullets: [
          "Missing component detection",
          "Assembly completeness verification",
          "Fixture loading verification",
          "Wrong component identification"
        ]
      },
      {
        title: "Object Counting & Tracking",
        description: "Automatically count and track products moving through production lines.",
        bullets: [
          "Conveyor product counting",
          "Real-time object tracking",
          "Production quantity monitoring",
          "Duplicate and missed count detection"
        ]
      },
      {
        title: "Position & Orientation",
        description: "Locate and orient components for inspection and robotic pick-and-place.",
        bullets: [
          "X, Y position estimation",
          "Rotation and orientation detection",
          "Pick-and-place position estimation",
          "Coordinate transformation"
        ]
      },
      {
        title: "Multi-Class Detection",
        description: "Detect multiple object types within a single camera frame using trained AI models.",
        bullets: [
          "Multiple component identification",
          "Product category recognition",
          "Different part number identification",
          "Mixed-product detection"
        ]
      }
    ]
  },
  howItWorks: {
    eyebrow: "How It Works",
    heading: "How Our AI Object Detection Software",
    headingAccent: "Works",
    lead: "From image capture to production data, each stage is designed to feed the next.",
    steps: [
      {
        step: 1,
        title: "Image Acquisition",
        description: "Industrial camera captures images with configured exposure, lighting and triggering."
      },
      {
        step: 2,
        title: "Preprocessing",
        description: "Resizing, normalization, filtering and required image-processing operations."
      },
      {
        step: 3,
        title: "AI Detection",
        description: "Trained model generates bounding boxes, object classes and confidence scores."
      },
      {
        step: 4,
        title: "Result Processing",
        description: "Locations, counts, classifications and inspection rules are evaluated."
      },
      {
        step: 5,
        title: "Automation Decision",
        description: "LabVIEW communicates results to the PLC or automation controller."
      },
      {
        step: 6,
        title: "Data & Reporting",
        description: "Results, timestamps, product IDs, images and production data are logged."
      }
    ],
    flowNote: "Camera → Preprocessing → AI Model → Result Logic → PLC / HMI → Database"
  },
  technologies: {
    eyebrow: "Technologies",
    heading: "Technologies and",
    headingAccent: "Frameworks",
    languages: [
      "Python – AI development & inference",
      "LabVIEW – control, acquisition & HMI",
      "C/C++ – high-performance processing",
      "SQL – inspection & production history"
    ],
    frameworks: [
      "PyTorch",
      "TensorFlow",
      "Keras",
      "Ultralytics YOLO",
      "ONNX Runtime",
      "OpenCV"
    ],
    note: "We select suitable architectures, including YOLO-based detectors and Faster R-CNN, based on object size, image resolution, detection speed and hardware resources."
  },
  architecture: {
    eyebrow: "LabVIEW Architecture",
    heading: "Built for",
    headingAccent: "Reliable Operation",
    cards: [
      {
        title: "Producer–Consumer",
        description: "Independent loops for acquisition, processing, inference and result handling. Acquisition continues while inference runs on earlier images."
      },
      {
        title: "Queued Message Handler",
        description: "Event-driven control of camera configuration, inspection commands, recipe management and result handling."
      },
      {
        title: "DQMH Modular Architecture",
        description: "For larger systems, camera acquisition, AI inference, PLC communication, database and reporting run as independent modules."
      },
      {
        title: "LabVIEW OOP",
        description: "Reusable camera interfaces, inspection modules and hardware abstraction layers."
      }
    ]
  },
  hardware: {
    eyebrow: "Hardware Integration",
    heading: "Camera &",
    headingAccent: "Hardware Support",
    col1Title: "Supported Camera Technologies",
    col1List: [
      "GigE Vision cameras",
      "USB3 Vision cameras",
      "Camera Link cameras",
      "CoaXPress cameras",
      "GenICam-compatible cameras",
      "Manufacturer SDK-based cameras"
    ],
    col1ChipsTitle: "Camera Manufacturers",
    col1Chips: [
      "Basler",
      "FLIR / Teledyne",
      "IDS",
      "Allied Vision"
    ],
    col1Note: "Subject to model and SDK compatibility.",
    col2Title: "National Instruments Hardware",
    col2List: [
      "NI PXI / PXIe Chassis & Controllers",
      "NI CompactRIO RT & FPGA",
      "NI CompactDAQ Modular Systems",
      "NI USB DAQ Devices",
      "NI Vision Development Module",
      "NI-IMAQdx Acquisition Framework"
    ],
    col2Note: "NI hardware is chosen when a project needs acquisition, triggering, control or synchronization. It is not mandatory for every camera application."
  },
  performance: {
    eyebrow: "Performance",
    heading: "AI Accuracy &",
    headingAccent: "Detection Performance",
    lead: "We measure performance with validation parameters rather than promising a fixed accuracy for every application.",
    metrics: [
      {
        value: "mAP",
        label: "Mean Average Precision"
      },
      {
        value: "P / R / F1",
        label: "Precision, recall, F1 score"
      },
      {
        value: "IoU",
        label: "Intersection over Union"
      },
      {
        value: "FP / FN",
        label: "False positive & negative rates"
      },
      {
        value: "ms / image",
        label: "Inference time per image"
      }
    ],
    leftTitle: "How We Improve Detection",
    leftBullets: [
      "Representative image collection",
      "Accurate image annotation",
      "Dataset balancing across edge cases",
      "Lighting optimization & camera calibration"
    ],
    rightTitle: "Real-Time Optimization",
    rightBullets: [
      "Independent validation datasets",
      "Model optimization & deployment testing",
      "GPU acceleration, ONNX Runtime and TensorRT where supported",
      "Tuned strictly to your production cycle time"
    ]
  },
  process: {
    eyebrow: "Development Process",
    heading: "Our Object Detection",
    headingAccent: "Development Process",
    steps: [
      {
        number: 1,
        title: "Requirement Analysis",
        description: "Component, production speed, object variation, camera position and required performance."
      },
      {
        number: 2,
        title: "Feasibility & Camera Selection",
        description: "Resolution, lens, lighting, working distance and triggering requirements."
      },
      {
        number: 3,
        title: "AI Dataset Preparation",
        description: "Sample image collection, annotation, and training and validation datasets."
      },
      {
        number: 4,
        title: "AI Model Development",
        description: "Training and evaluation of the selected detection model."
      },
      {
        number: 5,
        title: "LabVIEW & Hardware Integration",
        description: "Application, camera interface, PLC communication and operator interface."
      },
      {
        number: 6,
        title: "System Qualification",
        description: "Functional, detection, speed and stability testing, plus customer acceptance."
      },
      {
        number: 7,
        title: "Deployment & Support",
        description: "Installation, documentation, training and technical support."
      }
    ]
  },
  deliverables: {
    eyebrow: "Deliverables",
    heading: "What You",
    headingAccent: "Receive",
    col1: [
      "Customized object detection software",
      "Trained AI model weights & ONNX binaries",
      "LabVIEW application where required",
      "Python AI inference modules",
      "Industrial camera integration drivers",
      "PLC integration where required"
    ],
    col2: [
      "Operator HMI front panel dashboard",
      "Inspection data logging (SQL / TDMS / CSV)",
      "Configuration and recipe management system",
      "Test and validation qualification reports",
      "Complete software architecture documentation",
      "On-site installation, training, and SLA support"
    ]
  },
  applications: {
    eyebrow: "Industries",
    heading: "Industrial",
    headingAccent: "Applications",
    cards: [
      {
        title: "Automotive Manufacturing",
        description: "Component identification, assembly verification, part counting and positioning on fast automotive sub-assembly lines."
      },
      {
        title: "Electronics Manufacturing",
        description: "Component presence detection, PCB component inspection and connector pin assembly verification."
      },
      {
        title: "Aerospace & Defence",
        description: "High-precision component identification, critical fastener verification, and visual surface inspection applications."
      },
      {
        title: "General Manufacturing",
        description: "Product detection, conveyor monitoring, robotic sorting and end-to-end production traceability."
      }
    ]
  },
  whyUs: {
    eyebrow: "Why VEST Solutions",
    heading: "Why Choose",
    headingAccent: "VEST Solutions?",
    col1: [
      "Certified LabVIEW engineering team (CLD/CLA certified)",
      "Combined AI, Python, and industrial automation expertise",
      "Custom-trained AI models tuned to physical shop-floor optics",
      "Modular and scalable software architecture (DQMH / Actor Framework)"
    ],
    col2: [
      "Industrial camera and National Instruments hardware integration",
      "Precision-focused development and empirical validation benchmarks",
      "Complete engineering documentation and full source code handover",
      "Rapid remote and on-site technical commissioning assistance"
    ]
  },
  perspective: {
    eyebrow: "Our Perspective",
    heading: "What We Actually",
    headingAccent: "Think",
    lead: "Most vendors will tell you AI will solve your inspection problem. Our honest view is more useful: AI object detection is extremely powerful when the problem genuinely needs it, and an expensive distraction when it does not.",
    leftTitle: "Where we believe deep learning wins",
    leftBullets: [
      "Parts vary in shape, colour, texture or orientation from batch to batch",
      "Lighting and background are hard to control on the shop floor",
      "You need to recognise many part numbers in one camera frame",
      "Defects are hard to describe with fixed rules but easy to show in pictures"
    ],
    rightTitle: "Where we tell clients to use classical vision",
    rightBullets: [
      "A fixed part under fixed light, checked against a known template",
      "Simple presence checks, barcode or OCR reads, and dimensional gauging",
      "Very high speed tasks where a rules-based check is fast and deterministic",
      "Projects where a few hundred images are not enough to train a robust model"
    ],
    recommendationTitle: "Our recommendation: start with the data, not the model",
    recommendationText: "In our experience, the success of an industrial AI project is decided in the first month, not by the choice of network. Good, consistent images, proper lighting and a clear definition of what counts as a defect matter far more than whether you use YOLO or Faster R-CNN. We therefore recommend a short feasibility stage with real parts from your line before any commitment to a full system. If a simple vision tool solves the problem, we will say so and recommend it, even though a larger AI project would be more profitable for us."
  },
  mistakes: {
    eyebrow: "Lessons From the Shop Floor",
    heading: "Common Mistakes in",
    headingAccent: "Industrial AI Inspection",
    cards: [
      {
        title: "Training on the best images only",
        description: "Models trained on clean lab images fail when the real line adds dust, glare, vibration blur or shifted parts. Collect images across shifts, operators and seasons."
      },
      {
        title: "Ignoring the lighting",
        description: "A fixed, diffused light source often improves accuracy more than a larger neural network. We treat lighting as part of the software design."
      },
      {
        title: "Vague defect definitions",
        description: "If two inspectors disagree on what a defect is, no model can learn it reliably. We help write a labelling guide and measure inspector agreement first."
      },
      {
        title: "No plan for model drift",
        description: "New part variants, tool wear and lighting changes degrade accuracy over time. We build image capture for retraining and track false rejects from day one."
      },
      {
        title: "Optimising accuracy alone",
        description: "A model with 99% accuracy can still stop the line if its false rejects are too high. We agree on the cost of false positives and false negatives before tuning."
      },
      {
        title: "Treating the PLC as an afterthought",
        description: "Handshake timing, reject actuation and cycle-time budgets decide whether the system works in production. We design the control interface alongside the vision pipeline."
      }
    ]
  },
  projectPlanning: {
    eyebrow: "Planning Your Project",
    heading: "Cost Drivers and",
    headingAccent: "Typical Timeline",
    lead: "Every line is different, so we do not publish a single price. These are the factors that move cost and schedule the most:",
    costDriversCol1: [
      "Number of part variants and classes to detect",
      "Camera count, resolution, lens and lighting complexity",
      "Required cycle time and frame rate",
      "Availability of labelled or representative images",
      "PLC, robot or MES integration scope"
    ],
    costDriversCol2: [
      "Number of stations and production lines",
      "Validation and documentation requirements (e.g. aerospace/defense audits)",
      "On-site commissioning and operator training requirements",
      "Support level and SLA guarantees after go-live",
      "Use of existing NI hardware vs greenfield equipment"
    ],
    phases: [
      {
        badge: "A",
        title: "Feasibility study, about 1 to 2 weeks",
        description: "Sample images from your line, camera and lighting recommendation, and a go/no-go decision with an honest accuracy estimate."
      },
      {
        badge: "B",
        title: "Proof of concept, about 3 to 6 weeks",
        description: "A working model on your real parts, measured against the validation metrics agreed in stage A."
      },
      {
        badge: "C",
        title: "Full system and integration, timeline set per project",
        description: "Production software, PLC integration, HMI, data logging and qualification testing."
      }
    ]
  },
  faq: {
    eyebrow: "FAQ",
    heading: "Frequently Asked",
    headingAccent: "Questions",
    items: [
      {
        question: "Can you detect multiple objects in one image?",
        answer: "Yes. We develop multi-class and multi-object detection applications depending on the selected model and hardware."
      },
      {
        question: "Can you integrate AI object detection with LabVIEW?",
        answer: "Yes. We integrate Python-based AI inference with LabVIEW through suitable communication interfaces such as the LabVIEW Python Node, TCP/IP sockets, and shared memory."
      },
      {
        question: "Can the software operate in real time?",
        answer: "Yes. We optimize the application for camera frame rate, image resolution, inference speed and production cycle time, achieving sub-20ms inference with GPU/ONNX acceleration."
      },
      {
        question: "Can we use our existing camera?",
        answer: "Yes. We evaluate the camera interface, SDK, driver and compatibility before integration (GigE Vision, USB3 Vision, Camera Link, etc.)."
      },
      {
        question: "Can we train AI using our own product images?",
        answer: "Yes. We use customer-provided datasets to train and validate application-specific models, assisting in dataset hygiene and class balancing."
      },
      {
        question: "Do you provide complete source code?",
        answer: "Editable source code and AI model deliverables can be supplied according to the agreed scope and third-party licensing terms."
      },
      {
        question: "How many images do we need to train a model?",
        answer: "It depends on part variation and defect types. For a simple part-presence task we can often start with a few hundred well-labelled images. For multi-class or defect detection, we usually need several thousand images across shifts and lighting conditions."
      },
      {
        question: "Is AI better than traditional machine vision?",
        answer: "Not always. Classical vision is faster to deploy, easier to validate and often ideal for fixed, controlled inspections. AI is better when variation is high or defects are hard to describe with rules. We recommend whichever approach solves your problem most reliably."
      },
      {
        question: "Will the system keep working as our products change?",
        answer: "Yes, if it is designed for it. We include image capture for retraining, a recipe system for new part variants and performance monitoring so that drift is noticed early."
      },
      {
        question: "Do you work outside India?",
        answer: "Yes. We support remote engineering globally and can provide on-site assistance where the project requires it. Please contact us with your location and requirements."
      },
      {
        question: "Do you work with our existing PLC and MES?",
        answer: "We integrate with common PLC and automation controllers (Siemens, Allen-Bradley, Omron, Mitsubishi) and exchange results through standard interfaces like OPC UA, Modbus TCP, or discrete digital I/O."
      }
    ]
  },
  cta: {
    title: "Build Your Intelligent Object Detection System with VEST Solutions",
    description: "Transform conventional inspection into intelligent, automated systems with customized AI object detection and industrial machine vision.",
    buttonText: "Request a Feasibility Assessment",
    buttonHref: "/book?service=ai-object-detection"
  }
};

