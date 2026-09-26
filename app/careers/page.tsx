"use client";

import { useState, useEffect } from 'react';
import Navbar from '@/components/site/Navbar';
import Footer from '@/components/site/Footer';
import { SectionHeader } from '@/components/ui/section-header';
import { Users, Plus, Minus, MapPin, Briefcase, GraduationCap, UploadCloud, X } from 'lucide-react';

const JOBS = [
  {
    t: 'LabVIEW Developer',
    skills: ['LabVIEW', 'DAQ', 'PXI / cDAQ / cRIO', 'Test Automation', 'Instrument Communication', 'OOP', 'DQMH', 'SQL', 'Industrial Communication'],
    res: ['Design and develop LabVIEW applications for test and measurement', 'Integrate DAQ, PXI, cDAQ and cRIO hardware and instruments', 'Implement database, reporting and communication interfaces', 'Support deployment, documentation and maintenance'],
    qual: ['Degree or diploma in engineering or a related field', 'Hands-on LabVIEW project experience; CLAD or CLD is an advantage']
  },
  {
    t: 'PLC Programmer',
    skills: ['PLC Programming', 'HMI', 'SCADA', 'Industrial Automation', 'Siemens / Mitsubishi / Rockwell / Schneider', 'Troubleshooting', 'Machine Automation'],
    res: ['Develop PLC logic, sequences, interlocks and alarms', 'Build HMI and SCADA screens', 'Commission and troubleshoot machines on site or remotely', 'Document programs and hand over to operations'],
    qual: ['Degree or diploma in electrical, instrumentation or automation engineering', 'Practical PLC programming experience on one or more major platforms']
  },
  {
    t: 'Software Developer',
    skills: ['Python', 'JavaScript / TypeScript', 'React', 'FastAPI', 'SQL / PostgreSQL', 'REST APIs', 'Git'],
    res: ['Build web applications, APIs and internal tools', 'Contribute to product development for RepairSync, VEST ERP and other platforms', 'Write tests and maintainable, documented code'],
    qual: ['Degree in computer science or a related field, or equivalent experience', 'Portfolio or project experience with modern web stacks']
  },
  {
    t: 'AI / ML Engineer',
    skills: ['Python', 'Machine Learning', 'Signal and time-series analysis', 'Computer Vision', 'Data pipelines', 'Model deployment'],
    res: ['Develop anomaly detection and predictive maintenance models', 'Build computer vision solutions for inspection', 'Deploy models alongside LabVIEW and cloud systems'],
    qual: ['Degree in a quantitative or engineering discipline', 'Experience taking a model from data to deployment']
  },
  {
    t: 'Mobile Application Developer',
    skills: ['Android', 'iOS', 'Cross-platform frameworks', 'REST APIs', 'UI implementation', 'App store release'],
    res: ['Develop and maintain mobile apps such as RepairSync', 'Integrate with cloud APIs and notifications', 'Prepare and publish app releases'],
    qual: ['Degree or equivalent experience', 'Published apps or demonstrable mobile projects']
  },
  {
    t: 'Structural Steel Detailer',
    skills: ['Structural steel detailing', 'Miscellaneous steel', 'Shop and erection drawings', 'BOM / material take-off', 'Connection detailing', 'Steel detailing standards'],
    res: ['Prepare shop and erection drawings from structural information', 'Detail connections, members and miscellaneous steel', 'Produce bills of materials and fabrication lists'],
    qual: ['Diploma or degree in civil, structural or mechanical engineering', 'Experience with a steel detailing software package']
  },
  {
    t: 'Civil / Structural Engineer',
    skills: ['Civil drawings', 'Structural documentation', 'Quantity take-off', 'BOQ / BOM support', 'Technical documentation', 'Coordination with project teams'],
    res: ['Prepare civil and structural engineering documents', 'Perform quantity take-off and material schedules', 'Coordinate deliverables with international project teams'],
    qual: ['Degree in civil or structural engineering', 'Clear written English and structured documentation skills']
  }
];

