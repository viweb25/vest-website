import { Target, Clock, ShieldCheck, PenTool, LayoutTemplate, Layers, FileText, Settings, Archive, Box, Sliders, Briefcase, FileSignature, CheckCircle, Database, Package, Grid, BookOpen, HardHat, FileSearch, Ruler, CheckSquare, Send, Hammer } from 'lucide-react';

export const engineeringServicesData = {
  "structural-engineering": {
    hero: {
      category: "STRUCTURAL ENGINEERING",
      title1: "STRUCTURAL",
      title2: "ENGINEERING",
      description: "Robust structural designs and detailed analyses to ensure safety, durability, and compliance. We deliver precise structural models, load calculations, and reinforcement detailing.",
      image: "https://res.cloudinary.com/defqgygsf/image/upload/v1790438192/469_ds0khy.png",
    },
    overview: {
      description: "Structural engineering forms the backbone of any reliable construction. We create highly detailed structural frameworks, ensuring load-bearing efficiency, material optimization, and strict adherence to global safety standards.",
      features: [
        { icon: Target, title: 'Precision Modeling', subtitle: 'Exact Load Bearings' },
        { icon: Clock, title: 'Rapid Turnaround', subtitle: 'On-time Delivery' },
        { icon: ShieldCheck, title: 'Safety Compliance', subtitle: 'Global Standards' }
      ]
    },
    capabilities: {
      description: "From conceptual load analyses to complete rebar detailing, we formulate structural documentation built for stability and resilience.",
      services: [
        {
          id: '01',
          title: 'Steel Detailing',
          icon: FileText,
          image: 'https://res.cloudinary.com/defqgygsf/image/upload/v1790438192/469_ds0khy.png',
          heading: 'STEEL DETAILING',
          desc: 'Comprehensive steel fabrication drawings, erection plans, and connection details.',
          features: [
            { name: 'Fabrication Drawings', icon: FileText },
            { name: 'Erection Plans', icon: Layers },
            { name: 'Connection Details', icon: LayoutTemplate },
            { name: 'BOM Extraction', icon: Archive },
          ]
        },
        {
          id: '02',
          title: 'Concrete Reinforcement',
          icon: PenTool,
          image: 'https://images.unsplash.com/photo-1541888086425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80',
          heading: 'CONCRETE REINFORCEMENT',
          desc: 'Detailed rebar drawings and schedules for precise concrete reinforcement.',
          features: [
            { name: 'Rebar Detailing', icon: Grid },
            { name: 'Bar Bending Schedules', icon: PenTool },
            { name: 'Placement Drawings', icon: FileText },
            { name: 'Material Estimates', icon: BookOpen },
          ]
        },
        {
          id: '03',
          title: 'Structural Analysis',
          icon: Grid,
          image: 'https://res.cloudinary.com/defqgygsf/image/upload/v1790430154/327_maakri.png',
          heading: 'STRUCTURAL ANALYSIS',
          desc: 'Advanced load calculations and structural stability analysis.',
          features: [
            { name: 'Load Calculations', icon: LayoutTemplate },
            { name: 'Stress Analysis', icon: Grid },
            { name: 'Code Compliance', icon: Package },
            { name: 'Optimization Reports', icon: FileText },
          ]
        }
      ],
      meta: {
        '01': { type: 'DETAILING', ref: 'STR-01', status: 'READY', rev: '01', shortTitle: 'STEEL' },
        '02': { type: 'REINFORCEMENT', ref: 'STR-02', status: 'READY', rev: '02', shortTitle: 'REBAR' },
        '03': { type: 'ANALYSIS', ref: 'STR-03', status: 'READY', rev: '03', shortTitle: 'ANALYSIS' }
      }
    },
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
    projects: [
      {
        id: '01',
        category: 'Commercial High-Rise',
        title: 'Apex Corporate Center',
        scope: 'Complete structural steel detailing and connection design for a 45-story commercial tower.',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
        tags: ['High-Rise', 'Steel Detailing', 'Complex Connections'],
        deliverables: [
          'Erection Drawings',
          'Fabrication Details',
          'Advanced BOM'
        ]
      }
    ],
    cta: {
      title: "READY TO FORTIFY YOUR NEXT PROJECT?",
      desc: "Partner with us for precision structural engineering and detailing."
    }
  },

  "miscellaneous-steel-detailing": {
    hero: {
      category: "STEEL DETAILING",
      title1: "MISCELLANEOUS",
      title2: "STEEL DETAILING",
      description: "Specialized detailing for miscellaneous steel structures including stairs, handrails, platforms, and custom architectural elements. Precision shop drawings for flawless fabrication.",
      image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
    },
    overview: {
      description: "Miscellaneous steel elements require meticulous attention to detail to ensure perfect fit-up and aesthetic appeal. We specialize in creating accurate fabrication drawings for complex non-structural steel elements.",
      features: [
        { icon: Target, title: 'Flawless Fit-Up', subtitle: 'Zero Rework' },
        { icon: Clock, title: 'Rapid Turnaround', subtitle: 'On-time Delivery' },
        { icon: LayoutTemplate, title: 'Custom Designs', subtitle: 'Architectural Match' }
      ]
    },
    capabilities: {
      description: "From intricate ornamental staircases to industrial access platforms, we deliver shop-ready documentation for all your miscellaneous steel needs.",
      services: [
        {
          id: '01',
          title: 'Stairs & Handrails',
          icon: LayoutTemplate,
          image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
          heading: 'STAIRS & HANDRAILS',
          desc: 'Precise detailing for egress stairs, monumental staircases, and custom handrail systems.',
          features: [
            { name: 'Stair Stringer Details', icon: FileText },
            { name: 'Handrail Elevations', icon: Layers },
            { name: 'Tread & Riser Specs', icon: LayoutTemplate },
            { name: 'Connection Details', icon: Archive },
          ]
        },
        {
          id: '02',
          title: 'Platforms & Ladders',
          icon: Hammer,
          image: 'https://images.unsplash.com/photo-1541888086425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80',
          heading: 'PLATFORMS & LADDERS',
          desc: 'OSHA compliant detailing for industrial access platforms, catwalks, and caged ladders.',
          features: [
            { name: 'Platform Layouts', icon: Grid },
            { name: 'Grating Details', icon: PenTool },
            { name: 'Ladder Elevations', icon: FileText },
            { name: 'Safety Compliance', icon: ShieldCheck },
          ]
        }
      ],
      meta: {
        '01': { type: 'DETAILING', ref: 'MISC-01', status: 'READY', rev: '01', shortTitle: 'STAIRS' },
        '02': { type: 'DETAILING', ref: 'MISC-02', status: 'READY', rev: '02', shortTitle: 'PLATFORMS' }
      }
    },
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
    projects: [
      {
        id: '01',
        category: 'Industrial Facility',
        title: 'Nexus Processing Plant',
        scope: 'Detailing of over 50 custom access platforms, catwalks, and caged ladders for a large industrial plant.',
        image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80',
        tags: ['Industrial', 'Platforms', 'OSHA'],
        deliverables: [
          'Platform Shop Drawings',
          'Ladder Details',
          'Grating BOM'
        ]
      }
    ],
    cta: {
      title: "NEED PRECISE SHOP DRAWINGS?",
      desc: "Get flawless miscellaneous steel detailing for your fabrication shop."
    }
  },

  "bom-material-documentation": {
    hero: {
      category: "DOCUMENTATION",
      title1: "BOM & MATERIAL",
      title2: "DOCUMENTATION",
      description: "Accurate Bill of Materials (BOM) extraction and comprehensive material documentation to streamline procurement, eliminate waste, and keep projects on budget.",
      image: "https://images.unsplash.com/photo-1586227740560-8cf2732c1531?auto=format&fit=crop&w=1200&q=80",
    },
    overview: {
      description: "Accurate material quantification is critical for project success. We leverage intelligent 3D models to extract precise Bill of Materials, ensuring efficient procurement and minimal material wastage.",
      features: [
        { icon: Database, title: 'Accurate Quantification', subtitle: 'Zero Guesswork' },
        { icon: CheckCircle, title: 'Waste Reduction', subtitle: 'Optimized Ordering' },
        { icon: Send, title: 'Procurement Ready', subtitle: 'Direct to Vendor' }
      ]
    },
    capabilities: {
      description: "From structural steel tonnages to finishing material takeoffs, we provide data-rich documentation that empowers your procurement team.",
      services: [
        {
          id: '01',
          title: 'Advanced BOM Extraction',
          icon: Database,
          image: 'https://images.unsplash.com/photo-1586227740560-8cf2732c1531?auto=format&fit=crop&w=1200&q=80',
          heading: 'BOM EXTRACTION',
          desc: 'Automated and highly accurate Bill of Materials extracted directly from coordinated 3D models.',
          features: [
            { name: 'Steel Tonnage Reports', icon: FileText },
            { name: 'Hardware Summaries', icon: Layers },
            { name: 'Part Lists', icon: LayoutTemplate },
            { name: 'Assembly Data', icon: Archive },
          ]
        },
        {
          id: '02',
          title: 'Material Takeoffs',
          icon: Ruler,
          image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
          heading: 'MATERIAL TAKEOFFS',
          desc: 'Detailed quantification of construction materials for accurate bidding and ordering.',
          features: [
            { name: 'Concrete Volumes', icon: Grid },
            { name: 'Rebar Weights', icon: PenTool },
            { name: 'Finishing Areas', icon: FileText },
            { name: 'Cost Estimation Support', icon: BookOpen },
          ]
        }
      ],
      meta: {
        '01': { type: 'DATA', ref: 'BOM-01', status: 'READY', rev: '01', shortTitle: 'BOM' },
        '02': { type: 'DATA', ref: 'BOM-02', status: 'READY', rev: '02', shortTitle: 'TAKEOFFS' }
      }
    },
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
    projects: [
      {
        id: '01',
        category: 'Large-Scale Infrastructure',
        title: 'City Center Transit Hub',
        scope: 'Comprehensive material takeoffs and BOM generation for a complex transit hub project, saving the client 15% in material waste.',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
        tags: ['Infrastructure', 'Takeoffs', 'Cost Savings'],
        deliverables: [
          'Detailed Steel BOM',
          'Concrete Volume Reports',
          'Fastener Summaries'
        ]
      }
    ],
    cta: {
      title: "STOP GUESSING YOUR QUANTITIES.",
      desc: "Leverage our accurate BOM services for optimized procurement."
    }
  }
};
