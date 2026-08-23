"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import TrustBadges from "@/components/TrustBadges";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Loader2, 
  CheckCircle,
  MessageSquare,
  Globe,
  Award,
  ShieldCheck,
  User,
  Building
} from "lucide-react";

export default function ContactUs() {
  // Contact Form States
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [subject, setSubject] = useState("Bulk Sourcing Inquiry");
  const [message, setMessage] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // CMS Settings State
  const [settings, setSettings] = useState({
    heroTitle: "We’re Here to Help. Your Health, Our Priority.",
    heroSubtitle: "Have questions, need product information, or looking for bulk orders? Our professional sourcing team is ready to assist you.",
    phone: "+91 98765 43210",
    phoneSub: "Mon - Sat: 9:00 AM - 7:00 PM IST",
    email: "info@trustedmedshop.com",
    emailSub: "We reply within 24 hours",
    address: "123, Healthcare Street, Andheri East, Mumbai - 400001, Maharashtra, India.",
    addressSub: "Registration Division",
    workingHours: "Mon - Sat: 9:00 AM - 7:00 PM IST",
    workingHoursSub: "Sunday: Closed"
  });

  useEffect(() => {
    fetch("/api/cms")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.cms?.contact) {
          setSettings(data.cms.contact);
        }
      })
      .catch((err) => console.error("CMS fetch error:", err));
  }, []);

  


  // Contact Form States

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      fullName,
      email,
      company,
      subject,
      message
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      
      if (response.ok && data.success) {
        setSubmitSuccess(true);
        // Reset form
        setFullName("");
        setEmail("");
        setCompany("");
        setSubject("Bulk Sourcing Inquiry");
        setMessage("");
        
        setTimeout(() => setSubmitSuccess(false), 5000);
      } else {
        alert("Failed to send message. Please try again.");
      }
    } catch (err) {
      console.error("Contact form error:", err);
      alert("Error sending message. Sourcing server is offline.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfos = [
    {
      icon: <Phone className="w-5 h-5 text-[#00A877] mt-0.5" />,
      title: "Phone / WhatsApp",
      detail: "+91 98765 43210",
      sub: "Mon - Sat: 9:00 AM - 7:00 PM IST"
    },
    {
      icon: <Mail className="w-5 h-5 text-[#00A877] mt-0.5" />,
      title: "Email Support",
      detail: "info@trustedmedshop.com",
      sub: "We reply within 24 hours"
    },
    {
      icon: <MapPin className="w-5 h-5 text-[#00A877] mt-0.5" />,
      title: "Head Office",
      detail: "123, Healthcare Street, Andheri East, Mumbai - 400001, Maharashtra, India.",
      sub: "Registration Division"
    },
    {
      icon: <Clock className="w-5 h-5 text-[#00A877] mt-0.5" />,
      title: "Working Hours",
      detail: "Mon - Sat: 9:00 AM - 7:00 PM IST",
      sub: "Sunday: Closed"
    }
  ];

  return (
    <div className="w-full flex flex-col bg-[#F8FAF9] font-sans pb-12">
      
      {/* Breadcrumbs Banner */}
      <section className="bg-white border-b border-slate-100 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs font-semibold text-slate-400 text-left">
          <Link href="/" className="hover:text-[#005B41] transition-colors">Home</Link>
          <span>&gt;</span>
          <span className="text-slate-600">Contact Us</span>
        </div>
      </section>

      {/* Hero Header Section */}
      <section className="relative bg-[#005B41] text-white py-16 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <rect width="100%" height="100%" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="15,15" />
          </svg>
        </div>
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-4 relative z-10">
          <span className="text-[#00A877] text-xs font-bold uppercase tracking-wider bg-white/10 py-1.5 px-4 rounded-full border border-white/5">
            Get In Touch
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            We’re Here to Help. <br />
            <span className="text-[#00A877]">Your Health, Our Priority.</span>
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm max-w-xl leading-relaxed mt-1">
            Have questions, need product information, or looking for bulk orders? Our professional sourcing team is ready to assist you.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
              <CheckCircle className="w-4.5 h-4.5 text-[#00A877]" />
              <span>Fast Response (Within 24 Hours)</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
              <Globe className="w-4.5 h-4.5 text-[#00A877]" />
              <span>Global Support (107+ Countries)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Info details */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 w-full items-start">
        
        {/* Left Side: Message Form */}
        <main className="lg:col-span-7 bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-sm text-left">
          <h2 className="text-lg sm:text-xl font-extrabold text-[#005B41] flex items-center gap-2 border-b border-slate-50 pb-2.5 mb-6">
            <MessageSquare className="w-5 h-5 text-[#00A877]" />
            <span>Send Us a Message</span>
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-xs font-semibold">
            
            {submitSuccess && (
              <div className="flex items-center gap-2.5 text-emerald-600 bg-emerald-50 py-3.5 px-4 rounded-xl border border-emerald-500/10 font-bold mb-2">
                <CheckCircle className="w-5 h-5 text-[#00A877]" />
                <span>Thank you! Your message was submitted. We will email you back shortly.</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-slate-500 flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-[#00A877]" />
                  <span>Full Name *</span>
                </label>
                <input 
                  type="text" 
                  required 
                  placeholder="Enter your full name" 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="border border-slate-200 rounded-xl p-3 bg-slate-50 text-slate-800 font-semibold outline-none focus:border-[#005B41] focus:bg-white transition-all text-sm"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-slate-500 flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-[#00A877]" />
                  <span>Email Address *</span>
                </label>
                <input 
                  type="email" 
                  required 
                  placeholder="Enter your email address" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border border-slate-200 rounded-xl p-3 bg-slate-50 text-slate-800 font-semibold outline-none focus:border-[#005B41] focus:bg-white transition-all text-sm"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-slate-500 flex items-center gap-1">
                <Building className="w-3.5 h-3.5 text-[#00A877]" />
                <span>Company Name (Optional)</span>
              </label>
              <input 
                type="text" 
                placeholder="Enter corporate pharmacy / clinic name" 
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="border border-slate-200 rounded-xl p-3 bg-slate-50 text-slate-800 font-semibold outline-none focus:border-[#005B41] focus:bg-white transition-all text-sm"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-slate-500">Subject *</label>
              <select 
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="border border-slate-200 rounded-xl p-3 bg-slate-50 text-slate-800 font-bold outline-none focus:border-[#005B41] focus:bg-white transition-all text-sm cursor-pointer"
              >
                <option value="Bulk Sourcing Inquiry">Bulk Sourcing Inquiry</option>
                <option value="Custom Clearance Support">Custom Clearance Support</option>
                <option value="Delivery / Shipping Status">Delivery / Shipping Status</option>
                <option value="Manufacturer Partnership">Manufacturer Partnership</option>
                <option value="General Question">General Question</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-slate-500">Message *</label>
              <textarea 
                required 
                rows={5} 
                placeholder="Write your detailed questions or inquiry here..." 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="border border-slate-200 rounded-xl p-3 bg-slate-50 text-slate-800 font-semibold outline-none focus:border-[#005B41] focus:bg-white transition-all text-sm resize-none"
              />
            </div>

            <button 
              type="submit"
              disabled={isSubmitting}
              className="bg-[#005B41] hover:bg-[#004833] text-white py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-[#005b41]/10 flex items-center justify-center gap-2 hover:scale-[1.02] cursor-pointer mt-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Sending Message...</span>
                </>
              ) : (
                <span>Send Message</span>
              )}
            </button>

          </form>
        </main>

        {/* Right Side: Contact Info Details */}
        <aside className="lg:col-span-5 flex flex-col gap-6 w-full text-left">
          
          <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-sm flex flex-col gap-6">
            <h2 className="text-lg font-extrabold text-[#005B41] border-b border-slate-50 pb-2.5">
              Contact Information
            </h2>
            
            <div className="flex flex-col gap-5">
              {contactInfos.map((info, idx) => (
                <div key={idx} className="flex gap-4 items-start py-1 text-xs">
                  <div className="bg-[#F4F7F6] p-2.5 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm border border-[#005b41]/5">
                    {info.icon}
                  </div>
                  <div>
                    <span className="block font-bold text-slate-800 text-sm leading-none mb-1">{info.title}</span>
                    <span className="block font-black text-[#005B41] text-xs sm:text-sm mt-1">{info.detail}</span>
                    <span className="block text-slate-400 font-semibold text-[10px] mt-1 uppercase tracking-wider">{info.sub}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </aside>

      </section>

      {/* Trust Badges */}
      <TrustBadges />

      {/* Global Presence Map section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 w-full text-center">
        <div className="bg-white rounded-3xl border border-slate-100 p-8 sm:p-10 shadow-sm flex flex-col gap-10 items-center">
          
          <div className="flex flex-col items-center gap-2">
            <span className="text-[#00A877] text-xs font-bold uppercase tracking-wider">Logistics Network</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#005B41]">Our Global Presence</h2>
            <p className="text-slate-500 text-xs sm:text-sm max-w-md mt-1">Delivering clinical-grade medicine shipments securely to patients in 107+ countries worldwide.</p>
          </div>

          {/* Simulated world map placeholder */}
          <div className="relative w-full h-[240px] sm:h-[360px] bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden flex items-center justify-center p-6 shadow-inner">
            <div className="absolute inset-0 opacity-15">
              <svg className="w-full h-full text-slate-400" fill="currentColor" viewBox="0 0 1000 500">
                <rect width="1000" height="500" fill="none" />
                <path d="M150,150 Q250,50 350,150 T550,150 T750,150 T950,150" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="5,5" />
                <circle cx="150" cy="150" r="8" className="text-[#00A877]" />
                <circle cx="350" cy="150" r="8" className="text-[#00A877]" />
                <circle cx="550" cy="150" r="8" className="text-[#00A877]" />
                <circle cx="750" cy="150" r="8" className="text-[#00A877]" />
                <circle cx="900" cy="200" r="8" className="text-[#00A877]" />
              </svg>
            </div>
            
            <div className="z-10 flex flex-col items-center gap-3 bg-white/95 border border-slate-100 p-5 rounded-2xl shadow-xl max-w-sm">
              <Globe className="w-8 h-8 text-[#005B41] animate-spin-slow" />
              <span className="text-sm font-bold text-slate-800">107+ Countries Logistics Cleared</span>
              <span className="text-[10px] text-slate-400 leading-relaxed font-semibold">Our network covers North America, Europe, SE Asia, the Middle East, and Latin America.</span>
            </div>
          </div>
          
        </div>
      </section>

    </div>
  );
}
