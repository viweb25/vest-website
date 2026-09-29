"use client";

import React, { useState } from "react";
import BookSessionSidebar from "./BookSessionSidebar";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import { 
  Monitor, Settings, Zap, Cpu, Server, PlaySquare, Battery, Command, 
  HelpCircle, AlertTriangle, Clock, Hammer, User, Briefcase, Phone, 
  Mail, MapPin, Building, CheckSquare, ChevronRight, ChevronLeft,
  UploadCloud, CheckCircle2, Rocket, Car, Radio, Shield, Factory, HeartPulse
} from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

type FormData = {
  industry: string;
  customIndustry: string;
  solution: string;
  customSolution: string;
  projectType: string;
  quantity: number;
  
  applicationDescription: string;
  equipmentName: string;
  modelNumber: string;
  interfaces: string[];
  customInterface: string;
  preferredSoftware: string;
  customSoftware: string;
  targetTimeline: string;
  projectPriority: string;
  
  name: string;
  companyName: string;
  designation: string;
  phone: string;
  email: string;
  city: string;
  country: string;
  contactMethod: string;
  bestTimeToContact: string;
};

const INITIAL_DATA: FormData = {
  industry: "", customIndustry: "", solution: "", customSolution: "", projectType: "", quantity: 1,
  applicationDescription: "", equipmentName: "", modelNumber: "", interfaces: [], customInterface: "", preferredSoftware: "", customSoftware: "", targetTimeline: "", projectPriority: "",
  name: "", companyName: "", designation: "", phone: "", email: "", city: "", country: "", contactMethod: "", bestTimeToContact: ""
};

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
  "Automated Test Equipment (ATE)", "Test Bench Development", "Test System Integration", "Hardware-in-the-Loop (HIL)", "Data Acquisition Systems", "Test & Measurement Systems", "Automation & Control Systems", "Simulation & Validation", "Environmental Testing", "Custom Engineering Solution", "Other"
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
  "Immediate", "Within 1 Month", "1–3 Months", "3–6 Months", "6+ Months", "Planning / Evaluation"
];

