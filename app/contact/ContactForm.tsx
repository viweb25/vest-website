"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const SUBJECTS = [
  "Repair Quote Request",
  "General Enquiry",
  "Technical Support",
  "Partnership / AMC",
  "Other"
];

export default function ContactForm() {
  const [formData, setFormData] = useState({
    company: "",
    phone: "",
    email: "",
    subject: "",
    message: ""
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [focused, setFocused] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) * 0.2;
    const y = (e.clientY - top - height / 2) * 0.2;
    setButtonPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setButtonPosition({ x: 0, y: 0 });
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.company.trim()) newErrors.company = "Please enter your company name.";
    if (!formData.phone.trim()) newErrors.phone = "Please enter your phone number.";
    else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone)) newErrors.phone = "Please enter a valid phone number.";
    
    if (!formData.email.trim()) newErrors.email = "Please enter your email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Please enter a valid email address.";
    
    if (!formData.subject) newErrors.subject = "Please select a subject.";
    if (!formData.message.trim()) newErrors.message = "Please enter your message.";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    if (!validate()) return;
    
    setStatus("submitting");
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || "Failed to send message. Please try again later.");
      }
      
      setStatus("success");
    } catch (error: any) {
      setSubmitError(error.message || "An unexpected error occurred.");
      setStatus("idle");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors(prev => ({ ...prev, [e.target.name]: "" }));
    }
  };

  return (
    <div className="bg-white rounded-[2rem] border border-zinc-200 shadow-sm p-8 sm:p-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/50 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
      
      <div className="relative z-10">
        <h3 className="text-2xl sm:text-3xl font-black text-[#0B2540] mb-3">START A CONVERSATION</h3>
        <p className="text-slate-500 font-medium text-sm sm:text-base mb-10">
          Tell us a little about your project and our team will get back to you.
        </p>

        {status === "success" ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-3xl font-black text-[#0B2540] mb-4">Message Sent!</h4>
            <p className="text-slate-500 max-w-sm mb-8">
              Thank you for reaching out. Our engineering team will review your message and contact you shortly.
            </p>
            <button 
              onClick={() => { setStatus("idle"); setSubmitError(null); setFormData({ company: "", phone: "", email: "", subject: "", message: "" }); }}
              className="px-8 py-3 rounded-full bg-[#1D79C5] text-white font-bold hover:bg-[#15609e] transition-colors"
            >
              Send Another Message
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <InputField 
                label="Company *" 
                name="company" 
                value={formData.company} 
                onChange={handleChange} 
                error={errors.company} 
                focused={focused === "company"}
                onFocus={() => setFocused("company")}
                onBlur={() => setFocused(null)}
              />
              <InputField 
                label="Phone *" 
                name="phone" 
                type="tel"
                value={formData.phone} 
                onChange={handleChange} 
                error={errors.phone} 
                focused={focused === "phone"}
                onFocus={() => setFocused("phone")}
                onBlur={() => setFocused(null)}
              />
            </div>

            <InputField 
              label="Email *" 
              name="email" 
              type="email"
              value={formData.email} 
              onChange={handleChange} 
              error={errors.email} 
              focused={focused === "email"}
              onFocus={() => setFocused("email")}
              onBlur={() => setFocused(null)}
            />

            {/* Custom Dropdown */}
            <div className="relative">
              <label className={cn("block text-xs font-bold mb-2 transition-colors", focused === "subject" ? "text-[#1D79C5]" : "text-zinc-500")}>
                Subject *
              </label>
              <div 
                className={cn(
                  "w-full px-5 py-4 rounded-xl border bg-zinc-50/50 cursor-pointer transition-all duration-300 flex justify-between items-center",
                  focused === "subject" || dropdownOpen ? "border-[#1D79C5] bg-white ring-4 ring-[#1D79C5]/10 shadow-sm" : "border-zinc-200 hover:border-zinc-300",
                  errors.subject && !dropdownOpen ? "border-red-400 bg-red-50/30" : ""
                )}
                onClick={() => { setDropdownOpen(!dropdownOpen); setFocused("subject"); }}
              >
                <span className={formData.subject ? "text-[#0B2540] font-medium" : "text-zinc-400"}>
                  {formData.subject || "Select a subject"}
                </span>
                <svg className={cn("w-4 h-4 transition-transform duration-300", dropdownOpen ? "rotate-180" : "")} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
              
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 w-full mt-2 bg-white border border-zinc-200 rounded-xl shadow-xl z-20 overflow-hidden"
                  >
                    {SUBJECTS.map(s => (
                      <div 
                        key={s} 
                        className="px-5 py-3 hover:bg-zinc-50 cursor-pointer font-medium text-slate-700 transition-colors"
                        onClick={() => { setFormData(prev => ({ ...prev, subject: s })); setDropdownOpen(false); setErrors(prev => ({ ...prev, subject: "" })); }}
                      >
                        {s}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
              
              <AnimatePresence>
                {errors.subject && !dropdownOpen && (
                  <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="text-red-500 text-xs font-bold mt-2">
                    {errors.subject}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Message Area */}
            <div>
              <label className={cn("block text-xs font-bold mb-2 transition-colors", focused === "message" ? "text-[#1D79C5]" : "text-zinc-500")}>
                Message *
              </label>
              <textarea 
                name="message"
                rows={5}
                className={cn(
                  "w-full px-5 py-4 rounded-xl border bg-zinc-50/50 outline-none transition-all duration-300 resize-none font-medium text-[#0B2540]",
                  focused === "message" ? "border-[#1D79C5] bg-white ring-4 ring-[#1D79C5]/10 shadow-sm" : "border-zinc-200 hover:border-zinc-300",
                  errors.message && focused !== "message" ? "border-red-400 bg-red-50/30" : ""
                )}
                value={formData.message}
                onChange={handleChange}
                onFocus={() => setFocused("message")}
                onBlur={() => setFocused(null)}
              />
              <AnimatePresence>
                {errors.message && (
                  <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="text-red-500 text-xs font-bold mt-2">
                    {errors.message}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <AnimatePresence>
                {submitError && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0, y: -10 }} 
                    className="mb-6 p-4 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-xl"
                  >
                    {submitError}
                  </motion.div>
                )}
              </AnimatePresence>
              
              <motion.button
                ref={buttonRef}
                type="submit"
                disabled={status === "submitting"}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                animate={{ x: buttonPosition.x, y: buttonPosition.y }}
                transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
                className={cn(
                  "group inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 border border-zinc-300 text-[#0B2540] font-black transition-all hover:text-[#F2670E] hover:border-[#F2670E] hover:-translate-y-0.5 w-full sm:w-auto",
                  status === "submitting" ? "opacity-60 cursor-wait" : ""
                )}
              >
                {status === "submitting" ? (
                  <>
                    <div className="w-4 h-4 border-2 border-zinc-300 border-t-[#F2670E] rounded-full animate-spin" />
                    SENDING...
                  </>
                ) : (
                  <>
                    SEND MESSAGE <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </>
                )}
              </motion.button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

function InputField({ label, name, type = "text", value, onChange, error, focused, onFocus, onBlur }: any) {
  return (
    <div>
      <label className={cn(
        "block text-xs font-bold mb-2 transition-colors",
        focused ? "text-[#1D79C5]" : "text-zinc-500"
      )}>
        {label}
      </label>
      <input 
        type={type}
        name={name}
        className={cn(
          "w-full px-5 py-4 rounded-xl border bg-zinc-50/50 outline-none transition-all duration-300 font-medium text-[#0B2540]",
          focused ? "border-[#1D79C5] bg-white ring-4 ring-[#1D79C5]/10 shadow-sm" : "border-zinc-200 hover:border-zinc-300",
          error && !focused ? "border-red-400 bg-red-50/30" : ""
        )}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      <AnimatePresence>
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -5 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -5 }} 
            className="text-red-500 text-xs font-bold mt-2"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
