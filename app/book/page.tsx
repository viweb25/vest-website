"use client";

import React, { useState, useEffect } from "react";
import BookSessionSidebar from "./BookSessionSidebar";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import {
  Monitor, Settings, Zap, Cpu, Server, PlaySquare, Battery, Command,
  HelpCircle, AlertTriangle, Clock, Hammer, User, Briefcase, Phone,
  Mail, MapPin, Building, CheckSquare, ChevronRight, ChevronLeft,
  UploadCloud, CheckCircle2, Rocket, Car, Radio, Shield, Factory, HeartPulse, Check, ChevronDown,
  Code, TrendingUp, Video, Copy
} from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { useAuth } from "@/providers/AuthProvider";
import { LoginModal } from "@/components/site/LoginModal";
import api from "@/lib/api";

type FormData = {
  primaryService: string;
  industry: string;
  customIndustry: string;
  solution: string;
  customSolution: string;
  subCategories: string[];
  projectType: string;
  quantity: number;
  supportType: string;
  customSupportType: string;
  developerLevel: string;
  developerCount: number;
  developerLevels: string[];
  developerCounts: Record<string, number>;

  applicationDescription: string;
  equipmentName: string;
  modelNumber: string;
  customModelNumber: string;
  interfaces: string[];
  customInterface: string;
  preferredSoftware: string;
  customSoftware: string;
  targetTimeline: string;
  customTimeline: string;
  projectPriority: string;

  plcPlatform: string;
  customPlcPlatform: string;
  plcSoftwareVersion: string;
  plcIoCount: string;
  plcProjectStatus: string;
  customPlcProjectStatus: string;

  name: string;
  companyName: string;
  designation: string;
  phone: string;
  email: string;
  city: string;
  country: string;
  contactMethod: string;
  bestTimeToContact: string;
  phoneCountryCode: string;
};

const INITIAL_DATA: FormData = {
  primaryService: "",
  industry: "", customIndustry: "", solution: "", customSolution: "", subCategories: [], projectType: "", quantity: 1,
  applicationDescription: "", equipmentName: "", modelNumber: "", customModelNumber: "", interfaces: [], customInterface: "", preferredSoftware: "", customSoftware: "", targetTimeline: "", customTimeline: "", projectPriority: "",
  plcPlatform: "Not sure", customPlcPlatform: "", plcSoftwareVersion: "", plcIoCount: "", plcProjectStatus: "", customPlcProjectStatus: "",
  name: "", companyName: "", designation: "", phone: "", email: "", city: "", country: "", contactMethod: "", bestTimeToContact: "", phoneCountryCode: "+91", supportType: "Remote support", customSupportType: "", developerLevel: "Not sure — recommend someone", developerCount: 1, developerLevels: ["Not sure — recommend someone"], developerCounts: {}
};

const PRIMARY_SERVICES = [
  {
    title: "LabVIEW Engineering",
    description: "Custom test systems, DAQ, and instrument control solutions.",
    icon: <Code className="w-5 h-5" />,
  },
  {
    title: "PLC Programming & Industrial Automation",
    description: "Reliable machine control, HMI, and factory floor integration.",
    icon: <Cpu className="w-5 h-5" />,
  },
  {
    title: "Intelligent Automation with LabVIEW + AI",
    description: "Next-gen test systems powered by machine learning and AI.",
    icon: <TrendingUp className="w-5 h-5" />,
  },
];

const INDUSTRIES = [
  { id: "Aerospace", icon: <Rocket className="w-6 h-6" /> },
  { id: "Defense", icon: <Shield className="w-6 h-6" /> },
  { id: "Automotive", icon: <Car className="w-6 h-6" /> },
  { id: "Industrial Automation", icon: <Factory className="w-6 h-6" /> },
  { id: "Energy & Power", icon: <Zap className="w-6 h-6" /> },
  { id: "Electronics", icon: <Monitor className="w-6 h-6" /> },
  { id: "Semiconductor", icon: <Cpu className="w-6 h-6" /> },
  { id: "Telecom", icon: <Radio className="w-6 h-6" /> },
  { id: "Medical & Healthcare", icon: <HeartPulse className="w-6 h-6" /> },
  { id: "Other Industry", icon: <Building className="w-6 h-6" /> },
];

const SOLUTIONS = [
  "LabVIEW Development",
  "Industrial Automation",
  "Troubleshooting & Debugging",
  "Framework Integration",
  "NI Hardware & Instrumentation",
  "Communication & Connectivity",
  "Database & Data Management",
  "AI, IoT & Industry 4.0",
  "Application Build & Deployment",
  "Developer & Technical Support",
  "Training & Consultation",
  "Other Requirements"
];

const SOLUTION_SUBCATEGORIES: Record<string, string[]> = {
  "LabVIEW Development": [
    "New LabVIEW application development",
    "Custom software development",
    "HMI / GUI development",
    "Test panel development",
    "DAQ application",
    "Real-time monitoring application",
    "Automatic and manual mode development",
    "Application modification and enhancement",
  ],
  "Industrial Automation": [
    "Industrial automation solutions",
    "PLC and LabVIEW integration",
    "Machine automation",
    "Production line monitoring",
    "End-of-line (EOL) testing",
    "Automated test systems",
    "Process control and monitoring",
    "Smart factory solutions",
  ],
  "Troubleshooting & Debugging": [
    "LabVIEW error debugging",
    "Existing VI not working",
    "Broken Run arrow / broken VI",
    "Hardware communication errors",
    "Application performance issues",
    "Data not updating correctly",
    "Build / EXE / installer errors",
    "Existing project maintenance",
  ],
  "Framework Integration": [
    "Integrate project with existing framework",
    "DAQ framework integration",
    "Producer–Consumer architecture",
    "Integrate existing SubVIs",
    "Auto / Manual mode integration",
    "Existing screen / HMI integration",
    "Code cleanup and refactoring",
    "Large project understanding and support",
  ],
  "NI Hardware & Instrumentation": [
    "NI DAQ hardware integration",
    "NI CompactDAQ / CompactRIO",
    "Sensor and measurement integration",
    "NI hardware installation and configuration",
    "Hardware driver setup",
    "Signal acquisition and analysis",
    "Calibration and validation",
    "Hardware communication troubleshooting",
  ],
  "Communication & Connectivity": [
    "Modbus TCP / RTU",
    "Serial communication (RS-232 / RS-485)",
    "CAN / CAN bus communication",
    "TCP/IP communication",
    "PLC communication",
    "Third-party device integration",
    "Instrument communication",
    "Protocol debugging",
  ],
  "Database & Data Management": [
    "MySQL database integration",
    "Microsoft SQL Server integration",
    "MongoDB / NoSQL integration",
    "Automatic data logging",
    "Manual data entry and storage",
    "Historical data retrieval",
    "Live database updates",
    "Reports, CSV and Excel export",
  ],
  "AI, IoT & Industry 4.0": [
    "AI / ML model integration",
    "Cloud IoT connectivity (AWS / Azure)",
    "MQTT protocol integration",
    "Predictive maintenance solutions",
    "Edge computing / gateway solutions",
    "Smart sensor & IIoT integration",
    "Real-time analytics & dashboards",
    "Computer vision & AI inspection",
  ],
  "Application Build & Deployment": [
    "Executable (EXE) build creation",
    "Standalone installer packaging",
    "LabVIEW Runtime engine setup",
    "Version upgrade and migration",
    "Application distribution & licensing",
    "Multi-PC deployment support",
    "DLL & shared library creation",
    "Automated build & release support",
  ],
  "Developer & Technical Support": [
    "Senior LabVIEW developer support",
    "Junior LabVIEW developer support",
    "One-to-one technical guidance",
    "Remote debugging support",
    "Code review and optimization",
    "Existing project handover support",
    "Framework learning assistance",
    "Long-term application maintenance",
  ],
  "Training & Consultation": [
    "Beginner LabVIEW training",
    "Advanced LabVIEW training",
    "DAQ and hardware training",
    "Architecture and framework training",
    "Project development guidance",
    "Team training",
    "Technical consultation",
    "Project feasibility discussion",
  ],
  "Other Requirements": [
    "Requirement analysis",
    "Project design and architecture",
    "Proof of concept (PoC)",
    "Legacy application upgrade",
    "Technical documentation",
    "On-site engineering support",
    "Remote support",
    "Not sure / custom",
  ],
};

