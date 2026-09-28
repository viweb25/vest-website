import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/site/Navbar';
import Footer from '@/components/site/Footer';

export const metadata: Metadata = {
  title: 'Terms & Conditions | VEST Solutions',
  description: 'Terms and Conditions for VEST Solutions Private Limited.',
};

const SECTIONS = [
  { id: 'about', title: '1. About VEST Solutions' },
  { id: 'website-use', title: '2. Website Use' },
  { id: 'information', title: '3. Website Information' },
  { id: 'enquiries', title: '4. Enquiries & Quotations' },
  { id: 'services', title: '5. Engineering & Technical Services' },
  { id: 'third-party', title: '6. Third-Party Technologies' },
  { id: 'ip', title: '7. Intellectual Property' },
  { id: 'confidentiality', title: '8. Confidentiality' },
  { id: 'client-resp', title: '9. Client Responsibilities' },
  { id: 'payments', title: '10. Payments & Commercial Terms' },
  { id: 'delivery', title: '11. Delivery & Timelines' },
  { id: 'acceptance', title: '12. Testing & Acceptance' },
  { id: 'warranties', title: '13. Warranties & Support' },
  { id: 'liability', title: '14. Limitation of Liability' },
  { id: 'force-majeure', title: '15. Force Majeure' },
  { id: 'third-party-links', title: '16. Links to Other Sites' },
  { id: 'privacy', title: '17. Privacy' },
  { id: 'changes', title: '18. Changes to These Terms' },
  { id: 'termination', title: '19. Termination' },
  { id: 'governing-law', title: '20. Governing Law' },
  { id: 'severability', title: '21. Severability' },
  { id: 'entire-agreement', title: '22. Entire Agreement' },
  { id: 'contact', title: '23. Contact Us' },
];

