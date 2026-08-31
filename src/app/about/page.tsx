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
  Smile,
  CheckCircle,
  CheckCircle2,
  Clock,
  ArrowRight,
  MessageSquare,
  DollarSign,
  ShieldCheck,
  BadgeCheck,
  Truck,
  RotateCcw,
  Home,
  Users,
  Headset,
  Gift,
  PackageCheck
} from "lucide-react";

export default function AboutUs() {
  const [settings, setSettings] = useState({
    title: "About Us",
    heroSubtitle: "Your Trusted Medicine Store — Chosen Worldwide.",
    description: "Welcome to one of the most reputable online pharmacies. Today, TrustedMedShop is the world's best choice for high-quality OTC and generic products. You can buy any tested and approved drug from us. We provide greater savings than any other retailer, along with reliable delivery services. We are always adding new deals for our clients. The firm strives to provide FDA-approved medication at a fair price. We promise your complete satisfaction and superior quality. All the medicines available here are quite safe and worthwhile.",
    imageCorporate: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&auto=format&fit=crop&q=60",
    imageScientist: "https://images.unsplash.com/photo-1532187643603-ba119ca4109e?w=400&auto=format&fit=crop&q=60",
    mission: "To make quality medicines accessible worldwide by delivering authentic, affordable, and reliable pharmaceutical solutions through ethical business practices and dependable service.",
    vision: "To be the most trusted global partner in pharmaceutical export and supply, recognized for our integrity, quality, and commitment to improving global healthcare.",
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
    quoteAuthor: "— TrustedMedShop Team",
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
    { 
      name: "WHO-GMP", 
      title: "WHO-GMP Certified", 
      desc: "Good Manufacturing Practice certified for authentic pharmaceutical production.",
      badge: "Verified Standard",
      icon: <Award className="w-7 h-7 text-[#00A86B]" />,
      bgGradient: "from-emerald-50 to-teal-50",
      iconBg: "bg-emerald-100/70 text-[#00A86B]"
    },
    { 
      name: "ISO 9001", 
      title: "ISO 9001:2015", 
      desc: "Global standard for quality management systems and operational compliance.",
      badge: "Quality Assured",
      icon: <CheckCircle2 className="w-7 h-7 text-sky-600" />,
      bgGradient: "from-sky-50 to-blue-50",
      iconBg: "bg-sky-100/70 text-sky-600"
    },
    { 
      name: "GDP", 
      title: "GDP Certified", 
      desc: "Good Distribution Practice ensuring temperature-controlled logistics integrity.",
      badge: "Logistics Standard",
      icon: <Truck className="w-7 h-7 text-indigo-600" />,
      bgGradient: "from-indigo-50 to-purple-50",
      iconBg: "bg-indigo-100/70 text-indigo-600"
    },
    { 
      name: "HACCP", 
      title: "HACCP Certified", 
      desc: "Comprehensive hazard analysis and critical control points safety certification.",
      badge: "Safety Control",
      icon: <ShieldCheck className="w-7 h-7 text-teal-600" />,
      bgGradient: "from-teal-50 to-emerald-50",
      iconBg: "bg-teal-100/70 text-teal-600"
    },
    { 
      name: "SSL 256-Bit", 
      title: "256-Bit SSL", 
      desc: "End-to-end encrypted communications and secure payment verification.",
      badge: "Bank-Grade Security",
      icon: <Lock className="w-7 h-7 text-[#0A3981]" />,
      bgGradient: "from-blue-50 to-slate-50",
      iconBg: "bg-blue-100/70 text-[#0A3981]"
    }
  ];

  const whyChooseFeatures = [
    {
      icon: <DollarSign className="w-7 h-7" />,
      title: "Save Money",
      desc: "Buy generic drugs at a cheaper price. With living costs rising, medicine prices have soared. You'll get the same quality drugs here at a significantly lower price. We make a significant effort to ensure that our customers receive the highest level of care at the most affordable rates."
    },
    {
      icon: <ShieldCheck className="w-7 h-7" />,
      title: "100% Quality Assurance",
      desc: "Quality is the last thing you have to worry about. We have tested and confirmed all the FDA-approved medications. We also carry licensed cutting-edge medications that are approved in several countries worldwide."
    },
    {
      icon: <BadgeCheck className="w-7 h-7" />,
      title: "Genuine Products",
      desc: "You can trust us completely about the product's authenticity. Our team always checks the required certifications before the final dispatch. The members verify the authenticity of the manufacturers. We sell 100% genuine products — that is our promise to you."
    },
    {
      icon: <Truck className="w-7 h-7" />,
      title: "Better Delivery Options",
      desc: "We guarantee delivery in 15-30 days at most. Once you place your order, you will receive a confirmation email with expected arrival date, tracking info, shipment number, and real-time location updates. Our delivery staff will contact you before arriving at your doorstep."
    },
    {
      icon: <RotateCcw className="w-7 h-7" />,
      title: "Easy Return & Refund Policy",
      desc: "We offer the best products with top-notch, secure packaging. We accept returns if someone changes their mind after ordering. You can follow an easy process to return the product and get your cashback. We accept responsibility for each product to maximise customer satisfaction."
    },
    {
      icon: <Home className="w-7 h-7" />,
      title: "100% Hassle-Free Home Delivery",
      desc: "We deliver orders right to your doorstep. This service has made lives convenient and super easy. People feel embarrassed to ask for certain drugs — our services make it easy and comfortable for clients to get what they need, delivered hassle-free."
    },
    {
      icon: <Users className="w-7 h-7" />,
      title: "Customer Satisfaction",
      desc: "We offer our customers 100% satisfaction with our global healthcare services. We work to prioritise our customers and meet their needs. Our services will make you believe in the fantastic quality of everything we offer."
    },
    {
      icon: <Headset className="w-7 h-7" />,
      title: "Top-Class Customer Service",
      desc: "You needn't worry about any hassle during your experience with us. We aim to provide a smooth and safe service for all our products. Our customers and team work together to ensure zero extra issues."
    },
    {
      icon: <Gift className="w-7 h-7" />,
      title: "Best Free Shipping on Orders Over \$199",
      desc: "We offer free shipping on orders over \$199. We also provide the best deals on bulk purchases. You will also get exciting discounts during the offer period, along with unexpected coupons and bonus deals."
    }
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
          <h1 className="text-4xl sm:text-5xl font-black text-[#0A3981] tracking-tight leading-tight">
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

      {/* WHY CHOOSE US - Feature Cards Grid */}
      <section className="bg-[#F8FAFB] border-y border-slate-100 py-16 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-3 mb-12 text-center">
            <span className="text-[#00A877] text-xs font-bold uppercase tracking-wider">Why Choose Us</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A3981]">
              Why Choose <span className="text-[#005B41]">TrustedMedShop</span> for Your Online Pharmacy?
            </h2>
            <p className="text-slate-500 text-sm sm:text-base max-w-2xl leading-relaxed mt-1">
              People know TrustedMedShop for its reliable medicines. We are a verified pharmacy and are capable of delivering what we promise. All medicines are 100% fit for human consumption, tested and certified as original and genuine.
            </p>
            <div className="h-1 w-16 bg-[#00A877] rounded-full mt-1"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseFeatures.map((feature, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col gap-4 group">
                <div className="bg-[#E6F3EE] p-3.5 rounded-xl text-[#005B41] w-fit group-hover:bg-[#005B41] group-hover:text-white transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-[#0A3981]">{feature.title}</h3>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values Cards Grid */}
      <section className="bg-white py-16 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Mission Card */}
          <div className="bg-slate-50 rounded-2xl p-7 border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center gap-4 group">
            <div className="bg-white p-4 rounded-full group-hover:bg-[#005B41]/10 transition-colors">
              <Target className="w-8 h-8 text-[#00A877]" />
            </div>
            <h3 className="text-lg font-bold text-[#0A3981]">Our Mission</h3>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
              {settings.mission}
            </p>
          </div>

          {/* Vision Card */}
          <div className="bg-slate-50 rounded-2xl p-7 border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center gap-4 group">
            <div className="bg-white p-4 rounded-full group-hover:bg-[#005B41]/10 transition-colors">
              <Eye className="w-8 h-8 text-[#00A877]" />
            </div>
            <h3 className="text-lg font-bold text-[#0A3981]">Our Vision</h3>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
              {settings.vision}
            </p>
          </div>

          {/* Values Card */}
          <div className="bg-slate-50 rounded-2xl p-7 border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center gap-4 group">
            <div className="bg-white p-4 rounded-full group-hover:bg-[#005B41]/10 transition-colors">
              <Heart className="w-8 h-8 text-[#00A877]" />
            </div>
            <h3 className="text-lg font-bold text-[#0A3981]">Our Values</h3>
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

      {/* Statistics Section (Deep Navy Brand Banner) */}
      <section className="w-full bg-[#0A3981] text-white py-14 px-4 sm:px-6 lg:px-8 shadow-inner">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-around items-center gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center flex flex-col items-center gap-1 min-w-[140px]">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#00A86B] tracking-tight">{stat.value}</span>
              <span className="text-xs text-slate-300 font-bold uppercase tracking-wider mt-1">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center w-full">
        <div className="flex flex-col items-center gap-2 mb-12">
          <span className="text-[#00A86B] text-[11px] font-black uppercase tracking-widest bg-emerald-50 text-[#00A86B] px-3.5 py-1 rounded-full border border-emerald-100">
            Quality Assurance &amp; Compliance
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0A3981] tracking-tight mt-1">
            Our Certifications &amp; Standards
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl font-medium">
            Rigorous compliance with international regulatory bodies ensures genuine, safe, and WHO-GMP approved pharmaceutical sourcing.
          </p>
          <div className="h-1 w-14 bg-[#00A86B] rounded-full mt-2"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {certifications.map((c, idx) => (
            <div 
              key={idx} 
              className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:border-[#00A86B]/40 transition-all duration-300 flex flex-col items-center text-center gap-3 group relative overflow-hidden"
            >
              {/* Top Accent Bar */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#00A86B] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              {/* Icon Bubble */}
              <div className={`w-14 h-14 rounded-2xl ${c.iconBg} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                {c.icon}
              </div>

              {/* Title & Badge */}
              <div className="flex flex-col items-center gap-1">
                <span className="text-[10px] font-black text-[#00A86B] uppercase tracking-wider bg-emerald-50/80 px-2.5 py-0.5 rounded-md border border-emerald-200/40">
                  {c.badge}
                </span>
                <h3 className="text-sm font-black text-[#0A3981] group-hover:text-[#00A86B] transition-colors mt-1">
                  {c.title}
                </h3>
              </div>

              {/* Description */}
              <p className="text-[11.5px] text-slate-500 font-medium leading-relaxed mt-0.5">
                {c.desc}
              </p>

              {/* Verified Checkmark */}
              <div className="mt-auto pt-2 flex items-center gap-1 text-[10px] font-bold text-[#00A86B]">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Verified Compliance</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Our Promise Section */}
      <section className="bg-slate-50 border-t border-slate-100 py-16 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Checkmarks */}
          <div className="lg:col-span-6 flex flex-col items-start text-left gap-5">
            <h2 className="text-3xl font-extrabold text-[#0A3981] leading-tight">
              You Need Not Have Any Worries with <span className="text-[#005B41]">TrustedMedShop</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              The medicines heal the human body and have today become an essentially integral part of life. To make these more affordable, we provide high discounts and free shipping on orders over a certain amount, helping a larger group of people access quality healthcare.
            </p>
            
            <div className="flex flex-col gap-4 mt-2">
              {[
                "If you do not receive the medicines as ordered, you can return them for a full refund.",
                "Meeting your needs is our top priority — we are working towards that every day.",
                "Getting our services will not disappoint you in any way.",
                "Genuine medicines sourced directly from approved manufacturers.",
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
                src={settings.imageScientist || "https://images.unsplash.com/photo-1532187643603-ba119ca4109e?w=400&auto=format&fit=crop&q=60"} 
                alt="Scientist inside chemical testing laboratory"
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="sm:col-span-7 flex flex-col text-left gap-4">
              <span className="text-[#00A877] text-4xl font-serif leading-none -mb-3 select-none">&ldquo;</span>
              <p className="text-slate-600 text-sm sm:text-base italic leading-relaxed">
                Our commitment is to deliver not just medicines, but trust, care, and better health for all.
              </p>
              <div>
                <span className="block text-sm font-bold text-[#005B41]">— TrustedMedShop Team</span>
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
              <h3 className="text-xl font-bold text-[#0A3981]">Have questions or need bulk supply?</h3>
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