const PLC_SOLUTIONS = [
  "PLC Development",
  "HMI Development",
  "SCADA Development",
  "Industrial Automation",
  "Troubleshooting & Debugging",
  "Communication & Connectivity",
  "Developer & Technical Support",
  "Other Requirements"
];

const PLC_SOLUTION_SUBCATEGORIES: Record<string, string[]> = {
  "PLC Development": [
    "New PLC program development",
    "PLC logic modification and enhancement",
    "Ladder / FBD / ST / SCL programming",
    "Sequence and state machine design",
    "Auto and manual mode development",
    "PID and process control loops",
    "Motion, servo and VFD control",
    "Recipe and batch management",
    "Safety PLC programming",
  ],
  "HMI Development": [
    "New HMI screen development",
    "Existing HMI modification",
    "Alarm and event screens",
    "Trend and data log screens",
    "User login and access levels",
    "Recipe and parameter screens",
    "Multi-language HMI",
    "HMI-to-PLC tag mapping",
    "HMI migration (old panel to new)",
  ],
  "SCADA Development": [
    "New SCADA application",
    "Plant overview and mimic screens",
    "Alarm management and history",
    "Historical trends and reports",
    "SCADA redundancy and server setup",
    "OPC UA / OPC DA configuration",
    "Remote SCADA and web clients",
    "Audit trail and user management",
    "SCADA migration and upgrade",
  ],
  "Industrial Automation": [
    "Industrial automation solutions",
    "Machine automation",
    "Production line monitoring",
    "Process control and monitoring",
    "Packaging and conveyor systems",
    "Water, utility and building automation",
    "End-of-line (EOL) testing",
    "Smart factory solutions",
    "Control panel design and wiring",
  ],
  "Troubleshooting & Debugging": [
    "PLC program not working",
    "PLC CPU fault or stop",
    "HMI or SCADA not connecting",
    "Tag or data not updating correctly",
    "Hardware communication errors",
    "I/O module or wiring faults",
    "Application performance issues",
    "Software install, repair or license errors",
    "Existing system maintenance",
  ],
  "Communication & Connectivity": [
    "PROFINET / PROFIBUS",
    "Modbus TCP / RTU",
    "EtherNet/IP",
    "OPC UA",
    "Serial communication (RS-232 / RS-485)",
    "MQTT / TCP/IP communication",
    "Third-party device integration",
    "PLC-to-PLC communication",
    "Protocol debugging",
  ],
  "Developer & Technical Support": [
    "Senior PLC / SCADA engineer support",
    "Junior engineer support",
    "One-to-one technical guidance",
    "Remote debugging support",
    "Code review and optimization",
    "Existing project handover support",
    "Documentation and drawings",
    "Long-term maintenance contract",
  ],
  "Other Requirements": [
    "Requirement analysis",
    "System design and architecture",
    "Proof of concept (PoC)",
    "Legacy system upgrade",
    "Technical documentation",
    "On-site engineering support",
    "Remote support",
    "Not sure / custom requirement",
  ],
};

const AI_SOLUTIONS = [
  "Intelligent Test Automation",
  "Predictive Maintenance",
  "AI Machine Vision",
  "Intelligent DAQ & Sensor Analytics",
  "AI + NI Hardware Integration",
  "Smart Factory Monitoring",
  "AI-Based Quality Inspection",
  "AI + PLC / Industrial Communication",
  "AI Analytics & Reporting",
  "Custom AI + LabVIEW Development"
];

const AI_SOLUTION_SUBCATEGORIES: Record<string, string[]> = {
  "Intelligent Test Automation": [
    "Automotive component testing",
    "Electrical / electronic testing",
    "End-of-line testing",
    "Custom test sequence",
    "Other requirement"
  ],
  "Predictive Maintenance": [
    "Motor / pump",
    "Machine / production line",
    "Vibration / temperature monitoring",
    "Custom equipment",
    "Other requirement"
  ],
  "AI Machine Vision": [
    "Surface defects",
    "Component presence / absence",
    "Dimensional inspection",
    "Custom vision inspection",
    "Other requirement"
  ],
  "Intelligent DAQ & Sensor Analytics": [
    "Voltage / current",
    "Temperature / pressure",
    "Vibration / force",
    "Multiple sensor channels",
    "Other requirement"
  ],
  "AI + NI Hardware Integration": [
    "NI DAQ / CompactDAQ",
    "CompactRIO",
    "Third-party instruments",
    "Not sure — need guidance",
    "Other requirement"
  ],
  "Smart Factory Monitoring": [
    "Production status",
    "Machine health",
    "Cycle time / downtime",
    "Multiple production lines",
    "Other requirement"
  ],
  "AI-Based Quality Inspection": [
    "Defective products",
    "Abnormal test readings",
    "Process variation",
    "Automatic pass / fail classification",
    "Other requirement"
  ],
  "AI + PLC / Industrial Communication": [
    "Modbus TCP / RTU",
    "PLC data monitoring",
    "CAN / TCP/IP communication",
    "Multiple industrial devices",
    "Other requirement"
  ],
  "AI Analytics & Reporting": [
    "Live dashboard",
    "Trend and statistical analysis",
    "Automatic test reports",
    "Historical data analysis",
    "Other requirement"
  ],
  "Custom AI + LabVIEW Development": [
    "Build a new application",
    "Modify an existing VI",
    "Integrate a Python AI model",
    "Troubleshoot an existing system",
    "Other requirement"
  ]
};

const PLC_PLATFORMS = [
  "Not sure",
  "Siemens (TIA Portal, S7-1200 / S7-1500 / S7-300 / WinCC)",
  "Rockwell / Allen-Bradley (Studio 5000, ControlLogix, CompactLogix)",
  "Schneider Electric (EcoStruxure, Modicon)",
  "Mitsubishi Electric (MELSEC, GX Works)",
  "Omron (Sysmac Studio, CX-Programmer)",
  "Delta (ISPSoft, DOPSoft)",
  "Beckhoff (TwinCAT)",
  "ABB (Automation Builder)",
  "Ignition SCADA",
  "Wonderware / AVEVA",
  "Other Platform"
];

const PLC_PROJECT_STATUSES = [
  "Idea / planning",
  "Requirement defined",
  "Development in progress",
  "Existing system with issues",
  "Ready for commissioning",
  "Running, needs maintenance",
  "Other"
];

const LABVIEW_PROJECT_STATUSES = [
  "Completed",
  "In Progress",
  "Pending",
  "Under Testing",
  "Not Started",
  "Integrated",
  "Partially Completed",
  "On Hold",
  "Under Development",
  "Successfully Tested",
  "Other"
];

const PROJECT_TYPES = [
  "New System", "Existing System Upgrade", "System Integration", "Replacement", "Modification", "Maintenance & Support", "Consultation"
];

const INTERFACES = [
  "Ethernet", "CAN", "LIN", "RS-232 / RS-485", "USB", "PXI", "GPIB", "Analog I/O", "Digital I/O", "RF", "Other"
];

const SOFTWARE_PLATFORMS = [
  "LabVIEW", "MATLAB / Simulink", "Python", "C / C++", ".NET", "Custom Software", "Other"
];

const TIMELINES = [
  "Immediate", "Within 1 Month", "1–3 Months", "3–6 Months", "6+ Months", "Planning / Evaluation", "Other"
];

const SUPPORT_TYPES = [
  "Remote support", "On-site support", "Full project development", "Long-term support", "Other"
];

