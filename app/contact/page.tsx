"use client";

import React from "react";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import ContactHero from "./ContactHero";
import ContactCards from "./ContactCards";
import ContactForm from "./ContactForm";
import ContactMap from "./ContactMap";
import FloatingContact from "./FloatingContact";
import ContactCTA from "./ContactCTA";
import ContactCareers from "./ContactCareers";

export default function ContactPage() {
  return (
    <div className="font-sans min-h-screen flex flex-col bg-white relative">
      <Navbar />
      
      <main className="flex-1 w-full pt-32 pb-24">
        {/* Hero Section */}
        <ContactHero />

        {/* Main Content Layout */}
        <section className="max-w-[1400px] mx-auto px-5 sm:px-8 mt-12 md:mt-24">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-24">
            {/* Left Side: Contact Info & Cards */}
            <div className="lg:col-span-5 h-full">
              <ContactCards />
            </div>

            {/* Right Side: Contact Form */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </section>

        {/* Map Section */}
        <ContactMap />

        {/* Careers / Send Resume Banner */}
        <ContactCareers />

        {/* Final CTA */}
        <ContactCTA />
      </main>

      <Footer />
      <FloatingContact />
    </div>
  );
}
