import {
  ArrowRight, ChevronRight, ChevronLeft, FileText, Layers, LayoutTemplate, Archive, Grid, PenTool, BookOpen,
  ClipboardList, HardHat, Package, Target, Shield, FileSearch, Compass, CheckCircle2, Sparkles, ExternalLink,
  Sliders, Check, Building2, Factory, Cpu, Settings, Box, CheckSquare, Database
} from 'lucide-react';

const IMG1 = 'https://res.cloudinary.com/defqgygsf/image/upload/v1790425893/89t_rwtqjh.png';
const IMG2 = 'https://res.cloudinary.com/defqgygsf/image/upload/v1790430016/8932_wyigkp.png';
const IMG3 = 'https://res.cloudinary.com/defqgygsf/image/upload/v1790430154/327_maakri.png';

export const servicePagesData: Record<string, any> = {
  "miscellaneous-steel-detailing": {
    slug: "miscellaneous-steel-detailing",
    overview: {
      title: `FROM CONCEPT \n TO CONSTRUCTION.`,
      description: `Civil engineering projects depend on accurate drawings, structured documentation, and clear technical information. We create detailed engineering documentation that helps teams move confidently from initial layouts and design coordination through construction execution.`,
      features: [
        { icon: Target, title: 'Accurate Drawings', subtitle: 'Millimeter Tolerance' },
        { icon: FileText, title: 'Structured Docs', subtitle: 'Standardized BOQs' },
        { icon: HardHat, title: 'Site Ready', subtitle: 'IFC & GFC Packets' }
      ]
    },
    servicesTitle: `ENGINEERING DOCUMENTATION, \n BUILT FOR EXECUTION.`,
    servicesDesc: `From millimeter-accurate drawings to comprehensive BOQ support, we formulate misc-steel documentation built for real-world contractors.`,
    services: [
  {
    id: '01',
    title: 'Platforms',
    icon: FileText,
    image: 'https://images.unsplash.com/photo-1541888086425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80',
    heading: 'PLATFORMS',
    desc: 'Professional platforms for precision execution and engineering compliance.',
    features: [
      { name: 'Detailing', icon: FileText },
      { name: 'Documentation', icon: Layers },
      { name: 'Quality Check', icon: Shield },
      { name: 'Final Delivery', icon: CheckCircle2 }
    ]
  },
  {
    id: '02',
    title: 'Staircases',
    icon: FileText,
    image: 'https://images.unsplash.com/photo-1541888086425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80',
    heading: 'STAIRCASES',
    desc: 'Professional staircases for precision execution and engineering compliance.',
    features: [
      { name: 'Detailing', icon: FileText },
      { name: 'Documentation', icon: Layers },
      { name: 'Quality Check', icon: Shield },
      { name: 'Final Delivery', icon: CheckCircle2 }
    ]
  },
  {
    id: '03',
    title: 'Handrails',
    icon: FileText,
    image: 'https://images.unsplash.com/photo-1541888086425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80',
    heading: 'HANDRAILS',
    desc: 'Professional handrails for precision execution and engineering compliance.',
    features: [
      { name: 'Detailing', icon: FileText },
      { name: 'Documentation', icon: Layers },
      { name: 'Quality Check', icon: Shield },
      { name: 'Final Delivery', icon: CheckCircle2 }
    ]
  },
  {
    id: '04',
    title: 'Ladders',
    icon: FileText,
    image: 'https://images.unsplash.com/photo-1541888086425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80',
    heading: 'LADDERS',
    desc: 'Professional ladders for precision execution and engineering compliance.',
    features: [
      { name: 'Detailing', icon: FileText },
      { name: 'Documentation', icon: Layers },
      { name: 'Quality Check', icon: Shield },
      { name: 'Final Delivery', icon: CheckCircle2 }
    ]
  },
  {
    id: '05',
    title: 'Equipment Supports',
    icon: FileText,
    image: 'https://images.unsplash.com/photo-1541888086425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80',
    heading: 'EQUIPMENT SUPPORTS',
    desc: 'Professional equipment supports for precision execution and engineering compliance.',
    features: [
      { name: 'Detailing', icon: FileText },
      { name: 'Documentation', icon: Layers },
      { name: 'Quality Check', icon: Shield },
      { name: 'Final Delivery', icon: CheckCircle2 }
    ]
  },
  {
    id: '06',
    title: 'Pipe Supports',
    icon: FileText,
    image: 'https://images.unsplash.com/photo-1541888086425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80',
    heading: 'PIPE SUPPORTS',
    desc: 'Professional pipe supports for precision execution and engineering compliance.',
    features: [
      { name: 'Detailing', icon: FileText },
      { name: 'Documentation', icon: Layers },
      { name: 'Quality Check', icon: Shield },
      { name: 'Final Delivery', icon: CheckCircle2 }
    ]
  },
  {
    id: '07',
    title: 'Walkways',
    icon: FileText,
    image: 'https://images.unsplash.com/photo-1541888086425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80',
    heading: 'WALKWAYS',
    desc: 'Professional walkways for precision execution and engineering compliance.',
    features: [
      { name: 'Detailing', icon: FileText },
      { name: 'Documentation', icon: Layers },
      { name: 'Quality Check', icon: Shield },
      { name: 'Final Delivery', icon: CheckCircle2 }
    ]
  },
  {
    id: '08',
    title: 'Miscellaneous Structures',
    icon: FileText,
    image: 'https://images.unsplash.com/photo-1541888086425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80',
    heading: 'MISCELLANEOUS STRUCTURES',
    desc: 'Professional miscellaneous structures for precision execution and engineering compliance.',
    features: [
      { name: 'Detailing', icon: FileText },
      { name: 'Documentation', icon: Layers },
      { name: 'Quality Check', icon: Shield },
      { name: 'Final Delivery', icon: CheckCircle2 }
    ]
  },
  {
    id: '09',
    title: 'Industrial Steel Components',
    icon: FileText,
    image: 'https://images.unsplash.com/photo-1541888086425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80',
    heading: 'INDUSTRIAL STEEL COMPONENTS',
    desc: 'Professional industrial steel components for precision execution and engineering compliance.',
    features: [
      { name: 'Detailing', icon: FileText },
      { name: 'Documentation', icon: Layers },
      { name: 'Quality Check', icon: Shield },
      { name: 'Final Delivery', icon: CheckCircle2 }
    ]
  }
],
    serviceMeta: {
  "01": {
    "type": "ENGINEERING",
    "ref": "ENG-01",
    "status": "READY",
    "rev": "01",
    "shortTitle": "PLATFORMS"
  },
  "02": {
    "type": "ENGINEERING",
    "ref": "ENG-02",
    "status": "READY",
    "rev": "01",
    "shortTitle": "STAIRCASES"
  },
  "03": {
    "type": "ENGINEERING",
    "ref": "ENG-03",
    "status": "READY",
    "rev": "01",
    "shortTitle": "HANDRAILS"
  },
  "04": {
    "type": "ENGINEERING",
    "ref": "ENG-04",
    "status": "READY",
    "rev": "01",
    "shortTitle": "LADDERS"
  },
  "05": {
    "type": "ENGINEERING",
    "ref": "ENG-05",
    "status": "READY",
    "rev": "01",
    "shortTitle": "EQUIPMENT"
  },
  "06": {
    "type": "ENGINEERING",
    "ref": "ENG-06",
    "status": "READY",
    "rev": "01",
    "shortTitle": "PIPE"
  },
  "07": {
    "type": "ENGINEERING",
    "ref": "ENG-07",
    "status": "READY",
    "rev": "01",
    "shortTitle": "WALKWAYS"
  },
  "08": {
    "type": "ENGINEERING",
    "ref": "ENG-08",
    "status": "READY",
    "rev": "01",
    "shortTitle": "MISCELLANEOUS"
  },
  "09": {
    "type": "ENGINEERING",
    "ref": "ENG-09",
    "status": "READY",
    "rev": "01",
    "shortTitle": "INDUSTRIAL"
  }
},
    workflowTitle: `A METICULOUS APPROACH \n FOR STEEL FABRICATION.`,
    workflowDesc: `Our documentation workflow supports the entire project lifecycle, minimizing rework and ensuring airtight site readiness.`,
    workflow: [
  {
    step: '01',
    title: 'Design Review',
    category: 'Initiation',
    desc: 'Reviewing architectural intent and field measurements.',
    icon: FileSearch,
    tag: 'Phase 01',
    metric: 'Intent Match'
  },
  {
    step: '02',
    title: '3D Modeling',
    category: 'Drafting',
    desc: 'Creating accurate 3D models of complex miscellaneous steel elements.',
    icon: Box,
    tag: 'Phase 02',
    metric: 'High Precision'
  },
  {
    step: '03',
    title: 'Shop Drawings Generation',
    category: 'Documentation',
    desc: 'Extracting clear, accurate, and fully dimensioned shop drawings for fabrication.',
    icon: FileText,
    tag: 'Phase 03',
    metric: 'Shop-Ready'
  }
],
    galleryTitle: ``,
    projects: [
  {
    id: "01",
    category: "Industrial Facility",
    title: "Nexus Processing Plant",
    scope: "Detailing of over 50 custom access platforms, catwalks, and caged ladders for a large industrial plant.",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80",
    tags: [
      "Industrial",
      "Platforms",
      "OSHA"
    ],
    deliverables: [
      "Platform Shop Drawings",
      "Ladder Details",
      "Grating BOM"
    ]
  }
],
    ctaTitle: `<motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl sm:text-5xl lg:text-[64px] font-black tracking-tight leading-[1.05] mb-6 uppercase text-white" > READY TO START \n YOUR PROJECT? </motion.h2>`,
    ctaDesc: `Let's create accurate, reliable and construction-ready documentation for your next project.`
  },
  "bom-material-documentation": {
    slug: "bom-material-documentation",
    overview: {
      title: `FROM CONCEPT \n TO CONSTRUCTION.`,
      description: `Civil engineering projects depend on accurate drawings, structured documentation, and clear technical information. We create detailed engineering documentation that helps teams move confidently from initial layouts and design coordination through construction execution.`,
      features: [
        { icon: Target, title: 'Accurate Drawings', subtitle: 'Millimeter Tolerance' },
        { icon: FileText, title: 'Structured Docs', subtitle: 'Standardized BOQs' },
        { icon: HardHat, title: 'Site Ready', subtitle: 'IFC & GFC Packets' }
      ]
    },
    servicesTitle: `ENGINEERING DOCUMENTATION, \n BUILT FOR EXECUTION.`,
    servicesDesc: `From millimeter-accurate drawings to comprehensive BOQ support, we formulate bom-material documentation built for real-world contractors.`,
    services: [
  {
    id: '01',
    title: 'Bill of Materials',
    icon: FileText,
    image: 'https://images.unsplash.com/photo-1541888086425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80',
    heading: 'BILL OF MATERIALS',
    desc: 'Professional bill of materials for precision execution and engineering compliance.',
    features: [
      { name: 'Detailing', icon: FileText },
      { name: 'Documentation', icon: Layers },
      { name: 'Quality Check', icon: Shield },
      { name: 'Final Delivery', icon: CheckCircle2 }
    ]
  },
  {
    id: '02',
    title: 'Material Take-Off',
    icon: FileText,
    image: 'https://images.unsplash.com/photo-1541888086425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80',
    heading: 'MATERIAL TAKE-OFF',
    desc: 'Professional material take-off for precision execution and engineering compliance.',
    features: [
      { name: 'Detailing', icon: FileText },
      { name: 'Documentation', icon: Layers },
      { name: 'Quality Check', icon: Shield },
      { name: 'Final Delivery', icon: CheckCircle2 }
    ]
  },
  {
    id: '03',
    title: 'Quantity Take-Off',
    icon: FileText,
    image: 'https://images.unsplash.com/photo-1541888086425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80',
    heading: 'QUANTITY TAKE-OFF',
    desc: 'Professional quantity take-off for precision execution and engineering compliance.',
    features: [
      { name: 'Detailing', icon: FileText },
      { name: 'Documentation', icon: Layers },
      { name: 'Quality Check', icon: Shield },
      { name: 'Final Delivery', icon: CheckCircle2 }
    ]
  },
  {
    id: '04',
    title: 'Fabrication Lists',
    icon: FileText,
    image: 'https://images.unsplash.com/photo-1541888086425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80',
    heading: 'FABRICATION LISTS',
    desc: 'Professional fabrication lists for precision execution and engineering compliance.',
    features: [
      { name: 'Detailing', icon: FileText },
      { name: 'Documentation', icon: Layers },
      { name: 'Quality Check', icon: Shield },
      { name: 'Final Delivery', icon: CheckCircle2 }
    ]
  },
  {
    id: '05',
    title: 'Material Schedules',
    icon: FileText,
    image: 'https://images.unsplash.com/photo-1541888086425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80',
    heading: 'MATERIAL SCHEDULES',
    desc: 'Professional material schedules for precision execution and engineering compliance.',
    features: [
      { name: 'Detailing', icon: FileText },
      { name: 'Documentation', icon: Layers },
      { name: 'Quality Check', icon: Shield },
      { name: 'Final Delivery', icon: CheckCircle2 }
    ]
  },
  {
    id: '06',
    title: 'Component Lists',
    icon: FileText,
    image: 'https://images.unsplash.com/photo-1541888086425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80',
    heading: 'COMPONENT LISTS',
    desc: 'Professional component lists for precision execution and engineering compliance.',
    features: [
      { name: 'Detailing', icon: FileText },
      { name: 'Documentation', icon: Layers },
      { name: 'Quality Check', icon: Shield },
      { name: 'Final Delivery', icon: CheckCircle2 }
    ]
  },
  {
    id: '07',
    title: 'Procurement Support Documentation',
    icon: FileText,
    image: 'https://images.unsplash.com/photo-1541888086425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80',
    heading: 'PROCUREMENT SUPPORT DOCUMENTATION',
    desc: 'Professional procurement support documentation for precision execution and engineering compliance.',
    features: [
      { name: 'Detailing', icon: FileText },
      { name: 'Documentation', icon: Layers },
      { name: 'Quality Check', icon: Shield },
      { name: 'Final Delivery', icon: CheckCircle2 }
    ]
  }
],
    serviceMeta: {
  "01": {
    "type": "ENGINEERING",
    "ref": "ENG-01",
    "status": "READY",
    "rev": "01",
    "shortTitle": "BILL"
  },
  "02": {
    "type": "ENGINEERING",
    "ref": "ENG-02",
    "status": "READY",
    "rev": "01",
    "shortTitle": "MATERIAL"
  },
  "03": {
    "type": "ENGINEERING",
    "ref": "ENG-03",
    "status": "READY",
    "rev": "01",
    "shortTitle": "QUANTITY"
  },
  "04": {
    "type": "ENGINEERING",
    "ref": "ENG-04",
    "status": "READY",
    "rev": "01",
    "shortTitle": "FABRICATION"
  },
  "05": {
    "type": "ENGINEERING",
    "ref": "ENG-05",
    "status": "READY",
    "rev": "01",
    "shortTitle": "MATERIAL"
  },
  "06": {
    "type": "ENGINEERING",
    "ref": "ENG-06",
    "status": "READY",
    "rev": "01",
    "shortTitle": "COMPONENT"
  },
  "07": {
    "type": "ENGINEERING",
    "ref": "ENG-07",
    "status": "READY",
    "rev": "01",
    "shortTitle": "PROCUREMENT"
  }
},
    workflowTitle: `A DATA-DRIVEN APPROACH \n FOR EXACT PROCUREMENT.`,
    workflowDesc: `Our documentation workflow supports the entire project lifecycle, minimizing rework and ensuring airtight site readiness.`,
    workflow: [
  {
    step: '01',
    title: 'Model Validation',
    category: 'Preparation',
    desc: 'Ensuring the 3D model is fully detailed and attributed for accurate data extraction.',
    icon: CheckSquare,
    tag: 'Phase 01',
    metric: 'Data Integrity'
  },
  {
    step: '02',
    title: 'Data Extraction',
    category: 'Processing',
    desc: 'Running advanced scripts to extract precise quantities and material specifications.',
    icon: Database,
    tag: 'Phase 02',
    metric: '100% Accuracy'
  },
  {
    step: '03',
    title: 'Report Formatting',
    category: 'Delivery',
    desc: 'Formatting data into customized, easy-to-read reports tailored for procurement systems.',
    icon: FileText,
    tag: 'Phase 03',
    metric: 'ERP Ready'
  }
],
    galleryTitle: ``,
    projects: [
  {
    id: "01",
    category: "Large-Scale Infrastructure",
    title: "City Center Transit Hub",
    scope: "Comprehensive material takeoffs and BOM generation for a complex transit hub project, saving the client 15% in material waste.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    tags: [
      "Infrastructure",
      "Takeoffs",
      "Cost Savings"
    ],
    deliverables: [
      "Detailed Steel BOM",
      "Concrete Volume Reports",
      "Fastener Summaries"
    ]
  }
],
    ctaTitle: `<motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl sm:text-5xl lg:text-[64px] font-black tracking-tight leading-[1.05] mb-6 uppercase text-white" > READY TO START \n YOUR PROJECT? </motion.h2>`,
    ctaDesc: `Let's create accurate, reliable and construction-ready documentation for your next project.`
  },
  "structural-engineering": {
    slug: "structural-engineering",
    overview: {
      title: `FROM CONCEPT \n TO CONSTRUCTION.`,
      description: `Civil engineering projects depend on accurate drawings, structured documentation, and clear technical information. We create detailed engineering documentation that helps teams move confidently from initial layouts and design coordination through construction execution.`,
      features: [
        { icon: Target, title: 'Accurate Drawings', subtitle: 'Millimeter Tolerance' },
        { icon: FileText, title: 'Structured Docs', subtitle: 'Standardized BOQs' },
        { icon: HardHat, title: 'Site Ready', subtitle: 'IFC & GFC Packets' }
      ]
    },
    servicesTitle: `ENGINEERING DOCUMENTATION, \n BUILT FOR EXECUTION.`,
    servicesDesc: `From millimeter-accurate drawings to comprehensive BOQ support, we formulate structural documentation built for real-world contractors.`,
    services: [
  {
    id: '01',
    title: 'Structural Steel Detailing',
    icon: FileText,
    image: 'https://images.unsplash.com/photo-1541888086425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80',
    heading: 'STRUCTURAL STEEL DETAILING',
    desc: 'Professional structural steel detailing for precision execution and engineering compliance.',
    features: [
      { name: 'Detailing', icon: FileText },
      { name: 'Documentation', icon: Layers },
      { name: 'Quality Check', icon: Shield },
      { name: 'Final Delivery', icon: CheckCircle2 }
    ]
  },
  {
    id: '02',
    title: 'Structural Drawings',
    icon: FileText,
    image: 'https://images.unsplash.com/photo-1541888086425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80',
    heading: 'STRUCTURAL DRAWINGS',
    desc: 'Professional structural drawings for precision execution and engineering compliance.',
    features: [
      { name: 'Detailing', icon: FileText },
      { name: 'Documentation', icon: Layers },
      { name: 'Quality Check', icon: Shield },
      { name: 'Final Delivery', icon: CheckCircle2 }
    ]
  },
  {
    id: '03',
    title: 'Steel Fabrication Drawings',
    icon: FileText,
    image: 'https://images.unsplash.com/photo-1541888086425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80',
    heading: 'STEEL FABRICATION DRAWINGS',
    desc: 'Professional steel fabrication drawings for precision execution and engineering compliance.',
    features: [
      { name: 'Detailing', icon: FileText },
      { name: 'Documentation', icon: Layers },
      { name: 'Quality Check', icon: Shield },
      { name: 'Final Delivery', icon: CheckCircle2 }
    ]
  },
  {
    id: '04',
    title: 'Erection Drawings',
    icon: FileText,
    image: 'https://images.unsplash.com/photo-1541888086425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80',
    heading: 'ERECTION DRAWINGS',
    desc: 'Professional erection drawings for precision execution and engineering compliance.',
    features: [
      { name: 'Detailing', icon: FileText },
      { name: 'Documentation', icon: Layers },
      { name: 'Quality Check', icon: Shield },
      { name: 'Final Delivery', icon: CheckCircle2 }
    ]
  },
  {
    id: '05',
    title: 'Connection Detailing',
    icon: FileText,
    image: 'https://images.unsplash.com/photo-1541888086425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80',
    heading: 'CONNECTION DETAILING',
    desc: 'Professional connection detailing for precision execution and engineering compliance.',
    features: [
      { name: 'Detailing', icon: FileText },
      { name: 'Documentation', icon: Layers },
      { name: 'Quality Check', icon: Shield },
      { name: 'Final Delivery', icon: CheckCircle2 }
    ]
  },
  {
    id: '06',
    title: 'Member Detailing',
    icon: FileText,
    image: 'https://images.unsplash.com/photo-1541888086425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80',
    heading: 'MEMBER DETAILING',
    desc: 'Professional member detailing for precision execution and engineering compliance.',
    features: [
      { name: 'Detailing', icon: FileText },
      { name: 'Documentation', icon: Layers },
      { name: 'Quality Check', icon: Shield },
      { name: 'Final Delivery', icon: CheckCircle2 }
    ]
  },
  {
    id: '07',
    title: 'Structural Documentation',
    icon: FileText,
    image: 'https://images.unsplash.com/photo-1541888086425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80',
    heading: 'STRUCTURAL DOCUMENTATION',
    desc: 'Professional structural documentation for precision execution and engineering compliance.',
    features: [
      { name: 'Detailing', icon: FileText },
      { name: 'Documentation', icon: Layers },
      { name: 'Quality Check', icon: Shield },
      { name: 'Final Delivery', icon: CheckCircle2 }
    ]
  },
  {
    id: '08',
    title: 'Shop Drawings',
    icon: FileText,
    image: 'https://images.unsplash.com/photo-1541888086425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80',
    heading: 'SHOP DRAWINGS',
    desc: 'Professional shop drawings for precision execution and engineering compliance.',
    features: [
      { name: 'Detailing', icon: FileText },
      { name: 'Documentation', icon: Layers },
      { name: 'Quality Check', icon: Shield },
      { name: 'Final Delivery', icon: CheckCircle2 }
    ]
  }
],
    serviceMeta: {
  "01": {
    "type": "ENGINEERING",
    "ref": "ENG-01",
    "status": "READY",
    "rev": "01",
    "shortTitle": "STRUCTURAL"
  },
  "02": {
    "type": "ENGINEERING",
    "ref": "ENG-02",
    "status": "READY",
    "rev": "01",
    "shortTitle": "STRUCTURAL"
  },
  "03": {
    "type": "ENGINEERING",
    "ref": "ENG-03",
    "status": "READY",
    "rev": "01",
    "shortTitle": "STEEL"
  },
  "04": {
    "type": "ENGINEERING",
    "ref": "ENG-04",
    "status": "READY",
    "rev": "01",
    "shortTitle": "ERECTION"
  },
  "05": {
    "type": "ENGINEERING",
    "ref": "ENG-05",
    "status": "READY",
    "rev": "01",
    "shortTitle": "CONNECTION"
  },
  "06": {
    "type": "ENGINEERING",
    "ref": "ENG-06",
    "status": "READY",
    "rev": "01",
    "shortTitle": "MEMBER"
  },
  "07": {
    "type": "ENGINEERING",
    "ref": "ENG-07",
    "status": "READY",
    "rev": "01",
    "shortTitle": "STRUCTURAL"
  },
  "08": {
    "type": "ENGINEERING",
    "ref": "ENG-08",
    "status": "READY",
    "rev": "01",
    "shortTitle": "SHOP"
  }
},
    workflowTitle: `A STRUCTURAL APPROACH \n FOR BETTER DESIGNS.`,
    workflowDesc: `Our documentation workflow supports the entire project lifecycle, minimizing rework and ensuring airtight site readiness.`,
    workflow: [
  {
    step: '01',
    title: 'Project Setup & Scope',
    category: 'Initiation',
    desc: 'Reviewing architectural intent and establishing structural load requirements.',
    icon: Settings,
    tag: 'Phase 01',
    metric: '100% Scope Lock'
  },
  {
    step: '02',
    title: 'Analysis & Design',
    category: 'Engineering',
    desc: 'Performing comprehensive structural analysis and optimizing member sizes.',
    icon: Box,
    tag: 'Phase 02',
    metric: 'Code Compliant'
  },
  {
    step: '03',
    title: 'Detailed Modeling',
    category: 'Drafting',
    desc: 'Creating precise 3D structural models and extracting accurate 2D drawings.',
    icon: Layers,
    tag: 'Phase 03',
    metric: 'LOD 350-400'
  }
],
    galleryTitle: ``,
    projects: [
  {
    id: "01",
    category: "Commercial High-Rise",
    title: "Apex Corporate Center",
    scope: "Complete structural steel detailing and connection design for a 45-story commercial tower.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    tags: [
      "High-Rise",
      "Steel Detailing",
      "Complex Connections"
    ],
    deliverables: [
      "Erection Drawings",
      "Fabrication Details",
      "Advanced BOM"
    ]
  }
],
    ctaTitle: `<motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl sm:text-5xl lg:text-[64px] font-black tracking-tight leading-[1.05] mb-6 uppercase text-white" > READY TO START \n YOUR PROJECT? </motion.h2>`,
    ctaDesc: `Let's create accurate, reliable and construction-ready documentation for your next project.`
  },
  "civil-engineering": {
    slug: "civil-engineering",
    overview: {
      title: `FROM CONCEPT \n TO CONSTRUCTION.`,
      description: `Civil engineering projects depend on accurate drawings, structured documentation, and clear technical information. We create detailed engineering documentation that helps teams move confidently from initial layouts and design coordination through construction execution.`,
      features: [
        { icon: Target, title: 'Accurate Drawings', subtitle: 'Millimeter Tolerance' },
        { icon: FileText, title: 'Structured Docs', subtitle: 'Standardized BOQs' },
        { icon: HardHat, title: 'Site Ready', subtitle: 'IFC & GFC Packets' }
      ]
    },
    servicesTitle: `ENGINEERING DOCUMENTATION, \n BUILT FOR EXECUTION.`,
    servicesDesc: `From millimeter-accurate drawings to comprehensive BOQ support, we formulate civil engineering documentation built for real-world contractors.`,
    services: [
  {
    id: '01',
    title: 'Civil Engineering Drawings',
    icon: FileText,
    image: IMG1,
    heading: 'CIVIL ENGINEERING DRAWINGS',
    desc: 'Detailed architectural, structural and construction drawings for accurate design and execution.',
    features: [
      { name: 'Architectural Drawings', icon: FileText },
      { name: 'Structural Drawings', icon: Layers },
      { name: 'Elevation & Section Drawings', icon: LayoutTemplate },
      { name: 'Detailed CAD Documentation', icon: Archive },
    ]
  },
  {
    id: '02',
    title: 'Construction Documentation',
    icon: Layers,
    image: IMG2,
    heading: 'CONSTRUCTION DOCUMENTATION',
    desc: 'Comprehensive construction document sets ready for site execution and contractor coordination.',
    features: [
      { name: 'Site Layouts', icon: Grid },
      { name: 'Installation Details', icon: PenTool },
      { name: 'Material Specifications', icon: FileText },
      { name: 'As-Built Drawings', icon: BookOpen },
    ]
  },
  {
    id: '03',
    title: 'Layout Drawings',
    icon: Grid,
    image: IMG3,
    heading: 'LAYOUT DRAWINGS',
    desc: 'Precise site and floor layouts ensuring accurate spatial planning and clash resolution.',
    features: [
      { name: 'Floor Plans', icon: LayoutTemplate },
      { name: 'Reflected Ceiling Plans', icon: Grid },
      { name: 'Equipment Layouts', icon: Package },
      { name: 'Setting Out Plans', icon: Target },
    ]
  },
  {
    id: '04',
    title: 'Engineering Documentation',
    icon: Archive,
    image: IMG1,
    heading: 'ENGINEERING DOCUMENTATION',
    desc: 'Full-scale engineering documentation supporting complex infrastructure and structural designs.',
    features: [
      { name: 'Design Reports', icon: FileText },
      { name: 'Calculation Sheets', icon: ClipboardList },
      { name: 'Technical Submittals', icon: BookOpen },
      { name: 'Method Statements', icon: Layers },
    ]
  },
  {
    id: '05',
    title: 'Quantity Take-Off',
    icon: ClipboardList,
    image: IMG2,
    heading: 'QUANTITY TAKE-OFF',
    desc: 'Accurate material quantification directly from 2D/3D models for precise cost estimation.',
    features: [
      { name: 'Concrete & Rebar QTO', icon: Layers },
      { name: 'Steelwork QTO', icon: HardHat },
      { name: 'Finishes Quantification', icon: LayoutTemplate },
      { name: 'Earthworks Volumetrics', icon: Grid },
    ]
  },
  {
    id: '06',
    title: 'BOQ / BOM Support',
    icon: Package,
    image: IMG3,
    heading: 'BOQ / BOM SUPPORT',
    desc: 'Detailed Bill of Quantities and Bill of Materials preparation for procurement and bidding.',
    features: [
      { name: 'Detailed BOQ Generation', icon: ClipboardList },
      { name: 'Material Schedules', icon: FileText },
      { name: 'Supplier Ready BOMs', icon: Package },
      { name: 'Cost Code Integration', icon: Archive },
    ]
  },
  {
    id: '07',
    title: 'Technical Documentation',
    icon: BookOpen,
    image: IMG1,
    heading: 'TECHNICAL DOCUMENTATION',
    desc: 'Clear, standardized technical documentation for operation, maintenance, and compliance.',
    features: [
      { name: 'O&M Manuals', icon: BookOpen },
      { name: 'Compliance Reports', icon: FileText },
      { name: 'Safety Documentation', icon: Shield },
      { name: 'Asset Registers', icon: Archive },
    ]
  },
],
    serviceMeta: {
  '01': { type: 'CAD / ENGINEERING', ref: 'CIVIL-01', status: 'READY FOR EXECUTION', rev: '01', shortTitle: 'DRAWINGS' },
  '02': { type: 'CONSTRUCTION DOCS', ref: 'CIVIL-02', status: 'READY FOR EXECUTION', rev: '02', shortTitle: 'DOCUMENT' },
  '03': { type: 'LAYOUT / PLANNING', ref: 'CIVIL-03', status: 'READY FOR EXECUTION', rev: '03', shortTitle: 'LAYOUT' },
  '04': { type: 'ENGINEERING DOCS', ref: 'CIVIL-04', status: 'READY FOR EXECUTION', rev: '04', shortTitle: 'ENGINEERING' },
  '05': { type: 'QUANTIFICATION', ref: 'CIVIL-05', status: 'READY FOR EXECUTION', rev: '05', shortTitle: 'QTO' },
  '06': { type: 'PROCUREMENT', ref: 'CIVIL-06', status: 'READY FOR EXECUTION', rev: '06', shortTitle: 'BOQ/BOM' },
  '07': { type: 'TECHNICAL DOCS', ref: 'CIVIL-07', status: 'READY FOR EXECUTION', rev: '07', shortTitle: 'TECHNICAL' },
},
    workflowTitle: `A STRUCTURED APPROACH \n FOR BETTER BUILDINGS.`,
    workflowDesc: `Our documentation workflow supports the entire project lifecycle, minimizing rework and ensuring airtight site readiness.`,
    workflow: [
  {
    step: '01',
    title: 'Project Input',
    category: 'Discovery & Feasibility',
    desc: 'Understand project scope, regulatory requirements, site constraints, and collect baseline data.',
    icon: FileSearch,
    tag: 'Phase 01',
    metric: '100% Data Intake'
  },
  {
    step: '02',
    title: 'Engineering Dev',
    category: 'Calculations & BIM',
    desc: 'Perform calculations, 3D modeling, and author preliminary engineering schematics.',
    icon: Compass,
    tag: 'Phase 02',
    metric: 'LOD 300 / 350'
  },
  {
    step: '03',
    title: 'Coordination',
    category: 'Clash Resolution',
    desc: 'Federated model checks across Architectural, Structural, and MEP disciplines to resolve clashes.',
    icon: Layers,
    tag: 'Phase 03',
    metric: 'Zero Clashes'
  },
  {
    step: '04',
    title: 'Documentation',
    category: 'Deliverables & BOQ',
    desc: 'Generate permit-ready plan sets, comprehensive BOQs, specifications, and schedules.',
    icon: FileText,
    tag: 'Phase 04',
    metric: 'GFC Approved'
  },
  {
    step: '05',
    title: 'Site Support',
    category: 'Field Coordination',
    desc: 'Resolve RFIs, evaluate shop drawings, and issue revisions swiftly to keep work moving on site.',
    icon: HardHat,
    tag: 'Phase 05',
    metric: '< 24hr RFI Turn'
  },
  {
    step: '06',
    title: 'Handover',
    category: 'As-Built Sign-off',
    desc: 'Deliver as-built models, operations manuals, and finalized compliance documentation.',
    icon: CheckCircle2,
    tag: 'Phase 06',
    metric: 'Full Compliance'
  },
],
    galleryTitle: ``,
    projects: [
  {
    id: '01',
    category: 'Commercial High-Rise',
    title: 'Horizon Corporate Tower',
    scope: 'Complete civil and structural documentation for a 32-storey commercial tower with 3 basement levels.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    tags: ['Commercial', 'Structural', 'BIM LOD 350'],
    deliverables: [
      'Architectural Layouts & Sections',
      'Post-Tensioned Slab Schedules',
      'Comprehensive BOQ & Cost Codes',
      'IFC Execution Set'
    ]
  },
  {
    id: '02',
    category: 'Industrial Logistics',
    title: 'Apex Logistics Hub',
    scope: 'Fast-track structural steel modeling, foundation layout, and precast civil engineering for a 50,000 sqm warehouse.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    tags: ['Industrial', 'Steel Structure', 'Precast'],
    deliverables: [
      'Heavy Foundation Footing Plans',
      'Steel Connection Detailed Sheets',
      'Pavement & Stormwater QTO',
      'Bar Bending Schedules (BBS)'
    ]
  },
  {
    id: '03',
    category: 'Healthcare Facility',
    title: 'Metro Speciality Hospital',
    scope: 'High-precision clash detection and MEP-civil coordinated drawings for a state-of-the-art 400-bed hospital.',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
    tags: ['Healthcare', 'MEP Coordination', 'Critical'],
    deliverables: [
      'Radiation Shielding Concrete Walls',
      'Cleanroom Penetration Layouts',
      'As-Built Asset Database',
      'Operations Compliance Manual'
    ]
  }
],
    ctaTitle: `<motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl sm:text-5xl lg:text-[64px] font-black tracking-tight leading-[1.05] mb-6 uppercase text-white" > READY TO START \n YOUR PROJECT? </motion.h2>`,
    ctaDesc: `Let's create accurate, reliable and construction-ready documentation for your next project.`
  },
};