export default function CareersPage() {
  const [openJobIndex, setOpenJobIndex] = useState<number | null>(null);
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const toggleJob = (index: number) => {
    setOpenJobIndex(openJobIndex === index ? null : index);
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  const handleApply = (roleTitle: string) => {
    setSelectedRole(roleTitle);
    setIsModalOpen(true);
  };

  return (
    <div className="font-sans min-h-screen bg-white selection:bg-[#F2670E]/20">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(242,103,14,0.05)_0%,transparent_70%)] pointer-events-none" />
        <div className="mx-auto max-w-5xl px-6 relative z-10 text-center">
          <SectionHeader
            eyebrow="CAREERS"
            className="text-center items-center flex flex-col mb-10"
            title={
              <>
                Build the Future with <br className="hidden md:block" />
                VEST Solutions
              </>
            }
            description="Work on engineering, automation and technology projects that solve real-world problems."
          />
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => {
                setSelectedRole('');
                setIsModalOpen(true);
              }}
              className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-[15px] font-bold transition-all border border-zinc-300 text-[#0B2540] hover:text-[#F2670E] hover:border-[#F2670E] hover:-translate-y-1"
            >
              <UploadCloud size={18} />
              Send Your Resume
            </button>
            <button
              onClick={() => document.getElementById('open-roles')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-[15px] font-bold transition-all border border-zinc-300 text-[#0B2540] hover:text-[#F2670E] hover:border-[#F2670E] hover:-translate-y-1"
            >
              Explore Available Roles
            </button>
          </div>
        </div>
      </section>

      {/* Open Roles Section */}
      <section id="open-roles" className="py-24 relative z-10">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-[#0B2540] mb-4">Available Roles</h2>
            <p className="text-zinc-500 font-medium max-w-2xl mx-auto">
              Role details, locations and employment terms are confirmed in each posting. Salary information is shared during the hiring process.
            </p>
          </div>

          <div className="space-y-4">
            {JOBS.map((job, index) => {
              const isOpen = openJobIndex === index;

              return (
                <div
                  key={index}
                  className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${isOpen ? 'border-[#F2670E]/30 shadow-lg shadow-[#F2670E]/5' : 'border-zinc-200 hover:border-zinc-300 hover:shadow-md'
                    }`}
                >
                  <button
                    onClick={() => toggleJob(index)}
                    className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 focus:outline-none group"
                  >
                    <h3 className={`text-xl font-bold transition-colors ${isOpen ? 'text-[#F2670E]' : 'text-[#0B2540] group-hover:text-[#F2670E]'}`}>
                      {job.t}
                    </h3>
                    <div className={`p-2 rounded-full transition-colors ${isOpen ? 'bg-[#F2670E]/10 text-[#F2670E]' : 'bg-zinc-100 text-zinc-500'}`}>
                      {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                    </div>
                  </button>

                  <div
                    className={`px-6 transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[1000px] opacity-100 pb-6' : 'max-h-0 opacity-0 pb-0'
                      }`}
                  >
                    {/* Meta info */}
                    <div className="flex flex-wrap gap-4 pt-2 pb-6 mb-6 border-b border-zinc-100 text-sm">
                      <div className="flex items-center gap-1.5 text-zinc-600 bg-zinc-50 px-3 py-1.5 rounded-lg font-medium">
                        <MapPin size={16} className="text-zinc-400" />
                        Location: <span className="text-[#0B2540]">Confirmed in posting</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-zinc-600 bg-zinc-50 px-3 py-1.5 rounded-lg font-medium">
                        <Briefcase size={16} className="text-zinc-400" />
                        Employment type: <span className="text-[#0B2540]">Confirmed in posting</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-zinc-600 bg-zinc-50 px-3 py-1.5 rounded-lg font-medium">
                        <GraduationCap size={16} className="text-zinc-400" />
                        Experience: <span className="text-[#0B2540]">Confirmed in posting</span>
                      </div>
                    </div>

                    <div className="mb-8">
                      <h4 className="text-[13px] font-bold text-zinc-400 uppercase tracking-wider mb-3">Required Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {job.skills.map(skill => (
                          <span key={skill} className="px-3 py-1 rounded-full bg-zinc-100 text-zinc-700 text-sm font-medium border border-zinc-200">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                      <div>
                        <h4 className="text-[13px] font-bold text-zinc-400 uppercase tracking-wider mb-4">Responsibilities</h4>
                        <ul className="space-y-3">
                          {job.res.map((res, i) => (
                            <li key={i} className="flex items-start gap-3 text-zinc-600 text-[15px] leading-relaxed">
                              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-black shrink-0" />
                              {res}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-[13px] font-bold text-zinc-400 uppercase tracking-wider mb-4">Qualifications</h4>
                        <ul className="space-y-3">
                          {job.qual.map((qual, i) => (
                            <li key={i} className="flex items-start gap-3 text-zinc-600 text-[15px] leading-relaxed">
                              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-black shrink-0" />
                              {qual}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-zinc-100">
                      <button
                        onClick={() => {
                          setSelectedRole('');
                          setIsModalOpen(true);
                        }}
                        className="inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-bold transition-all border border-zinc-300 text-[#0B2540] hover:text-[#F2670E] hover:border-[#F2670E] hover:-translate-y-0.5"
                      >
                        <UploadCloud size={15} />
                        Send Your Resume
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Resume Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/40 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-5xl bg-white rounded-[2rem] shadow-2xl p-5 md:p-6 my-2 border border-zinc-100">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 p-2 rounded-full hover:bg-zinc-100 text-zinc-400 hover:text-zinc-600 transition-colors"
            >
              <X size={24} />
            </button>
            <div className="grid md:grid-cols-2 gap-8 items-start">

              <div>
                {/* <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#F2670E]/10 text-[#F2670E] mb-4">
                <UploadCloud size={20} />
              </div> */}
                <h2 className="text-3xl md:text-4xl font-black text-[#0B2540] mb-3 mt-4 leading-tight">
                  Send your <br />resume
                </h2>
                <p className="text-[14px] text-zinc-500 mb-5 leading-relaxed font-medium">
                  Do not see a role that fits? Send your resume and tell us about your experience. We will keep it on file for relevant openings.
                </p>

                <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-200">
                  <h4 className="font-bold text-[#0B2540] mb-2">What happens next?</h4>
                  <p className="text-sm text-zinc-500">
                    Our hiring team reviews applications on a rolling basis. If your profile matches an open role, we will reach out to schedule an initial conversation.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-5 border border-zinc-200 shadow-xl shadow-black/[0.03]">
                <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <label className="block text-sm font-bold text-[#0B2540] mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      autoComplete="name"
                      className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-2 text-sm focus:border-[#F2670E] focus:outline-none focus:ring-2 focus:ring-[#F2670E]/20 transition-all text-[#0B2540] font-medium"
                      placeholder="Name"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-bold text-[#0B2540] mb-1">Email *</label>
                      <input
                        type="email"
                        required
                        autoComplete="email"
                        className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-2 text-sm focus:border-[#F2670E] focus:outline-none focus:ring-2 focus:ring-[#F2670E]/20 transition-all text-[#0B2540] font-medium"
                        placeholder="Vest@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-[#0B2540] mb-1">Phone</label>
                      <input
                        type="tel"
                        autoComplete="tel"
                        className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-2 text-sm focus:border-[#F2670E] focus:outline-none focus:ring-2 focus:ring-[#F2670E]/20 transition-all text-[#0B2540] font-medium"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-bold text-[#0B2540] mb-1">Role of Interest *</label>
                      <select
                        required
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e.target.value)}
                        className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-2 text-sm focus:border-[#F2670E] focus:outline-none focus:ring-2 focus:ring-[#F2670E]/20 transition-all text-[#0B2540] font-medium appearance-none"
                        style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em', paddingRight: '2.5rem' }}
                      >
                        <option value="" disabled>Select a role...</option>
                        {JOBS.map(j => (
                          <option key={j.t} value={j.t}>{j.t}</option>
                        ))}
                        <option value="Other">Other / Open Application</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-[#0B2540] mb-1">Experience (Years) *</label>
                      <input
                        type="text"
                        required
                        className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-2 text-sm focus:border-[#F2670E] focus:outline-none focus:ring-2 focus:ring-[#F2670E]/20 transition-all text-[#0B2540] font-medium"
                        placeholder="e.g. 3.5 Years"
                      />
                    </div>
                  </div>

                  {selectedRole === 'Other' && (
                    <div className="animate-in fade-in slide-in-from-top-1 duration-200">
                      <label className="block text-sm font-bold text-[#0B2540] mb-1">Specify Role *</label>
                      <input
                        type="text"
                        required
                        className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-2 text-sm focus:border-[#F2670E] focus:outline-none focus:ring-2 focus:ring-[#F2670E]/20 transition-all text-[#0B2540] font-medium"
                        placeholder="What role are you applying for?"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-bold text-[#0B2540] mb-1">Message</label>
                    <textarea
                      rows={2}
                      className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-2 text-sm focus:border-[#F2670E] focus:outline-none focus:ring-2 focus:ring-[#F2670E]/20 transition-all text-[#0B2540] font-medium resize-none"
                      placeholder="Tell us about yourself..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-[#0B2540] mb-1">Resume (PDF or DOC)</label>
                    <div className="mt-1 flex justify-center rounded-xl border border-dashed border-zinc-300 px-6 py-4 hover:bg-zinc-50 transition-colors">
                      <div className="text-center">
                        <UploadCloud className="mx-auto h-6 w-6 text-zinc-400 mb-2" />
                        <div className="flex text-sm text-zinc-600 justify-center">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer rounded-md font-bold text-[#F2670E] hover:text-[#0B2540] transition-colors focus-within:outline-none"
                          >
                            <span>Upload a file</span>
                            <input id="file-upload" name="files" type="file" accept=".pdf,.doc,.docx" className="sr-only" />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-[11px] text-zinc-500 mt-1">PDF, DOC, DOCX up to 10MB</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full rounded-xl py-3 text-[15px] font-bold transition-all bg-[#0B2540] text-white hover:bg-[#F2670E] shadow-lg hover:shadow-xl hover:-translate-y-1"
                    >
                      Send Your Resume
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