export default function BookSessionPage() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>(INITIAL_DATA);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const updateData = (fields: Partial<FormData>) => {
    setData(prev => ({ ...prev, ...fields }));
  };

  const nextStep = () => setStep(s => Math.min(s + 1, 4));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
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
            <div className="lg:col-span-8 flex flex-col items-center justify-center py-32 text-center bg-white rounded-3xl border border-zinc-200 shadow-sm p-12">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-3xl font-black text-[#0B2540] mb-4">Request Received!</h2>
              <p className="text-slate-600 mb-8 max-w-md">
                Thank you, {data.name}. Our engineering team will review your {data.solution} requirement and contact you within 2-4 business hours.
              </p>
              <button onClick={() => { setIsSubmitted(false); setStep(1); setData(INITIAL_DATA); }} className="px-8 py-3 rounded-full bg-[#1D79C5] text-white font-bold hover:bg-[#15609e] transition-colors">
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
                {step === 4 && <Step4 data={data} setStep={setStep} onSubmit={handleSubmit} onPrev={prevStep} />}
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
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <label className="block text-sm font-bold text-[#0B2540] mb-4">Industry / Domain <span className="text-red-500">*</span></label>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-3">
          {INDUSTRIES.map(ind => (
            <button
              key={ind.id}
              onClick={() => updateData({ industry: ind.id, customIndustry: ind.id !== "Other Industry" ? "" : data.customIndustry })}
              className={`flex flex-col items-center justify-center gap-3 p-4 rounded-xl border transition-all ${
                data.industry === ind.id 
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
        <label className="block text-sm font-bold text-[#0B2540] mb-4">Solution / Service Required <span className="text-red-500">*</span></label>
        <div className="flex flex-wrap gap-2 mb-3">
          {SOLUTIONS.map(s => (
            <button
              key={s}
              onClick={() => updateData({ solution: s, customSolution: s !== "Other" ? "" : data.customSolution })}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${
                data.solution === s
                  ? "bg-[#1D79C5] border-[#1D79C5] text-white shadow-sm"
                  : "bg-white border-zinc-200 text-slate-600 hover:border-zinc-300"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        {data.solution === "Other" && (
          <input 
            type="text" 
            placeholder="Please specify required solution" 
            className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-[#1D79C5] focus:border-transparent transition-all text-sm animate-in fade-in"
            value={data.customSolution}
            onChange={(e) => updateData({ customSolution: e.target.value })}
            autoFocus
          />
        )}
      </div>

      <div>
        <label className="block text-sm font-bold text-[#0B2540] mb-4">Project Type <span className="text-red-500">*</span></label>
        <div className="flex flex-wrap gap-2">
          {PROJECT_TYPES.map(p => (
            <button
              key={p}
              onClick={() => updateData({ projectType: p })}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${
                data.projectType === p
                  ? "bg-[#0B2540] border-[#0B2540] text-white shadow-sm"
                  : "bg-white border-zinc-200 text-slate-600 hover:border-zinc-300"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-[#0B2540] mb-2">Quantity / Number of Systems</label>
        <div className="flex items-center gap-4">
          <button onClick={() => updateData({ quantity: Math.max(1, data.quantity - 1) })} className="w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-500 hover:bg-zinc-50 transition-colors">-</button>
          <span className="font-bold w-4 text-center">{data.quantity}</span>
          <button onClick={() => updateData({ quantity: data.quantity + 1 })} className="w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-500 hover:bg-zinc-50 transition-colors">+</button>
        </div>
      </div>

      <div className="pt-6 border-t border-zinc-100 flex justify-end">
        <button 
          onClick={onNext}
          disabled={!data.industry || (data.industry === "Other Industry" && !data.customIndustry) || !data.solution || (data.solution === "Other" && !data.customSolution) || !data.projectType}
          className="px-8 py-3.5 rounded-full bg-[#1D79C5] text-white font-bold shadow-md hover:bg-[#15609e] transition-colors hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50 disabled:pointer-events-none flex items-center gap-2"
        >
          Technical Details <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function Step2({ data, updateData, onNext, onPrev }: any) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <label className="block text-sm font-bold text-[#0B2540] mb-2">Application / Requirement Description <span className="text-red-500">*</span></label>
        <textarea 
          rows={4}
          placeholder="Describe your application, testing requirement, equipment, process, or technical challenge." 
          className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-[#1D79C5] focus:border-transparent transition-all text-sm resize-none"
          value={data.applicationDescription}
          onChange={(e) => updateData({ applicationDescription: e.target.value })}
        />
        <p className="text-xs text-slate-500 mt-2">The more detail you provide, the better we can recommend the right solution.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-bold text-[#0B2540] mb-2">Equipment / System Name</label>
          <input 
            type="text" 
            placeholder="e.g. Propulsion Test Bench, Battery Test System" 
            className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-[#1D79C5] focus:border-transparent transition-all text-sm"
            value={data.equipmentName}
            onChange={(e) => updateData({ equipmentName: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-[#0B2540] mb-2">Model / Part Number</label>
          <input 
            type="text" 
            placeholder="Enter model or part number if applicable" 
            className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-[#1D79C5] focus:border-transparent transition-all text-sm"
            value={data.modelNumber}
            onChange={(e) => updateData({ modelNumber: e.target.value })}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-[#0B2540] mb-3">Required Interfaces</label>
        <div className="flex flex-wrap gap-2 mb-3">
          {INTERFACES.map(i => {
            const isSelected = data.interfaces.includes(i);
            return (
              <button
                key={i}
                onClick={() => {
                  const newInterfaces = isSelected 
                    ? data.interfaces.filter((item: string) => item !== i)
                    : [...data.interfaces, i];
                  updateData({ interfaces: newInterfaces, customInterface: !newInterfaces.includes("Other") ? "" : data.customInterface });
                }}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${
                  isSelected
                    ? "bg-[#1D79C5] border-[#1D79C5] text-white shadow-sm"
                    : "bg-white border-zinc-200 text-slate-600 hover:border-zinc-300"
                }`}
              >
                {i}
              </button>
            );
          })}
        </div>
        {data.interfaces.includes("Other") && (
          <input 
            type="text" 
            placeholder="Please specify other interfaces" 
            className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-[#1D79C5] focus:border-transparent transition-all text-sm animate-in fade-in"
            value={data.customInterface}
            onChange={(e) => updateData({ customInterface: e.target.value })}
            autoFocus
          />
        )}
      </div>

      <div>
        <label className="block text-sm font-bold text-[#0B2540] mb-3">Preferred Software / Platform</label>
        <div className="flex flex-wrap gap-2 mb-3">
          {SOFTWARE_PLATFORMS.map(s => (
            <button
              key={s}
              onClick={() => updateData({ preferredSoftware: s, customSoftware: s !== "Other" ? "" : data.customSoftware })}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${
                data.preferredSoftware === s
                  ? "bg-[#0B2540] border-[#0B2540] text-white shadow-sm"
                  : "bg-white border-zinc-200 text-slate-600 hover:border-zinc-300"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        {data.preferredSoftware === "Other" && (
          <input 
            type="text" 
            placeholder="Please specify preferred software" 
            className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-[#1D79C5] focus:border-transparent transition-all text-sm animate-in fade-in"
            value={data.customSoftware}
            onChange={(e) => updateData({ customSoftware: e.target.value })}
            autoFocus
          />
        )}
      </div>

      <div>
        <label className="block text-sm font-bold text-[#0B2540] mb-3">Target Timeline</label>
        <div className="flex flex-wrap gap-2">
          {TIMELINES.map(t => (
            <button
              key={t}
              onClick={() => updateData({ targetTimeline: t })}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${
                data.targetTimeline === t
                  ? "bg-[#0B2540] border-[#0B2540] text-white shadow-sm"
                  : "bg-white border-zinc-200 text-slate-600 hover:border-zinc-300"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

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
              onClick={() => updateData({ projectPriority: u.id })}
              className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${
                data.projectPriority === u.id
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

      <div>
        <label className="block text-sm font-bold text-[#0B2540] mb-2">Upload Technical Documents <span className="text-zinc-400 font-normal">(Optional)</span></label>
        <p className="text-xs text-slate-500 mb-4">Upload specifications, datasheets, drawings, BOMs, photos, existing test procedures, or other relevant documents.</p>
        <div className="w-full border-2 border-dashed border-zinc-200 rounded-2xl p-8 flex flex-col items-center justify-center text-center hover:bg-zinc-50 transition-colors cursor-pointer">
          <UploadCloud className="w-8 h-8 text-zinc-400 mb-3" />
          <span className="text-sm font-bold text-[#0B2540]">Drag &amp; drop or click to browse</span>
          <span className="text-xs text-zinc-500 mt-1">PDF, JPG, PNG, DOC, XLS &middot; Max 10 MB</span>
        </div>
      </div>

      <div className="pt-6 border-t border-zinc-100 flex items-center justify-between">
        <button onClick={onPrev} className="px-6 py-3.5 rounded-full text-slate-500 font-bold hover:bg-zinc-100 transition-colors flex items-center gap-2">
          <ChevronLeft className="w-4 h-4" /> Back
        </button>
        <button 
          onClick={onNext}
          disabled={!data.applicationDescription}
          className="px-8 py-3.5 rounded-full bg-[#1D79C5] text-white font-bold shadow-md hover:bg-[#15609e] transition-colors hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50 disabled:pointer-events-none flex items-center gap-2"
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
            <span className="inline-flex items-center px-4 py-3 rounded-l-xl border border-r-0 border-zinc-200 bg-zinc-50 text-slate-500 text-sm font-bold">
              +91
            </span>
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
            className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-[#1D79C5] focus:border-transparent transition-all text-sm"
            value={data.email}
            onChange={(e) => updateData({ email: e.target.value })}
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
          <label className="block text-sm font-bold text-[#0B2540] mb-2">Country</label>
          <input 
            type="text" 
            placeholder="e.g. India" 
            className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-[#1D79C5] focus:border-transparent transition-all text-sm"
            value={data.country}
            onChange={(e) => updateData({ country: e.target.value })}
          />
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
                className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${
                  data.contactMethod === c.id
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
                onClick={() => updateData({ bestTimeToContact: t })}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all border ${
                  data.bestTimeToContact === t
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
        <button onClick={onPrev} className="px-6 py-3.5 rounded-full text-slate-500 font-bold hover:bg-zinc-100 transition-colors flex items-center gap-2">
          <ChevronLeft className="w-4 h-4" /> Back
        </button>
        <button 
          onClick={onNext}
          disabled={!data.name || !data.companyName || !data.phone || !data.email || !data.city}
          className="px-8 py-3.5 rounded-full bg-[#1D79C5] text-white font-bold shadow-md hover:bg-[#15609e] transition-colors hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50 disabled:pointer-events-none flex items-center gap-2"
        >
          Review &amp; Submit <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function Step4({ data, setStep, onSubmit, onPrev }: any) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Requirement Summary */}
      <div className="bg-zinc-50 rounded-2xl p-6 border border-zinc-100 relative">
        <button onClick={() => setStep(1)} className="absolute top-4 right-4 text-xs font-bold text-[#1D79C5] hover:underline flex items-center gap-1">
          Edit
        </button>
        <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4">Requirement</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <div className="text-xs text-slate-500 mb-1">Industry</div>
            <div className="font-bold text-[#0B2540]">{data.industry === 'Other Industry' ? data.customIndustry || 'Other Industry' : data.industry || '-'}</div>
          </div>
          <div>
            <div className="text-xs text-slate-500 mb-1">Solution</div>
            <div className="font-bold text-[#0B2540]">{data.solution === 'Other' ? data.customSolution || 'Other' : data.solution || '-'}</div>
          </div>
          <div>
            <div className="text-xs text-slate-500 mb-1">Project Type</div>
            <div className="font-bold text-[#0B2540]">{data.projectType || '-'}</div>
          </div>
          <div>
            <div className="text-xs text-slate-500 mb-1">Quantity</div>
            <div className="font-bold text-[#0B2540]">{data.quantity} System{data.quantity > 1 ? 's' : ''}</div>
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
          <div className="text-xs text-slate-500 mb-1">Application</div>
          <p className="text-sm font-medium text-[#0B2540] leading-relaxed">
            {data.applicationDescription || '-'}
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <div className="text-xs text-slate-500 mb-1">Equipment</div>
            <div className="font-bold text-[#0B2540]">{data.equipmentName || '-'}</div>
          </div>
          <div className="col-span-2">
            <div className="text-xs text-slate-500 mb-1">Interfaces</div>
            <div className="font-bold text-[#0B2540]">{data.interfaces.length > 0 ? data.interfaces.map((i: string) => i === 'Other' ? data.customInterface || 'Other' : i).join(', ') : '-'}</div>
          </div>
          <div>
            <div className="text-xs text-slate-500 mb-1">Timeline</div>
            <div className="font-bold text-[#0B2540]">{data.targetTimeline || '-'}</div>
          </div>
          <div>
            <div className="text-xs text-slate-500 mb-1">Priority</div>
            <div className="font-bold text-[#0B2540]">{data.projectPriority || '-'}</div>
          </div>
        </div>
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
          <h4 className="font-bold text-[#1D79C5] text-sm mb-1">What happens after you submit?</h4>
          <p className="text-xs text-[#0B2540]/80 leading-relaxed">
            Our engineering team will review your requirement and contact you within 2–4 business hours to understand your application, discuss the technical approach, and provide the next steps.
          </p>
        </div>
      </div>

      <div className="pt-6 border-t border-zinc-100 flex items-center justify-between">
        <button onClick={onPrev} className="px-6 py-3.5 rounded-full text-slate-500 font-bold hover:bg-zinc-100 transition-colors flex items-center gap-2">
          <ChevronLeft className="w-4 h-4" /> Back
        </button>
        <button 
          onClick={onSubmit}
          className="px-8 py-3.5 rounded-full bg-[#F2670E] text-white font-black shadow-lg hover:bg-[#d9590b] transition-colors hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2"
        >
          Submit Enquiry <CheckSquare className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