export default function TermsAndConditionsPage() {
  return (
    <div className="bg-slate-50/60 min-h-screen flex flex-col font-sans selection:bg-[#d4ff00] selection:text-black">
      {/* Sticky Navbar */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-zinc-200/80">
        <Navbar />
      </header>

      <main className="flex-1 pt-32 pb-24 md:pt-36 md:pb-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          {/* Header Banner */}
          <div className="mb-14 pt-4 md:pt-8 text-zinc-950">
            <div className="max-w-2xl">
              <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">
                Legal Documentation
              </p>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight uppercase leading-none text-black">
                Terms &amp; Conditions
              </h1>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

            {/* Quick Navigation - Sticky Sidebar */}
            <aside className="hidden lg:block lg:col-span-4 sticky top-28 bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-sm max-h-[calc(100vh-8rem)] overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4">
                On this page
              </p>
              <nav className="space-y-1 text-sm">
                {SECTIONS.map((sec) => (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    className="block py-1.5 px-3 rounded-lg text-zinc-600 hover:text-orange-600 hover:bg-orange-50/60 font-medium transition"
                  >
                    {sec.title}
                  </a>
                ))}
              </nav>
            </aside>

            {/* Document Body */}
            <article className="lg:col-span-8 bg-white border border-zinc-200/80 rounded-3xl p-8 md:p-12 shadow-sm space-y-12">

              {/* Intro section */}
              <div className="border-b border-zinc-100 pb-8 space-y-4 text-zinc-700 leading-relaxed text-base md:text-lg">
                <p>
                  Welcome to <strong className="text-zinc-950 font-bold">VEST Solutions Private Limited</strong> (&quot;VEST Solutions&quot;, &quot;VEST&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;). These Terms &amp; Conditions govern your access to and use of our website, <strong className="text-zinc-950">vestsolution.com</strong>, and the services, information, and materials made available through the website.
                </p>
                <p>
                  By accessing or using this website, submitting an enquiry, requesting a quotation, or engaging with our services, you acknowledge that you have read, understood, and agreed to these Terms &amp; Conditions.
                </p>
                <p className="text-sm text-zinc-500 bg-amber-50/70 border border-amber-200/60 rounded-xl p-4">
                  If you do not agree with any part of these terms, please discontinue use of the website immediately.
                </p>
              </div>

              {/* 1. About */}
              <section id="about" className="scroll-mt-28 space-y-4">
                <h2 className="text-xl md:text-2xl font-black text-zinc-950 tracking-tight">1. About VEST Solutions</h2>
                <p className="text-zinc-700 leading-relaxed">
                  VEST Solutions Private Limited provides engineering, industrial systems, intelligent automation, software, AI, cloud, testing, measurement, and related technology solutions.
                </p>
                <p className="text-zinc-700 font-medium">Our capabilities include:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-zinc-600">
                  {[
                    'Civil and structural engineering',
                    'Steel detailing and engineering documentation',
                    'Shop drawings and Bill of Materials (BOM)',
                    'Industrial automation solutions',
                    'LabVIEW development and integration',
                    'PLC, DAQ, HIL and machine testing solutions',
                    'Industrial monitoring and measurement systems',
                    'Intelligent automation and predictive solutions',
                    'Software and application development',
                    'Mobile and web application development',
                    'Cloud and API-based solutions',
                    'Artificial Intelligence and computer vision solutions',
                    'Data, analytics and digital platforms',
                    'Engineering consulting and technical support',
                  ].map((cap, i) => (
                    <div key={i} className="flex items-center gap-2 p-2.5 rounded-lg bg-zinc-50 border border-zinc-100">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-zinc-500 italic mt-3">
                  The actual scope, deliverables, timelines, specifications, commercial terms, and responsibilities for a project will be defined separately through a quotation, proposal, Statement of Work (SOW), purchase order, or written agreement.
                </p>
              </section>

              {/* 2. Website Use */}
              <section id="website-use" className="scroll-mt-28 space-y-4">
                <h2 className="text-xl md:text-2xl font-black text-zinc-950 tracking-tight">2. Website Use</h2>
                <p className="text-zinc-700 leading-relaxed">
                  You may use this website only for lawful purposes and in accordance with these Terms. You agree not to:
                </p>
                <ul className="space-y-2 text-zinc-600 text-sm md:text-base list-disc list-inside marker:text-orange-500">
                  <li>Use the website for fraudulent, unlawful, or unauthorized purposes.</li>
                  <li>Attempt to gain unauthorized access to our systems, servers, databases, or networks.</li>
                  <li>Introduce malicious software, viruses, or harmful code.</li>
                  <li>Copy, reproduce, modify, distribute, or commercially exploit website content without written permission.</li>
                  <li>Interfere with the security, functionality, or operation of the website.</li>
                  <li>Use automated systems or scraping tools to collect website content without prior written authorization.</li>
                  <li>Misrepresent your identity or affiliation when communicating with VEST Solutions.</li>
                </ul>
              </section>

              {/* 3. Website Information */}
              <section id="information" className="scroll-mt-28 space-y-4">
                <h2 className="text-xl md:text-2xl font-black text-zinc-950 tracking-tight">3. Website Information</h2>
                <p className="text-zinc-700 leading-relaxed">
                  The information published on this website is provided for general informational and business purposes. While VEST Solutions makes reasonable efforts to maintain accurate and current information, we do not guarantee that all website content will always be complete, accurate, current, or free from errors.
                </p>
                <p className="text-zinc-700 leading-relaxed">
                  Technical information, service descriptions, project information, and specifications may be updated or changed without prior notice and should not be considered a substitute for project-specific engineering analysis.
                </p>
              </section>

              {/* 4. Enquiries & Quotations */}
              <section id="enquiries" className="scroll-mt-28 space-y-4">
                <h2 className="text-xl md:text-2xl font-black text-zinc-950 tracking-tight">4. Project Enquiries and Quotations</h2>
                <p className="text-zinc-700 leading-relaxed">
                  Submitting an enquiry through the website does not automatically create a contractual relationship. A project will be considered formally accepted only after technical and commercial terms are mutually agreed upon in writing.
                </p>
              </section>

              {/* 5. Services */}
              <section id="services" className="scroll-mt-28 space-y-4">
                <h2 className="text-xl md:text-2xl font-black text-zinc-950 tracking-tight">5. Engineering and Technical Services</h2>
                <p className="text-zinc-700 leading-relaxed">
                  Solutions are developed based on inputs, drawings, and specifications provided by the client. The client is responsible for providing complete and accurate information. Changes after commencement may require adjustments to scope, delivery schedules, and commercial terms.
                </p>
              </section>

              {/* 6. Third-Party Technologies */}
              <section id="third-party" className="scroll-mt-28 space-y-4">
                <h2 className="text-xl md:text-2xl font-black text-zinc-950 tracking-tight">6. Third-Party Technologies and Services</h2>
                <p className="text-zinc-700 leading-relaxed">
                  VEST Solutions may integrate third-party hardware, software, APIs, or cloud platforms. The performance, licensing, and availability of these components remain under the control of their respective providers.
                </p>
              </section>

              {/* 7. IP */}
              <section id="ip" className="scroll-mt-28 space-y-4">
                <h2 className="text-xl md:text-2xl font-black text-zinc-950 tracking-tight">7. Intellectual Property</h2>
                <p className="text-zinc-700 leading-relaxed">
                  All intellectual property contained on this website (branding, code, graphics, documentation, methodologies) belongs to VEST Solutions or its licensors. Deliverables for client engagements are governed by separate project contracts.
                </p>
              </section>

              {/* 8. Confidentiality */}
              <section id="confidentiality" className="scroll-mt-28 space-y-4">
                <h2 className="text-xl md:text-2xl font-black text-zinc-950 tracking-tight">8. Confidentiality</h2>
                <p className="text-zinc-700 leading-relaxed">
                  Both parties agree to use reasonable care to protect confidential and proprietary information shared during consultations or project executions, subject to standard non-disclosure practices.
                </p>
              </section>

              {/* 9. Client Responsibilities */}
              <section id="client-resp" className="scroll-mt-28 space-y-4">
                <h2 className="text-xl md:text-2xl font-black text-zinc-950 tracking-tight">9. Client Responsibilities</h2>
                <ul className="space-y-2 text-zinc-600 text-sm md:text-base list-disc list-inside marker:text-orange-500">
                  <li>Providing accurate project data, drawings, and requirements.</li>
                  <li>Providing timely approvals, site access, system credentials, and feedback.</li>
                  <li>Complying with necessary safety, statutory, and operational regulations.</li>
                </ul>
              </section>

              {/* 10. Payments */}
              <section id="payments" className="scroll-mt-28 space-y-4">
                <h2 className="text-xl md:text-2xl font-black text-zinc-950 tracking-tight">10. Payments and Commercial Terms</h2>
                <p className="text-zinc-700 leading-relaxed">
                  Pricing, milestone schedules, statutory taxes, and invoice terms will be specified in the formal quotation or agreement. Scope expansions will be billed separately.
                </p>
              </section>

              {/* 11. Delivery */}
              <section id="delivery" className="scroll-mt-28 space-y-4">
                <h2 className="text-xl md:text-2xl font-black text-zinc-950 tracking-tight">11. Delivery and Timelines</h2>
                <p className="text-zinc-700 leading-relaxed">
                  Timelines are planned estimates dependent on component availability, client approvals, and environmental conditions. VEST Solutions is not liable for delays outside its direct control.
                </p>
              </section>

              {/* 12 - 19 Summarized Group */}
              <section id="acceptance" className="scroll-mt-28 space-y-4">
                <h2 className="text-xl md:text-2xl font-black text-zinc-950 tracking-tight">12. Testing, Commissioning and Acceptance</h2>
                <p className="text-zinc-700 leading-relaxed">
                  Deliverables will undergo testing as per defined acceptance criteria. Deliverables are considered accepted if no written non-conformities are raised during the agreed validation window.
                </p>
              </section>

              <section id="warranties" className="scroll-mt-28 space-y-4">
                <h2 className="text-xl md:text-2xl font-black text-zinc-950 tracking-tight">13. Warranties and Support</h2>
                <p className="text-zinc-700 leading-relaxed">
                  Support and post-delivery warranties are defined solely in project-specific contracts. No implied warranties arise from general website material.
                </p>
              </section>

              <section id="liability" className="scroll-mt-28 space-y-4">
                <h2 className="text-xl md:text-2xl font-black text-zinc-950 tracking-tight">14. Limitation of Liability</h2>
                <p className="text-zinc-700 leading-relaxed">
                  To the maximum extent permitted by law, VEST Solutions will not be liable for any indirect, special, consequential, or business loss resulting from the use of our website or services.
                </p>
              </section>

              <section id="force-majeure" className="scroll-mt-28 space-y-4">
                <h2 className="text-xl md:text-2xl font-black text-zinc-950 tracking-tight">15. Force Majeure</h2>
                <p className="text-zinc-700 leading-relaxed">
                  We are not responsible for delays or failures caused by natural disasters, telecommunications blackouts, industrial disputes, or circumstances beyond reasonable human control.
                </p>
              </section>

              <section id="third-party-links" className="scroll-mt-28 space-y-4">
                <h2 className="text-xl md:text-2xl font-black text-zinc-950 tracking-tight">16. Links to Third-Party Websites</h2>
                <p className="text-zinc-700 leading-relaxed">
                  External links are provided strictly for convenience. We do not endorse or take responsibility for external third-party sites or their privacy practices.
                </p>
              </section>

              <section id="privacy" className="scroll-mt-28 space-y-4">
                <h2 className="text-xl md:text-2xl font-black text-zinc-950 tracking-tight">17. Privacy</h2>
                <p className="text-zinc-700 leading-relaxed">
                  Your website usage is also covered by our <Link href="/privacy" className="text-orange-600 font-semibold underline decoration-2 underline-offset-4">Privacy Policy</Link>, detailing data handling and compliance.
                </p>
              </section>

              <section id="changes" className="scroll-mt-28 space-y-4">
                <h2 className="text-xl md:text-2xl font-black text-zinc-950 tracking-tight">18. Changes to These Terms</h2>
                <p className="text-zinc-700 leading-relaxed">
                  We reserve the right to amend these terms at any time. Changes become effective immediately upon being posted to this page.
                </p>
              </section>

              <section id="termination" className="scroll-mt-28 space-y-4">
                <h2 className="text-xl md:text-2xl font-black text-zinc-950 tracking-tight">19. Termination</h2>
                <p className="text-zinc-700 leading-relaxed">
                  Access to the website may be terminated without prior notice if fraudulent activity, misuse, or security infringements are detected.
                </p>
              </section>

              <section id="governing-law" className="scroll-mt-28 space-y-4">
                <h2 className="text-xl md:text-2xl font-black text-zinc-950 tracking-tight">20. Governing Law and Jurisdiction</h2>
                <p className="text-zinc-700 leading-relaxed">
                  These terms are governed exclusively by the laws of <strong className="text-zinc-900">India</strong>, and any legal disputes will fall under the jurisdiction of competent courts local to VEST Solutions Private Limited.
                </p>
              </section>

              <section id="severability" className="scroll-mt-28 space-y-4">
                <h2 className="text-xl md:text-2xl font-black text-zinc-950 tracking-tight">21. Severability</h2>
                <p className="text-zinc-700 leading-relaxed">
                  If any provision of these terms is deemed unenforceable, all remaining clauses shall persist in full force and effect.
                </p>
              </section>

              <section id="entire-agreement" className="scroll-mt-28 space-y-4">
                <h2 className="text-xl md:text-2xl font-black text-zinc-950 tracking-tight">22. Entire Agreement</h2>
                <p className="text-zinc-700 leading-relaxed">
                  These terms represent the complete agreement for site visitors. Separate written client contracts and SOWs supersede these terms for specific engagements.
                </p>
              </section>

              {/* 23. Contact Card */}
              <section id="contact" className="scroll-mt-28">
                <div className="rounded-2xl border border-zinc-200 bg-gradient-to-br from-zinc-50 to-white p-8">
                  <h3 className="text-xl font-bold text-zinc-900 mb-2">23. Contact Us</h3>
                  <p className="text-zinc-600 mb-6 leading-relaxed">
                    If you have questions regarding these Terms &amp; Conditions or our services, please reach out to us:
                  </p>

                  <div className="space-y-1 text-sm text-zinc-700">
                    <p className="font-bold text-zinc-900">VEST Solutions Private Limited</p>
                    <p>
                      Official Website:{' '}
                      <a href="https://vestsolution.com" className="text-orange-600 font-semibold hover:underline">
                        vestsolution.com
                      </a>
                    </p>
                  </div>

                  <div className="mt-8 pt-6 border-t border-zinc-200/80 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-zinc-400 font-medium">
                    <span>Engineering precision. Industrial intelligence. Digital innovation.</span>
                    <span>&copy; 2026 VEST Solutions. All Rights Reserved.</span>
                  </div>
                </div>
              </section>

            </article>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}