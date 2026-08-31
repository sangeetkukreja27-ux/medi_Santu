"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { Product } from "@/data/products";
import { 
  ArrowRight, 
  Search, 
  ShieldCheck, 
  Award, 
  Truck, 
  Package, 
  Send, 
  Heart, 
  Star, 
  ChevronRight, 
  Tag, 
  Globe, 
  Clock, 
  TrendingUp, 
  Sparkles,
  Plane,
  Coins,
  CheckCircle2,
  Headphones,
  LayoutGrid,
  Activity,
  Zap,
  Flame,
  MessageSquare,
  ChevronLeft,
  Lock,
  ShoppingCart
} from "lucide-react";

export default function HomePage() {
  const { addToCart, openInquiryModal, formatUsdPrice, currency } = useCart();
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [activeOfferTab, setActiveOfferTab] = useState<string>("all");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSent, setNewsletterSent] = useState(false);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.products) {
          setProductsList(data.products);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSent(true);
      setTimeout(() => {
        setNewsletterEmail("");
        setNewsletterSent(false);
      }, 4000);
    }
  };

  // Category Icons matching dark luxury layout
  const categoriesList = [
    { title: "Anticancer", icon: "🎗️", color: "text-pink-400 border-pink-500/20 bg-pink-500/10", link: "/products?category=anticancer" },
    { title: "Antibiotics", icon: "💊", color: "text-cyan-400 border-cyan-500/20 bg-cyan-500/10", link: "/products?category=antibiotics" },
    { title: "Cardiovascular", icon: "❤️", color: "text-rose-400 border-rose-500/20 bg-rose-500/10", link: "/products?category=cardiovascular" },
    { title: "Diabetes", icon: "🩸", color: "text-blue-400 border-blue-500/20 bg-blue-500/10", link: "/products?category=diabetes" },
    { title: "HIV / AIDS", icon: "🎗️", color: "text-red-400 border-red-500/20 bg-red-500/10", link: "/products?category=hiv-aids" },
    { title: "Hepatitis", icon: "🫀", color: "text-amber-400 border-amber-500/20 bg-amber-500/10", link: "/products?category=hepatitis" },
    { title: "Hormones", icon: "🧬", color: "text-yellow-400 border-yellow-500/20 bg-yellow-500/10", link: "/products?category=hormones" },
    { title: "Neurology", icon: "🧠", color: "text-purple-400 border-purple-500/20 bg-purple-500/10", link: "/products?category=neurology" },
    { title: "Respiratory", icon: "🫁", color: "text-teal-400 border-teal-500/20 bg-teal-500/10", link: "/products?category=respiratory" },
    { title: "More", icon: "⊞", color: "text-slate-400 border-slate-500/20 bg-slate-500/10", link: "/products" },
  ];

  // Dynamic Products with Mockup Fallback
  const popularMedicinesData = productsList.length >= 5
    ? productsList.slice(0, 5).map(p => ({
        id: p.id,
        name: p.name,
        generic: `(Generic: ${p.substance})`,
        unit: p.unit || p.packaging || "10 Tablets",
        price: p.price,
        image: p.image || "/images/mockup/pop-1-imatinib.png"
      }))
    : [
        { id: "p1", name: "Imatinib 400mg", generic: "(Generic: Gleevec)", unit: "10 Tablets", price: 28, image: "/images/mockup/pop-1-imatinib.png" },
        { id: "p2", name: "Sofosbuvir 400mg", generic: "(Generic: Sovald)", unit: "28 Tablets", price: 45, image: "/images/mockup/pop-2-sofosbuvir.png" },
        { id: "p3", name: "Lenalidomide 25mg", generic: "(Generic: Revlimid)", unit: "21 Capsules", price: 62, image: "/images/mockup/pop-3-lenalidomide.png" },
        { id: "p4", name: "Apixaban 5mg", generic: "(Generic: Eliquis)", unit: "60 Tablets", price: 38, image: "/images/mockup/pop-4-apixaban.png" },
        { id: "p5", name: "Daclatasvir 60mg", generic: "(Generic: Daklinza)", unit: "28 Tablets", price: 40, image: "/images/mockup/pop-5-daclatasvir.png" },
      ];

  const topSellingData = productsList.length >= 10
    ? productsList.slice(5, 10).map(p => ({
        id: p.id,
        name: p.name,
        generic: `(Generic: ${p.substance})`,
        unit: p.unit || p.packaging || "10 Tablets",
        price: p.price,
        image: p.image || "/images/mockup/top-1-tadalafil.png"
      }))
    : [
        { id: "t1", name: "Tadalafil 20mg", generic: "(Generic: Cialis)", unit: "10 Tablets", price: 12, image: "/images/mockup/top-1-tadalafil.png" },
        { id: "t2", name: "Sildenafil 100mg", generic: "(Generic: Viagra)", unit: "10 Tablets", price: 10, image: "/images/mockup/top-2-sildenafil.png" },
        { id: "t3", name: "Metformin 500mg", generic: "(Generic: Care)", unit: "100 Tablets", price: 6, image: "/images/mockup/top-3-metformin.png" },
        { id: "t4", name: "Omeprazole 20mg", generic: "(Generic: Prilosec)", unit: "100 Capsules", price: 7, image: "/images/mockup/top-4-omeprazole.png" },
        { id: "t5", name: "Amlodipine 5mg", generic: "(Generic: Pressum)", unit: "100 Tablets", price: 5, image: "/images/mockup/top-5-amlodipine.png" },
      ];

  const bestOffersData = productsList.length >= 15
    ? productsList.slice(10, 15).map((p, idx) => ({
        id: p.id,
        badge: idx === 0 ? "Flat 20% OFF" : idx === 1 ? "Special Price" : idx === 2 ? "Limited Offer" : idx === 3 ? "Save More" : "Best Deal",
        badgeColor: idx === 0 || idx === 2 ? "bg-red-500" : idx === 3 ? "bg-emerald-500" : "bg-amber-500",
        name: p.name,
        generic: `(Generic: ${p.substance})`,
        unit: p.unit || p.packaging || "30 Tablets",
        price: p.price,
        oldPrice: Math.round(p.price * 1.25),
        image: p.image || "/images/mockup/offer-1-everolimus.png"
      }))
    : [
        { id: "o1", badge: "Flat 20% OFF", badgeColor: "bg-red-500", name: "Everolimus 10mg", generic: "(Generic: Afinitor)", unit: "30 Tablets", price: 70, oldPrice: 88, image: "/images/mockup/offer-1-everolimus.png" },
        { id: "o2", badge: "Special Price", badgeColor: "bg-amber-500", name: "Dasatinib 70mg", generic: "(Generic: Sprycel)", unit: "60 Tablets", price: 55, oldPrice: 78, image: "/images/mockup/offer-2-dasatinib.png" },
        { id: "o3", badge: "Limited Offer", badgeColor: "bg-red-500", name: "Rivaroxaban 20mg", generic: "(Generic: Xarelto)", unit: "30 Tablets", price: 42, oldPrice: 60, image: "/images/mockup/offer-3-rivaroxaban.png" },
        { id: "o4", badge: "Save More", badgeColor: "bg-emerald-500", name: "Enzalutamide 40mg", generic: "(Generic: Xtandi)", unit: "112 Capsules", price: 95, oldPrice: 120, image: "/images/mockup/offer-4-enzalutamide.png" },
        { id: "o5", badge: "Best Deal", badgeColor: "bg-amber-500", name: "Semaglutide 1mg", generic: "(Diabetes / Weight Loss)", unit: "4 Pens", price: 110, oldPrice: 140, image: "/images/mockup/offer-5-semaglutide.png" },
      ];

  const testimonials = [
    {
      name: "Dr. Richard K.",
      role: "Hospital Procurement, UK",
      initial: "R",
      avatarBg: "bg-blue-600",
      quote: "Trustedmedshop has been an excellent partner for our pharmaceutical needs. Authentic products and timely delivery."
    },
    {
      name: "Sarah M.",
      role: "Pharmacy Distributor, Canada",
      initial: "S",
      avatarBg: "bg-purple-600",
      quote: "Reliable supplier with great communication. Highly recommended for bulk orders."
    },
    {
      name: "Ahmed Al-Farsi",
      role: "Healthcare Distributor, UAE",
      initial: "A",
      avatarBg: "bg-emerald-600",
      quote: "Good quality medicines and professional service. Smooth export process."
    }
  ];

  return (
    <div className="w-full flex flex-col bg-[#030B17] text-slate-100 font-sans min-h-screen">
      
      {/* 1. HERO SECTION (Dark Luxury Theme) */}
      <section className="relative w-full bg-gradient-to-b from-[#040E1E] via-[#06172E] to-[#030B17] overflow-hidden py-10 lg:py-16 border-b border-[#0D2440]">
        
        {/* Glow backdrop effects */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00A86B]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#0A3981]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Hero Text */}
          <div className="lg:col-span-6 flex flex-col items-start text-left gap-4 sm:gap-5">
            
            <div className="inline-flex items-center gap-2 bg-[#081F38] border border-[#143E6B] px-3 py-1 rounded-full text-xs font-bold text-slate-300">
              <span className="text-emerald-400">GLOBAL MEDICINES.</span>
              <span>STRONGER TOMORROW.</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl lg:text-5.5xl font-black tracking-tight leading-tight text-white">
              Trusted Medicines <br />
              Worldwide <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A86B] to-[#00E676]">Exports</span>
            </h1>
            
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-lg font-medium">
              High-quality, affordable and life-saving medicines for a healthier world.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button 
                onClick={() => openInquiryModal({ id: "hero-inquiry", name: "Global Medicine Export Inquiry", price: 0 } as any)}
                className="bg-[#00A86B] hover:bg-[#008f5a] text-white px-6 py-3 rounded-xl font-extrabold text-sm transition-all flex items-center gap-2 shadow-lg shadow-[#00A86B]/25 hover:shadow-xl cursor-pointer"
              >
                <span>Send Inquiry</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <Link 
                href="/products"
                className="bg-[#0A223E] hover:bg-[#0E2E54] text-slate-200 hover:text-white px-6 py-3 rounded-xl font-bold text-sm border border-[#163D69] transition-all flex items-center gap-2"
              >
                <span>Our Products</span>
              </Link>
            </div>

            {/* 4 Quick Trust Badges below CTA */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-4 w-full border-t border-[#0D2644]">
              
              <div className="flex items-center gap-2 text-left bg-[#07192E] p-2 rounded-xl border border-[#103157]">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="leading-tight">
                  <span className="block text-[10.5px] font-extrabold text-white">Genuine</span>
                  <span className="block text-[9px] text-slate-400">Products</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-left bg-[#07192E] p-2 rounded-xl border border-[#103157]">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center flex-shrink-0">
                  <Globe className="w-4 h-4" />
                </div>
                <div className="leading-tight">
                  <span className="block text-[10.5px] font-extrabold text-white">Worldwide</span>
                  <span className="block text-[9px] text-slate-400">Shipping</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-left bg-[#07192E] p-2 rounded-xl border border-[#103157]">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center flex-shrink-0">
                  <Package className="w-4 h-4" />
                </div>
                <div className="leading-tight">
                  <span className="block text-[10.5px] font-extrabold text-white">Bulk Supply</span>
                  <span className="block text-[9px] text-slate-400">Available</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-left bg-[#07192E] p-2 rounded-xl border border-[#103157]">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center flex-shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <div className="leading-tight">
                  <span className="block text-[10.5px] font-extrabold text-white">Reliable</span>
                  <span className="block text-[9px] text-slate-400">Partner</span>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Hero Visual Graphic */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            
            {/* Main Visual Container */}
            <div className="relative w-full max-w-lg aspect-square sm:aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-tr from-[#071D36] via-[#0A284A] to-[#05162A] border border-[#143B66] p-6 shadow-2xl flex items-center justify-center">
              
              {/* Globe & Airplane Graphics */}
              <div className="relative z-10 flex flex-col items-center text-center">
                
                {/* 3D Airplane Animation */}
                <div className="relative mb-3 flex items-center justify-center">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-emerald-500/20 via-sky-500/10 to-transparent flex items-center justify-center border border-emerald-500/30 animate-pulse">
                    <Globe className="w-16 h-16 text-emerald-400/80" />
                  </div>
                  <div className="absolute -top-3 -right-3 bg-[#0A2A4C] p-2 rounded-full border border-emerald-400/40 text-emerald-300 shadow-md">
                    <Plane className="w-6 h-6 rotate-45" />
                  </div>
                </div>

                <div className="bg-[#041224]/80 backdrop-blur-md px-5 py-3 rounded-2xl border border-[#163D66] mt-2">
                  <span className="text-sm sm:text-base font-black text-emerald-400 block tracking-wide">
                    Better Health Across Borders
                  </span>
                  <span className="text-xs text-slate-300 font-semibold mt-0.5 block">
                    Better Medicines A Healthier World
                  </span>
                </div>

              </div>

              {/* 4 Floating Pills on the right side */}
              <div className="absolute right-4 top-6 flex flex-col gap-2 z-20">
                <div className="bg-[#08203B]/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-1.5 shadow-md">
                  <CheckCircle2 className="w-3.5 h-3.5" /> <span>Quality</span>
                </div>
                <div className="bg-[#08203B]/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-1.5 shadow-md">
                  <CheckCircle2 className="w-3.5 h-3.5" /> <span>Export</span>
                </div>
                <div className="bg-[#08203B]/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-1.5 shadow-md">
                  <CheckCircle2 className="w-3.5 h-3.5" /> <span>Supply</span>
                </div>
                <div className="bg-[#08203B]/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-1.5 shadow-md">
                  <CheckCircle2 className="w-3.5 h-3.5" /> <span>Worldwide</span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 2. CATEGORY ICONS ROW (10 Glowing Categories) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-2.5 sm:gap-3">
          {categoriesList.map((cat) => (
            <Link
              key={cat.title}
              href={cat.link}
              className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-[#06172E] border border-[#102C4E] hover:border-emerald-500/40 hover:bg-[#0A2444] transition-all group shadow-sm text-center"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg border transition-transform group-hover:scale-110 ${cat.color}`}>
                <span>{cat.icon}</span>
              </div>
              <span className="text-[11px] font-bold text-slate-300 group-hover:text-white transition-colors truncate max-w-full">
                {cat.title}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. POPULAR MEDICINES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
        <div className="flex justify-between items-end mb-5">
          <div className="text-left flex flex-col gap-0.5">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
              <h2 className="text-xl sm:text-2xl font-black text-white">
                Popular Medicines
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 font-medium">
              Most searched and widely used medicines across global markets.
            </p>
          </div>
          <Link href="/products" className="text-xs sm:text-sm font-bold text-emerald-400 hover:text-emerald-300 transition-all flex items-center gap-1">
            <span>View All</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 5 Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {popularMedicinesData.map((item) => (
            <div key={item.id} className="bg-[#07192E] rounded-2xl border border-[#123357] hover:border-emerald-500/50 shadow-md hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-300 flex flex-col p-3 text-left group relative">
              
              {/* Bestseller Badge */}
              <div className="absolute top-2 left-2 bg-emerald-500 text-white text-[8.5px] font-black py-0.5 px-2 rounded-md uppercase tracking-wider shadow-sm z-10">
                Bestseller
              </div>

              <button 
                onClick={() => {}} 
                className="absolute top-2.5 right-2.5 text-slate-500 hover:text-rose-400 transition-colors z-10"
                title="Wishlist"
              >
                <Heart className="w-3.5 h-3.5" />
              </button>

              <Link href={`/products/${item.id}`} className="block">
                <div className="h-28 w-full bg-white/5 rounded-xl overflow-hidden flex items-center justify-center p-2 mb-2 mt-3 border border-white/5 group-hover:border-emerald-500/20">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="flex flex-col gap-0.5">
                  <h3 className="text-xs sm:text-sm font-bold text-white group-hover:text-emerald-400 transition-colors leading-tight line-clamp-1">
                    {item.name}
                  </h3>
                  <span className="text-[10.5px] text-slate-400 font-medium line-clamp-1">{item.generic}</span>
                  <span className="text-[9.5px] text-slate-500">{item.unit}</span>
                </div>
              </Link>
                
              <div className="mt-auto pt-2 flex flex-col gap-2">
                <span className="text-xs sm:text-sm font-black text-emerald-400">
                  {formatUsdPrice(item.price)}
                </span>
                
                <button 
                  onClick={() => openInquiryModal({ id: item.id, name: item.name, price: item.price, substance: item.generic, category: "Popular", unit: item.unit, rating: 5, reviewsCount: 12, isAvailable: true, badges: ["Bestseller"], description: "", precautions: "", dosageAndUsage: "", sideEffects: "" } as any)}
                  className="w-full bg-[#00A86B] hover:bg-[#008f5a] text-white py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/20 cursor-pointer"
                >
                  <ShoppingCart className="w-3 h-3" />
                  <span>Add to Inquiry</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. TOP SELLING PRODUCTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
        <div className="flex justify-between items-end mb-5">
          <div className="text-left flex flex-col gap-0.5">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-rose-400 fill-rose-400" />
              <h2 className="text-xl sm:text-2xl font-black text-white">
                Top Selling Products
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 font-medium">
              Most in-demand medicines, chosen by our global clients.
            </p>
          </div>
          <Link href="/products" className="text-xs sm:text-sm font-bold text-emerald-400 hover:text-emerald-300 transition-all flex items-center gap-1">
            <span>View All</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 5 Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {topSellingData.map((item) => (
            <div key={item.id} className="bg-[#07192E] rounded-2xl border border-[#123357] hover:border-emerald-500/50 shadow-md hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-300 flex flex-col p-3 text-left group relative">
              <button 
                onClick={() => {}} 
                className="absolute top-2.5 right-2.5 text-slate-500 hover:text-rose-400 transition-colors z-10"
                title="Wishlist"
              >
                <Heart className="w-3.5 h-3.5" />
              </button>

              <Link href={`/products/${item.id}`} className="block">
                <div className="h-28 w-full bg-white/5 rounded-xl overflow-hidden flex items-center justify-center p-2 mb-2 mt-3 border border-white/5 group-hover:border-emerald-500/20">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="flex flex-col gap-0.5">
                  <h3 className="text-xs sm:text-sm font-bold text-white group-hover:text-emerald-400 transition-colors leading-tight line-clamp-1">
                    {item.name}
                  </h3>
                  <span className="text-[10.5px] text-slate-400 font-medium line-clamp-1">{item.generic}</span>
                  <span className="text-[9.5px] text-slate-500">{item.unit}</span>
                </div>
              </Link>
                
              <div className="mt-auto pt-2 flex flex-col gap-2">
                <span className="text-xs sm:text-sm font-black text-emerald-400">
                  {formatUsdPrice(item.price)}
                </span>
                
                <button 
                  onClick={() => openInquiryModal({ id: item.id, name: item.name, price: item.price, substance: item.generic, category: "Top Selling", unit: item.unit, rating: 5, reviewsCount: 12, isAvailable: true, badges: [], description: "", precautions: "", dosageAndUsage: "", sideEffects: "" } as any)}
                  className="w-full bg-[#00A86B] hover:bg-[#008f5a] text-white py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/20 cursor-pointer"
                >
                  <ShoppingCart className="w-3 h-3" />
                  <span>Add to Inquiry</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. BEST OFFERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
        <div className="flex justify-between items-end mb-5">
          <div className="text-left flex flex-col gap-0.5">
            <div className="flex items-center gap-2">
              <Tag className="w-5 h-5 text-amber-400 fill-amber-400" />
              <h2 className="text-xl sm:text-2xl font-black text-white">
                Best Offers
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 font-medium">
              Special prices on selected medicines for a limited time.
            </p>
          </div>
          <Link href="/products" className="text-xs sm:text-sm font-bold text-emerald-400 hover:text-emerald-300 transition-all flex items-center gap-1">
            <span>View All</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 5 Offers Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {bestOffersData.map((item) => (
            <div key={item.id} className="bg-[#07192E] rounded-2xl border border-[#123357] hover:border-emerald-500/50 shadow-md hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-300 flex flex-col p-3 text-left group relative">
              
              {/* Badge */}
              <div className={`absolute top-2 left-2 ${item.badgeColor} text-white text-[8.5px] font-black py-0.5 px-2 rounded-md uppercase tracking-wider shadow-sm z-10`}>
                {item.badge}
              </div>

              <button 
                onClick={() => {}} 
                className="absolute top-2.5 right-2.5 text-slate-500 hover:text-rose-400 transition-colors z-10"
                title="Wishlist"
              >
                <Heart className="w-3.5 h-3.5" />
              </button>

              <Link href={`/products/${item.id}`} className="block">
                <div className="h-28 w-full bg-white/5 rounded-xl overflow-hidden flex items-center justify-center p-2 mb-2 mt-3 border border-white/5 group-hover:border-emerald-500/20">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="flex flex-col gap-0.5">
                  <h3 className="text-xs sm:text-sm font-bold text-white group-hover:text-emerald-400 transition-colors leading-tight line-clamp-1">
                    {item.name}
                  </h3>
                  <span className="text-[10.5px] text-slate-400 font-medium line-clamp-1">{item.generic}</span>
                  <span className="text-[9.5px] text-slate-500">{item.unit}</span>
                </div>
              </Link>
                
              <div className="mt-auto pt-2 flex flex-col gap-2">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-xs sm:text-sm font-black text-rose-400">
                    {formatUsdPrice(item.price)}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-500 line-through">
                    {formatUsdPrice(item.oldPrice)}
                  </span>
                </div>
                
                <button 
                  onClick={() => openInquiryModal({ id: item.id, name: item.name, price: item.price, substance: item.generic, category: "Best Offer", unit: item.unit, rating: 5, reviewsCount: 12, isAvailable: true, badges: [item.badge], description: "", precautions: "", dosageAndUsage: "", sideEffects: "" } as any)}
                  className="w-full bg-[#00A86B] hover:bg-[#008f5a] text-white py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/20 cursor-pointer"
                >
                  <ShoppingCart className="w-3 h-3" />
                  <span>Add to Inquiry</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. TRUST BADGES STRIP (4 Pillars) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="bg-[#06172E] border border-[#113155] rounded-3xl p-6 sm:p-8 shadow-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center">
            
            <div className="flex items-center gap-3.5 text-left">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center flex-shrink-0 border border-emerald-500/20 shadow-md">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-black text-white">100% Genuine Products</h4>
                <p className="text-xs text-slate-400 font-medium mt-0.5">Sourced from trusted manufacturers</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 text-left">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center flex-shrink-0 border border-emerald-500/20 shadow-md">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-black text-white">Worldwide Shipping</h4>
                <p className="text-xs text-slate-400 font-medium mt-0.5">Delivering to 100+ countries</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 text-left">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center flex-shrink-0 border border-emerald-500/20 shadow-md">
                <Package className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-black text-white">Bulk Supply Available</h4>
                <p className="text-xs text-slate-400 font-medium mt-0.5">For hospitals, distributors & pharmacies</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 text-left">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center flex-shrink-0 border border-emerald-500/20 shadow-md">
                <Headphones className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-black text-white">Dedicated Support</h4>
                <p className="text-xs text-slate-400 font-medium mt-0.5">Quick response & professional assistance</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. WHAT OUR CLIENTS SAY (TESTIMONIALS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
        <div className="flex justify-between items-end mb-6">
          <div className="text-left flex flex-col gap-0.5">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-emerald-400" />
              <h2 className="text-xl sm:text-2xl font-black text-white">
                What Our Clients Say
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 font-medium">
              Trusted by healthcare professionals and distributors worldwide.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Link href="/about" className="text-xs sm:text-sm font-bold text-emerald-400 hover:text-emerald-300 transition-all flex items-center gap-1">
              <span>View All Reviews</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* 3 Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {testimonials.map((t, idx) => (
            <div 
              key={idx} 
              className="bg-[#07192E] rounded-2xl border border-[#123357] p-5 sm:p-6 shadow-lg flex flex-col text-left justify-between gap-4 relative overflow-hidden"
            >
              <div>
                {/* 5 Stars */}
                <div className="flex text-amber-400 gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium italic">
                  "{t.quote}"
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-3 border-t border-[#0D2644]">
                <div className={`w-9 h-9 rounded-full ${t.avatarBg} text-white font-bold text-sm flex items-center justify-center shadow-md`}>
                  {t.initial}
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white leading-tight">{t.name}</h4>
                  <span className="text-[10px] text-slate-400 font-semibold">{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. STAY UPDATED NEWSLETTER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full mb-6">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#061C36] via-[#0A2D54] to-[#06203D] border border-[#164375] p-6 sm:p-10 shadow-2xl">
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 text-left">
            
            {/* Text side */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center flex-shrink-0">
                <Send className="w-6 h-6 rotate-45" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  Stay Updated
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-medium mt-0.5">
                  Get the latest product updates, offers and healthcare insights.
                </p>
              </div>
            </div>

            {/* Input & Form */}
            <div className="w-full lg:w-auto flex flex-col sm:flex-row items-center gap-3">
              <form onSubmit={handleNewsletter} className="flex w-full sm:w-auto max-w-md bg-[#041122] border border-[#163E69] rounded-xl overflow-hidden p-1 focus-within:border-emerald-400 transition-colors">
                <input 
                  type="email" 
                  required
                  placeholder="Enter your email address..." 
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="bg-transparent px-4 py-2 text-xs sm:text-sm text-white placeholder-slate-500 outline-none w-full sm:w-64"
                />
                <button 
                  type="submit" 
                  className="bg-[#00A86B] hover:bg-[#008f5a] text-white px-5 py-2 rounded-lg font-bold text-xs transition-colors flex items-center gap-1.5 flex-shrink-0 cursor-pointer shadow-md"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>

              {/* Graphic pill */}
              <div className="hidden xl:flex items-center gap-1.5 bg-emerald-500/15 border border-emerald-500/25 px-3 py-2 rounded-xl text-emerald-300 text-xs font-bold">
                <span>Health Beyond Borders</span>
                <span>🌿</span>
              </div>
            </div>

          </div>

          {newsletterSent && (
            <div className="mt-3 text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 p-2 rounded-xl text-center animate-in fade-in">
              ✓ Thank you! You have been successfully subscribed to global updates.
            </div>
          )}

        </div>
      </section>

    </div>
  );
}
