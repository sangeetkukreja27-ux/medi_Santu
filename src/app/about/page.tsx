"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import TrustBadges from "@/components/TrustBadges";
import { 
  ShieldAlert, 
  Globe, 
  Lock, 
  Headphones, 
  Target, 
  Eye, 
  Heart,
  Award,
  TrendingUp,
  AwardIcon,
  Smile,
  CheckCircle,
  Clock,
  ArrowRight,
  MessageSquare
} from "lucide-react";

export default function AboutUs() {
  const [settings, setSettings] = useState({
    title: "About Us",
    heroSubtitle: "Trusted by healthcare. Chosen worldwide.",
    description: "trustedmedshop is a global pharmaceutical company specialized in the import and export of high-quality, authentic medicines. We connect healthcare with trust, delivering life-saving medicines to 107+ countries.",
    imageCorporate: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&auto=format&fit=crop&q=60",
    imageScientist: "https://images.unsplash.com/photo-1532187643603-ba119ca4109e?w=400&auto=format&fit=crop&q=60",
    mission: "To make quality medicines accessible worldwide by delivering authentic, affordable, and reliable pharmaceutical solutions through ethical business practices and dependable service.",
    vision: "To be the most trusted global partner in pharmaceutical export-import, recognized for our integrity, quality, and commitment to improving global healthcare.",
    values: [
      "Quality & Safety First",
      "Integrity & Transparency",
      "Customer-Centric",
      "Global Responsibility"
    ],
    whyChooseBullets: [
      "Genuine medicines sourced directly from approved manufacturers.",
      "Highly competitive prices with bulk sourcing discounts.",
      "Safe, discrete, and regulatory-compliant temperature-stable packaging.",
      "Fast, tracked, and reliable worldwide shipping solutions.",
      "Dedicated 24/7 customer support from clinical specialists."
    ],
    quoteText: "Our commitment is to deliver not just medicines, but trust, care, and better health for all.",
    quoteAuthor: "— trustedmedshop Team",
    quoteTitle: "Global Sourcing Division",
    statCountries: "107+",
    statProducts: "500+",
    statClients: "100+",
    statYears: "10+",
    statDelivery: "99.8%"
  });

  useEffect(() => {
    fetch("/api/cms")
      .then(res => res.json())
      .then(data => {
        if (data.success && data.cms?.about) {
          setSettings(data.cms.about);
        }
      })
      .catch(err => console.error(err));
  }, []);

  const highlights = [
    {
      icon: <ShieldAlert className="w-6 h-6 text-[#00A877]" />,
      title: "Authentic Medicines"
    },
    {
      icon: <Globe className="w-6 h-6 text-[#00A877]" />,
      title: "Global Reach"
    },
    {
      icon: <Lock className="w-6 h-6 text-[#00A877]" />,
      title: "Secure & Safe"
    },
    {
      icon: <Headphones className="w-6 h-6 text-[#00A877]" />,
      title: "Dedicated Support"
    }
  ];

  const stats = [
    { value: settings.statCountries || "107+", label: "Countries Served" },
    { value: settings.statProducts || "500+", label: "Products Available" },
    { value: settings.statClients || "100+", label: "Happy Clients" },
    { value: settings.statYears || "10+", label: "Years of Experience" },
    { value: settings.statDelivery || "99.8%", label: "On-Time Delivery" }
  ];

  const certifications = [
    { name: "WHO-GMP", desc: "Certified" },
    { name: "ISO", desc: "9001:2015 Certified" },
    { name: "GDP", desc: "Good Distribution Practice" },
    { name: "HACCP", desc: "Food Safety Certified" },
    { name: "SSL", desc: "Secure & Encrypted Payments" }
  ];

  return (
    <div className="w-full flex flex-col bg-white font-sans">
      
      {/* Breadcrumbs & Title Banner */}
      <section className="bg-slate-50 border-b border-slate-100 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col gap-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
            <Link href="/" className="hover:text-[#005B41] transition-colors">Home</Link>
            <span>&gt;</span>
            <span className="text-slate-600">About Us</span>
          </div>
        </div>
      </section>

      {/* Main Profile Info Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Info Column */}
        <div className="lg:col-span-6 flex flex-col items-start gap-5 text-left">
          <h1 className="text-4xl sm:text-5xl font-black text-slate-800 tracking-tight leading-tight">
            About <span className="text-[#005B41]">trusted</span><span className="text-[#00A877]">medshop</span>
          </h1>
          
          <h2 className="text-[#00A877] text-lg sm:text-xl font-bold leading-normal">
            {settings.heroSubtitle}
          </h2>
          
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {settings.description}
          </p>
          
          {/* Highlights grid */}
          <div className="grid grid-cols-2 gap-4 w-full mt-2">
            {highlights.map((h, i) => (
              <div key={i} className="flex items-center gap-3.5 p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-[#F4F7F6]/50 transition-colors shadow-sm">
                <div className="bg-white p-2 rounded-lg shadow-sm">
                  {h.icon}
                </div>
                <span className="text-sm font-bold text-slate-700 tracking-wide">{h.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Corporate Image Column */}
        <div className="lg:col-span-6 relative w-full h-[320px] sm:h-[400px] rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-50">
          <img 
            src={settings.imageCorporate} 
            alt="Pharmaceutical corporate headquarters building"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b241e]/80 via-transparent to-transparent flex items-end p-6 sm:p-8">
            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl w-full">
              <div className="bg-[#00A877] p-2.5 rounded-xl text-white">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <div className="text-left text-white">
                <span className="block text-sm font-bold uppercase tracking-wider">Trusted Logistics Network</span>
                <span className="block text-xs text-slate-300">Fast temperature-stable transit</span>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* Mission, Vision, Values Cards Grid */}
      <section className="bg-slate-50 border-y border-slate-100 py-16 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Mission Card */}
          <div className="bg-white rounded-2xl p-7 border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center gap-4 group">
            <div className="bg-[#F4F7F6] p-4 rounded-full group-hover:bg-[#005B41]/10 transition-colors">
              <Target className="w-8 h-8 text-[#00A877]" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">Our Mission</h3>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
              {settings.mission}
            </p>
          </div>

          {/* Vision Card */}
          <div className="bg-white rounded-2xl p-7 border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center gap-4 group">
            <div className="bg-[#F4F7F6] p-4 rounded-full group-hover:bg-[#005B41]/10 transition-colors">
              <Eye className="w-8 h-8 text-[#00A877]" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">Our Vision</h3>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
              {settings.vision}
            </p>
          </div>

          {/* Values Card */}
          <div className="bg-white rounded-2xl p-7 border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center gap-4 group">
            <div className="bg-[#F4F7F6] p-4 rounded-full group-hover:bg-[#005B41]/10 transition-colors">
              <Heart className="w-8 h-8 text-[#00A877]" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">Our Values</h3>
            <div className="flex flex-col gap-2.5 text-left w-full max-w-[200px] mx-auto mt-1">
              {settings.values.map((val, vi) => (
                <div key={vi} className="flex items-center gap-2 text-slate-600 text-xs sm:text-sm font-semibold">
                  <CheckCircle className="w-4 h-4 text-[#00A877] flex-shrink-0" />
                  <span>{val}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Statistics Section (Teal Banner) */}
      <section className="w-full bg-[#005B41] text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-around items-center gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center flex flex-col gap-1 min-w-[140px]">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#00A877]">{stat.value}</span>
              <span className="text-xs sm:text-sm text-slate-300 font-semibold uppercase tracking-wider mt-1">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="flex flex-col items-center gap-3 mb-12">
          <span className="text-[#00A877] text-xs font-bold uppercase tracking-wider">Quality Assurance</span>
          <h2 className="text-3xl font-extrabold text-slate-800">Our Certifications</h2>
          <div className="h-1 w-16 bg-[#00A877] rounded-full mt-1"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8">
          {certifications.map((c, idx) => (
            <div key={idx} className="bg-slate-50 border border-slate-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col items-center justify-center gap-3 min-h-[140px]">
              <div className="bg-[#005B41] text-[#00A877] font-black text-lg py-2.5 px-4 rounded-xl border border-[#00A877]/10 flex items-center justify-center">
                {c.name}
              </div>
              <span className="text-xs font-bold text-slate-600 tracking-wide max-w-[120px] leading-snug">{c.desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us & Researcher Quote Section */}
      <section className="bg-slate-50 border-t border-slate-100 py-16 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Checkmarks */}
          <div className="lg:col-span-6 flex flex-col items-start text-left gap-5">
            <h2 className="text-3xl font-extrabold text-slate-800 leading-tight">
              Why Choose <span className="text-[#005B41]">trusted</span><span className="text-[#00A877]">medshop</span>?
            </h2>
            
            <div className="flex flex-col gap-4 mt-2">
              {[
                "Genuine medicines sourced directly from approved manufacturers.",
                "Highly competitive prices with bulk sourcing discounts.",
                "Safe, discrete, and regulatory-compliant temperature-stable packaging.",
                "Fast, tracked, and reliable worldwide shipping solutions.",
                "Dedicated 24/7 customer support from clinical specialists."
              ].map((bullet, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#00A877] mt-0.5 flex-shrink-0" />
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-semibold">{bullet}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Quote & Scientist Picture Column */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-12 gap-6 items-center bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-md">
            
            <div className="sm:col-span-5 relative h-48 w-full rounded-2xl overflow-hidden shadow-inner bg-slate-100">
              <img 
                src="https://images.unsplash.com/photo-1532187643603-ba119ca4109e?w=400&auto=format&fit=crop&q=60" 
                alt="Scientist inside chemical testing laboratory"
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="sm:col-span-7 flex flex-col text-left gap-4">
              <span className="text-[#00A877] text-4xl font-serif leading-none -mb-3 select-none">“</span>
              <p className="text-slate-600 text-sm sm:text-base italic leading-relaxed">
                Our commitment is to deliver not just medicines, but trust, care, and better health for all.
              </p>
              <div>
                <span className="block text-sm font-bold text-[#005B41]">— trustedmedshop Team</span>
                <span className="block text-[10px] uppercase font-bold tracking-wider text-slate-400 mt-0.5">Global Sourcing Division</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* CTA Box Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="bg-[#F4F7F6] border border-[#005B41]/10 rounded-3xl p-8 flex flex-col md:flex-row justify-between items-center gap-6 text-left">
          <div className="flex items-center gap-4">
            <div className="bg-[#005B41] p-3 rounded-full text-[#00A877] hidden sm:block">
              <Smile className="w-7 h-7 text-[#00A877]" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800">Have questions or need bulk supply?</h3>
              <p className="text-slate-500 text-xs sm:text-sm mt-1">Our dedicated team is ready to help you coordinate pricing and custom orders 24/7.</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <Link 
              href="/contact" 
              className="bg-[#005B41] hover:bg-[#004833] text-white px-6 py-3 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all shadow-md flex items-center gap-2 hover:scale-[1.02] w-full sm:w-auto justify-center"
            >
              <span>Contact Us</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
