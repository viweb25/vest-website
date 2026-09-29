"use client";

import React, { useState, useEffect } from "react";
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
import { useAuth } from "@/providers/AuthProvider";
import { LoginModal } from "@/components/site/LoginModal";
import { PaymentModal } from "@/components/site/PaymentModal";
import api from "@/lib/api";

type FormData = {
  industry: string;
  customIndustry: string;
  solution: string;
  customSolution: string;
  projectType: string;
  quantity: number;
  supportType: string;
  
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
  phoneCountryCode: string;
};

const INITIAL_DATA: FormData = {
  industry: "", customIndustry: "", solution: "", customSolution: "", projectType: "", quantity: 1,
  applicationDescription: "", equipmentName: "", modelNumber: "", interfaces: [], customInterface: "", preferredSoftware: "", customSoftware: "", targetTimeline: "", projectPriority: "",
  name: "", companyName: "", designation: "", phone: "", email: "", city: "", country: "", contactMethod: "", bestTimeToContact: "", phoneCountryCode: "+91", supportType: ""
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
  const [createdRequirementId, setCreatedRequirementId] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setIsSubmitting(true);

    try {
      // 1. Create requirement (PENDING_PAYMENT)
      const res = await api.post('/requirements', {
        industryDomain: data.industry,
        customIndustry: data.customIndustry,
        servicesRequired: [data.solution],
        customSolution: data.customSolution,
        projectType: data.projectType,
        quantity: data.quantity,
        applicationDescription: data.applicationDescription,
        equipmentSystemName: data.equipmentName,
        modelPartNumber: data.modelNumber,
        requiredInterfaces: data.interfaces,
        customInterface: data.customInterface,
        preferredSoftwarePlatform: [data.preferredSoftware],
        customSoftware: data.customSoftware,
        targetTimeline: data.targetTimeline,
        projectPriority: data.projectPriority,
        supportType: data.supportType,
        country: data.country,
        phoneCountryCode: data.phoneCountryCode,
        phoneNumber: data.phone
      });

      if (res.data.success) {
        setCreatedRequirementId(res.data.data.requirement.id);
        // Do not set isSubmitted(true) yet. The PaymentModal handles next step.
      } else {
        alert(res.data.message || 'Failed to submit requirement');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while submitting.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePaymentSuccess = async () => {
    if (!createdRequirementId) return;

    try {
      // 2. Verify payment & send email
      const res = await api.post(`/requirements/${createdRequirementId}/pay`, {
        paymentId: `MOCK_PAY_${Date.now()}`,
        paymentAmount: 199,
        paymentCurrency: 'INR'
      });

      if (res.status === 200) {
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error('Payment verification failed', error);
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
            <div className="lg:col-span-8 flex flex-col items-center justify-center py-32 text-center bg-white rounded-3xl border border-zinc-200 shadow-sm p-12">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-3xl font-black text-[#0B2540] mb-4">Request Received & Paid!</h2>
              <p className="text-slate-600 mb-8 max-w-md">
                Thank you, {data.name}. Our engineering team will review your {data.solution} requirement and contact you within 2-4 business hours. A confirmation email has been sent.
              </p>
              <button onClick={() => { setIsSubmitted(false); setStep(1); setData(INITIAL_DATA); setCreatedRequirementId(null); }} className="px-8 py-3 rounded-full bg-[#1D79C5] text-white font-bold hover:bg-[#15609e] transition-colors">
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

        {/* Payment Modal */}
        {createdRequirementId && (
          <PaymentModal
            open={!!createdRequirementId}
            onOpenChange={(isOpen) => !isOpen && setCreatedRequirementId(null)}
            planName={`${data.supportType === 'ONLINE' ? 'Online' : 'Offline'} Support Session`}
            sub="Professional Engineering Support"
            price={199}
            period="month"
            features={[
              { label: 'Priority Support', value: 'Yes' },
              { label: 'Session Type', value: data.supportType === 'ONLINE' ? 'Remote' : 'On-Site' },
              { label: 'Duration', value: '1 Hour' },
            ]}
            onSuccess={handlePaymentSuccess}
          />
        )}
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
      
      {/* Support Mode Selection */}
      <div>
        <label className="block text-sm font-bold text-[#0B2540] mb-3">Support Mode <span className="text-red-500">*</span></label>
        <div className="grid md:grid-cols-2 gap-4">
          <button
            onClick={() => updateData({ supportType: 'ONLINE' })}
            className={`flex items-start gap-4 p-5 rounded-2xl border-2 text-left transition-all ${
              data.supportType === 'ONLINE'
                ? 'border-[#1D79C5] bg-[#E8F3FA]'
                : 'border-zinc-200 bg-white hover:border-zinc-300'
            }`}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${data.supportType === 'ONLINE' ? 'bg-[#1D79C5] text-white' : 'bg-zinc-100 text-slate-500'}`}>
              <Monitor className="w-5 h-5" />
            </div>
            <div>
              <div className={`font-bold ${data.supportType === 'ONLINE' ? 'text-[#1D79C5]' : 'text-[#0B2540]'}`}>Online Support</div>
              <div className="text-xs text-slate-500 mt-1">Remote guidance, software debugging, logic review.</div>
              <div className="text-[#1D79C5] font-bold text-sm mt-2">₹199 / Session</div>
            </div>
          </button>
          <button
            onClick={() => updateData({ supportType: 'OFFLINE' })}
            className={`flex items-start gap-4 p-5 rounded-2xl border-2 text-left transition-all ${
              data.supportType === 'OFFLINE'
                ? 'border-[#1D79C5] bg-[#E8F3FA]'
                : 'border-zinc-200 bg-white hover:border-zinc-300'
            }`}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${data.supportType === 'OFFLINE' ? 'bg-[#1D79C5] text-white' : 'bg-zinc-100 text-slate-500'}`}>
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className={`font-bold ${data.supportType === 'OFFLINE' ? 'text-[#1D79C5]' : 'text-[#0B2540]'}`}>Offline Support</div>
              <div className="text-xs text-slate-500 mt-1">On-site engineer deployment, hardware setup.</div>
              <div className="text-[#1D79C5] font-bold text-sm mt-2">₹199 / Assessment</div>
            </div>
          </button>
        </div>
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
          disabled={!data.name || !data.companyName || !data.phone || !data.email || !data.city || !data.country}
          className="px-8 py-3.5 rounded-full bg-[#1D79C5] text-white font-bold shadow-md hover:bg-[#15609e] transition-colors hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50 disabled:pointer-events-none flex items-center gap-2"
        >
          Review &amp; Submit <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function Step4({ data, setStep, onSubmit, onPrev, isSubmitting }: any) {
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
          disabled={isSubmitting}
          className="px-8 py-3.5 rounded-full bg-[#F2670E] text-white font-black shadow-lg hover:bg-[#d9590b] transition-colors hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-50 disabled:pointer-events-none flex items-center gap-2"
        >
          {isSubmitting ? (
            <>Processing... <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" /></>
          ) : (
            <>Submit Enquiry <CheckSquare className="w-4 h-4" /></>
          )}
        </button>
      </div>
    </div>
  );
}