export default function BookSessionPage() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>(INITIAL_DATA);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showAuthPopup, setShowAuthPopup] = useState(false);

  const { user, isAuthenticated } = useAuth();

  // Load user profile from frontend persistence when user is authenticated
  useEffect(() => {
    if (user) {
      const savedProfileStr = localStorage.getItem(`mock_profile_${user.id}`);
      if (savedProfileStr) {
        const savedProfile = JSON.parse(savedProfileStr);
        setData(prev => ({
          ...prev,
          name: savedProfile.name || prev.name,
          companyName: savedProfile.companyName || prev.companyName,
          phone: savedProfile.phone || prev.phone,
          email: user.email || prev.email,
          designation: savedProfile.designation || prev.designation,
          city: savedProfile.city || prev.city,
          country: savedProfile.country || prev.country,
          contactMethod: savedProfile.contactMethod || prev.contactMethod,
          bestTimeToContact: savedProfile.bestTimeToContact || prev.bestTimeToContact,
          phoneCountryCode: savedProfile.phoneCountryCode || prev.phoneCountryCode,
        }));
      } else {
        // First time user - just prepopulate email
        setData(prev => ({ ...prev, email: user.email }));
      }
    }
  }, [user]);

  const updateData = (fields: Partial<FormData>) => {
    setData(prev => ({ ...prev, ...fields }));
  };

  const nextStep = () => {
    if (step === 2 && !isAuthenticated) {
      setShowAuthPopup(true);
    } else if (step === 3 && isAuthenticated && user) {
      // Save profile data for future reuse
      const profileData = {
        name: data.name,
        companyName: data.companyName,
        phone: data.phone,
        designation: data.designation,
        city: data.city,
        country: data.country,
        contactMethod: data.contactMethod,
        bestTimeToContact: data.bestTimeToContact,
        phoneCountryCode: data.phoneCountryCode,
      };
      localStorage.setItem(`mock_profile_${user.id}`, JSON.stringify(profileData));
      setStep(4);
    } else {
      setStep(s => Math.min(s + 1, 4));
    }
  };

  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [meetingLink, setMeetingLink] = useState<string>("");
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const isPLC = data.primaryService === "PLC Programming & Industrial Automation";
      const isAI = data.primaryService === "Intelligent Automation with LabVIEW + AI";
      const finalPlcPlatform = data.plcPlatform === "Other Platform" ? (data.customPlcPlatform || "Other Platform") : (data.plcPlatform || "Not sure");
      const finalPlcStatus = data.plcProjectStatus === "Other" ? (data.customPlcProjectStatus || "Other") : (data.plcProjectStatus || "PLC Project");
      const finalLabviewStatus = data.modelNumber === "Other" ? (data.customModelNumber || "Other") : data.modelNumber;

      const payload = {
        name: data.name,
        clientName: data.name,
        companyName: data.companyName,
        designation: data.designation,
        city: data.city,
        country: data.country || 'India',
        email: data.email || (user ? user.email : ''),
        phoneCountryCode: data.phoneCountryCode || '+91',
        phoneNumber: data.phone,
        contactMethod: data.contactMethod || 'Phone Call',
        bestTimeToContact: data.bestTimeToContact || 'Anytime',

        primaryService: data.primaryService,
        industryDomain: data.industry,
        customIndustry: data.customIndustry,
        solution: data.solution,
        servicesRequired: [data.primaryService, data.solution, ...(data.subCategories || [])].filter(Boolean),
        subCategories: data.subCategories || [],
        customSolution: data.customSolution,
        projectType: isAI ? 'AI Automation' : (data.projectType || 'Standard'),
        quantity: data.developerCount || data.quantity || 1,

        applicationDescription: isPLC && data.plcIoCount ? `${data.applicationDescription}\nApprox I/O Count: ${data.plcIoCount}` : data.applicationDescription,
        equipmentSystemName: isAI ? 'Intelligent Automation AI System' : (isPLC ? finalPlcPlatform : data.equipmentName),
        modelPartNumber: isAI ? 'AI + LabVIEW' : (isPLC ? finalPlcStatus : finalLabviewStatus),
        requiredInterfaces: data.interfaces,
        customInterface: data.customInterface,
        preferredSoftwarePlatform: [isAI ? 'LabVIEW + AI' : (isPLC ? (data.plcSoftwareVersion || finalPlcPlatform || 'PLC') : data.preferredSoftware)],
        customSoftware: isAI
          ? `Intelligent Automation: ${data.solution}${data.subCategories?.length ? ` [${data.subCategories.join(', ')}]` : ''}${data.developerLevel ? ` | Dev Level: ${data.developerLevel}` : ''}`
          : (isPLC
            ? `PLC Platform: ${finalPlcPlatform}, Version: ${data.plcSoftwareVersion || 'Not sure'}, I/O: ${data.plcIoCount || 'N/A'}${data.developerLevel ? ` | Dev Level: ${data.developerLevel}` : ''}`
            : (data.developerLevel ? `Developer Level: ${data.developerLevel}${data.developerLevel !== "Not sure — recommend someone" ? ` (${data.developerCount || 1} ${data.developerLevel === 'Team of developers' ? 'members' : ((data.developerCount || 1) > 1 ? 'developers' : 'developer')})` : ''}` : data.customSoftware)),
        targetTimeline: isAI ? (data.targetTimeline || 'Immediate') : (data.targetTimeline === 'Other' ? (data.customTimeline || 'Other') : data.targetTimeline),
        projectPriority: isAI ? 'Standard' : (isPLC ? 'Standard' : (data.projectPriority || 'Standard')),
        supportType: data.supportType || 'Remote support',

        developerLevel: data.developerLevel,
        developerCount: data.developerCount || 1,
        developerLevels: data.developerLevels || [],

        plcPlatform: finalPlcPlatform,
        plcSoftwareVersion: data.plcSoftwareVersion,
        plcIoCount: data.plcIoCount,
        plcProjectStatus: finalPlcStatus,
      };

      const res = await api.post('/requirements', payload);

      if (res.data.success) {
        const link = res.data.data?.meetingLink || res.data.data?.requirement?.meetingLink || 'https://meet.google.com/qmv-vzxb-wkp';
        setMeetingLink(link);
        setIsSubmitted(true);
      } else {
        alert(res.data.message || 'Failed to submit requirement');
      }
    } catch (error: any) {
      console.error(error);
      alert(error.response?.data?.message || 'An error occurred while submitting.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="font-sans min-h-screen flex flex-col bg-zinc-50">
        <Navbar />
        <main className="flex-1 max-w-[1400px] mx-auto px-5 sm:px-8 pt-32 pb-24 w-full">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-24">
            <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
              <BookSessionSidebar />
            </div>
            <div className="lg:col-span-8 flex flex-col items-center justify-center py-16 text-center bg-white rounded-3xl border border-zinc-200 shadow-sm p-6 sm:p-12">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold mb-3 border border-emerald-200">
                <span>Meeting Link Generated</span>
              </div>
              <h2 className="text-3xl font-black text-[#0B2540] mb-3">Booking Confirmed &amp; Meeting Scheduled!</h2>
              <p className="text-slate-600 mb-8 max-w-lg text-sm leading-relaxed">
                Thank you, <strong>{data.name || 'Valued Client'}</strong>! Your engineering requirement for <strong>{data.primaryService || data.solution}</strong> has been received. A confirmation email with the meeting link has been sent to <strong>{data.email}</strong>, and our engineering team has been notified.
              </p>

              {/* Google Meet Box */}
              <div className="w-full max-w-xl bg-gradient-to-br from-[#F0F8FD] to-[#E8F3FA] border-2 border-[#1D79C5] rounded-2xl p-6 mb-8 text-center shadow-sm">
                <div className="flex items-center justify-center gap-2 text-[#1D79C5] font-bold text-xs uppercase tracking-wider mb-2">
                  <Video className="w-4 h-4" /> Google Meet Consultation Room
                </div>
                <div className="text-base sm:text-lg font-black text-[#0B2540] mb-4 break-all">
                  {meetingLink}
                </div>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <a
                    href={meetingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1D79C5] text-white text-sm font-bold shadow hover:bg-[#15609e] transition-all"
                  >
                    <Video className="w-4 h-4" /> Join Google Meet
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(meetingLink);
                      setCopiedLink(true);
                      setTimeout(() => setCopiedLink(false), 3000);
                    }}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white border border-zinc-200 text-[#0B2540] text-sm font-bold hover:bg-zinc-50 transition-all"
                  >
                    <Copy className="w-4 h-4" /> {copiedLink ? "Link Copied!" : "Copy Link"}
                  </button>
                </div>
                <p className="text-xs text-slate-500 mt-4">
                  Preferred Contact: <strong>{data.contactMethod || 'Phone Call'}</strong> &middot; Time: <strong>{data.bestTimeToContact || 'Anytime'}</strong>
                </p>
              </div>

              <button 
                onClick={() => { 
                  setIsSubmitted(false); 
                  setStep(1); 
                  setData(INITIAL_DATA); 
                  setMeetingLink(""); 
                }} 
                className="px-8 py-3 rounded-full bg-[#0B2540] text-white font-bold hover:bg-slate-800 transition-colors text-sm"
              >
                Submit Another Request
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="font-sans min-h-screen flex flex-col bg-zinc-50">
      <Navbar />

      {/* Authentication Modal - Only shown between Step 2 and 3 if unauthenticated */}
      <LoginModal
        open={showAuthPopup}
        onOpenChange={setShowAuthPopup}
        onSuccess={() => {
          setShowAuthPopup(false);
          setStep(3);
        }}
      />

      <main className="flex-1 max-w-[1400px] mx-auto px-5 sm:px-8 pt-32 pb-24 w-full">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-24">
          {/* Sidebar */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
            <BookSessionSidebar />
          </div>

          {/* Main Form Area */}
          <div className="lg:col-span-8">
            {/* Progress Stepper */}
            <div className="flex items-center justify-between mb-10 relative">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-zinc-200 -z-10" />
              {[
                { num: 1, label: "Requirement" },
                { num: 2, label: "Technical Details" },
                { num: 3, label: "Your Info" },
                { num: 4, label: "Review" }
              ].map((s, i) => (
                <div key={i} className="flex items-center bg-zinc-50 px-2 cursor-pointer" onClick={() => step > s.num && setStep(s.num)}>
                  <div className={`flex items-center gap-2 transition-colors ${step >= s.num ? "text-[#1D79C5]" : "text-zinc-400"}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${step >= s.num ? "bg-[#1D79C5] text-white shadow-md" : "bg-zinc-200 text-zinc-500"}`}>
                      {step > s.num ? <CheckCircle2 className="w-4 h-4" /> : s.num}
                    </div>
                    <span className={`font-bold text-sm hidden sm:block ${step >= s.num ? "text-[#0B2540]" : "text-zinc-400"}`}>{s.label}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Form Card */}
            <div className="bg-white rounded-3xl border border-zinc-200 shadow-[0_8px_30px_rgba(0,0,0,0.04)] overflow-hidden">
              <div className="p-8 md:p-10 border-b border-zinc-100 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black text-[#0B2540]">
                    {step === 1 && "Tell Us About Your Requirement"}
                    {step === 2 && "Technical Requirements"}
                    {step === 3 && "Your Contact Information"}
                    {step === 4 && "Review & Submit"}
                  </h2>
                  <p className="text-slate-500 text-sm mt-1">
                    {step === 1 && "Select the industry and solution you are looking for"}
                    {step === 2 && "Help our engineers understand your application"}
                    {step === 3 && "We'll reach out within 2–4 business hours"}
                    {step === 4 && "Confirm your requirement and submit your enquiry"}
                  </p>
                </div>
                <div className="text-sm font-bold text-zinc-400 hidden sm:block">Step {step} of 4</div>
              </div>

              <div className="p-8 md:p-10">
                {step === 1 && <Step1 data={data} updateData={updateData} onNext={nextStep} />}
                {step === 2 && <Step2 data={data} updateData={updateData} onNext={nextStep} onPrev={prevStep} />}
                {step === 3 && <Step3 data={data} updateData={updateData} onNext={nextStep} onPrev={prevStep} />}
                {step === 4 && <Step4 data={data} setStep={setStep} onSubmit={handleSubmit} onPrev={prevStep} isSubmitting={isSubmitting} />}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

// -------------------------------------------------------------
// STEP COMPONENTS
// -------------------------------------------------------------

function Step1({ data, updateData, onNext }: any) {
  const isPLC = data.primaryService === "PLC Programming & Industrial Automation";
  const isAI = data.primaryService === "Intelligent Automation with LabVIEW + AI";
  const currentSolutions = isPLC ? PLC_SOLUTIONS : (isAI ? AI_SOLUTIONS : SOLUTIONS);
  const currentSubcategories = isPLC ? PLC_SOLUTION_SUBCATEGORIES : (isAI ? AI_SOLUTION_SUBCATEGORIES : SOLUTION_SUBCATEGORIES);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <label className="block text-sm font-bold text-[#0B2540] mb-3">Service Category <span className="text-red-500">*</span></label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mb-2">
          {PRIMARY_SERVICES.map((s) => {
            const isSelected = data.primaryService === s.title;
            return (
              <div
                key={s.title}
                onClick={() => {
                  if (data.primaryService !== s.title) {
                    updateData({
                      primaryService: s.title,
                      solution: "",
                      subCategories: [],
                      customSolution: "",
                      plcPlatform: s.title === "PLC Programming & Industrial Automation" ? (data.plcPlatform || "Not sure") : data.plcPlatform
                    });
                  }
                }}
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                  isSelected
                    ? "border-[#1D79C5] bg-[#F0F8FD] text-[#0B2540] shadow-sm ring-1 ring-[#1D79C5]/30"
                    : "border-zinc-200 bg-white hover:border-zinc-300 hover:bg-zinc-50/50"
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-all ${
                    isSelected ? "bg-[#1D79C5] text-white border-[#1D79C5]" : "bg-zinc-100 text-[#0B2540] border-zinc-200"
                  }`}>
                    {s.icon}
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-1 transition-all ${
                      isSelected
                        ? "border-2 border-[#1D79C5]"
                        : "border-2 border-zinc-300 bg-white"
                    }`}
                  >
                    {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-[#1D79C5]" />}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#0B2540] mb-1 leading-snug">{s.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{s.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {!data.primaryService ? (
        <div className="p-8 rounded-2xl border-2 border-dashed border-zinc-200 bg-[#F8FAFC] text-center animate-in fade-in">
          <div className="w-12 h-12 rounded-full bg-[#E8F3FA] text-[#1D79C5] flex items-center justify-center mx-auto mb-3">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h4 className="text-sm font-bold text-[#0B2540] mb-1">Please Select a Service Category Above</h4>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Choose <strong>LabVIEW Engineering</strong>, <strong>PLC Programming & Industrial Automation</strong>, or <strong>Intelligent Automation</strong> to proceed with requirements.
          </p>
        </div>
      ) : (
        <>
          <div>
            <label className="block text-sm font-bold text-[#0B2540] mb-4">Industry / Domain <span className="text-red-500">*</span></label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-3">
              {INDUSTRIES.map(ind => (
                <button
                  key={ind.id}
                  onClick={() => updateData({ industry: ind.id, customIndustry: ind.id !== "Other Industry" ? "" : data.customIndustry })}
                  className={`flex flex-col items-center justify-center gap-3 p-4 rounded-xl border transition-all ${data.industry === ind.id
                    ? "border-[#1D79C5] bg-[#E8F3FA] text-[#1D79C5] shadow-sm"
                    : "border-zinc-200 bg-white text-slate-600 hover:border-zinc-300 hover:bg-zinc-50"
                    }`}
                >
                  {ind.icon}
                  <span className="text-xs font-bold text-center leading-tight">{ind.id}</span>
                </button>
              ))}
            </div>
            {data.industry === "Other Industry" && (
              <input
                type="text"
                placeholder="Please specify your industry"
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-[#1D79C5] focus:border-transparent transition-all text-sm animate-in fade-in"
                value={data.customIndustry}
                onChange={(e) => updateData({ customIndustry: e.target.value })}
                autoFocus
              />
            )}
          </div>

          <div>
            <label className="block text-sm font-bold text-[#0B2540] mb-4">Solution / Service Required<span className="text-red-500">*</span></label>
            <div className="flex flex-wrap gap-2 mb-3">
              {currentSolutions.map(s => (
                <button
                  key={s}
                  type="button"
                  onClick={() => {
                    if (data.solution !== s) {
                      updateData({
                        solution: s,
                        subCategories: [],
                        customSolution: (s !== "Other Requirements" && s !== "Other") ? "" : data.customSolution,
                      });
                    }
                  }}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${data.solution === s
                    ? "bg-[#1D79C5] border-[#1D79C5] text-white shadow-sm"
                    : "bg-white border-zinc-200 text-slate-600 hover:border-zinc-300"
                    }`}
                >
                  {s}
                </button>
              ))}
            </div>
            {/* Dynamic Subcategories - only opens for the clicked category */}
            {data.solution && currentSubcategories[data.solution] && (
              <div className="mb-4 p-5 rounded-2xl border border-zinc-200 bg-[#F8FAFC] shadow-sm animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="flex items-center justify-between mb-3 border-b border-zinc-200/80 pb-2.5">
                  <h4 className="text-sm font-bold text-[#0B2540] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#1D79C5]"></span>
                    {data.solution}
                  </h4>
                  <span className="text-[11px] text-slate-500 font-medium">Select required services (multiple selection)</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {currentSubcategories[data.solution].map((sub: string) => {
                    const isChecked = (data.subCategories || []).includes(sub);
                    return (
                      <button
                        key={sub}
                        type="button"
                        onClick={() => {
                          const current: string[] = data.subCategories || [];
                          const next = current.includes(sub)
                            ? current.filter((item: string) => item !== sub)
                            : [...current, sub];
                          updateData({ subCategories: next });
                        }}
                        className={`flex items-start gap-3 p-3 rounded-xl border text-left transition-all ${isChecked
                            ? "border-[#1D79C5] bg-white text-[#0B2540] shadow-xs ring-1 ring-[#1D79C5]/30"
                            : "border-zinc-200/80 bg-white hover:border-zinc-300 text-slate-700 hover:bg-zinc-50"
                          }`}
                      >
                        <div
                          className={`w-4 h-4 mt-0.5 rounded flex items-center justify-center shrink-0 transition-all ${isChecked
                              ? "bg-[#1D79C5] text-white border border-[#1D79C5]"
                              : "border border-zinc-300 bg-white"
                            }`}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <span className="text-xs font-semibold leading-snug">{sub}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Custom/Other Requirements input */}
                {(data.solution === "Other Requirements" || (data.subCategories || []).includes("Not sure / custom") || (data.subCategories || []).includes("Not sure / custom requirement") || (data.subCategories || []).includes("Other requirement")) && (
                  <div className="mt-4 pt-3 border-t border-zinc-200/80">
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                      Specify additional requirement details:
                    </label>
                    <input
                      type="text"
                      placeholder="Please specify additional requirement details"
                      className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#1D79C5] focus:border-transparent transition-all text-xs"
                      value={data.customSolution}
                      onChange={(e) => updateData({ customSolution: e.target.value })}
                      autoFocus
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          {!isAI && (
            <div>
              <label className="block text-sm font-bold text-[#0B2540] mb-4">Project Type <span className="text-red-500">*</span></label>
              <div className="flex flex-wrap gap-2">
                {PROJECT_TYPES.map(p => (
                  <button
                    key={p}
                    onClick={() => updateData({ projectType: p })}
                    className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${data.projectType === p
                      ? "bg-[#0B2540] border-[#0B2540] text-white shadow-sm"
                      : "bg-white border-zinc-200 text-slate-600 hover:border-zinc-300"
                      }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      <div>
        {/* Quantity / Number of Systems removed */}
        <div className="hidden">
          <button onClick={() => updateData({ quantity: Math.max(1, data.quantity - 1) })} className="w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-500 hover:bg-zinc-50 transition-colors">-</button>
          <span className="font-bold w-4 text-center">{data.quantity}</span>
          <button onClick={() => updateData({ quantity: data.quantity + 1 })} className="w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-500 hover:bg-zinc-50 transition-colors">+</button>
        </div>
      </div>

      <div className="pt-6 border-t border-zinc-100 flex justify-end">
        <button
          onClick={onNext}
          disabled={!data.primaryService || !data.industry || (data.industry === "Other Industry" && !data.customIndustry) || !data.solution || ((data.solution === "Other Requirements" || data.solution === "Other") && !data.customSolution && (!data.subCategories || data.subCategories.length === 0)) || (!isAI && !data.projectType)}
          className="px-8 py-3.5 rounded-none border border-[#1D79C5] bg-[#1D79C5] text-white font-bold uppercase tracking-wider text-xs shadow-md hover:bg-[#15609e] transition-colors hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50 disabled:pointer-events-none flex items-center gap-2"
        >
          Technical Details <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function getDeveloperSummary(levels: string[], counts: Record<string, number>) {
  const formatted = levels.map((lvl: string) => {
    if (lvl === "Not sure — recommend someone") return lvl;
    const c = counts[lvl] || (lvl === "Team of developers" ? 2 : 1);
    const u = lvl === "Team of developers" ? "members" : (c > 1 ? "developers" : "developer");
    return `${lvl} (${c} ${u})`;
  }).join(", ");

  const total = levels.reduce((acc: number, lvl: string) => {
    if (lvl === "Not sure — recommend someone") return acc + 1;
    return acc + (counts[lvl] || (lvl === "Team of developers" ? 2 : 1));
  }, 0) || 1;

  return { formatted, total };
}

function Step2({ data, updateData, onNext, onPrev }: any) {
  const isPLC = data.primaryService === "PLC Programming & Industrial Automation";
  const isAI = data.primaryService === "Intelligent Automation with LabVIEW + AI";

  const updateCounts = (level: string, newCount: number) => {
    const currentCounts = data.developerCounts || {};
    const newCounts: Record<string, number> = {
      ...currentCounts,
      [level]: newCount
    };
    const currentLevels: string[] = data.developerLevels || [];
    const { formatted, total } = getDeveloperSummary(currentLevels, newCounts);
    updateData({ developerCounts: newCounts, developerLevel: formatted, developerCount: total });
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <label className="block text-sm font-bold text-[#0B2540] mb-2">Application / Requirement Description <span className="text-red-500">*</span></label>
        <textarea
          rows={4}
          placeholder={isAI ? "Describe your AI automation, testing requirement, vision system, or technical challenge." : (isPLC ? "Describe your PLC / automation requirement, machine, process, or technical challenge." : "Describe your application, testing requirement, equipment, process, or technical challenge.")}
          className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-[#1D79C5] focus:border-transparent transition-all text-sm resize-none"
          value={data.applicationDescription}
          onChange={(e) => updateData({ applicationDescription: e.target.value })}
        />
        <p className="text-xs text-slate-500 mt-2">The more detail you provide, the better we can recommend the right solution.</p>
      </div>

      {!isAI && (
        isPLC ? (
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-[#0B2540] mb-2">
                PLC / HMI / SCADA platform <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#1D79C5] focus:border-transparent transition-all text-sm appearance-none cursor-pointer text-slate-700 font-medium"
                  value={data.plcPlatform || "Not sure"}
                  onChange={(e) => updateData({
                    plcPlatform: e.target.value,
                    customPlcPlatform: e.target.value !== "Other Platform" ? "" : data.customPlcPlatform
                  })}
                >
                  {PLC_PLATFORMS.map(p => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-slate-400">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
              {data.plcPlatform === "Other Platform" && (
                <input
                  type="text"
                  placeholder="Please specify your PLC / HMI / SCADA platform"
                  className="w-full mt-2.5 px-4 py-2.5 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-[#1D79C5] focus:border-transparent transition-all text-sm animate-in fade-in"
                  value={data.customPlcPlatform}
                  onChange={(e) => updateData({ customPlcPlatform: e.target.value })}
                  autoFocus
                />
              )}
            </div>

            <div>
              <label className="block text-sm font-bold text-[#0B2540] mb-2">
                Software version
              </label>
              <input
                type="text"
                placeholder="Not sure"
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-[#1D79C5] focus:border-transparent transition-all text-sm"
                value={data.plcSoftwareVersion}
                onChange={(e) => updateData({ plcSoftwareVersion: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-[#0B2540] mb-2">
                Approximate I/O count
              </label>
              <input
                type="text"
                placeholder="e.g. 64 DI, 32 DO, 16 AI"
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-[#1D79C5] focus:border-transparent transition-all text-sm"
                value={data.plcIoCount}
                onChange={(e) => updateData({ plcIoCount: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-[#0B2540] mb-2">
                Current project status <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#1D79C5] focus:border-transparent transition-all text-sm appearance-none cursor-pointer text-slate-700 font-medium"
                  value={data.plcProjectStatus}
                  onChange={(e) => updateData({
                    plcProjectStatus: e.target.value,
                    customPlcProjectStatus: e.target.value !== "Other" ? "" : data.customPlcProjectStatus
                  })}
                >
                  <option value="" disabled>Select status</option>
                  {PLC_PROJECT_STATUSES.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-slate-400">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
              {data.plcProjectStatus === "Other" && (
                <input
                  type="text"
                  placeholder="Please specify your project status"
                  className="w-full mt-2.5 px-4 py-2.5 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-[#1D79C5] focus:border-transparent transition-all text-sm animate-in fade-in"
                  value={data.customPlcProjectStatus}
                  onChange={(e) => updateData({ customPlcProjectStatus: e.target.value })}
                  autoFocus
                />
              )}
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-[#0B2540] mb-2">LabVIEW version <span className="text-red-500">*</span></label>
              <input
                type="text"
                placeholder="e.g., LabVIEW 2026 Q3"
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-[#1D79C5] focus:border-transparent transition-all text-sm"
                value={data.equipmentName}
                onChange={(e) => updateData({ equipmentName: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-[#0B2540] mb-2">Current project status <span className="text-red-500">*</span></label>
              <div className="relative">
                <select
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#1D79C5] focus:border-transparent transition-all text-sm appearance-none cursor-pointer text-slate-700 font-medium"
                  value={data.modelNumber}
                  onChange={(e) => updateData({
                    modelNumber: e.target.value,
                    customModelNumber: e.target.value !== "Other" ? "" : data.customModelNumber
                  })}
                >
                  <option value="" disabled>Select project status</option>
                  {LABVIEW_PROJECT_STATUSES.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-slate-400">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
              {data.modelNumber === "Other" && (
                <input
                  type="text"
                  placeholder="Please specify your project status"
                  className="w-full mt-2.5 px-4 py-2.5 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-[#1D79C5] focus:border-transparent transition-all text-sm animate-in fade-in"
                  value={data.customModelNumber}
                  onChange={(e) => updateData({ customModelNumber: e.target.value })}
                  autoFocus
                />
              )}
            </div>  
          </div>
        )
      )}

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-bold text-[#0B2540]">
            Developer level <span className="text-red-500">*</span>
          </label>
          <span className="text-[11px] text-slate-500 font-medium">Select one or more levels</span>
        </div>
        <div className="flex flex-col gap-3">
          {[
            "Junior developer",
            "Mid-level developer",
            "Senior developer",
            "Team of developers",
            "Not sure — recommend someone"
          ].map((level) => {
            const isSelected = (data.developerLevels || []).includes(level);
            const currentCount = data.developerCounts?.[level] || (level === "Team of developers" ? 2 : 1);
            return (
              <div
                key={level}
                onClick={() => {
                  let nextLevels: string[];
                  const current: string[] = data.developerLevels || [];
                  if (level === "Not sure — recommend someone") {
                    nextLevels = current.includes(level) ? [] : [level];
                  } else {
                    const withoutNotSure = current.filter((l: string) => l !== "Not sure — recommend someone");
                    if (withoutNotSure.includes(level)) {
                      nextLevels = withoutNotSure.filter((l: string) => l !== level);
                    } else {
                      nextLevels = [...withoutNotSure, level];
                    }
                  }

                  const newCounts: Record<string, number> = {
                    ...(data.developerCounts || {}),
                    [level]: data.developerCounts?.[level] || (level === "Team of developers" ? 2 : 1)
                  };

                  const { formatted, total } = getDeveloperSummary(nextLevels, newCounts);

                  updateData({
                    developerLevels: nextLevels,
                    developerCounts: newCounts,
                    developerLevel: formatted,
                    developerCount: total,
                  });
                }}
                className={`flex items-center justify-between gap-3.5 px-5 py-3.5 rounded-xl border cursor-pointer transition-all ${isSelected
                    ? "border-[#1D79C5] bg-[#F0F8FD] text-[#0B2540] shadow-xs ring-1 ring-[#1D79C5]/30"
                    : "border-zinc-200 bg-white text-slate-700 hover:border-zinc-300 hover:bg-zinc-50/50"
                  }`}
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 transition-all ${isSelected
                        ? "bg-[#1D79C5] text-white border border-[#1D79C5]"
                        : "border-2 border-zinc-300 bg-white"
                      }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                  <span className="text-sm font-semibold">{level}</span>
                </div>

                {isSelected && level !== "Not sure — recommend someone" && (
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-lg border border-[#1D79C5]/40 shadow-xs animate-in fade-in"
                  >
                    <span className="text-xs text-slate-500 font-medium mr-1 hidden sm:inline">
                      {level === "Team of developers" ? "Members:" : "Qty:"}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateCounts(level, Math.max(1, currentCount - 1))}
                      className="w-7 h-7 rounded-md bg-zinc-100 hover:bg-[#1D79C5] hover:text-white text-slate-700 flex items-center justify-center font-bold text-sm transition-colors"
                      title="Decrease"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      max="50"
                      value={currentCount}
                      onChange={(e) => {
                        const val = parseInt(e.target.value, 10);
                        updateCounts(level, isNaN(val) || val < 1 ? 1 : val);
                      }}
                      className="w-10 text-center font-bold text-xs text-[#0B2540] focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <button
                      type="button"
                      onClick={() => updateCounts(level, currentCount + 1)}
                      className="w-7 h-7 rounded-md bg-zinc-100 hover:bg-[#1D79C5] hover:text-white text-slate-700 flex items-center justify-center font-bold text-sm transition-colors"
                      title="Increase"
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {!isAI && (
        <div>
          <label className="block text-sm font-bold text-[#0B2540] mb-3">When do you need the service? <span className="text-red-500">*</span></label>
          <div className="flex flex-wrap gap-2 mb-3">
            {TIMELINES.map(item => (
              <button
                key={item}
                type="button"
                onClick={() => updateData({ targetTimeline: item, customTimeline: item !== "Other" ? "" : data.customTimeline })}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${data.targetTimeline === item
                  ? "bg-[#0B2540] border-[#0B2540] text-white shadow-sm"
                  : "bg-white border-zinc-200 text-slate-600 hover:border-zinc-300"
                  }`}
              >
                {item}
              </button>
            ))}
          </div>
          {data.targetTimeline === "Other" && (
            <input
              type="text"
              placeholder="Please specify when you need the service"
              className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-[#1D79C5] focus:border-transparent transition-all text-sm animate-in fade-in"
              value={data.customTimeline}
              onChange={(e) => updateData({ customTimeline: e.target.value })}
              autoFocus
            />
          )}
        </div>
      )}

      {!isPLC && !isAI && (
        <div>
          <label className="block text-sm font-bold text-[#0B2540] mb-3">Project Priority</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { id: "Critical", desc: "Immediate requirement", dot: "bg-red-500" },
              { id: "High", desc: "Project starting soon", dot: "bg-orange-500" },
              { id: "Standard", desc: "Planned requirement", dot: "bg-yellow-500" },
              { id: "Flexible", desc: "No immediate deadline", dot: "bg-green-500" }
            ].map(u => (
              <button
                key={u.id}
                type="button"
                onClick={() => updateData({ projectPriority: u.id })}
                className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${data.projectPriority === u.id
                  ? "border-[#1D79C5] bg-[#E8F3FA] shadow-sm"
                  : "border-zinc-200 bg-white hover:border-zinc-300"
                  }`}
              >
                <div className={`w-3 h-3 rounded-full ${u.dot} mb-2 shadow-sm`}></div>
                <span className={`font-bold text-sm ${data.projectPriority === u.id ? "text-[#1D79C5]" : "text-[#0B2540]"}`}>{u.id}</span>
                <span className="text-xs text-slate-500 mt-1 text-center">{u.desc}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {!isAI && (
        <div>
          <label className="block text-sm font-bold text-[#0B2540] mb-2">Upload Technical Documents <span className="text-zinc-400 font-normal">(Optional)</span></label>
          <p className="text-xs text-slate-500 mb-4">Upload specifications, datasheets, drawings, BOMs, photos, existing test procedures, or other relevant documents.</p>
          <div className="w-full border-2 border-dashed border-zinc-200 rounded-2xl p-8 flex flex-col items-center justify-center text-center hover:bg-zinc-50 transition-colors cursor-pointer">
            <UploadCloud className="w-8 h-8 text-zinc-400 mb-3" />
            <span className="text-sm font-bold text-[#0B2540]">Drag &amp; drop or click to browse</span>
            <span className="text-xs text-zinc-500 mt-1">PDF, JPG, PNG, DOC, XLS &middot; Max 10 MB</span>
          </div>
        </div>
      )}

      <div className="pt-6 border-t border-zinc-100 flex items-center justify-between">
        <button onClick={onPrev} className="px-6 py-3.5 rounded-none border border-slate-300 text-slate-700 font-bold uppercase tracking-wider text-xs hover:bg-zinc-100 transition-colors flex items-center gap-2">
          <ChevronLeft className="w-4 h-4" /> Back
        </button>
        <button
          onClick={onNext}
          disabled={
            !data.applicationDescription ||
            !data.developerLevel ||
            (isAI
              ? false
              : (!data.targetTimeline || (data.targetTimeline === 'Other' && !data.customTimeline)) ||
                (isPLC
                  ? (!data.plcPlatform || (data.plcPlatform === 'Other Platform' && !data.customPlcPlatform) || !data.plcProjectStatus || (data.plcProjectStatus === 'Other' && !data.customPlcProjectStatus))
                  : (!data.equipmentName || !data.modelNumber || (data.modelNumber === 'Other' && !data.customModelNumber))
                )
            )
          }
          className="px-8 py-3.5 rounded-none border border-[#1D79C5] bg-[#1D79C5] text-white font-bold uppercase tracking-wider text-xs shadow-md hover:bg-[#15609e] transition-colors hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50 disabled:pointer-events-none flex items-center gap-2"
        >
          Your Info <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function Step3({ data, updateData, onNext, onPrev }: any) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* Support Mode Selection */}
      <div>
        <label className="block text-sm font-bold text-[#0B2540] mb-3">Support type <span className="text-red-500">*</span></label>
        <div className="flex flex-wrap gap-2 mb-3">
          {SUPPORT_TYPES.map(type => (
            <button
              key={type}
              type="button"
              onClick={() => updateData({ supportType: type, customSupportType: type !== "Other" ? "" : data.customSupportType })}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${data.supportType === type
                ? "bg-[#0B2540] border-[#0B2540] text-white shadow-sm"
                : "bg-white border-zinc-200 text-slate-600 hover:border-zinc-300"
                }`}
            >
              {type}
            </button>
          ))}
        </div>
        {data.supportType === "Other" && (
          <input
            type="text"
            placeholder="Please specify support type"
            className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-[#1D79C5] focus:border-transparent transition-all text-sm animate-in fade-in"
            value={data.customSupportType}
            onChange={(e) => updateData({ customSupportType: e.target.value })}
            autoFocus
          />
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-bold text-[#0B2540] mb-2">Full Name <span className="text-red-500">*</span></label>
          <input
            type="text"
            placeholder="e.g. Rajesh Kumar"
            className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-[#1D79C5] focus:border-transparent transition-all text-sm"
            value={data.name}
            onChange={(e) => updateData({ name: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-[#0B2540] mb-2">Company Name <span className="text-red-500">*</span></label>
          <input
            type="text"
            placeholder="e.g. ABC Industries Pvt Ltd"
            className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-[#1D79C5] focus:border-transparent transition-all text-sm"
            value={data.companyName}
            onChange={(e) => updateData({ companyName: e.target.value })}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-bold text-[#0B2540] mb-2">Phone Number <span className="text-red-500">*</span></label>
          <div className="flex">
            <select
              className="px-4 py-3 rounded-l-xl border border-r-0 border-zinc-200 bg-zinc-50 text-slate-500 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#1D79C5] focus:border-transparent transition-all"
              value={data.phoneCountryCode}
              onChange={(e) => updateData({ phoneCountryCode: e.target.value })}
            >
              <option value="+91">+91 (IN)</option>
              <option value="+1">+1 (US/CA)</option>
              <option value="+44">+44 (UK)</option>
              <option value="+61">+61 (AU)</option>
              <option value="+81">+81 (JP)</option>
              <option value="+86">+86 (CN)</option>
              <option value="+49">+49 (DE)</option>
              <option value="+33">+33 (FR)</option>
            </select>
            <input
              type="tel"
              placeholder="98765 43210"
              className="w-full px-4 py-3 rounded-r-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-[#1D79C5] focus:border-transparent transition-all text-sm"
              value={data.phone}
              onChange={(e) => updateData({ phone: e.target.value })}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-bold text-[#0B2540] mb-2">Email Address <span className="text-red-500">*</span></label>
          <input
            type="email"
            placeholder="name@company.com"
            className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-zinc-100 text-slate-500 cursor-not-allowed focus:outline-none transition-all text-sm"
            value={data.email}
            readOnly
            title="Email is linked to your account"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-bold text-[#0B2540] mb-2">Designation</label>
          <input
            type="text"
            placeholder="e.g. Engineering Manager"
            className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-[#1D79C5] focus:border-transparent transition-all text-sm"
            value={data.designation}
            onChange={(e) => updateData({ designation: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-[#0B2540] mb-2">City / Location <span className="text-red-500">*</span></label>
          <input
            type="text"
            placeholder="e.g. Chennai, Bengaluru, Pune"
            className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-[#1D79C5] focus:border-transparent transition-all text-sm"
            value={data.city}
            onChange={(e) => updateData({ city: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-[#0B2540] mb-2">Country <span className="text-red-500">*</span></label>
          <select
            className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-[#1D79C5] focus:border-transparent transition-all text-sm bg-white"
            value={data.country}
            onChange={(e) => updateData({ country: e.target.value })}
          >
            <option value="" disabled>Select Country</option>
            <option value="India">India</option>
            <option value="United States">United States</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="Australia">Australia</option>
            <option value="Canada">Canada</option>
            <option value="Germany">Germany</option>
            <option value="France">France</option>
            <option value="Japan">Japan</option>
            <option value="China">China</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-bold text-[#0B2540] mb-3">Preferred Contact Method</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {[
              { id: "Phone Call", icon: <Phone className="w-4 h-4 text-blue-500" /> },
              { id: "WhatsApp", icon: <FontAwesomeIcon icon={faWhatsapp} className="w-4 h-4 text-green-500" /> },
              { id: "Email", icon: <Mail className="w-4 h-4 text-purple-500" /> }
            ].map(c => (
              <button
                key={c.id}
                onClick={() => updateData({ contactMethod: c.id })}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${data.contactMethod === c.id
                  ? "border-[#1D79C5] bg-[#E8F3FA] shadow-sm text-[#1D79C5]"
                  : "border-zinc-200 bg-white hover:border-zinc-300 text-[#0B2540]"
                  }`}
              >
                {c.icon}
                <span className="font-bold text-xs mt-1">{c.id}</span>
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-bold text-[#0B2540] mb-3">Best Time to Contact</label>
          <div className="grid grid-cols-2 gap-2">
            {["Morning", "Afternoon", "Evening", "Anytime"].map(t => (
              <button
                key={t}
                type="button"
                onClick={() => updateData({ bestTimeToContact: t })}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all border ${data.bestTimeToContact === t
                  ? "bg-[#1D79C5] border-[#1D79C5] text-white shadow-sm"
                  : "bg-white border-zinc-200 text-slate-600 hover:border-zinc-300"
                  }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-zinc-100 flex items-center justify-between">
        <button onClick={onPrev} className="px-6 py-3.5 rounded-none border border-slate-300 text-slate-700 font-bold uppercase tracking-wider text-xs hover:bg-zinc-100 transition-colors flex items-center gap-2">
          <ChevronLeft className="w-4 h-4" /> Back
        </button>
        <button
          onClick={onNext}
          disabled={!data.name || !data.companyName || !data.phone || !data.email || !data.city || !data.country || !data.supportType || (data.supportType === 'Other' && !data.customSupportType)}
          className="px-8 py-3.5 rounded-none border border-[#1D79C5] bg-[#1D79C5] text-white font-bold uppercase tracking-wider text-xs shadow-md hover:bg-[#15609e] transition-colors hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50 disabled:pointer-events-none flex items-center gap-2"
        >
          Review &amp; Submit <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function Step4({ data, setStep, onSubmit, onPrev, isSubmitting }: any) {
  const isPLC = data.primaryService === "PLC Programming & Industrial Automation";
  const isAI = data.primaryService === "Intelligent Automation with LabVIEW + AI";

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* Requirement Summary */}
      <div className="bg-zinc-50 rounded-2xl p-6 border border-zinc-100 relative">
        <button onClick={() => setStep(1)} className="absolute top-4 right-4 text-xs font-bold text-[#1D79C5] hover:underline flex items-center gap-1">
          Edit
        </button>
        <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4">Requirement</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          <div>
            <div className="text-xs text-slate-500 mb-1">Service Category</div>
            <div className="font-bold text-[#0B2540]">{data.primaryService || '-'}</div>
          </div>
          <div>
            <div className="text-xs text-slate-500 mb-1">Industry</div>
            <div className="font-bold text-[#0B2540]">{data.industry === 'Other Industry' ? data.customIndustry || 'Other Industry' : data.industry || '-'}</div>
          </div>
          <div>
            <div className="text-xs text-slate-500 mb-1">Solution</div>
            <div className="font-bold text-[#0B2540]">{(data.solution === 'Other Requirements' || data.solution === 'Other') ? data.customSolution || data.solution : data.solution || '-'}</div>
            {data.subCategories && data.subCategories.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {data.subCategories.map((sub: string) => (
                  <span key={sub} className="inline-block px-2 py-0.5 text-[10px] font-semibold bg-[#E8F3FA] text-[#1D79C5] rounded-md border border-[#1D79C5]/20">
                    {sub}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div>
            <div className="text-xs text-slate-500 mb-1">Project Type</div>
            <div className="font-bold text-[#0B2540]">{isAI ? 'AI Automation' : (data.projectType || '-')}</div>
          </div>
          <div>
            <div className="text-xs text-slate-500 mb-1">Support Type</div>
            <div className="font-bold text-[#0B2540]">{data.supportType === 'Other' ? (data.customSupportType || 'Other') : (data.supportType || '-')}</div>
          </div>
        </div>
      </div>

      {/* Technical Summary */}
      <div className="bg-zinc-50 rounded-2xl p-6 border border-zinc-100 relative">
        <button onClick={() => setStep(2)} className="absolute top-4 right-4 text-xs font-bold text-[#1D79C5] hover:underline flex items-center gap-1">
          Edit
        </button>
        <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4">Technical Details</h3>
        <div className="mb-4">
          <div className="text-xs text-slate-500 mb-1">Application / Requirement</div>
          <p className="text-sm font-medium text-[#0B2540] leading-relaxed">
            {data.applicationDescription || '-'}
          </p>
        </div>
        {isAI ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-2">
              <div className="text-xs text-slate-500 mb-1">Developer Level</div>
              <div className="font-bold text-[#0B2540]">{data.developerLevel || '-'}</div>
              {data.developerLevels && data.developerLevels.length > 0 && !data.developerLevels.includes("Not sure — recommend someone") && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {data.developerLevels.map((lvl: string) => {
                    const count = data.developerCounts?.[lvl] || (lvl === "Team of developers" ? 2 : 1);
                    const unit = lvl === "Team of developers" ? "members" : (count > 1 ? "developers" : "developer");
                    return (
                      <span key={lvl} className="inline-block px-2 py-0.5 text-[10px] font-semibold bg-[#E8F3FA] text-[#1D79C5] rounded-md border border-[#1D79C5]/20">
                        {lvl}: {count} {unit}
                      </span>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        ) : isPLC ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <div className="text-xs text-slate-500 mb-1">Platform</div>
              <div className="font-bold text-[#0B2540]">{data.plcPlatform === 'Other Platform' ? (data.customPlcPlatform || 'Other Platform') : (data.plcPlatform || 'Not sure')}</div>
            </div>
            <div>
              <div className="text-xs text-slate-500 mb-1">Software Version</div>
              <div className="font-bold text-[#0B2540]">{data.plcSoftwareVersion || 'Not sure'}</div>
            </div>
            <div>
              <div className="text-xs text-slate-500 mb-1">Approx. I/O Count</div>
              <div className="font-bold text-[#0B2540]">{data.plcIoCount || '-'}</div>
            </div>
            <div>
              <div className="text-xs text-slate-500 mb-1">Current Status</div>
              <div className="font-bold text-[#0B2540]">{data.plcProjectStatus === 'Other' ? (data.customPlcProjectStatus || 'Other') : (data.plcProjectStatus || '-')}</div>
            </div>
            <div className="col-span-2">
              <div className="text-xs text-slate-500 mb-1">Developer Level</div>
              <div className="font-bold text-[#0B2540]">{data.developerLevel || '-'}</div>
              {data.developerLevels && data.developerLevels.length > 0 && !data.developerLevels.includes("Not sure — recommend someone") && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {data.developerLevels.map((lvl: string) => {
                    const count = data.developerCounts?.[lvl] || (lvl === "Team of developers" ? 2 : 1);
                    const unit = lvl === "Team of developers" ? "members" : (count > 1 ? "developers" : "developer");
                    return (
                      <span key={lvl} className="inline-block px-2 py-0.5 text-[10px] font-semibold bg-[#E8F3FA] text-[#1D79C5] rounded-md border border-[#1D79C5]/20">
                        {lvl}: {count} {unit}
                      </span>
                    );
                  })}
                </div>
              )}
            </div>
            <div className="col-span-2">
              <div className="text-xs text-slate-500 mb-1">Timeline</div>
              <div className="font-bold text-[#0B2540]">{data.targetTimeline === 'Other' ? (data.customTimeline || 'Other') : (data.targetTimeline || '-')}</div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <div className="text-xs text-slate-500 mb-1">LabVIEW Version</div>
              <div className="font-bold text-[#0B2540]">{data.equipmentName || '-'}</div>
            </div>
            <div className="col-span-2">
              <div className="text-xs text-slate-500 mb-1">Developer Level</div>
              <div className="font-bold text-[#0B2540]">{data.developerLevel || '-'}</div>
              {data.developerLevels && data.developerLevels.length > 0 && !data.developerLevels.includes("Not sure — recommend someone") && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {data.developerLevels.map((lvl: string) => {
                    const count = data.developerCounts?.[lvl] || (lvl === "Team of developers" ? 2 : 1);
                    const unit = lvl === "Team of developers" ? "members" : (count > 1 ? "developers" : "developer");
                    return (
                      <span key={lvl} className="inline-block px-2 py-0.5 text-[10px] font-semibold bg-[#E8F3FA] text-[#1D79C5] rounded-md border border-[#1D79C5]/20">
                        {lvl}: {count} {unit}
                      </span>
                    );
                  })}
                </div>
              )}
              {data.modelNumber && (
                <div className="mt-1 text-xs text-slate-500">Status: <span className="font-semibold text-[#0B2540]">{data.modelNumber === 'Other' ? (data.customModelNumber || 'Other') : data.modelNumber}</span></div>
              )}
            </div>
            <div>
              <div className="text-xs text-slate-500 mb-1">Timeline</div>
              <div className="font-bold text-[#0B2540]">{data.targetTimeline === 'Other' ? (data.customTimeline || 'Other') : (data.targetTimeline || '-')}</div>
            </div>
            <div>
              <div className="text-xs text-slate-500 mb-1">Priority</div>
              <div className="font-bold text-[#0B2540]">{data.projectPriority || '-'}</div>
            </div>
          </div>
        )}
      </div>

      {/* Contact Summary */}
      <div className="bg-zinc-50 rounded-2xl p-6 border border-zinc-100 relative">
        <button onClick={() => setStep(3)} className="absolute top-4 right-4 text-xs font-bold text-[#1D79C5] hover:underline flex items-center gap-1">
          Edit
        </button>
        <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4">Contact Info</h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <div className="text-xs text-slate-500 mb-1">Name</div>
            <div className="font-bold text-[#0B2540]">{data.name || '-'}</div>
          </div>
          <div>
            <div className="text-xs text-slate-500 mb-1">Company</div>
            <div className="font-bold text-[#0B2540]">{data.companyName || '-'}</div>
          </div>
          <div>
            <div className="text-xs text-slate-500 mb-1">Phone</div>
            <div className="font-bold text-[#0B2540]">+91 {data.phone || '-'}</div>
          </div>
          <div>
            <div className="text-xs text-slate-500 mb-1">Email</div>
            <div className="font-bold text-[#0B2540]">{data.email || '-'}</div>
          </div>
          <div className="col-span-2">
            <div className="text-xs text-slate-500 mb-1">Location</div>
            <div className="font-bold text-[#0B2540]">{data.city ? `${data.city}${data.country ? `, ${data.country}` : ''}` : '-'}</div>
          </div>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-[#E8F3FA] rounded-xl p-4 flex gap-4 border border-[#1D79C5]/20">
        <HelpCircle className="w-5 h-5 text-[#1D79C5] shrink-0 mt-0.5" />
        <div>
          <h4 className="font-bold text-[#1D79C5] text-sm mb-1">Instant Meeting Scheduling</h4>
          <p className="text-xs text-[#0B2540]/80 leading-relaxed">
            Upon submitting, a Google Meet link will be generated instantly for your consultation and sent to your email and our engineering team. We will review your requirement and connect with you at your chosen time.
          </p>
        </div>
      </div>

      <div className="pt-6 border-t border-zinc-100 flex items-center justify-between">
        <button onClick={onPrev} className="px-6 py-3.5 rounded-none border border-slate-300 text-slate-700 font-bold uppercase tracking-wider text-xs hover:bg-zinc-100 transition-colors flex items-center gap-2">
          <ChevronLeft className="w-4 h-4" /> Back
        </button>
        <button
          onClick={onSubmit}
          disabled={isSubmitting}
          className="px-8 py-3.5 rounded-none border border-[#E7651A] bg-[#E7651A] text-white font-black uppercase tracking-wider text-xs shadow-lg hover:bg-[#d9590b] transition-colors hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-50 disabled:pointer-events-none flex items-center gap-2"
        >
          {isSubmitting ? (
            <>Scheduling Session... <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" /></>
          ) : (
            <>Confirm &amp; Schedule Meeting <CheckSquare className="w-4 h-4" /></>
          )}
        </button>
      </div>
    </div>
  );
}
